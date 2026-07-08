import { useState, useEffect } from 'react';
import { 
  Cpu, Radio, ShieldCheck, Zap, Anchor, Flame, Info, Eye, 
  Video, Smartphone, Compass, Waves, ShieldAlert, Laptop, MapPin
} from 'lucide-react';

interface HotspotItem {
  id: string;
  label: string;
  desc: string;
  pos: { top: string; left: string };
  specs: string;
}

interface HotspotButtonProps {
  key?: string;
  pt: HotspotItem;
  isActive: boolean;
  activeColorClass: string;
  onHover: (id: string | null) => void;
}

function HotspotButton({ pt, isActive, activeColorClass, onHover }: HotspotButtonProps) {
  return (
    <div
      style={{ 
        position: 'absolute', 
        top: pt.pos.top, 
        left: pt.pos.left, 
        transform: 'translate(-50%, -50%)',
        zIndex: 40
      }}
      className="w-10 h-10 flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => onHover(pt.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div 
        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-none ${
          isActive 
            ? `${activeColorClass} scale-150 shadow-lg outline outline-3` 
            : 'bg-white/80 scale-100 group-hover:scale-125 group-hover:bg-white'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#07090e] pointer-events-none" />
      </div>
    </div>
  );
}

const cobraHotspots = [
  { id: 'chassis', label: 'Flexible Micro-Joint Chassis', desc: 'Serpentine body with segments designed to slip through narrow structural gaps and rubble mounds.', pos: { top: '35%', left: '20%' }, specs: 'Segments: 8 flexible nodes, Armor: Titanium mesh' },
  { id: 'camera', label: 'Immersive Optics Array', desc: 'Combines localized thermal imaging, night-vision infrared sensors and telemetry radar.', pos: { top: '15%', left: '50%' }, specs: 'FOV: 140°, Res: 4K Thermal, range: 45m' },
  { id: 'gas', label: 'Life Sign Sensor Module', desc: 'Pinpoint environmental toxins, carbon levels and respiratory sounds of trapped victims.', pos: { top: '45%', left: '80%' }, specs: 'CO/CO2 detection, Geophone sonic mesh' },
  { id: 'thruster', label: 'Aquatic Propulsion Kit', desc: 'Customizable dual waterjet modules for sub-aquatic survey and search operations.', pos: { top: '75%', left: '40%' }, specs: 'Submersion depth: 15m, runtime: 4h' }
];

const floodHotspots = [
  { id: 'beacon', label: 'Tri-Flash Warning Beacon', desc: 'Ultra-bright solar-powered multi-stage evacuation lighting grid visible under storms.', pos: { top: '20%', left: '50%' }, specs: 'Intensity: 1200 Lumens, Modes: 3 Warning levels' },
  { id: 'transducer', label: 'Non-Contact Radar Water Probe', desc: 'Extremely accurate ultrasonic water head level sensor defying muddy torrent mud buildup.', pos: { top: '65%', left: '30%' }, specs: 'Sampling Rate: 1s, Variance: +/- 1mm' },
  { id: 'solar', label: 'Autarkic Smart Power Panel', desc: 'High conversion solar cells keeping internal battery reserves fully charged during outages.', pos: { top: '15%', left: '80%' }, specs: 'Power: 45W, Battery Buffer: 14 Days' },
  { id: 'siren', label: 'Acoustic Siren Horn', desc: '120dB directional horn sending distinct warnings across river basin ranges.', pos: { top: '45%', left: '15%' }, specs: 'Audible Sector: 1.5km radial, Low power alert' }
];

const nadiDhrishtiHotspots = [
  { id: 'lens', label: 'Specialized Polarized Lens', desc: 'Cuts reflection and glare from the sun to see clearly through murky or agitated water surface layers.', pos: { top: '35%', left: '20%' }, specs: 'Wavelength filter: 520nm green-cyan band' },
  { id: 'neural', label: 'MurkyVision AI Core', desc: 'Low-latency deep neural network model trained on swimming and drowning postures in muddy waters.', pos: { top: '15%', left: '50%' }, specs: 'Inference speed: 14ms on-edge, precision: 96.2%' },
  { id: 'sonar', label: 'Active Sonar Link', desc: 'Sends ultrasonic wave pulses to verify human presence when extreme silt blocks optical cameras.', pos: { top: '45%', left: '80%' }, specs: 'Frequency: 200kHz, Depth capability: 15 meters' },
  { id: 'alert', label: 'High-Decibel Siren Beacon', desc: 'Triggers local physical strobe light sirens and forwards coordinates to rescue teams instantly.', pos: { top: '75%', left: '40%' }, specs: 'Alert broadcast: LoRa + GSM under 1 second' }
];

const smartDhakkanHotspots = [
  { id: 'pressure_below', label: 'Hydrostatic Pressure Sensor (Sewer)', desc: 'Measures rising water levels and toxic sewer gases from inside the chamber below.', pos: { top: '65%', left: '30%' }, specs: 'Range: 0-5 Bar, Gas metrics: H2S + CH4 logging' },
  { id: 'pressure_above', label: 'Atmospheric Surface Sensor', desc: 'Tracks flooded water pressure and debris mass gathering on the street surface above.', pos: { top: '15%', left: '80%' }, specs: 'Detects street submergence levels up to 3m' },
  { id: 'gps', label: 'Reinforced IP68 GNSS Antenna', desc: 'Tough, anti-theft tracking chip transmitting absolute position coordinates if the lid is displaced.', pos: { top: '45%', left: '15%' }, specs: 'Battery buffer: 5 years, Protocol: LPWAN NB-IoT' },
  { id: 'lock', label: 'Solenoid Securing Deadbolt', desc: 'Heavy-duty steel automated mechanical locking mechanism to prevent dangerous lid displacement or theft.', pos: { top: '20%', left: '50%' }, specs: 'Clamping force: 5000 Newtons, manual override key' }
];

const snakeIdHotspots = [
  { id: 'vision', label: 'Scale Classifier Engine', desc: 'Parses snake scale patterns, head shapes, and eye slit geometries to classify the species.', pos: { top: '15%', left: '50%' }, specs: 'Dataset: 120+ Indian venomous species, offline ML core' },
  { id: 'gps_hosp', label: 'Anti-Venom Finder', desc: 'Geolocates the closest emergency clinics stocking anti-venom for the identified snake type.', pos: { top: '65%', left: '30%' }, specs: 'Dynamic stock APIs with medical inventory sync' },
  { id: 'first_aid', label: 'First Aid Playbook', desc: 'Interactive visual checklist guiding the user to slow heart rate, immobilize limbs, and avoid tourniquets.', pos: { top: '15%', left: '80%' }, specs: 'WHO Snakebite Management guidelines aligned' },
  { id: 'bot', label: 'Emergency Responder Link', desc: 'One-touch automated SMS containing GPS coordinates, image upload, and clinical snake type report.', pos: { top: '45%', left: '15%' }, specs: 'Auto-sends telemetry data to state ambulance' }
];

const vrEducationHotspots = [
  { id: 'optics', label: 'Dual 4K Wide-angle Lens', desc: '110-degree immersive field-of-view displays replicating realistic catastrophic scenarios.', pos: { top: '20%', left: '50%' }, specs: 'Refresh rate: 90Hz, Low blue-light certification' },
  { id: 'scenarios', label: 'Procedural Scenario Engine', desc: 'Pre-loaded physical exercises simulating earthquakes, cyclones, flash-floods, and high-rise fire evacuations.', pos: { top: '65%', left: '30%' }, specs: 'Built-in rigid body physics simulator' },
  { id: 'haptics', label: 'Force Haptic Integrator', desc: 'Direct vibration arrays in vest and controllers mimicking geological tremors or storm drafts.', pos: { top: '15%', left: '80%' }, specs: 'Response latency: <5ms, multi-channel rumble' },
  { id: 'telemetry', label: 'Evacuation Performance Log', desc: 'Logs user reaction times, pathway choice metrics, and survival decisions during simulations.', pos: { top: '45%', left: '15%' }, specs: 'Disaster Preparedness Scorecard output report' }
];

function CobraWireframe() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1.5) % 360);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-1 items-center z-10" style={{ transform: `rotate(${angle}deg)` }}>
      {[...Array(6)].map((_, i) => (
        <div 
          key={i} 
          className="w-5 h-5 rounded-full border border-cyber-crimson/60 bg-cyber-crimson/10 flex items-center justify-center"
          style={{ transform: `translateY(${Math.sin(angle/10 + i) * 6}px)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyber-crimson" />
        </div>
      ))}
    </div>
  );
}

function VRWireframe() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 1.5) % 360);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[180px] h-[100px] rounded-xl border border-indigo-500/40 bg-black/40 relative flex flex-col justify-center items-center z-10" style={{ transform: `rotate(${angle / 3}deg)` }}>
      <div className="w-[160px] h-3 bg-indigo-500/20 rounded-full mb-1" />
      <div className="flex gap-8">
        <div className="w-10 h-10 rounded-full border border-indigo-500/60 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-indigo-500" />
        </div>
        <div className="w-10 h-10 rounded-full border border-indigo-500/60 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-indigo-500" />
        </div>
      </div>
    </div>
  );
}

export default function ProductSections() {
  const [activeTab, setActiveTab] = useState<'cobra' | 'flood' | 'nadi_dhrishti' | 'smart_dhakkan' | 'snake_id' | 'vr_education'>('cobra');
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  return (
    <section className="px-6 py-20 md:px-16 md:py-24 max-w-7xl mx-auto z-10 relative selection:bg-cyber-teal selection:text-cyber-bg">
      
      {/* Top Banner section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <span className="font-mono text-xs tracking-widest text-cyber-crimson uppercase">CORE PROJECTS</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-2">
            Disruptive Hazard Tech <br />
            <span className="text-gray-400">Deployed In Vulnerable Zones</span>
          </h2>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 border border-white/5 rounded-xl max-w-full">
          <button
            type="button"
            className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'cobra' 
                ? 'bg-cyber-crimson text-white shadow-lg shadow-cyber-crimson/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
            }`}
            onClick={() => { setActiveTab('cobra'); setHoveredHotspot(null); }}
          >
            Snake Robot
          </button>
          <button
            type="button"
            className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'flood' 
                ? 'bg-[#007aff] text-white shadow-lg shadow-cyber-blue/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
            }`}
            onClick={() => { setActiveTab('flood'); setHoveredHotspot(null); }}
          >
            Flood warning grids
          </button>
          <button
            type="button"
            className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'nadi_dhrishti' 
                ? 'bg-cyber-teal text-cyber-bg shadow-lg shadow-cyber-teal/20 font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
            }`}
            onClick={() => { setActiveTab('nadi_dhrishti'); setHoveredHotspot(null); }}
          >
            Nadi Dhrishti
          </button>
          <button
            type="button"
            className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'smart_dhakkan' 
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
            }`}
            onClick={() => { setActiveTab('smart_dhakkan'); setHoveredHotspot(null); }}
          >
            Smart Dhakkan
          </button>
          <button
            type="button"
            className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'snake_id' 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
            }`}
            onClick={() => { setActiveTab('snake_id'); setHoveredHotspot(null); }}
          >
            Snake ID App
          </button>
          <button
            type="button"
            className={`px-4 py-2.5 rounded-lg font-display text-xs md:text-sm font-medium tracking-wide transition-all ${
              activeTab === 'vr_education' 
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-semibold' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
            }`}
            onClick={() => { setActiveTab('vr_education'); setHoveredHotspot(null); }}
          >
            VR Education
          </button>
        </div>
      </div>

      {/* activeTab === 'cobra' */}
      {activeTab === 'cobra' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Schematic Interactive Canvas */}
          <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 border-white/5 relative flex flex-col justify-start overflow-hidden min-h-[420px] md:min-h-[460px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-cyber-crimson font-bold uppercase tracking-wider block">ID: CR-04_SNAKE</span>
                  <h3 className="text-2xl font-display font-medium text-white mt-1">Snake Robot</h3>
                </div>
                <div className="animate-pulse bg-cyber-crimson/10 border border-cyber-crimson/30 text-cyber-crimson px-2.5 py-0.5 rounded font-mono text-[9px]">
                  CRITICAL RESCUER PROTOTYPE
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 max-w-xl">
                Snake Robot is DTECH's flagship mechanical platform. It scales treacherous earthquake rubble, climbs vertical concrete steps, and maneuvers underwater channels recursively.
              </p>
            </div>

            {/* Simulated Schematic Graphic representation */}
            <div className="relative w-full h-[260px] md:h-[280px] bg-cyber-bg/50 border border-white/[0.03] rounded flex items-center justify-center my-4 overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-cyber-bg opacity-30 pointer-events-none" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div className="w-[200px] h-[200px] rounded-full border border-cyber-crimson" />
                <div className="w-[120px] h-[120px] rounded-full border border-cyber-crimson animate-ping" />
              </div>

              {/* Serpentine Wireframe design */}
              <CobraWireframe />

              {/* Hotspot anchor points */}
              {cobraHotspots.map((pt) => (
                <HotspotButton
                  key={pt.id}
                  pt={pt}
                  isActive={hoveredHotspot === pt.id}
                  activeColorClass="bg-cyber-crimson shadow-cyber-crimson/60 outline-cyber-crimson/25"
                  onHover={setHoveredHotspot}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-auto flex gap-2 items-center text-gray-500 text-[10px] font-mono">
              <Info className="w-3.5 h-3.5 text-cyber-crimson" />
              <span>HOVER SCENARIO NODES ABOVE TO UNLOCK SNAKE ROBOT SCHEMATICS RAW SPECS</span>
            </div>
          </div>

          {/* Blueprint Detail Data Column */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-lg p-6 border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-[#818cf8] tracking-widest block uppercase mb-3">BLUEPRINT READOUT</span>
                
                {hoveredHotspot ? (
                  <div>
                    {(() => {
                      const activePt = cobraHotspots.find(h => h.id === hoveredHotspot);
                      if (!activePt) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xl font-display font-medium text-cyber-crimson">{activePt.label}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{activePt.desc}</p>
                          <div className="bg-cyber-crimson/5 border border-cyber-crimson/10 p-3 rounded mt-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Technical Metrics</span>
                            <span className="text-xs text-white font-mono block mt-1">{activePt.specs}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-medium text-white">Interactive Serpentine Layout</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      This autonomous snake-like system integrates life signs array sensors with segmented flexible joint motors to detect people stuck in building ruins. Can be customized for deep fluid navigation or high-obstacle debris clusters.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Anchor className="w-4 h-4 text-cyber-blue mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">LAND + WATER</span>
                        <span className="text-xs text-white block mt-0.5">Flexible swimming</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Flame className="w-4 h-4 text-orange-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">CHEMICAL & FIRE</span>
                        <span className="text-xs text-white block mt-0.5">Teflon outer skin</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">ROBOT STATUS LOG REGISTER</span>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                  <span className="text-cyber-crimson">&gt; CHASSIS_ARMED: CONFIRMED</span>
                </div>
              </div>
            </div>

            {/* Testimonials or Quotes */}
            <div className="glass-panel rounded-lg p-5 border-white/5 flex gap-4 items-start">
              <div className="p-3 bg-cyber-crimson/10 border border-cyber-crimson/20 rounded font-bold text-cyber-crimson font-mono text-xs">
                LIFE
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#ff0055] uppercase block font-semibold">SEARCH MISSION DRILL</span>
                <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                  "During disaster simulated exercises in narrow pipe setups, the Snake Robot accessed trapped victims 3x faster than heavy excavation rigs."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* activeTab === 'flood' */}
      {activeTab === 'flood' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 border-white/5 relative flex flex-col justify-start overflow-hidden min-h-[420px] md:min-h-[460px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-cyber-blue font-bold uppercase tracking-wider block">ID: FWG-77_MONITOR</span>
                  <h3 className="text-2xl font-display font-medium text-white mt-1">Community Flood Early Warning System</h3>
                </div>
                <div className="bg-[#007aff]/10 border border-cyber-blue/30 text-cyber-blue px-2.5 py-0.5 rounded font-mono text-[9px] flex items-center gap-1.5 font-bold uppercase animate-pulse-slow">
                  <Radio className="w-3 h-3 text-cyber-blue" />
                  CDRI RECOGNIZED ACCORD
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 max-w-xl">
                A low-cost, decentralized automated early warning array. When water basins rise to hazard limits, it triggers high-frequency beacon arrays, acoustic evacuation sirens, and pushes automatic GSM notifications to local communities instantly.
              </p>
            </div>

            {/* Simulated schematic */}
            <div className="relative w-full h-[260px] md:h-[280px] bg-cyber-bg/50 border border-white/[0.03] rounded flex items-center justify-center my-4 overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-cyber-bg opacity-30 pointer-events-none" />
              
              <div className="absolute bottom-0 w-full left-0 opacity-20">
                <svg viewBox="0 0 400 100" className="w-full h-16 text-[#007aff] fill-current">
                  <path d="M 0,50 Q 100,20 200,50 T 400,50 L 400,100 L 0,100 Z" className="animate-pulse" />
                </svg>
              </div>

              {/* Antenna Mast Graphic */}
              <div className="flex flex-col items-center gap-1 z-10">
                <div className="w-1.5 h-20 bg-gray-500 rounded-lg relative flex flex-col justify-start items-center">
                  <div className="w-5 h-5 rounded-full bg-cyber-blue flex items-center justify-center -mt-3 animate-pulse">
                    <Radio className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div className="w-8 h-4 bg-gray-700 rounded-t" />
              </div>

              {/* Hotspots */}
              {floodHotspots.map((pt) => (
                <HotspotButton
                  key={pt.id}
                  pt={pt}
                  isActive={hoveredHotspot === pt.id}
                  activeColorClass="bg-cyber-blue shadow-cyber-blue/60 outline-cyber-blue/25"
                  onHover={setHoveredHotspot}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-auto flex gap-2 items-center text-gray-500 text-[10px] font-mono">
              <Info className="w-3.5 h-3.5 text-cyber-blue" />
              <span>HOVER WARNING GRID NODES ABOVE TO VERIFY ULTRA-ACCURATE TELEMETRY</span>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-lg p-6 border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-cyber-teal tracking-widest block uppercase mb-3">COALITION CDRI REGISTERED blueprint</span>
                
                {hoveredHotspot ? (
                  <div>
                    {(() => {
                      const activePt = floodHotspots.find(h => h.id === hoveredHotspot);
                      if (!activePt) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xl font-display font-medium text-cyber-blue">{activePt.label}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{activePt.desc}</p>
                          <div className="bg-cyber-blue/5 border border-cyber-blue/10 p-3 rounded mt-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Technical Metrics</span>
                            <span className="text-xs text-white font-mono block mt-1">{activePt.specs}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-medium text-white">Low-Cost Solar Node Grid</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Custom structural layouts allow local village heads to set boundaries manually, avoiding excessive capital overhead. High visibility light flashes give instant alert indicators before flash torrent reaches residential limits.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Zap className="w-4 h-4 text-yellow-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">SOLAR AUTARKIC</span>
                        <span className="text-xs text-white block mt-0.5">Runs continuously offline</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <ShieldCheck className="w-4 h-4 text-cyber-teal mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">CDRI AWARD CERTIFIED</span>
                        <span className="text-xs text-white block mt-0.5">Coalition Standard</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">CDRI ACCORD FEEDS STATUS</span>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                  <span className="text-cyber-blue">&gt; CDRI_ACCORD: VERIFIED</span>
                  <span className="text-gray-400">100% REGULATORY OK</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-5 border-white/5 flex gap-4 items-start">
              <div className="p-3 bg-cyber-blue/10 border border-cyber-blue/20 rounded font-bold text-cyber-blue font-mono text-xs">
                CDRI
              </div>
              <div>
                <span className="font-mono text-[9px] text-[#007aff] uppercase block font-semibold">CDRI BOARD RECOGNITION</span>
                <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                  "Recognized for its high frugality, community-centered ownership model, and near-zero power requirement in river basins."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* activeTab === 'nadi_dhrishti' */}
      {activeTab === 'nadi_dhrishti' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 border-white/5 relative flex flex-col justify-start overflow-hidden min-h-[420px] md:min-h-[460px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-cyber-teal font-bold uppercase tracking-wider block">ID: ND-12_VISION</span>
                  <h3 className="text-2xl font-display font-medium text-white mt-1">Nadi Dhrishti</h3>
                </div>
                <div className="bg-cyber-teal/10 border border-cyber-teal/30 text-cyber-teal px-2.5 py-0.5 rounded font-mono text-[9px] flex items-center gap-1.5 font-bold uppercase animate-pulse-slow">
                  <Waves className="w-3 h-3 text-cyber-teal" />
                  AI MURKY DROWNING DETECTOR
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 max-w-xl">
                A smart drowning detection system which uses computer vision to detect if a person is drowning or not even in murky waters.
              </p>
            </div>

            {/* Simulated schematic */}
            <div className="relative w-full h-[260px] md:h-[280px] bg-cyber-bg/50 border border-white/[0.03] rounded flex items-center justify-center my-4 overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-cyber-bg opacity-30 pointer-events-none" />
              
              {/* Radar scanner grid */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-[180px] h-[180px] border border-dashed border-cyber-teal animate-spin-slow" />
                <div className="w-[240px] h-[120px] border border-cyber-teal rounded-full" />
              </div>

              {/* Glowing Target Box representing drowning classification */}
              <div className="absolute border border-cyber-teal p-3 bg-cyber-teal/5 rounded flex flex-col items-center gap-1 z-10">
                <div className="w-8 h-8 rounded-full border border-cyber-teal/80 flex items-center justify-center animate-ping">
                  <Eye className="w-4 h-4 text-cyber-teal" />
                </div>
                <span className="text-[8px] font-mono text-cyber-teal tracking-wider uppercase font-bold bg-cyber-teal/10 px-1 py-0.5 rounded">
                  TARGET: MONITORED
                </span>
              </div>

              {/* Hotspots */}
              {nadiDhrishtiHotspots.map((pt) => (
                <HotspotButton
                  key={pt.id}
                  pt={pt}
                  isActive={hoveredHotspot === pt.id}
                  activeColorClass="bg-cyber-teal shadow-cyber-teal/60 outline-cyber-teal/25"
                  onHover={setHoveredHotspot}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-auto flex gap-2 items-center text-gray-500 text-[10px] font-mono">
              <Info className="w-3.5 h-3.5 text-cyber-teal" />
              <span>HOVER SYSTEM NODES ABOVE TO VIEW COMPUTER VISION CLASSIFICATION SCHEMES</span>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-lg p-6 border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-cyber-teal tracking-widest block uppercase mb-3">AI Blueprints Readout</span>
                
                {hoveredHotspot ? (
                  <div>
                    {(() => {
                      const activePt = nadiDhrishtiHotspots.find(h => h.id === hoveredHotspot);
                      if (!activePt) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xl font-display font-medium text-cyber-teal">{activePt.label}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{activePt.desc}</p>
                          <div className="bg-cyber-teal/5 border border-cyber-teal/10 p-3 rounded mt-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Technical Metrics</span>
                            <span className="text-xs text-white font-mono block mt-1">{activePt.specs}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-medium text-white">MurkyWater Sight Optimization</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      This active camera telemetry setup leverages custom-built polarized filtering lenses to capture sharp high-contrast feeds, running advanced deep neural algorithms at the edge for rapid classification of distressed human movements.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Eye className="w-4 h-4 text-cyber-teal mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">VISION CORE</span>
                        <span className="text-xs text-white block mt-0.5">Anti-glare polarizer</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Waves className="w-4 h-4 text-blue-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">DROWNING POSTURE</span>
                        <span className="text-xs text-white block mt-0.5">Real-time distress check</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">AI DETECTOR TELEMETRY LOG</span>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                  <span className="text-cyber-teal">&gt; ND_CV_CAMERA_FEED: ONLINE</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-5 border-white/5 flex gap-4 items-start">
              <div className="p-3 bg-cyber-teal/10 border border-cyber-teal/20 rounded font-bold text-cyber-teal font-mono text-xs">
                VISION
              </div>
              <div>
                <span className="font-mono text-[9px] text-cyber-teal uppercase block font-semibold">GHAT LIFEGUARD FEEDBACK</span>
                <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                  "The polarizer effectively filters solar ripples, allowing the AI model to detect swimmer submergence coordinates even in dense brown muddy waters."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* activeTab === 'smart_dhakkan' */}
      {activeTab === 'smart_dhakkan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 border-white/5 relative flex flex-col justify-start overflow-hidden min-h-[420px] md:min-h-[460px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider block">ID: SD-08_MANHOLE</span>
                  <h3 className="text-2xl font-display font-medium text-white mt-1">Smart Dhakkan</h3>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 px-2.5 py-0.5 rounded font-mono text-[9px] flex items-center gap-1.5 font-bold uppercase animate-pulse-slow">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  MUNICIPAL INFRA TELEMETRY
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 max-w-xl">
                A smart Manhole which detects the water pressure below and above the manhole while also giving its gps location.
              </p>
            </div>

            {/* Simulated schematic */}
            <div className="relative w-full h-[260px] md:h-[280px] bg-cyber-bg/50 border border-white/[0.03] rounded flex items-center justify-center my-4 overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-cyber-bg opacity-30 pointer-events-none" />
              
              {/* Circular Lid Wireframe */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-[180px] h-[180px] rounded-full border border-double border-amber-500 animate-spin-slow" />
                <div className="w-[140px] h-[140px] rounded-full border border-amber-500" />
              </div>

              {/* Concentric transmitter signals */}
              <div className="absolute w-24 h-24 rounded-full border border-dashed border-amber-500/40 flex items-center justify-center z-10">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center animate-pulse">
                  <Compass className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Hotspots */}
              {smartDhakkanHotspots.map((pt) => (
                <HotspotButton
                  key={pt.id}
                  pt={pt}
                  isActive={hoveredHotspot === pt.id}
                  activeColorClass="bg-amber-500 shadow-amber-500/60 outline-amber-500/25"
                  onHover={setHoveredHotspot}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-auto flex gap-2 items-center text-gray-500 text-[10px] font-mono">
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <span>HOVER DIAGNOSTIC NODES ABOVE TO VIEW SUBTERRANEAN SENSOR SPECS</span>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-lg p-6 border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-amber-500 tracking-widest block uppercase mb-3">SUB-SURFACE NODE SPECS</span>
                
                {hoveredHotspot ? (
                  <div>
                    {(() => {
                      const activePt = smartDhakkanHotspots.find(h => h.id === hoveredHotspot);
                      if (!activePt) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xl font-display font-medium text-amber-500">{activePt.label}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{activePt.desc}</p>
                          <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded mt-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Technical Metrics</span>
                            <span className="text-xs text-white font-mono block mt-1">{activePt.specs}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-medium text-white">Dual-Pressure Sewer Tracking</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Smart Dhakkan prevents sudden structural displacement by monitoring critical water pressure ratios below (clogged surge) and above (heavy road flooding). It instantly triggers alarm alerts if the heavy cast iron lid gets unscrewed or stolen.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Compass className="w-4 h-4 text-amber-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">GPS LOCATION</span>
                        <span className="text-xs text-white block mt-0.5">NB-IoT telemetry lock</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <ShieldAlert className="w-4 h-4 text-[#ff0055] mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">DISPLACEMENT ALERT</span>
                        <span className="text-xs text-white block mt-0.5">Anti-theft locks</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">MUNICIPAL HUB TELEMETRY</span>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                  <span className="text-amber-500">&gt; GPS_STATE: BOUND // LID_SEAL: PRESSURE_OK</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-5 border-white/5 flex gap-4 items-start">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded font-bold text-amber-500 font-mono text-xs">
                SEWER
              </div>
              <div>
                <span className="font-mono text-[9px] text-amber-500 uppercase block font-semibold">CIVIC UTILITY TESTIMONY</span>
                <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                  "Placing these Smart Dhakkans at critical waterlogged intersections has completely eliminated unexpected lid dislodging, saving pedestrians and locating sewer backups cleanly."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* activeTab === 'snake_id' */}
      {activeTab === 'snake_id' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 border-white/5 relative flex flex-col justify-start overflow-hidden min-h-[420px] md:min-h-[460px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-emerald-500 font-bold uppercase tracking-wider block">ID: SI-33_MOBILE</span>
                  <h3 className="text-2xl font-display font-medium text-white mt-1">Snake Identification App</h3>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-2.5 py-0.5 rounded font-mono text-[9px] flex items-center gap-1.5 font-bold uppercase animate-pulse-slow">
                  <Smartphone className="w-3 h-3 text-emerald-500" />
                  EMERGENCY HEALTH ASSISTANCE
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 max-w-xl">
                A mobile app which helps snakebite victims to identify the snake and help them get proper medical assistance.
              </p>
            </div>

            {/* Simulated schematic */}
            <div className="relative w-full h-[260px] md:h-[280px] bg-cyber-bg/50 border border-white/[0.03] rounded flex items-center justify-center my-4 overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-cyber-bg opacity-30 pointer-events-none" />
              
              {/* Phone wireframe */}
              <div className="w-[140px] h-[220px] rounded-2xl border-2 border-emerald-500/40 bg-black/40 relative flex flex-col p-2 overflow-hidden z-10">
                <div className="w-12 h-3 bg-emerald-500/30 rounded-full mx-auto mb-2" />
                <div className="flex-1 border border-dashed border-emerald-500/20 rounded flex flex-col items-center justify-center relative">
                  {/* Camera focus target corners */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-emerald-500" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-emerald-500" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-emerald-500" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-emerald-500" />
                  
                  <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center animate-pulse">
                    <Smartphone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[6px] font-mono text-emerald-400 mt-1 uppercase tracking-widest text-center">
                    SCAN SPECIES...
                  </span>
                </div>
              </div>

              {/* Hotspots */}
              {snakeIdHotspots.map((pt) => (
                <HotspotButton
                  key={pt.id}
                  pt={pt}
                  isActive={hoveredHotspot === pt.id}
                  activeColorClass="bg-emerald-500 shadow-emerald-500/60 outline-emerald-500/25"
                  onHover={setHoveredHotspot}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-auto flex gap-2 items-center text-gray-500 text-[10px] font-mono">
              <Info className="w-3.5 h-3.5 text-emerald-500" />
              <span>HOVER INTERACTIVE TELEMETRY LABELS TO DETECT APP FEATURES</span>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-lg p-6 border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-emerald-500 tracking-widest block uppercase mb-3">MOBILE TELEMEDICINE REWRITE</span>
                
                {hoveredHotspot ? (
                  <div>
                    {(() => {
                      const activePt = snakeIdHotspots.find(h => h.id === hoveredHotspot);
                      if (!activePt) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xl font-display font-medium text-emerald-500">{activePt.label}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{activePt.desc}</p>
                          <div className="bg-emerald-500/5 border border-emerald-500/10 p-3 rounded mt-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Technical Metrics</span>
                            <span className="text-xs text-white font-mono block mt-1">{activePt.specs}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-medium text-white">Species Detection & First Aid</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Snakebite hazards cause severe casualties in deep rural environments. By deploying offline AI models, victims identify species instantly from a safe snapshot, while the app guides them on calm breathing first aid and guides rescue ambulances with anti-venom direct.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Smartphone className="w-4 h-4 text-emerald-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">OFFLINE PREDICT</span>
                        <span className="text-xs text-white block mt-0.5">Runs offline in deep woods</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">WHO COMPLIANCE</span>
                        <span className="text-xs text-white block mt-0.5">Official rescue advice</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">CLINICAL EMERGENCIES</span>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                  <span className="text-emerald-500">&gt; CLINICAL_INTEGRATION: ACTIVE // ML_ENGINE: ON_DEVICE</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-5 border-white/5 flex gap-4 items-start">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded font-bold text-emerald-500 font-mono text-xs">
                SAVED
              </div>
              <div>
                <span className="font-mono text-[9px] text-emerald-500 uppercase block font-semibold">RURAL DOCTOR CASE STUDY</span>
                <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                  "Identifying a Spectacled Cobra in under 15 seconds through the application allowed us to request correct polyvalent anti-venom from the taluka center immediately."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* activeTab === 'vr_education' */}
      {activeTab === 'vr_education' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="col-span-1 lg:col-span-7 glass-panel rounded-lg p-6 border-white/5 relative flex flex-col justify-start overflow-hidden min-h-[420px] md:min-h-[460px]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-[10px] text-indigo-500 font-bold uppercase tracking-wider block">ID: VE-55_VIRTUAL</span>
                  <h3 className="text-2xl font-display font-medium text-white mt-1">VR Education</h3>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 px-2.5 py-0.5 rounded font-mono text-[9px] flex items-center gap-1.5 font-bold uppercase animate-pulse-slow">
                  <Video className="w-3 h-3 text-indigo-500" />
                  IMMERSIVE HAZARD TRAINING
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 max-w-xl">
                Using VR headset and created experiences, teach students on Disaster Management.
              </p>
            </div>

            {/* Simulated schematic */}
            <div className="relative w-full h-[260px] md:h-[280px] bg-cyber-bg/50 border border-white/[0.03] rounded flex items-center justify-center my-4 overflow-hidden">
              <div className="absolute inset-0 bg-radial from-transparent to-cyber-bg opacity-30 pointer-events-none" />
              
              {/* VR Headset wireframe */}
              <VRWireframe />

              {/* Hotspots */}
              {vrEducationHotspots.map((pt) => (
                <HotspotButton
                  key={pt.id}
                  pt={pt}
                  isActive={hoveredHotspot === pt.id}
                  activeColorClass="bg-indigo-500 shadow-indigo-500/60 outline-indigo-500/25"
                  onHover={setHoveredHotspot}
                />
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-auto flex gap-2 items-center text-gray-500 text-[10px] font-mono">
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <span>HOVER HARDWARE NODES ABOVE TO UNLOCK EXPERIENTIAL DISASTER MODULES</span>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="glass-panel rounded-lg p-6 border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-indigo-500 tracking-widest block uppercase mb-3">VR CLASSROOM READOUT</span>
                
                {hoveredHotspot ? (
                  <div>
                    {(() => {
                      const activePt = vrEducationHotspots.find(h => h.id === hoveredHotspot);
                      if (!activePt) return null;
                      return (
                        <div className="space-y-3">
                          <h4 className="text-xl font-display font-medium text-indigo-500">{activePt.label}</h4>
                          <p className="text-xs text-gray-300 leading-relaxed">{activePt.desc}</p>
                          <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded mt-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase font-semibold">Technical Metrics</span>
                            <span className="text-xs text-white font-mono block mt-1">{activePt.specs}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-medium text-white">Experiential Preparedness drills</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      VR Education transforms dry manual emergency evacuation booklets into highly engaging virtual scenarios. Students learn split-second geological evacuation paths, seismic structural check routines, and emergency life safety measures safely.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Video className="w-4 h-4 text-indigo-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">4K OPTICS</span>
                        <span className="text-xs text-white block mt-0.5">Stereoscopic depth</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded bg-white/[0.01]">
                        <Laptop className="w-4 h-4 text-indigo-400 mb-1" />
                        <span className="text-[9px] font-mono text-gray-500 block uppercase">SIMULATOR DRILLS</span>
                        <span className="text-xs text-white block mt-0.5">Earthquake + flood response</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/5 pt-4 mt-6">
                <span className="text-[9px] font-mono text-gray-500 block uppercase mb-1">ACADEMIC METRICS</span>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 font-mono text-[10px]">
                  <span className="text-indigo-500">&gt; VR_STANDBY_MODE: READY // SCENARIOS: 4_LOADED</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-5 border-white/5 flex gap-4 items-start">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded font-bold text-indigo-500 font-mono text-xs">
                LEARN
              </div>
              <div>
                <span className="font-mono text-[9px] text-indigo-500 uppercase block font-semibold">PRIMARY SCHOOL OUTREACH</span>
                <p className="text-xs text-gray-300 italic mt-1 leading-relaxed">
                  "Students remembered evacuation safety guidelines 85% better after playing through the 3D VR Earthquake Drill than they did from poster sheets."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
