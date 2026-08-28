import React, { useState } from 'react';
import { 
  Images, 
  Upload, 
  Plus, 
  Trash2, 
  Eye, 
  Calendar, 
  CheckCircle, 
  X,
  FileImage,
  Sparkles
} from 'lucide-react';
import { GaleriFoto, UserAccount } from '../../types';

interface GaleriManagerProps {
  galeriList: GaleriFoto[];
  currentUser: UserAccount;
  onSaveGaleri: (item: GaleriFoto) => void;
  onDeleteGaleri: (id: string) => void;
}

export const GaleriManager: React.FC<GaleriManagerProps> = ({
  galeriList,
  currentUser,
  onSaveGaleri,
  onDeleteGaleri,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedItemForView, setSelectedItemForView] = useState<GaleriFoto | null>(null);

  const [formData, setFormData] = useState<{
    judul: string;
    keterangan: string;
    status: 'Aktif' | 'Nonaktif';
    fileBase64: string;
    fileName: string;
  }>({
    judul: '',
    keterangan: '',
    status: 'Aktif',
    fileBase64: '',
    fileName: '',
  });

  const isAdminOrPetugas = currentUser.role === 'ADMIN' || currentUser.role === 'PETUGAS';

  // Handle direct file upload (FileReader converting to base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setFormData({
          ...formData,
          fileBase64: result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileBase64) {
      alert('Silakan pilih file foto untuk diunggah.');
      return;
    }

    const newPhoto: GaleriFoto = {
      id: `gal-${Date.now()}`,
      judul: formData.judul,
      keterangan: formData.keterangan,
      status: formData.status,
      tanggalUpload: new Date().toISOString().split('T')[0],
      imageUrl: formData.fileBase64,
      uploader: currentUser.fullName,
    };

    onSaveGaleri(newPhoto);
    setIsModalOpen(false);
    setFormData({
      judul: '',
      keterangan: '',
      status: 'Aktif',
      fileBase64: '',
      fileName: '',
    });
  };

  return (
    <div id="galeri-manager-container" className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl neu-raised border border-[#D4AF37]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center text-amber-400 border border-amber-500/30">
            <Images className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F8F9FA] flex items-center gap-2">
              <span>Galeri & Dokumentasi Kegiatan</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full neu-inset text-[#D4AF37] border border-[#D4AF37]/30 font-semibold">
                {galeriList.length} Foto
              </span>
            </h2>
            <p className="text-xs text-gray-400">
              Dokumentasi pelayanan administrasi kependudukan dan kegiatan Kelurahan Bintaro
            </p>
          </div>
        </div>

        {isAdminOrPetugas && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="py-2.5 px-5 rounded-2xl neu-button-gold text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>+ UPLOAD FOTO KEGIATAN</span>
          </button>
        )}
      </div>

      {/* Grid Galeri Foto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {galeriList.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl neu-raised border border-white/5 overflow-hidden group hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative aspect-video w-full overflow-hidden bg-black/40">
              <img
                src={item.imageUrl}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 flex items-center gap-1.5">
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold shadow-md ${
                    item.status === 'Aktif'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            {/* Content Box */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <h4 className="text-xs font-bold text-[#F8F9FA] group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                  {item.judul}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.keterangan}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3 h-3 text-[#D4AF37]" />
                  {item.tanggalUpload}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedItemForView(item)}
                    className="p-1 rounded-lg neu-button text-sky-300 hover:text-white"
                    title="Lihat Foto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {isAdminOrPetugas && (
                    <button
                      type="button"
                      onClick={() => onDeleteGaleri(item.id)}
                      className="p-1 rounded-lg neu-button text-red-400 hover:text-red-300"
                      title="Hapus Foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Upload Foto (Direct File Upload) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#D4AF37]" />
                <span>Upload Foto Galeri (Bukan URL)</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl neu-button text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">JUDUL DOKUMENTASI / FOTO</label>
                <input
                  type="text"
                  placeholder="Contoh: Layanan Jemput Bola Perekaman KTP-el RW 08"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl neu-inset neu-inset-focus text-gray-200"
                  required
                />
              </div>

              {/* Upload file section */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  PILIH FILE FOTO DARI KOMPUTER / PERANGKAT (JPG/PNG/WEBP)
                </label>
                <div className="p-4 rounded-2xl neu-inset border border-dashed border-[#D4AF37]/40 text-center space-y-2">
                  {formData.fileBase64 ? (
                    <div className="space-y-2">
                      <img
                        src={formData.fileBase64}
                        alt="Preview"
                        className="max-h-36 mx-auto rounded-xl shadow-md border border-white/10"
                      />
                      <p className="text-[11px] text-emerald-400 font-mono">
                        {formData.fileName} (Siap Diunggah)
                      </p>
                    </div>
                  ) : (
                    <div className="py-3">
                      <FileImage className="w-8 h-8 mx-auto text-[#D4AF37]/80 mb-2" />
                      <p className="text-gray-400 text-xs">Klik tombol di bawah untuk memilih file</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    id="galeri-file-input"
                    className="hidden"
                  />
                  <label
                    htmlFor="galeri-file-input"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl neu-button text-xs font-bold text-[#D4AF37] cursor-pointer hover:scale-105 transition-transform"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{formData.fileBase64 ? 'Ganti File Foto' : 'Pilih File Gambar'}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">KETERANGAN / DESKRIPSI</label>
                <textarea
                  rows={3}
                  placeholder="Keterangan singkat kegiatan dan lokasi RW..."
                  value={formData.keterangan}
                  onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">STATUS TAMPIL</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl neu-inset neu-inset-focus text-gray-200"
                >
                  <option value="Aktif">Aktif (Tampil di Dashboard)</option>
                  <option value="Nonaktif">Nonaktif / Arsip</option>
                </select>
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
                  Simpan & Unggah Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Full Image */}
      {selectedItemForView && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/40 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-[#F8F9FA] text-sm">{selectedItemForView.judul}</h3>
              <button
                type="button"
                onClick={() => setSelectedItemForView(null)}
                className="p-1.5 rounded-xl neu-button text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-hidden rounded-2xl border border-white/10 flex items-center justify-center bg-black">
              <img
                src={selectedItemForView.imageUrl}
                alt={selectedItemForView.judul}
                className="max-h-[60vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-xs text-gray-300">{selectedItemForView.keterangan}</p>
            <p className="text-[11px] text-gray-500 font-mono">
              Diunggah oleh: {selectedItemForView.uploader} ({selectedItemForView.tanggalUpload})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
