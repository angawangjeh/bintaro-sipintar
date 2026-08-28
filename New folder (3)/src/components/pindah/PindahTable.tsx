import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Printer, 
  Edit3, 
  Trash2, 
  Eye, 
  Plus, 
  UserMinus, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Download,
  AlertCircle
} from 'lucide-react';
import { DataPindah, UserAccount, AppBranding } from '../../types';

interface PindahTableProps {
  data: DataPindah[];
  currentUser: UserAccount;
  branding: AppBranding;
  onAddNew: () => void;
  onEdit: (item: DataPindah) => void;
  onDelete: (id: string) => void;
  onView: (item: DataPindah) => void;
  onPrint: (item: DataPindah) => void;
}

export const PindahTable: React.FC<PindahTableProps> = ({
  data,
  currentUser,
  branding,
  onAddNew,
  onEdit,
  onDelete,
  onView,
  onPrint,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRW, setFilterRW] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const isAdmin = currentUser.role === 'ADMIN';
  const isPetugas = currentUser.role === 'PETUGAS';
  const canEditOrDelete = isAdmin || isPetugas;

  // Filter data according to user role bounds
  const roleFilteredData = useMemo(() => {
    return data.filter((item) => {
      // If role is RT -> filter strictly to user's RT & RW
      if (currentUser.role === 'RT') {
        if (currentUser.rwNumber && item.rwAsal !== currentUser.rwNumber) return false;
        if (currentUser.rtNumber && item.rtAsal !== currentUser.rtNumber) return false;
      }
      // If role is RW -> filter strictly to user's RW
      if (currentUser.role === 'RW') {
        if (currentUser.rwNumber && item.rwAsal !== currentUser.rwNumber) return false;
      }
      // Lurah, Admin, Petugas see all RWs
      return true;
    });
  }, [data, currentUser]);

  // Apply user search & filter
  const displayedData = useMemo(() => {
    return roleFilteredData.filter((item) => {
      const matchSearch =
        item.namaKepalaKeluarga.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nik.includes(searchTerm) ||
        item.alamatAsal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.alamatTujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kabKotaTujuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noSurat.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRW = filterRW === 'ALL' || item.rwAsal === filterRW;
      const matchStatus = filterStatus === 'ALL' || item.status === filterStatus;

      return matchSearch && matchRW && matchStatus;
    });
  }, [roleFilteredData, searchTerm, filterRW, filterStatus]);

  const uniqueRWs = Array.from(new Set(data.map((d) => d.rwAsal))).sort();

  return (
    <div id="pindah-table-container" className="space-y-4">
      {/* Header Controls */}
      <div className="p-4 sm:p-6 rounded-3xl neu-raised border border-[#D4AF37]/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-amber-400 border border-amber-500/30">
              <UserMinus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#F8F9FA] flex items-center gap-2">
                <span>Tabel Data Pindah (SKP)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full neu-inset text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                  {displayedData.length} Data
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Surat Keterangan Pindah WNI Kelurahan Bintaro, Kecamatan Pesanggrahan
              </p>
            </div>
          </div>

          {/* Role specific filtering notice */}
          {currentUser.role === 'RT' && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Menampilkan data khusus <strong>RT {currentUser.rtNumber} / RW {currentUser.rwNumber}</strong></span>
            </div>
          )}
          {currentUser.role === 'RW' && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Menampilkan data seluruh RT di wilayah <strong>RW {currentUser.rwNumber}</strong></span>
            </div>
          )}
        </div>

        {/* Action Button: Input Data Pindah */}
        {canEditOrDelete && (
          <button
            id="btn-add-pindah"
            type="button"
            onClick={onAddNew}
            className="py-2.5 px-5 rounded-2xl neu-button-gold text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ INPUT DATA PINDAH</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama pemohon, NIK, alamat asal/tujuan, kota..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 placeholder-gray-500 transition-all font-sans"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterRW}
            onChange={(e) => setFilterRW(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 font-sans cursor-pointer"
          >
            <option value="ALL">Semua RW Asal</option>
            {uniqueRWs.map((rw) => (
              <option key={rw} value={rw}>
                RW {rw}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 font-sans cursor-pointer"
          >
            <option value="ALL">Semua Status</option>
            <option value="Disetujui">Disetujui</option>
            <option value="Selesai">Selesai</option>
            <option value="Diproses">Diproses</option>
            <option value="Ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-3xl neu-raised border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#0c1c33] text-gray-300 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 text-center">No</th>
                <th className="py-3.5 px-4">Tanggal Pindah</th>
                <th className="py-3.5 px-4">Nama Kepala Keluarga</th>
                <th className="py-3.5 px-4">Alamat Asal (Bintaro)</th>
                <th className="py-3.5 px-4">Alasan Pindah</th>
                <th className="py-3.5 px-4">Alamat Tujuan</th>
                <th className="py-3.5 px-4">Jenis Kepindahan</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {displayedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-gray-400">
                    Tidak ada data kepindahan yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                displayedData.map((row, index) => {
                  const statusColors: Record<string, string> = {
                    Disetujui: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                    Selesai: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
                    Diproses: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                    Ditolak: 'bg-red-500/20 text-red-300 border-red-500/40',
                  };

                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* No */}
                      <td className="py-3.5 px-4 text-center font-mono text-gray-400">
                        {index + 1}
                      </td>

                      {/* Tanggal Pindah */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-200">
                          {new Date(row.tanggalPindah).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {row.noSurat.split('/')[1] || ''}
                        </span>
                      </td>

                      {/* Nama Kepala Keluarga */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                          {row.namaKepalaKeluarga}
                        </div>
                        <div className="text-[11px] text-gray-400 font-mono">
                          NIK: {row.nik}
                        </div>
                        <div className="text-[10px] text-amber-300/80">
                          {row.jumlahAnggota} Jiwa Pindah
                        </div>
                      </td>

                      {/* Alamat Asal */}
                      <td className="py-3.5 px-4 min-w-[200px]">
                        <p className="font-medium text-gray-200">{row.alamatAsal}</p>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          <span className="text-[#D4AF37] font-semibold">RT {row.rtAsal} / RW {row.rwAsal}</span>, Kel. {row.kelurahanAsal}, Kec. {row.kecamatanAsal}
                        </div>
                      </td>

                      {/* Alasan Pindah */}
                      <td className="py-3.5 px-4 min-w-[150px]">
                        <span className="inline-block px-2 py-0.5 rounded-lg neu-inset text-[11px] text-gray-300">
                          {row.alasanPindah}
                        </span>
                      </td>

                      {/* Alamat Tujuan */}
                      <td className="py-3.5 px-4 min-w-[220px]">
                        <p className="font-medium text-gray-200">{row.alamatTujuan}</p>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          RT {row.rtTujuan}/RW {row.rwTujuan}, {row.kabKotaTujuan}, {row.provinsiTujuan}
                        </div>
                      </td>

                      {/* Jenis Kepindahan */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 rounded-md text-[10px] font-bold neu-inset text-sky-300 border border-sky-500/20">
                          {row.jenisKepindahan}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            statusColors[row.status] || 'bg-gray-500/20 text-gray-300'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      {/* Aksi Buttons (Multilevel Permitted) */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Tombol Cetak (Tersedia untuk Semua Role: Admin, Petugas, Lurah, RW, RT) */}
                          <button
                            type="button"
                            onClick={() => onPrint(row)}
                            className="p-1.5 rounded-lg neu-button text-amber-300 hover:text-amber-200 border border-amber-500/30"
                            title="Cetak Surat Keterangan Pindah (SKP)"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          {/* Tombol Lihat Detail */}
                          <button
                            type="button"
                            onClick={() => onView(row)}
                            className="p-1.5 rounded-lg neu-button text-sky-300 hover:text-white"
                            title="Lihat Detail Berkas"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Tombol Edit & Hapus (Hanya untuk Admin dan Petugas) */}
                          {canEditOrDelete && (
                            <>
                              <button
                                type="button"
                                onClick={() => onEdit(row)}
                                className="p-1.5 rounded-lg neu-button text-blue-300 hover:text-blue-200"
                                title="Edit Data"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDelete(row.id)}
                                className="p-1.5 rounded-lg neu-button text-red-400 hover:text-red-300 hover:border-red-500/40"
                                title="Hapus Data"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
