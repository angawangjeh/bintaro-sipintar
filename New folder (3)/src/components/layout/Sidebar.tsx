import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  UserMinus, 
  UserPlus, 
  FileText, 
  CalendarClock, 
  Newspaper, 
  Building, 
  Users2, 
  Contact2, 
  BarChart3, 
  CreditCard, 
  MessageSquareText, 
  Image as ImageIcon, 
  UserCog, 
  LogOut, 
  ChevronDown, 
  ChevronRight, 
  ShieldAlert, 
  Settings, 
  Database,
  PlusCircle,
  X
} from 'lucide-react';
import { UserAccount, AppBranding, NavTab } from '../../types';
import { Logo } from '../common/Logo';

export type ActiveTab = NavTab;

interface SidebarProps {
  currentTab?: NavTab;
  activeTab?: NavTab;
  onSelectTab?: (tab: NavTab) => void;
  setActiveTab?: (tab: NavTab) => void;
  currentUser: UserAccount;
  branding: AppBranding;
  isOpen: boolean;
  onClose?: () => void;
  onCloseMobile?: () => void;
  onLogout?: () => void;
  pindahCount?: number;
  datangCount?: number;
  onOpenBranding?: () => void;
  onOpenBrandingModal?: () => void;
  onOpenDatabaseSync?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  activeTab,
  onSelectTab,
  setActiveTab,
  currentUser,
  branding,
  isOpen,
  onClose,
  onCloseMobile,
  onLogout,
  pindahCount = 0,
  datangCount = 0,
  onOpenBranding,
  onOpenBrandingModal,
  onOpenDatabaseSync,
}) => {
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(true);
  const isAdmin = currentUser.role === 'ADMIN';
  const isPetugasOrAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'PETUGAS';

  const selectedTab: NavTab = currentTab || activeTab || 'DASHBOARD';

  const handleClose = () => {
    if (onCloseMobile) onCloseMobile();
    else if (onClose) onClose();
  };

  const handleNavClick = (tab: NavTab) => {
    if (onSelectTab) {
      onSelectTab(tab);
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
    if (window.innerWidth < 1024) {
      handleClose();
    }
  };

  const handleOpenBrandingClick = () => {
    if (onOpenBranding) onOpenBranding();
    else if (onOpenBrandingModal) onOpenBrandingModal();
    else handleNavClick('BRANDING');
  };

  const handleOpenDatabaseSyncClick = () => {
    if (onOpenDatabaseSync) onOpenDatabaseSync();
    else handleNavClick('DATABASE_SYNC');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="sipintar-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0A192F] border-r border-[#D4AF37]/20 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-[6px_0_20px_rgba(0,0,0,0.5)]`}
      >
        {/* Sidebar Header with Logo & Title */}
        <div className="p-5 border-b border-[#D4AF37]/20 relative">
          <div className="flex items-center justify-between">
            <Logo branding={branding} size="md" showSubtitle={true} />
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg neu-button text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Branding customizer quick button */}
          {isAdmin && (
            <button
              id="btn-edit-branding-sidebar"
              type="button"
              onClick={onOpenBrandingModal}
              className="mt-3 w-full py-1.5 px-3 rounded-xl neu-button text-[11px] text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5 border border-[#D4AF37]/30 hover:border-[#D4AF37]"
            >
              <Settings className="w-3 h-3 text-[#D4AF37]" />
              <span>Ubah Logo & Kop SIPINTAR</span>
            </button>
          )}
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 scrollbar-thin">
          {/* 1. Dashboard */}
          <button
            id="nav-dashboard"
            type="button"
            onClick={() => handleNavClick('DASHBOARD')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
              selectedTab === 'DASHBOARD'
                ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                : 'text-gray-300 hover:text-white neu-button'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
            <span className="flex-1">Beranda / Dashboard</span>
          </button>

          {/* 2. Data Pindah */}
          <button
            id="nav-pindah-list"
            type="button"
            onClick={() => handleNavClick('PINDAH_TABEL')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
              selectedTab === 'PINDAH_TABEL'
                ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/50'
                : 'text-gray-300 hover:text-white neu-button'
            }`}
          >
            <div className="flex items-center gap-3">
              <UserMinus className="w-4 h-4 text-amber-400" />
              <span>Data Pindah (SKP)</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] rounded-full neu-inset text-amber-300 font-extrabold border border-amber-500/30">
              {pindahCount}
            </span>
          </button>

          {/* 3. Data Datang */}
          <button
            id="nav-datang-list"
            type="button"
            onClick={() => handleNavClick('DATANG_TABEL')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
              selectedTab === 'DATANG_TABEL'
                ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/50'
                : 'text-gray-300 hover:text-white neu-button'
            }`}
          >
            <div className="flex items-center gap-3">
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>Data Datang (SKD)</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] rounded-full neu-inset text-emerald-300 font-extrabold border border-emerald-500/30">
              {datangCount}
            </span>
          </button>

          {/* 4. MASTER DATA & INPUT SECTION (Collapsible) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider hover:text-gray-200 transition-colors"
            >
              <span>MASTER & INPUT DATA</span>
              {isMasterDataOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              )}
            </button>

            {isMasterDataOpen && (
              <div className="space-y-1 pl-2 pt-1">
                {/* Input Data Pindah */}
                {isPetugasOrAdmin && (
                  <button
                    id="nav-input-pindah"
                    type="button"
                    onClick={() => handleNavClick('PINDAH_INPUT')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      selectedTab === 'PINDAH_INPUT'
                        ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Input Data Pindah</span>
                  </button>
                )}

                {/* Input Data Datang */}
                {isPetugasOrAdmin && (
                  <button
                    id="nav-input-datang"
                    type="button"
                    onClick={() => handleNavClick('DATANG_INPUT')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      selectedTab === 'DATANG_INPUT'
                        ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Input Data Datang</span>
                  </button>
                )}

                {/* Input Jadwal Pelayanan */}
                <button
                  id="nav-input-jadwal"
                  type="button"
                  onClick={() => handleNavClick('JADWAL')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'JADWAL'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <CalendarClock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Jadwal Pelayanan Mobile</span>
                </button>

                {/* Input Informasi */}
                <button
                  id="nav-input-informasi"
                  type="button"
                  onClick={() => handleNavClick('INFORMASI')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'INFORMASI'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  <span>Informasi & Berita</span>
                </button>

                {/* Data RT dan RW (15 RW, 143 RT) */}
                <button
                  id="nav-master-rt-rw"
                  type="button"
                  onClick={() => handleNavClick('MASTER_RW_RT')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'MASTER_RW_RT'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Daftar RT & RW (15 RW / 143 RT)</span>
                </button>

                {/* Input Jumlah Penduduk */}
                <button
                  id="nav-input-penduduk"
                  type="button"
                  onClick={() => handleNavClick('STAT_PENDUDUK')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'STAT_PENDUDUK'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Jumlah Penduduk</span>
                </button>

                {/* Input Wajib KTP */}
                <button
                  id="nav-input-ktp"
                  type="button"
                  onClick={() => handleNavClick('STAT_KTP')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'STAT_KTP'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-pink-400" />
                  <span>Wajib KTP</span>
                </button>

                {/* Input Running Text */}
                <button
                  id="nav-input-running-text"
                  type="button"
                  onClick={() => handleNavClick('RUNNING_TEXT')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'RUNNING_TEXT'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <MessageSquareText className="w-3.5 h-3.5 text-amber-300" />
                  <span>Running Text Header</span>
                </button>

                {/* Input Galeri Pelayanan */}
                <button
                  id="nav-input-galeri"
                  type="button"
                  onClick={() => handleNavClick('GALERI')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                    selectedTab === 'GALERI'
                      ? 'neu-inset text-[#D4AF37] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
                  <span>Galeri Pelayanan</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. USER MANAGEMENT & SETTINGS (Admin Only) */}
          {isAdmin && (
            <div className="pt-2 border-t border-white/5">
              <p className="px-3.5 py-1 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                ADMINISTRATOR ONLY
              </p>
              <button
                id="nav-user-management"
                type="button"
                onClick={() => handleNavClick('USERS')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                  selectedTab === 'USERS'
                    ? 'neu-button-active text-red-300 border border-red-500/50'
                    : 'text-gray-300 hover:text-white neu-button'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span className="flex-1">Manajemen Pengguna (Blokir/Edit)</span>
              </button>
            </div>
          )}

          {/* 6. MySQL Database & GitHub Connector */}
          <div className="pt-2 border-t border-white/5">
            <button
              id="nav-database-mysql"
              type="button"
              onClick={handleOpenDatabaseSyncClick}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left ${
                selectedTab === 'DATABASE_SYNC'
                  ? 'neu-button-active text-emerald-300 border border-emerald-500/50'
                  : 'text-gray-300 hover:text-white neu-button'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="flex-1">Database MySQL & GitHub</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer: My Account & Logout */}
        <div className="p-3.5 border-t border-[#D4AF37]/20 bg-[#040d1a] space-y-2">
          {/* My Account */}
          <button
            id="nav-akun-saya"
            type="button"
            onClick={() => handleNavClick('MY_ACCOUNT')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
              selectedTab === 'MY_ACCOUNT'
                ? 'neu-inset text-[#D4AF37] border border-[#D4AF37]/40'
                : 'text-white/70 neu-button hover:text-white'
            }`}
          >
            <img
              src={currentUser.photoUrl}
              alt={currentUser.fullName}
              className="w-6 h-6 rounded-full object-cover border border-[#D4AF37]"
            />
            <div className="flex-1 truncate">
              <p className="truncate text-xs font-bold text-gray-200 leading-none">
                Akun Saya
              </p>
              <p className="text-[10px] text-white/50 font-normal mt-0.5">
                Ubah Password & Foto
              </p>
            </div>
            <UserCog className="w-4 h-4 text-white/40" />
          </button>

          {/* Logout button */}
          <button
            id="nav-logout-btn"
            type="button"
            onClick={onLogout}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-[#040d1a] border border-red-500/20 text-red-400 hover:bg-red-500/10 cursor-pointer transition-all flex items-center justify-center gap-2 shadow-[4px_4px_8px_#040d1a,-4px_-4px_8px_#102544]"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
