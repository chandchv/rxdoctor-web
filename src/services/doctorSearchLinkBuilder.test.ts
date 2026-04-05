import * as fc from 'fast-check';
import { buildGoogleSearchUrl, parseSpecialityFromSearchUrl } from './doctorSearchLinkBuilder';

/**
 * Arbitrary that generates non-empty speciality strings
 * that don't contain the phrase "doctor near" (which would break parsing).
 */
const specialityArb = fc
  .stringOf(
    fc.oneof(
      fc.char().filter((c) => /[a-zA-Z0-9 /\-&]/.test(c)),
      fc.constant(' ')
    ),
    { minLength: 1, maxLength: 40 }
  )
  .map((s) => s.trim())
  .filter((s) => s.length > 0)
  .filter((s) => !/doctor\s+near/i.test(s));

const locationArb = fc
  .stringOf(
    fc.oneof(
      fc.char().filter((c) => /[a-zA-Z0-9 ,.\-]/.test(c)),
      fc.constant(' ')
    ),
    { minLength: 1, maxLength: 40 }
  )
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

describe('Feature: doctor-search-symptoms, Property 1: Google Search URL round-trip preserves speciality', () => {
  /**
   * **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
   *
   * For any valid speciality string, constructing a Google Search URL via
   * buildGoogleSearchUrl(speciality, location) and then parsing the speciality
   * back via parseSpecialityFromSearchUrl() SHALL produce a string equivalent
   * to the original speciality.
   */
  it('round-trips speciality through build and parse (with location)', () => {
    fc.assert(
      fc.property(specialityArb, locationArb, (speciality, location) => {
        const url = buildGoogleSearchUrl(speciality, location);
        const parsed = parseSpecialityFromSearchUrl(url);
        expect(parsed).toBe(speciality);
      }),
      { numRuns: 100 }
    );
  });

  it('round-trips speciality through build and parse (without location)', () => {
    fc.assert(
      fc.property(specialityArb, (speciality) => {
        const url = buildGoogleSearchUrl(speciality);
        const parsed = parseSpecialityFromSearchUrl(url);
        expect(parsed).toBe(speciality);
      }),
      { numRuns: 100 }
    );
  });
});

describe('Feature: doctor-search-symptoms, Property 2: Google Search URL structure is valid', () => {
  /**
   * **Validates: Requirements 1.1, 1.2**
   *
   * For any speciality string and optional location string,
   * buildGoogleSearchUrl(speciality, location) SHALL return a URL whose origin
   * is https://www.google.com, whose pathname is /search, and whose q parameter
   * contains the speciality followed by "doctor near" followed by either the
   * location or "me".
   */
  it('produces a valid Google Search URL with correct structure (with location)', () => {
    fc.assert(
      fc.property(specialityArb, locationArb, (speciality, location) => {
        const result = buildGoogleSearchUrl(speciality, location);
        const url = new URL(result);

        expect(url.origin).toBe('https://www.google.com');
        expect(url.pathname).toBe('/search');

        const q = url.searchParams.get('q');
        expect(q).toBe(`${speciality} doctor near ${location}`);
      }),
      { numRuns: 100 }
    );
  });

  it('produces a valid Google Search URL with "near me" when no location (without location)', () => {
    fc.assert(
      fc.property(specialityArb, (speciality) => {
        const result = buildGoogleSearchUrl(speciality);
        const url = new URL(result);

        expect(url.origin).toBe('https://www.google.com');
        expect(url.pathname).toBe('/search');

        const q = url.searchParams.get('q');
        expect(q).toBe(`${speciality} doctor near me`);
      }),
      { numRuns: 100 }
    );
  });
});
