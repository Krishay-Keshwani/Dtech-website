import { useState } from 'react';
import { Award, Briefcase, GraduationCap, Quote, Globe, UserCheck, ChevronRight } from 'lucide-react';

export default function TeamSection() {
  const [activeIntern, setActiveIntern] = useState<number>(0);

  const founderCredentials = [
    { text: "Kyoto University PhD", desc: "Environmental Management research in climate resilience models", icon: GraduationCap },
    { text: "Tata Institute Alumni (TISS)", desc: "Master's degree centered on community hazard planning", icon: GraduationCap },
    { text: "IRDR Young Scientist Fellow", desc: "Global academic research backing on disaster risk reduction", icon: Award },
    { text: "UNDRR Advisory Member", desc: "Stakeholder Engagement Mechanism (SEM) guidance board", icon: UserCheck },
    { text: "IUCN CEM member", desc: "Commission on Ecosystem Management, Business & Biodiversity", icon: Globe },
    { text: "Board of Studies", desc: "Delhi Technical University & Rashtra Raksha University", icon: GraduationCap },
    { text: "Ex TCS Innovation Unit", desc: "Led corporate research & innovation methodologies", icon: Briefcase }
  ];

  const interns = [
    {
      name: "Rashmi Sharma",
      role: "Graduate Engineering Intern",
      quote: "During my tenure at DTECH, I undertook a diverse range of responsibilities that contributed to my professional growth and the success of various projects including physical sensor telemetry modeling."
    },
    {
      name: "Ravish Ratnam",
      role: "Hardware Research Intern",
      quote: "Overall, my time at DTECH was marked by a proactive approach to research, a collaborative spirit, and a dedication to contributing to the company's sustainable automation goals."
    },
    {
      name: "Abhishek Pola",
      role: "Software Systems Intern",
      quote: "One of the highlights of my experience was leading a team in a collaborative project. This experience enhanced my leadership and reinforced my ability to work effectively under pressure during emergencies."
    }
  ];

  return (
    <section className="px-6 py-20 md:px-16 md:py-24 max-w-7xl mx-auto z-10 relative selection:bg-cyber-teal selection:text-cyber-bg">
      <div className="mb-12 md:mb-16">
        <span className="font-mono text-xs tracking-widest text-[#ffd700] uppercase">LEADERSHIP & SCIENTIFIC NETWORK</span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-2">
          Backed by Human Expertise <br />
          <span className="text-gray-400">and Academic Integrity</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mt-4 leading-relaxed">
          The solutions DTECH deploys are not built in a commercial vacuum. They are backed by years of peer-reviewed international policy research and custom validation models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
        
        {/* CEO Detail Panel - Bento Left Side */}
        <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 md:p-8 border-white/5 relative flex flex-col justify-between overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <span className="font-mono text-[10px] text-cyber-gold font-bold uppercase tracking-wider block">CO-FOUNDER & CEO</span>
                <h3 className="text-3xl font-display font-medium text-white mt-1">Dr. Ranit Chatterjee</h3>
                <span className="text-xs text-cyber-teal font-mono block mt-1">Disaster Management Scholar</span>
              </div>
              <div className="bg-cyber-gold/10 border border-cyber-gold/30 text-cyber-gold px-3 py-1 rounded font-mono text-[9px] uppercase tracking-wider font-semibold">
                IRDR Young Scientist Fellow
              </div>
            </div>

            <div className="space-y-4 text-xs text-gray-300 leading-relaxed max-w-2xl">
              <p>
                Dr. Ranit Chatterjee is the visionary driving DTECH's unique intersection of environmental stewardship, corporate technology scaling, and civic intervention. Prior to co-founding DTECH, his work with various UN agencies, national and local governments, and NGOs helped mold international frameworks on socio-economic resilience during sudden crisis encounters.
              </p>
              <p>
                Having served as a key researcher within Tata Consultancy Services (TCS) research and innovation unit, Dr. Chatterjee integrates extensive enterprise system capabilities with a hard academic rigor. He holds a PhD in Environmental Management from Kyoto University (Japan) and a Master's from the Tata Institute of Social Sciences (Mumbai).
              </p>
            </div>
          </div>

          {/* Social or Badge footer */}
          <div className="border-t border-white/5 pt-6 mt-8 relative z-10 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-1.5 items-center font-mono text-[9px] text-gray-500 uppercase font-semibold">
              <Globe className="w-4 h-4 text-cyber-teal" />
              <span>International Advisory Network Panel Secure</span>
            </div>
            
            <a 
              href="mailto:disastertechnologypvtltd@gmail.com" 
              className="px-4 py-2 rounded bg-white/5 text-xs text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
            >
              <span>INQUIRE AUDITS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Credentials Bento Grid Right Side - Bento Right Side */}
        <div className="col-span-1 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {founderCredentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div key={idx} className="glass-panel p-5 rounded-lg border-white/5 hover:border-cyber-gold/25 transition-all flex gap-4 items-start group">
                <div className="p-2.5 rounded bg-white/5 text-cyber-gold group-hover:scale-115 transition-transform shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-display font-medium text-white group-hover:text-cyber-gold transition-colors">{cred.text}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{cred.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interns Showcase Section */}
      <div className="glass-panel rounded-lg p-6 md:p-8 border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/5 pb-4">
          <div>
            <span className="font-mono text-xs tracking-widest text-cyber-teal uppercase">DTECH INTERN REGISTER</span>
            <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight mt-1">Our Interns' Voice</h3>
          </div>
          
          {/* Timeline Indicators */}
          <div className="flex gap-2">
            {interns.map((intern, idx) => (
              <button
                key={idx}
                type="button"
                className={`w-8 h-8 rounded-full font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
                  activeIntern === idx 
                    ? 'bg-cyber-teal text-cyber-bg font-bold scale-110 shadow-lg shadow-cyber-teal/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                onClick={() => setActiveIntern(idx)}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Quote Card */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg text-cyber-teal group hover:scale-105 transition-all">
            <Quote className="w-8 h-8 rotate-180 opacity-60" />
          </div>
          <div>
            <p className="text-base text-gray-300 italic leading-relaxed select-all">
              "{interns[activeIntern].quote}"
            </p>
            <div className="mt-4 flex gap-2 items-center">
              <span className="font-sans font-medium text-white text-sm">{interns[activeIntern].name}</span>
              <span className="text-xs text-gray-500 font-mono">/</span>
              <span className="text-xs text-cyber-teal font-mono">{interns[activeIntern].role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
