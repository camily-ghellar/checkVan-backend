import fetch from "node-fetch";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error("Google Maps API Key não definida em .env");
}

export async function addressToCoords(address) {
  if (!address) return null;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lon: loc.lng };
  }
  return null;
}


export async function coordsToAddress(lat, lon) {
  if (!lat || !lon) return null;

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK" && data.results.length > 0) {
    return data.results[0].formatted_address;
  }

  return null;
}


export async function generateRoute(start, waypoints = [], end) {
  if (!start || !end) throw new Error("Start e end são obrigatórios.");

  const waypointsStr = waypoints.map(w => `${w.lat},${w.lon}`).join("|");

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lon}&destination=${end.lat},${end.lon}&waypoints=optimize:true|${waypointsStr}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    return data.routes[0]; 
  }

  throw new Error(`Erro ao gerar rota: ${data.status} - ${data.error_message || ""}`);
}
