export interface DoctorProfile {
  id: string;
  name: string;
  speciality: string;
  experienceYears: number;
  consultationFee: number | null;
  location: string;
  clinicName?: string;
  bookingUrl: string;
  deepLink: string;
  teleconsult: boolean;
  degree?: string;
  profilePicture?: string | null;
}

type DoctorSearchParams = {
  speciality: string;
  location?: string;
  limit?: number;
};

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

/**
 * Search for real RxDoctor-registered doctors by speciality and location.
 * Calls the Django backend API. Returns an empty array if the backend
 * is unreachable (the frontend then shows the Google Search fallback).
 */
export const findNearbyDoctors = async ({
  speciality,
  location,
  limit = 5,
}: DoctorSearchParams): Promise<DoctorProfile[]> => {
  try {
    const params = new URLSearchParams({ speciality });
    if (location) params.set('location', location);
    params.set('limit', String(limit));

    const response = await fetch(
      `${API_BASE}/health-ai/api/symptom-checker/doctors/?${params.toString()}`
    );

    if (!response.ok) {
      console.warn('Doctor search API returned', response.status);
      return [];
    }

    const data = await response.json();
    return (data.doctors ?? []) as DoctorProfile[];
  } catch (err) {
    // Backend unreachable — frontend will show Google Search fallback
    console.warn('Doctor search API unreachable:', err);
    return [];
  }
};

export default findNearbyDoctors;
