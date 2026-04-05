import React from 'react';
import {
  Activity,
  Heart,
  Brain,
  Wind,
  Scan,
  Stethoscope,
  Apple,
  Droplets,
  Ear,
  Scissors,
  Bone,
  Pill,
  Shield,
  Bug,
  HeartPulse,
  AlertCircle,
  LucideIcon,
} from 'lucide-react';
import { SymptomAssessment, UrgencyLevel } from '../services/symptomClassifier';
import { quickSymptomSuggestions } from './SymptomInputPanel';

/** Mapping from speciality string to a lucide-react icon component */
export const specialityIconMap: Record<string, LucideIcon> = {
  Cardiology: Heart,
  Neurology: Brain,
  Pulmonology: Wind,
  Dermatology: Scan,
  'General Physician': Stethoscope,
  Gastroenterology: Apple,
  Urologist: Droplets,
  'ENT Specialist': Ear,
  'General Surgeon': Scissors,
  Orthopedics: Bone,
  Rheumatology: Activity,
  Endocrinology: Pill,
  'Allergist/Immunologist': Shield,
  'Allergist / Immunologist': Shield,
  'Infectious Disease Specialist': Bug,
  'Vascular Surgeon': HeartPulse,
};

const urgencyColors: Record<UrgencyLevel, string> = {
  high: 'bg-red-500/15 text-red-300 border border-red-500/30',
  medium: 'bg-yellow-500/15 text-yellow-200 border border-yellow-500/30',
  low: 'bg-green-500/15 text-green-200 border border-green-500/30',
};

export interface AssessmentPanelProps {
  assessment: SymptomAssessment | null;
  status: 'idle' | 'loading' | 'error' | 'complete';
  onAddSuggestion?: (suggestion: string) => void;
}

const AssessmentPanel: React.FC<AssessmentPanelProps> = ({ assessment, status, onAddSuggestion }) => {
  const SpecialityIcon = assessment ? (specialityIconMap[assessment.speciality] ?? Activity) : Activity;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center backdrop-blur">
          <Activity className="w-6 h-6 text-purple-300" />
        </div>
        <div>
          <p className="text-sm text-purple-200/80 uppercase tracking-widest">
            Step 2
          </p>
          <h3 className="text-xl font-semibold">Speciality recommendation</h3>
        </div>
      </div>

      {status === 'idle' && (
        <p className="text-gray-400">
          Submit your symptoms to view the recommended speciality, possible
          conditions, and urgency guidance.
        </p>
      )}

      {status === 'loading' && (
        <div data-testid="skeleton-loader" className="space-y-4 animate-pulse">
          <div className="h-8 bg-gray-700/50 rounded-xl w-3/4" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-1/2" />
          <div className="h-24 bg-gray-700/50 rounded-2xl w-full" />
          <div className="h-24 bg-gray-700/50 rounded-2xl w-full" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-2/3" />
        </div>
      )}

      {status === 'error' && !assessment && (
        <div data-testid="error-no-match" className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10">
            <AlertCircle className="w-5 h-5 text-amber-300 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-amber-200 font-medium">
                We couldn't find a match. Try describing your symptoms differently:
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2" data-testid="error-suggestion-chips">
            {quickSymptomSuggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                data-testid={`error-chip-${suggestion}`}
                onClick={() => onAddSuggestion?.(suggestion)}
                className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-sm bg-white/10 border border-transparent hover:bg-white/20 text-gray-200 transition whitespace-nowrap"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {assessment && status === 'complete' && (
        <div
          className="space-y-6"
          style={{ animation: 'fadeIn 0.5s ease-in-out' }}
          data-testid="fade-in-wrapper"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SpecialityIcon
                className="w-7 h-7 text-purple-300"
                data-testid="speciality-icon"
              />
              <div>
                <p className="text-sm text-gray-400">We recommend seeing</p>
                <h4 className="text-2xl font-semibold text-white">
                  {assessment.speciality}
                </h4>
              </div>
            </div>
            <span
              data-testid="urgency-badge"
              className={`px-4 py-2 rounded-full text-sm font-medium ${urgencyColors[assessment.urgency]}${assessment.urgency === 'high' ? ' animate-pulse' : ''}`}
            >
              Urgency: {assessment.urgency.toUpperCase()}
            </span>
          </div>

          {/* Confidence progress bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Confidence</span>
              <span className="text-gray-300" data-testid="confidence-value">
                {assessment.confidence}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div
                data-testid="confidence-bar"
                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${assessment.confidence}%` }}
              />
            </div>
          </div>

          <div className="grid gap-3">
            {assessment.possibleConditions.map((condition) => (
              <div
                key={condition.disease}
                className="p-4 rounded-2xl bg-black/30 border border-white/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Possible condition</p>
                    <p className="font-semibold">{condition.disease}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    Match score {Math.round(condition.score * 100)}%
                  </span>
                </div>
                {condition.matchedSymptoms.length > 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    Matched: {condition.matchedSymptoms.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Matched symptom chips */}
          {assessment.matchedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2" data-testid="matched-symptoms-container">
              {assessment.matchedSymptoms.map((symptom) => (
                <span
                  key={symptom}
                  data-testid="matched-symptom-chip"
                  className="min-h-[44px] min-w-[44px] px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-200 inline-flex items-center"
                >
                  {symptom}
                </span>
              ))}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-100">
            {assessment.recommendation}
          </div>
        </div>
      )}

      {/* Fade-in keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AssessmentPanel;
