import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  GitBranch, 
  Search, 
  Wrench, 
  Rocket, 
  Repeat, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const { t, lang } = useLanguage();

  const phases = [
    {
      num: t('method.phase1.num'),
      title: t('method.phase1.title'),
      desc: t('method.phase1.desc'),
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      time: lang === 'es' ? 'Semana 1 - 2' : 'Weeks 1 - 2',
      deliverable: lang === 'es' ? 'Informe de Viabilidad & Matriz de ROI' : 'Feasibility Report & ROI Matrix',
    },
    {
      num: t('method.phase2.num'),
      title: t('method.phase2.title'),
      desc: t('method.phase2.desc'),
      icon: <Wrench className="w-5 h-5 text-blue-400" />,
      time: lang === 'es' ? 'Semana 3 - 5' : 'Weeks 3 - 5',
      deliverable: lang === 'es' ? 'PoC Funcional con Datos Reales' : 'Functional PoC with Live Telemetry',
    },
    {
      num: t('method.phase3.num'),
      title: t('method.phase3.title'),
      desc: t('method.phase3.desc'),
      icon: <Rocket className="w-5 h-5 text-indigo-400" />,
      time: lang === 'es' ? 'Semana 6 - 10' : 'Weeks 6 - 10',
      deliverable: lang === 'es' ? 'Despliegue Productivo & APIs' : 'Production Deployment & Cloud APIs',
    },
    {
      num: t('method.phase4.num'),
      title: t('method.phase4.title'),
      desc: t('method.phase4.desc'),
      icon: <Repeat className="w-5 h-5 text-emerald-400" />,
      time: lang === 'es' ? 'Continuo' : 'Continuous',
      deliverable: lang === 'es' ? 'Telemetría MLOps & Retraining' : 'MLOps Telemetry & Retraining',
    },
  ];

  return (
    <section id="methodology" className="py-24 relative bg-[#070d1e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('method.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('method.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('method.header.desc')}
          </p>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {phases.map((phase, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0b1429]/90 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              {/* Connector line for desktop */}
              {idx < phases.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                  <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-cyan-400 transition-colors" />
                </div>
              )}

              <div>
                {/* Phase Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {phase.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 group-hover:scale-110 transition-transform">
                    {phase.icon}
                  </div>
                </div>

                <div className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  {phase.time}
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {phase.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {phase.desc}
                </p>
              </div>

              {/* Bottom deliverable tag */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 font-semibold mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  {lang === 'es' ? 'Entregable Clave:' : 'Key Deliverable:'}
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {phase.deliverable}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
