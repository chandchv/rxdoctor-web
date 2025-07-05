import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    message: '',
    practiceSize: 'small'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        practice: '',
        message: '',
        practiceSize: 'small'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri 8AM-8PM EST'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['sales@rxdoctor.com', 'support@rxdoctor.com'],
      description: '24/7 email support'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: ['123 Healthcare Blvd', 'Medical District, CA 90210'],
      description: 'Visit our headquarters'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: ['24/7 Emergency Support', 'Business Hours: 8AM-8PM EST'],
      description: 'Always here when you need us'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform
            <span className="text-gradient block">Your Practice?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our healthcare technology experts. We'll help you find the perfect 
            solution for your practice and guide you through every step of the implementation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Schedule Your Free Consultation
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Dr. John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="practiceSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Practice Size
                    </label>
                    <select
                      id="practiceSize"
                      name="practiceSize"
                      value={formData.practiceSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    >
                      <option value="small">1-5 Doctors</option>
                      <option value="medium">6-20 Doctors</option>
                      <option value="large">21-50 Doctors</option>
                      <option value="enterprise">50+ Doctors</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="practice" className="block text-sm font-medium text-gray-700 mb-2">
                    Practice/Organization Name
                  </label>
                  <input
                    type="text"
                    id="practice"
                    name="practice"
                    value={formData.practice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Medical Center Name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your needs
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="What challenges are you facing with your current system? What features are most important to you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>

                <p className="text-sm text-gray-600 text-center">
                  By submitting this form, you agree to our privacy policy. We'll contact you within 24 hours.
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h4>
                <p className="text-gray-600">
                  Your message has been sent successfully. Our team will contact you within 24 hours 
                  to schedule your free consultation.
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Our healthcare technology experts are standing by to help you transform your practice. 
                Reach out to us through any of the channels below.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700 mb-1">{detail}</p>
                    ))}
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call-to-Action */}
            <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Need Immediate Assistance?</h4>
              <p className="text-blue-100 mb-6">
                Our support team is available 24/7 for urgent technical issues and emergency support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Call Emergency Support
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Live Chat
                </button>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Answers</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900">How long does implementation take?</h5>
                  <p className="text-gray-600 text-sm">Typically 2-4 weeks depending on practice size and complexity.</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Do you provide training?</h5>
                  <p className="text-gray-600 text-sm">Yes, comprehensive training and ongoing support are included.</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Can we migrate existing data?</h5>
                  <p className="text-gray-600 text-sm">Absolutely! We handle data migration from most existing systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 