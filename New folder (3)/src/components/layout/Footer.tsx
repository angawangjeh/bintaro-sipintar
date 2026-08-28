import React from 'react';
import { Shield, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { AppBranding } from '../../types';

interface FooterProps {
  branding: AppBranding;
}

export const Footer: React.FC<FooterProps> = ({ branding }) => {
  return (
    <footer
      id="sipintar-footer"
      className="w-full bg-[#060e1b] border-t border-[#D4AF37]/20 py-6 px-4 sm:px-8 text-xs text-gray-400 mt-12 no-print"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Address */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-xl neu-raised flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="font-extrabold text-[#F8F9FA] tracking-wide text-sm">
              <span className="text-[#D4AF37]">SIPINTAR</span> Kelurahan Bintaro
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {branding.alamatKantor} • Telp: {branding.telpKantor}
            </p>
          </div>
        </div>

        {/* Right: Copyright & Creator Signature */}
        <div className="text-center md:text-right space-y-1">
          <p className="font-bold text-[#F8F9FA] tracking-wider text-xs">
            © Dukcapil Bintaro Jawara | 2026
          </p>
          <p className="text-[11px] text-[#D4AF37] font-semibold flex items-center justify-center md:justify-end gap-1">
            <span>createdby.</span>
            <span className="px-2 py-0.5 rounded-md neu-inset text-[#F8F9FA] border border-[#D4AF37]/40 font-bold">
              Ang Awang Jeh
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
