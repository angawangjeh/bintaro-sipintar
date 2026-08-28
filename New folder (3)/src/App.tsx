import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import { 
  UserAccount, 
  NavTab, 
  DataPindah, 
  DataDatang, 
  DataRT, 
  DataRW, 
  StatistikPenduduk, 
  StatistikWajibKTP, 
  RunningTextItem, 
  JadwalPelayanan, 
  InformasiBerita, 
  GaleriFoto, 
  AppBranding 
} from './types';

// Layout & Common Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LoginForm } from './components/auth/LoginForm';

// Dashboard & Data Components
import { DashboardHome } from './components/dashboard/DashboardHome';
import { PindahTable } from './components/pindah/PindahTable';
import { PindahFormModal } from './components/pindah/PindahFormModal';
import { DatangTable } from './components/datang/DatangTable';
import { DatangFormModal } from './components/datang/DatangFormModal';
import { MasterRTRW } from './components/master/MasterRTRW';
import { JadwalInformasiManager } from './components/master/JadwalInformasiManager';
import { StatistikDemografiManager } from './components/master/StatistikDemografiManager';
import { GaleriManager } from './components/master/GaleriManager';
import { MyAccount } from './components/master/MyAccount';
import { UserManagement } from './components/master/UserManagement';
import { BrandingModal } from './components/master/BrandingModal';
import { DatabaseSyncModal } from './components/master/DatabaseSyncModal';
import { SuratKeteranganModal } from './components/surat/SuratKeteranganModal';

export const App: React.FC = () => {
  // State: Authentication
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => StorageService.getCurrentUser());
  const [allUsers, setAllUsers] = useState<UserAccount[]>(() => StorageService.getUsers());

  // State: Navigation
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // State: Core Master & Transactional Data
  const [branding, setBranding] = useState<AppBranding>(() => StorageService.getBranding());
  const [pindahList, setPindahList] = useState<DataPindah[]>(() => StorageService.getDataPindah());
  const [datangList, setDatangList] = useState<DataDatang[]>(() => StorageService.getDataDatang());
  const [rwList, setRwList] = useState<DataRW[]>(() => StorageService.getDataRW());
  const [rtList, setRtList] = useState<DataRT[]>(() => StorageService.getDataRT());
  const [statPenduduk, setStatPenduduk] = useState<StatistikPenduduk>(() => StorageService.getStatistikPenduduk());
  const [statKTP, setStatKTP] = useState<StatistikWajibKTP>(() => StorageService.getStatistikKTP());
  const [runningTexts, setRunningTexts] = useState<RunningTextItem[]>(() => StorageService.getRunningTexts());
  const [jadwalList, setJadwalList] = useState<JadwalPelayanan[]>(() => StorageService.getJadwalPelayanan());
  const [informasiList, setInformasiList] = useState<InformasiBerita[]>(() => StorageService.getInformasiBerita());
  const [galeriList, setGaleriList] = useState<GaleriFoto[]>(() => StorageService.getGaleriFoto());

  // State: Modals
  const [isPindahModalOpen, setIsPindahModalOpen] = useState(false);
  const [selectedPindahForEdit, setSelectedPindahForEdit] = useState<DataPindah | null>(null);

  const [isDatangModalOpen, setIsDatangModalOpen] = useState(false);
  const [selectedDatangForEdit, setSelectedDatangForEdit] = useState<DataDatang | null>(null);

  const [isBrandingModalOpen, setIsBrandingModalOpen] = useState(false);
  const [isDatabaseSyncOpen, setIsDatabaseSyncOpen] = useState(false);

  // State: Print Surat Keterangan Modal
  const [printModalData, setPrintModalData] = useState<{
    isOpen: boolean;
    type: 'PINDAH' | 'DATANG';
    data: DataPindah | DataDatang | null;
  }>({
    isOpen: false,
    type: 'PINDAH',
    data: null,
  });

  // State: View Details Modal
  const [viewDetailModal, setViewDetailModal] = useState<{
    isOpen: boolean;
    type: 'PINDAH' | 'DATANG';
    data: any;
  }>({
    isOpen: false,
    type: 'PINDAH',
    data: null,
  });

  // Authentication Handlers
  const handleLogin = (user: UserAccount) => {
    StorageService.setCurrentUser(user);
    setCurrentUser(user);
    setActiveTab('DASHBOARD');
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
    setActiveTab('DASHBOARD');
  };

  const handleSwitchUser = (user: UserAccount) => {
    StorageService.setCurrentUser(user);
    setCurrentUser(user);
  };

  // Data Pindah Handlers
  const handleSavePindah = (data: Partial<DataPindah>) => {
    if (data.id) {
      const updated = StorageService.updateDataPindah(data as DataPindah);
      setPindahList(updated);
    } else {
      const newItem: DataPindah = {
        id: `skp-${Date.now()}`,
        noSurat: data.noSurat || `471.2/${Math.floor(100 + Math.random() * 900)}/SKP-WNI/BTR/2026`,
        tanggalPindah: data.tanggalPindah || new Date().toISOString().split('T')[0],
        namaKepalaKeluarga: data.namaKepalaKeluarga || '',
        nik: data.nik || '',
        alamatAsal: data.alamatAsal || '',
        rtAsal: data.rtAsal || '001',
        rwAsal: data.rwAsal || '01',
        kelurahanAsal: 'BINTARO',
        kecamatanAsal: 'PESANGGRAHAN',
        alasanPindah: data.alasanPindah || 'Pekerjaan',
        alamatTujuan: data.alamatTujuan || '',
        rtTujuan: data.rtTujuan || '001',
        rwTujuan: data.rwTujuan || '01',
        kabKotaTujuan: data.kabKotaTujuan || '',
        provinsiTujuan: data.provinsiTujuan || '',
        jenisKepindahan: data.jenisKepindahan || 'Seluruh Anggota Keluarga',
        jumlahAnggota: data.jumlahAnggota || 1,
        status: data.status || 'Disetujui',
        keterangan: data.keterangan || '',
        anggotaList: data.anggotaList || [],
        createdAt: data.createdAt || new Date().toISOString(),
      };
      const updated = StorageService.saveDataPindah(newItem);
      setPindahList(updated);
    }
  };

  const handleDeletePindah = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data kepindahan ini?')) {
      const updated = StorageService.deleteDataPindah(id);
      setPindahList(updated);
    }
  };

  // Data Datang Handlers
  const handleSaveDatang = (data: Partial<DataDatang>) => {
    if (data.id) {
      const updated = StorageService.updateDataDatang(data as DataDatang);
      setDatangList(updated);
    } else {
      const newItem: DataDatang = {
        id: `skd-${Date.now()}`,
        noSurat: data.noSurat || `471.2/${Math.floor(100 + Math.random() * 900)}/SKD-WNI/BTR/2026`,
        tanggalDatang: data.tanggalDatang || new Date().toISOString().split('T')[0],
        namaPemohon: data.namaPemohon || '',
        nik: data.nik || '',
        alamatAsal: data.alamatAsal || '',
        kabKotaAsal: data.kabKotaAsal || '',
        provinsiAsal: data.provinsiAsal || '',
        alamatTujuan: data.alamatTujuan || '',
        rtTujuan: data.rtTujuan || '001',
        rwTujuan: data.rwTujuan || '01',
        kelurahanTujuan: 'BINTARO',
        kecamatanTujuan: 'PESANGGRAHAN',
        alasanDatang: data.alasanDatang || 'Domisili Baru',
        jumlahAnggota: data.jumlahAnggota || 1,
        status: data.status || 'Disetujui',
        keterangan: data.keterangan || '',
        anggotaList: data.anggotaList || [],
        createdAt: data.createdAt || new Date().toISOString(),
      };
      const updated = StorageService.saveDataDatang(newItem);
      setDatangList(updated);
    }
  };

  const handleDeleteDatang = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data kedatangan ini?')) {
      const updated = StorageService.deleteDataDatang(id);
      setDatangList(updated);
    }
  };

  // RT & RW Handlers
  const handleSaveRW = (rw: DataRW) => {
    const updated = StorageService.saveRW(rw);
    setRwList(updated);
  };

  const handleDeleteRW = (id: string) => {
    if (window.confirm('Hapus data pengurus RW ini?')) {
      const updated = StorageService.deleteRW(id);
      setRwList(updated);
    }
  };

  const handleSaveRT = (rt: DataRT) => {
    const updated = StorageService.saveRT(rt);
    setRtList(updated);
  };

  const handleDeleteRT = (id: string) => {
    if (window.confirm('Hapus data pengurus RT ini?')) {
      const updated = StorageService.deleteRT(id);
      setRtList(updated);
    }
  };

  // Demography & Running Text Handlers
  const handleSavePenduduk = (stat: StatistikPenduduk) => {
    StorageService.saveStatistikPenduduk(stat);
    setStatPenduduk(stat);
  };

  const handleSaveKTP = (stat: StatistikWajibKTP) => {
    StorageService.saveStatistikKTP(stat);
    setStatKTP(stat);
  };

  const handleSaveRunningTexts = (list: RunningTextItem[]) => {
    StorageService.saveRunningTexts(list);
    setRunningTexts(list);
  };

  // Jadwal & Informasi Handlers
  const handleSaveJadwal = (item: JadwalPelayanan) => {
    const updated = StorageService.saveJadwal(item);
    setJadwalList(updated);
  };

  const handleDeleteJadwal = (id: string) => {
    const updated = StorageService.deleteJadwal(id);
    setJadwalList(updated);
  };

  const handleSaveInformasi = (item: InformasiBerita) => {
    const updated = StorageService.saveInformasi(item);
    setInformasiList(updated);
  };

  const handleDeleteInformasi = (id: string) => {
    const updated = StorageService.deleteInformasi(id);
    setInformasiList(updated);
  };

  // Galeri Handlers
  const handleSaveGaleri = (item: GaleriFoto) => {
    const updated = StorageService.saveGaleri(item);
    setGaleriList(updated);
  };

  const handleDeleteGaleri = (id: string) => {
    const updated = StorageService.deleteGaleri(id);
    setGaleriList(updated);
  };

  // Branding Customizer Handler
  const handleSaveBranding = (newBranding: AppBranding) => {
    StorageService.saveBranding(newBranding);
    setBranding(newBranding);
  };

  // User Account Management Handlers
  const handleUpdateCurrentUser = (updates: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    StorageService.saveUser(updatedUser);
    StorageService.setCurrentUser(updatedUser);
    setCurrentUser(updatedUser);
    setAllUsers(StorageService.getUsers());
  };

  const handleSaveUserByAdmin = (user: UserAccount) => {
    const updated = StorageService.saveUser(user);
    setAllUsers(updated);
  };

  const handleDeleteUserByAdmin = (id: string) => {
    if (window.confirm('Hapus akun pengguna ini secara permanen?')) {
      const updated = StorageService.deleteUser(id);
      setAllUsers(updated);
    }
  };

  const handleToggleBlockUser = (id: string) => {
    const updated = StorageService.toggleBlockUser(id);
    setAllUsers(updated);
  };

  // Print handler
  const handleOpenPrintModal = (type: 'PINDAH' | 'DATANG', item: DataPindah | DataDatang) => {
    setPrintModalData({
      isOpen: true,
      type,
      data: item,
    });
  };

  // If not authenticated, render Login Screen
  if (!currentUser) {
    return (
      <LoginForm
        branding={branding}
        onLogin={handleLogin}
        registeredUsers={allUsers}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A192F] text-[#F8F9FA] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#0A192F]">
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        branding={branding}
        runningTexts={runningTexts}
        onLogout={handleLogout}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        onOpenMyAccount={() => setActiveTab('MY_ACCOUNT')}
        onOpenBranding={() => setIsBrandingModalOpen(true)}
        onOpenDatabaseSync={() => setIsDatabaseSyncOpen(true)}
        allUsers={allUsers}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Sidebar Navigation */}
        <Sidebar
          currentTab={activeTab}
          onSelectTab={(tab) => {
            if (tab === 'PINDAH_INPUT') {
              setSelectedPindahForEdit(null);
              setIsPindahModalOpen(true);
            } else if (tab === 'DATANG_INPUT') {
              setSelectedDatangForEdit(null);
              setIsDatangModalOpen(true);
            } else if (tab === 'BRANDING') {
              setIsBrandingModalOpen(true);
            } else if (tab === 'DATABASE_SYNC') {
              setIsDatabaseSyncOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          currentUser={currentUser}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
          onOpenBranding={() => setIsBrandingModalOpen(true)}
          onOpenDatabaseSync={() => setIsDatabaseSyncOpen(true)}
          branding={branding}
          pindahCount={pindahList.length}
          datangCount={datangList.length}
        />

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6 overflow-x-hidden">
          {/* TAB: DASHBOARD OVERVIEW */}
          {activeTab === 'DASHBOARD' && (
            <DashboardHome
              currentUser={currentUser}
              branding={branding}
              pindahList={pindahList}
              datangList={datangList}
              statPenduduk={statPenduduk}
              statKTP={statKTP}
              jadwalList={jadwalList}
              informasiList={informasiList}
              galeriList={galeriList}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenNewPindah={() => {
                setSelectedPindahForEdit(null);
                setIsPindahModalOpen(true);
              }}
              onOpenNewDatang={() => {
                setSelectedDatangForEdit(null);
                setIsDatangModalOpen(true);
              }}
              onPrintSurat={handleOpenPrintModal}
              onOpenDatabaseSync={() => setIsDatabaseSyncOpen(true)}
            />
          )}

          {/* TAB: DATA PINDAH TABLE */}
          {activeTab === 'PINDAH_TABEL' && (
            <PindahTable
              data={pindahList}
              currentUser={currentUser}
              branding={branding}
              onAddNew={() => {
                setSelectedPindahForEdit(null);
                setIsPindahModalOpen(true);
              }}
              onEdit={(item) => {
                setSelectedPindahForEdit(item);
                setIsPindahModalOpen(true);
              }}
              onDelete={handleDeletePindah}
              onView={(item) => setViewDetailModal({ isOpen: true, type: 'PINDAH', data: item })}
              onPrint={(item) => handleOpenPrintModal('PINDAH', item)}
            />
          )}

          {/* TAB: DATA DATANG TABLE */}
          {activeTab === 'DATANG_TABEL' && (
            <DatangTable
              data={datangList}
              currentUser={currentUser}
              branding={branding}
              onAddNew={() => {
                setSelectedDatangForEdit(null);
                setIsDatangModalOpen(true);
              }}
              onEdit={(item) => {
                setSelectedDatangForEdit(item);
                setIsDatangModalOpen(true);
              }}
              onDelete={handleDeleteDatang}
              onView={(item) => setViewDetailModal({ isOpen: true, type: 'DATANG', data: item })}
              onPrint={(item) => handleOpenPrintModal('DATANG', item)}
            />
          )}

          {/* TAB: MASTER RW DAN RT */}
          {activeTab === 'MASTER_RW_RT' && (
            <MasterRTRW
              rwList={rwList}
              rtList={rtList}
              currentUser={currentUser}
              onSaveRW={handleSaveRW}
              onSaveRT={handleSaveRT}
              onDeleteRT={handleDeleteRT}
              onDeleteRW={handleDeleteRW}
            />
          )}

          {/* TAB: JADWAL PELAYANAN & INFORMASI */}
          {(activeTab === 'JADWAL' || activeTab === 'INFORMASI') && (
            <JadwalInformasiManager
              activeSection={activeTab === 'JADWAL' ? 'JADWAL' : 'INFORMASI'}
              jadwalList={jadwalList}
              informasiList={informasiList}
              currentUser={currentUser}
              onSaveJadwal={handleSaveJadwal}
              onDeleteJadwal={handleDeleteJadwal}
              onSaveInformasi={handleSaveInformasi}
              onDeleteInformasi={handleDeleteInformasi}
            />
          )}

          {/* TAB: STATISTIK DEMOGRAFI & RUNNING TEXT */}
          {(activeTab === 'STAT_PENDUDUK' || activeTab === 'STAT_KTP' || activeTab === 'RUNNING_TEXT') && (
            <StatistikDemografiManager
              initialPenduduk={statPenduduk}
              initialKTP={statKTP}
              runningTexts={runningTexts}
              currentUser={currentUser}
              onSavePenduduk={handleSavePenduduk}
              onSaveKTP={handleSaveKTP}
              onSaveRunningText={handleSaveRunningTexts}
            />
          )}

          {/* TAB: GALERI FOTO */}
          {activeTab === 'GALERI' && (
            <GaleriManager
              galeriList={galeriList}
              currentUser={currentUser}
              onSaveGaleri={handleSaveGaleri}
              onDeleteGaleri={handleDeleteGaleri}
            />
          )}

          {/* TAB: AKUN SAYA */}
          {activeTab === 'MY_ACCOUNT' && (
            <MyAccount
              currentUser={currentUser}
              onUpdateUser={handleUpdateCurrentUser}
            />
          )}

          {/* TAB: USER MANAGEMENT (ADMINISTRATOR ONLY) */}
          {activeTab === 'USERS' && (
            <UserManagement
              users={allUsers}
              currentUser={currentUser}
              onSaveUser={handleSaveUserByAdmin}
              onDeleteUser={handleDeleteUserByAdmin}
              onToggleBlockUser={handleToggleBlockUser}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer branding={branding} />

      {/* Form Modal: Pindah */}
      <PindahFormModal
        isOpen={isPindahModalOpen}
        initialData={selectedPindahForEdit}
        onClose={() => {
          setIsPindahModalOpen(false);
          setSelectedPindahForEdit(null);
        }}
        onSave={handleSavePindah}
      />

      {/* Form Modal: Datang */}
      <DatangFormModal
        isOpen={isDatangModalOpen}
        initialData={selectedDatangForEdit}
        onClose={() => {
          setIsDatangModalOpen(false);
          setSelectedDatangForEdit(null);
        }}
        onSave={handleSaveDatang}
      />

      {/* Branding & Logo Customizer Modal */}
      <BrandingModal
        branding={branding}
        isOpen={isBrandingModalOpen}
        onClose={() => setIsBrandingModalOpen(false)}
        onSave={handleSaveBranding}
      />

      {/* Database MySQL & GitHub Sync Modal */}
      <DatabaseSyncModal
        isOpen={isDatabaseSyncOpen}
        onClose={() => setIsDatabaseSyncOpen(false)}
      />

      {/* Surat Keterangan Print Modal */}
      <SuratKeteranganModal
        isOpen={printModalData.isOpen}
        type={printModalData.type}
        data={printModalData.data}
        branding={branding}
        onClose={() => setPrintModalData({ isOpen: false, type: 'PINDAH', data: null })}
      />

      {/* View Detail Modal */}
      {viewDetailModal.isOpen && viewDetailModal.data && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-[#F8F9FA] text-base">
                Detail Berkas Registrasi {viewDetailModal.type === 'PINDAH' ? 'Surat Pindah (SKP)' : 'Surat Datang (SKD)'}
              </h3>
              <button
                type="button"
                onClick={() => setViewDetailModal({ isOpen: false, type: 'PINDAH', data: null })}
                className="p-1 rounded-lg neu-button text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl neu-inset">
                <div>
                  <span className="text-gray-400 block">Nomor Surat:</span>
                  <span className="font-mono text-[#D4AF37] font-bold">{viewDetailModal.data.noSurat}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Tanggal:</span>
                  <span className="text-gray-200 font-bold">{viewDetailModal.data.tanggalPindah || viewDetailModal.data.tanggalDatang}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Nama Pemohon:</span>
                  <span className="text-gray-200 font-bold">{viewDetailModal.data.namaKepalaKeluarga || viewDetailModal.data.namaPemohon}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">NIK:</span>
                  <span className="font-mono text-gray-300">{viewDetailModal.data.nik}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl neu-inset space-y-1">
                <span className="text-gray-400 block">Alamat Asal:</span>
                <p className="text-gray-200">{viewDetailModal.data.alamatAsal} {viewDetailModal.data.kabKotaAsal && `(${viewDetailModal.data.kabKotaAsal}, ${viewDetailModal.data.provinsiAsal})`}</p>
              </div>

              <div className="p-3 rounded-xl neu-inset space-y-1">
                <span className="text-gray-400 block">Alamat Tujuan:</span>
                <p className="text-gray-200">{viewDetailModal.data.alamatTujuan} {viewDetailModal.data.kabKotaTujuan && `(${viewDetailModal.data.kabKotaTujuan}, ${viewDetailModal.data.provinsiTujuan})`}</p>
              </div>

              {viewDetailModal.data.anggotaList && viewDetailModal.data.anggotaList.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-gray-300 font-bold block">Anggota Keluarga Terdaftar ({viewDetailModal.data.anggotaList.length} Orang):</span>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {viewDetailModal.data.anggotaList.map((ang: any, i: number) => (
                      <div key={i} className="p-2 rounded-lg neu-inset flex items-center justify-between text-[11px]">
                        <span className="font-bold text-gray-200">{ang.nama || 'Anggota'}</span>
                        <span className="font-mono text-gray-400">{ang.nik} ({ang.shdk})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const itm = viewDetailModal.data;
                  const typ = viewDetailModal.type;
                  setViewDetailModal({ isOpen: false, type: 'PINDAH', data: null });
                  handleOpenPrintModal(typ, itm);
                }}
                className="px-4 py-2 rounded-xl neu-button-gold text-xs font-bold"
              >
                Cetak Surat Resmi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
