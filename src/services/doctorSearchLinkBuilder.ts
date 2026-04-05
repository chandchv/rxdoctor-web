const GOOGLE_SEARCH_BASE = 'https://www.google.com/search';

export function buildGoogleSearchUrl(speciality: string, location?: string): string {
  const query = location
    ? `${speciality} doctor near ${location}`
    : `${speciality} doctor near me`;
  const url = new URL(GOOGLE_SEARCH_BASE);
  url.searchParams.set('q', query);
  return url.toString();
}

export function parseSpecialityFromSearchUrl(searchUrl: string): string | null {
  const url = new URL(searchUrl);
  const q = url.searchParams.get('q');
  if (!q) return null;
  const match = q.match(/^(.+?)\s+doctor\s+near\s+/i);
  return match ? match[1] : null;
}
