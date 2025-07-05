import React from 'react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: 'Patient-Centric Focus',
      description: 'Every feature is designed with patient care and safety as the top priority.'
    },
    {
      icon: Users,
      title: 'Healthcare Collaboration',
      description: 'Facilitating seamless communication between all healthcare stakeholders.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Excellence',
      description: 'Leveraging cutting-edge technology to solve real healthcare challenges.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Maintaining the highest standards of reliability and data security.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Revolutionizing Healthcare
                <span className="text-gradient block">One Practice at a Time</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                RxDoctor was born from the vision of healthcare professionals who understood 
                the daily challenges of modern medical practice. We've created a comprehensive 
                platform that not only digitizes healthcare workflows but transforms them.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-lg">01</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Founded by Healthcare Professionals</h3>
                  <p className="text-gray-600">Built by doctors and healthcare administrators who understand real-world challenges.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-lg">02</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Intelligence</h3>
                  <p className="text-gray-600">Advanced machine learning algorithms provide intelligent insights and recommendations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-lg">03</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Healthcare Impact</h3>
                  <p className="text-gray-600">Serving healthcare providers across 25+ countries with localized solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Rx</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600">Chief Medical Officer</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "RxDoctor has transformed how we deliver healthcare. The AI-powered insights 
                  have improved our diagnostic accuracy by 40%, and our patient satisfaction 
                  scores have never been higher."
                </blockquote>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                  <span className="text-gray-600 ml-2">5.0/5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do at RxDoctor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <value.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">{value.title}</h4>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              To empower healthcare professionals with intelligent, integrated technology solutions 
              that enhance patient care, streamline operations, and improve health outcomes globally. 
              We believe that by simplifying healthcare technology, we can help doctors focus on 
              what matters most - their patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 