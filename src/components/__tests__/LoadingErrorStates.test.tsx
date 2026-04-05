import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssessmentPanel, { AssessmentPanelProps } from '../AssessmentPanel';
import DoctorResultsPanel, { DoctorResultsPanelProps } from '../DoctorResultsPanel';
import { SymptomAssessment, UrgencyLevel } from '../../services/symptomClassifier';

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
    recommendation: 'Consult a Cardiology for further evaluation.',
    confidence: 75,
    ...overrides,
  };
}

function renderAssessment(overrides: Partial<AssessmentPanelProps> = {}) {
  const defaultProps: AssessmentPanelProps = {
    assessment: null,
    status: 'idle',
    ...overrides,
  };
  return render(<AssessmentPanel {...defaultProps} />);
}

function renderDoctorResults(overrides: Partial<DoctorResultsPanelProps> = {}) {
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

describe('Loading states', () => {
  it('AssessmentPanel shows skeleton when status is loading', () => {
    renderAssessment({ status: 'loading' });
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });

  it('DoctorResultsPanel shows skeleton when doctorStatus is loading', () => {
    renderDoctorResults({ doctorStatus: 'loading', status: 'loading' });
    expect(screen.getByTestId('doctor-skeleton-loader')).toBeInTheDocument();
  });
});

describe('Fade-in transition', () => {
  it('AssessmentPanel shows fade-in wrapper when status is complete', () => {
    renderAssessment({ assessment: makeAssessment(), status: 'complete' });
    const wrapper = screen.getByTestId('fade-in-wrapper');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.style.animation).toContain('fadeIn');
  });
});

describe('Error state with example chips', () => {
  it('AssessmentPanel shows error message with example chips when status is error and assessment is null', () => {
    renderAssessment({ status: 'error', assessment: null });
    expect(screen.getByTestId('error-no-match')).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find a match/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('error-suggestion-chips')).toBeInTheDocument();
  });

  it('renders clickable example symptom chips in error state', () => {
    renderAssessment({ status: 'error', assessment: null });
    expect(screen.getByTestId('error-chip-chest pain')).toBeInTheDocument();
    expect(screen.getByTestId('error-chip-skin rash')).toBeInTheDocument();
    expect(screen.getByTestId('error-chip-itching')).toBeInTheDocument();
  });

  it('clicking example chip in error state calls onAddSuggestion', () => {
    const onAddSuggestion = jest.fn();
    renderAssessment({ status: 'error', assessment: null, onAddSuggestion });

    fireEvent.click(screen.getByTestId('error-chip-chest pain'));
    expect(onAddSuggestion).toHaveBeenCalledWith('chest pain');

    fireEvent.click(screen.getByTestId('error-chip-skin rash'));
    expect(onAddSuggestion).toHaveBeenCalledWith('skin rash');
  });

  it('does not show error state when status is error but assessment exists', () => {
    renderAssessment({ status: 'error', assessment: makeAssessment() });
    expect(screen.queryByTestId('error-no-match')).not.toBeInTheDocument();
  });
});
