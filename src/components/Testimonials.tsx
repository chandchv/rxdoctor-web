import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      clinic: 'Heart Care Medical Center',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "RxDoctor has revolutionized our practice. The AI-powered diagnostics have improved our accuracy by 40%, and patient satisfaction is at an all-time high. The seamless integration saved us countless hours."
    },
    {
      name: 'Dr. Sarah Williams',
      role: 'Family Physician',
      clinic: 'Community Health Clinic',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The scheduling system is incredible. We've reduced no-shows by 60% with automated reminders. The mobile app lets me access patient records anywhere, which is invaluable for emergency consultations."
    },
    {
      name: 'Dr. James Rodriguez',
      role: 'Pediatrician',
      clinic: 'Kids First Medical Group',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "As a pediatrician, I love how RxDoctor makes it easy to track growth charts and vaccination schedules. Parents appreciate the patient portal where they can access their child's records and communicate with our team."
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Dermatologist',
      clinic: 'Skin Health Specialists',
      image: 'https://images.unsplash.com/photo-1594824475317-1e0f2a3e9e6a?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The telemedicine features have expanded our reach significantly. We can now serve patients in remote areas effectively. The image sharing capabilities are perfect for dermatology consultations."
    },
    {
      name: 'Dr. Robert Kim',
      role: 'Orthopedic Surgeon',
      clinic: 'Advanced Orthopedics',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The surgical scheduling and pre-op workflow management features are outstanding. We've streamlined our entire process from consultation to post-operative care. ROI was evident within 3 months."
    },
    {
      name: 'Dr. Lisa Thompson',
      role: 'Internal Medicine',
      clinic: 'Metro Medical Associates',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The billing integration with insurance providers has been a game-changer. Claims processing is now automated, and our revenue cycle has improved dramatically. The financial reporting gives us great insights."
    }
  ];

  const stats = [
    { label: 'Patient Satisfaction', value: '98%', description: 'Average rating across all practices' },
    { label: 'Time Saved', value: '40%', description: 'Reduction in administrative tasks' },
    { label: 'Revenue Increase', value: '25%', description: 'Average revenue growth' },
    { label: 'Error Reduction', value: '85%', description: 'Fewer medical errors' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Healthcare
            <span className="text-gradient block">Professionals Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how RxDoctor is transforming medical practices and improving patient outcomes
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-primary-600">{testimonial.clinic}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Story Highlight */}
        <div className="mt-20 gradient-bg rounded-3xl p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Success Story: Metro Medical Group
              </h3>
              <p className="text-lg text-blue-100 mb-8">
                "After implementing RxDoctor across our 5 locations, we saw immediate improvements. 
                Patient wait times decreased by 50%, our staff productivity increased by 35%, and 
                patient satisfaction scores reached an all-time high of 4.9/5."
              </p>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face"
                  alt="Dr. Anderson"
                  className="w-15 h-15 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">Dr. Mark Anderson</div>
                  <div className="text-blue-200">Chief Medical Officer</div>
                  <div className="text-blue-200">Metro Medical Group</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">50%</div>
                <div className="text-blue-200">Reduced Wait Times</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">35%</div>
                <div className="text-blue-200">Increased Productivity</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">4.9/5</div>
                <div className="text-blue-200">Patient Satisfaction</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold mb-2">$2M+</div>
                <div className="text-blue-200">Annual Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 