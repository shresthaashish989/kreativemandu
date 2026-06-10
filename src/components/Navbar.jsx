import React, { useState, useEffect } from 'react';
// Import your logo (adjust path as needed)
import logo from '../assets/images/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when a link is clicked
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth',
      });
    }
  };

  // Navigation links with section IDs
  const navLinks = [
    { name: 'Home', sectionId: 'home' },
    { name: 'Services', sectionId: 'services' },
    { name: 'Portfolio', sectionId: 'portfolio' },
    { name: 'About', sectionId: 'about' },
    { name: 'Contact', sectionId: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white shadow-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo and brand - scrolls to top */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2 group"
          >
            <img
              src={logo}
              alt="Kreativemandu Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">
              Kreativemandu
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.sectionId}
                href={`#${link.sectionId}`}
                onClick={(e) => handleLinkClick(e, link.sectionId)}
                className="relative px-4 py-2 text-base font-semibold transition-all duration-300 group text-brand-blue hover:text-brand-orange"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-6"></span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="ml-4 bg-brand-orange text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-brand-blue transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-brand-blue transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-brand-blue transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-brand-blue transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              href={`#${link.sectionId}`}
              onClick={(e) => handleLinkClick(e, link.sectionId)}
              className="px-6 py-3 text-base font-semibold transition-colors text-brand-blue hover:bg-slate-50 hover:text-brand-orange"
            >
              {link.name}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="block text-center bg-brand-orange text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-brand-blue transition-all"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;