import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldAlert, 
  Edit3, 
  Trash2, 
  Ban, 
  CheckCircle, 
  KeyRound, 
  Search, 
  UserCheck,
  Lock,
  Unlock
} from 'lucide-react';
import { UserAccount, UserRole } from '../../types';

interface UserManagementProps {
  users: UserAccount[];
  currentUser: UserAccount;
  onSaveUser: (user: UserAccount) => void;
  onDeleteUser: (id: string) => void;
  onToggleBlockUser: (id: string) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({
  users,
  currentUser,
  onSaveUser,
  onDeleteUser,
  onToggleBlockUser,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Partial<UserAccount>>({
    username: '',
    password: '',
    fullName: '',
    role: 'PETUGAS',
    email: '',
    phone: '',
    isActive: true,
    rwNumber: '01',
    rtNumber: '001',
  });

  const displayedUsers = users.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email && u.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleOpenNewUser = () => {
    setEditingUser({
      id: `usr-${Date.now()}`,
      username: '',
      password: '',
      fullName: '',
      role: 'PETUGAS',
      email: '',
      phone: '',
      isActive: true,
      rwNumber: '01',
      rtNumber: '001',
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: UserAccount) => {
    setEditingUser({ ...user });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser.username || !editingUser.fullName) return;

    onSaveUser(editingUser as UserAccount);
    setIsModalOpen(false);
  };

  const roleColors: Record<UserRole, string> = {
    ADMIN: 'bg-red-500/20 text-red-300 border-red-500/40',
    PETUGAS: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    LURAH: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    RW: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    RT: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  };

  return (
    <div id="user-management-container" className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl neu-raised border border-[#D4AF37]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-red-400 border border-red-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F8F9FA] flex items-center gap-2">
              <span>Manajemen Akun Pengguna (Multilevel)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full neu-inset text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                {users.length} Akun
              </span>
            </h2>
            <p className="text-xs text-gray-400">
              Hak Akses: Administrator (Ubah, Edit, Hapus, Tambah, Blokir Akun, Input Data)
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenNewUser}
          className="py-2.5 px-5 rounded-2xl neu-button-gold text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-transform"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ TAMBAH AKUN BARU</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama pengguna, username, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 placeholder-gray-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3.5 py-2.5 text-xs rounded-2xl neu-inset neu-inset-focus text-gray-200 font-sans cursor-pointer"
        >
          <option value="ALL">Semua Tingkat Role</option>
          <option value="ADMIN">Administrator</option>
          <option value="PETUGAS">Petugas Pelayanan</option>
          <option value="LURAH">Lurah Bintaro</option>
          <option value="RW">Ketua RW</option>
          <option value="RT">Ketua RT</option>
        </select>
      </div>

      {/* Table of Users */}
      <div className="rounded-3xl neu-raised border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#0c1c33] text-gray-300 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 text-center">No</th>
                <th className="py-3.5 px-4">Pengguna</th>
                <th className="py-3.5 px-4">Username</th>
                <th className="py-3.5 px-4">Hak Akses (Role)</th>
                <th className="py-3.5 px-4">Wilayah Tugas</th>
                <th className="py-3.5 px-4 text-center">Status Akun</th>
                <th className="py-3.5 px-4 text-center">Aksi Administrator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              {displayedUsers.map((u, idx) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 px-4 text-center font-mono text-gray-400">
                    {idx + 1}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors">
                      {u.fullName}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {u.email || u.phone || '-'}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-300 font-semibold">
                    @{u.username}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        roleColors[u.role] || 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {u.role === 'ADMIN' && <span className="text-gray-400">Seluruh Sistem</span>}
                    {u.role === 'PETUGAS' && <span className="text-blue-300">Loket Pelayanan</span>}
                    {u.role === 'LURAH' && <span className="text-amber-300">15 RW Kel. Bintaro</span>}
                    {u.role === 'RW' && <span className="text-emerald-300 font-semibold">Wilayah RW {u.rwNumber}</span>}
                    {u.role === 'RT' && <span className="text-purple-300 font-semibold">RT {u.rtNumber} / RW {u.rwNumber}</span>}
                  </td>

                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-red-500/20 text-red-300 border-red-500/40'
                      }`}
                    >
                      {u.isActive ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span>Aktif</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 text-red-400" />
                          <span>DIBLOKIR</span>
                        </>
                      )}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Blokir / Buka Blokir */}
                      <button
                        type="button"
                        onClick={() => onToggleBlockUser(u.id)}
                        disabled={u.id === currentUser.id}
                        className={`p-1.5 rounded-lg neu-button ${
                          u.isActive
                            ? 'text-amber-400 hover:text-amber-300'
                            : 'text-emerald-400 hover:text-emerald-300'
                        } disabled:opacity-30 disabled:cursor-not-allowed`}
                        title={u.isActive ? 'Blokir Akun' : 'Buka Blokir Akun'}
                      >
                        {u.isActive ? <Ban className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      </button>

                      {/* Edit Akun */}
                      <button
                        type="button"
                        onClick={() => handleEditUser(u)}
                        className="p-1.5 rounded-lg neu-button text-blue-300 hover:text-blue-200"
                        title="Edit Data Akun"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Hapus Akun */}
                      <button
                        type="button"
                        onClick={() => onDeleteUser(u.id)}
                        disabled={u.id === currentUser.id}
                        className="p-1.5 rounded-lg neu-button text-red-400 hover:text-red-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Hapus Akun"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#D4AF37]" />
              <span>{editingUser.id ? 'Ubah Akun Pengguna' : 'Tambah Akun Multilevel Baru'}</span>
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">USERNAME LOGIN</label>
                  <input
                    type="text"
                    value={editingUser.username || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value.toLowerCase() })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="nama.user"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">PASSWORD</label>
                  <input
                    type="text"
                    value={editingUser.password || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="Kata Sandi"
                    required={!editingUser.id}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">NAMA LENGKAP & JABATAN</label>
                <input
                  type="text"
                  value={editingUser.fullName || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  placeholder="Contoh: Dra. Hj. Siti Aminah, M.Si"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">TINGKATAN ROLE</label>
                  <select
                    value={editingUser.role || 'PETUGAS'}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  >
                    <option value="ADMIN">Administrator (Full Access)</option>
                    <option value="PETUGAS">Petugas Loket (Input/Edit)</option>
                    <option value="LURAH">Lurah (Lihat 15 RW)</option>
                    <option value="RW">Ketua RW (Lihat Wilayah RW)</option>
                    <option value="RT">Ketua RT (Lihat Wilayah RT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">STATUS AKUN</label>
                  <select
                    value={editingUser.isActive ? 'true' : 'false'}
                    onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  >
                    <option value="true">Aktif</option>
                    <option value="false">Blokir Akun</option>
                  </select>
                </div>
              </div>

              {/* Conditional Wilayah Assignment for RT and RW */}
              {(editingUser.role === 'RW' || editingUser.role === 'RT') && (
                <div className="p-3.5 rounded-2xl neu-inset border border-emerald-500/30 space-y-3">
                  <p className="text-[11px] font-bold text-[#D4AF37]">Penetapan Wilayah Kewenangan:</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">NOMOR RW (1-15)</label>
                      <select
                        value={editingUser.rwNumber || '01'}
                        onChange={(e) => setEditingUser({ ...editingUser, rwNumber: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl neu-inset text-gray-200 font-mono"
                      >
                        {Array.from({ length: 15 }, (_, i) => String(i + 1).padStart(2, '0')).map((rw) => (
                          <option key={rw} value={rw}>
                            RW {rw}
                          </option>
                        ))}
                      </select>
                    </div>

                    {editingUser.role === 'RT' && (
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">NOMOR RT</label>
                        <input
                          type="text"
                          value={editingUser.rtNumber || '001'}
                          onChange={(e) => setEditingUser({ ...editingUser, rtNumber: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl neu-inset text-gray-200 font-mono"
                          placeholder="001 - 012"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">EMAIL</label>
                  <input
                    type="email"
                    value={editingUser.email || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                    placeholder="email@jakarta.go.id"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">NO. TELEPON</label>
                  <input
                    type="text"
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 font-mono"
                    placeholder="0812xxxxxxxx"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl neu-button text-xs font-bold text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl neu-button-gold text-xs font-bold"
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
