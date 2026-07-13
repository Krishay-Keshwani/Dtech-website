import { useState, useEffect, useRef } from 'react';
import { Cpu, Terminal, Radio, HelpCircle, Sun, Moon, Zap, ZapOff } from 'lucide-react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import ThreeDCanvas from './components/ThreeDCanvas';
import CursorTrail from './components/CursorTrail';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import ProductSections from './components/ProductSections';
import ResearchGrid from './components/ResearchGrid';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Logo from './components/Logo';
import Loader from './components/Loader';

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavTransitioning, setIsNavTransitioning] = useState(false);
  const [viewCount, setViewCount] = useState<number>(1000);
  const lenisRef = useRef<Lenis | null>(null);
  const snapTimeoutRef = useRef<any>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('dtech-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('dtech-animations-enabled');
    return saved !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('dtech-animations-enabled', animationsEnabled.toString());
  }, [animationsEnabled]);

  useEffect(() => {
    // Persistent total view count starting from 1000
    const saved = localStorage.getItem('dtech-view-count');
    let current = saved ? parseInt(saved, 10) : 1000;
    if (isNaN(current) || current < 1000) {
      current = 1000;
    }
    // Increment on session visit
    current += 1;
    localStorage.setItem('dtech-view-count', current.toString());
    setViewCount(current);
  }, []);

  useEffect(() => {
    localStorage.setItem('dtech-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('high-contrast-light');
    } else {
      root.classList.remove('high-contrast-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'doctrine', label: 'Doctrine' },
    { id: 'blueprints', label: 'Blueprints' },
    { id: 'consultancy', label: 'Consultancy' },
    { id: 'academy', label: 'Scholar Network' },
    { id: 'contact', label: 'Bridge' },
  ];

  // Initialize Lenis smooth scroll and section detection
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    let rAFId: number;
    function raf(time: number) {
      lenis.raf(time);
      rAFId = requestAnimationFrame(raf);
    }
    rAFId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      let currentSectionIdx = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSectionIdx = i;
          }
        }
      }
      
      // Force last section at the bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        currentSectionIdx = sections.length - 1;
      }
      
      setActiveSection(currentSectionIdx);

      // Reset snap timeout on scroll activity
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }

      // Check for snap trigger if not scrolling programmatically (e.g. from nav link clicks)
      if (!isProgrammaticScrollRef.current) {
        snapTimeoutRef.current = setTimeout(() => {
          if (isProgrammaticScrollRef.current) return;

          const currentScrollY = window.scrollY;
          let closestSec = null;
          let minDistance = Infinity;

          for (const sec of sections) {
            const el = document.getElementById(sec.id);
            if (el) {
              const top = el.offsetTop;
              const distance = Math.abs(currentScrollY - top);
              if (distance < minDistance) {
                minDistance = distance;
                closestSec = { id: sec.id, top };
              }
            }
          }

          // If close to a section start (e.g. within 180px threshold), snap perfectly to its start
          if (closestSec && minDistance > 8 && minDistance < 180) {
            isProgrammaticScrollRef.current = true;
            lenis.scrollTo('#' + closestSec.id, {
              duration: 1.0,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // clean expo ease
              onComplete: () => {
                // Introduce small cooldown to allow inertial movement to settle completely
                setTimeout(() => {
                  isProgrammaticScrollRef.current = false;
                }, 150);
              }
            });
          }
        }, 300); // 300ms debounce threshold to detect scrolling stop
      }
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => {
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
      lenis.destroy();
      cancelAnimationFrame(rAFId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection Observer for subtle scroll entrance animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12, // Trigger when 12% is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Unobserve to keep the animation state completed and performant
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollToSection = (id: string) => {
    const targetIdx = sections.findIndex(sec => sec.id === id);
    if (targetIdx === activeSection) {
      // Just do a quick scroll adjust if they click the already active section
      if (lenisRef.current) {
        lenisRef.current.scrollTo('#' + id, { duration: 0.6 });
      }
      return;
    }

    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
    }
    isProgrammaticScrollRef.current = true;
    setIsNavTransitioning(true);

    // After fade-in completes, jump to target section instantly
    setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo('#' + id, { 
          immediate: true,
        });
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
        }
      }
      
      // Keep it completely smooth, fade the overlay out after a tiny buffer
      setTimeout(() => {
        setIsNavTransitioning(false);
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 150);
      }, 100);
    }, 250); // Matches the start of the fade-in duration
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${theme === 'light' ? 'high-contrast-light bg-white text-gray-950' : 'bg-cyber-bg text-gray-100'} cyber-grid overflow-hidden`}>
      
      {/* Centralized loader with glitch system initialization effect */}
      <Loader onComplete={() => setIsLoading(false)} />

      {/* Centralized section transition cross-fade overlay */}
      <AnimatePresence>
        {isNavTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`fixed inset-0 z-[99] pointer-events-auto flex items-center justify-center ${
              theme === 'light' ? 'bg-white' : 'bg-[#07090e]'
            }`}
          >
            {/* Elegant minimal futuristic transition loader */}
            <div className="relative flex flex-col items-center">
              <span className="font-mono text-[9px] tracking-[0.2em] text-cyber-teal/60 animate-pulse">
                SYS_TRANSITION // LINKING CORE MODULES...
              </span>
              <div className="w-16 h-[1px] bg-cyber-teal/20 mt-3 overflow-hidden relative">
                <div className="h-full bg-cyber-teal w-1/2 absolute animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WebGL Canvas Backdrop */}
      {animationsEnabled && (
        <ThreeDCanvas 
          activeSectionId={sections[activeSection]?.id || 'hero'} 
          theme={theme}
        />
      )}

      {/* Custom glowing cursor trail effect */}
      {animationsEnabled && <CursorTrail theme={theme} />}

      {/* Futuristic CRT Scanline overlay decoration */}
      <div className="cyber-overlay" />

      {/* Floating Sticky HUD Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4 md:px-12 flex justify-between items-center">
        
        {/* Brand identity */}
        <div 
          className="flex items-center cursor-pointer select-none group"
          onClick={() => handleScrollToSection('hero')}
        >
          <div className="flex items-center transition-transform duration-300 group-hover:scale-[1.02]">
            <Logo size="sm" />
          </div>
        </div>

        {/* Desktop Anchor HUD Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              type="button"
              className={`px-4 py-1.5 rounded text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeSection === idx
                  ? 'text-[#0df2c9] bg-cyber-teal/5 font-semibold glow-teal border-b border-cyber-teal'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
              }`}
              onClick={() => handleScrollToSection(sec.id)}
            >
              0{idx + 1}_{sec.label}
            </button>
          ))}
        </nav>

        {/* Right Header Status / Language node */}
        <div className="flex items-center gap-4">
          {/* Animation Toggle for Low-end Devices */}
          <button
            type="button"
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className={`p-2 border rounded transition-all cursor-pointer shadow-md flex items-center justify-center ${
              animationsEnabled
                ? 'border-cyber-teal/30 bg-cyber-teal/5 text-cyber-teal hover:bg-cyber-teal/15 animate-none'
                : 'border-gray-600 bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
            }`}
            title={animationsEnabled ? 'Turn Off Animations (Performance Mode)' : 'Turn On Animations (Immersive Mode)'}
            aria-label="Toggle Animations"
          >
            {animationsEnabled ? (
              <Zap className="w-4 h-4 animate-pulse" />
            ) : (
              <ZapOff className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* Accessibility Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 border border-cyber-teal/30 bg-cyber-teal/5 rounded hover:bg-cyber-teal/15 transition-all text-cyber-teal cursor-pointer shadow-md flex items-center justify-center"
            title={theme === 'light' ? 'Switch to Dark Cyberpunk Mode' : 'Switch to High-Contrast Light Mode'}
            aria-label="Toggle High-Contrast Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-gray-500 bg-white/5 border border-white/[0.03] px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-pulse inline-block"></span>
            <span className="text-gray-400">VIEWS: <span className="text-cyber-teal font-bold">{viewCount.toLocaleString()}</span></span>
          </div>

          <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-gray-500 bg-white/5 border border-white/[0.03] px-3 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-ping inline-block"></span>
            <span className="text-cyber-teal uppercase">PORT: 3000 // RUNNING</span>
          </div>

          <button
            type="button"
            className="px-4 py-2 border border-cyber-teal/30 bg-cyber-teal/5 rounded font-display font-medium text-xs tracking-wider text-cyber-teal hover:bg-cyber-teal hover:text-cyber-bg transition-all cursor-pointer shadow-lg shadow-cyber-teal/5 hover:scale-105 active:scale-95"
            onClick={() => handleScrollToSection('contact')}
          >
            GRID ENTRANCE
          </button>
        </div>
      </header>

      {/* Floating Vertical Index Tracker HUD */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-5 items-center">
        {sections.map((sec, idx) => (
          <button
            key={sec.id}
            type="button"
            className="group flex items-center justify-end gap-3 cursor-pointer"
            onClick={() => handleScrollToSection(sec.id)}
          >
            <span className={`font-mono text-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              activeSection === idx ? 'text-cyber-teal font-bold' : 'text-gray-500'
            }`}>
              {sec.label}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              activeSection === idx 
                ? 'w-3 h-3 bg-cyber-teal glow-teal scale-110 outline outline-4 outline-cyber-teal/20' 
                : 'bg-gray-600 group-hover:bg-white'
            }`} />
          </button>
        ))}
      </div>

      {/* Content overlays containing modules */}
      <main className="relative z-10 w-full">
        
        {/* Section 0: Hero Overlay */}
        <div id="hero" className="w-full">
          <HeroSection onScrollToNext={() => handleScrollToSection('doctrine')} />
        </div>

        {/* Section 1: Doctrine Pillars Overlay */}
        <div id="doctrine" className="w-full border-t border-white/5 bg-gradient-to-b from-transparent to-[#07090e]/40">
          <PillarsSection />
        </div>

        {/* Section 2: Product Blueprints Overlay */}
        <div id="blueprints" className="w-full border-t border-white/5 bg-[#07090e]/30">
          <ProductSections 
            onKnowMore={() => handleScrollToSection('contact')} 
            animationsEnabled={animationsEnabled}
          />
        </div>

        {/* Section 3: Bento Consultancy Overlay */}
        <div id="consultancy" className="w-full border-t border-white/5">
          <ResearchGrid onCommissionClick={() => handleScrollToSection('contact')} />
        </div>

        {/* Section 4: Academic Networks & Scholars Overlay */}
        <div id="academy" className="w-full border-t border-white/5 bg-gradient-to-b from-[#0e131f]/20 to-transparent">
          <TeamSection />
        </div>

        {/* Section 6: Connection Bridge Form Overlay */}
        <div id="contact" className="w-full border-t border-white/5 pb-20 bg-gradient-to-b from-transparent to-[#07090e]">
          <ContactSection />
        </div>

      </main>

      {/* Footer Meta HUD */}
      <footer className="relative z-10 w-full border-t border-white/5 py-8 px-6 md:px-12 glass-panel flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
        <div>
          <span>COPYRIGHT @ DTECH. ALL RIGHTS RESERVED // 2026</span>
        </div>
        <div className="flex gap-6 items-center flex-wrap justify-center md:justify-end">
          <span className="text-gray-500">
            DTE4 Calamity And Humanities Pvt Ltd
          </span>
          <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded text-cyber-teal text-[10px] font-bold">
            TOTAL VIEWS: {viewCount.toLocaleString()}
          </span>
        </div>
      </footer>

    </div>
  );
}
