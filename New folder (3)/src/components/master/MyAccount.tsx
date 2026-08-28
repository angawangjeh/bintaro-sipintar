import React, { useState } from 'react';
import { 
  User, 
  Upload, 
  KeyRound, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Building2
} from 'lucide-react';
import { UserAccount } from '../../types';

interface MyAccountProps {
  currentUser: UserAccount;
  onUpdateUser: (updated: Partial<UserAccount>) => void;
}

export const MyAccount: React.FC<MyAccountProps> = ({
  currentUser,
  onUpdateUser,
}) => {
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [photoUrl, setPhotoUrl] = useState(currentUser.avatarUrl || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // File upload reader
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Ukuran foto profil maksimal 2MB' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setPhotoUrl(base64);
        setMessage({ type: 'success', text: 'Foto berhasil dimuat. Klik Simpan Perubahan untuk memperbarui akun.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (password) {
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Password Baru dan Konfirmasi Password tidak cocok!' });
        return;
      }
      if (password.length < 6) {
        setMessage({ type: 'error', text: 'Password minimal 6 karakter!' });
        return;
      }
    }

    const updates: Partial<UserAccount> = {
      fullName,
      email,
      phone,
      avatarUrl: photoUrl,
    };

    if (password) {
      updates.password = password;
    }

    onUpdateUser(updates);
    setPassword('');
    setConfirmPassword('');
    setMessage({ type: 'success', text: 'Profil akun Anda berhasil diperbarui dan disimpan!' });
  };

  return (
    <div id="my-account-container" className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-3xl neu-raised border border-[#D4AF37]/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F8F9FA]">
              Pengaturan Akun Saya
            </h2>
            <p className="text-xs text-gray-400">
              Kelola foto profil, identitas, dan kata sandi akun {currentUser.role}
            </p>
          </div>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl neu-inset text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
          ROLE: {currentUser.role} {currentUser.rwNumber && `(RW ${currentUser.rwNumber})`} {currentUser.rtNumber && `(RT ${currentUser.rtNumber})`}
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-2.5 animate-in fade-in ${
            message.type === 'success'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-red-500/20 border-red-500/40 text-red-300'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Photo & Role Badge */}
        <div className="p-6 rounded-3xl neu-raised border border-white/5 space-y-4 text-center flex flex-col items-center justify-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl neu-inset p-1.5 border border-[#D4AF37]/30 overflow-hidden mx-auto flex items-center justify-center bg-[#071322]">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={currentUser.fullName}
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-16 h-16 text-[#D4AF37]" />
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#F8F9FA]">{currentUser.fullName}</h3>
            <p className="text-xs text-gray-400 font-mono">@{currentUser.username}</p>
          </div>

          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              id="user-photo-upload"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <label
              htmlFor="user-photo-upload"
              className="w-full py-2.5 px-4 rounded-xl neu-button text-xs font-bold text-[#D4AF37] flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <Upload className="w-4 h-4" />
              <span>UNGGAH FOTO PROFIL</span>
            </label>
            <p className="text-[10px] text-gray-500 mt-1.5">Maksimal 2MB (PNG / JPG)</p>
          </div>
        </div>

        {/* Right Column: Profile Info & Change Password */}
        <div className="md:col-span-2 p-6 rounded-3xl neu-raised border border-white/5 space-y-6">
          {/* Section: Identitas Akun */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Identitas Pengguna
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">USERNAME (LOGIN)</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.username}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset bg-black/40 text-gray-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">NAMA LENGKAP & GELAR</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">ALAMAT EMAIL</label>
                <input
                  type="email"
                  value={email}
                  placeholder="admin.bintaro@jakarta.go.id"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">NO. TELEPON / WHATSAPP</label>
                <input
                  type="text"
                  value={phone}
                  placeholder="0812xxxxxxxx"
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section: Ubah Password */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" /> Ubah Kata Sandi (Password)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">PASSWORD BARU</label>
                <input
                  type="password"
                  placeholder="Kosongkan jika tidak ingin diubah"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">KONFIRMASI PASSWORD BARU</label>
                <input
                  type="password"
                  placeholder="Ketik ulang password baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end">
            <button
              type="submit"
              className="py-3 px-8 rounded-2xl neu-button-gold text-xs font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>SIMPAN PERUBAHAN AKUN</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
