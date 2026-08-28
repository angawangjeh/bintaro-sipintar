import React from 'react';
import { ShieldCheck, Landmark } from 'lucide-react';
import { AppBranding } from '../../types';

interface LogoProps {
  branding?: AppBranding;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  branding,
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const appName = branding?.appName || 'SIPINTAR';
  const appSubname = branding?.appSubname || 'SISTEM INFORMASI PINDAH DATANG BINTARO';
  const logoUrl = branding?.appLogo;

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  return (
    <div id="sipintar-brand-logo" className={`flex items-center gap-3 ${className}`}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={appName}
          referrerPolicy="no-referrer"
          className={`${sizeClasses[size]} object-contain rounded-xl neu-raised-sm p-1 border border-[#D4AF37]/30`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-xl neu-raised flex items-center justify-center relative overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_12px_rgba(212,175,55,0.25)] flex-shrink-0`}
        >
          {/* Subtle gold gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-[#10233f] to-[#0A192F]" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            {size === 'xl' ? (
              <Landmark className="w-9 h-9 text-[#D4AF37]" />
            ) : size === 'lg' ? (
              <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full blur-[2px] opacity-70" />
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5">
          <h1 className="font-extrabold tracking-wider text-[#F8F9FA] leading-none font-['Plus_Jakarta_Sans'] flex items-center gap-1">
            <span className="text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
              {appName}
            </span>
            <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-semibold tracking-normal">
              BINTARO
            </span>
          </h1>
        </div>
        {showSubtitle && (
          <p className="text-[10px] text-gray-400 font-medium tracking-wide leading-tight mt-0.5 max-w-[200px] line-clamp-1">
            {appSubname}
          </p>
        )}
      </div>
    </div>
  );
};
