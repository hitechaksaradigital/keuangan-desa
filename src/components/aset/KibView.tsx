import React, { useMemo, useState } from 'react';
import {
  KibAsset,
  KibCategory,
  kibCategoryTabs,
  formatRupiah,
} from '../../data/aset';

interface KibViewProps {
  assets: KibAsset[];
  activeCategory: KibCategory;
  onSelectCategory: (cat: KibCategory) => void;
  onViewAsset: (asset: KibAsset) => void;
}

export function KibView({
  assets,
  activeCategory,
  onSelectCategory,
  onViewAsset,
}: KibViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [conditionFilter, setConditionFilter] = useState<string>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter assets by current category, search query, and condition
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      if (asset.category !== activeCategory) return false;

      if (conditionFilter !== 'all') {
        if (conditionFilter === 'baik' && !asset.condition.includes('Baik')) return false;
        if (conditionFilter === 'rusak' && !asset.condition.includes('Rusak')) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCode = asset.registerCode.toLowerCase().includes(query);
        const matchesName = asset.name.toLowerCase().includes(query);
        const matchesSpec = asset.specification.toLowerCase().includes(query);
        const matchesLoc = asset.location.toLowerCase().includes(query);
        return matchesCode || matchesName || matchesSpec || matchesLoc;
      }

      return true;
    });
  }, [assets, activeCategory, searchQuery, conditionFilter]);

  // Calculate totals for currently filtered items
  const totals = useMemo(() => {
    return filteredAssets.reduce(
      (acc, item) => {
        acc.acquisition += item.acquisitionValue;
        acc.depreciation += item.accumulatedDepreciation;
        acc.bookValue += item.bookValue;
        return acc;
      },
      { acquisition: 0, depreciation: 0, bookValue: 0 }
    );
  }, [filteredAssets]);

  const activeCategoryLabel =
    kibCategoryTabs.find((t) => t.id === activeCategory)?.label || 'Aset';

  return (
    <section className="kib-section" id="kibView">
      {/* Sub-Tab Kategori Aset KIB & Search/Filter Toolbar */}
      <div className="kib-toolbar-card">
        <div className="kib-category-pills" id="kibCategoryContainer">
          {kibCategoryTabs.map((tab) => {
            const isActive = tab.id === activeCategory;
            return (
              <button
                key={tab.id}
                type="button"
                className={`pill-category-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCategory(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Table Filter and Search */}
        <div className="kib-search-filter-box">
          <div className="kib-search-input-wrapper">
            <span className="material-symbols-outlined kib-search-icon">search</span>
            <input
              type="text"
              className="kib-search-input"
              placeholder="Cari Kode / Nama Aset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="btn-filter-icon"
              title="Filter Kondisi Aset"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <span className="material-symbols-outlined">filter_list</span>
            </button>

            {showFilterDropdown && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '6px',
                  background: 'var(--surface-container-lowest)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  border: '1px solid var(--outline-variant)',
                  padding: '8px',
                  zIndex: 30,
                  minWidth: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    border: 'none',
                    background: conditionFilter === 'all' ? 'var(--surface-container-low)' : 'transparent',
                    fontSize: '12px',
                    fontWeight: conditionFilter === 'all' ? '700' : '500',
                    cursor: 'pointer',
                    color: 'var(--on-surface)',
                  }}
                  onClick={() => {
                    setConditionFilter('all');
                    setShowFilterDropdown(false);
                  }}
                >
                  Semua Kondisi
                </button>
                <button
                  type="button"
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    border: 'none',
                    background: conditionFilter === 'baik' ? 'var(--surface-container-low)' : 'transparent',
                    fontSize: '12px',
                    fontWeight: conditionFilter === 'baik' ? '700' : '500',
                    cursor: 'pointer',
                    color: 'var(--tertiary)',
                  }}
                  onClick={() => {
                    setConditionFilter('baik');
                    setShowFilterDropdown(false);
                  }}
                >
                  Kondisi Baik Saja
                </button>
                <button
                  type="button"
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    border: 'none',
                    background: conditionFilter === 'rusak' ? 'var(--surface-container-low)' : 'transparent',
                    fontSize: '12px',
                    fontWeight: conditionFilter === 'rusak' ? '700' : '500',
                    cursor: 'pointer',
                    color: 'var(--error)',
                  }}
                  onClick={() => {
                    setConditionFilter('rusak');
                    setShowFilterDropdown(false);
                  }}
                >
                  Kondisi Rusak Ringan/Berat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Master KIB Data Table Container */}
      <div className="kib-table-card">
        <div className="kib-table-container">
          <table className="kib-table">
            <thead>
              <tr>
                <th>Kode Register</th>
                <th>Nama Barang / Aset</th>
                <th>Tahun / Sumber</th>
                <th>Asal Usul & Status</th>
                <th style={{ textAlign: 'center' }}>Kondisi Fisik</th>
                <th style={{ textAlign: 'right' }}>Nilai Perolehan</th>
                <th style={{ textAlign: 'right' }}>Akum. Penyusutan</th>
                <th style={{ textAlign: 'right' }}>Nilai Buku</th>
                <th>Lokasi / P.J.</th>
                <th style={{ textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '36px', color: 'var(--on-surface-variant)' }}>
                    Tidak ada aset yang sesuai kriteria pencarian dalam {activeCategoryLabel}.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((item) => {
                  const isWarning = item.condition.includes('Rusak');
                  return (
                    <tr key={item.id}>
                      <td>
                        <span className="code-cell-primary">{item.registerCode}</span>
                        <span className="code-subtext">{item.documentType}</span>
                      </td>

                      <td>
                        <div className="asset-title-primary">{item.name}</div>
                        <span className="asset-spec-text">{item.specification}</span>
                      </td>

                      <td>
                        <span className="year-text">{item.year}</span>
                        <span
                          className={`source-badge ${
                            item.fundingSource.includes('Asli')
                              ? 'badge-tertiary'
                              : item.fundingSource.includes('Hibah')
                              ? 'badge-secondary'
                              : 'badge-primary'
                          }`}
                        >
                          {item.fundingSource}
                        </span>
                      </td>

                      <td>
                        <span className="origin-badge">{item.origin}</span>
                        <span className="legal-subtext">{item.documentNumber}</span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <span className={`condition-pill ${isWarning ? 'warning' : 'good'}`}>
                          <span className="condition-indicator"></span>
                          {item.condition}
                        </span>
                      </td>

                      <td className="currency-cell regular-primary">
                        {formatRupiah(item.acquisitionValue)}
                      </td>

                      <td className="currency-cell muted">
                        {formatRupiah(item.accumulatedDepreciation)}
                      </td>

                      <td className="currency-cell bold-primary">
                        {formatRupiah(item.bookValue)}
                      </td>

                      <td>
                        <span className="location-primary">{item.location}</span>
                        <span className="pic-subtext">PJ: {item.personInCharge}</span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-action-view"
                          title="Lihat Detail Sertifikat & Inventaris"
                          onClick={() => onViewAsset(item)}
                        >
                          <span className="material-symbols-outlined">visibility</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="tfoot-label">
                  TOTAL NILAI KATEGORI {activeCategoryLabel.toUpperCase()}
                </td>
                <td className="currency-cell bold-primary">
                  {formatRupiah(totals.acquisition)}
                </td>
                <td className="currency-cell muted">
                  {formatRupiah(totals.depreciation)}
                </td>
                <td className="currency-cell bold-primary">
                  {formatRupiah(totals.bookValue)}
                </td>
                <td colSpan={2} style={{ color: 'var(--on-surface-variant)', fontSize: '12px' }}>
                  {filteredAssets.length} Bidang / Barang Terverifikasi
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Pagination & Metadata Footer */}
        <div className="kib-pagination-bar">
          <span className="pagination-info">
            Menampilkan 1-{filteredAssets.length} dari {filteredAssets.length} Aset Terdaftar pada {activeCategoryLabel}
          </span>
          <div className="pagination-controls">
            <button type="button" className="btn-page" disabled>
              Sebelumnya
            </button>
            <button type="button" className="btn-page active">
              1
            </button>
            <button type="button" className="btn-page" disabled>
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
