import React from 'react';
import { Star, Users, Stethoscope, Building2 } from 'lucide-react';
import TrustBadges from './TrustBadges';

const testimonials = [
  {
    name: 'Priya S.',
    text: 'RxDoctor helped me find a cardiologist within minutes. The symptom checker was spot-on with its recommendation.',
    rating: 5,
  },
  {
    name: 'Rahul M.',
    text: 'I was unsure which specialist to see for my back pain. RxDoctor guided me to the right doctor and I booked an appointment the same day.',
    rating: 5,
  },
  {
    name: 'Anita K.',
    text: 'The teleconsult option saved me a trip to the clinic. Very convenient and the doctor was excellent.',
    rating: 4,
  },
];

const metrics = [
  { value: '1,000+', label: 'Patients Helped' },
  { value: '250+', label: 'Symptoms Mapped' },
  { value: '15+', label: 'Specialities Covered' },
];

const SocialProofSection: React.FC = () => {
  return (
    <section data-testid="social-proof-section" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Patients Across India
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of patients who use RxDoctor to find the right doctor faster.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges
            badges={[
              { icon: <Users className="w-4 h-4 text-blue-500" />, label: 'Patients', value: '1000+' },
              { icon: <Stethoscope className="w-4 h-4 text-green-500" />, label: 'Specialities', value: '15+' },
              { icon: <Building2 className="w-4 h-4 text-purple-500" />, label: 'Clinics', value: '50+' },
            ]}
          />
        </div>

        {/* Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-md">
              <p className="text-3xl font-bold text-blue-600">{metric.value}</p>
              <p className="text-gray-600 mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4">"{t.text}"</p>
              <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
