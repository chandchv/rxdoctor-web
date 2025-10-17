import React from 'react';
import { Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    product: [
      'Features',
      'Pricing',
      'Security',
      'Integrations',
      'API Documentation',
      'Mobile Apps'
    ],
    solutions: [
      'Small Practices',
      'Large Hospitals',
      'Specialty Clinics',
      'Telemedicine',
      'Laboratory Management',
      'Pharmacy Integration'
    ],
    resources: [
      'Documentation',
      'Help Center',
      'Blog',
      'Webinars',
      'Case Studies',
      'White Papers'
    ],
    company: [
      'About Us',
      'Careers',
      'Press',
      'Partners',
      'Contact',
      'Leadership'
    ],
    legal: [
      'Privacy Policy',
      'Terms of Service',
      'HIPAA Compliance',
      'Security',
      'Cookie Policy',
      'Data Processing'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">RxDoctor</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering healthcare professionals with intelligent, integrated technology solutions 
                that enhance patient care and streamline operations.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a href="tel:+918431361112" className="flex items-center space-x-3 hover:text-primary-400 transition-colors">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">+91 843 1361 112</span>
                </a>
                <a href="mailto:rxdoctor24@gmail.com" className="flex items-center space-x-3 hover:text-primary-400 transition-colors">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">rxdoctor24@gmail.com</span>
                </a>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-400">Bangalore, India</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-6">Product</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6">Solutions</h3>
                  <ul className="space-y-3">
                    {footerLinks.solutions.map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6">Resources</h3>
                  <ul className="space-y-3">
                    {footerLinks.resources.map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-400">
                Get the latest updates on healthcare technology trends, product updates, and industry insights.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-center lg:text-left">
              <p>&copy; 2024 RxDoctor. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6">Trusted & Certified</h4>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                'HIPAA Compliant',
                'SOC 2 Type II',
                'ISO 27001',
                'HL7 FHIR',
                'FDA Approved',
                'GDPR Ready'
              ].map((badge, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 text-sm font-medium text-gray-400"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 