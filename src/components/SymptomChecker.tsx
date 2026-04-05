import React, { useState } from 'react';
import {
  classifySymptoms,
  SymptomAssessment,
  symptomVocabulary,
} from '../services/symptomClassifier';
import {
  DoctorProfile,
  findNearbyDoctors,
} from '../services/doctorApi';
import { reverseGeocode } from '../services/geocoding';
import SymptomInputPanel from './SymptomInputPanel';
import AssessmentPanel from './AssessmentPanel';
import DoctorResultsPanel from './DoctorResultsPanel';
import symptomLabels from '../data/symptomLabels.json';

const labelMap = symptomLabels as Record<string, string>;

/** Get human-friendly label for a symptom token */
const getSymptomLabel = (token: string): string =>
  labelMap[token] ?? token.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();

const SymptomChecker: React.FC = () => {
  const [symptomInput, setSymptomInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [assessment, setAssessment] = useState<SymptomAssessment | null>(null);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'complete'>(
    'idle'
  );
  const [doctorStatus, setDoctorStatus] = useState<'idle' | 'loading' | 'complete'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isResolvingLocation, setIsResolvingLocation] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setValidationError(null);

    if (!symptomInput.trim()) {
      setValidationError('Please enter at least one symptom.');
      return;
    }

    setStatus('loading');
    setDoctors([]);

    const result = classifySymptoms(symptomInput);

    if (!result) {
      setStatus('error');
      setAssessment(null);
      setError(
        "We couldn't determine a speciality from that description. Try adding more detail or different symptoms."
      );
      return;
    }

    setAssessment(result);
    setStatus('complete');

    setDoctorStatus('loading');

    try {
      const doctorResults = await findNearbyDoctors({
        speciality: result.speciality,
        location: locationInput,
      });
      setDoctors(doctorResults);
    } catch (err) {
      console.error(err);
    } finally {
      setDoctorStatus('complete');
    }
  };

  const handleUseLocation = () => {
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported in this browser.');
      return;
    }

    setIsResolvingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const formatted = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
        setLocationInput(formatted);

        if (!googleMapsKey) {
          setLocationError(
            'Set REACT_APP_GOOGLE_MAPS_API_KEY to auto-detect your city, or enter it manually.'
          );
          setIsResolvingLocation(false);
          return;
        }

        try {
          const resolvedAddress = await reverseGeocode(
            latitude,
            longitude,
            googleMapsKey
          );
          setLocationInput(resolvedAddress);
        } catch (geoError) {
          console.error('Reverse geocoding error:', geoError);
          setLocationError(
            'Unable to resolve address from your coordinates. Please enter it manually.'
          );
        } finally {
          setIsResolvingLocation(false);
        }
      },
      () => {
        setLocationError('Unable to retrieve your location. Please enter it manually.');
        setIsResolvingLocation(false);
      }
    );
  };

  const updateSuggestions = (inputValue: string) => {
    const tokens = inputValue.split(',');
    const lastToken = tokens[tokens.length - 1]?.trim().toLowerCase() ?? '';

    if (!lastToken) {
      setSuggestions([]);
      return;
    }

    const normalized = lastToken.replace(/\s+/g, '_');
    const matches = symptomVocabulary
      .filter((symptom) => {
        const friendlyLabel = getSymptomLabel(symptom).toLowerCase();
        const rawLabel = symptom.replace(/_/g, ' ').toLowerCase();
        return (
          friendlyLabel.includes(lastToken) ||
          rawLabel.includes(lastToken) ||
          symptom.includes(normalized)
        );
      })
      .slice(0, 6);

    setSuggestions(matches);
  };

  const handleSymptomChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSymptomInput(value);
    updateSuggestions(value);
  };

  const clearSuggestionsWithDelay = () => {
    setTimeout(() => setSuggestions([]), 120);
  };

  const addSuggestion = (suggestion: string) => {
    const formatted = suggestion.trim();
    if (!formatted) {
      return;
    }
    setSymptomInput((prev) =>
      prev ? `${prev}, ${formatted}` : formatted
    );
    setSuggestions([]);
  };

  const applyAutocompleteSuggestion = (symptom: string) => {
    const label = getSymptomLabel(symptom);
    setSymptomInput((prev) => {
      if (!prev.trim()) {
        return label;
      }
      const parts = prev.split(',');
      parts[parts.length - 1] = ` ${label}`;
      const normalizedParts = parts
        .map((part) => part.trim())
        .filter(Boolean);
      return normalizedParts.join(', ');
    });
    setSuggestions([]);
  };

  return (
    <section
      id="symptom-checker"
      className="relative bg-slate-950 text-white py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-slate-900/40 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="uppercase text-sm tracking-[0.3em] text-blue-200/80 mb-4">
            Smart Symptom Guidance
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Describe your symptoms, we'll guide you to the right care
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Our triage assistant maps your symptoms to likely medical specialities,
            surfaces possible causes, and highlights nearby specialists ready to help.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          <SymptomInputPanel
            symptomInput={symptomInput}
            locationInput={locationInput}
            status={status}
            error={error}
            validationError={validationError}
            suggestions={suggestions}
            isResolvingLocation={isResolvingLocation}
            locationError={locationError}
            onSymptomChange={handleSymptomChange}
            onLocationChange={setLocationInput}
            onSuggestionsClear={clearSuggestionsWithDelay}
            onAutocompleteSuggestion={applyAutocompleteSuggestion}
            onAddSuggestion={addSuggestion}
            onUseLocation={handleUseLocation}
            onSubmit={handleSubmit}
          />

          <AssessmentPanel
            assessment={assessment}
            status={status}
            onAddSuggestion={addSuggestion}
          />

          <DoctorResultsPanel
            doctors={doctors}
            doctorStatus={doctorStatus}
            assessment={assessment}
            locationInput={locationInput}
            status={status}
          />
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
