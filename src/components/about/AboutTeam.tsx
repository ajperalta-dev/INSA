import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Users, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Factory, 
  ShieldCheck, 
  Workflow, 
  CheckCircle2
} from 'lucide-react';

export const AboutTeam: React.FC = () => {
  const { t, lang, team } = useLanguage();

  const pillars = [
    {
      icon: <Factory className="w-6 h-6 text-cyan-400" />,
      title: t('about.pillar1.title'),
      desc: t('about.pillar1.desc'),
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
      title: t('about.pillar2.title'),
      desc: t('about.pillar2.desc'),
    },
    {
      icon: <Workflow className="w-6 h-6 text-indigo-400" />,
      title: t('about.pillar3.title'),
      desc: t('about.pillar3.desc'),
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: t('about.pillar4.title'),
      desc: t('about.pillar4.desc'),
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-[#030712] overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('about.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('about.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('about.header.desc')}
          </p>
        </div>

        {/* Narrative & Engineering DNA Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c1630] via-[#091226] to-[#040816] border border-cyan-500/30 p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t('about.story.title')}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                {t('about.story.p1')}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t('about.story.p2')}
              </p>
            </div>

            {/* Quick credentials stat box */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mb-1">100%</div>
                <div className="text-xs text-slate-400 font-medium">
                  {lang === 'es' ? 'Ingenieros & Máster en IA' : 'Engineers & AI M.Sc.'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono mb-1">Top-Tier</div>
                <div className="text-xs text-slate-400 font-medium">
                  {lang === 'es' ? 'Sectores Críticos' : 'Critical Sectors'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono mb-1">Full-Cycle</div>
                <div className="text-xs text-slate-400 font-medium">
                  {lang === 'es' ? 'De Datos a MLOps' : 'Data to MLOps'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mb-1">Global</div>
                <div className="text-xs text-slate-400 font-medium">
                  {lang === 'es' ? 'Proyectos España / Int.' : 'Spain & Global Remote'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#091122]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 rounded-xl bg-slate-900 w-fit mb-4 border border-slate-800">
                {pillar.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Members Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-[#0b1429]/90 border border-slate-800 hover:border-cyan-500/40 p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Header: Photo + Name */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#030712] border border-cyan-400 text-cyan-400">
                      <GraduationCap className="w-3 h-3" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-400">
                      {member.role[lang]}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {member.specialty[lang]}
                    </p>
                  </div>
                </div>

                {/* Academic Degrees & Accreditations */}
                <div className="mb-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {lang === 'es' ? 'Formación Académica & Máster:' : 'Academic & Master Credentials:'}
                  </div>
                  <ul className="space-y-1.5">
                    {member.degrees[lang].map((deg, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{deg}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Professional Highlights in Multinationals */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    {lang === 'es' ? 'Trayectoria & Sectores Críticos:' : 'Track Record in Critical Sectors:'}
                  </div>
                  <ul className="space-y-1.5">
                    {member.highlights[lang].map((h, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-cyan-500 font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>ALPHA Senior Staff</span>
                <span className="text-cyan-400 font-semibold">
                  +{member.experienceYears} {lang === 'es' ? 'años exp.' : 'yrs exp.'}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
