import React from 'react';
import { render, screen } from '@testing-library/react';
import SymptomChecker from '../SymptomChecker';
import SymptomInputPanel, {
  SymptomInputPanelProps,
  quickSymptomSuggestions,
} from '../SymptomInputPanel';
import DoctorResultsPanel, { DoctorResultsPanelProps } from '../DoctorResultsPanel';
import AssessmentPanel, { AssessmentPanelProps } from '../AssessmentPanel';
import { SymptomAssessment, UrgencyLevel } from '../../services/symptomClassifier';
import { DoctorProfile } from '../../services/doctorApi';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function renderInputPanel(overrides: Partial<SymptomInputPanelProps> = {}) {
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

function makeAssessment(overrides: Partial<SymptomAssessment> = {}): SymptomAssessment {
  return {
    speciality: 'Cardiology',
    urgency: 'medium' as UrgencyLevel,
    possibleConditions: [
      {
        disease: 'Test Disease',
        score: 0.75,
        matchedSymptoms: ['headache'],
        speciality: 'Cardiology',
      },
    ],
    matchedSymptoms: ['headache'],
    recommendation: 'Consult a Cardiology specialist.',
    confidence: 75,
    ...overrides,
  };
}

function makeDoctorProfile(overrides: Partial<DoctorProfile> = {}): DoctorProfile {
  return {
    id: 'doc-1',
    name: 'Dr. Test',
    speciality: 'Cardiology',
    experienceYears: 10,
    rating: 4.5,
    distanceKm: 2.0,
    consultationFee: 500,
    location: 'Test City',
    bookingUrl: 'https://example.com/book',
    deepLink: 'rxdoctor://doctor/doc-1/book',
    teleconsult: true,
    ...overrides,
  };
}

function renderDoctorPanel(overrides: Partial<DoctorResultsPanelProps> = {}) {
  const defaultProps: DoctorResultsPanelProps = {
    doctors: [],
    doctorStatus: 'idle',
    assessment: null,
    locationInput: '',
    status: 'idle',
    ...overrides,
  };
  return render(<DoctorResultsPanel {...defaultProps} />);
}

function renderAssessmentPanel(overrides: Partial<AssessmentPanelProps> = {}) {
  const defaultProps: AssessmentPanelProps = {
    assessment: null,
    status: 'idle',
    ...overrides,
  };
  return render(<AssessmentPanel {...defaultProps} />);
}

/* ------------------------------------------------------------------ */
/*  Task 6.1 – Grid stacking                                          */
/* ------------------------------------------------------------------ */

describe('Task 6.1 – SymptomChecker grid stacks vertically on mobile', () => {
  it('grid container has lg:grid-cols-3 class for responsive stacking', () => {
    const { container } = render(<SymptomChecker />);
    const grid = container.querySelector('.grid.lg\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
  });

  it('grid container does NOT have md:grid-cols-3 (stacks below 1024px for better tablet readability)', () => {
    const { container } = render(<SymptomChecker />);
    const grid = container.querySelector('.grid.md\\:grid-cols-3');
    expect(grid).not.toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ */
/*  Task 6.2 – Horizontally scrollable chips on mobile                 */
/* ------------------------------------------------------------------ */

describe('Task 6.2 – Quick Symptom Chips are horizontally scrollable on mobile', () => {
  it('chips container has overflow-x-auto and flex-nowrap classes', () => {
    renderInputPanel();
    const container = screen.getByTestId('quick-chips-container');
    expect(container.className).toContain('overflow-x-auto');
    expect(container.className).toContain('flex-nowrap');
  });

  it('chips container has lg:flex-wrap for desktop wrapping', () => {
    renderInputPanel();
    const container = screen.getByTestId('quick-chips-container');
    expect(container.className).toContain('lg:flex-wrap');
  });

  it('chips container has lg:overflow-visible for desktop', () => {
    renderInputPanel();
    const container = screen.getByTestId('quick-chips-container');
    expect(container.className).toContain('lg:overflow-visible');
  });

  it('chips have whitespace-nowrap to prevent text wrapping inside chips', () => {
    renderInputPanel();
    for (const suggestion of quickSymptomSuggestions) {
      const chip = screen.getByTestId(`chip-${suggestion}`);
      expect(chip.className).toContain('whitespace-nowrap');
    }
  });

  it('chips container has pb-2 for scrollbar spacing on mobile', () => {
    renderInputPanel();
    const container = screen.getByTestId('quick-chips-container');
    expect(container.className).toContain('pb-2');
  });
});

/* ------------------------------------------------------------------ */
/*  Task 6.3 – Minimum 44x44px touch targets                          */
/* ------------------------------------------------------------------ */

describe('Task 6.3 – Interactive elements have minimum 44x44px touch targets', () => {
  it('quick symptom chips have min-h-[44px] and min-w-[44px]', () => {
    renderInputPanel();
    for (const suggestion of quickSymptomSuggestions) {
      const chip = screen.getByTestId(`chip-${suggestion}`);
      expect(chip.className).toContain('min-h-[44px]');
      expect(chip.className).toContain('min-w-[44px]');
    }
  });

  it('submit button has min-h-[44px]', () => {
    renderInputPanel();
    const submitBtn = screen.getByTestId('submit-button');
    expect(submitBtn.className).toContain('min-h-[44px]');
  });

  it('location button has min-h-[44px] and min-w-[44px]', () => {
    renderInputPanel();
    const locationBtn = screen.getByText('Use my GPS');
    const button = locationBtn.closest('button')!;
    expect(button.className).toContain('min-h-[44px]');
    expect(button.className).toContain('min-w-[44px]');
  });

  it('Google search button has min-h-[44px] and min-w-[44px]', () => {
    renderDoctorPanel({
      assessment: makeAssessment(),
      status: 'complete',
      doctorStatus: 'complete',
    });
    const btn = screen.getByTestId('google-search-button');
    expect(btn.className).toContain('min-h-[44px]');
    expect(btn.className).toContain('min-w-[44px]');
  });

  it('doctor card booking button has min-h-[44px] and min-w-[44px]', () => {
    renderDoctorPanel({
      assessment: makeAssessment(),
      doctors: [makeDoctorProfile()],
      status: 'complete',
      doctorStatus: 'complete',
    });
    const bookBtn = screen.getByText('Book appointment');
    expect(bookBtn.className).toContain('min-h-[44px]');
    expect(bookBtn.className).toContain('min-w-[44px]');
  });

  it('autocomplete suggestion buttons have min-h-[44px]', () => {
    renderInputPanel({
      suggestions: ['headache', 'fever'],
    });
    const buttons = screen.getAllByRole('button').filter(
      (btn) => btn.textContent === 'headache' || btn.textContent === 'fever'
    );
    for (const btn of buttons) {
      expect(btn.className).toContain('min-h-[44px]');
    }
  });

  it('matched symptom chips in AssessmentPanel have min-h-[44px] and min-w-[44px]', () => {
    renderAssessmentPanel({
      assessment: makeAssessment({ matchedSymptoms: ['headache', 'fever'] }),
      status: 'complete',
    });
    const chips = screen.getAllByTestId('matched-symptom-chip');
    for (const chip of chips) {
      expect(chip.className).toContain('min-h-[44px]');
      expect(chip.className).toContain('min-w-[44px]');
    }
  });
});
