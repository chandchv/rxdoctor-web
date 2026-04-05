export const reverseGeocode = async (
  latitude: number,
  longitude: number,
  apiKey?: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error('Google Maps API key is not configured.');
  }

  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('latlng', `${latitude},${longitude}`);
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error('Failed to reach Google Maps Geocoding API.');
  }

  const data = await response.json();

  if (data.status !== 'OK' || !Array.isArray(data.results) || !data.results.length) {
    throw new Error('Unable to resolve location from coordinates.');
  }

  return data.results[0].formatted_address as string;
};

