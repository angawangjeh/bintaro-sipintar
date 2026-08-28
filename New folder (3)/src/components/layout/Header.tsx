import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Bell, 
  LogOut, 
  User, 
  ChevronDown, 
  ShieldAlert, 
  Sparkles, 
  Menu, 
  Sun, 
  Moon, 
  Sunset, 
  Sunrise,
  Database,
  GitBranch,
  FileSpreadsheet
} from 'lucide-react';
import { UserAccount, RunningTextItem, AppBranding } from '../../types';

interface HeaderProps {
  currentUser: UserAccount;
  runningTexts: RunningTextItem[];
  branding: AppBranding;
  onOpenSidebar?: () => void;
  onToggleSidebar?: () => void;
  onOpenMyAccount: () => void;
  onOpenDatabaseSync?: () => void;
  onOpenBranding?: () => void;
  onLogout: () => void;
  allUsers?: UserAccount[];
  onSwitchUser?: (user: UserAccount) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  runningTexts,
  branding,
  onOpenSidebar,
  onToggleSidebar,
  onOpenMyAccount,
  onOpenDatabaseSync,
  onOpenBranding,
  onLogout,
  allUsers = [],
  onSwitchUser,
}) => {
  const [time, setTime] = useState<Date>(new Date());
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState<{ text: string; icon: any }>({
    text: 'Selamat Pagi',
    icon: Sunrise,
  });

  const handleSidebarToggle = () => {
    if (onToggleSidebar) onToggleSidebar();
    else if (onOpenSidebar) onOpenSidebar();
  };

  // Update clock every second & compute auto-greeting
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      setTime(now);

      const hour = now.getHours();
      if (hour >= 4 && hour < 11) {
        setGreeting({ text: 'Selamat Pagi', icon: Sunrise });
      } else if (hour >= 11 && hour < 15) {
        setGreeting({ text: 'Selamat Siang', icon: Sun });
      } else if (hour >= 15 && hour < 18) {
        setGreeting({ text: 'Selamat Sore', icon: Sunset });
      } else {
        setGreeting({ text: 'Selamat Malam', icon: Moon });
      }
    };

    updateTimeAndGreeting();
    const timer = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter active running texts
  const activeMarquee = runningTexts
    .filter((r) => r.status === 'Aktif')
    .sort((a, b) => a.urutan - b.urutan)
    .map((r) => r.teks)
    .join('  •  ') || 'Selamat Datang di SIPINTAR Bintaro (Sistem Informasi Pindah Datang)';

  // Format Indonesian date
  const formattedDate = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' WIB';

  const GreetingIcon = greeting.icon;

  const roleBadges: Record<string, { label: string; bg: string; border: string }> = {
    ADMIN: { label: 'Administrator', bg: 'bg-red-500/20 text-red-300', border: 'border-red-500/40' },
    PETUGAS: { label: 'Petugas Dukcapil', bg: 'bg-blue-500/20 text-blue-300', border: 'border-blue-500/40' },
    LURAH: { label: 'Lurah Bintaro', bg: 'bg-[#D4AF37]/20 text-[#D4AF37]', border: 'border-[#D4AF37]/40' },
    RW: { label: `Ketua RW ${currentUser.rwNumber || ''}`, bg: 'bg-emerald-500/20 text-emerald-300', border: 'border-emerald-500/40' },
    RT: { label: `Ketua RT ${currentUser.rtNumber || ''} / RW ${currentUser.rwNumber || ''}`, bg: 'bg-purple-500/20 text-purple-300', border: 'border-purple-500/40' },
  };

  const badgeInfo = roleBadges[currentUser.role] || roleBadges.PETUGAS;

  return (
    <header
      id="sipintar-header"
      className="sticky top-0 z-30 w-full bg-[#0A192F]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-md"
    >
      {/* Top Bar: Running Text Ticker */}
      <div className="bg-[#060e1b] py-1.5 px-4 border-b border-white/5 flex items-center gap-3 overflow-hidden">
        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>INFO TERKINI</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full text-xs text-gray-300">
          <div className="animate-marquee hover:pause font-medium">
            {activeMarquee}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left side: Hamburger for Mobile + Auto Salam & DateTime */}
        <div className="flex items-center gap-4">
          <button
            id="mobile-sidebar-toggle-btn"
            type="button"
            onClick={handleSidebarToggle}
            className="lg:hidden p-2 rounded-xl neu-button text-[#D4AF37] hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Automatic Greeting & Digital Clock */}
          <div>
            <div className="flex items-center gap-2">
              <GreetingIcon className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <h2 className="text-sm sm:text-base font-bold text-[#F8F9FA] flex items-center gap-1.5">
                <span>{greeting.text},</span>
                <span className="text-[#D4AF37] font-extrabold truncate max-w-[160px] sm:max-w-[220px]">
                  {currentUser.fullName.split(' ')[0]}
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                <span className="hidden sm:inline">{formattedDate}</span>
                <span className="sm:hidden">{time.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono text-[#D4AF37]">
                <Clock className="w-3 h-3" />
                <span>{formattedTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Database / GitHub Sync Tools + User Profile Widget */}
        <div className="flex items-center gap-3">
          {/* Quick Database / MySQL / GitHub Export Button */}
          <button
            id="header-db-sync-btn"
            type="button"
            onClick={onOpenDatabaseSync}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl neu-button text-xs font-semibold text-emerald-300 border border-emerald-500/30 hover:border-emerald-400"
            title="Database MySQL & GitHub Connection Tools"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">MySQL & GitHub</span>
          </button>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              id="header-user-menu-btn"
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-3 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl neu-raised-sm border border-white/5 hover:border-[#D4AF37]/30 transition-all text-left"
            >
              <div className="relative">
                <img
                  src={currentUser.photoUrl}
                  alt={currentUser.fullName}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0A192F] rounded-full" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-[#F8F9FA] leading-tight truncate max-w-[150px]">
                  {currentUser.fullName}
                </p>
                <span
                  className={`inline-block text-[10px] px-2 py-0.2 rounded-full font-bold border mt-0.5 ${badgeInfo.bg} ${badgeInfo.border}`}
                >
                  {badgeInfo.label}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div
                id="header-profile-dropdown"
                className="absolute right-0 mt-2 w-72 rounded-2xl neu-raised-lg border border-[#D4AF37]/30 shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="p-3 border-b border-white/10 mb-2">
                  <p className="font-bold text-[#F8F9FA] text-sm">{currentUser.fullName}</p>
                  <p className="text-gray-400 font-mono text-[11px] mt-0.5">@{currentUser.username}</p>
                  <div className="mt-2 inline-block px-2.5 py-0.5 rounded-lg neu-inset text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                    LEVEL: {currentUser.role} {currentUser.rwNumber ? `(RW ${currentUser.rwNumber})` : ''}
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenMyAccount();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-200 hover:bg-[#183358] hover:text-[#D4AF37] transition-all text-left"
                  >
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <span>Akun Saya & Ubah Password</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenDatabaseSync();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-200 hover:bg-[#183358] hover:text-emerald-300 transition-all text-left"
                  >
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>Export MySQL & GitHub Repo</span>
                  </button>
                </div>

                {/* Quick Switch Role preview */}
                <div className="mt-2 pt-2 border-t border-white/10">
                  <p className="text-[10px] font-semibold text-gray-400 px-3 py-1">GANTI PENGGUNA CEPAT:</p>
                  <div className="max-h-36 overflow-y-auto space-y-1 scrollbar-thin">
                    {allUsers.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          onSwitchUser(u);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] transition-all ${
                          u.id === currentUser.id
                            ? 'neu-inset text-[#D4AF37] font-bold'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{u.fullName.split(' ')[0]}</span>
                        <span className="text-[9px] opacity-70">({u.role})</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-white/10">
                  <button
                    id="header-logout-btn"
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/15 transition-all text-left font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar / Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
