import React from 'react';
import {
  Activity,
  AlertCircle,
  Crosshair,
  Loader2,
  MapPin,
  Stethoscope,
} from 'lucide-react';
import symptomLabels from '../data/symptomLabels.json';

const labelMap = symptomLabels as Record<string, string>;

const formatSymptomLabel = (value: string) =>
  labelMap[value] ?? value.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();

export const quickSymptomSuggestions = [
  'chest pain',
  'skin rash',
  'itching',
  'vomiting and nausea',
  'shortness of breath',
  'burning while urinating',
];

export interface SymptomInputPanelProps {
  symptomInput: string;
  locationInput: string;
  status: 'idle' | 'loading' | 'error' | 'complete';
  error: string | null;
  validationError: string | null;
  suggestions: string[];
  isResolvingLocation: boolean;
  locationError: string | null;
  onSymptomChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onLocationChange: (value: string) => void;
  onSuggestionsClear: () => void;
  onAutocompleteSuggestion: (symptom: string) => void;
  onAddSuggestion: (suggestion: string) => void;
  onUseLocation: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

/**
 * Color Contrast Audit (WCAG 2.1 AA — 4.5:1 minimum for normal text)
 *
 * Background: slate-950 (#020617)
 * - White (#ffffff) on slate-950 → ~21:1 ✅
 * - gray-300 (#d1d5db) on slate-950 → ~12:1 ✅
 * - gray-400 (#9ca3af) on slate-950 → ~7:1 ✅
 * - blue-200 (#bfdbfe) on slate-950 → ~10:1 ✅
 * - blue-300 (#93c5fd) on blue-500/20 semi-transparent bg → effective ~8:1 ✅
 * - red-200 (#fecaca) on red-500/10 bg (effective ~#1a0a0a) → ~12:1 ✅
 * - red-400 (#f87171) on slate-950 → ~5.5:1 ✅
 * - yellow-200 (#fef08a) on yellow-500/15 bg (effective ~#1a1806) → ~14:1 ✅
 * - amber-300 (#fcd34d) on slate-950 → ~11:1 ✅
 * - green-200 (#bbf7d0) on green-500/15 bg → ~13:1 ✅
 * - purple-200 (#e9d5ff) on slate-950 → ~11:1 ✅
 *
 * All text color combinations pass WCAG 2.1 AA (4.5:1) for normal text.
 * Note: Full WCAG compliance requires manual testing with assistive technologies
 * and expert accessibility review beyond automated contrast checks.
 */
const SymptomInputPanel: React.FC<SymptomInputPanelProps> = ({
  symptomInput,
  locationInput,
  status,
  error,
  validationError,
  suggestions,
  isResolvingLocation,
  locationError,
  onSymptomChange,
  onLocationChange,
  onSuggestionsClear,
  onAutocompleteSuggestion,
  onAddSuggestion,
  onUseLocation,
  onSubmit,
}) => {
  const isChipSelected = (chip: string) => {
    const normalizedInput = symptomInput.toLowerCase();
    return normalizedInput.includes(chip.toLowerCase());
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center backdrop-blur">
          <Stethoscope className="w-6 h-6 text-blue-300" />
        </div>
        <div>
          <p className="text-sm text-blue-200/80 uppercase tracking-widest">
            Step 1
          </p>
          <h3 className="text-xl font-semibold">Tell us what you feel</h3>
        </div>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="symptom-input" className="text-sm text-gray-300">
            Describe your symptoms
          </label>
          <div className="relative mt-2">
            <textarea
              id="symptom-input"
              aria-label="Describe your symptoms"
              className="w-full h-36 rounded-2xl bg-slate-900/70 border border-white/10 p-4 text-base text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              placeholder="e.g. Sharp pain in chest, sweating, shortness of breath..."
              value={symptomInput}
              onChange={onSymptomChange}
              onBlur={onSuggestionsClear}
              maxLength={500}
            />
            {suggestions.length > 0 && (
              <div
                role="listbox"
                aria-label="Symptom suggestions"
                data-testid="autocomplete-listbox"
                className="absolute left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur shadow-2xl max-h-48 overflow-y-auto z-10"
              >
                {suggestions.map((symptom) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={false}
                    aria-label={formatSymptomLabel(symptom)}
                    key={symptom}
                    className="w-full text-left px-4 py-3 min-h-[44px] text-sm text-gray-100 hover:bg-white/10 transition"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onAutocompleteSuggestion(symptom)}
                  >
                    {formatSymptomLabel(symptom)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            aria-live="polite"
            role="status"
            data-testid="suggestions-live-region"
            className="sr-only"
          >
            {suggestions.length > 0
              ? `${suggestions.length} suggestions available`
              : symptomInput.trim() ? 'No suggestions' : ''}
          </div>
          <p data-testid="char-count" className="text-xs text-gray-400 text-right mt-1">
            {symptomInput.length}/500
          </p>
          {validationError && (
            <p data-testid="validation-error" className="text-xs text-red-400 mt-1">
              {validationError}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-300">Quick suggestions</p>
          <div data-testid="quick-chips-container" className="flex flex-nowrap gap-3 overflow-x-auto lg:flex-wrap lg:overflow-visible pb-2 lg:pb-0">
            {quickSymptomSuggestions.map((suggestion) => {
              const selected = isChipSelected(suggestion);
              return (
                <button
                  type="button"
                  key={suggestion}
                  aria-label={suggestion}
                  onClick={() => onAddSuggestion(suggestion)}
                  data-testid={`chip-${suggestion}`}
                  data-selected={selected}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-sm transition whitespace-nowrap ${
                    selected
                      ? 'bg-blue-500/30 border border-blue-400 text-blue-200'
                      : 'bg-white/10 border border-transparent hover:bg-white/20'
                  }`}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm text-gray-300">Your location (optional)</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  aria-label="Your location"
                  value={locationInput}
                  onChange={(event) => onLocationChange(event.target.value)}
                  placeholder="City, neighbourhood, or pin-code"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/70 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                />
              </div>
            </div>
            <button
              type="button"
              aria-label="Use my GPS location"
              onClick={onUseLocation}
              disabled={isResolvingLocation}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-white/20 text-sm text-gray-200 hover:border-blue-400 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResolvingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <Crosshair className="w-4 h-4" />
                  Use my GPS
                </>
              )}
            </button>
          </div>
          {isResolvingLocation && (
            <p className="text-sm text-blue-200 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Resolving your location...
            </p>
          )}
          {locationError && (
            <p className="text-sm text-amber-300">{locationError}</p>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          aria-label="Analyze symptoms"
          data-testid="submit-button"
          className="min-h-[44px] w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-[1.01] transition"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing symptoms...
            </>
          ) : (
            <>
              <Activity className="w-5 h-5" />
              Analyze symptoms
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SymptomInputPanel;
