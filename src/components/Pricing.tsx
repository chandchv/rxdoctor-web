import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Gift, Sparkles, Building, CreditCard } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const mainPlans = [
    {
      name: 'Free Plan',
      icon: Gift,
      description: 'Perfect for clinics just starting out and wanting to explore the platform.',
      monthlyPrice: 0,
      annualPrice: 0,
      currency: '₹',
      appointments: '250 appointments',
      features: [
        'Free up to first 250 appointments',
        '0 SMS credits per month',
        'As joining bonus get FREE SMS for 250 appointments',
        'Basic patient management',
        'Simple appointment scheduling',
        'Digital prescriptions',
        'Basic reporting'
      ],
      color: 'from-green-500 to-green-600',
      popular: false,
      buttonText: 'Start for Free'
    },
    {
      name: 'Basic Plan',
      icon: Star,
      description: 'Ideal for single practitioners looking for essential tools to manage their practice.',
      monthlyPrice: 1250,
      annualPrice: 1250,
      currency: '₹',
      appointments: 'month',
      features: [
        'Get 1000 appointments free',
        '0 SMS credits after 1000 appointments',
        'For additional SMS credits, clinics must purchase appointment package worth 500 or 1,000',
        'Complete patient records',
        'Advanced scheduling',
        'Billing & invoicing',
        'Inventory management',
        'Basic analytics'
      ],
      color: 'from-blue-500 to-blue-600',
      popular: false,
      buttonText: 'Start with Basic'
    },
    {
      name: 'Growth Plan',
      icon: Zap,
      description: 'Best for expanding clinics that need to handle more appointments efficiently.',
      monthlyPrice: 1875,
      annualPrice: 1875,
      currency: '₹',
      appointments: 'month',
      features: [
        'Unlimited appointments',
        'Advanced SMS credits included',
        'Multi-location support',
        'Advanced analytics & reporting',
        'Online booking system',
        'Patient portal',
        'Automated reminders',
        'Priority support',
        'Custom branding',
        'API access'
      ],
      color: 'from-purple-500 to-purple-600',
      popular: true,
      buttonText: 'Start with Growth'
    }
  ];

  const professionalPlans = [
    {
      name: 'STARTER',
      description: 'Ideal for solo practitioners. You get a tailor-made EMR, so you can write your notes just like on paper. Simple and quick.',
      price: 1999,
      currency: '₹',
      period: 'per practitioner, per month',
      features: [
        'Customisable EMR',
        'Intuitive Scheduling',
        'Complete Financials',
        'Inventory Management',
        'Reporting',
        'Stunning prescriptions',
        'Integrated online payments'
      ],
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'PRO',
      description: 'Ideal for Clinics who want to automate repetitive tasks and go completely paperless. Convert your website into a smart booking tool.',
      price: 2999,
      currency: '₹',
      period: 'per practitioner, per month',
      features: [
        'Everything in STARTER plus',
        'Online Booking',
        'Package Management',
        'Automated Feedbacks',
        'Virtual Assistant',
        'Smart booking tool',
        'Intelligent automation'
      ],
      color: 'from-purple-400 to-purple-500',
      badge: 'Popular🤩'
    },
    {
      name: 'ENTERPRISE',
      description: 'Ideal for Clinics in the expansion mode. Target Leads with promotions. Retain better with integrated Membership Programs.',
      price: 3999,
      currency: '₹',
      period: 'per practitioner, per month',
      features: [
        'Everything in PRO plus',
        'Lead targeting with promotions',
        'Integrated Membership Programs',
        'Referral Program',
        'Loyalty Program',
        'Advanced marketing tools',
        'Enterprise support'
      ],
      color: 'from-gold-400 to-gold-500'
    }
  ];

  const yearlyPlans = [
    {
      name: 'POS Plan',
      price: 5000,
      originalPrice: null,
      currency: '₹',
      period: '/yr + taxes',
      features: [
        'Invoice management',
        'Unlimited doctors & staff',
        'Patient appointment page',
        'Digital Rx prescription',
        'Personalized website'
      ],
      color: 'from-green-400 to-green-500'
    },
    {
      name: 'BASIC Plan',
      price: 11000,
      originalPrice: 15000,
      currency: '₹',
      period: '/yr + taxes',
      features: [
        'Personalized digital Rx',
        'Personalized branded UI',
        '20GB cloud storage',
        'Inventory & Data management',
        'Personalized website'
      ],
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'PRO Plan',
      price: 15000,
      originalPrice: 18000,
      currency: '₹',
      period: '/yr + taxes',
      features: [
        'Multiple practices',
        'Personalized website with SEO',
        'AI analytics',
        'Free sub-domain',
        '50GB cloud Storage'
      ],
      color: 'from-purple-400 to-purple-500'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Clinic Software
            <span className="text-gradient block">Pricing Plans</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Choose the perfect plan for your practice. From free starter plans to enterprise solutions.
          </p>
        </div>

        {/* Main Pricing Plans */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Main Plans</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Best Value
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-bold text-gray-900">
                        {plan.currency}{plan.monthlyPrice}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{plan.appointments}
                      </span>
                    </div>

                    <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                        : plan.name === 'Free Plan'
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      {plan.buttonText}
                    </button>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">What you will get</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Plans */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Professional Plans</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {professionalPlans.map((plan, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      {plan.badge}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.currency}{plan.price.toLocaleString()}
                      </span>
                      <div className="text-gray-600 text-sm mt-1">{plan.period}</div>
                    </div>

                    <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${plan.color} text-white hover:shadow-xl transform hover:scale-105`}>
                      Get Started
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-4">This plan includes…</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Annual Plans</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {yearlyPlans.map((plan, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{plan.name}</h3>
                    
                    <div className="mb-6">
                      {plan.originalPrice && (
                        <div className="text-lg text-gray-500 line-through mb-2">
                          {plan.currency}{plan.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <span className="text-4xl font-bold text-gray-900">
                        {plan.currency}{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600 text-sm ml-2">{plan.period}</span>
                    </div>

                    <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${plan.color} text-white hover:shadow-xl transform hover:scale-105`}>
                      Choose Plan
                    </button>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600">Yes, we offer a completely free plan with 250 appointments to get you started.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I upgrade anytime?</h4>
              <p className="text-gray-600">Absolutely! You can upgrade or downgrade your plan at any time as your practice grows.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">We accept all major credit cards, debit cards, UPI, and bank transfers for Indian customers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600">Yes, we're HIPAA compliant with enterprise-grade security measures and data encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 