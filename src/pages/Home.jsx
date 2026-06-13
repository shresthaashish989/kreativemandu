import React, { useState, useEffect, useRef, useCallback } from 'react';

// ---------- Smooth scroll helper (navbar offset 80px) ----------
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' });
  }
};

// ---------- Animated Counter ----------
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

// ---------- Section Header ----------
const SectionHeader = ({ subtitle, title, description }) => (
  <div className="text-center mb-12 animate-fade-in-up">
    <span className="text-brand-orange font-bold tracking-wider uppercase text-sm mb-2 inline-block border-b-2 border-brand-orange/30 pb-1">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-blue mt-4 mb-4 leading-tight">{title}</h2>
    {description && <p className="text-slate-600 max-w-2xl mx-auto">{description}</p>}
  </div>
);

// ---------- Service Card ----------
const ServiceCard = ({ icon, title, description }) => (
  <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-br hover:from-brand-blue hover:to-brand-blue/90 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-2 border border-white/30 hover:border-transparent animate-glow-on-hover">
    <div className="w-14 h-14 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-white group-hover:text-brand-orange transition-all duration-300">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-white transition-colors">{title}</h4>
    <p className="text-slate-600 group-hover:text-blue-100 transition-colors">{description}</p>
  </div>
);

// ---------- Portfolio Item ----------
const PortfolioItem = ({ title, category, image, live, fullImage = false }) => (
  <div className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer">
    <a href={live} target="_blank" rel="noopener noreferrer">
      <img 
        src={image} 
        alt={title} 
        className={`w-full h-64 transition-transform duration-700 group-hover:scale-110 ${fullImage ? 'object-contain bg-slate-100' : 'object-cover'}`}
        style={fullImage ? { objectFit: 'contain', backgroundColor: '#f8fafc' } : {}}
      />
    </a>
    <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-brand-blue/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
      <span className="text-brand-orange text-sm font-semibold mb-1">{category}</span>
      <h4 className="text-white text-xl font-bold">{title}</h4>
      <a 
        href={live} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-3 text-white text-sm font-medium flex items-center gap-1 group/link hover:opacity-80 transition"
      >
        View Project <span className="group-hover/link:translate-x-1 transition">→</span>
      </a>
    </div>
  </div>
);

// ---------- Testimonial Card ----------
const TestimonialCard = ({ quote, name, role, image, rating }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-slate-600 mb-6 italic">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h5 className="font-bold text-brand-blue">{name}</h5>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  </div>
);

// ---------- Team Member ----------
const TeamMember = ({ name, role, image, socials }) => (
  <div className="group text-center">
    <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg">
      <img src={image} alt={name} className="w-full h-80 object-cover object-top group-hover:scale-105 transition duration-500" />
      <div className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
        {socials.map((social, idx) => (
          <a key={idx} href={social.link} className="bg-white p-2 rounded-full text-brand-blue hover:text-brand-orange transition transform hover:scale-110">
            {social.icon}
          </a>
        ))}
      </div>
    </div>
    <h4 className="text-xl font-bold text-brand-blue">{name}</h4>
    <p className="text-brand-orange font-medium">{role}</p>
  </div>
);

// ---------- FAQ Accordion ----------
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-5 group">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full text-left">
        <span className="text-lg font-semibold text-brand-blue group-hover:text-brand-orange transition">{question}</span>
        <svg className={`w-5 h-5 text-brand-orange transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`mt-3 text-slate-600 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

// ---------- Blog Card ----------
const BlogCard = ({ title, excerpt, date, image }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2 border border-white/30">
    <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-700" />
    <div className="p-6">
      <p className="text-brand-orange text-sm font-semibold mb-2">{date}</p>
      <h3 className="text-xl font-bold text-brand-blue mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{excerpt}</p>
      <button onClick={() => scrollToSection('contact')} className="text-brand-blue font-semibold flex items-center gap-1 hover:text-brand-orange transition">
        Read More <span>→</span>
      </button>
    </div>
  </div>
);

// ---------- Tech Icon ----------
const TechIcon = ({ name, icon }) => (
  <div className="flex flex-col items-center group cursor-pointer">
    <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-blue group-hover:to-brand-blue/80 transition-all duration-500 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 border border-white/30 group-hover:border-transparent">
      <div className="text-5xl group-hover:text-white transition-all duration-300 group-hover:scale-110">{icon}</div>
    </div>
    <span className="mt-4 text-sm font-bold text-slate-700 group-hover:text-brand-blue transition">{name}</span>
  </div>
);

// ---------- Process Step ----------
const ProcessStep = ({ number, title, description }) => (
  <div className="relative flex flex-col items-center text-center group">
    <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-orange transition duration-300 backdrop-blur-sm shadow-md">
      <span className="text-2xl font-extrabold text-brand-orange group-hover:text-white transition">{number}</span>
    </div>
    <h4 className="text-xl font-bold text-brand-blue mb-2">{title}</h4>
    <p className="text-slate-600">{description}</p>
    {number !== "04" && (
      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-brand-orange/20 -z-10"></div>
    )}
  </div>
);

// ---------- Metric Card ----------
const MetricCard = ({ title, value, icon, trend, color }) => (
  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
    <div className="flex justify-between items-start mb-3">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>{icon}</div>
      <span className={`text-sm font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {trend >= 0 ? `+${trend}%` : `${trend}%`}
      </span>
    </div>
    <h3 className="text-2xl font-bold text-brand-blue group-hover:text-brand-orange transition-colors">{value}</h3>
    <p className="text-slate-500 text-sm mt-1">{title}</p>
  </div>
);

// ---------- Activity Feed ----------
const ActivityFeed = ({ activities }) => (
  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <h3 className="text-lg font-bold text-brand-blue">Live Activity Feed</h3>
      <span className="text-xs text-slate-400 ml-auto">Real-time</span>
    </div>
    <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
      {activities.map((activity, idx) => (
        <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
          <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
            {activity.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-700">{activity.message}</p>
            <span className="text-xs text-slate-400">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------- Mini Line Chart ----------
const LiveChart = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (i / 4) * height;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    const maxVal = Math.max(...data, 1);
    const minVal = Math.min(...data, 0);
    const range = maxVal - minVal || 1;
    const points = data.map((val, idx) => ({
      x: (idx / (data.length - 1)) * width,
      y: height - ((val - minVal) / range) * height
    }));
    
    ctx.beginPath();
    ctx.strokeStyle = '#F97316';
    ctx.lineWidth = 2;
    points.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)');
    gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
    ctx.lineTo(points[points.length-1].x, height);
    ctx.lineTo(points[0].x, height);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#F97316';
      ctx.fill();
    });
  }, [data]);

  return <canvas ref={canvasRef} width={400} height={200} className="w-full h-48" />;
};

// ---------- Project Progress Card ----------
const ProjectProgress = ({ projects }) => (
  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40">
    <h3 className="text-lg font-bold text-brand-blue mb-4">Project Status</h3>
    <div className="space-y-4">
      {projects.map((project, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">{project.name}</span>
            <span className="text-brand-orange">{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-brand-orange to-brand-blue h-full rounded-full transition-all duration-1000"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ---------- SEAMLESS INFINITE VERTICAL CAROUSEL (no gaps, smooth JS-driven) ----------
const TwoColumnContinuousCarousel = () => {
  const videos = [
    { id: 1, client: "KATN Podcast", handle: "@katn.podcast", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&h=1067&q=80", rating: 5, videoUrl: "#" },
    { id: 2, client: "LilyFiore", handle: "@lilyfiore.official", thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=1067&q=80", rating: 5, videoUrl: "#" },
    { id: 3, client: "Kinetic Steps", handle: "@kineticsteps", thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&h=1067&q=80", rating: 4, videoUrl: "#" },
    { id: 4, client: "Creative Minds", handle: "@creativeminds", thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&h=1067&q=80", rating: 5, videoUrl: "#" },
    { id: 5, client: "Tech Talks", handle: "@techtalks", thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=1067&q=80", rating: 5, videoUrl: "#" },
    { id: 6, client: "Vlog Life", handle: "@vloglife", thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&h=1067&q=80", rating: 4, videoUrl: "#" },
    { id: 7, client: "Startup Grind", handle: "@startupgrind", thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&h=1067&q=80", rating: 5, videoUrl: "#" },
    { id: 8, client: "Design Weekly", handle: "@designweekly", thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&h=1067&q=80", rating: 5, videoUrl: "#" },
  ];

  // Triple the items for seamless infinite effect
  const tripledVideos = [...videos, ...videos, ...videos];

  const VideoCard = ({ video }) => (
    <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 mb-4">
      <div className="relative aspect-[9/16] bg-gray-100 group cursor-pointer">
        <img src={video.thumbnail} alt={video.client} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <div className="bg-white/90 rounded-full p-2 shadow-lg transform scale-90 group-hover:scale-100 transition">
            <svg className="w-5 h-5 text-brand-orange" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">▶ Review</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <span className="font-bold text-brand-blue text-sm">{video.handle}</span>
          <span className="text-slate-300 text-xs">•</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3 h-3 ${i < video.rating ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <h4 className="text-sm font-bold text-brand-blue mb-1">{video.client}</h4>
        <button className="mt-2 text-xs font-semibold text-brand-orange hover:text-brand-blue transition flex items-center gap-1 group">
          Watch Review <span className="group-hover:translate-x-1 transition">→</span>
        </button>
      </div>
    </div>
  );

  // Smooth infinite scroll using requestAnimationFrame
  const leftContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const leftScrollRef = useRef(0);
  const rightScrollRef = useRef(0);
  const leftAnimRef = useRef(null);
  const rightAnimRef = useRef(null);

  useEffect(() => {
    const animateLeft = () => {
      if (!leftContainerRef.current) return;
      leftScrollRef.current += 0.7; // slower speed
      const maxScroll = leftContainerRef.current.scrollHeight / 2;
      if (leftScrollRef.current >= maxScroll) {
        leftScrollRef.current = 0;
      }
      leftContainerRef.current.style.transform = `translateY(-${leftScrollRef.current}px)`;
      leftAnimRef.current = requestAnimationFrame(animateLeft);
    };
    const animateRight = () => {
      if (!rightContainerRef.current) return;
      rightScrollRef.current += 1.2; // faster speed
      const maxScroll = rightContainerRef.current.scrollHeight / 2;
      if (rightScrollRef.current >= maxScroll) {
        rightScrollRef.current = 0;
      }
      rightContainerRef.current.style.transform = `translateY(-${rightScrollRef.current}px)`;
      rightAnimRef.current = requestAnimationFrame(animateRight);
    };
    leftAnimRef.current = requestAnimationFrame(animateLeft);
    rightAnimRef.current = requestAnimationFrame(animateRight);
    return () => {
      if (leftAnimRef.current) cancelAnimationFrame(leftAnimRef.current);
      if (rightAnimRef.current) cancelAnimationFrame(rightAnimRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-white/90">
          <div className=" gap-2flex items-center inline-flex">
           
            <span className="text-xs font-semibold text-brand-blue ">CLIENT REVIEWS • INFINITE SCROLL</span>
          </div>
          
        </div>
        <div className="grid grid-cols-2 gap-4 p-4" style={{ height: '560px', overflow: 'hidden' }}>
          {/* LEFT COLUMN – slower scroll */}
          <div className="relative overflow-hidden" style={{ height: '100%' }}>
            <div ref={leftContainerRef} className="flex flex-col" style={{ willChange: 'transform' }}>
              {tripledVideos.map((video, idx) => <VideoCard key={`left-${video.id}-${idx}`} video={video} />)}
            </div>
          </div>
          {/* RIGHT COLUMN – faster scroll */}
          <div className="relative overflow-hidden" style={{ height: '100%' }}>
            <div ref={rightContainerRef} className="flex flex-col" style={{ willChange: 'transform' }}>
              {tripledVideos.map((video, idx) => <VideoCard key={`right-${video.id}-${idx}`} video={video} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Tawk.to Chat ----------
const TawkChat = () => {
  useEffect(() => {
    if (document.getElementById('tawk-script')) return;
    const script = document.createElement('script');
    script.id = 'tawk-script';
    script.async = true;
    script.src = 'https://embed.tawk.to/6a2cd39b8705f01c3509b918/1jqvhl6fd';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);
    return () => {
      const existingScript = document.getElementById('tawk-script');
      if (existingScript) existingScript.remove();
      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);
  return null;
};

// ---------- NAVBAR COMPONENT ----------
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
          <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-dashing-heading text-2xl font-bold text-brand-blue">Kreativemandu</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-slate-700 hover:text-brand-orange font-medium transition-colors">
              {link.name}
            </button>
          ))}
          <button onClick={() => scrollToSection('contact')} className="bg-brand-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-brand-blue transition shadow-md">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-brand-blue" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg mt-2 py-4 px-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => { scrollToSection(link.id); setIsOpen(false); }} className="text-slate-700 hover:text-brand-orange font-medium py-2">
              {link.name}
            </button>
          ))}
          <button onClick={() => { scrollToSection('contact'); setIsOpen(false); }} className="bg-brand-orange text-white text-center py-2 rounded-full font-semibold">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

// ---------- MAIN HOME COMPONENT (no footer – you can add your own) ----------
const Home = () => {
  const [metrics, setMetrics] = useState({
    responseTime: 145,
    activeUsers: 1247,
    serverUptime: 99.98,
    dailyRequests: 8250,
  });
  const [chartData, setChartData] = useState([65, 72, 88, 95, 82, 78, 90, 85]);
  const [activities, setActivities] = useState([
    { icon: "🚀", message: "Project 'Dental Hospital Website' deployed successfully", time: "Just now" },
    { icon: "💬", message: "New client message received", time: "2 min ago" },
    { icon: "✅", message: "CI/CD pipeline completed", time: "15 min ago" },
  ]);
  const [projects, setProjects] = useState([
    { name: "E-Commerce Platform", progress: 78 },
    { name: "Mobile Banking App", progress: 45 },
    { name: "AI Analytics Dashboard", progress: 92 },
  ]);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setMetrics(prev => ({
        responseTime: Math.floor(120 + Math.random() * 80),
        activeUsers: Math.floor(1000 + Math.random() * 500),
        serverUptime: 99.98,
        dailyRequests: Math.floor(7000 + Math.random() * 2000),
      }));
    }, 5000);
    const interval2 = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1), Math.floor(60 + Math.random() * 40)];
        return newData;
      });
    }, 4000);
    const interval3 = setInterval(() => {
      const newActivity = {
        icon: ["🚀", "💬", "✅", "📊", "🔧"][Math.floor(Math.random() * 5)],
        message: [
          "New user registered",
          "Project milestone achieved",
          "Server performance optimized",
          "New support ticket opened",
          "Code review completed"
        ][Math.floor(Math.random() * 5)],
        time: "Just now"
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 8000);
    const interval4 = setInterval(() => {
      setProjects(prev => prev.map(p => ({
        ...p,
        progress: Math.min(100, p.progress + Math.floor(Math.random() * 3))
      })));
    }, 10000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
      clearInterval(interval4);
    };
  }, []);

  const testimonials = [
    { quote: "Kreativemandu transformed our online presence with their innovative solutions. Highly recommended!", name: "Sarah Johnson", role: "CEO, TechStart", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", rating: 5 },
    { quote: "The web application increased our efficiency by 40%. Their team is exceptional!", name: "Michael Chen", role: "Operations Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80", rating: 5 },
    { quote: "Amazing design and development skills. They delivered beyond our expectations.", name: "Emily Davis", role: "Founder, CreativeHub", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80", rating: 5 },
    { quote: "Their support team is exceptional and always available when we need them.", name: "David Wilson", role: "IT Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", rating: 4 },
  ];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const portfolioItems = [
    { title: "Dental Hospital Website", category: "Web App", image: "/Capture.JPG", live: "https://specialistdentalclinic.com.np", fullImage: true },
    { title: "E-commerce Platform", category: "Full Stack", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&h=400&q=80", live: "#" },
    { title: "Health & Fitness App", category: "Mobile", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80", live: "#" },
    { title: "Travel Portal", category: "UI/UX", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&h=400&q=80", live: "#" },
    { title: "Real Estate CRM", category: "Web App", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&h=400&q=80", live: "#" },
    { title: "AI Analytics Tool", category: "Data Science", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80", live: "#" },
  ];

  const team = [
    { name: "Rajesh Shrestha", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=500&q=80", socials: [{ icon: "🔗", link: "#" }, { icon: "🐦", link: "#" }] },
    { name: "Anjali Karki", role: "Lead Developer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=500&q=80", socials: [{ icon: "🔗", link: "#" }, { icon: "💻", link: "#" }] },
    { name: "Suman Rai", role: "UX Director", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=500&q=80", socials: [{ icon: "🔗", link: "#" }, { icon: "🎨", link: "#" }] },
    { name: "Priya Thapa", role: "Project Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=500&q=80", socials: [{ icon: "🔗", link: "#" }, { icon: "🐦", link: "#" }] },
  ];

  const faqs = [
    { question: "What is your typical project timeline?", answer: "Project timelines vary. A typical website takes 4-8 weeks, while a complex web app may take 3-6 months." },
    { question: "Do you offer post-launch support?", answer: "Yes, we provide 24/7 support and maintenance packages." },
    { question: "Can you work with our existing team?", answer: "Absolutely. We collaborate seamlessly." },
    { question: "What technologies do you specialize in?", answer: "React, Node.js, Python, Laravel, Flutter, AWS, Tailwind, MongoDB." },
    { question: "How do you handle data security?", answer: "We implement encryption, secure authentication, regular audits, and GDPR compliance." },
  ];

  const blogPosts = [
    { title: "The Future of AI in Web Development", excerpt: "Explore how AI is reshaping web apps and creating smarter user experiences.", date: "May 15, 2025", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=400&q=80" },
    { title: "Top UI Trends for 2025", excerpt: "Discover the latest design trends that are dominating the digital landscape.", date: "April 28, 2025", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=600&h=400&q=80" },
    { title: "Scaling Your Startup with Cloud Solutions", excerpt: "Leverage cloud computing to scale efficiently and reduce infrastructure costs.", date: "April 10, 2025", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&h=400&q=80" },
  ];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-x-hidden font-dashing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800&family=Space+Grotesk:wght@400;500;600;700&family=Explora&display=swap');
        :root { --brand-blue: #0A2647; --brand-orange: #FF6B35; --brand-orange-light: #FF8C5A; --brand-accent: #7C3AED; }
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .dashing-heading { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.02em; }
        .font-explora { font-family: 'Explora', cursive; }
        .text-brand-blue { color: var(--brand-blue) !important; }
        .bg-brand-blue { background-color: var(--brand-blue) !important; }
        .border-brand-blue { border-color: var(--brand-blue) !important; }
        .text-brand-orange { color: var(--brand-orange) !important; }
        .bg-brand-orange { background-color: var(--brand-orange) !important; }
        .border-brand-orange { border-color: var(--brand-orange) !important; }
        .from-brand-blue { --tw-gradient-from: var(--brand-blue) !important; }
        .to-brand-blue { --tw-gradient-to: var(--brand-blue) !important; }
        .from-brand-orange { --tw-gradient-from: var(--brand-orange) !important; }
        .to-brand-orange { --tw-gradient-to: var(--brand-orange) !important; }
        .bg-brand-blue\\/90 { background-color: rgba(10, 38, 71, 0.9) !important; }
        .bg-brand-blue\\/80 { background-color: rgba(10, 38, 71, 0.8) !important; }
        .bg-brand-blue\\/10 { background-color: rgba(10, 38, 71, 0.1) !important; }
        .bg-brand-orange\\/10 { background-color: rgba(255, 107, 53, 0.1) !important; }
        .bg-brand-orange\\/20 { background-color: rgba(255, 107, 53, 0.2) !important; }
        .hover\\:bg-brand-orange:hover { background-color: var(--brand-orange) !important; }
        .hover\\:text-brand-orange:hover { color: var(--brand-orange) !important; }
        .group:hover .group-hover\\:bg-brand-orange { background-color: var(--brand-orange) !important; }
        .group:hover .group-hover\\:text-brand-orange { color: var(--brand-orange) !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--brand-orange); border-radius: 10px; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 5px rgba(255,107,53,0.3); } 50% { box-shadow: 0 0 20px rgba(255,107,53,0.6); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out forwards; }
        .animate-glow-on-hover:hover { animation: glowPulse 1.5s infinite; }
        .animate-slide-in-left { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.6s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-50 via-white to-orange-50"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-orange/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero section with continuous two‑column carousel */}
        <section id="home" className="relative bg-transparent pt-12 pb-20 lg:pb-36 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left animate-slide-in-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/30">
                <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-brand-blue">Innovation Meets Excellence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-brand-blue leading-tight mb-6">
                Transforming Ideas into <br className="hidden lg:block"/>
                <span className="text-brand-orange relative inline-block">
                  Digital Reality
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5C50 2 150 0 299 5.5" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Kreativemandu is your trusted technology partner. We build scalable web applications, design intuitive interfaces, and deliver IT solutions that drive real business growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-8 py-3.5 text-lg font-semibold text-white bg-brand-blue rounded-lg shadow-md hover:bg-brand-orange hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group">
                  Start a Project <span className="inline-block ml-2 group-hover:translate-x-1 transition">→</span>
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="w-full sm:w-auto px-8 py-3.5 text-lg font-semibold text-brand-blue bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm hover:border-brand-blue hover:text-brand-orange transition-all duration-300 text-center group">
                  View Our Work <span className="inline-block ml-2 group-hover:translate-x-1 transition">→</span>
                </button>
              </div>
              <div className="mt-8 font-explora text-2xl text-brand-orange/70">— Code. Create. Conquer.</div>
            </div>
            <div className="flex-1 w-full flex justify-center animate-slide-in-right">
              <TwoColumnContinuousCarousel />
            </div>
          </div>
        </section>

        {/* Live Analytics Dashboard – full‑width activity feed */}
        <section className="py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="Live Analytics" title="Real-Time Performance Dashboard" description="Monitor key metrics and project status in real-time" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard title="Response Time" value={`${metrics.responseTime}ms`} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} trend={-3} color="bg-blue-100" />
              <MetricCard title="Active Users" value={metrics.activeUsers.toLocaleString()} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>} trend={12} color="bg-green-100" />
              <MetricCard title="Server Uptime" value={`${metrics.serverUptime}%`} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>} trend={0.02} color="bg-purple-100" />
              <MetricCard title="Daily Requests" value={metrics.dailyRequests.toLocaleString()} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>} trend={8} color="bg-orange-100" />
            </div>

            <div className="mb-8">
              <ActivityFeed activities={activities} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40">
                <h3 className="text-lg font-bold text-brand-blue mb-4">Weekly Engagement Trend</h3>
                <LiveChart data={chartData} />
                <div className="flex justify-between text-xs text-slate-400 mt-3"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
              </div>
              <ProjectProgress projects={projects} />
            </div>
          </div>
        </section>

        {/* Stats banner */}
        <section className="bg-brand-blue/90 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
              <div className="flex flex-col items-center"><span className="text-4xl md:text-5xl font-extrabold text-white mb-2"><AnimatedCounter target={150} suffix="+" duration={2000} /></span><span className="text-brand-orange font-medium">Projects Delivered</span></div>
              <div className="flex flex-col items-center"><span className="text-4xl md:text-5xl font-extrabold text-white mb-2"><AnimatedCounter target={98} suffix="%" duration={2000} /></span><span className="text-brand-orange font-medium">Client Satisfaction</span></div>
              <div className="flex flex-col items-center"><span className="text-4xl md:text-5xl font-extrabold text-white mb-2"><AnimatedCounter target={12} suffix="+" duration={2000} /></span><span className="text-brand-orange font-medium">Expert Developers</span></div>
              <div className="flex flex-col items-center"><span className="text-4xl md:text-5xl font-extrabold text-white mb-2"><AnimatedCounter target={24} suffix="/7" duration={2000} /></span><span className="text-brand-orange font-medium">Support</span></div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="What We Do" title="Premium IT Solutions" description="Comprehensive technology services tailored to your business needs" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>} title="Web Development" description="Fast, responsive, secure websites with modern frameworks." />
              <ServiceCard icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>} title="App Development" description="Engaging iOS & Android apps with native performance." />
              <ServiceCard icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path></svg>} title="UI/UX Design" description="Intuitive interfaces that delight users and drive engagement." />
              <ServiceCard icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>} title="Cybersecurity" description="Protect your data and business with advanced security measures." />
              <ServiceCard icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>} title="Cloud Solutions" description="Scalable infrastructure & migration to major cloud providers." />
              <ServiceCard icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>} title="DevOps & Automation" description="CI/CD pipelines, automation, and infrastructure as code." />
            </div>
            <div className="text-center mt-12">
              <button onClick={() => scrollToSection('contact')} className="bg-brand-orange text-white font-semibold hover:bg-brand-blue transition-colors inline-flex items-center gap-2 group px-6 py-3 rounded-full shadow-md">
                View All Services <span className="group-hover:translate-x-1 transition">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="Our Work" title="Recent Projects" description="Explore some of our finest work that showcase our expertise." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, idx) => <PortfolioItem key={idx} {...item} />)}
            </div>
            <div className="text-center mt-12"><button onClick={() => scrollToSection('contact')} className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg hover:bg-brand-orange transition-colors transform hover:-translate-y-1">View Full Portfolio <span>→</span></button></div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group"><img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="About" className="rounded-2xl shadow-xl group-hover:scale-105 transition duration-500" /></div>
              <div><span className="text-brand-orange font-semibold tracking-wide">About Us</span><h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mt-2 mb-4">Innovative IT Partner Since 2018</h2><p className="text-slate-600 mb-6">Kreativemandu has been at the forefront of digital transformation, delivering cutting-edge solutions to businesses worldwide. Our team of experts combines creativity with technical excellence to solve complex challenges and drive growth.</p><div className="grid grid-cols-2 gap-6 mb-8"><div className="p-4 bg-white/40 backdrop-blur-sm rounded-xl"><div className="flex items-center gap-3 mb-2"><svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><h4 className="font-bold text-brand-blue">Mission</h4></div><p className="text-slate-600">Empower businesses with cutting-edge tech solutions.</p></div><div className="p-4 bg-white/40 backdrop-blur-sm rounded-xl"><div className="flex items-center gap-3 mb-2"><svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg><h4 className="font-bold text-brand-blue">Vision</h4></div><p className="text-slate-600">To be a global leader in digital innovation.</p></div></div><button onClick={() => scrollToSection('contact')} className="inline-flex items-center gap-2 text-brand-orange font-semibold group hover:text-brand-blue transition">Learn More <span className="group-hover:translate-x-1 transition">→</span></button></div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="How We Work" title="Our Development Process" description="A transparent, collaborative approach to ensure project success." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <ProcessStep number="01" title="Discovery" description="Understand goals, audience, requirements." />
              <ProcessStep number="02" title="Strategy" description="Roadmap, wireframes, tech selection." />
              <ProcessStep number="03" title="Development" description="Agile sprints, regular updates." />
              <ProcessStep number="04" title="Launch & Support" description="Deployment, training, maintenance." />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-transparent">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="Testimonials" title="What Our Clients Say" description="Trusted by businesses worldwide for our quality and reliability." />
            <div className="relative">
              <div className="overflow-hidden px-2"><div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>{testimonials.map((test, idx) => (<div key={idx} className="w-full flex-shrink-0 px-4"><TestimonialCard {...test} /></div>))}</div></div>
              <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 bg-white rounded-full p-2 shadow-lg hover:bg-brand-blue hover:text-white transition">❮</button>
              <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 bg-white rounded-full p-2 shadow-lg hover:bg-brand-blue hover:text-white transition">❯</button>
              <div className="flex justify-center gap-2 mt-8"><div className="flex gap-1">{testimonials.map((_, idx) => (<button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`w-3 h-3 rounded-full transition-all ${currentTestimonial === idx ? 'bg-brand-orange w-6' : 'bg-slate-300'}`}></button>))}</div></div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="Meet Our Team" title="The Brains Behind the Magic" description="Passionate experts dedicated to your success and innovation." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, idx) => (<TeamMember key={idx} name={member.name} role={member.role} image={member.image} socials={member.socials.map(s => ({ ...s, icon: <span className="text-sm">{s.icon}</span> }))} />))}
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="py-24 bg-transparent relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <SectionHeader subtitle="Technologies" title="Tools We Master" description="Cutting-edge stack for modern, scalable solutions." />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 md:gap-10">
              <TechIcon name="React" icon="⚛️" /><TechIcon name="Node.js" icon="🟢" /><TechIcon name="Python" icon="🐍" /><TechIcon name="Laravel" icon="🧩" /><TechIcon name="Flutter" icon="🦋" /><TechIcon name="AWS" icon="☁️" /><TechIcon name="Tailwind" icon="🎨" /><TechIcon name="MongoDB" icon="🍃" />
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-3">
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">Next.js</span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">GraphQL</span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">Docker</span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">Kubernetes</span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">Firebase</span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">Vue.js</span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-brand-blue">Figma</span>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section className="py-24 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="Insights" title="Latest from Our Blog" description="Stay updated with tech trends and industry insights." />
            <div className="grid md:grid-cols-3 gap-8">{blogPosts.map((post, idx) => <BlogCard key={idx} {...post} />)}</div>
            <div className="text-center mt-12"><button onClick={() => scrollToSection('contact')} className="text-brand-orange font-semibold hover:text-brand-blue transition-colors inline-flex items-center gap-2 group">Read All Articles <span className="group-hover:translate-x-1 transition">→</span></button></div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-transparent">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeader subtitle="FAQ" title="Frequently Asked Questions" description="Everything you need to know about working with us." />
            <div className="space-y-2">{faqs.map((faq, idx) => <FAQItem key={idx} question={faq.question} answer={faq.answer} />)}</div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-transparent">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/30"><span className="text-brand-orange font-semibold">Get In Touch</span><h2 className="text-3xl md:text-4xl font-extrabold text-brand-blue mt-2 mb-4">Let's Discuss Your Project</h2><p className="text-slate-600 mb-6">Fill out the form and our team will get back to you within 24 hours.</p><div className="space-y-4"><div className="flex items-center gap-3"><svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><span>contact@kreativemandu.com</span></div><div className="flex items-center gap-3"><svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><span>+977 1 1234567</span></div><div className="flex items-center gap-3"><svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span>Kathmandu, Nepal</span></div></div></div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/30"><form onSubmit={handleFormSubmit}><div className="mb-4"><label className="block text-brand-blue font-semibold mb-2">Name</label><input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white/50" required /></div><div className="mb-4"><label className="block text-brand-blue font-semibold mb-2">Email</label><input type="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white/50" required /></div><div className="mb-6"><label className="block text-brand-blue font-semibold mb-2">Message</label><textarea name="message" rows={4} value={formData.message} onChange={handleFormChange} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white/50" required></textarea></div><button type="submit" disabled={formStatus === "loading"} className="w-full bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-brand-orange transition-colors disabled:opacity-70">{formStatus === "loading" ? "Sending..." : formStatus === "success" ? "Sent ✓" : "Send Message"}</button></form></div>
            </div>
          </div>
        </section>

        <TawkChat />
      </div>
    </div>
  );
};

export default Home;