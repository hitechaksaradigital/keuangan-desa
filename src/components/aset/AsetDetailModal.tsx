import React from 'react';
import { KibAsset, formatRupiah } from '../../data/aset';

interface AsetDetailModalProps {
  asset: KibAsset | null;
  onClose: () => void;
}

export function AsetDetailModal({ asset, onClose }: AsetDetailModalProps) {
  if (!asset) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
              domain
            </span>
            <h3>Lembar Inventaris Barang Milik Desa</h3>
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
          {/* Header Card Summary */}
          <div
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--surface-container-low)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <span className="badge-sipades" style={{ marginBottom: '6px', display: 'inline-block' }}>
                KIB {asset.category} - {asset.documentType}
              </span>
              <h4 style={{ margin: '4px 0', fontSize: '18px', color: 'var(--primary)', fontWeight: '700' }}>
                {asset.name}
              </h4>
              <span style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>
                Kode SIPADES: <strong>{asset.registerCode}</strong>
              </span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)', display: 'block' }}>
                Nilai Buku Saat Ini
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-currency)',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--primary)',
                }}
              >
                {formatRupiah(asset.bookValue)}
              </span>
            </div>
          </div>

          {/* Detailed Spec Grid */}
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Spesifikasi & Ukuran</span>
              <span className="detail-val">{asset.specification}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Kondisi Fisik Terkini</span>
              <div>
                <span
                  className={`condition-pill ${
                    asset.condition.includes('Rusak') ? 'warning' : 'good'
                  }`}
                >
                  <span className="condition-indicator"></span>
                  {asset.condition}
                </span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Tahun & Sumber Perolehan</span>
              <span className="detail-val">
                Tahun {asset.year} • {asset.fundingSource}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Asal Usul Perolehan</span>
              <span className="detail-val">{asset.origin}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Dokumen Legalitas / Register</span>
              <span className="detail-val">{asset.documentNumber}</span>
              <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>
                {asset.statusLegal}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Lokasi Keberadaan</span>
              <span className="detail-val">{asset.location}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Pejabat Penanggung Jawab</span>
              <span className="detail-val">{asset.personInCharge}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Nilai Perolehan Awal</span>
              <span className="detail-val" style={{ fontFamily: 'var(--font-currency)' }}>
                {formatRupiah(asset.acquisitionValue)}
              </span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Akumulasi Penyusutan</span>
              <span className="detail-val" style={{ fontFamily: 'var(--font-currency)' }}>
                {formatRupiah(asset.accumulatedDepreciation)}
              </span>
            </div>

            {asset.coordinates && (
              <div className="detail-item">
                <span className="detail-label">Koordinat Geospasial</span>
                <span className="detail-val" style={{ fontFamily: 'monospace' }}>
                  {asset.coordinates}
                </span>
              </div>
            )}
          </div>

          {asset.notes && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'var(--surface-container-low)',
                borderLeft: '3px solid var(--primary)',
                fontSize: '12px',
                lineHeight: '18px',
                color: 'var(--on-surface)',
              }}
            >
              <strong>Catatan Penatausahaan & Pemanfaatan:</strong>
              <p style={{ margin: '4px 0 0', color: 'var(--on-surface-variant)' }}>{asset.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary-surface"
            onClick={() => window.print()}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              print
            </span>
            <span>Cetak Kartu Aset</span>
          </button>
          <button type="button" className="btn-primary-action" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
