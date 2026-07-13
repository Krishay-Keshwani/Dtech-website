import { Layers, Globe, GraduationCap, ChevronRight, Activity, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

export default function ResearchGrid({ onCommissionClick }: { onCommissionClick?: () => void }) {
  const bentoItems = [
    {
      id: "research",
      category: "research",
      title: "Research-led Consulting",
      desc: "Our team undertakes rigorous research consultancies to develop custom, domain-specific paradigms. Crucial in modeling climate anomalies or simulating high hazard structural stress.",
      icon: GraduationCap,
      accent: "text-[#818cf8]",
      bgGlow: "rgba(129, 140, 248, 0.03)",
      size: "col-span-1 md:col-span-8",
      metric: "12+ Scientific Papers",
      highlight: "Methodical peer-reviewed approaches detailing complex disaster stress analysis."
    },
    {
      id: "innovation",
      category: "innovation",
      title: "Co-Innovation",
      desc: "We co-partner with forward-thinking enterprise hubs to devise elite, tailored solutions for unique bottlenecks.",
      icon: Cpu,
      accent: "text-cyber-teal",
      bgGlow: "rgba(13, 242, 201, 0.03)",
      size: "col-span-1 md:col-span-4",
      metric: "Patent-pending automation",
      highlight: "Handholding enterprises from blueprint schema mapping to hardware validation."
    },
    {
      id: "service",
      category: "service",
      title: "Full-Stack Software Services",
      desc: "Engineering scalable modern web interfaces, low-latency mobile platforms, and secure modular architectures designed for zero downtime during environmental crises.",
      icon: Layers,
      accent: "text-cyber-blue",
      bgGlow: "rgba(0, 122, 255, 0.03)",
      size: "col-span-1 md:col-span-4",
      metric: "99.99% Crisis Uptime",
      highlight: "Highly reliable server systems built upon durable fault-tolerant micro-containers."
    },
    {
      id: "analytics",
      category: "service",
      title: "AI/ML Guided Data Analytics & Decisions",
      desc: "Harnessing state-of-the-art predictive neural networks and real-time geographical sensors to calculate precise torrent risk indices and coordinate rescue paths.",
      icon: Activity,
      accent: "text-cyber-green",
      bgGlow: "rgba(57, 255, 20, 0.03)",
      size: "col-span-1 md:col-span-8",
      metric: "Neural Hazard Estimations",
      highlight: "High accuracy water level indicators and drone-grid route mapping variables."
    }
  ];

  return (
    <section className="px-6 py-20 md:px-16 md:py-24 max-w-7xl mx-auto z-10 relative selection:bg-cyber-teal selection:text-cyber-bg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="font-mono text-xs tracking-widest text-cyber-blue uppercase">ENTERPRISE MATRIX SERVICES</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-2">
            The Co-Innovation <br />
            <span className="text-gray-400">Consultancy Engine</span>
          </h2>
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {bentoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={{ backgroundColor: 'rgba(14, 19, 31, 0.55)', backdropFilter: 'blur(10px)' }}
              className={`${item.size} rounded-lg p-6 lg:p-8 border border-white/5 flex flex-col justify-between hover:border-white/15 hover:shadow-2xl hover:shadow-[#007aff]/5 transition-all duration-300 relative overflow-hidden group`}
            >
              {/* Highlight backing glow */}
              <div
                style={{ backgroundColor: item.bgGlow }}
                className="absolute inset-0 opacity-100 group-hover:scale-110 transition-transform duration-500 pointer-events-none"
              />

              <div className="relative z-10">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div className={`p-3 rounded bg-white/5 ${item.accent} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[9px] text-gray-500 bg-white/5 px-2 py-0.5 rounded uppercase tracking-widest font-semibold">{item.category}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mt-3 max-w-2xl">
                  {item.desc}
                </p>

                <div className="border-t border-white/5 mt-6 pt-4">
                  <span className="text-[10px] font-mono text-gray-500 block uppercase font-semibold">Scientific Focus</span>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    {item.highlight}
                  </p>
                </div>
              </div>

              {/* Bento Card Footer */}
              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center relative z-10">
                <div className="font-mono text-[10px]">
                  <span className="text-gray-500 uppercase block">METRIC METRICS:</span>
                  <span className="text-white block mt-0.5 font-semibold">{item.metric}</span>
                </div>

                <div 
                  onClick={onCommissionClick}
                  className={`text-[10px] font-mono flex items-center gap-1 cursor-pointer group-hover:translate-x-1.5 transition-transform ${item.accent}`}
                >
                  <span>COMMISSION INQUIRES</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
