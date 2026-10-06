import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { ServiceItem } from '../../types';
import { 
  BarChart3, 
  Database, 
  Cpu, 
  Sparkles, 
  Server, 
  Factory, 
  ArrowRight, 
  CheckCircle, 
  Layers, 
  ChevronRight,
  Zap,
  X
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const { t, lang, services } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'foundational' | 'advanced' | 'industrial'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-cyan-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-emerald-400" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-amber-400" />;
      default:
        return <Layers className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredServices = services.filter((s) => {
    if (activeFilter === 'foundational') return s.level <= 2;
    if (activeFilter === 'advanced') return s.level >= 3 && s.level <= 4;
    if (activeFilter === 'industrial') return s.level >= 5;
    return true;
  });

  return (
    <section id="services" className="py-24 relative bg-[#070d1e] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('services.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('services.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('services.header.desc')}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.all')}
          </button>
          <button
            onClick={() => setActiveFilter('foundational')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'foundational'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.foundational')}
          </button>
          <button
            onClick={() => setActiveFilter('advanced')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'advanced'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.advanced')}
          </button>
          <button
            onClick={() => setActiveFilter('industrial')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === 'industrial'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t('services.filter.industrial')}
          </button>
        </div>

        {/* Services Progression Grid (ordered Level 1 to 6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group relative rounded-2xl bg-[#0b1429]/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-7 backdrop-blur-xl ${
                service.featured
                  ? 'border-cyan-500/50 shadow-xl shadow-cyan-950/40 hover:border-cyan-400'
                  : 'border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/20'
              }`}
            >
              {/* Top Level indicator badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                    {service.levelBadge[lang]}
                  </span>
                </div>
                {service.featured && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    {lang === 'es' ? 'Alta Demanda' : 'High Demand'}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title[lang]}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-4 italic">
                  "{service.subtitle[lang]}"
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
                  {service.description[lang]}
                </p>

                {/* Key Deliverables bullets */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {t('services.card.deliverables')}
                  </div>
                  {service.deliverables[lang].slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Tech stack badges */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.techStack.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                      +{service.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                  >
                    <span>{lang === 'es' ? 'Ver detalles' : 'View details'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.title[lang])}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                  >
                    {lang === 'es' ? 'Cotizar' : 'Inquire'}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep-Dive Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#091124] border border-cyan-500/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                {getIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {selectedService.levelBadge[lang]}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedService.title[lang]}
                </h3>
              </div>
            </div>

            <p className="text-sm text-cyan-300/90 font-medium mb-4 italic">
              {selectedService.subtitle[lang]}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedService.description[lang]}
            </p>

            {/* Deliverables */}
            <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                {t('services.card.deliverables')}
              </h4>
              <ul className="space-y-2">
                {selectedService.deliverables[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="text-cyan-400 font-mono font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Impact Box */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-slate-900 border border-cyan-500/30">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                {t('services.card.impact')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 font-sans">
                {selectedService.businessImpact[lang]}
              </p>
            </div>

            {/* Full Tech Stack */}
            <div className="mb-8">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                {lang === 'es' ? 'Tecnologías y Frameworks Aplicados:' : 'Applied Technologies & Frameworks:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA in Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                {lang === 'es' ? 'Cerrar' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const serviceName = selectedService.title[lang];
                  setSelectedService(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-xs sm:text-sm shadow-lg shadow-cyan-500/20"
              >
                <span>{lang === 'es' ? 'Agendar consultoría para este servicio' : 'Book consultation for this service'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
