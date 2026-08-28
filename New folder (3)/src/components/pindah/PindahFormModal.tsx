import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  UserMinus, 
  Plus, 
  Trash2, 
  Building2, 
  MapPin, 
  Calendar, 
  User, 
  FileText 
} from 'lucide-react';
import { DataPindah } from '../../types';

interface PindahFormModalProps {
  initialData?: DataPindah | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<DataPindah>) => void;
}

export const PindahFormModal: React.FC<PindahFormModalProps> = ({
  initialData,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<DataPindah>>({
    noSurat: `471.2/${Math.floor(100 + Math.random() * 900)}/SKP-WNI/BTR/2026`,
    tanggalPindah: new Date().toISOString().split('T')[0],
    namaKepalaKeluarga: '',
    nik: '',
    alamatAsal: '',
    rtAsal: '001',
    rwAsal: '01',
    kelurahanAsal: 'BINTARO',
    kecamatanAsal: 'PESANGGRAHAN',
    alasanPindah: 'Pindah Tempat Tinggal / Pekerjaan Baru',
    alamatTujuan: '',
    rtTujuan: '001',
    rwTujuan: '01',
    kabKotaTujuan: '',
    provinsiTujuan: 'DKI Jakarta',
    jenisKepindahan: 'Seluruh Anggota Keluarga',
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
        noSurat: `471.2/${Math.floor(100 + Math.random() * 900)}/SKP-WNI/BTR/2026`,
        tanggalPindah: new Date().toISOString().split('T')[0],
        namaKepalaKeluarga: '',
        nik: '',
        alamatAsal: '',
        rtAsal: '001',
        rwAsal: '01',
        kelurahanAsal: 'BINTARO',
        kecamatanAsal: 'PESANGGRAHAN',
        alasanPindah: 'Pindah Tempat Tinggal / Pekerjaan Baru',
        alamatTujuan: '',
        rtTujuan: '001',
        rwTujuan: '01',
        kabKotaTujuan: '',
        provinsiTujuan: 'DKI Jakarta',
        jenisKepindahan: 'Seluruh Anggota Keluarga',
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
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-amber-400 border border-amber-500/30">
              <UserMinus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#F8F9FA]">
                {initialData ? 'Ubah Data Pindah (SKP)' : 'Input Master Data Pindah (SKP)'}
              </h3>
              <p className="text-xs text-gray-400">
                Formulir Perpindahan Penduduk Kelurahan Bintaro
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
                NOMOR SURAT REGISTRASI
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
                TANGGAL PINDAH
              </label>
              <input
                type="date"
                value={formData.tanggalPindah || ''}
                onChange={(e) => setFormData({ ...formData, tanggalPindah: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>
          </div>

          {/* Identitas Pemohon */}
          <div className="p-4 rounded-2xl neu-inset border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Identitas Kepala Keluarga / Pemohon
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  NAMA KEPALA KELUARGA
                </label>
                <input
                  type="text"
                  placeholder="Contoh: H. Hendra Kurniawan, SE"
                  value={formData.namaKepalaKeluarga || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    const list = [...(formData.anggotaList || [])];
                    if (list[0]) list[0].nama = val;
                    setFormData({ ...formData, namaKepalaKeluarga: val, anggotaList: list });
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
                  placeholder="317401xxxxxxxxxx"
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

          {/* Alamat Asal (Bintaro, Pesanggrahan) */}
          <div className="p-4 rounded-2xl neu-inset border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Alamat Asal (Kelurahan Bintaro)
            </h4>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ALAMAT ASAL (JALAN / KOMPLEK / NO. RUMAH)
              </label>
              <input
                type="text"
                placeholder="Contoh: Jl. Rawa Papan Sentral No. 45"
                value={formData.alamatAsal || ''}
                onChange={(e) => setFormData({ ...formData, alamatAsal: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  RT ASAL
                </label>
                <input
                  type="text"
                  placeholder="003"
                  value={formData.rtAsal || ''}
                  onChange={(e) => setFormData({ ...formData, rtAsal: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 text-center font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  RW ASAL (1-15)
                </label>
                <select
                  value={formData.rwAsal || '01'}
                  onChange={(e) => setFormData({ ...formData, rwAsal: e.target.value })}
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

          {/* Alasan Pindah & Jenis Kepindahan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ALASAN PINDAH
              </label>
              <select
                value={formData.alasanPindah || ''}
                onChange={(e) => setFormData({ ...formData, alasanPindah: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 cursor-pointer"
              >
                <option value="Pekerjaan / Dinas Baru">Pekerjaan / Dinas Baru</option>
                <option value="Pendidikan / Sekolah">Pendidikan / Sekolah</option>
                <option value="Pindah Rumah / Beli Rumah Baru">Pindah Rumah / Beli Rumah Baru</option>
                <option value="Mengikuti Suami / Istri">Mengikuti Suami / Istri</option>
                <option value="Keluarga / Lansia">Keluarga / Lansia</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                JENIS KEPINDAHAN
              </label>
              <select
                value={formData.jenisKepindahan || 'Seluruh Anggota Keluarga'}
                onChange={(e) => setFormData({ ...formData, jenisKepindahan: e.target.value as any })}
                className="w-full px-3.5 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 cursor-pointer"
              >
                <option value="Kepala Keluarga">Kepala Keluarga</option>
                <option value="Seluruh Anggota Keluarga">Seluruh Anggota Keluarga</option>
                <option value="Kepala dan Sebagian Anggota">Kepala dan Sebagian Anggota</option>
                <option value="Anggota Keluarga">Anggota Keluarga Saja</option>
              </select>
            </div>
          </div>

          {/* Alamat Tujuan */}
          <div className="p-4 rounded-2xl neu-inset border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Alamat Tujuan Perpindahan
            </h4>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                ALAMAT TUJUAN (JALAN / NOMOR / DESA)
              </label>
              <input
                type="text"
                placeholder="Contoh: Jl. Boulevard Bintaro Sektor 7 No. 88"
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
                  placeholder="004"
                  value={formData.rtTujuan || ''}
                  onChange={(e) => setFormData({ ...formData, rtTujuan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 text-center font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  RW TUJUAN
                </label>
                <input
                  type="text"
                  placeholder="009"
                  value={formData.rwTujuan || ''}
                  onChange={(e) => setFormData({ ...formData, rwTujuan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200 text-center font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  KAB / KOTA TUJUAN
                </label>
                <input
                  type="text"
                  placeholder="Kota Tangerang Selatan"
                  value={formData.kabKotaTujuan || ''}
                  onChange={(e) => setFormData({ ...formData, kabKotaTujuan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  PROVINSI TUJUAN
                </label>
                <input
                  type="text"
                  placeholder="Banten / Jawa Barat"
                  value={formData.provinsiTujuan || ''}
                  onChange={(e) => setFormData({ ...formData, provinsiTujuan: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Daftar Anggota Keluarga */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>DAFTAR ANGGOTA KELUARGA YANG PINDAH ({formData.anggotaList?.length || 1} JIWA)</span>
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
                placeholder="Catatan tambahan berkas pemohon..."
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
              id="submit-pindah-form"
              type="submit"
              className="px-6 py-2.5 rounded-2xl neu-button-gold text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SIMPAN DATA PINDAH</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
