import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Users, 
  FileCheck2,
  Database,
  GitBranch
} from 'lucide-react';
import { UserAccount, AppBranding } from '../../types';
import { Logo } from '../common/Logo';
import confetti from 'canvas-confetti';

interface LoginFormProps {
  branding: AppBranding;
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ branding, users, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Harap masukkan username dan password');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase()
      );

      if (!foundUser) {
        setErrorMsg('Username tidak ditemukan di database.');
        setIsLoading(false);
        return;
      }

      if (foundUser.isBlocked) {
        setErrorMsg('Akun Anda telah DIBLOKIR oleh Administrator. Silakan hubungi loket Dukcapil.');
        setIsLoading(false);
        return;
      }

      if (foundUser.password && foundUser.password !== password) {
        setErrorMsg('Password salah. Silakan periksa kembali kata sandi Anda.');
        setIsLoading(false);
        return;
      }

      // Trigger celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#0A192F', '#ffffff'],
      });

      setIsLoading(false);
      onLoginSuccess(foundUser);
    }, 600);
  };

  const handleQuickLogin = (account: UserAccount) => {
    setUsername(account.username);
    setPassword(account.password || 'password');
    setErrorMsg('');
  };

  const roleDescriptions: Record<string, { label: string; badge: string; desc: string; icon: any }> = {
    ADMIN: {
      label: 'Administrator',
      badge: 'bg-red-500/20 text-red-300 border-red-500/40',
      desc: 'Ubah, Edit, Hapus, Tambah, Blokir Akun, Input Data, Branding',
      icon: ShieldAlert,
    },
    PETUGAS: {
      label: 'Petugas Loket',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      desc: 'Tambah, Edit, Hapus, Input Data Pindah Datang & Layanan',
      icon: FileCheck2,
    },
    LURAH: {
      label: 'Lurah Bintaro',
      badge: 'bg-amber-500/20 text-[#D4AF37] border-[#D4AF37]/40',
      desc: 'Monitoring & Rekapitulasi seluruh 15 RW se-Kelurahan Bintaro',
      icon: Building2,
    },
    RW: {
      label: 'Ketua RW',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      desc: 'Lihat & Cetak data sesuai Wilayah RW yang mencakup seluruh RT',
      icon: Users,
    },
    RT: {
      label: 'Ketua RT',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      desc: 'Lihat & Cetak data spesifik wilayah RT terdaftar',
      icon: User,
    },
  };

  const filteredPresetUsers = users.filter((u) => {
    if (selectedRoleFilter === 'ALL') return true;
    return u.role === selectedRoleFilter;
  });

  return (
    <div
      id="sipintar-login-container"
      className="min-h-screen w-full bg-[#0A192F] relative flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden"
    >
      {/* Background Animated Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#183358]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(10,25,47,0.8),#060e1b)] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Left / Top Information & Branding Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-8 rounded-3xl neu-raised-lg border border-[#D4AF37]/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />
            
            <Logo branding={branding} size="xl" />

            <div className="mt-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neu-inset text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pelayanan Pindah Datang Terpadu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8F9FA] tracking-tight">
                Kelurahan <span className="text-[#D4AF37]">Bintaro</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Kecamatan Pesanggrahan, Kota Administrasi Jakarta Selatan. Melayani perpindahan penduduk WNI secara cepat, transparan, dan terintegrasi multilevel.
              </p>
            </div>

            {/* Quick stats mini chips */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
              <div className="p-3 rounded-2xl neu-inset">
                <p className="text-xs text-gray-400">Total Rukun Warga</p>
                <p className="text-xl font-bold text-[#D4AF37]">15 RW</p>
              </div>
              <div className="p-3 rounded-2xl neu-inset">
                <p className="text-xs text-gray-400">Total Rukun Tetangga</p>
                <p className="text-xl font-bold text-[#F8F9FA]">143 RT</p>
              </div>
            </div>

            {/* MySQL and GitHub connectivity badges */}
            <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-400">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <Database className="w-3.5 h-3.5" /> MySQL Database
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-sky-400">
                <GitBranch className="w-3.5 h-3.5" /> GitHub Sync Ready
              </span>
            </div>
          </div>
        </div>

        {/* Right / Login Form Card */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl neu-raised-lg border border-[#D4AF37]/30 shadow-2xl relative">
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-[#F8F9FA] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#D4AF37]" />
                  <span>Portal Masuk Sistem</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Gunakan kredensial akun sesuai level kewenangan Anda
                </p>
              </div>
              <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg neu-inset text-[#D4AF37] border border-[#D4AF37]/30">
                2026 EDITION
              </span>
            </div>

            {/* Quick Demo Role Picker Tabs */}
            <div className="my-5">
              <p className="text-xs font-semibold text-gray-300 mb-2 flex items-center justify-between">
                <span>PILIH AKUN DEMO MULTILEVEL (Sekali Klik):</span>
                <span className="text-[10px] text-[#D4AF37]">15 RW & 143 RT Aktif</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {['ALL', 'ADMIN', 'PETUGAS', 'LURAH', 'RW', 'RT'].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRoleFilter(role)}
                    className={`px-3 py-1 text-xs rounded-xl font-medium transition-all ${
                      selectedRoleFilter === role
                        ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/50'
                        : 'neu-button text-gray-300 hover:text-white'
                    }`}
                  >
                    {role === 'ALL' ? 'Semua' : role}
                  </button>
                ))}
              </div>

              {/* Horizontal Scrollable Preset User Chips */}
              <div className="flex gap-2 overflow-x-auto py-2.5 mt-2 scrollbar-thin">
                {filteredPresetUsers.map((preset) => {
                  const roleMeta = roleDescriptions[preset.role] || roleDescriptions.PETUGAS;
                  const isSelected = username === preset.username;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleQuickLogin(preset)}
                      className={`flex-shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all text-left ${
                        isSelected
                          ? 'neu-inset border border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                          : 'neu-button hover:border-white/20'
                      }`}
                    >
                      <img
                        src={preset.photoUrl}
                        alt={preset.fullName}
                        className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]/40"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-gray-200 flex items-center gap-1.5">
                          <span>{preset.fullName.split(' ')[0]}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold border ${roleMeta.badge}`}
                          >
                            {preset.role} {preset.rwNumber ? `RW ${preset.rwNumber}` : ''}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-mono">
                          user: {preset.username}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 rounded-2xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form id="sipintar-login-form" onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  USERNAME
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username (contoh: admin, petugas, lurah, rw05, rt03rw05)"
                    className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl neu-inset neu-inset-focus text-gray-100 placeholder-gray-500 transition-all font-sans"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  PASSWORD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D4AF37]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi akun"
                    className="w-full pl-10 pr-11 py-3 text-sm rounded-2xl neu-inset neu-inset-focus text-gray-100 placeholder-gray-500 transition-all font-sans"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#D4AF37] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl neu-button-gold flex items-center justify-center gap-2 cursor-pointer font-bold tracking-wide transition-all shadow-lg active:scale-[0.99] disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin" />
                    <span>MEMVERIFIKASI...</span>
                  </div>
                ) : (
                  <>
                    <span>LOGIN KE SIPINTAR</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Multilevel Permission Matrix Legend */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-[11px] font-semibold text-gray-400 mb-2">
                HAK AKSES MULTILEVEL PENGGUNA:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-300">
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Administrator:</strong> Ubah, Edit, Hapus, Tambah, Blokir, Input Data</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Petugas:</strong> Tambah, Edit, Hapus, Input Data</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Lurah:</strong> Monitoring Sesuai Wilayah 15 RW</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>RT & RW:</strong> Lihat & Cetak Wilayah RT/RW Masing-Masing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
