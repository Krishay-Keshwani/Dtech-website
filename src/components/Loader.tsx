import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [subText, setSubText] = useState('ALIGNING SATELLITE LINK...');
  const [isDone, setIsDone] = useState(false);

  const subTexts = [
    'ALIGNING SATELLITE LINK...',
    'CALIBRATING SENSORS & ROBOTICS...',
    'MAPPING ENVIRONMENTS & WATERWAYS...',
    'INITIALIZING NEURAL NETWORKS...',
    'SYNCING DISASTER REDUCTION ALGORITHMS...',
    'DTECH CORE SYSTEMS ONLINE // READY',
  ];

  useEffect(() => {
    // Progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Realistic dynamic ticking
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamic text rotation based on progress
    if (progress < 20) {
      setSubText(subTexts[0]);
    } else if (progress < 40) {
      setSubText(subTexts[1]);
    } else if (progress < 60) {
      setSubText(subTexts[2]);
    } else if (progress < 80) {
      setSubText(subTexts[3]);
    } else if (progress < 98) {
      setSubText(subTexts[4]);
    } else {
      setSubText(subTexts[5]);
    }

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsDone(true);
        // Slight delay for premium feel
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="centralized-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#07090e] z-[9999] flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Cybernetic grid decoration */}
          <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0df2c9]/5 to-transparent pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-lg w-full">
            {/* Outer corner decorators */}
            <div className="absolute -top-6 -left-6 w-4 h-4 border-t-2 border-l-2 border-cyber-teal/40" />
            <div className="absolute -top-6 -right-6 w-4 h-4 border-t-2 border-r-2 border-cyber-teal/40" />
            <div className="absolute -bottom-6 -left-6 w-4 h-4 border-b-2 border-l-2 border-cyber-teal/40" />
            <div className="absolute -bottom-6 -right-6 w-4 h-4 border-b-2 border-r-2 border-cyber-teal/40" />

            {/* Scanning line indicator */}
            <div className="w-16 h-1 bg-cyber-teal/30 rounded-full animate-pulse mb-8" />

            {/* Glitch heading */}
            <div className="glitch-container mb-4">
              <h1
                className="glitch-text text-xl md:text-2xl font-mono tracking-[0.25em] text-white"
                data-text="INITIALIZING DTECH SYSTEMS..."
              >
                INITIALIZING DTECH SYSTEMS...
              </h1>
            </div>

            {/* Progress Percentage */}
            <div className="font-mono text-4xl md:text-5xl font-bold text-cyber-teal my-6 tracking-wider glow-teal">
              {String(progress).padStart(3, '0')}%
            </div>

            {/* Custom styled cyberpunk Progress Bar */}
            <div className="w-full h-1 bg-white/5 border border-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-teal via-cyber-blue to-cyber-crimson"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading dynamic subtitles with typing/flicker state */}
            <div className="h-6 flex items-center justify-center">
              <span className="font-mono text-[10px] md:text-xs text-gray-400 tracking-widest uppercase">
                {subText}
              </span>
            </div>

            {/* Subtle disclaimer */}
            <div className="mt-12 flex items-center gap-1.5 font-mono text-[9px] text-gray-600">
              <span className="w-1 h-1 rounded-full bg-cyber-teal animate-ping" />
              <span>SECURE ACCESS v2.4 // COORD_LOCK_ESTABLISHED</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
