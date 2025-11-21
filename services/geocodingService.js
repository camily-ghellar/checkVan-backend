import fetch from 'node-fetch';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!GOOGLE_MAPS_API_KEY) throw new Error('Google Maps API Key não definida em .env');

export async function addressToCoords(address) {
  if (!address) return null;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
  const data = await (await fetch(url)).json();
  if (data.status === 'OK' && data.results.length > 0) {
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lon: loc.lng };
  }
  return null;
}

export async function coordsToAddress(lat, lon) {
  if (!lat || !lon) return null;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`;
  const data = await (await fetch(url)).json();
  if (data.status === 'OK' && data.results.length > 0) {
    return data.results[0].formatted_address;
  }
  return null;
}

export async function getAddressAutocomplete(input) {
  if (!input) return [];
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=address&language=pt_BR&components=country:br&key=${GOOGLE_MAPS_API_KEY}`;
  const data = await (await fetch(url)).json();
  if (data.status === 'OK') {
    return data.predictions.map(p => ({ description: p.description, placeId: p.place_id }));
  }
  return [];
}

export async function generateRoute(start, waypoints = [], end) {
  if (!start || !end) throw new Error('Start e end são obrigatórios.');

  const waypointsStr = waypoints.map(w => `${w.lat},${w.lon}`).join('|');

  let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lon}&destination=${end.lat},${end.lon}&departure_time=now&traffic_model=best_guess&language=pt-BR&key=${GOOGLE_MAPS_API_KEY}`;

  // pessimista - considera o transito ruim e corta caminho
  //const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lon}&destination=${end.lat},${end.lon}&waypoints=optimize:true|${waypointsStr}&departure_time=now&traffic_model=pessimistic&language=pt-BR&key=${GOOGLE_MAPS_API_KEY}`;
  if (waypoints.length > 0) {
      url += `&waypoints=optimize:true|${waypointsStr}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.status === 'OK') {
    return data.routes[0];
  }

  throw new Error(`Erro ao gerar rota: ${data.status} - ${data.error_message || ''}`);
}

export async function getRealTimeEta(startLat, startLon, destLat, destLon) {
  if (!startLat || !destLat) return null;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${startLat},${startLon}&destinations=${destLat},${destLon}&departure_time=now&traffic_model=best_guess&language=pt-BR&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const element = data.rows[0].elements[0];
      
      const durationSecs = element.duration_in_traffic 
        ? element.duration_in_traffic.value 
        : element.duration.value;

      return Math.ceil(durationSecs / 60);
    }
  } catch (error) {
    console.error("Erro ao calcular ETA Google:", error);
  }
  return null;
}
