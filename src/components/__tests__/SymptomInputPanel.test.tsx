import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import SymptomInputPanel, {
  SymptomInputPanelProps,
  quickSymptomSuggestions,
} from '../SymptomInputPanel';

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

describe('Feature: doctor-search-symptoms, Property 3: Character count display matches input length', () => {
  /**
   * **Validates: Requirements 3.1**
   *
   * For any string entered into the symptom textarea, the character count
   * indicator SHALL display a number equal to the string's .length property,
   * and the maximum SHALL always display 500.
   */
  it('character count indicator shows {length}/500 for any input string', () => {
    const inputArb = fc.string({ minLength: 0, maxLength: 500 });

    fc.assert(
      fc.property(inputArb, (input) => {
        const { unmount } = renderPanel({ symptomInput: input });

        const charCount = screen.getByTestId('char-count');
        expect(charCount.textContent).toBe(`${input.length}/500`);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('textarea has maxLength attribute set to 500', () => {
    renderPanel();
    const textarea = screen.getByPlaceholderText(
      'e.g. Sharp pain in chest, sweating, shortness of breath...'
    );
    expect(textarea).toHaveAttribute('maxLength', '500');
  });

  it('character count always shows /500 as the maximum', () => {
    const inputArb = fc.string({ minLength: 0, maxLength: 500 });

    fc.assert(
      fc.property(inputArb, (input) => {
        const { unmount } = renderPanel({ symptomInput: input });

        const charCount = screen.getByTestId('char-count');
        expect(charCount.textContent).toMatch(/\/500$/);

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});

describe('Feature: doctor-search-symptoms, Property 4: Chip selection appends symptom with comma separator', () => {
  /**
   * **Validates: Requirements 3.3**
   *
   * For any sequence of quick symptom chip clicks, the textarea value SHALL
   * contain each clicked symptom separated by commas, and each clicked chip
   * SHALL have a visually selected state.
   */
  it('each clicked chip is visually selected when its text appears in symptomInput', () => {
    // Arbitrary: pick a non-empty subset of quick symptom suggestions
    const chipSubsetArb = fc
      .subarray(quickSymptomSuggestions, { minLength: 1 })
      .filter((arr) => arr.length > 0);

    fc.assert(
      fc.property(chipSubsetArb, (selectedChips) => {
        // Simulate the textarea value as comma-separated selected chips
        const symptomInput = selectedChips.join(', ');

        const { unmount } = renderPanel({ symptomInput });

        for (const chip of selectedChips) {
          const chipEl = screen.getByTestId(`chip-${chip}`);
          expect(chipEl.getAttribute('data-selected')).toBe('true');
        }

        // Chips NOT in the selection should not be selected
        const unselected = quickSymptomSuggestions.filter(
          (s) => !selectedChips.includes(s)
        );
        for (const chip of unselected) {
          const chipEl = screen.getByTestId(`chip-${chip}`);
          expect(chipEl.getAttribute('data-selected')).toBe('false');
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('chip click calls onAddSuggestion with the chip text', () => {
    // Arbitrary: pick any single chip from the suggestions
    const chipIndexArb = fc.integer({
      min: 0,
      max: quickSymptomSuggestions.length - 1,
    });

    fc.assert(
      fc.property(chipIndexArb, (index) => {
        const onAddSuggestion = jest.fn();
        const { unmount } = renderPanel({ onAddSuggestion });

        const chip = quickSymptomSuggestions[index];
        const chipEl = screen.getByTestId(`chip-${chip}`);
        fireEvent.click(chipEl);

        expect(onAddSuggestion).toHaveBeenCalledWith(chip);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('selected chips have the selected visual style (bg-blue-500/30)', () => {
    const chipSubsetArb = fc
      .subarray(quickSymptomSuggestions, { minLength: 1 })
      .filter((arr) => arr.length > 0);

    fc.assert(
      fc.property(chipSubsetArb, (selectedChips) => {
        const symptomInput = selectedChips.join(', ');
        const { unmount } = renderPanel({ symptomInput });

        for (const chip of selectedChips) {
          const chipEl = screen.getByTestId(`chip-${chip}`);
          expect(chipEl.className).toContain('bg-blue-500/30');
          expect(chipEl.className).toContain('border-blue-400');
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('unselected chips have the default style (bg-white/10)', () => {
    // Empty input means no chips selected
    const { unmount } = renderPanel({ symptomInput: '' });

    for (const chip of quickSymptomSuggestions) {
      const chipEl = screen.getByTestId(`chip-${chip}`);
      expect(chipEl.getAttribute('data-selected')).toBe('false');
      expect(chipEl.className).toContain('bg-white/10');
    }

    unmount();
  });
});

describe('SymptomInputPanel - inline validation', () => {
  it('shows inline validation error when validationError is set', () => {
    renderPanel({ validationError: 'Please enter at least one symptom.' });
    const errorEl = screen.getByTestId('validation-error');
    expect(errorEl).toBeInTheDocument();
    expect(errorEl.textContent).toBe('Please enter at least one symptom.');
  });

  it('does not show inline validation error when validationError is null', () => {
    renderPanel({ validationError: null });
    expect(screen.queryByTestId('validation-error')).not.toBeInTheDocument();
  });

  it('shows generic error banner when error prop is set (classifier error)', () => {
    renderPanel({
      error: "We couldn't determine a speciality from that description.",
    });
    expect(
      screen.getByText("We couldn't determine a speciality from that description.")
    ).toBeInTheDocument();
  });
});

describe('SymptomInputPanel - placeholder text', () => {
  it('textarea has placeholder text when empty and unfocused', () => {
    renderPanel({ symptomInput: '' });
    const textarea = screen.getByPlaceholderText(
      'e.g. Sharp pain in chest, sweating, shortness of breath...'
    );
    expect(textarea).toBeInTheDocument();
  });
});
