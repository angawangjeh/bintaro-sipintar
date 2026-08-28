import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  UserPlus, 
  Plus, 
  Trash2, 
  Building2, 
  MapPin, 
  Calendar, 
  User, 
  FileText 
} from 'lucide-react';
import { DataDatang } from '../../types';

interface DatangFormModalProps {
  initialData?: DataDatang | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<DataDatang>) => void;
}

export const DatangFormModal: React.FC<DatangFormModalProps> = ({
  initialData,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<DataDatang>>({
    noSurat: `471.2/${Math.floor(100 + Math.random() * 900)}/SKD-WNI/BTR/2026`,
    tanggalDatang: new Date().toISOString().split('T')[0],
    namaPemohon: '',
    nik: '',
    alamatAsal: '',
    kabKotaAsal: '',
    provinsiAsal: '',
    alamatTujuan: '',
    rtTujuan: '001',
    rwTujuan: '01',
    kelurahanTujuan: 'BINTARO',
    kecamatanTujuan: 'PESANGGRAHAN',
    alasanDatang: 'Pekerjaan / Domisili Baru di Bintaro',
    jumlahAnggota: 1,
    status: 'Disetujui',
    keterangan: '',
    anggotaList: [{ nama: '', nik: '', shdk: 'Kepala Keluarga' }],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        noSurat: `471.2/${Math.floor(100 + Math.random() * 900)}/SKD-WNI/BTR/2026`,
        tanggalDatang: new Date().toISOString().split('T')[0],
        namaPemohon: '',
        nik: '',
        alamatAsal: '',
        kabKotaAsal: '',
        provinsiAsal: '',
        alamatTujuan: '',
        rtTujuan: '001',
        rwTujuan: '01',
        kelurahanTujuan: 'BINTARO',
        kecamatanTujuan: 'PESANGGRAHAN',
        alasanDatang: 'Pekerjaan / Domisili Baru di Bintaro',
        jumlahAnggota: 1,
        status: 'Disetujui',
        keterangan: '',
        anggotaList: [{ nama: '', nik: '', shdk: 'Kepala Keluarga' }],
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddAnggota = () => {
    const list = formData.anggotaList || [];
    setFormData({
      ...formData,
      anggotaList: [...list, { nama: '', nik: '', shdk: 'Anggota' }],
      jumlahAnggota: (formData.jumlahAnggota || 1) + 1,
    });
  };

  const handleRemoveAnggota = (index: number) => {
    const list = (formData.anggotaList || []).filter((_, i) => i !== index);
    setFormData({
      ...formData,
      anggotaList: list,
      jumlahAnggota: Math.max(1, list.length),
    });
  };

  const handleAnggotaChange = (index: number, field: string, value: string) => {
    const list = [...(formData.anggotaList || [])];
    list[index] = { ...list[index], [field]: value };
    setFormData({ ...formData, anggotaList: list });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-emerald-400 border border-emerald-500/30">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#F8F9FA]">
                {initialData ? 'Ubah Data Datang (SKD)' : 'Input Master Data Datang (SKD)'}
              </h3>
              <p className="text-xs text-gray-400">
                Formulir Kedatangan WNI Menuju Kelurahan Bintaro
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl neu-button text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin">
          {/* Nomor Surat & Tanggal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                NOMOR SURAT REGISTRASI KEDATANGAN
              </label>
              <input
                type="text"
                value={formData.noSurat || ''}
                onChange={(e) => setFormData({ ...formData, noSurat: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                TANGGAL DATANG
              </label>
              <input
                type="date"
                value={formData.tanggalDatang || ''}
                onChange={(e) => setFormData({ ...formData, tanggalDatang: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>
          </div>

          {/* Identitas Pemohon */}
          <div className="p-4 rounded-2xl neu-inset border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Identitas Pemohon Datang
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  NAMA PEMOHON
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dr. Raden Mas Bagus Wicaksono"
                  value={formData.namaPemohon || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const list = [...(formData.anggotaList || [])];
                    if (list[0]) list[0].nama = val;
                    setFormData({ ...formData, namaPemohon: val, anggotaList: list });
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  NIK (16 DIGIT)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="337402xxxxxxxxxx"
                  value={formData.nik || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const list = [...(formData.anggotaList || [])];
                    if (list[0]) list[0].nik = val;
                    setFormData({ ...formData, nik: val, anggotaList: list });
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Alamat Asal Pemohon */}
          <div className="p-4 rounded-2xl neu-inset border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Alamat Asal Pemohon (Luar Daerah/Kota)
            </h4>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ALAMAT ASAL
              </label>
              <input
                type="text"
                placeholder="Contoh: Jl. Pandanaran No. 56 RT 02/RW 04"
                value={formData.alamatAsal || ''}
                onChange={(e) => setFormData({ ...formData, alamatAsal: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  KAB / KOTA ASAL
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kota Semarang"
                  value={formData.kabKotaAsal || ''}
                  onChange={(e) => setFormData({ ...formData, kabKotaAsal: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  PROVINSI ASAL
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jawa Tengah"
                  value={formData.provinsiAsal || ''}
                  onChange={(e) => setFormData({ ...formData, provinsiAsal: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Alamat Tujuan (Bintaro, Pesanggrahan) */}
          <div className="p-4 rounded-2xl neu-inset border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Alamat Tujuan di Kelurahan Bintaro
            </h4>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ALAMAT TUJUAN (JALAN / KOMPLEK / NOMOR RUMAH)
              </label>
              <input
                type="text"
                placeholder="Contoh: Jl. Bintaro Permai Raya Kav. 14"
                value={formData.alamatTujuan || ''}
                onChange={(e) => setFormData({ ...formData, alamatTujuan: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  RT TUJUAN
                </label>
                <input
                  type="text"
                  placeholder="003"
                  value={formData.rtTujuan || ''}
                  onChange={(e) => setFormData({ ...formData, rtTujuan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 text-center font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  RW TUJUAN (1-15)
                </label>
                <select
                  value={formData.rwTujuan || '01'}
                  onChange={(e) => setFormData({ ...formData, rwTujuan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono cursor-pointer"
                >
                  {Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, '0')).map((rw) => (
                    <option key={rw} value={rw}>
                      RW {rw}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  KELURAHAN
                </label>
                <input
                  type="text"
                  disabled
                  value="BINTARO"
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset bg-black/30 text-gray-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  KECAMATAN
                </label>
                <input
                  type="text"
                  disabled
                  value="PESANGGRAHAN"
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset bg-black/30 text-gray-400 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Alasan Kedatangan */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              ALASAN KEPINDAHAN / KEDATANGAN
            </label>
            <input
              type="text"
              placeholder="Contoh: Tugas Kerja di RSUP Fatmawati / Domisili Baru"
              value={formData.alasanDatang || ''}
              onChange={(e) => setFormData({ ...formData, alasanDatang: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
              required
            />
          </div>

          {/* Daftar Anggota Keluarga */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DAFTAR ANGGOTA KELUARGA YANG DATANG ({formData.anggotaList?.length || 1} JIWA)</span>
              </label>
              <button
                type="button"
                onClick={handleAddAnggota}
                className="px-2.5 py-1 rounded-lg neu-button text-[11px] font-bold text-[#D4AF37] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Anggota</span>
              </button>
            </div>

            <div className="space-y-2">
              {(formData.anggotaList || []).map((ang, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl neu-inset grid grid-cols-12 gap-2 items-center text-xs"
                >
                  <div className="col-span-1 text-center font-bold text-gray-400">
                    #{idx + 1}
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={ang.nama}
                      onChange={(e) => handleAnggotaChange(idx, 'nama', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg neu-raised text-xs text-gray-200"
                      required
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      maxLength={16}
                      placeholder="NIK (16 Digit)"
                      value={ang.nik}
                      onChange={(e) => handleAnggotaChange(idx, 'nik', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg neu-raised text-xs text-gray-200 font-mono"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={ang.shdk}
                      onChange={(e) => handleAnggotaChange(idx, 'shdk', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg neu-raised text-xs text-gray-200"
                    >
                      <option value="Kepala Keluarga">KK</option>
                      <option value="Istri">Istri</option>
                      <option value="Anak">Anak</option>
                      <option value="Orang Tua">Ortu</option>
                      <option value="Famili Lain">Famili</option>
                    </select>
                  </div>
                  <div className="col-span-1 text-center">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveAnggota(idx)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status & Keterangan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                STATUS PERMOHONAN
              </label>
              <select
                value={formData.status || 'Disetujui'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 cursor-pointer"
              >
                <option value="Disetujui">Disetujui</option>
                <option value="Selesai">Selesai</option>
                <option value="Diproses">Diproses</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                CATATAN / KETERANGAN
              </label>
              <input
                type="text"
                placeholder="Catatan verifikasi berkas SKPWNI asal..."
                value={formData.keterangan || ''}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
              />
            </div>
          </div>

          {/* Footer Form */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl neu-button text-xs font-bold text-gray-300"
            >
              Batal
            </button>
            <button
              id="submit-datang-form"
              type="submit"
              className="px-6 py-2.5 rounded-2xl neu-button-gold text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SIMPAN DATA DATANG</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
