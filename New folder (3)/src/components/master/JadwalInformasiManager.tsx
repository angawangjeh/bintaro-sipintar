import React, { useState } from 'react';
import { 
  CalendarClock, 
  Newspaper, 
  Plus, 
  Edit3, 
  Trash2, 
  MapPin, 
  Clock, 
  Calendar, 
  Save, 
  CheckCircle,
  Sparkles,
  Tag
} from 'lucide-react';
import { JadwalPelayanan, InformasiBerita, UserAccount } from '../../types';

interface JadwalInformasiManagerProps {
  activeSection: 'JADWAL' | 'INFORMASI';
  jadwalList: JadwalPelayanan[];
  informasiList: InformasiBerita[];
  currentUser: UserAccount;
  onSaveJadwal: (jadwal: JadwalPelayanan) => void;
  onDeleteJadwal: (id: string) => void;
  onSaveInformasi: (info: InformasiBerita) => void;
  onDeleteInformasi: (id: string) => void;
}

export const JadwalInformasiManager: React.FC<JadwalInformasiManagerProps> = ({
  activeSection,
  jadwalList,
  informasiList,
  currentUser,
  onSaveJadwal,
  onDeleteJadwal,
  onSaveInformasi,
  onDeleteInformasi,
}) => {
  const [section, setSection] = useState<'JADWAL' | 'INFORMASI'>(activeSection);

  // Jadwal Modal State
  const [isJadwalModalOpen, setIsJadwalModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState<Partial<JadwalPelayanan>>({
    judul: '',
    tanggal: new Date().toISOString().split('T')[0],
    waktu: '08.30 - 14.00 WIB',
    isi: '',
    lokasi: 'Balai Warga RW...',
    keterangan: '',
    status: 'Aktif',
    penanggungJawab: 'Tim Dukcapil Bintaro',
  });

  // Informasi Modal State
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<Partial<InformasiBerita>>({
    judul: '',
    isi: '',
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: 'Kelurahan Bintaro',
    status: 'Aktif',
    kategori: 'Kependudukan',
  });

  const isPetugasOrAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'PETUGAS';

  const handleOpenNewJadwal = () => {
    setEditingJadwal({
      id: `jdw-${Date.now()}`,
      judul: '',
      tanggal: new Date().toISOString().split('T')[0],
      waktu: '08.30 - 14.00 WIB',
      isi: '',
      lokasi: 'Balai Warga RW...',
      keterangan: '',
      status: 'Aktif',
      penanggungJawab: 'Tim Dukcapil Bintaro',
    });
    setIsJadwalModalOpen(true);
  };

  const handleOpenNewInfo = () => {
    setEditingInfo({
      id: `inf-${Date.now()}`,
      judul: '',
      isi: '',
      tanggal: new Date().toISOString().split('T')[0],
      keterangan: 'Kelurahan Bintaro',
      status: 'Aktif',
      kategori: 'Kependudukan',
    });
    setIsInfoModalOpen(true);
  };

  return (
    <div id="jadwal-informasi-manager" className="space-y-6">
      {/* Top Banner with Switcher */}
      <div className="p-6 rounded-3xl neu-raised border border-[#D4AF37]/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
            {section === 'JADWAL' ? <CalendarClock className="w-6 h-6" /> : <Newspaper className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F8F9FA]">
              {section === 'JADWAL' ? 'Jadwal Pelayanan Mobile & Keliling' : 'Informasi & Pengumuman Warga'}
            </h2>
            <p className="text-xs text-gray-400">
              {section === 'JADWAL'
                ? 'Jadwal jemput bola perekaman KTP-el, KIA, IKD, dan posko pindah datang per RW'
                : 'Pemberitahuan regulasi, alur pengurusan berkas, dan sosialisasi Dukcapil Bintaro'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl neu-inset">
            <button
              type="button"
              onClick={() => setSection('JADWAL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                section === 'JADWAL'
                  ? 'neu-button-active text-sky-300 border border-sky-500/40'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <CalendarClock className="w-3.5 h-3.5" />
              <span>Jadwal Pelayanan ({jadwalList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setSection('INFORMASI')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                section === 'INFORMASI'
                  ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/40'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>Informasi ({informasiList.length})</span>
            </button>
          </div>

          {isPetugasOrAdmin && (
            <button
              type="button"
              onClick={section === 'JADWAL' ? handleOpenNewJadwal : handleOpenNewInfo}
              className="py-2.5 px-4 rounded-2xl neu-button-gold text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>{section === 'JADWAL' ? '+ INPUT JADWAL' : '+ INPUT INFORMASI'}</span>
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: JADWAL PELAYANAN */}
      {section === 'JADWAL' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jadwalList.map((j) => {
            const statusBadge: Record<string, string> = {
              Aktif: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
              Terjadwal: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
              Selesai: 'bg-gray-500/20 text-gray-400 border-gray-500/40',
            };

            return (
              <div
                key={j.id}
                className="p-5 rounded-3xl neu-raised border border-white/5 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                        statusBadge[j.status] || 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {j.status}
                    </span>
                    <span className="text-[11px] text-[#D4AF37] font-mono flex items-center gap-1 font-semibold">
                      <Calendar className="w-3 h-3" />
                      {new Date(j.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {j.judul}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mt-2 line-clamp-3">
                    {j.isi}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>{j.waktu}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{j.lokasi}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 italic truncate max-w-[150px]">
                    PJ: {j.penanggungJawab || 'Petugas Bintaro'}
                  </span>

                  {isPetugasOrAdmin && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingJadwal(j);
                          setIsJadwalModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg neu-button text-blue-300 hover:text-blue-200"
                        title="Edit Jadwal"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteJadwal(j.id)}
                        className="p-1.5 rounded-lg neu-button text-red-400 hover:text-red-300"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 2: INFORMASI & BERITA */}
      {section === 'INFORMASI' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {informasiList.map((info) => (
            <div
              key={info.id}
              className="p-5 rounded-3xl neu-raised border border-white/5 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full neu-inset text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {info.kategori}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {new Date(info.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                  {info.judul}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed mt-2.5">
                  {info.isi}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">
                  {info.keterangan}
                </span>

                {isPetugasOrAdmin && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingInfo(info);
                        setIsInfoModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg neu-button text-blue-300 hover:text-blue-200"
                      title="Edit Informasi"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteInformasi(info.id)}
                      className="p-1.5 rounded-lg neu-button text-red-400 hover:text-red-300"
                      title="Hapus Informasi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Input Jadwal */}
      {isJadwalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-sky-400" />
              <span>Input Jadwal Pelayanan Mobile</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">JUDUL PELAYANAN</label>
                <input
                  type="text"
                  value={editingJadwal.judul || ''}
                  onChange={(e) => setEditingJadwal({ ...editingJadwal, judul: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Contoh: Layanan Mobile KTP-El & KIA RW 05"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">TANGGAL</label>
                  <input
                    type="date"
                    value={editingJadwal.tanggal || ''}
                    onChange={(e) => setEditingJadwal({ ...editingJadwal, tanggal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">WAKTU</label>
                  <input
                    type="text"
                    value={editingJadwal.waktu || ''}
                    onChange={(e) => setEditingJadwal({ ...editingJadwal, waktu: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    placeholder="08.30 - 14.00 WIB"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">ISI / DESKRIPSI LAYANAN</label>
                <textarea
                  rows={3}
                  value={editingJadwal.isi || ''}
                  onChange={(e) => setEditingJadwal({ ...editingJadwal, isi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 resize-none"
                  placeholder="Penjelasan jenis layanan, berkas yang diperlukan..."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">LOKASI PELAYANAN</label>
                <input
                  type="text"
                  value={editingJadwal.lokasi || ''}
                  onChange={(e) => setEditingJadwal({ ...editingJadwal, lokasi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Balai Warga RW 05 / Lapangan..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">STATUS</label>
                  <select
                    value={editingJadwal.status || 'Aktif'}
                    onChange={(e) => setEditingJadwal({ ...editingJadwal, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Terjadwal">Terjadwal</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">PENANGGUNG JAWAB</label>
                  <input
                    type="text"
                    value={editingJadwal.penanggungJawab || ''}
                    onChange={(e) => setEditingJadwal({ ...editingJadwal, penanggungJawab: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    placeholder="Nama Petugas..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">KETERANGAN / PERSYARATAN</label>
                <input
                  type="text"
                  value={editingJadwal.keterangan || ''}
                  onChange={(e) => setEditingJadwal({ ...editingJadwal, keterangan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Bawa FC KK & KTP lama..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsJadwalModalOpen(false)}
                className="px-4 py-2 rounded-xl neu-button text-xs font-bold text-gray-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editingJadwal.judul && editingJadwal.isi) {
                    onSaveJadwal(editingJadwal as JadwalPelayanan);
                    setIsJadwalModalOpen(false);
                  }
                }}
                className="px-5 py-2 rounded-xl neu-button-gold text-xs font-bold"
              >
                Simpan Jadwal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Input Informasi */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#D4AF37]" />
              <span>Input Informasi & Pengumuman</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">JUDUL PENGUMUMAN</label>
                <input
                  type="text"
                  value={editingInfo.judul || ''}
                  onChange={(e) => setEditingInfo({ ...editingInfo, judul: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Contoh: Alur & Persyaratan Pindah Datang 2026"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">TANGGAL</label>
                  <input
                    type="date"
                    value={editingInfo.tanggal || ''}
                    onChange={(e) => setEditingInfo({ ...editingInfo, tanggal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">KATEGORI</label>
                  <select
                    value={editingInfo.kategori || 'Kependudukan'}
                    onChange={(e) => setEditingInfo({ ...editingInfo, kategori: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  >
                    <option value="Kependudukan">Kependudukan</option>
                    <option value="Sosialisasi">Sosialisasi</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Layanan">Layanan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">ISI PENGUMUMAN / BERITA</label>
                <textarea
                  rows={4}
                  value={editingInfo.isi || ''}
                  onChange={(e) => setEditingInfo({ ...editingInfo, isi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 resize-none"
                  placeholder="Tuliskan isi rilis informasi lengkap..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">STATUS</label>
                  <select
                    value={editingInfo.status || 'Aktif'}
                    onChange={(e) => setEditingInfo({ ...editingInfo, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  >
                    <option value="Aktif">Aktif (Publik)</option>
                    <option value="Draft">Draft</option>
                    <option value="Arsip">Arsip</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">KETERANGAN / SUMBER</label>
                  <input
                    type="text"
                    value={editingInfo.keterangan || ''}
                    onChange={(e) => setEditingInfo({ ...editingInfo, keterangan: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    placeholder="Dukcapil Bintaro Jawara"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsInfoModalOpen(false)}
                className="px-4 py-2 rounded-xl neu-button text-xs font-bold text-gray-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editingInfo.judul && editingInfo.isi) {
                    onSaveInformasi(editingInfo as InformasiBerita);
                    setIsInfoModalOpen(false);
                  }
                }}
                className="px-5 py-2 rounded-xl neu-button-gold text-xs font-bold"
              >
                Simpan Informasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
