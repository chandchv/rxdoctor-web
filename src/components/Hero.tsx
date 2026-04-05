import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Play, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryFeatures } from '../data/galleryItems';

const Hero: React.FC = () => {
  const slides = useMemo(
    () =>
      galleryFeatures.slice(0, 6).map((feature) => ({
        image: feature.image,
        title: feature.title,
        tagline: feature.tagline,
        slug: feature.slug,
      })),
    []
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (slides.length === 0) return;
    const normalized = (index + slides.length) % slides.length;
    setCurrentSlide(normalized);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8 animate-slide-up">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span className="text-white">Trusted by 1000+ Healthcare Professionals</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Complete</span>
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Healthcare
                </span>
                <span className="text-white">Management Solution</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Streamline your medical practice with our comprehensive platform. 
                Manage appointments, patient records, billing, prescriptions, and more - all in one place.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'AI-Powered Diagnostics',
                'Secure Patient Records',
                'Automated Billing',
                'Mobile Accessibility'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200 text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-gray-300">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">HIPAA</div>
                <div className="text-sm">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>

          {/* Hero Image Slider */}
          <div className="relative animate-float mt-8 lg:mt-0">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-1 sm:p-1.5 border border-white/20 shadow-2xl overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide) => (
                  <div key={slide.slug} className="relative min-w-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[360px] sm:h-[420px] object-cover rounded-3xl"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent p-6 rounded-b-3xl">
                      <p className="text-sm uppercase tracking-[0.4em] text-blue-200">
                        Featured
                      </p>
                      <h3 className="text-2xl font-semibold text-white">{slide.title}</h3>
                      <p className="text-gray-200 text-sm mt-1">{slide.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-lg hover:bg-white transition"
                    onClick={() => goToSlide(currentSlide - 1)}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-900 flex items-center justify-center shadow-lg hover:bg-white transition"
                    onClick={() => goToSlide(currentSlide + 1)}
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
                    {slides.map((slide, index) => (
                      <button
                        key={slide.slug}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          currentSlide === index ? 'w-10 bg-white' : 'w-2.5 bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 