import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from './Logo';
import { 
  Calendar, 
  Menu, 
  X, 
  Globe, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { lang, setLang, t } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t('nav.services') },
    { href: '#about', label: t('nav.about') },
    { href: '#cases', label: t('nav.cases') },
    { href: '#methodology', label: t('nav.methodology') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  const scrolledClass = isScrolled
    ? isDark
      ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/20 py-3'
      : 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-lg py-3'
    : 'bg-transparent py-5';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolledClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="group focus:outline-none">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500 hover:after:w-full after:transition-all after:duration-300 ${
                  isDark 
                    ? 'text-slate-300 hover:text-cyan-300' 
                    : 'text-slate-600 hover:text-cyan-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Language Switcher & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`p-2 rounded-lg border transition-all ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700/80 text-amber-400 hover:border-amber-400/60 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-cyan-400/60 hover:bg-white'
              }`}
              title={isDark ? (lang === 'es' ? 'Modo día' : 'Day mode') : (lang === 'es' ? 'Modo noche' : 'Night mode')}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all shadow-inner ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700/80 hover:border-cyan-400/60 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 hover:border-cyan-400/60 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              <span>{lang.toUpperCase()}</span>
              <span className="text-slate-400">/</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-400'}>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* Book Consultation Button */}
            <button
              onClick={onOpenBooking}
              className="relative group overflow-hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>{t('nav.bookCta')}</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent transform transition-transform"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg border text-sm ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-amber-400'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className={`p-2 rounded-lg border text-xs font-mono font-bold ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-cyan-400'
                  : 'bg-slate-100 border-slate-200 text-cyan-600'
              }`}
            >
              {lang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border focus:outline-none ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-cyan-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-cyan-600'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`lg:hidden mt-3 px-4 pt-2 pb-6 border-b shadow-2xl animate-in slide-in-from-top-4 duration-200 ${
          isDark
            ? 'bg-[#030712]/98 backdrop-blur-2xl border-cyan-500/30'
            : 'bg-white/98 backdrop-blur-2xl border-slate-200'
        }`}>
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? 'text-slate-200 hover:bg-slate-800/60 hover:text-cyan-400'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-cyan-600'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-md shadow-cyan-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>{t('nav.bookCta')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
