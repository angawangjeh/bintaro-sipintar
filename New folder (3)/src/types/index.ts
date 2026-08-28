export type UserRole = 'ADMIN' | 'PETUGAS' | 'LURAH' | 'RW' | 'RT';

export type NavTab = 
  | 'DASHBOARD'
  | 'PINDAH_TABEL'
  | 'PINDAH_INPUT'
  | 'DATANG_TABEL'
  | 'DATANG_INPUT'
  | 'JADWAL'
  | 'INFORMASI'
  | 'MASTER_RW_RT'
  | 'STAT_PENDUDUK'
  | 'STAT_KTP'
  | 'RUNNING_TEXT'
  | 'GALERI'
  | 'USERS'
  | 'BRANDING'
  | 'MY_ACCOUNT'
  | 'DATABASE_SYNC';

export interface UserAccount {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  role: UserRole;
  rwNumber?: string; // e.g. "05"
  rtNumber?: string; // e.g. "003"
  photoUrl?: string;
  avatarUrl?: string;
  isBlocked?: boolean;
  isActive?: boolean;
  phone?: string;
  email?: string;
  nik?: string;
  createdAt: string;
}

export interface DataPindah {
  id: string;
  noSurat: string;
  tanggalPindah: string;
  namaKepalaKeluarga: string;
  nik: string;
  alamatAsal: string;
  rtAsal: string;
  rwAsal: string;
  kelurahanAsal: string; // BINTARO
  kecamatanAsal: string; // PESANGGRAHAN
  alasanPindah: string;
  alamatTujuan: string;
  rtTujuan: string;
  rwTujuan: string;
  kabKotaTujuan: string;
  provinsiTujuan: string;
  jenisKepindahan: 'Kepala Keluarga' | 'Seluruh Anggota Keluarga' | 'Kepala dan Sebagian Anggota' | 'Anggota Keluarga';
  jumlahAnggota: number;
  anggotaList?: { nama: string; nik: string; shdk: string }[];
  status: 'Diproses' | 'Disetujui' | 'Selesai' | 'Ditolak';
  keterangan?: string;
  createdAt: string;
}

export interface DataDatang {
  id: string;
  noSurat: string;
  tanggalDatang: string;
  namaPemohon: string;
  nik: string;
  alamatAsal: string;
  kabKotaAsal: string;
  provinsiAsal: string;
  alamatTujuan: string;
  rtTujuan: string;
  rwTujuan: string;
  kelurahanTujuan: string; // BINTARO
  kecamatanTujuan: string; // PESANGGRAHAN
  alasanDatang: string;
  jumlahAnggota: number;
  anggotaList?: { nama: string; nik: string; shdk: string }[];
  status: 'Diproses' | 'Disetujui' | 'Selesai' | 'Ditolak';
  keterangan?: string;
  createdAt: string;
}

export interface JadwalPelayanan {
  id: string;
  judul: string;
  tanggal: string;
  waktu: string;
  isi: string;
  lokasi: string;
  keterangan: string;
  status: 'Aktif' | 'Terjadwal' | 'Selesai';
  penanggungJawab?: string;
}

export interface InformasiBerita {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  keterangan: string;
  status: 'Aktif' | 'Draft' | 'Arsip';
  kategori: 'Pengumuman' | 'Layanan' | 'Kependudukan' | 'Sosialisasi';
}

export interface DataRT {
  id: string;
  nama: string;
  nik: string;
  rt: string; // e.g. "003"
  rw: string; // e.g. "05"
  keterangan: string;
  noHp: string;
  alamatSekretariat: string;
  jumlahKK: number;
  jumlahJiwa: number;
}

export interface DataRW {
  id: string;
  nama: string;
  nik: string;
  rw: string; // e.g. "01" .. "15"
  keterangan: string;
  noHp: string;
  alamatSekretariat: string;
  jumlahRT: number;
  jumlahPenduduk: number;
}

export interface StatistikPenduduk {
  lakiLaki: number;
  perempuan: number;
  jumlah: number;
  lastUpdated: string;
}

export interface StatistikWajibKTP {
  lakiLaki: number;
  perempuan: number;
  jumlah: number;
  sudahRekam: number;
  belumRekam: number;
  lastUpdated: string;
}

export interface RunningTextItem {
  id: string;
  teks: string;
  status: 'Aktif' | 'Nonaktif';
  urutan: number;
  update: string;
}

export interface GaleriFoto {
  id: string;
  judul: string;
  imageUrl: string; // Base64 or URL
  keterangan: string;
  status: 'Aktif' | 'Nonaktif' | 'Arsip';
  tanggalUpload: string;
  uploader?: string;
}

// Alias for compatibility
export type GaleriItem = GaleriFoto;

export interface AppBranding {
  appName: string;
  appSubname: string;
  appLogo?: string;
  logoUrl: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  alamatKantor: string;
  telepon?: string;
  telpKantor?: string;
  email?: string;
  emailKantor?: string;
  website?: string;
  namaLurah: string;
  nipLurah: string;
  pangkatLurah?: string;
  luasWilayahKm2?: number;
  luasWilayahHa?: number;
}
