import React, { useState } from 'react';
import { 
  Building, 
  Users2, 
  Contact2, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Phone, 
  MapPin, 
  UserCheck,
  Building2,
  Users,
  ShieldCheck,
  Check
} from 'lucide-react';
import { DataRT, DataRW, UserAccount } from '../../types';

interface MasterRTRWProps {
  rwList: DataRW[];
  rtList: DataRT[];
  currentUser: UserAccount;
  onSaveRW: (rw: DataRW) => void;
  onSaveRT: (rt: DataRT) => void;
  onDeleteRT: (id: string) => void;
  onDeleteRW: (id: string) => void;
}

export const MasterRTRW: React.FC<MasterRTRWProps> = ({
  rwList,
  rtList,
  currentUser,
  onSaveRW,
  onSaveRT,
  onDeleteRT,
  onDeleteRW,
}) => {
  const [activeView, setActiveView] = useState<'RW' | 'RT'>('RW');
  const [selectedRWFilter, setSelectedRWFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals for add/edit RT & RW
  const [editingRW, setEditingRW] = useState<DataRW | null>(null);
  const [isRWModalOpen, setIsRWModalOpen] = useState(false);

  const [editingRT, setEditingRT] = useState<DataRT | null>(null);
  const [isRTModalOpen, setIsRTModalOpen] = useState(false);

  const isAdminOrPetugas = currentUser.role === 'ADMIN' || currentUser.role === 'PETUGAS';

  // Filter RWs
  const displayedRWs = rwList.filter(
    (rw) =>
      rw.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rw.rw.includes(searchTerm) ||
      rw.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter RTs
  const displayedRTs = rtList.filter((rt) => {
    const matchSearch =
      rt.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rt.rt.includes(searchTerm) ||
      rt.rw.includes(searchTerm) ||
      rt.nik.includes(searchTerm);
    const matchRW = selectedRWFilter === 'ALL' || rt.rw === selectedRWFilter;
    return matchSearch && matchRW;
  });

  const handleOpenNewRW = () => {
    setEditingRW({
      id: `rw-${Date.now()}`,
      rw: String(rwList.length + 1).padStart(2, '0'),
      nama: '',
      nik: '',
      keterangan: '',
      noHp: '',
      alamatSekretariat: '',
      jumlahRT: 9,
      jumlahPenduduk: 3500,
    });
    setIsRWModalOpen(true);
  };

  const handleOpenNewRT = () => {
    setEditingRT({
      id: `rt-${Date.now()}`,
      rt: '001',
      rw: '01',
      nama: '',
      nik: '',
      keterangan: '',
      noHp: '',
      alamatSekretariat: '',
      jumlahKK: 80,
      jumlahJiwa: 300,
    });
    setIsRTModalOpen(true);
  };

  return (
    <div id="master-rt-rw-container" className="space-y-6">
      {/* Top Banner Card */}
      <div className="p-6 rounded-3xl neu-raised border border-[#D4AF37]/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-yellow-400 border border-yellow-500/30">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F8F9FA] flex items-center gap-2">
                <span>Struktur Wilayah & Pengurus RT / RW</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full neu-inset text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                  Kelurahan Bintaro
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Data resmi 15 Rukun Warga (RW) dan 143 Rukun Tetangga (RT) Kecamatan Pesanggrahan
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-2 bg-[#0c1a30] p-1.5 rounded-2xl neu-inset">
          <button
            type="button"
            onClick={() => setActiveView('RW')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'RW'
                ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users2 className="w-4 h-4" />
            <span>15 RW Kelurahan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('RT')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeView === 'RT'
                ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Contact2 className="w-4 h-4" />
            <span>143 RT Lingkungan</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl neu-raised-sm border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Total Rukun Warga (RW)</p>
            <p className="text-2xl font-extrabold text-[#D4AF37] mt-0.5">{rwList.length} RW</p>
            <p className="text-[10px] text-gray-500">RW 01 s/d RW 15 Terdaftar</p>
          </div>
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-[#D4AF37]">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl neu-raised-sm border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Total Rukun Tetangga (RT)</p>
            <p className="text-2xl font-extrabold text-[#F8F9FA] mt-0.5">{rtList.length} RT</p>
            <p className="text-[10px] text-gray-500">Terdistribusi di 15 RW Bintaro</p>
          </div>
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-sky-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-2xl neu-raised-sm border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Total Estimasi Penduduk</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">
              {rwList.reduce((acc, r) => acc + (r.jumlahPenduduk || 0), 0).toLocaleString('id-ID')} Jiwa
            </p>
            <p className="text-[10px] text-gray-500">Berdasarkan data master pengurus</p>
          </div>
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={activeView === 'RW' ? "Cari nama Ketua RW, nomor RW, kawasan..." : "Cari nama Ketua RT, RT, RW, NIK..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 placeholder-gray-500"
            />
          </div>

          {activeView === 'RT' && (
            <select
              value={selectedRWFilter}
              onChange={(e) => setSelectedRWFilter(e.target.value)}
              className="px-3 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 font-sans cursor-pointer"
            >
              <option value="ALL">Semua Wilayah RW</option>
              {rwList.map((r) => (
                <option key={r.rw} value={r.rw}>
                  RW {r.rw}
                </option>
              ))}
            </select>
          )}
        </div>

        {isAdminOrPetugas && (
          <button
            type="button"
            onClick={activeView === 'RW' ? handleOpenNewRW : handleOpenNewRT}
            className="py-2.5 px-4 rounded-2xl neu-button-gold text-xs font-bold flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{activeView === 'RW' ? '+ INPUT KETUA RW' : '+ INPUT KETUA RT'}</span>
          </button>
        )}
      </div>

      {/* VIEW 1: TABEL RW (15 RW) */}
      {activeView === 'RW' && (
        <div className="rounded-3xl neu-raised border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#0c1c33] text-gray-300 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 text-center">Wilayah</th>
                  <th className="py-3.5 px-4">Nama Ketua RW</th>
                  <th className="py-3.5 px-4">NIK</th>
                  <th className="py-3.5 px-4">Kawasan & Keterangan</th>
                  <th className="py-3.5 px-4">Alamat Sekretariat</th>
                  <th className="py-3.5 px-4">Kontak / No. HP</th>
                  <th className="py-3.5 px-4 text-center">Jml RT</th>
                  <th className="py-3.5 px-4 text-center">Penduduk</th>
                  {isAdminOrPetugas && <th className="py-3.5 px-4 text-center">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {displayedRWs.map((rw) => (
                  <tr key={rw.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-3 py-1 rounded-xl neu-inset text-xs font-extrabold text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                        RW {rw.rw}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                      {rw.nama}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-400">{rw.nik}</td>
                    <td className="py-3.5 px-4 min-w-[200px] text-gray-300">{rw.keterangan}</td>
                    <td className="py-3.5 px-4 min-w-[200px] text-gray-300">{rw.alamatSekretariat}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <a
                        href={`https://wa.me/${rw.noHp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg neu-inset text-emerald-300 font-mono text-[11px] hover:border-emerald-500/40 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>{rw.noHp}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-sky-300">{rw.jumlahRT} RT</td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#D4AF37]">
                      {rw.jumlahPenduduk.toLocaleString('id-ID')} Jiwa
                    </td>
                    {isAdminOrPetugas && (
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingRW(rw);
                              setIsRWModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg neu-button text-blue-300 hover:text-blue-200"
                            title="Edit Data RW"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteRW(rw.id)}
                            className="p-1.5 rounded-lg neu-button text-red-400 hover:text-red-300"
                            title="Hapus RW"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 2: TABEL RT (143 RT) */}
      {activeView === 'RT' && (
        <div className="rounded-3xl neu-raised border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#0c1c33] text-gray-300 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 text-center">RT / RW</th>
                  <th className="py-3.5 px-4">Nama Ketua RT</th>
                  <th className="py-3.5 px-4">NIK</th>
                  <th className="py-3.5 px-4">Wilayah Lingkungan</th>
                  <th className="py-3.5 px-4">Alamat Sekretariat RT</th>
                  <th className="py-3.5 px-4">Kontak / No. HP</th>
                  <th className="py-3.5 px-4 text-center">Jml KK</th>
                  <th className="py-3.5 px-4 text-center">Jml Jiwa</th>
                  {isAdminOrPetugas && <th className="py-3.5 px-4 text-center">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {displayedRTs.map((rt) => (
                  <tr key={rt.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-xl neu-inset text-xs font-bold text-sky-300 border border-sky-500/30">
                        RT {rt.rt} / RW {rt.rw}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#F8F9FA] group-hover:text-sky-300 transition-colors">
                      {rt.nama}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-400">{rt.nik}</td>
                    <td className="py-3.5 px-4 min-w-[200px] text-gray-300">{rt.keterangan}</td>
                    <td className="py-3.5 px-4 min-w-[200px] text-gray-300">{rt.alamatSekretariat}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 font-mono text-gray-300">
                        <Phone className="w-3 h-3 text-[#D4AF37]" />
                        {rt.noHp}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-amber-300">{rt.jumlahKK} KK</td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-400">{rt.jumlahJiwa} Jiwa</td>
                    {isAdminOrPetugas && (
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingRT(rt);
                              setIsRTModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg neu-button text-blue-300 hover:text-blue-200"
                            title="Edit Data RT"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteRT(rt.id)}
                            className="p-1.5 rounded-lg neu-button text-red-400 hover:text-red-300"
                            title="Hapus RT"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Input RW */}
      {isRWModalOpen && editingRW && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
              <Users2 className="w-5 h-5 text-[#D4AF37]" />
              <span>Input / Ubah Data Pengurus RW (1-15)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NOMOR RW</label>
                  <input
                    type="text"
                    value={editingRW.rw}
                    onChange={(e) => setEditingRW({ ...editingRW, rw: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    placeholder="01 - 15"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">JUMLAH RT</label>
                  <input
                    type="number"
                    value={editingRW.jumlahRT}
                    onChange={(e) => setEditingRW({ ...editingRW, jumlahRT: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">NAMA KETUA RW</label>
                <input
                  type="text"
                  value={editingRW.nama}
                  onChange={(e) => setEditingRW({ ...editingRW, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Contoh: H. Wahyudi Pratama, ST"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NIK (16 DIGIT)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={editingRW.nik}
                    onChange={(e) => setEditingRW({ ...editingRW, nik: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="317401xxxxxxxxxx"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NO. HP / WHATSAPP</label>
                  <input
                    type="text"
                    value={editingRW.noHp}
                    onChange={(e) => setEditingRW({ ...editingRW, noHp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="0812xxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">KAWASAN / LINGKUNGAN RW</label>
                <input
                  type="text"
                  value={editingRW.keterangan}
                  onChange={(e) => setEditingRW({ ...editingRW, keterangan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Kawasan Jl. RC Veteran / IKPN / Rawa Papan"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">ALAMAT SEKRETARIAT RW</label>
                <input
                  type="text"
                  value={editingRW.alamatSekretariat}
                  onChange={(e) => setEditingRW({ ...editingRW, alamatSekretariat: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Balai Warga RW..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsRWModalOpen(false)}
                className="px-4 py-2 rounded-xl neu-button text-xs font-bold text-gray-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onSaveRW(editingRW);
                  setIsRWModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl neu-button-gold text-xs font-bold"
              >
                Simpan Data RW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Input RT */}
      {isRTModalOpen && editingRT && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
              <Contact2 className="w-5 h-5 text-sky-400" />
              <span>Input / Ubah Data Pengurus RT (1-143)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NOMOR RT</label>
                  <input
                    type="text"
                    value={editingRT.rt}
                    onChange={(e) => setEditingRT({ ...editingRT, rt: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    placeholder="001 - 012"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">WILAYAH RW (1-15)</label>
                  <select
                    value={editingRT.rw}
                    onChange={(e) => setEditingRT({ ...editingRT, rw: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  >
                    {rwList.map((r) => (
                      <option key={r.rw} value={r.rw}>
                        RW {r.rw}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">NAMA KETUA RT</label>
                <input
                  type="text"
                  value={editingRT.nama}
                  onChange={(e) => setEditingRT({ ...editingRT, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Contoh: Bpk. M. Hasan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NIK (16 DIGIT)</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={editingRT.nik}
                    onChange={(e) => setEditingRT({ ...editingRT, nik: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="317401xxxxxxxxxx"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NO. HP / TELEPON</label>
                  <input
                    type="text"
                    value={editingRT.noHp}
                    onChange={(e) => setEditingRT({ ...editingRT, noHp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="0813xxxxxxxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">JUMLAH KK</label>
                  <input
                    type="number"
                    value={editingRT.jumlahKK}
                    onChange={(e) => setEditingRT({ ...editingRT, jumlahKK: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">JUMLAH JIWA</label>
                  <input
                    type="number"
                    value={editingRT.jumlahJiwa}
                    onChange={(e) => setEditingRT({ ...editingRT, jumlahJiwa: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">KETERANGAN WILAYAH</label>
                <input
                  type="text"
                  value={editingRT.keterangan}
                  onChange={(e) => setEditingRT({ ...editingRT, keterangan: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Wilayah RT..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsRTModalOpen(false)}
                className="px-4 py-2 rounded-xl neu-button text-xs font-bold text-gray-300"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onSaveRT(editingRT);
                  setIsRTModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl neu-button-gold text-xs font-bold"
              >
                Simpan Data RT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
