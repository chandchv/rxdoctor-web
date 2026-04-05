import React from 'react';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import SymptomInputPanel, {
  SymptomInputPanelProps,
  quickSymptomSuggestions,
} from '../SymptomInputPanel';

const formatSymptomLabel = (value: string) =>
  value.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Helper to render SymptomInputPanel with default props, allowing overrides.
 */
function renderPanel(overrides: Partial<SymptomInputPanelProps> = {}) {
  const defaultProps: SymptomInputPanelProps = {
    symptomInput: '',
    locationInput: '',
    status: 'idle',
    error: null,
    validationError: null,
    suggestions: [],
    isResolvingLocation: false,
    locationError: null,
    onSymptomChange: jest.fn(),
    onLocationChange: jest.fn(),
    onSuggestionsClear: jest.fn(),
    onAutocompleteSuggestion: jest.fn(),
    onAddSuggestion: jest.fn(),
    onUseLocation: jest.fn(),
    onSubmit: jest.fn((e) => e.preventDefault()),
    ...overrides,
  };
  return render(<SymptomInputPanel {...defaultProps} />);
}

/** Arbitrary for component status */
const statusArb = fc.constantFrom<SymptomInputPanelProps['status']>(
  'idle',
  'loading',
  'error',
  'complete'
);

/** Arbitrary for a list of symptom suggestion strings (0–6 items) */
const suggestionsArb = fc.array(
  fc.stringOf(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz_'.split('')), {
    minLength: 2,
    maxLength: 20,
  }),
  { minLength: 0, maxLength: 6 }
);

describe('Feature: doctor-search-symptoms, Property 7: Interactive elements have accessibility attributes', () => {
  /**
   * **Validates: Requirements 6.2, 6.3**
   *
   * For any rendered state of the SymptomChecker, all interactive elements
   * (textarea, inputs, buttons) SHALL have an aria-label attribute, and when
   * the autocomplete suggestion list is visible with N suggestions, the ARIA
   * live region SHALL contain the number N.
   */
  it('textarea, location input, submit button, and GPS button all have aria-label attributes in any state', () => {
    fc.assert(
      fc.property(statusArb, fc.string({ maxLength: 100 }), (status, symptomInput) => {
        const { unmount } = renderPanel({ status, symptomInput });

        // Textarea
        const textarea = screen.getByRole('textbox', { name: /describe your symptoms/i });
        expect(textarea).toHaveAttribute('aria-label', 'Describe your symptoms');

        // Location input
        const locationInput = screen.getByRole('textbox', { name: /your location/i });
        expect(locationInput).toHaveAttribute('aria-label', 'Your location');

        // Submit button
        const submitButton = screen.getByTestId('submit-button');
        expect(submitButton).toHaveAttribute('aria-label', 'Analyze symptoms');

        // GPS button
        const gpsButton = screen.getByRole('button', { name: /use my gps location/i });
        expect(gpsButton).toHaveAttribute('aria-label', 'Use my GPS location');

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('all quick symptom chip buttons have aria-label attributes', () => {
    fc.assert(
      fc.property(statusArb, (status) => {
        const { unmount } = renderPanel({ status });

        for (const chip of quickSymptomSuggestions) {
          const chipEl = screen.getByTestId(`chip-${chip}`);
          expect(chipEl).toHaveAttribute('aria-label', chip);
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('autocomplete dropdown has role="listbox" and aria-label when suggestions are visible', () => {
    fc.assert(
      fc.property(
        suggestionsArb.filter((s) => s.length > 0),
        (suggestions) => {
          const { unmount } = renderPanel({ suggestions });

          const listbox = screen.getByTestId('autocomplete-listbox');
          expect(listbox).toHaveAttribute('role', 'listbox');
          expect(listbox).toHaveAttribute('aria-label', 'Symptom suggestions');

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('each autocomplete suggestion button has role="option" and aria-label', () => {
    fc.assert(
      fc.property(
        suggestionsArb.filter((s) => s.length > 0),
        (suggestions) => {
          const { unmount } = renderPanel({ suggestions });

          const options = screen.getAllByRole('option');
          expect(options).toHaveLength(suggestions.length);

          suggestions.forEach((suggestion, i) => {
            expect(options[i]).toHaveAttribute('role', 'option');
            expect(options[i]).toHaveAttribute(
              'aria-label',
              formatSymptomLabel(suggestion)
            );
          });

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ARIA live region contains suggestion count N when N suggestions are visible', () => {
    fc.assert(
      fc.property(
        suggestionsArb.filter((s) => s.length > 0),
        (suggestions) => {
          const { unmount } = renderPanel({
            suggestions,
            symptomInput: 'test',
          });

          const liveRegion = screen.getByTestId('suggestions-live-region');
          expect(liveRegion).toHaveAttribute('aria-live', 'polite');
          expect(liveRegion).toHaveAttribute('role', 'status');
          expect(liveRegion.textContent).toBe(
            `${suggestions.length} suggestions available`
          );

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ARIA live region shows "No suggestions" when suggestions list is empty and input has text', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        (symptomInput) => {
          const { unmount } = renderPanel({
            suggestions: [],
            symptomInput: symptomInput.trim() || 'a',
          });

          const liveRegion = screen.getByTestId('suggestions-live-region');
          expect(liveRegion.textContent).toBe('No suggestions');

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ARIA live region is empty when input is empty and no suggestions', () => {
    const { unmount } = renderPanel({
      suggestions: [],
      symptomInput: '',
    });

    const liveRegion = screen.getByTestId('suggestions-live-region');
    expect(liveRegion.textContent).toBe('');

    unmount();
  });
});
