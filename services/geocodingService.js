import fetch from "node-fetch";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const USER_AGENT = "checkvan (ghellarcamily@gmail.com)"; 
let lastCall = 0; 

async function rateLimit() {
  const now = Date.now();
  const wait = lastCall + 1000 - now; 
  if (wait > 0) {
    await new Promise(res => setTimeout(res, wait));
  }
  lastCall = Date.now();
}

export async function addressToCoords(address) {
  await rateLimit();
  const url = `${NOMINATIM_BASE_URL}/search?` +
              `q=${encodeURIComponent(address)}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT }
  });

  const data = await response.json();
  if (data.length > 0) {
    return { lat: data[0].lat, lon: data[0].lon };
  }
  return null;
}

export async function coordsToAddress(lat, lon) {
  await rateLimit();
  const url = `${NOMINATIM_BASE_URL}/reverse?` +
              `lat=${lat}&lon=${lon}&format=json`;

  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT }
  });

  const data = await response.json();
  return data.display_name || null;
}
