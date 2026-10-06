import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from './Logo';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ChevronRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030611] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'es' ? 'Cumplimiento Estricto GDPR & NDA' : 'Strict GDPR & NDA Compliance'}</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              {lang === 'es' ? 'Navegación' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  {t('nav.cases')}
                </a>
              </li>
              <li>
                <a href="#methodology" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  {t('nav.methodology')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Specialized Disciplines */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              {lang === 'es' ? 'Especialidades' : 'Specialties'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Business Intelligence & Power BI</li>
              <li>Data Engineering & Lakehouses</li>
              <li>Machine Learning & Forecasting</li>
              <li>Generative AI & Enterprise RAG</li>
              <li>MLOps & Kubernetes Scaling</li>
              <li>Industria 4.0 & IoT Industrial</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-4">
              {lang === 'es' ? 'Contacto Directo' : 'Direct Contact'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="mailto:alpha.digital.ia@gmail.com"
                className="hover:text-cyan-400 transition-colors flex items-center gap-2 font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">alpha.digital.ia@gmail.com</span>
              </a>
              <a
                href="tel:+34641012046"
                className="hover:text-cyan-400 transition-colors flex items-center gap-2 font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>+34 641 012 046</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Madrid, España · Global</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500">
            © {new Date().getFullYear()} ALPHA Digital Transformation. {t('footer.rights')}
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer">
              {t('footer.privacy')}
            </span>
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer">
              {t('footer.legal')}
            </span>
            <span className="text-slate-500 hover:text-slate-400 cursor-pointer">
              {t('footer.cookies')}
            </span>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-all ml-2"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
