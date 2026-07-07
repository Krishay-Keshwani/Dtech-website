import { Cpu, Database, ChevronDown } from 'lucide-react';
import Logo from './Logo';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export default function HeroSection({ onScrollToNext }: HeroSectionProps) {
  const latencies = [13, 14, 16, 15, 12, 14, 13, 15, 16, 14, 15, 13, 12, 14, 15, 16, 13, 14, 15, 12];

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-12 md:px-16 md:py-16 z-10 selection:bg-cyber-teal selection:text-cyber-bg pointer-events-none">
      
      {/* Empty space placeholder replacing the removed top meta info */}
      <div className="h-4" />

      {/* Main Core Display Heading */}
      <div className="my-auto max-w-4xl flex flex-col items-start gap-6 pointer-events-auto mt-20 md:mt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-teal/30 bg-cyber-teal/5">
          <Cpu className="w-3.5 h-3.5 text-cyber-teal animate-spin-slow" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-cyber-teal font-semibold">
            SECURE RESILIENT PARADIGM
          </span>
        </div>

        <div className="py-2 scale-95 sm:scale-100 md:scale-110 lg:scale-125 origin-left">
          <Logo size="lg" hideIcon={true} />
        </div>
        
        <p className="font-display text-xl md:text-3xl font-light text-gray-300 leading-relaxed max-w-3xl mt-2">
          A disruptive technology start-up for making society{' '}
          <span className="text-[#0df2c9] font-medium font-sans">resilient</span> and{' '}
          <span className="text-[#39ff14] font-medium font-sans animate-pulse-slow">sustainable</span>.
        </p>

        <p className="text-gray-400 max-w-xl text-sm leading-relaxed mt-1">
          Leveraging disruptive technologies like AI, ML, Robotics, Big Data, to predict, mitigate & respond to various hazards
        </p>

        {/* Credentials / Affiliations */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 font-mono text-[11px] text-[#0df2c9]/95">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-pulse" />
            Incubated in IIT Delhi Incubation Hub
          </span>
          <span className="flex items-center gap-1.5 text-indigo-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Shortlisted for 2025 Japan NEDO Quantum Challenge
          </span>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button 
            type="button"
            className="px-6 py-3 rounded bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-bg font-display font-semibold tracking-wide text-sm transition-transform hover:scale-105 hover:shadow-lg hover:shadow-cyber-teal/20"
            onClick={onScrollToNext}
          >
            Explore Innovations
          </button>
          
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded border border-white/5 bg-white/[0.02]">
            <Database className="w-4 h-4 text-cyber-blue" />
            <div className="text-left">
              <span className="block text-[9px] font-mono text-gray-500 uppercase">TELEMETRY LATENCY</span>
              <div className="flex gap-0.5 items-end h-5 mt-0.5 w-[120px]">
                {latencies.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val * 1.5}px` }}
                    className="w-1 bg-[#007aff] rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Footnotes / Scroll Assist Indicator */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full pt-12 border-t border-white/5 pointer-events-auto">
        <div className="flex gap-8">
          <div>
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest block">Core Directives</span>
            <span className="text-xs text-white font-mono mt-1 block">DISASTER RISK REDUCTION</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest block">Affordable Solutions</span>
            <span className="text-xs text-white font-mono mt-1 block">BRIDGING THE TECHNICAL DIVIDE</span>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest block">Community Action</span>
            <span className="text-xs text-white font-mono mt-1 block">COMMUNITY INCLUSION</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onScrollToNext}
          className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyber-teal transition-colors py-2 uppercase tracking-widest animate-bounce"
        >
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
