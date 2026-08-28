import React, { useState } from 'react';
import { 
  BarChart3, 
  CreditCard, 
  MessageSquareText, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Users, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { StatistikPenduduk, StatistikWajibKTP, RunningTextItem, UserAccount } from '../../types';

interface StatistikDemografiManagerProps {
  initialPenduduk: StatistikPenduduk;
  initialKTP: StatistikWajibKTP;
  runningTexts: RunningTextItem[];
  currentUser: UserAccount;
  onSavePenduduk: (stat: StatistikPenduduk) => void;
  onSaveKTP: (stat: StatistikWajibKTP) => void;
  onSaveRunningText: (list: RunningTextItem[]) => void;
}

export const StatistikDemografiManager: React.FC<StatistikDemografiManagerProps> = ({
  initialPenduduk,
  initialKTP,
  runningTexts,
  currentUser,
  onSavePenduduk,
  onSaveKTP,
  onSaveRunningText,
}) => {
  const [statPenduduk, setStatPenduduk] = useState<StatistikPenduduk>(initialPenduduk);
  const [statKTP, setStatKTP] = useState<StatistikWajibKTP>(initialKTP);
  const [runningList, setRunningList] = useState<RunningTextItem[]>(runningTexts);

  const [newText, setNewText] = useState('');
  const [newUrutan, setNewUrutan] = useState(runningTexts.length + 1);
  const [successMsg, setSuccessMsg] = useState('');

  const isAdminOrPetugas = currentUser.role === 'ADMIN' || currentUser.role === 'PETUGAS';

  const handleSaveStatPenduduk = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...statPenduduk,
      jumlah: Number(statPenduduk.lakiLaki) + Number(statPenduduk.perempuan),
      lastUpdated: new Date().toLocaleString('id-ID'),
    };
    setStatPenduduk(updated);
    onSavePenduduk(updated);
    showNotice('Statistik Jumlah Penduduk berhasil diperbarui!');
  };

  const handleSaveStatKTP = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...statKTP,
      jumlah: Number(statKTP.lakiLaki) + Number(statKTP.perempuan),
      lastUpdated: new Date().toLocaleString('id-ID'),
    };
    setStatKTP(updated);
    onSaveKTP(updated);
    showNotice('Statistik Wajib KTP berhasil diperbarui!');
  };

  const handleAddRunningText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newItem: RunningTextItem = {
      id: `rtx-${Date.now()}`,
      teks: newText.trim(),
      status: 'Aktif',
      urutan: newUrutan,
      update: new Date().toLocaleDateString('id-ID'),
    };

    const updated = [...runningList, newItem];
    setRunningList(updated);
    onSaveRunningText(updated);
    setNewText('');
    setNewUrutan(updated.length + 1);
    showNotice('Teks pengumuman running text baru berhasil ditambahkan!');
  };

  const handleToggleRunningStatus = (id: string) => {
    const updated = runningList.map((item) =>
      item.id === id ? { ...item, status: item.status === 'Aktif' ? 'Nonaktif' : 'Aktif' as any } : item
    );
    setRunningList(updated);
    onSaveRunningText(updated);
  };

  const handleDeleteRunning = (id: string) => {
    const updated = runningList.filter((item) => item.id !== id);
    setRunningList(updated);
    onSaveRunningText(updated);
  };

  const showNotice = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  return (
    <div id="stat-demografi-manager" className="space-y-6">
      {/* Toast Notice */}
      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid: Form Jumlah Penduduk & Wajib KTP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form 1: Input Jumlah Penduduk */}
        <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-teal-400 border border-teal-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8F9FA]">
                Input Jumlah Penduduk
              </h3>
              <p className="text-xs text-gray-400">
                Statistik demografi gender Kelurahan Bintaro
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveStatPenduduk} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  LAKI-LAKI (JIWA)
                </label>
                <input
                  type="number"
                  value={statPenduduk.lakiLaki}
                  disabled={!isAdminOrPetugas}
                  onChange={(e) =>
                    setStatPenduduk({
                      ...statPenduduk,
                      lakiLaki: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  PEREMPUAN (JIWA)
                </label>
                <input
                  type="number"
                  value={statPenduduk.perempuan}
                  disabled={!isAdminOrPetugas}
                  onChange={(e) =>
                    setStatPenduduk({
                      ...statPenduduk,
                      perempuan: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl neu-inset flex items-center justify-between border border-teal-500/20">
              <div>
                <p className="text-xs text-gray-400">TOTAL JUMLAH PENDUDUK (OTOMATIS):</p>
                <p className="text-xl font-extrabold text-teal-300 mt-0.5">
                  {(Number(statPenduduk.lakiLaki) + Number(statPenduduk.perempuan)).toLocaleString('id-ID')} Jiwa
                </p>
              </div>
              <span className="text-[10px] text-gray-500">
                Update: {statPenduduk.lastUpdated}
              </span>
            </div>

            {isAdminOrPetugas && (
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-2xl neu-button-gold font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>SIMPAN DATA PENDUDUK</span>
              </button>
            )}
          </form>
        </div>

        {/* Form 2: Input Wajib KTP */}
        <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-pink-400 border border-pink-500/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8F9FA]">
                Input Wajib KTP
              </h3>
              <p className="text-xs text-gray-400">
                Statistik kepemilikan dan perekaman KTP-el
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveStatKTP} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  WAJIB KTP LAKI-LAKI
                </label>
                <input
                  type="number"
                  value={statKTP.lakiLaki}
                  disabled={!isAdminOrPetugas}
                  onChange={(e) =>
                    setStatKTP({
                      ...statKTP,
                      lakiLaki: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  WAJIB KTP PEREMPUAN
                </label>
                <input
                  type="number"
                  value={statKTP.perempuan}
                  disabled={!isAdminOrPetugas}
                  onChange={(e) =>
                    setStatKTP({
                      ...statKTP,
                      perempuan: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  SUDAH PEREKAMAN KTP-EL
                </label>
                <input
                  type="number"
                  value={statKTP.sudahRekam}
                  disabled={!isAdminOrPetugas}
                  onChange={(e) =>
                    setStatKTP({
                      ...statKTP,
                      sudahRekam: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl neu-inset neu-inset-focus text-emerald-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  BELUM PEREKAMAN (PEMULA)
                </label>
                <input
                  type="number"
                  value={statKTP.belumRekam}
                  disabled={!isAdminOrPetugas}
                  onChange={(e) =>
                    setStatKTP({
                      ...statKTP,
                      belumRekam: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl neu-inset neu-inset-focus text-amber-300 font-mono"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl neu-inset flex items-center justify-between border border-pink-500/20">
              <div>
                <p className="text-xs text-gray-400">TOTAL WAJIB KTP (OTOMATIS):</p>
                <p className="text-xl font-extrabold text-pink-300 mt-0.5">
                  {(Number(statKTP.lakiLaki) + Number(statKTP.perempuan)).toLocaleString('id-ID')} Jiwa
                </p>
              </div>
              <span className="text-[10px] text-gray-500">
                Update: {statKTP.lastUpdated}
              </span>
            </div>

            {isAdminOrPetugas && (
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-2xl neu-button-gold font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>SIMPAN DATA WAJIB KTP</span>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* SECTION 3: INPUT RUNNING TEXT (HEADER TICKER) */}
      <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-amber-300 border border-amber-500/30">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F8F9FA]">
              Input Running Text (Tampil di Header)
            </h3>
            <p className="text-xs text-gray-400">
              Pengaturan teks pengumuman bergerak di bilah atas aplikasi SIPINTAR
            </p>
          </div>
        </div>

        {/* Add new running text form */}
        {isAdminOrPetugas && (
          <form onSubmit={handleAddRunningText} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
            <div className="sm:col-span-8">
              <input
                type="text"
                placeholder="Tuliskan teks pengumuman running text baru..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl neu-inset neu-inset-focus text-gray-200"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <input
                type="number"
                placeholder="Urutan"
                value={newUrutan}
                onChange={(e) => setNewUrutan(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2.5 rounded-2xl neu-inset neu-inset-focus text-gray-200 text-center font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded-2xl neu-button-gold font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ TAMBAH</span>
              </button>
            </div>
          </form>
        )}

        {/* Running Text Items Table */}
        <div className="rounded-2xl neu-inset overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-semibold">
                <th className="py-2.5 px-4 text-center w-16">Urutan</th>
                <th className="py-2.5 px-4">Teks Running Text</th>
                <th className="py-2.5 px-4 text-center w-24">Status</th>
                <th className="py-2.5 px-4 text-center w-28">Update</th>
                {isAdminOrPetugas && <th className="py-2.5 px-4 text-center w-20">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {runningList.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="py-2.5 px-4 text-center font-mono font-bold text-[#D4AF37]">
                    #{item.urutan}
                  </td>
                  <td className="py-2.5 px-4 font-medium text-gray-200">
                    {item.teks}
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <button
                      type="button"
                      disabled={!isAdminOrPetugas}
                      onClick={() => handleToggleRunningStatus(item.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        item.status === 'Aktif'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/40'
                      }`}
                    >
                      {item.status}
                    </button>
                  </td>
                  <td className="py-2.5 px-4 text-center text-gray-400 text-[11px] font-mono">
                    {item.update}
                  </td>
                  {isAdminOrPetugas && (
                    <td className="py-2.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteRunning(item.id)}
                        className="p-1 rounded-lg neu-button text-red-400 hover:text-red-300"
                        title="Hapus Teks"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
