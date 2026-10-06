import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Award, 
  ArrowUpRight, 
  Building2
} from 'lucide-react';

interface CaseStudiesSectionProps {
  onOpenBooking: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpenBooking }) => {
  const { t, lang, caseStudies } = useLanguage();

  return (
    <section id="cases" className="py-24 relative bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('cases.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('cases.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('cases.header.desc')}
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-[#091124]/90 border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/20 group"
            >
              <div>
                {/* Industry Header */}
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{study.clientIndustry[lang]}</span>
                </div>

                {/* Challenge */}
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    {lang === 'es' ? 'El Desafío:' : 'The Challenge:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {study.challenge[lang]}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    {lang === 'es' ? 'La Solución de ALPHA:' : 'ALPHA Engineering Solution:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {study.solution[lang]}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 mb-6">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-base sm:text-lg font-black font-mono text-cyan-400">
                        {m.val}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                        {m.label[lang]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies used */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {study.techUsed.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Global call to action bar */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-sm shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <span>{lang === 'es' ? 'Explorar cómo replicar estos resultados en tu empresa' : 'Discover how to replicate these results in your enterprise'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
