import React, { useState } from 'react';
import { MapPin, ExternalLink, Search } from 'lucide-react';
import { DoctorProfile } from '../services/doctorApi';
import { SymptomAssessment } from '../services/symptomClassifier';
import { buildGoogleSearchUrl } from '../services/doctorSearchLinkBuilder';
import WhatsAppCTA from './WhatsAppCTA';
import AppDownloadCTA from './AppDownloadCTA';

export interface DoctorResultsPanelProps {
  doctors: DoctorProfile[];
  doctorStatus: 'idle' | 'loading' | 'complete';
  assessment: SymptomAssessment | null;
  locationInput: string;
  status: 'idle' | 'loading' | 'error' | 'complete';
}

const DoctorResultsPanel: React.FC<DoctorResultsPanelProps> = ({
  doctors,
  doctorStatus,
  assessment,
  locationInput,
  status,
}) => {
  const [showFallbackLink, setShowFallbackLink] = useState(false);

  const googleSearchUrl =
    assessment
      ? buildGoogleSearchUrl(assessment.speciality, locationInput || undefined)
      : '';

  const handleGoogleSearchClick = () => {
    setShowFallbackLink(true);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center backdrop-blur">
          <MapPin className="w-6 h-6 text-blue-300" />
        </div>
        <div>
          <p className="text-sm text-blue-200/80 uppercase tracking-widest">
            Step 3
          </p>
          <h3 className="text-xl font-semibold text-white">
            Nearby specialists
          </h3>
        </div>
      </div>

      {status === 'idle' && doctorStatus === 'idle' && (
        <p className="text-gray-400">
          We'll list top doctors once you confirm the speciality.
        </p>
      )}

      {doctorStatus === 'loading' && (
        <div data-testid="doctor-skeleton-loader" className="space-y-4 animate-pulse">
          <div className="h-6 bg-gray-700/50 rounded-xl w-3/4" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-1/2" />
          <div className="h-20 bg-gray-700/50 rounded-2xl w-full" />
          <div className="h-20 bg-gray-700/50 rounded-2xl w-full" />
          <div className="h-4 bg-gray-700/50 rounded-xl w-2/3" />
        </div>
      )}

      {/* Google Search button - shown when assessment is available and status is not idle */}
      {assessment && status !== 'idle' && (
        <div className="mb-6 space-y-2">
          <a
            data-testid="google-search-button"
            href={googleSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGoogleSearchClick}
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition w-full justify-center"
          >
            <Search className="w-4 h-4" />
            Search doctors on Google
            <ExternalLink className="w-4 h-4" />
          </a>
          {showFallbackLink && (
            <a
              data-testid="google-search-fallback"
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-blue-300 underline break-all hover:text-blue-200 transition"
            >
              {googleSearchUrl}
            </a>
          )}
        </div>
      )}

      {doctorStatus === 'complete' && assessment && (
        <div className="space-y-4">
          {doctors.length > 0 ? (
            <>
              <p className="text-sm text-gray-400 mb-2">
                {doctors.length} RxDoctor-registered specialist{doctors.length > 1 ? 's' : ''} found
              </p>
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="p-5 rounded-2xl bg-black/30 border border-white/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-lg text-white">
                        {doctor.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {doctor.speciality}
                        {doctor.degree ? ` · ${doctor.degree}` : ''}
                      </p>
                    </div>
                    <div className="text-right hidden lg:block" data-testid="doctor-details-extra">
                      <p className="text-sm text-gray-400">Experience</p>
                      <p className="font-semibold text-white">
                        {doctor.experienceYears}+ yrs
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 hidden lg:flex flex-wrap items-center gap-4 text-sm text-gray-300" data-testid="doctor-meta-details">
                    {doctor.consultationFee != null && (
                      <span>₹{doctor.consultationFee}</span>
                    )}
                    {doctor.location && <span>{doctor.location}</span>}
                    {doctor.clinicName && <span>{doctor.clinicName}</span>}
                    {doctor.teleconsult && (
                      <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-100 text-xs font-medium">
                        Teleconsult available
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={doctor.bookingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition inline-flex items-center justify-center"
                    >
                      Book appointment
                    </a>
                    <a
                      href={doctor.deepLink}
                      className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition hidden lg:inline-flex items-center justify-center"
                    >
                      Open in RxDoctor app
                    </a>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="p-5 rounded-2xl border border-dashed border-blue-300/60 bg-blue-500/10 text-blue-100">
              <p className="font-semibold mb-1 text-white">
                No registered doctors found for this speciality
              </p>
              <p className="text-sm mb-3">
                Use the Google Search button above to find {assessment.speciality} specialists near you, or try the RxDoctor app.
              </p>
            </div>
          )}
        </div>
      )}

      {doctorStatus === 'complete' && assessment && (
        <div className="mt-6">
          <WhatsAppCTA
            phoneNumber="918431361112"
            message="Hi, I just checked my symptoms on RxDoctor and need help finding a doctor"
          />
        </div>
      )}

      {doctorStatus === 'complete' && assessment && (
        <div className="mt-4">
          <AppDownloadCTA
            variant="inline"
            message="Get the RxDoctor app for faster bookings"
          />
        </div>
      )}
    </div>
  );
};

export default DoctorResultsPanel;
