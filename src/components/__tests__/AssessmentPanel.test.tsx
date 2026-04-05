import React from 'react';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import AssessmentPanel, { AssessmentPanelProps } from '../AssessmentPanel';
import { SymptomAssessment, UrgencyLevel } from '../../services/symptomClassifier';

/**
 * Helper to build a valid SymptomAssessment with overrides.
 */
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

function renderPanel(overrides: Partial<AssessmentPanelProps> = {}) {
  const defaultProps: AssessmentPanelProps = {
    assessment: null,
    status: 'idle',
    ...overrides,
  };
  return render(<AssessmentPanel {...defaultProps} />);
}

describe('Feature: doctor-search-symptoms, Property 5: Confidence progress bar width matches assessment percentage', () => {
  /**
   * **Validates: Requirements 4.2**
   *
   * For any confidence value between 10 and 100, the progress bar element's
   * width percentage SHALL equal the confidence value.
   */
  it('progress bar width equals confidence percentage for any value 10–100', () => {
    const confidenceArb = fc.integer({ min: 10, max: 100 });

    fc.assert(
      fc.property(confidenceArb, (confidence) => {
        const assessment = makeAssessment({ confidence });
        const { unmount } = renderPanel({ assessment, status: 'complete' });

        const bar = screen.getByTestId('confidence-bar');
        expect(bar.style.width).toBe(`${confidence}%`);

        const valueEl = screen.getByTestId('confidence-value');
        expect(valueEl.textContent).toBe(`${confidence}%`);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

describe('Feature: doctor-search-symptoms, Property 6: All matched symptoms rendered as individual chips', () => {
  /**
   * **Validates: Requirements 4.4**
   *
   * For any SymptomAssessment with a non-empty matchedSymptoms array, the
   * AssessmentPanel SHALL render exactly one styled chip element per matched
   * symptom, and each chip's text content SHALL match the corresponding
   * symptom string.
   */
  it('renders exactly one chip per matched symptom with correct text', () => {
    // Generate arrays of 1–10 unique non-empty symptom strings
    const symptomsArb = fc
      .uniqueArray(fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0), {
        minLength: 1,
        maxLength: 10,
      });

    fc.assert(
      fc.property(symptomsArb, (symptoms) => {
        const assessment = makeAssessment({ matchedSymptoms: symptoms });
        const { unmount } = renderPanel({ assessment, status: 'complete' });

        const chips = screen.getAllByTestId('matched-symptom-chip');
        expect(chips).toHaveLength(symptoms.length);

        chips.forEach((chip, i) => {
          expect(chip.textContent).toBe(symptoms[i]);
        });

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});

describe('AssessmentPanel - visual enhancements', () => {
  it('shows skeleton loader when status is loading', () => {
    renderPanel({ status: 'loading' });
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
  });

  it('shows fade-in wrapper when status is complete', () => {
    const assessment = makeAssessment();
    renderPanel({ assessment, status: 'complete' });
    expect(screen.getByTestId('fade-in-wrapper')).toBeInTheDocument();
  });

  it('adds animate-pulse class to urgency badge when urgency is high', () => {
    const assessment = makeAssessment({ urgency: 'high' });
    renderPanel({ assessment, status: 'complete' });
    const badge = screen.getByTestId('urgency-badge');
    expect(badge.className).toContain('animate-pulse');
  });

  it('does not add animate-pulse class when urgency is medium', () => {
    const assessment = makeAssessment({ urgency: 'medium' });
    renderPanel({ assessment, status: 'complete' });
    const badge = screen.getByTestId('urgency-badge');
    expect(badge.className).not.toContain('animate-pulse');
  });

  it('does not add animate-pulse class when urgency is low', () => {
    const assessment = makeAssessment({ urgency: 'low' });
    renderPanel({ assessment, status: 'complete' });
    const badge = screen.getByTestId('urgency-badge');
    expect(badge.className).not.toContain('animate-pulse');
  });

  it('displays speciality icon next to speciality name', () => {
    const assessment = makeAssessment({ speciality: 'Cardiology' });
    renderPanel({ assessment, status: 'complete' });
    expect(screen.getByTestId('speciality-icon')).toBeInTheDocument();
  });

  it('shows idle message when status is idle', () => {
    renderPanel({ status: 'idle' });
    expect(
      screen.getByText(/Submit your symptoms to view the recommended speciality/)
    ).toBeInTheDocument();
  });
});
