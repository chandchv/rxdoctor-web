import React from 'react';
import { 
  Calendar, 
  FileText, 
  CreditCard, 
  Smartphone, 
  Shield, 
  Brain, 
  Users, 
  BarChart3,
  MessageSquare,
  Pill,
  Heart,
  Database
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Appointment Management',
      description: 'Intelligent scheduling with automated reminders, conflict detection, and patient self-booking capabilities.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Electronic Health Records',
      description: 'Comprehensive patient records with voice-to-text, templates, and seamless integration across all modules.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: CreditCard,
      title: 'Automated Billing & Insurance',
      description: 'Streamlined billing process with insurance claims, payment tracking, and financial reporting.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Brain,
      title: 'AI-Powered Diagnostics',
      description: 'Advanced AI assistance for diagnosis suggestions, drug interactions, and treatment recommendations.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Pill,
      title: 'Prescription Management',
      description: 'Digital prescriptions with drug interaction checks, dosage calculations, and pharmacy integration.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Heart,
      title: 'Patient Monitoring',
      description: 'Real-time vital signs tracking, chronic disease management, and automated health alerts.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Comprehensive dashboards with practice insights, revenue tracking, and performance metrics.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: MessageSquare,
      title: 'Patient Communication',
      description: 'Secure messaging, telemedicine capabilities, and multi-channel patient engagement tools.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Database,
      title: 'Lab Integration',
      description: 'Seamless lab test ordering, result management, and integration with major laboratory networks.',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile Accessibility',
      description: 'Full-featured mobile apps for doctors and patients with offline capabilities and sync.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with HIPAA compliance, data encryption, and audit trails.',
      color: 'from-gray-500 to-gray-600'
    },
    {
      icon: Users,
      title: 'Multi-Practice Management',
      description: 'Manage multiple locations, staff roles, and practice networks from a single dashboard.',
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Everything You Need to Run Your
            <span className="text-gradient block">Modern Medical Practice</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Comprehensive healthcare management platform designed by doctors, for doctors. 
            Streamline operations, enhance patient care, and grow your practice.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-8 group hover:scale-105 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 gradient-bg rounded-3xl p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Integrated Ecosystem for Complete Healthcare Management
              </h3>
              <p className="text-lg text-blue-100 mb-8">
                Unlike fragmented solutions, RxDoctor provides a unified platform where all components 
                work seamlessly together, eliminating data silos and improving workflow efficiency.
              </p>
              <div className="space-y-4">
                {[
                  'Single Sign-On across all modules',
                  'Real-time data synchronization',
                  'Unified patient journey tracking',
                  'Integrated financial reporting'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-green-800 text-sm">✓</span>
                    </div>
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Appointments', value: '1,247' },
                    { label: 'Patients', value: '8,943' },
                    { label: 'Revenue', value: '$124K' },
                    { label: 'Satisfaction', value: '98%' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 