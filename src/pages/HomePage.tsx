import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import About from '../components/About';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SymptomChecker from '../components/SymptomChecker';
import Gallery from '../components/Gallery';
import AppDownloadCTA from '../components/AppDownloadCTA';
import SocialProofSection from '../components/SocialProofSection';

type LocationState = {
  scrollTo?: string;
} | null;

const HomePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.scrollTo) {
      const targetId = state.scrollTo;
      const timeout = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

      navigate(location.pathname, { replace: true, state: null });

      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [location, navigate]);

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RxDoctor',
    url: 'https://rxdoctor.in',
    logo: 'https://rxdoctor.in/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-843-1361-112',
      contactType: 'customer service',
    },
    sameAs: [
      'https://facebook.com/rxdoctor',
      'https://twitter.com/rxdoctor',
      'https://linkedin.com/company/rxdoctor',
      'https://instagram.com/rxdoctor',
    ],
  };

  return (
    <>
      <SEOHelmet
        title="RxDoctor | Intelligent Healthcare Operations Platform"
        description="RxDoctor unifies appointments, EMR, billing, and AI-guided symptom triage so doctors and clinics can deliver faster, safer care."
        canonicalUrl="https://rxdoctor.in/"
        ogImage="https://rxdoctor.in/og-home.png"
        ogType="website"
        structuredData={organizationData}
      />
      <Header />
      <main className="pt-24">
        <Hero />
        <SymptomChecker />
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <AppDownloadCTA variant="banner" />
        </div>
        <Stats />
        <SocialProofSection />
        <Features />
        <About />
        <Pricing />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

