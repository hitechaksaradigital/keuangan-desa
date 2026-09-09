import React, { useState } from 'react';
import {
  BumdesUnit,
  DividendDeposit,
  AuditDocument,
  formatRupiah,
} from '../../data/aset';

interface BumdesViewProps {
  units: BumdesUnit[];
  dividendDeposits: DividendDeposit[];
  auditDocuments: AuditDocument[];
}

export function BumdesView({
  units,
  dividendDeposits,
  auditDocuments,
}: BumdesViewProps) {
  const [documents, setDocuments] = useState<AuditDocument[]>(auditDocuments);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        setTimeout(() => {
          const newDoc: AuditDocument = {
            id: `doc-${Date.now()}`,
            title: file.name,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            verificationStatus: 'Menunggu Verifikasi BPD',
            fileType: file.name.endsWith('.pdf') ? 'pdf' : 'doc',
          };
          setDocuments((prev) => [newDoc, ...prev]);
          setIsUploading(false);
          alert(`Berkas "${file.name}" berhasil diunggah untuk audit Musdes.`);
        }, 800);
      }
    };
    input.click();
  };

  const handleDownloadDoc = (doc: AuditDocument) => {
    alert(`Mengunduh dokumen audit: ${doc.title} (${doc.fileSize})`);
  };

  const totalDividends = dividendDeposits.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="bumdes-view-container" id="bumdesView">
      {/* Header Unit Profil & Kinerja */}
      <div className="bumdes-profile-card">
        <div className="bumdes-profile-left">
          <div className="bumdes-avatar-box">
            <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
              store
            </span>
          </div>

          <div className="bumdes-title-block">
            <div className="bumdes-name-row">
              <h2>BUMDes "Berkah Mandiri Sejahtera"</h2>
              <span className="badge-legal-ahu">Badan Hukum No. AHU-00192.AH.01.33</span>
            </div>
            <span className="bumdes-director-subtitle">
              Direktur: Drs. H. Ahmad Hambali | Terakreditasi Mandiri oleh Kemendesa PDTT
            </span>
          </div>
        </div>

        {/* Quick Metrics Ribbon */}
        <div className="bumdes-metrics-ribbon">
          <div className="ribbon-metric-item">
            <span className="ribbon-metric-label">Porsi Bagi Hasil PADes</span>
            <span className="ribbon-metric-value primary">40.0% Net Profit</span>
          </div>

          <div className="ribbon-divider"></div>

          <div className="ribbon-metric-item">
            <span className="ribbon-metric-label">Total Omset T.A. 2024</span>
            <span className="ribbon-metric-value secondary">Rp 312.400.000</span>
          </div>

          <div className="ribbon-divider"></div>

          <div className="ribbon-metric-item">
            <span className="ribbon-metric-label">Audit Keuangan</span>
            <span className="ribbon-metric-value tertiary">WTP (Inspektorat)</span>
          </div>
        </div>
      </div>

      {/* 4 Unit Usaha Aktif (Grid Bento Cards) */}
      <div className="bumdes-units-grid">
        {units.map((unit) => {
          return (
            <div key={unit.id} className="bumdes-unit-card">
              <div className="unit-top-section">
                <div className="unit-badges-row">
                  <span className={`unit-tag tag-${unit.tagColor}`}>{unit.unitNumber}</span>
                  <span className="unit-health-badge">
                    <span className="unit-health-dot"></span>
                    {unit.status}
                  </span>
                </div>

                <h3 className="unit-title">{unit.name}</h3>
                <p className="unit-desc">{unit.description}</p>
              </div>

              <div className="unit-bottom-section">
                <div className="unit-stat-row">
                  <span className="stat-label-muted">Laba Bersih Smt II:</span>
                  <span className="stat-val-semibold">{formatRupiah(unit.netProfitSemester2)}</span>
                </div>

                <div className="unit-stat-row">
                  <span className="stat-label-muted">Kontribusi PADes:</span>
                  <span className="stat-val-bold-primary">
                    {formatRupiah(unit.padesContribution)}
                  </span>
                </div>

                <div className="metric-progress-track">
                  <div
                    className={`metric-progress-fill fill-${unit.tagColor}`}
                    style={{ width: `${unit.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Riwayat Transfer Deviden & Dokumen Lampiran Audit (3-column grid) */}
      <div className="bumdes-bottom-grid">
        {/* Tabel Riwayat Transfer Kas Desa */}
        <div className="card-section-box">
          <div>
            <div className="section-box-header">
              <div className="header-text-block">
                <h3>Riwayat Setoran Deviden ke Rekening Kas Desa</h3>
                <p>
                  Tercatat otomatis pada Buku Kas Umum (BKU) Penerimaan Pendapatan Asli Desa (PADes)
                </p>
              </div>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '26px' }}>
                verified_user
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="dividend-table">
                <thead>
                  <tr>
                    <th>Tanggal Setor</th>
                    <th>No. Bukti Transaksi</th>
                    <th>Periode Laba</th>
                    <th style={{ textAlign: 'right' }}>Jumlah Setor</th>
                    <th style={{ textAlign: 'center' }}>Status STS</th>
                  </tr>
                </thead>
                <tbody>
                  {dividendDeposits.map((tx) => (
                    <tr key={tx.id}>
                      <td style={{ fontFamily: 'var(--font-currency)', fontWeight: '600' }}>
                        {tx.date}
                      </td>
                      <td>
                        <span style={{ fontWeight: '600', color: 'var(--primary)', display: 'block' }}>
                          {tx.referenceNumber}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>
                          {tx.bankName}
                        </span>
                      </td>
                      <td>{tx.period}</td>
                      <td
                        style={{
                          textAlign: 'right',
                          fontFamily: 'var(--font-currency)',
                          fontWeight: '700',
                          color: 'var(--primary)',
                        }}
                      >
                        {formatRupiah(tx.amount)}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className="sts-badge-valid">{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dividend-total-card">
            <span className="dividend-total-label">
              Total Setor Deviden Masuk Kas Desa (2024):
            </span>
            <span className="dividend-total-number">{formatRupiah(totalDividends)}</span>
          </div>
        </div>

        {/* Dokumen & Berkas Audit BUMDes */}
        <div className="card-section-box">
          <div>
            <div className="header-text-block">
              <h3>Laporan Keuangan & Legalitas</h3>
              <p>Dokumen resmi yang diserahkan dalam Musdes Pertanggungjawaban Tahunan</p>
            </div>

            <div className="audit-files-list">
              {documents.map((doc) => (
                <div key={doc.id} className="audit-file-item">
                  <div className="file-info-group">
                    <span className="material-symbols-outlined file-icon-pdf">
                      {doc.fileType === 'pdf' ? 'picture_as_pdf' : 'description'}
                    </span>
                    <div className="file-text-col">
                      <span className="file-title-name" title={doc.title}>
                        {doc.title}
                      </span>
                      <span className="file-meta-sub">
                        {doc.fileSize} • {doc.verificationStatus}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-download-icon"
                    title="Unduh Berkas"
                    onClick={() => handleDownloadDoc(doc)}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                      download
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn-upload-audit"
            disabled={isUploading}
            onClick={handleSimulateUpload}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              cloud_upload
            </span>
            <span>{isUploading ? 'Mengunggah Berkas...' : 'Unggah Berkas Audit Baru'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
