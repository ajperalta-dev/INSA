import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { NeuralBackground } from './NeuralBackground';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Cpu, 
  Zap,
  ShieldCheck,
  Sparkles,
  Database,
  LineChart,
  Cloud,
  Network
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const { t, lang } = useLanguage();
  const { isDark } = useTheme();

  // Tech stack and sectors for the marquee
  const tickerItems = [
    { icon: <Database className="w-4 h-4 text-cyan-500" />, text: "Data Engineering" },
    { icon: <Cpu className="w-4 h-4 text-blue-500" />, text: "Machine Learning" },
    { icon: <Network className="w-4 h-4 text-indigo-500" />, text: "MLOps" },
    { icon: <Cloud className="w-4 h-4 text-sky-500" />, text: "Cloud Architecture" },
    { icon: <LineChart className="w-4 h-4 text-emerald-500" />, text: "Business Intelligence" },
    { icon: <Sparkles className="w-4 h-4 text-amber-500" />, text: "Generative AI" },
    { icon: <CheckCircle2 className="w-4 h-4 text-teal-500" />, text: "Industria 4.0" },
    { icon: <ShieldCheck className="w-4 h-4 text-rose-500" />, text: "Data Governance" }
  ];

  // Double the array for seamless infinite scrolling
  const duplicatedTickerItems = [...tickerItems, ...tickerItems];

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-center pt-32 pb-0 overflow-hidden bg-grid-pattern transition-colors duration-500">
      {/* Background canvas elements */}
      <NeuralBackground />
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[140px] pointer-events-none -z-10 transition-colors duration-700 ${isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'}`} />
      <div className={`absolute bottom-1/4 right-10 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none -z-10 transition-colors duration-700 ${isDark ? 'bg-blue-600/15' : 'bg-blue-500/5'}`} />

      <div className="flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top pill badge */}
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-mono font-semibold tracking-wider shadow-lg mb-8 backdrop-blur-md transition-all ${
              isDark 
                ? 'bg-slate-900/90 border-cyan-500/40 text-cyan-300 shadow-cyan-950/40' 
                : 'bg-white/90 border-cyan-500/30 text-cyan-700 shadow-cyan-100/50'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>{t('hero.badge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t('hero.title.pre')}{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 bg-clip-text text-transparent">
                  {t('hero.title.highlight')}
                </span>
                <div className={`absolute -bottom-1 left-0 right-0 h-1 rounded-full blur-xs ${isDark ? 'bg-gradient-to-r from-cyan-400/80 to-blue-500/40' : 'bg-gradient-to-r from-cyan-400/40 to-blue-500/20'}`}></div>
              </span>{' '}
              <br className="hidden lg:block"/>
              {t('hero.title.post')}
            </h1>

            {/* Slogan & Subtitle */}
            <p className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed mb-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {t('hero.subtitle')}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-95 group text-sm sm:text-base"
              >
                <Calendar className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                <span>{t('hero.cta.secondary')}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base backdrop-blur-md border ${
                  isDark 
                    ? 'text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border-slate-700/80 hover:border-cyan-500/50' 
                    : 'text-slate-700 bg-white/80 hover:bg-slate-50 border-slate-300 hover:border-cyan-500/50 shadow-sm'
                }`}
              >
                <span>{t('hero.cta.primary')}</span>
              </a>
            </div>

            {/* Guarantee tags */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {lang === 'es' ? 'Ingeniería con rigor industrial' : 'Industrial Engineering Rigor'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {lang === 'es' ? 'Senior Data Scientists (MSc)' : 'Senior Data Scientists (MSc)'}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                {lang === 'es' ? '100% Orientado a ROI' : '100% ROI Focused'}
              </span>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative mx-auto group">
              <div className={`absolute -inset-2 rounded-3xl blur-2xl transition duration-700 opacity-60 group-hover:opacity-100 ${
                isDark 
                  ? 'bg-gradient-to-r from-cyan-500/40 via-blue-600/30 to-indigo-600/40' 
                  : 'bg-gradient-to-r from-cyan-400/30 via-blue-400/20 to-sky-400/30'
              }`}></div>
              
              <div className={`relative rounded-3xl border shadow-2xl backdrop-blur-2xl p-3 overflow-hidden transition-colors ${
                isDark ? 'bg-[#081022]/90 border-cyan-500/30' : 'bg-white/90 border-slate-200'
              }`}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src="/hero-ai.jpg"
                    alt="ALPHA AI Architecture"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className={`absolute inset-0 opacity-60 pointer-events-none ${
                    isDark ? 'bg-gradient-to-t from-[#030712] to-transparent' : 'bg-gradient-to-t from-white to-transparent'
                  }`}></div>

                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/85 border border-slate-700 dark:border-cyan-500/30 backdrop-blur-md flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-bold leading-tight">
                          {lang === 'es' ? 'Modelos & GenAI' : 'Models & GenAI'}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {lang === 'es' ? 'Inferencia en Tiempo Real' : 'Real-time Inference'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" /> 99.2%
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 block uppercase">SLA Precision</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Infinite Marquee Ticker (Replaces old static metrics) */}
      <div className={`w-full mt-16 pt-6 pb-6 border-t overflow-hidden ${
        isDark ? 'border-slate-800/80 bg-slate-900/30' : 'border-slate-200 bg-slate-50/50'
      }`}>
        <div className="flex whitespace-nowrap animate-marquee w-[200%] items-center gap-8 px-4">
          {duplicatedTickerItems.map((item, index) => (
            <div key={index} className={`flex items-center gap-2 text-sm font-mono font-medium px-6 py-2 rounded-full border backdrop-blur-sm transition-colors ${
              isDark 
                ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-white' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-500/40 hover:text-slate-900 hover:shadow-sm'
            }`}>
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};
