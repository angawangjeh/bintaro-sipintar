import React, { useRef } from 'react';
import { 
  Printer, 
  Download, 
  X, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  QrCode, 
  MapPin, 
  Calendar,
  Building2,
  Users
} from 'lucide-react';
import { DataPindah, DataDatang, AppBranding } from '../../types';

interface SuratKeteranganModalProps {
  type: 'PINDAH' | 'DATANG';
  dataPindah?: DataPindah | null;
  dataDatang?: DataDatang | null;
  branding: AppBranding;
  onClose: () => void;
}

export const SuratKeteranganModal: React.FC<SuratKeteranganModalProps> = ({
  type,
  dataPindah,
  dataDatang,
  branding,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  const isPindah = type === 'PINDAH' && dataPindah;
  const isDatang = type === 'DATANG' && dataDatang;

  if (!isPindah && !isDatang) return null;

  const noSurat = isPindah ? dataPindah.noSurat : dataDatang?.noSurat || '471.2/---/SK/BTR/2026';
  const tanggal = isPindah ? dataPindah.tanggalPindah : dataDatang?.tanggalDatang || new Date().toISOString().split('T')[0];
  const namaUtama = isPindah ? dataPindah.namaKepalaKeluarga : dataDatang?.namaPemohon || '';
  const nik = isPindah ? dataPindah.nik : dataDatang?.nik || '';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="surat-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/40 shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Modal Action Header (Non-Printable) */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#F8F9FA]">
                Pratinjau Cetak Surat Resmi (KOP SURAT)
              </h3>
              <p className="text-xs text-gray-400">
                {isPindah ? 'Surat Keterangan Pindah WNI (F-1.08)' : 'Surat Keterangan Datang WNI (F-1.09)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-print-surat"
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl neu-button-gold text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>CETAK SURAT</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl neu-button text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Paper Sheet Preview */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 bg-slate-900/60 scrollbar-thin">
          {/* A4 Paper Document Canvas (White background for official print) */}
          <div
            ref={printRef}
            className="print-page bg-white text-black p-8 sm:p-12 rounded-xl shadow-2xl max-w-3xl mx-auto font-serif text-[13px] leading-relaxed border border-gray-300"
          >
            {/* 1. OFFICIAL KOP SURAT */}
            <div className="border-b-[3px] border-black pb-3 text-center relative">
              {/* Logo DKI / Garuda Placeholder */}
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-16 h-16 border border-gray-400 rounded-lg flex items-center justify-center p-1">
                  <Building2 className="w-10 h-10 text-gray-800" />
                </div>
                <div className="text-center font-serif">
                  <h4 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black">
                    PEMERINTAH PROVINSI DAERAH KHUSUS IBUKOTA JAKARTA
                  </h4>
                  <h5 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black">
                    KOTA ADMINISTRASI JAKARTA SELATAN
                  </h5>
                  <h5 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-black">
                    KECAMATAN PESANGGRAHAN
                  </h5>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-wide uppercase text-black">
                    KELURAHAN BINTARO
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-gray-700 italic font-sans mt-0.5">
                    {branding.alamatKantor} | Telp: {branding.telpKantor} | Email: {branding.emailKantor}
                  </p>
                </div>
                <div className="w-16 h-16 border border-gray-400 rounded-lg flex flex-col items-center justify-center p-1 text-[9px] font-sans font-bold bg-amber-50">
                  <span className="text-amber-700 font-extrabold">SIPINTAR</span>
                  <span className="text-[8px] text-gray-600">DUKCAPIL</span>
                </div>
              </div>

              {/* Double Line Divider */}
              <div className="border-b border-black mt-1" />
            </div>

            {/* Title of the Letter */}
            <div className="text-center my-6">
              <h3 className="text-base sm:text-lg font-bold underline uppercase tracking-wider text-black">
                {isPindah ? 'SURAT KETERANGAN PINDAH WNI' : 'SURAT KETERANGAN DATANG WNI'}
              </h3>
              <p className="text-xs font-semibold text-gray-800 font-mono mt-1">
                Nomor: {noSurat}
              </p>
            </div>

            {/* Opening Paragraph */}
            <p className="mb-4 text-justify font-serif text-xs sm:text-sm">
              Yang bertanda tangan di bawah ini Lurah Bintaro, Kecamatan Pesanggrahan, Kota Administrasi Jakarta Selatan, menerangkan dengan sebenarnya bahwa:
            </p>

            {/* Biodata Section */}
            <div className="space-y-2 mb-6 font-serif text-xs sm:text-sm pl-4">
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-4 font-semibold">1. Nama Lengkap</span>
                <span className="col-span-8 font-bold uppercase">: {namaUtama}</span>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-4 font-semibold">2. NIK Pemohon / KK</span>
                <span className="col-span-8 font-mono">: {nik}</span>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-4 font-semibold">3. Jumlah Keluarga Pindah/Datang</span>
                <span className="col-span-8">: {isPindah ? dataPindah.jumlahAnggota : dataDatang?.jumlahAnggota} Orang</span>
              </div>
              <div className="grid grid-cols-12 gap-2">
                <span className="col-span-4 font-semibold">4. Alasan Perpindahan</span>
                <span className="col-span-8">: {isPindah ? dataPindah.alasanPindah : dataDatang?.alasanDatang}</span>
              </div>
            </div>

            {/* Address Details (Origin & Destination) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-gray-50 border border-gray-300 mb-6 text-xs">
              <div className="border-r sm:pr-4 border-gray-300">
                <p className="font-bold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">
                  DAERAH / ALAMAT ASAL
                </p>
                <p><strong>Alamat:</strong> {isPindah ? dataPindah.alamatAsal : dataDatang?.alamatAsal}</p>
                <p><strong>RT / RW:</strong> {isPindah ? `RT ${dataPindah.rtAsal} / RW ${dataPindah.rwAsal}` : '-'}</p>
                <p><strong>Kelurahan:</strong> {isPindah ? dataPindah.kelurahanAsal : '-'}</p>
                <p><strong>Kecamatan:</strong> {isPindah ? dataPindah.kecamatanAsal : '-'}</p>
                <p><strong>Kab/Kota:</strong> {isPindah ? 'Jakarta Selatan' : dataDatang?.kabKotaAsal}</p>
                <p><strong>Provinsi:</strong> {isPindah ? 'DKI Jakarta' : dataDatang?.provinsiAsal}</p>
              </div>

              <div>
                <p className="font-bold uppercase text-gray-800 border-b border-gray-300 pb-1 mb-2">
                  DAERAH / ALAMAT TUJUAN
                </p>
                <p><strong>Alamat:</strong> {isPindah ? dataPindah.alamatTujuan : dataDatang?.alamatTujuan}</p>
                <p><strong>RT / RW:</strong> {isPindah ? `RT ${dataPindah.rtTujuan} / RW ${dataPindah.rwTujuan}` : `RT ${dataDatang?.rtTujuan} / RW ${dataDatang?.rwTujuan}`}</p>
                <p><strong>Kelurahan:</strong> {isPindah ? '-' : dataDatang?.kelurahanTujuan}</p>
                <p><strong>Kecamatan:</strong> {isPindah ? '-' : dataDatang?.kecamatanTujuan}</p>
                <p><strong>Kab/Kota:</strong> {isPindah ? dataPindah.kabKotaTujuan : 'Jakarta Selatan'}</p>
                <p><strong>Provinsi:</strong> {isPindah ? dataPindah.provinsiTujuan : 'DKI Jakarta'}</p>
              </div>
            </div>

            {/* Family Members Table */}
            {((isPindah && dataPindah.anggotaList && dataPindah.anggotaList.length > 0) ||
              (isDatang && dataDatang?.anggotaList && dataDatang.anggotaList.length > 0)) && (
              <div className="mb-6">
                <p className="font-bold text-xs mb-2">DAFTAR ANGGOTA KELUARGA YANG IKUT:</p>
                <table className="w-full text-left border-collapse border border-gray-400 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 px-2 py-1 text-center w-8">No</th>
                      <th className="border border-gray-400 px-2 py-1">Nama Lengkap</th>
                      <th className="border border-gray-400 px-2 py-1">NIK</th>
                      <th className="border border-gray-400 px-2 py-1">Status Hubungan (SHDK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isPindah ? dataPindah.anggotaList! : dataDatang?.anggotaList || []).map((ang, idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-400 px-2 py-1 text-center">{idx + 1}</td>
                        <td className="border border-gray-400 px-2 py-1 font-semibold">{ang.nama}</td>
                        <td className="border border-gray-400 px-2 py-1 font-mono">{ang.nik}</td>
                        <td className="border border-gray-400 px-2 py-1">{ang.shdk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Closing text */}
            <p className="mb-8 text-justify text-xs sm:text-sm">
              Surat keterangan ini diberikan kepada yang bersangkutan untuk dipergunakan sebagaimana mestinya dan berlaku selama 30 (tiga puluh) hari sejak tanggal diterbitkan.
            </p>

            {/* Signatures & QR Validation */}
            <div className="grid grid-cols-2 gap-4 items-end pt-4 font-sans text-xs">
              {/* Left QR Code Authenticator */}
              <div className="flex flex-col items-center p-3 rounded border border-dashed border-gray-400 bg-gray-50 text-center max-w-[200px]">
                <QrCode className="w-16 h-16 text-gray-900" />
                <p className="text-[9px] font-bold text-gray-700 mt-1">SIPINTAR DIGITAL VALID</p>
                <p className="text-[8px] font-mono text-gray-500">{noSurat}</p>
                <span className="text-[8px] text-emerald-700 font-semibold mt-0.5">
                  ✓ Terverifikasi SIAK Dukcapil
                </span>
              </div>

              {/* Right Signature Lurah */}
              <div className="text-center">
                <p className="text-gray-800">
                  Jakarta, {new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="font-bold text-gray-900 uppercase">
                  LURAH BINTARO
                </p>
                <div className="h-20 flex items-center justify-center relative">
                  <div className="w-24 h-16 rounded-full border-2 border-red-700/60 flex items-center justify-center rotate-[-12deg] text-red-700 font-bold text-[10px] tracking-widest uppercase">
                    STEMPEL RESMI
                  </div>
                </div>
                <p className="font-bold text-gray-900 underline text-xs">
                  {branding.namaLurah}
                </p>
                <p className="text-[10px] text-gray-600 font-mono">
                  NIP. {branding.nipLurah}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between no-print">
          <p className="text-xs text-gray-400">
            Format resmi standar blanko Dukcapil DKI Jakarta.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl neu-button text-xs font-semibold text-gray-300 hover:text-white"
          >
            Tutup Pratinjau
          </button>
        </div>
      </div>
    </div>
  );
};
