import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true 
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  const subSizes = {
    sm: 'text-[6px]',
    md: 'text-[8px]',
    lg: 'text-[10px]',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Minimalist Alpha Symbol (v3 style) */}
      <div className={`relative flex items-center justify-center ${iconDimensions} shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(0,207,255,0.4)]"
        >
          {/* Continuous sleek single-stroke alpha (α) */}
          <path 
            d="M85 25 C65 15, 30 35, 25 60 C20 85, 45 90, 60 70 C75 50, 80 30, 80 30 C80 30, 85 85, 95 85" 
            stroke="#00CFFF" 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none pt-1">
          <span className={`${titleSizes} font-bold tracking-[0.2em] text-slate-950 dark:text-white font-sans uppercase`}>
            ALPHA
          </span>
          <span className={`${subSizes} uppercase font-mono tracking-[0.25em] text-cyan-500 font-semibold mt-1`}>
            Digital Transformation
          </span>
        </div>
      )}
    </div>
  );
};
