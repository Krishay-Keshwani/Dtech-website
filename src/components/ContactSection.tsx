import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Cpu, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'individual',
    organizationName: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'transmitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;
    if (formData.userType === 'organization' && !formData.organizationName) return;

    setSubmitStatus('transmitting');

    try {
      const payload = new URLSearchParams();
      payload.append('First Name', formData.firstName);
      payload.append('Last Name', formData.lastName);
      payload.append('Email', formData.email);
      payload.append('Phone', formData.phone);
      payload.append('Classification', formData.userType);
      payload.append('Organization', formData.organizationName);
      payload.append('Message', formData.message);

      const endpoint = 'https://script.google.com/macros/s/AKfycbxkyPESFEtAOgY7m3COoPdbcTEsgslvCqcJJ8XFjaSxP1_xnClUtw66BoWeQeBpDtU/exec';

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        mode: 'no-cors',
        body: payload.toString(),
      });

      setSubmitStatus('success');

      // Completely reset the form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        userType: 'individual',
        organizationName: '',
        message: ''
      });

      // After a 4-second timeout, revert the button back to its original state and re-enable it
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);

    } catch (error) {
      console.error('Transmission error:', error);
      setSubmitStatus('error');
      
      // After a 4-second timeout, revert the button back to its original state and re-enable it
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 4000);
    }
  };

  return (
    <section className="px-6 py-20 md:px-16 md:py-24 max-w-7xl mx-auto z-10 relative selection:bg-cyber-teal selection:text-cyber-bg">
      <div className="mb-12 md:mb-16">
        <span className="font-mono text-xs tracking-widest text-[#0df2c9] uppercase">SECURE COMMUNICATIONS BUFFER</span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-2">
          Establish Connection <br />
          <span className="text-gray-400">with DTECH Grid Nodes</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mt-4 leading-relaxed">
          Reach out to register for custom village-level flood early warnings, schedule a robotic COBRA search field evaluation, or initiate co-innovation consultancy models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Direct Coordinates */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="glass-panel rounded-lg p-6 md:p-8 border-white/5 flex-1 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Phone Node */}
              <div className="flex gap-4 items-start group">
                <div className="p-3 rounded bg-white/5 text-cyber-teal group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-semibold">VOICE MATRIX CHANNEL</span>
                  <a href="tel:+91-1244253375" className="text-sm text-white hover:text-cyber-teal block font-mono mt-1 transition-colors">
                    +91 12442 53375
                  </a>
                </div>
              </div>

              {/* Email Protocol */}
              <div className="flex gap-4 items-start group">
                <div className="p-3 rounded bg-white/5 text-cyber-teal group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-semibold">EMAIL PROTOCOLS</span>
                  <a href="mailto:disastertechnologypvtltd@gmail.com" className="text-sm text-white hover:text-cyber-teal block font-mono mt-1 transition-colors select-all break-all">
                    disastertechnologypvtltd@gmail.com
                  </a>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex gap-4 items-start group">
                <a
                  href="https://maps.app.goo.gl/8m3ke9Dvu2h7YQwMA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded bg-white/5 text-cyber-teal group-hover:scale-110 hover:bg-cyber-teal/10 hover:text-white hover:shadow-[0_0_15px_rgba(13,242,201,0.2)] hover:border-cyber-teal/30 border border-transparent transition-all duration-300 block cursor-pointer"
                  title="Open in Google Maps"
                >
                  <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                </a>
                <div>
                  <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block font-semibold">OFFICE ADDRESS</span>
                  <a
                    href="https://maps.app.goo.gl/8m3ke9Dvu2h7YQwMA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-300 hover:text-cyber-teal mt-1 leading-relaxed select-all block transition-all duration-300 cursor-pointer hover:underline underline-offset-4 decoration-cyber-teal/50"
                    title="Open in Google Maps"
                  >
                    S-05, C-17, <br />
                    Sector -3, <br />
                    Noida – 201301, <br />
                    Uttar Pradesh, India.
                  </a>
                </div>
              </div>

            </div>

            <div className="border-t border-white/5 pt-6 mt-8 font-mono text-[9px] text-gray-500 uppercase">
              <span>* SYSTEM ENDPOINTS REGISTERED IN THE REPUBLIC OF INDIA.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Tech Form */}
        <div className="col-span-1 lg:col-span-7">
          <div className={`glass-panel rounded-lg p-6 md:p-8 h-full relative overflow-hidden flex flex-col justify-between transition-all duration-500 ${
            formData.userType === 'organization' 
              ? 'border-cyber-blue/40 shadow-[0_0_30px_rgba(0,122,255,0.12)]' 
              : 'border-cyber-teal/20 shadow-[0_0_20px_rgba(13,242,201,0.06)]'
          }`}>
            {/* Corner Bracket accents for selected focus panel */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl pointer-events-none transition-colors duration-500 ${formData.userType === 'organization' ? 'border-cyber-blue/60' : 'border-cyber-teal/60'}`} />
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr pointer-events-none transition-colors duration-500 ${formData.userType === 'organization' ? 'border-cyber-blue/60' : 'border-cyber-teal/60'}`} />
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl pointer-events-none transition-colors duration-500 ${formData.userType === 'organization' ? 'border-cyber-blue/60' : 'border-cyber-teal/60'}`} />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br pointer-events-none transition-colors duration-500 ${formData.userType === 'organization' ? 'border-cyber-blue/60' : 'border-cyber-teal/60'}`} />

            {/* Core Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 items-center text-xs font-mono text-gray-400 mb-2 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-cyber-teal" />
                <span>TRANSMISSION ENVELOPE</span>
              </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-500 uppercase font-semibold">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John"
                      className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-teal transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-500 uppercase">Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Doe"
                      className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-teal transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-500 uppercase font-semibold">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@domain.com"
                      className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-teal transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-500 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 99999 99999"
                      className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-teal transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-500 uppercase font-semibold">Classification *</label>
                    <select
                      className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyber-teal cursor-pointer transition-all"
                      value={formData.userType}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFormData(prev => ({ 
                          ...prev, 
                          userType: val,
                          organizationName: val === 'individual' ? '' : prev.organizationName
                        }));
                      }}
                    >
                      <option value="individual" className="bg-[#0e131f] text-white">Individual Client</option>
                      <option value="organization" className="bg-[#0e131f] text-white">Organization / Agency</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className={`text-[10px] font-mono uppercase font-semibold transition-colors duration-300 ${formData.userType === 'organization' ? 'text-cyber-blue font-bold' : 'text-gray-500'}`}>
                      Organization Name {formData.userType === 'organization' ? '*' : '(Optional)'}
                    </label>
                    <input
                      type="text"
                      required={formData.userType === 'organization'}
                      placeholder={formData.userType === 'organization' ? "e.g. Acme Corporation" : "N/A (Individual Selected)"}
                      disabled={formData.userType !== 'organization'}
                      className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-teal disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      value={formData.organizationName}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-gray-500 uppercase font-semibold">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Specify project requirements, robot customizations, or research briefs..."
                    className="w-full bg-cyber-bg border border-white/5 rounded px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyber-teal transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus !== 'idle'}
                  className={`w-full py-3 mt-4 rounded font-display font-semibold tracking-wide text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                    submitStatus === 'success'
                      ? 'bg-[#10b981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : submitStatus === 'error'
                        ? 'bg-[#ef4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : submitStatus === 'transmitting'
                          ? 'bg-gradient-to-r from-cyber-teal/60 to-cyber-blue/60 text-cyber-bg/70 opacity-80'
                          : 'bg-gradient-to-r from-cyber-teal to-cyber-blue text-cyber-bg hover:scale-[1.02] active:scale-[0.99] cursor-pointer'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : submitStatus === 'error' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <Send className={`w-4 h-4 ${submitStatus === 'transmitting' ? 'animate-pulse' : ''}`} />
                  )}
                  <span>
                    {submitStatus === 'transmitting' && 'TRANSMITTING TO CORE...'}
                    {submitStatus === 'success' && 'TRANSMISSION SECURE ✔'}
                    {submitStatus === 'error' && 'TRANSMISSION FAILED ✖'}
                    {submitStatus === 'idle' && 'SECURE TRANSMIT MESSAGE'}
                  </span>
                </button>
              </form>
          </div>
        </div>

      </div>
    </section>
  );
}
