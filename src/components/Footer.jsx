// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus("loading");
    // Simulate API call – replace with your actual newsletter service
    setTimeout(() => {
      console.log("Newsletter signup:", newsletterEmail);
      setNewsletterStatus("success");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }, 800);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-brand-blue/95 to-slate-900 text-white pt-16 pb-6 overflow-hidden">
      {/* Animated background shape */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & about */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="logo.jpg" alt="Kreativemandu" className="h-10 w-auto rounded-lg" />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-white to-brand-orange bg-clip-text text-transparent">
                Kreativemandu
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              We build scalable web applications, design intuitive interfaces, and deliver IT solutions that drive real business growth.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-orange transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-orange transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.678-11.49c0-.213-.004-.426-.015-.637A9.935 9.935 0 0024 4.555z"/></svg>
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-orange transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-orange transition transform hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-l-4 border-brand-orange pl-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('home')} className="hover:text-brand-orange transition flex items-center gap-2 group">🏠 <span>Home</span><span className="opacity-0 group-hover:opacity-100 transition">→</span></button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition flex items-center gap-2 group">⚙️ <span>Services</span><span className="opacity-0 group-hover:opacity-100 transition">→</span></button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-brand-orange transition flex items-center gap-2 group">📁 <span>Portfolio</span><span className="opacity-0 group-hover:opacity-100 transition">→</span></button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-brand-orange transition flex items-center gap-2 group">👥 <span>About Us</span><span className="opacity-0 group-hover:opacity-100 transition">→</span></button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-brand-orange transition flex items-center gap-2 group">📞 <span>Contact</span><span className="opacity-0 group-hover:opacity-100 transition">→</span></button></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-l-4 border-brand-orange pl-3">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition">Web Development</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition">App Development</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition">UI/UX Design</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition">Cybersecurity</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-orange transition">Cloud Solutions</button></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-l-4 border-brand-orange pl-3">Stay Updated</h3>
            <p className="text-slate-300 text-sm">Subscribe to our newsletter for the latest insights and offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
                required
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="px-4 py-2 bg-brand-orange text-white rounded-lg font-semibold hover:bg-brand-blue transition disabled:opacity-50"
              >
                {newsletterStatus === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "success" && <p className="text-green-400 text-xs">Subscribed! 🎉</p>}
            
            <div className="pt-4 space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span>contact@kreativemandu.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <span>+977 1 1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Kathmandu, Nepal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <div>© {new Date().getFullYear()} Kreativemandu. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-brand-orange transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-brand-orange transition">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-brand-orange transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;