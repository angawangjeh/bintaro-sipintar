import React from 'react';
import { 
  UserMinus, 
  UserPlus, 
  Users, 
  CreditCard, 
  CalendarClock, 
  Newspaper, 
  Building2, 
  Printer, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight,
  Sparkles, 
  Images, 
  Plus, 
  Eye,
  Database,
  ShieldCheck,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { 
  DataPindah, 
  DataDatang, 
  StatistikPenduduk, 
  StatistikWajibKTP, 
  JadwalPelayanan, 
  InformasiBerita, 
  GaleriFoto, 
  UserAccount, 
  AppBranding 
} from '../../types';

interface DashboardHomeProps {
  currentUser: UserAccount;
  branding: AppBranding;
  pindahList: DataPindah[];
  datangList: DataDatang[];
  statPenduduk: StatistikPenduduk;
  statKTP: StatistikWajibKTP;
  jadwalList: JadwalPelayanan[];
  informasiList: InformasiBerita[];
  galeriList: GaleriFoto[];
  onNavigateTab: (tab: any) => void;
  onOpenNewPindah: () => void;
  onOpenNewDatang: () => void;
  onPrintSurat: (type: 'PINDAH' | 'DATANG', item: DataPindah | DataDatang) => void;
  onOpenDatabaseSync: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  currentUser,
  branding,
  pindahList,
  datangList,
  statPenduduk,
  statKTP,
  jadwalList,
  informasiList,
  galeriList,
  onNavigateTab,
  onOpenNewPindah,
  onOpenNewDatang,
  onPrintSurat,
  onOpenDatabaseSync,
}) => {
  const isAdminOrPetugas = currentUser.role === 'ADMIN' || currentUser.role === 'PETUGAS';

  // Total calculations
  const totalJiwaPindah = pindahList.reduce((acc, curr) => acc + (curr.jumlahAnggota || 1), 0);
  const totalJiwaDatang = datangList.reduce((acc, curr) => acc + (curr.jumlahAnggota || 1), 0);

  return (
    <div id="dashboard-home" className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl neu-raised border border-[#D4AF37]/30 relative overflow-hidden bg-gradient-to-r from-[#0c1e36] via-[#0A192F] to-[#0d223d]">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Sistem Informasi Pindah Datang Bintaro (SIPINTAR)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8F9FA] tracking-tight">
              Selamat Datang, <span className="text-[#D4AF37]">{currentUser.fullName}</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Anda masuk dengan hak akses <strong className="text-amber-300 font-semibold">{currentUser.role}</strong>
              {currentUser.rwNumber && ` Wilayah RW ${currentUser.rwNumber}`}
              {currentUser.rtNumber && ` / RT ${currentUser.rtNumber}`}
              . Kelola data perpindahan dan kedatangan warga secara efisien, akurat, dan terintegrasi di Kelurahan {branding.kelurahan}.
            </p>
          </div>

          {/* Quick Access Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {isAdminOrPetugas && (
              <>
                <button
                  type="button"
                  onClick={onOpenNewPindah}
                  className="flex-1 md:flex-initial py-2.5 px-4 rounded-2xl neu-button-gold text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ DATA PINDAH</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenNewDatang}
                  className="flex-1 md:flex-initial py-2.5 px-4 rounded-2xl neu-button text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ DATA DATANG</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={onOpenDatabaseSync}
              className="py-2.5 px-3.5 rounded-2xl neu-button text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:text-white"
              title="Database MySQL & GitHub"
            >
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">MySQL DDL</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Accents */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Key Metric Cards in Neumorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Data Pindah */}
        <div
          onClick={() => onNavigateTab('PINDAH_TABEL')}
          className="p-5 rounded-3xl neu-raised border border-white/5 hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <UserMinus className="w-6 h-6" />
            </div>
            <span className="flex items-center text-[11px] font-bold text-amber-400 gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>SKP Keluar</span>
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-400 font-medium">Total Warga Pindah</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-extrabold text-[#F8F9FA]">
                {pindahList.length} <span className="text-xs font-semibold text-gray-400">Berkas</span>
              </h3>
            </div>
            <p className="text-[11px] text-amber-300/90 font-semibold mt-1">
              {totalJiwaPindah} Jiwa tercatat pindah keluar
            </p>
          </div>
        </div>

        {/* Card 2: Data Datang */}
        <div
          onClick={() => onNavigateTab('DATANG_TABEL')}
          className="p-5 rounded-3xl neu-raised border border-white/5 hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <UserPlus className="w-6 h-6" />
            </div>
            <span className="flex items-center text-[11px] font-bold text-emerald-400 gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>SKD Masuk</span>
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-400 font-medium">Total Warga Datang</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-extrabold text-[#F8F9FA]">
                {datangList.length} <span className="text-xs font-semibold text-gray-400">Berkas</span>
              </h3>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">
              {totalJiwaDatang} Jiwa menetap di Bintaro
            </p>
          </div>
        </div>

        {/* Card 3: Jumlah Penduduk */}
        <div
          onClick={() => onNavigateTab('STAT_PENDUDUK')}
          className="p-5 rounded-3xl neu-raised border border-white/5 hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-sky-400">
              15 RW Bintaro
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-400 font-medium">Total Jumlah Penduduk</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-extrabold text-[#F8F9FA]">
                {statPenduduk.jumlah.toLocaleString('id-ID')} <span className="text-xs font-semibold text-gray-400">Jiwa</span>
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              L: <strong className="text-sky-300">{statPenduduk.lakiLaki.toLocaleString('id-ID')}</strong> | P: <strong className="text-pink-300">{statPenduduk.perempuan.toLocaleString('id-ID')}</strong>
            </p>
          </div>
        </div>

        {/* Card 4: Wajib KTP */}
        <div
          onClick={() => onNavigateTab('STAT_KTP')}
          className="p-5 rounded-3xl neu-raised border border-white/5 hover:border-pink-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-pink-400">
              KTP-el Aktif
            </span>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-400 font-medium">Warga Wajib KTP</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-extrabold text-[#F8F9FA]">
                {statKTP.jumlah.toLocaleString('id-ID')} <span className="text-xs font-semibold text-gray-400">Jiwa</span>
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Rekam: <strong className="text-emerald-400">{statKTP.sudahRekam.toLocaleString('id-ID')}</strong> | Belum: <strong className="text-amber-400">{statKTP.belumRekam.toLocaleString('id-ID')}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Split: Recent Data Pindah & Datang + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Pindah & Datang Feeds (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recent Pindah Section */}
          <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center text-amber-400">
                  <UserMinus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8F9FA]">
                    Transaksi Data Pindah Terbaru (SKP)
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Pengajuan surat keterangan pindah terkini warga Bintaro
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('PINDAH_TABEL')}
                className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {pindahList.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl neu-inset flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F8F9FA]">{item.namaKepalaKeluarga}</span>
                      <span className="px-2 py-0.5 rounded-full neu-raised text-[10px] text-amber-300 font-mono">
                        RT {item.rtAsal}/RW {item.rwAsal}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px]">
                      Tujuan: <strong className="text-gray-300">{item.kabKotaTujuan}, {item.provinsiTujuan}</strong> ({item.alasanPindah})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-[10px] text-gray-400 font-mono">
                      {item.tanggalPindah}
                    </span>
                    <button
                      type="button"
                      onClick={() => onPrintSurat('PINDAH', item)}
                      className="px-2.5 py-1 rounded-xl neu-button text-[#D4AF37] font-bold text-[11px] flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Cetak SKP</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Datang Section */}
          <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center text-emerald-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8F9FA]">
                    Transaksi Data Datang Terbaru (SKD)
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Penerimaan warga baru yang bertempat tinggal di Bintaro
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('DATANG_TABEL')}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {datangList.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl neu-inset flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs hover:border-emerald-500/30 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F8F9FA]">{item.namaPemohon}</span>
                      <span className="px-2 py-0.5 rounded-full neu-raised text-[10px] text-emerald-300 font-mono">
                        Menuju RT {item.rtTujuan}/RW {item.rwTujuan}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px]">
                      Asal: <strong className="text-gray-300">{item.kabKotaAsal}, {item.provinsiAsal}</strong> ({item.jumlahAnggota} Jiwa)
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-[10px] text-gray-400 font-mono">
                      {item.tanggalDatang}
                    </span>
                    <button
                      type="button"
                      onClick={() => onPrintSurat('DATANG', item)}
                      className="px-2.5 py-1 rounded-xl neu-button text-emerald-300 font-bold text-[11px] flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Cetak SKD</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Jadwal & Informasi Pelayanan (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Jadwal Pelayanan Widget */}
          <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="text-sm font-bold text-[#F8F9FA]">
                  Jadwal Pelayanan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('JADWAL')}
                className="text-[11px] font-bold text-[#D4AF37] hover:underline"
              >
                Semua
              </button>
            </div>

            <div className="space-y-3">
              {jadwalList.slice(0, 3).map((j) => (
                <div
                  key={j.id}
                  className="p-3.5 rounded-2xl neu-inset space-y-1.5 text-xs hover:border-[#D4AF37]/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {j.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{j.tanggal}</span>
                  </div>
                  <h4 className="font-bold text-[#F8F9FA] text-[11px] leading-tight">{j.judul}</h4>
                  <p className="text-gray-400 text-[10px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    <span>{j.lokasi} ({j.waktu})</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Informasi Pengumuman Widget */}
          <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-[#F8F9FA]">
                  Informasi & Regulasi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('INFORMASI')}
                className="text-[11px] font-bold text-sky-400 hover:underline"
              >
                Semua
              </button>
            </div>

            <div className="space-y-3">
              {informasiList.slice(0, 2).map((info) => (
                <div
                  key={info.id}
                  className="p-3.5 rounded-2xl neu-inset space-y-1 text-xs hover:border-sky-500/30 transition-all"
                >
                  <span className="text-[9px] text-[#D4AF37] font-semibold">{info.kategori}</span>
                  <h4 className="font-bold text-[#F8F9FA] text-[11px] leading-tight">{info.judul}</h4>
                  <p className="text-gray-400 text-[10px] line-clamp-2">{info.isi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Galeri Kegiatan Preview Strip */}
      <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center text-amber-400">
              <Images className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#F8F9FA]">
                Dokumentasi & Galeri Pelayanan Bintaro
              </h3>
              <p className="text-[11px] text-gray-400">
                Aktivitas pelayanan jemput bola di 15 wilayah RW
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('GALERI')}
            className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Buka Galeri</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {galeriList.slice(0, 4).map((g) => (
            <div
              key={g.id}
              className="rounded-2xl neu-inset p-1.5 group cursor-pointer overflow-hidden border border-white/5 hover:border-[#D4AF37]/40 transition-all"
              onClick={() => onNavigateTab('GALERI')}
            >
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                <img
                  src={g.imageUrl}
                  alt={g.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[11px] font-bold text-gray-200 truncate mt-2 px-1">
                {g.judul}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
