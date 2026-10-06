import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const WhatsAppWidget: React.FC = () => {
  const { t, lang } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = '34641012046';
  const defaultText = encodeURIComponent(
    lang === 'es'
      ? 'Hola ALPHA Digital Transformation, me gustaría solicitar información sobre sus servicios de Data e IA.'
      : 'Hello ALPHA Digital Transformation, I would like to request information about your Data and AI consulting services.'
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultText}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group flex items-center justify-center w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulsing beacon */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>

        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.053-1.636-.296-.94-.328-1.579-.909-2.001-1.393-.538-.617-.981-1.479-.981-2.385 0-.962.483-1.428.675-1.616.143-.141.312-.178.419-.178.106 0 .213.003.306.01.1.006.234-.038.366.279.136.327.464 1.134.505 1.218.041.083.069.181.014.29-.055.109-.083.178-.164.274-.083.096-.174.214-.249.288-.083.082-.17.172-.073.339.098.167.433.714.93 1.155.64.568 1.18.745 1.348.828.167.083.266.073.364-.04.099-.113.424-.492.538-.661.113-.169.227-.141.381-.084.155.056.983.463 1.152.548.169.084.282.127.324.197.042.07.042.408-.102.813z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.661 1.435 5.178L2 22l4.981-1.309A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.16 8.16 0 0 1-4.321-1.229l-.31-.184-2.96.777.79-2.887-.202-.321A8.17 8.17 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2s8.2 3.679 8.2 8.2-3.679 8.2-8.2 8.2z" />
        </svg>
      </a>

      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-emerald-500/40 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-left-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{t('whatsapp.tooltip')}</span>
        </div>
      )}
    </div>
  );
};
