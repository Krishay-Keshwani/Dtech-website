import { useState } from 'react';
import { ShieldAlert, Users, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function PillarsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: "Technology For a Cause",
      short: "DISASTER / CLIMATE INTERVENE",
      desc: "Our scientific resources actively target complex systemic crises like sudden-onset flooding, earthquake collapses, and extreme ecological damage.",
      long: "We customize technical apparatus, field sensors, and search-and-rescue machinery specifically for non-linear disaster zones. By embedding resilient mechanical platforms, we minimize civilian vulnerability during peak environmental shocks.",
      color: "from-[#ef4444] to-[#ff0055]",
      glow: "glow-crimson",
      icon: ShieldAlert,
      stats: [
        { label: "Target Incidents", value: "Flooding, Tremors, Collapses" },
        { label: "Critical Focus", value: "Zero Loss of Human Life" }
      ]
    },
    {
      id: 2,
      title: "Technology For All",
      short: "BRIDGING DIGITAL CHASM",
      desc: "We engineer systems with simple, intuitive interaction architectures to bridge the technology literacy gaps of varied demographics.",
      long: "True system resilience requires universal access. We create low-cost hardware grids, smart local controllers, and voice-guided utilities that empower elder populations and remote communities alike to harness real-time early warnings.",
      color: "from-[#3b82f6] to-[#007aff]",
      glow: "glow-blue",
      icon: Users,
      stats: [
        { label: "Access Model", value: "Affordable hardware grids" },
        { label: "Goal Metric", value: "100% Democratic Literacy" }
      ]
    },
    {
      id: 3,
      title: "Technology For Good",
      short: "EQUITABLE COMMON GOOD",
      desc: "We strictly orient our engineering workflows toward human welfare and environmental stewardship rather than abstract corporate metrics.",
      long: "Every digital sensor, micro-controller, and algorithmic module is structured with environmental sustainability as its ultimate target. Technology serving meaningful, humane, and sustainable outcomes is our metric for success.",
      color: "from-[#10b981] to-[#0df2c9]",
      glow: "glow-teal",
      icon: HeartHandshake,
      stats: [
        { label: "Ethical Stance", value: "Pro-bono civic integration" },
        { label: "Sustainability", value: "Low power, zero-waste design" }
      ]
    }
  ];

  return (
    <section className="px-6 py-20 md:px-16 md:py-24 max-w-7xl mx-auto z-10 relative selection:bg-cyber-teal selection:text-cyber-bg">
      <div className="mb-12 md:mb-16">
        <span className="font-mono text-xs tracking-widest text-cyber-teal uppercase">OUR REVOLUTIONARY DOCTRINE</span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-2">
          Work Smarter, Not Harder <br />
          <span className="text-gray-400">with Disruptive Strategy</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mt-4 leading-relaxed">
          DTECH designs hardware, software, networks and automation processes customized specifically for Societal Safety and Climatic Equilibrium.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredCard === idx;

          return (
            <div
              key={item.id}
              className={`glass-panel rounded-lg p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isHovered ? 'border-white/10 shadow-2xl elevation-10' : 'border-white/5'
              }`}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated Glow Backing */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
              />
              
              {/* Highlight Neon Grid Lines */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0df2c9] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

              <div>
                {/* Header info */}
                <div className="flex justify-between items-center mb-6">
                  <div className={`p-3 rounded bg-white/5 text-[#f9fafb] group-hover:scale-110 transition-transform ${isHovered ? 'text-cyber-teal' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[9px] text-gray-500 tracking-widest">{item.short}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight leading-tight group-hover:text-cyber-teal transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-gray-400 leading-relaxed mt-3">
                  {item.desc}
                </p>

                {/* Expanded explanation */}
                <p className="text-xs text-gray-500 leading-relaxed mt-4 pt-4 border-t border-white/5 opacity-80 select-all block h-[110px] overflow-hidden group-hover:text-gray-300 transition-colors">
                  {item.long}
                </p>
              </div>

              {/* Stats readout footer */}
              <div className="mt-8 pt-4 border-t border-white/5 space-y-3">
                {item.stats.map((st, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-500">{st.label}</span>
                    <span className="text-white font-medium">{st.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Corporate Vision Panel - Bento style footer card */}
      <div className="mt-8 glass-panel rounded-lg p-6 md:p-8 border-white/5 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono text-[10px] tracking-widest text-[#007aff] uppercase block">DTECH STATE OF GLOBAL MISSION</span>
          <h3 className="text-lg md:text-2xl font-display font-medium text-white tracking-tight mt-1">
            "To become a global leader in disruptive technologies, driving innovation for making society resilient and sustainable."
          </h3>
        </div>
        <div className="font-mono text-left bg-cyber-teal/5 border border-cyber-teal/20 px-4 py-3 rounded">
          <span className="text-[10px] text-cyber-teal font-semibold tracking-widest uppercase block">MISSION_INDEX</span>
          <span className="text-2xl font-bold text-white tracking-tight block mt-0.5">EST. 2024</span>
          <span className="text-[9px] text-gray-500 uppercase block mt-1">Ready to Deploy Global Nodes</span>
        </div>
      </div>
    </section>
  );
}
