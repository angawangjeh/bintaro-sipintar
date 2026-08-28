import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Download, 
  GitBranch, 
  Check, 
  Copy, 
  Terminal, 
  Server, 
  Layers, 
  Code2, 
  Sparkles,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { StorageService } from '../../services/storage';

interface DatabaseSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSyncModal: React.FC<DatabaseSyncModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'MYSQL' | 'GITHUB'>('MYSQL');

  if (!isOpen) return null;

  const sqlDump = StorageService.generateMySQLDump();

  const handleCopySQL = () => {
    navigator.clipboard.writeText(sqlDump);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSQL = () => {
    const blob = new Blob([sqlDump], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sipintar_bintaro_db_${new Date().toISOString().split('T')[0]}.sql`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0A192F] rounded-3xl neu-raised-lg border border-[#D4AF37]/40 shadow-2xl p-6 space-y-5 my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl neu-inset flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8F9FA] flex items-center gap-2">
                <span>Integrasi Database MySQL & Sinkronisasi GitHub</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full neu-inset text-emerald-300 border border-emerald-500/30">
                  Ready DDL/DML Schema
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Skema struktur tabel lengkap MySQL (InnoDB, UTF-8) dan konfigurasi repository GitHub
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl neu-button text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl neu-inset bg-[#0c1c33] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('MYSQL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'MYSQL'
                ? 'neu-button-active text-[#D4AF37] border border-[#D4AF37]/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Skrip SQL Schema & Dump (MySQL)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('GITHUB')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'GITHUB'
                ? 'neu-button-active text-sky-300 border border-sky-500/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Konektivitas GitHub Repository</span>
          </button>
        </div>

        {/* TAB 1: MYSQL DUMP VIEWER */}
        {activeTab === 'MYSQL' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-300">
                <Server className="w-4 h-4 text-[#D4AF37]" />
                <span>Database: <strong>db_sipintar_bintaro</strong> (7 Tabel Relasional)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySQL}
                  className="px-3.5 py-1.5 rounded-xl neu-button text-xs font-bold text-sky-300 flex items-center gap-1.5 hover:text-white cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin SQL'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSQL}
                  className="px-4 py-1.5 rounded-xl neu-button-gold text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File .SQL</span>
                </button>
              </div>
            </div>

            {/* SQL Code View */}
            <div className="flex-1 overflow-y-auto rounded-2xl neu-inset p-4 font-mono text-[11px] text-amber-200/90 leading-relaxed bg-[#050e1a] border border-white/5 scrollbar-thin max-h-[50vh]">
              <pre className="whitespace-pre-wrap">{sqlDump}</pre>
            </div>

            {/* MySQL Deployment Guide */}
            <div className="p-3 rounded-xl neu-raised text-[11px] text-gray-300 space-y-1">
              <p className="font-bold text-[#D4AF37] flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Cara Import ke MySQL Server / phpMyAdmin:
              </p>
              <p className="font-mono text-gray-400">
                mysql -u root -p -e &quot;CREATE DATABASE IF NOT EXISTS db_sipintar_bintaro;&quot; &amp;&amp; mysql -u root -p db_sipintar_bintaro &lt; sipintar_bintaro_db.sql
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: GITHUB CONNECTIVITY */}
        {activeTab === 'GITHUB' && (
          <div className="flex-1 overflow-y-auto space-y-4 text-xs">
            <div className="p-5 rounded-2xl neu-raised border border-white/5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center text-sky-400">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#F8F9FA] text-sm">Status Sinkronisasi Kode ke GitHub</h4>
                  <p className="text-gray-400 text-[11px]">Branch Utama: <code className="text-[#D4AF37]">main</code> / <code className="text-[#D4AF37]">production</code></p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Aplikasi SIPINTAR telah dirancang dengan arsitektur modular TypeScript React + Vite modern, mendukung integrasi CI/CD GitHub Actions untuk deployment otomatis ke cloud server / web hosting.
              </p>

              <div className="p-4 rounded-xl neu-inset font-mono text-[11px] space-y-1.5 text-gray-300 bg-[#050e1a]">
                <p className="text-gray-500"># Inisialisasi dan push ke remote repository GitHub</p>
                <p className="text-emerald-400">git init</p>
                <p className="text-emerald-400">git add .</p>
                <p className="text-emerald-400">git commit -m &quot;feat: SIPINTAR - Sistem Informasi Pindah Datang Bintaro Neumorphism v1.0&quot;</p>
                <p className="text-emerald-400">git branch -M main</p>
                <p className="text-emerald-400">git remote add origin https://github.com/kelurahan-bintaro/sipintar-app.git</p>
                <p className="text-emerald-400">git push -u origin main</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl neu-inset space-y-1.5">
                <h5 className="font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4" /> Environment Config (.env)
                </h5>
                <p className="text-gray-400 text-[11px]">
                  Konfigurasi host MySQL, user, password, dan port untuk backend service.
                </p>
              </div>

              <div className="p-4 rounded-2xl neu-inset space-y-1.5">
                <h5 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Standar Keamanan Data
                </h5>
                <p className="text-gray-400 text-[11px]">
                  Enkripsi NIK &amp; Nomor KK sesuai standar Dukcapil Permendagri No. 108/2019.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-2xl neu-button text-xs font-bold text-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
