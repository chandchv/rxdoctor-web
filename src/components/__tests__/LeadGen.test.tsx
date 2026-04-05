import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as fc from 'fast-check';
import EmailCaptureForm, { isValidEmail } from '../EmailCaptureForm';

const STORAGE_KEY = 'rxdoctor_captured_emails';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] ?? null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: jest.fn((index: number) => Object.keys(store)[index] ?? null),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  localStorageMock.clear();
  jest.clearAllMocks();
});

/**
 * **Validates: Requirements 10.4**
 *
 * Property 11: Invalid email format is rejected
 *
 * For any string that does not match a valid email pattern,
 * submitting the EmailCaptureForm SHALL display an inline validation error
 * and SHALL NOT store the string in localStorage.
 */
describe('Feature: doctor-search-symptoms, Property 11: Invalid email format is rejected', () => {
  // Arbitrary that generates strings which do NOT match the email regex
  const invalidEmailArb = fc.oneof(
    // Strings without @
    fc.stringOf(fc.char().filter((c) => c !== '@'), { minLength: 1, maxLength: 50 }),
    // Strings with @ but missing domain dot
    fc.tuple(
      fc.stringOf(fc.char().filter((c) => c !== '@' && c !== ' '), { minLength: 1, maxLength: 20 }),
      fc.stringOf(fc.char().filter((c) => c !== '.' && c !== '@' && c !== ' '), { minLength: 1, maxLength: 20 })
    ).map(([local, domain]) => `${local}@${domain}`),
    // Empty string
    fc.constant(''),
    // Whitespace only
    fc.stringOf(fc.constant(' '), { minLength: 1, maxLength: 10 }),
  ).filter((s) => !isValidEmail(s));

  it('should display validation error and NOT store invalid emails in localStorage (100+ iterations)', () => {
    fc.assert(
      fc.property(invalidEmailArb, (invalidEmail) => {
        localStorageMock.clear();
        jest.clearAllMocks();

        const { unmount } = render(<EmailCaptureForm />);

        const input = screen.getByTestId('email-input');
        const submitBtn = screen.getByTestId('email-submit');

        fireEvent.change(input, { target: { value: invalidEmail } });
        fireEvent.click(submitBtn);

        // Validation error should be displayed
        const errorEl = screen.queryByTestId('email-error');
        expect(errorEl).toBeInTheDocument();

        // Success message should NOT be displayed
        const successEl = screen.queryByTestId('email-success');
        expect(successEl).not.toBeInTheDocument();

        // localStorage should NOT have been written to
        expect(localStorageMock.setItem).not.toHaveBeenCalled();

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * **Validates: Requirements 10.5**
 *
 * Property 12: Valid email round-trip to localStorage
 *
 * For any valid email string, submitting the EmailCaptureForm SHALL store
 * the email in the rxdoctor_captured_emails localStorage key, and reading
 * that key back SHALL contain the submitted email.
 */
describe('Feature: doctor-search-symptoms, Property 12: Valid email round-trip to localStorage', () => {
  // Arbitrary that generates valid email strings
  const validEmailArb = fc
    .tuple(
      fc.stringOf(fc.char().filter((c) => !/[\s@]/.test(c)), { minLength: 1, maxLength: 15 }),
      fc.stringOf(fc.char().filter((c) => !/[\s@.]/.test(c)), { minLength: 1, maxLength: 10 }),
      fc.stringOf(fc.char().filter((c) => !/[\s@.]/.test(c)), { minLength: 2, maxLength: 5 })
    )
    .map(([local, domain, tld]) => `${local}@${domain}.${tld}`)
    .filter((email) => isValidEmail(email));

  it('should store valid email in localStorage and round-trip correctly (100+ iterations)', () => {
    fc.assert(
      fc.property(validEmailArb, (validEmail) => {
        localStorageMock.clear();
        jest.clearAllMocks();

        const { unmount } = render(<EmailCaptureForm />);

        const input = screen.getByTestId('email-input');
        const submitBtn = screen.getByTestId('email-submit');

        fireEvent.change(input, { target: { value: validEmail } });
        fireEvent.click(submitBtn);

        // No validation error should be displayed
        const errorEl = screen.queryByTestId('email-error');
        expect(errorEl).not.toBeInTheDocument();

        // Success message should be displayed
        const successEl = screen.queryByTestId('email-success');
        expect(successEl).toBeInTheDocument();

        // localStorage should contain the email
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          STORAGE_KEY,
          expect.any(String)
        );

        // Round-trip: parse the stored value and verify it contains the email
        const storedCall = localStorageMock.setItem.mock.calls.find(
          (call: string[]) => call[0] === STORAGE_KEY
        );
        expect(storedCall).toBeDefined();
        const storedEmails: string[] = JSON.parse(storedCall![1]);
        expect(storedEmails).toContain(validEmail);

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
