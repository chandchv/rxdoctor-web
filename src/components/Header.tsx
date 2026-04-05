import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

type NavItem =
  | { label: string; type: 'scroll'; target: string }
  | { label: string; type: 'route'; to: string };

const navItems: NavItem[] = [
  { label: 'Symptom Checker', type: 'route', to: '/symptom-checker' },
  { label: 'Features', type: 'scroll', target: 'features' },
  { label: 'About', type: 'scroll', target: 'about' },
  { label: 'Gallery', type: 'scroll', target: 'gallery' },
  { label: 'Pricing', type: 'scroll', target: 'pricing' },
  { label: 'Contact', type: 'scroll', target: 'contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollNav = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      scrollToSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-gray-900/90 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <img
              src="/Logo.png"
              alt="RxDoctor"
              className="h-10 w-auto object-contain drop-shadow-lg"
              loading="lazy"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-400'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleScrollNav(item.target)}
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-400'
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`font-medium transition-colors duration-300 ${
              isScrolled 
                ? 'text-blue-600 hover:text-blue-700' 
                : 'text-white hover:text-blue-400'
            }`}>
              Sign In
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <a
              href="https://app.rxdoctor.in"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              RxDoctor App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) =>
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block w-full text-left font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleScrollNav(item.target)}
                  className="block w-full text-left font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  {item.label}
                </button>
              )
            )}
            <div className="pt-4 space-y-3 border-t border-gray-200">
              <button className="block w-full text-left text-blue-600 font-medium py-2">
                Sign In
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </button>
              <a
                href="https://app.rxdoctor.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center mt-2"
              >
                App Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 