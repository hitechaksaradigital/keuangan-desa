import React, { useState } from 'react';
import { KibCategory } from '../../data/aset';

interface CetakKibModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: KibCategory;
}

export function CetakKibModal({
  isOpen,
  onClose,
  activeCategory,
}: CetakKibModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'current' | 'all'>('current');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleSimulateDownload = (type: string) => {
    setDownloadSuccess(true);
    setTimeout(() => {
      alert(`Berkas Buku Inventaris (${type}) berhasil disiapkan untuk T.A. 2024.`);
      setDownloadSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
              print
            </span>
            <h3>Cetak Buku Inventaris Aset (KIB)</h3>
          </div>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal-body">
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--on-surface-variant)' }}>
            Pilih format laporan cetak buku inventaris barang milik desa sesuai standar SIPADES v3.1 & Permendagri No. 1/2016:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                border: selectedFormat === 'current' ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                background: selectedFormat === 'current' ? 'var(--surface-container-low)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="printScope"
                checked={selectedFormat === 'current'}
                onChange={() => setSelectedFormat('current')}
              />
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--on-surface)', display: 'block' }}>
                  KIB {activeCategory} Saja (Kategori Aktif)
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
                  Mencetak lembar kartu inventaris kategori saat ini.
                </span>
              </div>
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px',
                borderRadius: '8px',
                border: selectedFormat === 'all' ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                background: selectedFormat === 'all' ? 'var(--surface-container-low)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="printScope"
                checked={selectedFormat === 'all'}
                onChange={() => setSelectedFormat('all')}
              />
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--on-surface)', display: 'block' }}>
                  Buku Induk Inventaris Lengkap (KIB A s.d F)
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
                  Kompilasi neraca aset tetap menyeluruh T.A. 2024.
                </span>
              </div>
            </label>
          </div>

          <div
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--surface-container-low)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: 'var(--tertiary)' }}>
              verified
            </span>
            <span style={{ fontSize: '12px', color: 'var(--on-surface)' }}>
              Laporan dilengkapi kolom tanda tangan Kepala Desa, Sekretaris Desa, dan verifikasi Inspektorat.
            </span>
          </div>

          {downloadSuccess && (
            <div
              style={{
                padding: '10px',
                borderRadius: '6px',
                background: '#ecfdf5',
                color: '#065f46',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              Menyiapkan dokumen cetak...
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary-surface"
            onClick={() => handleSimulateDownload('Excel .xlsx')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              table_view
            </span>
            <span>Unduh Excel</span>
          </button>
          <button type="button" className="btn-primary-action" onClick={handlePrint}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              print
            </span>
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
