import React from 'react';
import { Users, Building2, Globe, Award } from 'lucide-react';

const Stats: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '50,000+',
      label: 'Patient Records',
      description: 'Securely managed'
    },
    {
      icon: Building2,
      number: '1,500+',
      label: 'Healthcare Providers',
      description: 'Trust our platform'
    },
    {
      icon: Globe,
      number: '25+',
      label: 'Countries',
      description: 'Worldwide presence'
    },
    {
      icon: Award,
      number: '99.9%',
      label: 'Uptime',
      description: 'Guaranteed reliability'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of healthcare providers who have transformed their practice with RxDoctor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl mb-6">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Certified & Compliant</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              'HIPAA Compliant',
              'ISO 27001',
              'SOC 2 Type II',
              'GDPR Ready',
              'HL7 FHIR',
              'FDA Approved'
            ].map((badge, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-600"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 