import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DoctorResultsPanel, { DoctorResultsPanelProps } from '../DoctorResultsPanel';
import { SymptomAssessment, UrgencyLevel } from '../../services/symptomClassifier';
import { DoctorProfile } from '../../services/doctorApi';

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

function renderPanel(overrides: Partial<DoctorResultsPanelProps> = {}) {
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

describe('DoctorResultsPanel - Google search button', () => {
  it('shows Google search button when assessment is present and status is complete', () => {
    renderPanel({
      assessment: makeAssessment(),
      status: 'complete',
      doctorStatus: 'complete',
    });
    expect(screen.getByTestId('google-search-button')).toBeInTheDocument();
  });

  it('hides Google search button when status is idle', () => {
    renderPanel({
      assessment: null,
      status: 'idle',
      doctorStatus: 'idle',
    });
    expect(screen.queryByTestId('google-search-button')).not.toBeInTheDocument();
  });

  it('has correct href, target="_blank", and rel="noopener noreferrer"', () => {
    renderPanel({
      assessment: makeAssessment({ speciality: 'Neurology' }),
      locationInput: 'Bengaluru',
      status: 'complete',
      doctorStatus: 'complete',
    });
    const button = screen.getByTestId('google-search-button');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
    expect(button.getAttribute('href')).toContain('google.com/search');
    expect(button.getAttribute('href')).toContain('Neurology');
    expect(button.getAttribute('href')).toContain('Bengaluru');
  });

  it('shows Google search button even when doctors array is empty', () => {
    renderPanel({
      assessment: makeAssessment(),
      doctors: [],
      status: 'complete',
      doctorStatus: 'complete',
    });
    expect(screen.getByTestId('google-search-button')).toBeInTheDocument();
  });

  it('uses "near me" when locationInput is empty', () => {
    renderPanel({
      assessment: makeAssessment({ speciality: 'Dermatology' }),
      locationInput: '',
      status: 'complete',
      doctorStatus: 'complete',
    });
    const button = screen.getByTestId('google-search-button');
    expect(button.getAttribute('href')).toContain('near+me');
  });
});

describe('DoctorResultsPanel - fallback link', () => {
  it('shows fallback link after clicking the Google search button', () => {
    renderPanel({
      assessment: makeAssessment(),
      status: 'complete',
      doctorStatus: 'complete',
    });
    expect(screen.queryByTestId('google-search-fallback')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('google-search-button'));

    const fallback = screen.getByTestId('google-search-fallback');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveAttribute('target', '_blank');
    expect(fallback).toHaveAttribute('rel', 'noopener noreferrer');
    expect(fallback.getAttribute('href')).toContain('google.com/search');
  });
});

describe('DoctorResultsPanel - skeleton loader', () => {
  it('shows skeleton placeholder when doctorStatus is loading', () => {
    renderPanel({
      doctorStatus: 'loading',
      status: 'loading',
    });
    expect(screen.getByTestId('doctor-skeleton-loader')).toBeInTheDocument();
  });

  it('does not show skeleton when doctorStatus is idle', () => {
    renderPanel({
      doctorStatus: 'idle',
      status: 'idle',
    });
    expect(screen.queryByTestId('doctor-skeleton-loader')).not.toBeInTheDocument();
  });
});

describe('DoctorResultsPanel - compact mobile layout', () => {
  it('has hidden class on extra doctor details for mobile compactness', () => {
    renderPanel({
      assessment: makeAssessment(),
      doctors: [makeDoctorProfile()],
      status: 'complete',
      doctorStatus: 'complete',
    });
    const extraDetails = screen.getByTestId('doctor-details-extra');
    expect(extraDetails.className).toContain('hidden');
    expect(extraDetails.className).toContain('lg:block');
  });

  it('has hidden class on meta details row for mobile compactness', () => {
    renderPanel({
      assessment: makeAssessment(),
      doctors: [makeDoctorProfile()],
      status: 'complete',
      doctorStatus: 'complete',
    });
    const metaDetails = screen.getByTestId('doctor-meta-details');
    expect(metaDetails.className).toContain('hidden');
    expect(metaDetails.className).toContain('lg:flex');
  });
});
