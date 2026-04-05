import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import SymptomChecker from '../components/SymptomChecker';
import SEOHelmet from '../components/SEOHelmet';
import EmailCaptureForm from '../components/EmailCaptureForm';
import TrustBadges from '../components/TrustBadges';
import { Activity, Stethoscope, Video, MapPin } from 'lucide-react';

const SymptomCheckerPage: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'RxDoctor Symptom Checker',
    url: 'https://rxdoctor.in/symptom-checker',
    description:
      'Describe your symptoms and get instant speciality recommendations, urgency guidance, and nearby doctor suggestions from RxDoctor.',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://rxdoctor.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Symptom Checker',
          item: 'https://rxdoctor.in/symptom-checker',
        },
      ],
    },
  };

  return (
    <>
      <SEOHelmet
        title="AI Symptom Checker & Doctor Finder | RxDoctor"
        description="Use RxDoctor's AI-informed symptom checker to map your symptoms to the right speciality, understand possible causes, and book nearby doctors instantly."
        canonicalUrl="https://rxdoctor.in/symptom-checker"
        ogImage="https://rxdoctor.in/og-symptom-checker.png"
        ogType="website"
        structuredData={structuredData}
      />
      <Header />
      <main className="pt-24 bg-slate-950 text-white">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-blue-200">
              Intelligent Triage
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Symptom-Based Doctor Recommendations Powered by RxDoctor
            </h1>
            <p className="text-lg text-gray-300">
              Enter your symptoms in natural language and our rule-based classifier
              will highlight likely medical specialities, urgency level, and local
              doctors. No signup required—use it to fast-track your care journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              <TrustBadges
                badges={[
                  { icon: <Activity className="w-4 h-4 text-blue-400" />, label: 'mapped symptoms', value: '250+' },
                  { icon: <Stethoscope className="w-4 h-4 text-green-400" />, label: 'medical specialities', value: '15+' },
                  { icon: <Video className="w-4 h-4 text-purple-400" />, label: 'Teleconsult fallback', value: '' },
                  { icon: <MapPin className="w-4 h-4 text-red-400" />, label: 'Location-aware doctor list', value: '' },
                ]}
              />
            </div>
          </div>
        </section>

        <SymptomChecker />

        <section className="py-20 bg-slate-900/60 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                When to use this symptom checker?
              </h2>
              <p className="text-gray-300">
                Use it as a pre-consultation guide when you are unsure which doctor
                to see. It is ideal for common symptoms such as chest pain, skin
                issues, digestive discomfort, respiratory symptoms, and urinary
                concerns.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">What to expect</h3>
              <ul className="space-y-3 text-gray-300">
                <li>✔︎ Suggested speciality and urgency chip</li>
                <li>✔︎ Top matches from our disease-symptom dataset</li>
                <li>✔︎ Nearby doctors with in-clinic and telehealth options</li>
                <li>✔︎ Direct links to book appointments through RxDoctor</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Important disclaimer</h3>
              <p className="text-gray-400 text-sm">
                RxDoctor Symptom Checker is an information tool and not a substitute
                for professional medical advice, diagnosis, or emergency care. If you
                experience red-flag symptoms such as severe chest pain, loss of
                consciousness, heavy bleeding, or difficulty breathing, call emergency
                services immediately.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <h2 className="text-2xl font-semibold text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-semibold">
                  How accurate is the speciality recommendation?
                </h3>
                <p className="text-sm text-gray-400">
                  We map each symptom to disease profiles and medical specialities
                  vetted by clinicians. Accuracy improves when you provide 2-3 specific
                  symptoms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Can I book a doctor directly?</h3>
                <p className="text-sm text-gray-400">
                  Yes. We list nearby doctors and provide deep links to RxDoctor’s
                  booking experience plus teleconsult options when no local doctor is
                  available.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">
                  Does this replace seeing a healthcare professional?
                </h3>
                <p className="text-sm text-gray-400">
                  No. This tool accelerates triage and reduces confusion but cannot
                  confirm a diagnosis. Always follow up with a qualified medical
                  professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <EmailCaptureForm valueProposition="Get health tips and doctor recommendations in your inbox" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SymptomCheckerPage;

