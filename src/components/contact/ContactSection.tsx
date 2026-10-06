import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  Copy, 
  Check, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, lang, services } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Data Analytics & Business Intelligence Moderno',
    message: '',
  });

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      // Keep state or allow new message
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#070d1e] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('contact.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('contact.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('contact.header.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Corporate Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-[#0b1429] border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      {lang === 'es' ? 'Correo Electrónico Oficial' : 'Official Corporate Email'}
                    </span>
                    <a
                      href="mailto:alpha.digital.ia@gmail.com"
                      className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors font-mono"
                    >
                      alpha.digital.ia@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('alpha.digital.ia@gmail.com', 'email')}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  title="Copiar email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'es' ? 'Respuesta garantizada por un Senior Data Scientist en menos de 24 horas laborables.' : 'Guaranteed response by a Senior Data Scientist within 24 business hours.'}
              </p>
            </div>

            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-[#0b1429] border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-blue-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      {lang === 'es' ? 'Atención Telefónica Directa' : 'Direct Telephone Line'}
                    </span>
                    <a
                      href="tel:+34641012046"
                      className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors font-mono"
                    >
                      +34 641 012 046
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('+34641012046', 'phone')}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  title="Copiar teléfono"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'es' ? 'Disponibilidad para consultas técnicas y urgencias de planta.' : 'Available for technical inquiries and mission-critical plant escalation.'}
              </p>
            </div>

            {/* Location & Hours Card */}
            <div className="p-6 rounded-2xl bg-[#0b1429] border border-slate-800">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 text-indigo-400 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">
                      {lang === 'es' ? 'Sede & Cobertura' : 'Headquarters & Reach'}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {t('contact.info.location')}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 text-emerald-400 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block">
                      {lang === 'es' ? 'Horario de Operaciones' : 'Operations Hours'}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {t('contact.info.hours')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* NDA & Security badge */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                {lang === 'es' 
                  ? 'Garantizamos total confidencialidad bajo Acuerdo de No Divulgación (NDA) antes de cualquier análisis de datos preliminar.' 
                  : 'We guarantee strict confidentiality under bilateral Non-Disclosure Agreement (NDA) prior to any preliminary data sharing.'}
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0b1429]/90 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              
              {!isSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5">
                        {t('contact.form.name')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ej. Agustín Peralta"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5">
                        {t('contact.form.email')}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="agustin@empresa.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5">
                        {t('contact.form.company')}
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre de empresa"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5">
                      {t('contact.form.service')}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title[lang]}>
                          {s.levelBadge[lang]} - {s.title[lang]}
                        </option>
                      ))}
                      <option value="Auditoría / Otro">
                        {lang === 'es' ? 'Auditoría Global / Otro requerimiento' : 'Global Audit / Other requirement'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-1.5">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={lang === 'es' ? 'Describe tu infraestructura actual, volumen de datos o problema operativo que deseas resolver...' : 'Describe your current data setup, operational bottleneck, or target outcome...'}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-sm shadow-xl shadow-cyan-500/25 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{t('contact.form.submit')}</span>
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {lang === 'es' ? '¡Mensaje Enviado con Éxito!' : 'Message Successfully Transmitted!'}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                    {t('contact.form.success')}
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setForm({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: 'Data Analytics & Business Intelligence Moderno',
                        message: '',
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-slate-900 border border-slate-700 hover:border-cyan-400"
                  >
                    {lang === 'es' ? 'Enviar otra consulta' : 'Send another inquiry'}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
