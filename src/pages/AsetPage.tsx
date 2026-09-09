import { useState } from 'react';
import {
  KibAsset,
  KibCategory,
  initialKibAssets,
  initialAssetMetrics,
  bumdesUnits,
  dividendDeposits,
  auditDocuments,
  formatCurrencySimple,
} from '../data/aset';
import { KibView } from '../components/aset/KibView';
import { BumdesView } from '../components/aset/BumdesView';
import { AsetDetailModal } from '../components/aset/AsetDetailModal';
import { RegistrasiAsetModal } from '../components/aset/RegistrasiAsetModal';
import { CetakKibModal } from '../components/aset/CetakKibModal';

export function AsetPage() {
  const [mainTab, setMainTab] = useState<'kib' | 'bumdes'>('kib');
  const [activeKibCategory, setActiveKibCategory] = useState<KibCategory>('A');
  const [assets, setAssets] = useState<KibAsset[]>(initialKibAssets);
  const [metrics, setMetrics] = useState(initialAssetMetrics);

  // Modals state
  const [selectedAsset, setSelectedAsset] = useState<KibAsset | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleAddAsset = (newAsset: KibAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    setActiveKibCategory(newAsset.category);
    setMetrics((prev) => ({
      ...prev,
      registeredCount: prev.registeredCount + 1,
      totalAssetValue: prev.totalAssetValue + newAsset.acquisitionValue,
    }));
  };

  return (
    <div className="aset-page">
      {/* Header Title & Control Ribbon */}
      <div className="aset-header-ribbon">
        <div className="aset-title-group">
          <div className="aset-pill-tag">
            <span className="badge-sipades">SIPADES v3.1 Terhubung</span>
            <span className="tag-separator">|</span>
            <span className="tag-meta-text">Kompilasi Neraca Akhir T.A. 2024</span>
          </div>
          <h1>Pengelolaan Aset Milik Desa & Monitoring Usaha BUMDes</h1>
          <p>
            Konsolidasi penatausahaan inventaris barang milik desa (KIB A–F) serta audit kinerja penyertaan modal BUMDes Berkah Mandiri.
          </p>
        </div>

        {/* Top Actions */}
        <div className="aset-top-actions">
          <button
            type="button"
            className="btn-secondary-surface"
            onClick={() => setIsPrintModalOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              download_for_offline
            </span>
            <span>Cetak Buku Inventaris (KIB)</span>
          </button>

          <button
            type="button"
            className="btn-primary-action"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              add_circle
            </span>
            <span>Registrasi Aset Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Metrik Ringkasan Utama */}
      <div className="aset-metrics-grid">
        {/* Card 1: Total Nilai Aset Desa */}
        <div className="aset-metric-card">
          <div className="metric-card-top">
            <div className="metric-header-text">
              <span className="metric-label-eyebrow">Total Nilai Aset Desa</span>
              <span className="metric-sublabel">Buku Inventaris (KIB A s.d F)</span>
            </div>
            <div className="metric-icon-box icon-box-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                account_balance
              </span>
            </div>
          </div>

          <div className="metric-card-bottom">
            <div className="metric-value-row">
              <span className="currency-prefix">Rp</span>
              <span className="currency-number">
                {formatCurrencySimple(metrics.totalAssetValue)}
              </span>
            </div>
            <div className="metric-meta-row">
              <span>{metrics.registeredCount} Nomor Register Sah</span>
              <span className="badge-growth-tertiary">{metrics.yoyGrowth}</span>
            </div>
            <div className="metric-progress-track">
              <div className="metric-progress-fill fill-primary" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Penyertaan Modal Desa */}
        <div className="aset-metric-card">
          <div className="metric-card-top">
            <div className="metric-header-text">
              <span className="metric-label-eyebrow">Penyertaan Modal Desa</span>
              <span className="metric-sublabel">BUMDes (Akumulasi 2021–2024)</span>
            </div>
            <div className="metric-icon-box icon-box-secondary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                account_tree
              </span>
            </div>
          </div>

          <div className="metric-card-bottom">
            <div className="metric-value-row">
              <span className="currency-prefix color-secondary">Rp</span>
              <span className="currency-number color-secondary">
                {formatCurrencySimple(metrics.capitalParticipation)}
              </span>
            </div>
            <div className="metric-meta-row">
              <span>{metrics.decreeNumber}</span>
              <span className="badge-neutral-chip">{metrics.perdesNumber}</span>
            </div>
            <div className="metric-progress-track">
              <div className="metric-progress-fill fill-secondary" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Realisasi Deviden PADes */}
        <div className="aset-metric-card">
          <div className="metric-card-top">
            <div className="metric-header-text">
              <span className="metric-label-eyebrow">Realisasi Deviden PADes</span>
              <span className="metric-sublabel">Tahun Berjalan 2024 ({metrics.dividendPercentage}%)</span>
            </div>
            <div className="metric-icon-box icon-box-tertiary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                monetization_on
              </span>
            </div>
          </div>

          <div className="metric-card-bottom">
            <div className="metric-value-row">
              <span className="currency-prefix color-tertiary">Rp</span>
              <span className="currency-number color-tertiary">
                {formatCurrencySimple(metrics.dividendRealization)}
              </span>
            </div>
            <div className="metric-meta-row">
              <span>Target: Rp {formatCurrencySimple(metrics.dividendTarget)}</span>
              <span className="badge-diff-chip">Sisa Rp 1,5 Jt</span>
            </div>
            <div className="metric-progress-track">
              <div
                className="metric-progress-fill fill-tertiary"
                style={{ width: `${metrics.dividendPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4: Unit Usaha BUMDes */}
        <div className="aset-metric-card">
          <div className="metric-card-top">
            <div className="metric-header-text">
              <span className="metric-label-eyebrow">Unit Usaha BUMDes</span>
              <span className="metric-sublabel">Operasional Mandiri</span>
            </div>
            <div className="metric-icon-box icon-box-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                hub
              </span>
            </div>
          </div>

          <div className="metric-card-bottom">
            <div className="metric-value-row">
              <span className="unit-count-number">{metrics.bumdesActiveUnits}</span>
              <span className="unit-count-label">Unit Aktif</span>
            </div>
            <div className="metric-meta-row">
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {metrics.unitList}
              </span>
              <span className="status-badge-healthy">
                <span className="pulse-dot"></span>
                {metrics.statusLabel}
              </span>
            </div>
            <div className="metric-progress-track">
              <div className="metric-progress-fill fill-primary" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Tab Switcher */}
      <div className="aset-main-tabs-bar">
        <div className="aset-tabs-group" id="mainTabContainer">
          <button
            type="button"
            className={`tab-main-btn ${mainTab === 'kib' ? 'active' : ''}`}
            id="tabKibBtn"
            onClick={() => setMainTab('kib')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              inventory_2
            </span>
            <span>Buku Inventaris Aset Desa (KIB)</span>
          </button>

          <button
            type="button"
            className={`tab-main-btn ${mainTab === 'bumdes' ? 'active' : ''}`}
            id="tabBumdesBtn"
            onClick={() => setMainTab('bumdes')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              storefront
            </span>
            <span>Monitoring Portofolio BUMDes & Deviden</span>
          </button>
        </div>

        {/* Quick Stats Tag */}
        <div className="tab-info-text">
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--tertiary)' }}>
            info
          </span>
          <span>Pemutakhiran Fisik Semester II: 28 Oktober 2024</span>
        </div>
      </div>

      {/* VIEW 1: KIB (KARTU INVENTARIS BARANG) */}
      {mainTab === 'kib' && (
        <KibView
          assets={assets}
          activeCategory={activeKibCategory}
          onSelectCategory={setActiveKibCategory}
          onViewAsset={setSelectedAsset}
        />
      )}

      {/* VIEW 2: MONITORING PORTOFOLIO BUMDES & DEVIDEN */}
      {mainTab === 'bumdes' && (
        <BumdesView
          units={bumdesUnits}
          dividendDeposits={dividendDeposits}
          auditDocuments={auditDocuments}
        />
      )}

      {/* Modal Detail Aset */}
      <AsetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />

      {/* Modal Registrasi Aset Baru */}
      <RegistrasiAsetModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onAddAsset={handleAddAsset}
      />

      {/* Modal Cetak KIB */}
      <CetakKibModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        activeCategory={activeKibCategory}
      />
    </div>
  );
}
