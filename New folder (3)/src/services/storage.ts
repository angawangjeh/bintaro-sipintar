import {
  UserAccount,
  DataPindah,
  DataDatang,
  JadwalPelayanan,
  InformasiBerita,
  DataRT,
  DataRW,
  StatistikPenduduk,
  StatistikWajibKTP,
  RunningTextItem,
  GaleriFoto,
  AppBranding
} from '../types';

const STORAGE_KEYS = {
  USERS: 'sipintar_users',
  CURRENT_USER: 'sipintar_current_user',
  PINDAH: 'sipintar_data_pindah',
  DATANG: 'sipintar_data_datang',
  JADWAL: 'sipintar_jadwal',
  INFORMASI: 'sipintar_informasi',
  DATA_RT: 'sipintar_data_rt',
  DATA_RW: 'sipintar_data_rw',
  STAT_PENDUDUK: 'sipintar_stat_penduduk',
  STAT_KTP: 'sipintar_stat_ktp',
  RUNNING_TEXT: 'sipintar_running_text',
  GALERI: 'sipintar_galeri',
  BRANDING: 'sipintar_branding',
};

// Initial 15 RWs of Kelurahan Bintaro, Pesanggrahan
const INITIAL_RW: DataRW[] = [
  { id: 'rw-01', rw: '01', nama: 'H. Suryadi, S.Sos', nik: '3174011204650001', keterangan: 'Kawasan Jl. RC Veteran & Sekitarnya', noHp: '081287654301', alamatSekretariat: 'Pos RW 01 Jl. RC Veteran No. 12', jumlahRT: 10, jumlahPenduduk: 4320 },
  { id: 'rw-02', rw: '02', nama: 'Drs. H. M. Ridwan', nik: '3174011508670002', keterangan: 'Kawasan Komplek IKPN Bintaro', noHp: '081287654302', alamatSekretariat: 'Balai Warga RW 02 Komplek IKPN', jumlahRT: 11, jumlahPenduduk: 4890 },
  { id: 'rw-03', rw: '03', nama: 'Ir. Bambang Trihatmojo', nik: '3174012009690003', keterangan: 'Kawasan Bintaro Permai Raya', noHp: '081287654303', alamatSekretariat: 'Posko RW 03 Jl. Bintaro Permai 3', jumlahRT: 10, jumlahPenduduk: 4150 },
  { id: 'rw-04', rw: '04', nama: 'H. Achmad Fauzi, SE', nik: '3174011802720004', keterangan: 'Kawasan Bintaro Utara', noHp: '081287654304', alamatSekretariat: 'Kantor RW 04 Jl. Kenari No. 8', jumlahRT: 9, jumlahPenduduk: 3820 },
  { id: 'rw-05', rw: '05', nama: 'H. Wahyudi Pratama, ST', nik: '3174012506750005', keterangan: 'Kawasan Rawa Papan Sentral', noHp: '081287654305', alamatSekretariat: 'Sekretariat RW 05 Jl. Rawa Papan RT 03', jumlahRT: 12, jumlahPenduduk: 5120 },
  { id: 'rw-06', rw: '06', nama: 'H. Supriyadi', nik: '3174011003660006', keterangan: 'Kawasan Bintaro Jaya Sektor 1', noHp: '081287654306', alamatSekretariat: 'Pos RW 06 Taman Bintaro Barat', jumlahRT: 8, jumlahPenduduk: 3450 },
  { id: 'rw-07', rw: '07', nama: 'Drs. Agus Subagio', nik: '3174011407680007', keterangan: 'Kawasan Ulujami Perbatasan Bintaro', noHp: '081287654307', alamatSekretariat: 'Balai RW 07 Jl. Mas Mansyur No. 22', jumlahRT: 10, jumlahPenduduk: 4210 },
  { id: 'rw-08', rw: '08', nama: 'H. Gunawan Santoso', nik: '3174010911710008', keterangan: 'Kawasan Bintaro Pesanggrahan Timur', noHp: '081287654308', alamatSekretariat: 'Sekretariat RW 08 Jl. Anggrek No. 4', jumlahRT: 9, jumlahPenduduk: 3960 },
  { id: 'rw-09', rw: '09', nama: 'Dedi Kurniawan, S.Pd', nik: '3174011705740009', keterangan: 'Kawasan Perumahan Guru Bintaro', noHp: '081287654309', alamatSekretariat: 'Posko RW 09 Jl. Cempaka Putih RT 02', jumlahRT: 10, jumlahPenduduk: 4080 },
  { id: 'rw-10', rw: '10', nama: 'H. M. Yusuf Ibrahim', nik: '3174010410700010', keterangan: 'Kawasan Veteran Selatan', noHp: '081287654310', alamatSekretariat: 'Balai Warga RW 10 Jl. Teratai No. 15', jumlahRT: 8, jumlahPenduduk: 3600 },
  { id: 'rw-11', rw: '11', nama: 'Ir. Hendra Kusuma', nik: '3174012112760011', keterangan: 'Kawasan Bintaro Park Residence', noHp: '081287654311', alamatSekretariat: 'Kantor RW 11 Clubhouse Bintaro', jumlahRT: 9, jumlahPenduduk: 3750 },
  { id: 'rw-12', rw: '12', nama: 'H. Zainal Arifin, MM', nik: '3174011301730012', keterangan: 'Kawasan Bintaro Indah Asri', noHp: '081287654312', alamatSekretariat: 'Sekretariat RW 12 Jl. Mawar No. 7', jumlahRT: 10, jumlahPenduduk: 4400 },
  { id: 'rw-13', rw: '13', nama: 'drg. H. Mulyono', nik: '3174011904670013', keterangan: 'Kawasan Bintaro Hijau', noHp: '081287654313', alamatSekretariat: 'Pos RW 13 Jl. Cemara Indah No. 3', jumlahRT: 9, jumlahPenduduk: 3890 },
  { id: 'rw-14', rw: '14', nama: 'H. Sudirman, SH', nik: '3174010208690014', keterangan: 'Kawasan Kodam Pesanggrahan Bintaro', noHp: '081287654314', alamatSekretariat: 'Balai Pertemuan RW 14 Jl. Melati No. 1', jumlahRT: 9, jumlahPenduduk: 3950 },
  { id: 'rw-15', rw: '15', nama: 'H. Budi Santoso, MBA', nik: '3174012909780015', keterangan: 'Kawasan Bintaro Raya Sentra Bisnis & Hunian', noHp: '081287654315', alamatSekretariat: 'Kantor RW 15 Gedung Serbaguna Bintaro', jumlahRT: 9, jumlahPenduduk: 4140 },
];

// Generate representative RT distribution totaling 143 RTs across 15 RWs
const generateInitialRTs = (): DataRT[] => {
  const rts: DataRT[] = [];
  const rtPerRWCount = [10, 11, 10, 9, 12, 8, 10, 9, 10, 8, 9, 10, 9, 9, 9]; // Sum = 143 RTs
  
  let globalRtIndex = 1;
  rtPerRWCount.forEach((count, rwIdx) => {
    const rwNum = String(rwIdx + 1).padStart(2, '0');
    for (let i = 1; i <= count; i++) {
      const rtNum = String(i).padStart(3, '0');
      const rtId = `rt-${rwNum}-${rtNum}`;
      rts.push({
        id: rtId,
        nama: `Ketua RT ${rtNum} (Bpk. M. ${['Sanusi', 'Fikri', 'Hasan', 'Rahmat', 'Lukman', 'Jaelani', 'Subhan', 'Taufik', 'Irawan', 'Haryanto', 'Syukri', 'Danang'][i % 12]})`,
        nik: `317401${String(1000000000 + globalRtIndex).slice(0, 10)}`,
        rt: rtNum,
        rw: rwNum,
        keterangan: `Wilayah RT ${rtNum} lingkungan RW ${rwNum} Kelurahan Bintaro`,
        noHp: `08139876${String(1000 + globalRtIndex).slice(0, 4)}`,
        alamatSekretariat: `Jl. Bintaro Sektor RW ${rwNum} RT ${rtNum}`,
        jumlahKK: 85 + (i * 7) % 40,
        jumlahJiwa: 310 + (i * 23) % 150,
      });
      globalRtIndex++;
    }
  });
  return rts;
};

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-admin',
    username: 'admin',
    password: 'admin123',
    fullName: 'Administrator SIPINTAR',
    role: 'ADMIN',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081199887766',
    email: 'admin.sipintar@jakarta.go.id',
    nik: '3174010101900001',
    createdAt: '2026-01-01',
  },
  {
    id: 'user-petugas',
    username: 'petugas',
    password: 'petugas123',
    fullName: 'Rian Pratama, S.AP (Petugas Pelayanan)',
    role: 'PETUGAS',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081234567890',
    email: 'petugas.dukcapil@jakarta.go.id',
    nik: '3174011405940003',
    createdAt: '2026-01-05',
  },
  {
    id: 'user-lurah',
    username: 'lurah',
    password: 'lurah123',
    fullName: 'Drs. H. M. Ridwan, M.Si (Lurah Bintaro)',
    role: 'LURAH',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081311223344',
    email: 'lurah.bintaro@jakarta.go.id',
    nik: '3174010507680002',
    createdAt: '2026-01-02',
  },
  {
    id: 'user-rw-05',
    username: 'rw05',
    password: 'rw123',
    fullName: 'H. Wahyudi Pratama, ST (Ketua RW 05)',
    role: 'RW',
    rwNumber: '05',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081287654305',
    email: 'rw05.bintaro@jakarta.go.id',
    nik: '3174012506750005',
    createdAt: '2026-01-10',
  },
  {
    id: 'user-rt-003-rw-05',
    username: 'rt03rw05',
    password: 'rt123',
    fullName: 'Bpk. M. Hasan (Ketua RT 003 / RW 05)',
    role: 'RT',
    rwNumber: '05',
    rtNumber: '003',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081398761045',
    email: 'rt003rw05@bintaro.id',
    nik: '3174011203800007',
    createdAt: '2026-01-15',
  },
  {
    id: 'user-rw-01',
    username: 'rw01',
    password: 'rw123',
    fullName: 'H. Suryadi, S.Sos (Ketua RW 01)',
    role: 'RW',
    rwNumber: '01',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081287654301',
    email: 'rw01.bintaro@jakarta.go.id',
    nik: '3174011204650001',
    createdAt: '2026-01-10',
  },
  {
    id: 'user-rt-001-rw-01',
    username: 'rt01rw01',
    password: 'rt123',
    fullName: 'Bpk. M. Sanusi (Ketua RT 001 / RW 01)',
    role: 'RT',
    rwNumber: '01',
    rtNumber: '001',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    isBlocked: false,
    phone: '081398761001',
    email: 'rt001rw01@bintaro.id',
    nik: '3174010101850002',
    createdAt: '2026-01-15',
  }
];

const INITIAL_PINDAH: DataPindah[] = [
  {
    id: 'pnd-001',
    noSurat: '471.2/014/SKP-WNI/BTR/2026',
    tanggalPindah: '2026-08-20',
    namaKepalaKeluarga: 'H. Hendra Kurniawan, SE',
    nik: '3174011409820005',
    alamatAsal: 'Jl. Rawa Papan RT 003/RW 05 No. 45',
    rtAsal: '003',
    rwAsal: '05',
    kelurahanAsal: 'BINTARO',
    kecamatanAsal: 'PESANGGRAHAN',
    alasanPindah: 'Pindah Tempat Tinggal / Pekerjaan Baru',
    alamatTujuan: 'Jl. Boulevard Bintaro Sektor 7 No. 88',
    rtTujuan: '004',
    rwTujuan: '09',
    kabKotaTujuan: 'Kota Tangerang Selatan',
    provinsiTujuan: 'Banten',
    jenisKepindahan: 'Seluruh Anggota Keluarga',
    jumlahAnggota: 4,
    anggotaList: [
      { nama: 'H. Hendra Kurniawan, SE', nik: '3174011409820005', shdk: 'Kepala Keluarga' },
      { nama: 'Siti Rahmawati, S.Pd', nik: '3174015504850002', shdk: 'Istri' },
      { nama: 'Dimas Aditya Kurniawan', nik: '3174011210100003', shdk: 'Anak' },
      { nama: 'Nadhira Putri Kurniawan', nik: '3174015012150001', shdk: 'Anak' },
    ],
    status: 'Disetujui',
    keterangan: 'Berkas lengkap, SKCK & Surat Pengantar RT/RW terlampir',
    createdAt: '2026-08-20',
  },
  {
    id: 'pnd-002',
    noSurat: '471.2/015/SKP-WNI/BTR/2026',
    tanggalPindah: '2026-08-24',
    namaKepalaKeluarga: 'Ahmad Fauzan Syarif',
    nik: '3174012201880004',
    alamatAsal: 'Komplek IKPN Blok C No. 12',
    rtAsal: '002',
    rwAsal: '02',
    kelurahanAsal: 'BINTARO',
    kecamatanAsal: 'PESANGGRAHAN',
    alasanPindah: 'Mengikuti Suami / Istri',
    alamatTujuan: 'Jl. Margonda Raya No. 110',
    rtTujuan: '001',
    rwTujuan: '04',
    kabKotaTujuan: 'Kota Depok',
    provinsiTujuan: 'Jawa Barat',
    jenisKepindahan: 'Kepala dan Sebagian Anggota',
    jumlahAnggota: 2,
    anggotaList: [
      { nama: 'Ahmad Fauzan Syarif', nik: '3174012201880004', shdk: 'Kepala Keluarga' },
      { nama: 'Karin Anindya', nik: '3174016008920006', shdk: 'Istri' },
    ],
    status: 'Selesai',
    keterangan: 'Surat Keterangan Pindah WNI telah diterbitkan',
    createdAt: '2026-08-24',
  },
  {
    id: 'pnd-003',
    noSurat: '471.2/016/SKP-WNI/BTR/2026',
    tanggalPindah: '2026-08-26',
    namaKepalaKeluarga: 'Budi Hartono',
    nik: '3174010803790009',
    alamatAsal: 'Jl. RC Veteran No. 78',
    rtAsal: '001',
    rwAsal: '01',
    kelurahanAsal: 'BINTARO',
    kecamatanAsal: 'PESANGGRAHAN',
    alasanPindah: 'Pendidikan Anak',
    alamatTujuan: 'Jl. Kaliurang KM 5',
    rtTujuan: '003',
    rwTujuan: '02',
    kabKotaTujuan: 'Kabupaten Sleman',
    provinsiTujuan: 'D.I. Yogyakarta',
    jenisKepindahan: 'Anggota Keluarga',
    jumlahAnggota: 1,
    anggotaList: [
      { nama: 'Rizky Pratama Hartono', nik: '3174011506040008', shdk: 'Anak' },
    ],
    status: 'Diproses',
    keterangan: 'Verifikasi berkas oleh petugas loket Dukcapil',
    createdAt: '2026-08-26',
  }
];

const INITIAL_DATANG: DataDatang[] = [
  {
    id: 'dtg-001',
    noSurat: '471.2/008/SKD-WNI/BTR/2026',
    tanggalDatang: '2026-08-18',
    namaPemohon: 'Dr. Raden Mas Bagus Wicaksono, Sp.PD',
    nik: '3374021208800001',
    alamatAsal: 'Jl. Pandanaran No. 56',
    kabKotaAsal: 'Kota Semarang',
    provinsiAsal: 'Jawa Tengah',
    alamatTujuan: 'Bintaro Permai Raya Kav. 14',
    rtTujuan: '003',
    rwTujuan: '05',
    kelurahanTujuan: 'BINTARO',
    kecamatanTujuan: 'PESANGGRAHAN',
    alasanDatang: 'Tugas Kerja di RSUP Fatmawati / Pesanggrahan',
    jumlahAnggota: 3,
    anggotaList: [
      { nama: 'Dr. Raden Mas Bagus Wicaksono, Sp.PD', nik: '3374021208800001', shdk: 'Kepala Keluarga' },
      { nama: 'dr. Ratna Juwita', nik: '3374026509830005', shdk: 'Istri' },
      { nama: 'Aira Daniswara Wicaksono', nik: '3374024411120002', shdk: 'Anak' },
    ],
    status: 'Disetujui',
    keterangan: 'SKPWNI asal Semarang sudah terverifikasi online Dukcapil',
    createdAt: '2026-08-18',
  },
  {
    id: 'dtg-002',
    noSurat: '471.2/009/SKD-WNI/BTR/2026',
    tanggalDatang: '2026-08-22',
    namaPemohon: 'Farhan Maulana Hakim',
    nik: '3273011904930008',
    alamatAsal: 'Jl. Dago Asri No. 19',
    kabKotaAsal: 'Kota Bandung',
    provinsiAsal: 'Jawa Barat',
    alamatTujuan: 'Jl. Taman Bintaro Barat No. 2A',
    rtTujuan: '002',
    rwTujuan: '06',
    kelurahanTujuan: 'BINTARO',
    kecamatanTujuan: 'PESANGGRAHAN',
    alasanDatang: 'Pindah Beli Rumah Baru',
    jumlahAnggota: 2,
    anggotaList: [
      { nama: 'Farhan Maulana Hakim', nik: '3273011904930008', shdk: 'Kepala Keluarga' },
      { nama: 'Safira Aulia, ST', nik: '3273015508950003', shdk: 'Istri' },
    ],
    status: 'Selesai',
    keterangan: 'Penerbitan KTP-el dan Kartu Keluarga baru telah rampung',
    createdAt: '2026-08-22',
  },
  {
    id: 'dtg-003',
    noSurat: '471.2/010/SKD-WNI/BTR/2026',
    tanggalDatang: '2026-08-27',
    namaPemohon: 'Muhammad Irfan Setyadi',
    nik: '3578010306910006',
    alamatAsal: 'Jl. Dharmahusada No. 40',
    kabKotaAsal: 'Kota Surabaya',
    provinsiAsal: 'Jawa Timur',
    alamatTujuan: 'Jl. RC Veteran RT 001/RW 01 No. 89',
    rtTujuan: '001',
    rwTujuan: '01',
    kelurahanTujuan: 'BINTARO',
    kecamatanTujuan: 'PESANGGRAHAN',
    alasanDatang: 'Pindah Domisili Usaha & Tempat Tinggal',
    jumlahAnggota: 1,
    anggotaList: [
      { nama: 'Muhammad Irfan Setyadi', nik: '3578010306910006', shdk: 'Kepala Keluarga' },
    ],
    status: 'Diproses',
    keterangan: 'Menunggu konfirmasi penerimaan dari RT 001 / RW 01',
    createdAt: '2026-08-27',
  }
];

const INITIAL_JADWAL: JadwalPelayanan[] = [
  {
    id: 'jdw-01',
    judul: 'Layanan Mobile KTP-El & KIA Keliling RW 05',
    tanggal: '2026-08-30',
    waktu: '08.30 - 14.00 WIB',
    isi: 'Perekaman KTP Elektronik baru pemula, penggantian KTP rusak/hilang, cetak KIA, dan aktivasi Identitas Kependudukan Digital (IKD).',
    lokasi: 'Balai Warga RW 05 (Jl. Rawa Papan Sentral No. 3)',
    keterangan: 'Bawa FC KK dan KTP lama / Surat Keterangan Hilang',
    status: 'Aktif',
    penanggungJawab: 'Rian Pratama & Tim Dukcapil Bintaro'
  },
  {
    id: 'jdw-02',
    judul: 'Posko Pelayanan Pindah Datang & IKD Goes to RW 02 (Komplek IKPN)',
    tanggal: '2026-09-02',
    waktu: '09.00 - 13.30 WIB',
    isi: 'Konsultasi dan penginputan berkas pindah datang antar kelurahan/provinsi serta pembagian formulir F-1.08 dan F-1.09 secara langsung.',
    lokasi: 'Kawasan Lapangan Tenis IKPN Bintaro RW 02',
    keterangan: 'Khusus warga RW 02 & sekitarnya, layanan cepat 15 menit jadi',
    status: 'Terjadwal',
    penanggungJawab: 'Drs. H. M. Ridwan & Tim Pelayanan'
  },
  {
    id: 'jdw-03',
    judul: 'Jemput Bola Layanan Lansia & Disabilitas RW 01',
    tanggal: '2026-09-05',
    waktu: '09.00 - 12.00 WIB',
    isi: 'Perekaman KTP-el mobile langsung ke rumah warga lansia, disabilitas, dan warga sakit di wilayah RW 01.',
    lokasi: 'Wilayah RT 001 s/d RT 010 RW 01',
    keterangan: 'Pendaftaran melalui Ketua RT setempat',
    status: 'Terjadwal',
    penanggungJawab: 'Petugas Dukcapil Bintaro'
  },
  {
    id: 'jdw-04',
    judul: 'Pelayanan Malam Hari (Night Service) Kantor Kelurahan Bintaro',
    tanggal: '2026-08-22',
    waktu: '19.00 - 21.30 WIB',
    isi: 'Layanan administrasi kependudukan di luar jam kerja untuk pekerja kantor dan warga sibuk.',
    lokasi: 'Loket PTSP Kantor Kelurahan Bintaro',
    keterangan: 'Kegiatan telah terlaksana dengan total 48 pemohon terlayani',
    status: 'Selesai',
    penanggungJawab: 'Kasatpel Dukcapil Pesanggrahan'
  }
];

const INITIAL_INFORMASI: InformasiBerita[] = [
  {
    id: 'inf-01',
    judul: 'Alur & Persyaratan Pengurusan Surat Keterangan Pindah WNI (SKPWNI) 2026',
    isi: 'Warga Kelurahan Bintaro yang akan melakukan perpindahan domisili tidak lagi memerlukan surat pengantar jika data sudah terdaftar di database SIAK terpadu. Cukup membawa Kartu Keluarga asli dan mengisi formulir F-1.08 di SIPINTAR.',
    tanggal: '2026-08-25',
    keterangan: 'Instruksi Dirjen Dukcapil Kemendagri & PTSP Kelurahan Bintaro',
    status: 'Aktif',
    kategori: 'Kependudukan'
  },
  {
    id: 'inf-02',
    judul: 'Sosialisasi Penerbitan Identitas Kependudukan Digital (IKD) di Bintaro',
    isi: 'Seluruh warga wajib KTP Kelurahan Bintaro dihimbau mengaktifkan KTP Digital (IKD) di smartphone melalui aplikasi resmi Dukcapil. Petugas siap membantu aktivasi di loket kelurahan dan posko mobile RW.',
    tanggal: '2026-08-21',
    keterangan: 'Mendukung program Jakarta Smart City & Paperless Dukcapil',
    status: 'Aktif',
    kategori: 'Sosialisasi'
  },
  {
    id: 'inf-03',
    judul: 'Bebas Biaya (Gratis) Seluruh Layanan Administrasi Kependudukan',
    isi: 'Ditegaskan bahwa seluruh pembuatan KTP, KK, Akta Kelahiran, Surat Pindah Datang, dan KIA adalah Rp 0,- (Gratis). Laporkan jika menemukan indikasi pungutan liar.',
    tanggal: '2026-08-15',
    keterangan: 'Dukcapil Bintaro Jawara - Melayani dengan Hati & Transparan',
    status: 'Aktif',
    kategori: 'Pengumuman'
  }
];

const INITIAL_STAT_PENDUDUK: StatistikPenduduk = {
  lakiLaki: 31450,
  perempuan: 32180,
  jumlah: 63630,
  lastUpdated: '2026-08-28 08:30 WIB'
};

const INITIAL_STAT_KTP: StatistikWajibKTP = {
  lakiLaki: 24120,
  perempuan: 24850,
  jumlah: 48970,
  sudahRekam: 47820,
  belumRekam: 1150,
  lastUpdated: '2026-08-28 08:30 WIB'
};

const INITIAL_RUNNING_TEXT: RunningTextItem[] = [
  {
    id: 'rtx-01',
    teks: '🏛️ Selamat Datang di SIPINTAR - Sistem Informasi Pindah Datang Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan.',
    status: 'Aktif',
    urutan: 1,
    update: '2026-08-28 08:00'
  },
  {
    id: 'rtx-02',
    teks: '⚡ Seluruh pengurusan Surat Keterangan Pindah (SKP) dan Surat Keterangan Datang (SKD) di Kelurahan Bintaro adalah GRATIS tanpa pungutan biaya apapun.',
    status: 'Aktif',
    urutan: 2,
    update: '2026-08-28 08:00'
  },
  {
    id: 'rtx-03',
    teks: '🚐 Jadwal Mobil Keliling Dukcapil Bintaro hadir di RW 05 hari Sabtu 30 Agustus 2026 pkl 08.30-14.00 WIB. Jangan lewatkan!',
    status: 'Aktif',
    urutan: 3,
    update: '2026-08-28 08:00'
  },
  {
    id: 'rtx-04',
    teks: '📱 Segera aktivasi Identitas Kependudukan Digital (IKD) Anda di kantor Kelurahan Bintaro atau melalui Ketua RT/RW setempat.',
    status: 'Aktif',
    urutan: 4,
    update: '2026-08-28 08:00'
  }
];

const INITIAL_GALERI: GaleriFoto[] = [
  {
    id: 'gal-01',
    judul: 'Layanan Mobile Dukcapil Keliling di Posko RW 05 Rawa Papan',
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    keterangan: 'Pelayanan jemput bola perekaman KTP-el dan aktivasi IKD bagi warga Bintaro dengan antusiasme tinggi.',
    status: 'Aktif',
    tanggalUpload: '2026-08-20',
    uploader: 'Petugas Loket Dukcapil'
  },
  {
    id: 'gal-02',
    judul: 'Sosialisasi SIPINTAR & Tertib Administrasi Kependudukan bersama Ketua RT/RW',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    keterangan: 'Rapat koordinasi Lurah Bintaro bersama 15 Ketua RW dan 143 Ketua RT se-Kelurahan Bintaro.',
    status: 'Aktif',
    tanggalUpload: '2026-08-15',
    uploader: 'Sekretariat Kelurahan'
  },
  {
    id: 'gal-03',
    judul: 'Pelayanan Loket PTSP Ramah Disabilitas & Lansia Kelurahan Bintaro',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    keterangan: 'Fasilitas loket pelayanan prima dengan ruang tunggu ber-AC, ramah kursi roda, dan ruang laktasi.',
    status: 'Aktif',
    tanggalUpload: '2026-08-10',
    uploader: 'Kasatpel PTSP'
  },
  {
    id: 'gal-04',
    judul: 'Penyerahan Dokumen Kependudukan Door-to-Door RT 003 / RW 05',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    keterangan: 'Layanan terintegrasi kolaborasi pengurus RT, RW dan pihak Kelurahan Bintaro.',
    status: 'Aktif',
    tanggalUpload: '2026-08-25',
    uploader: 'Ketua RW 05'
  }
];

const INITIAL_BRANDING: AppBranding = {
  appName: 'SIPINTAR',
  appSubname: 'Sistem Informasi Pindah Datang Bintaro',
  logoUrl: '',
  kelurahan: 'Bintaro',
  kecamatan: 'Pesanggrahan',
  kota: 'Kota Administrasi Jakarta Selatan',
  provinsi: 'DKI Jakarta',
  alamatKantor: 'Jl. Bintaro Permai No. 1, RT 01 / RW 01, Bintaro, Pesanggrahan, Jakarta Selatan 12330',
  telepon: '(021) 7350478',
  telpKantor: '(021) 7350478',
  email: 'kelurahan.bintaro@jakarta.go.id',
  emailKantor: 'kelurahan.bintaro@jakarta.go.id',
  website: 'bintaro.jakarta.go.id',
  namaLurah: 'Drs. H. M. Ridwan, M.Si',
  nipLurah: '19760812 199803 1 004',
  pangkatLurah: 'Pembina Tingkat I (IV/b)',
  luasWilayahKm2: 4.56,
  luasWilayahHa: 456,
};

export class StorageService {
  static init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0])); // default admin
    }
    if (!localStorage.getItem(STORAGE_KEYS.DATA_RW)) {
      localStorage.setItem(STORAGE_KEYS.DATA_RW, JSON.stringify(INITIAL_RW));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DATA_RT)) {
      localStorage.setItem(STORAGE_KEYS.DATA_RT, JSON.stringify(generateInitialRTs()));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PINDAH)) {
      localStorage.setItem(STORAGE_KEYS.PINDAH, JSON.stringify(INITIAL_PINDAH));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DATANG)) {
      localStorage.setItem(STORAGE_KEYS.DATANG, JSON.stringify(INITIAL_DATANG));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JADWAL)) {
      localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(INITIAL_JADWAL));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INFORMASI)) {
      localStorage.setItem(STORAGE_KEYS.INFORMASI, JSON.stringify(INITIAL_INFORMASI));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STAT_PENDUDUK)) {
      localStorage.setItem(STORAGE_KEYS.STAT_PENDUDUK, JSON.stringify(INITIAL_STAT_PENDUDUK));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STAT_KTP)) {
      localStorage.setItem(STORAGE_KEYS.STAT_KTP, JSON.stringify(INITIAL_STAT_KTP));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RUNNING_TEXT)) {
      localStorage.setItem(STORAGE_KEYS.RUNNING_TEXT, JSON.stringify(INITIAL_RUNNING_TEXT));
    }
    if (!localStorage.getItem(STORAGE_KEYS.GALERI)) {
      localStorage.setItem(STORAGE_KEYS.GALERI, JSON.stringify(INITIAL_GALERI));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BRANDING)) {
      localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(INITIAL_BRANDING));
    }
  }

  // Users
  static getUsers(): UserAccount[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  }
  static saveUsers(users: UserAccount[]) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
  static saveUser(user: UserAccount): UserAccount[] {
    const users = StorageService.getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.unshift(user);
    }
    StorageService.saveUsers(users);
    return users;
  }
  static deleteUser(id: string): UserAccount[] {
    const users = StorageService.getUsers().filter((u) => u.id !== id);
    StorageService.saveUsers(users);
    return users;
  }
  static toggleBlockUser(id: string): UserAccount[] {
    const users = StorageService.getUsers().map((u) => {
      if (u.id === id) {
        return { ...u, isActive: !u.isActive, isBlocked: !u.isBlocked };
      }
      return u;
    });
    StorageService.saveUsers(users);
    return users;
  }
  static getCurrentUser(): UserAccount | null {
    StorageService.init();
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }
  static setCurrentUser(user: UserAccount | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }

  // Pindah
  static getDataPindah(): DataPindah[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PINDAH) || '[]');
  }
  static getPindah(): DataPindah[] {
    return StorageService.getDataPindah();
  }
  static saveDataPindah(item: DataPindah): DataPindah[] {
    const list = StorageService.getDataPindah();
    const idx = list.findIndex((p) => p.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.PINDAH, JSON.stringify(list));
    return list;
  }
  static updateDataPindah(item: DataPindah): DataPindah[] {
    return StorageService.saveDataPindah(item);
  }
  static savePindah(data: DataPindah[]) {
    localStorage.setItem(STORAGE_KEYS.PINDAH, JSON.stringify(data));
  }
  static deleteDataPindah(id: string): DataPindah[] {
    const list = StorageService.getDataPindah().filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PINDAH, JSON.stringify(list));
    return list;
  }

  // Datang
  static getDataDatang(): DataDatang[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DATANG) || '[]');
  }
  static getDatang(): DataDatang[] {
    return StorageService.getDataDatang();
  }
  static saveDataDatang(item: DataDatang): DataDatang[] {
    const list = StorageService.getDataDatang();
    const idx = list.findIndex((d) => d.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.DATANG, JSON.stringify(list));
    return list;
  }
  static updateDataDatang(item: DataDatang): DataDatang[] {
    return StorageService.saveDataDatang(item);
  }
  static saveDatang(data: DataDatang[]) {
    localStorage.setItem(STORAGE_KEYS.DATANG, JSON.stringify(data));
  }
  static deleteDataDatang(id: string): DataDatang[] {
    const list = StorageService.getDataDatang().filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DATANG, JSON.stringify(list));
    return list;
  }

  // RW & RT
  static getDataRW(): DataRW[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DATA_RW) || '[]');
  }
  static getRW(): DataRW[] {
    return StorageService.getDataRW();
  }
  static saveRW(rwOrList: DataRW | DataRW[]): DataRW[] {
    if (Array.isArray(rwOrList)) {
      localStorage.setItem(STORAGE_KEYS.DATA_RW, JSON.stringify(rwOrList));
      return rwOrList;
    }
    const list = StorageService.getDataRW();
    const idx = list.findIndex((r) => r.id === rwOrList.id);
    if (idx >= 0) {
      list[idx] = rwOrList;
    } else {
      list.push(rwOrList);
    }
    localStorage.setItem(STORAGE_KEYS.DATA_RW, JSON.stringify(list));
    return list;
  }
  static deleteRW(id: string): DataRW[] {
    const list = StorageService.getDataRW().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.DATA_RW, JSON.stringify(list));
    return list;
  }

  static getDataRT(): DataRT[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DATA_RT) || '[]');
  }
  static getRT(): DataRT[] {
    return StorageService.getDataRT();
  }
  static saveRT(rtOrList: DataRT | DataRT[]): DataRT[] {
    if (Array.isArray(rtOrList)) {
      localStorage.setItem(STORAGE_KEYS.DATA_RT, JSON.stringify(rtOrList));
      return rtOrList;
    }
    const list = StorageService.getDataRT();
    const idx = list.findIndex((r) => r.id === rtOrList.id);
    if (idx >= 0) {
      list[idx] = rtOrList;
    } else {
      list.push(rtOrList);
    }
    localStorage.setItem(STORAGE_KEYS.DATA_RT, JSON.stringify(list));
    return list;
  }
  static deleteRT(id: string): DataRT[] {
    const list = StorageService.getDataRT().filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.DATA_RT, JSON.stringify(list));
    return list;
  }

  // Jadwal
  static getJadwalPelayanan(): JadwalPelayanan[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.JADWAL) || '[]');
  }
  static getJadwal(): JadwalPelayanan[] {
    return StorageService.getJadwalPelayanan();
  }
  static saveJadwal(itemOrList: JadwalPelayanan | JadwalPelayanan[]): JadwalPelayanan[] {
    if (Array.isArray(itemOrList)) {
      localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(itemOrList));
      return itemOrList;
    }
    const list = StorageService.getJadwalPelayanan();
    const idx = list.findIndex((j) => j.id === itemOrList.id);
    if (idx >= 0) {
      list[idx] = itemOrList;
    } else {
      list.unshift(itemOrList);
    }
    localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(list));
    return list;
  }
  static deleteJadwal(id: string): JadwalPelayanan[] {
    const list = StorageService.getJadwalPelayanan().filter((j) => j.id !== id);
    localStorage.setItem(STORAGE_KEYS.JADWAL, JSON.stringify(list));
    return list;
  }

  // Informasi
  static getInformasiBerita(): InformasiBerita[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INFORMASI) || '[]');
  }
  static getInformasi(): InformasiBerita[] {
    return StorageService.getInformasiBerita();
  }
  static saveInformasi(itemOrList: InformasiBerita | InformasiBerita[]): InformasiBerita[] {
    if (Array.isArray(itemOrList)) {
      localStorage.setItem(STORAGE_KEYS.INFORMASI, JSON.stringify(itemOrList));
      return itemOrList;
    }
    const list = StorageService.getInformasiBerita();
    const idx = list.findIndex((i) => i.id === itemOrList.id);
    if (idx >= 0) {
      list[idx] = itemOrList;
    } else {
      list.unshift(itemOrList);
    }
    localStorage.setItem(STORAGE_KEYS.INFORMASI, JSON.stringify(list));
    return list;
  }
  static deleteInformasi(id: string): InformasiBerita[] {
    const list = StorageService.getInformasiBerita().filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INFORMASI, JSON.stringify(list));
    return list;
  }

  // Demography
  static getStatistikPenduduk(): StatistikPenduduk {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STAT_PENDUDUK) || JSON.stringify(INITIAL_STAT_PENDUDUK));
  }
  static saveStatistikPenduduk(stat: StatistikPenduduk) {
    localStorage.setItem(STORAGE_KEYS.STAT_PENDUDUK, JSON.stringify(stat));
  }

  static getStatistikKTP(): StatistikWajibKTP {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STAT_KTP) || JSON.stringify(INITIAL_STAT_KTP));
  }
  static saveStatistikKTP(stat: StatistikWajibKTP) {
    localStorage.setItem(STORAGE_KEYS.STAT_KTP, JSON.stringify(stat));
  }

  // Running Text
  static getRunningTexts(): RunningTextItem[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RUNNING_TEXT) || '[]');
  }
  static getRunningText(): RunningTextItem[] {
    return StorageService.getRunningTexts();
  }
  static saveRunningTexts(list: RunningTextItem[]) {
    localStorage.setItem(STORAGE_KEYS.RUNNING_TEXT, JSON.stringify(list));
  }
  static saveRunningText(list: RunningTextItem[]) {
    StorageService.saveRunningTexts(list);
  }

  // Galeri
  static getGaleriFoto(): GaleriFoto[] {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.GALERI) || '[]');
  }
  static getGaleri(): GaleriFoto[] {
    return StorageService.getGaleriFoto();
  }
  static saveGaleri(itemOrList: GaleriFoto | GaleriFoto[]): GaleriFoto[] {
    if (Array.isArray(itemOrList)) {
      localStorage.setItem(STORAGE_KEYS.GALERI, JSON.stringify(itemOrList));
      return itemOrList;
    }
    const list = StorageService.getGaleriFoto();
    const idx = list.findIndex((g) => g.id === itemOrList.id);
    if (idx >= 0) {
      list[idx] = itemOrList;
    } else {
      list.unshift(itemOrList);
    }
    localStorage.setItem(STORAGE_KEYS.GALERI, JSON.stringify(list));
    return list;
  }
  static deleteGaleri(id: string): GaleriFoto[] {
    const list = StorageService.getGaleriFoto().filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEYS.GALERI, JSON.stringify(list));
    return list;
  }

  // Branding
  static getBranding(): AppBranding {
    StorageService.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANDING) || JSON.stringify(INITIAL_BRANDING));
  }
  static saveBranding(branding: AppBranding) {
    localStorage.setItem(STORAGE_KEYS.BRANDING, JSON.stringify(branding));
  }

  // MySQL Dump Generator
  static generateMySQLDump(): string {
    const users = StorageService.getUsers();
    const pindah = StorageService.getDataPindah();
    const datang = StorageService.getDataDatang();
    const rws = StorageService.getDataRW();
    const rts = StorageService.getDataRT();
    const statP = StorageService.getStatistikPenduduk();
    const statK = StorageService.getStatistikKTP();
    const jadwal = StorageService.getJadwalPelayanan();
    const info = StorageService.getInformasiBerita();

    return `-- ==========================================================
-- SISTEM INFORMASI PINDAH DATANG BINTARO (SIPINTAR)
-- Database Architecture & Schema Export
-- Kelurahan Bintaro, Kecamatan Pesanggrahan, Jakarta Selatan
-- Generated: ${new Date().toISOString()}
-- Engine: MySQL InnoDB (utf8mb4_unicode_ci)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS \`db_sipintar_bintaro\` 
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE \`db_sipintar_bintaro\`;

-- ----------------------------------------------------------
-- Table structure for \`users\` (Multilevel Role Authentication)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`role\` ENUM('ADMIN', 'PETUGAS', 'LURAH', 'RW', 'RT') NOT NULL DEFAULT 'PETUGAS',
  \`rw_number\` VARCHAR(10) DEFAULT NULL,
  \`rt_number\` VARCHAR(10) DEFAULT NULL,
  \`phone\` VARCHAR(20) DEFAULT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`nik\` VARCHAR(20) DEFAULT NULL,
  \`photo_url\` TEXT DEFAULT NULL,
  \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for \`users\`
INSERT INTO \`users\` (\`id\`, \`username\`, \`password_hash\`, \`full_name\`, \`role\`, \`rw_number\`, \`rt_number\`, \`phone\`, \`email\`, \`nik\`, \`is_active\`) VALUES
${users.map((u) => `('${u.id}', '${u.username}', '$2y$10$e8w...${u.username}', '${u.fullName.replace(/'/g, "\\'")}', '${u.role}', ${u.rwNumber ? `'${u.rwNumber}'` : 'NULL'}, ${u.rtNumber ? `'${u.rtNumber}'` : 'NULL'}, '${u.phone || ''}', '${u.email || ''}', '${u.nik || ''}', 1)`).join(',\n')};

-- ----------------------------------------------------------
-- Table structure for \`master_rw\` (15 RW Kelurahan Bintaro)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`master_rw\`;
CREATE TABLE \`master_rw\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`rw\` VARCHAR(10) NOT NULL UNIQUE,
  \`nama_ketua\` VARCHAR(100) NOT NULL,
  \`nik\` VARCHAR(20) NOT NULL,
  \`keterangan\` VARCHAR(255) DEFAULT NULL,
  \`no_hp\` VARCHAR(20) DEFAULT NULL,
  \`alamat_sekretariat\` TEXT DEFAULT NULL,
  \`jumlah_rt\` INT(11) NOT NULL DEFAULT 0,
  \`jumlah_penduduk\` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for \`master_rw\`
INSERT INTO \`master_rw\` (\`id\`, \`rw\`, \`nama_ketua\`, \`nik\`, \`keterangan\`, \`no_hp\`, \`alamat_sekretariat\`, \`jumlah_rt\`, \`jumlah_penduduk\`) VALUES
${rws.map((r) => `('${r.id}', '${r.rw}', '${r.nama.replace(/'/g, "\\'")}', '${r.nik}', '${r.keterangan.replace(/'/g, "\\'")}', '${r.noHp}', '${r.alamatSekretariat.replace(/'/g, "\\'")}', ${r.jumlahRT}, ${r.jumlahPenduduk})`).join(',\n')};

-- ----------------------------------------------------------
-- Table structure for \`master_rt\` (143 RT Kelurahan Bintaro)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`master_rt\`;
CREATE TABLE \`master_rt\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`rt\` VARCHAR(10) NOT NULL,
  \`rw\` VARCHAR(10) NOT NULL,
  \`nama_ketua\` VARCHAR(100) NOT NULL,
  \`nik\` VARCHAR(20) NOT NULL,
  \`keterangan\` VARCHAR(255) DEFAULT NULL,
  \`no_hp\` VARCHAR(20) DEFAULT NULL,
  \`alamat_sekretariat\` TEXT DEFAULT NULL,
  \`jumlah_kk\` INT(11) NOT NULL DEFAULT 0,
  \`jumlah_jiwa\` INT(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`),
  KEY \`fk_rt_rw\` (\`rw\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for \`data_pindah\` (Surat Keterangan Pindah SKP)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`data_pindah\`;
CREATE TABLE \`data_pindah\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`no_surat\` VARCHAR(100) NOT NULL UNIQUE,
  \`tanggal_pindah\` DATE NOT NULL,
  \`nama_kepala_keluarga\` VARCHAR(100) NOT NULL,
  \`nik\` VARCHAR(20) NOT NULL,
  \`alamat_asal\` TEXT NOT NULL,
  \`rt_asal\` VARCHAR(10) NOT NULL,
  \`rw_asal\` VARCHAR(10) NOT NULL,
  \`kelurahan_asal\` VARCHAR(50) NOT NULL DEFAULT 'BINTARO',
  \`kecamatan_asal\` VARCHAR(50) NOT NULL DEFAULT 'PESANGGRAHAN',
  \`alasan_pindah\` VARCHAR(100) NOT NULL,
  \`alamat_tujuan\` TEXT NOT NULL,
  \`rt_tujuan\` VARCHAR(10) DEFAULT NULL,
  \`rw_tujuan\` VARCHAR(10) DEFAULT NULL,
  \`kab_kota_tujuan\` VARCHAR(100) NOT NULL,
  \`provinsi_tujuan\` VARCHAR(100) NOT NULL,
  \`jenis_kepindahan\` VARCHAR(50) NOT NULL,
  \`jumlah_anggota\` INT(11) NOT NULL DEFAULT 1,
  \`status\` ENUM('Diproses', 'Disetujui', 'Selesai', 'Ditolak') NOT NULL DEFAULT 'Diproses',
  \`keterangan\` TEXT DEFAULT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for \`data_datang\` (Surat Keterangan Datang SKD)
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`data_datang\`;
CREATE TABLE \`data_datang\` (
  \`id\` VARCHAR(50) NOT NULL,
  \`no_surat\` VARCHAR(100) NOT NULL UNIQUE,
  \`tanggal_datang\` DATE NOT NULL,
  \`nama_pemohon\` VARCHAR(100) NOT NULL,
  \`nik\` VARCHAR(20) NOT NULL,
  \`alamat_asal\` TEXT NOT NULL,
  \`kab_kota_asal\` VARCHAR(100) NOT NULL,
  \`provinsi_asal\` VARCHAR(100) NOT NULL,
  \`alamat_tujuan\` TEXT NOT NULL,
  \`rt_tujuan\` VARCHAR(10) NOT NULL,
  \`rw_tujuan\` VARCHAR(10) NOT NULL,
  \`kelurahan_tujuan\` VARCHAR(50) NOT NULL DEFAULT 'BINTARO',
  \`kecamatan_tujuan\` VARCHAR(50) NOT NULL DEFAULT 'PESANGGRAHAN',
  \`alasan_datang\` VARCHAR(100) NOT NULL,
  \`jumlah_anggota\` INT(11) NOT NULL DEFAULT 1,
  \`status\` ENUM('Diproses', 'Disetujui', 'Selesai', 'Ditolak') NOT NULL DEFAULT 'Diproses',
  \`keterangan\` TEXT DEFAULT NULL,
  \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
  }
}
