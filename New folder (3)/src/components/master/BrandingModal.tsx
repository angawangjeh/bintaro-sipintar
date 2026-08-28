import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Upload, 
  Sliders, 
  Building2, 
  Shield, 
  FileText, 
  Check, 
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';
import { AppBranding } from '../../types';

interface BrandingModalProps {
  branding: AppBranding;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: AppBranding) => void;
}

export const BrandingModal: React.FC<BrandingModalProps> = ({
  branding,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<AppBranding>({ ...branding });
  const [logoPreview, setLogoPreview] = useState<string>(branding.logoUrl);

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setLogoPreview(base64);
        setFormData({ ...formData, logoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefault = () => {
    const defaultData: AppBranding = {
      appName: 'SIPINTAR',
      appSubname: 'Sistem Informasi Pindah Datang Bintaro',
      kelurahan: 'Bintaro',
      kecamatan: 'Pesanggrahan',
      kota: 'Kota Administrasi Jakarta Selatan',
      provinsi: 'DKI Jakarta',
      alamatKantor: 'Jl. Bintaro Permai No. 1, RT 01 / RW 01, Bintaro, Pesanggrahan, Jakarta Selatan 12330',
      telepon: '(021) 7350478',
      email: 'kelurahan.bintaro@jakarta.go.id',
      website: 'bintaro.jakarta.go.id',
      namaLurah: 'Drs. H. M. Ridwan, M.Si',
      nipLurah: '19760812 199803 1 004',
      pangkatLurah: 'Pembina Tingkat I (IV/b)',
      logoUrl: '',
    };
    setFormData(defaultData);
    setLogoPreview('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/40 shadow-2xl p-6 space-y-5 my-6 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8F9FA]">
                Ubah Identitas & Logo SIPINTAR
              </h3>
              <p className="text-xs text-gray-400">
                Fitur Khusus Administrator: Mengubah Nama Aplikasi, Logo, dan Pejabat Lurah
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl neu-button text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 space-y-5 text-xs pr-1 scrollbar-thin">
          {/* Logo Customizer */}
          <div className="p-4 rounded-2xl neu-inset border border-[#D4AF37]/20 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-2xl neu-raised p-2 flex items-center justify-center bg-[#071322] border border-white/10 flex-shrink-0">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="SIPINTAR Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <Shield className="w-10 h-10 text-[#D4AF37]" />
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <h4 className="font-bold text-[#F8F9FA]">Logo Aplikasi SIPINTAR</h4>
              <p className="text-gray-400 text-[11px]">
                Unggah lambang instansi resmi Jaya Raya / Kelurahan Bintaro (PNG Transparan / JPG).
              </p>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="logo-file-input"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="logo-file-input"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl neu-button text-[#D4AF37] font-bold cursor-pointer hover:scale-105 transition-transform text-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Unggah Logo Baru</span>
                </label>
              </div>
            </div>
          </div>

          {/* App Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">NAMA APLIKASI (SINGKATAN)</label>
              <input
                type="text"
                value={formData.appName}
                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-bold font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">KEPANJANGAN NAMA SISTEM</label>
              <input
                type="text"
                value={formData.appSubname}
                onChange={(e) => setFormData({ ...formData, appSubname: e.target.value })}
                className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>
          </div>

          {/* Wilayah Administrasi */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">KELURAHAN</label>
              <input
                type="text"
                value={formData.kelurahan}
                onChange={(e) => setFormData({ ...formData, kelurahan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-bold"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">KECAMATAN</label>
              <input
                type="text"
                value={formData.kecamatan}
                onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-bold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-300 font-semibold mb-1">KOTA ADMINISTRASI</label>
              <input
                type="text"
                value={formData.kota}
                onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-bold"
              />
            </div>
          </div>

          {/* Alamat Kantor Kelurahan */}
          <div>
            <label className="block text-gray-300 font-semibold mb-1">ALAMAT KANTOR KELURAHAN (KOP SURAT)</label>
            <input
              type="text"
              value={formData.alamatKantor}
              onChange={(e) => setFormData({ ...formData, alamatKantor: e.target.value })}
              className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
              required
            />
          </div>

          {/* Pejabat Penandatangan Lurah */}
          <div className="p-4 rounded-2xl neu-inset border border-amber-500/20 space-y-3">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Pejabat Penandatangan Surat Keterangan (Lurah)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="block text-gray-300 font-semibold mb-1">NAMA LURAH & GELAR</label>
                <input
                  type="text"
                  value={formData.namaLurah}
                  onChange={(e) => setFormData({ ...formData, namaLurah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">NIP LURAH</label>
                <input
                  type="text"
                  value={formData.nipLurah}
                  onChange={(e) => setFormData({ ...formData, nipLurah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">PANGKAT / GOLONGAN</label>
                <input
                  type="text"
                  value={formData.pangkatLurah}
                  onChange={(e) => setFormData({ ...formData, pangkatLurah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-2 rounded-xl neu-button text-gray-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl neu-button text-gray-300 font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl neu-button-gold font-bold flex items-center gap-1.5 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Branding</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
