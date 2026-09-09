import { useEffect, useMemo, useState } from 'react';
import {
  bidangOptions,
  rabDocuments,
  rabItems as fallbackRabItems,
  rabMetrics,
  surveyPoints,
  sumberOptions,
  timelineSteps,
  formatCurrency,
  formatRupiah,
  type BidangApbdes,
  type RabItem,
  type SumberDana,
} from '../data/rab';
import { fetchRabItems, insertRabItem, deleteRabItem } from '../data/rabRepository';
import { supabase } from '../lib/supabase';

const ITEMS_PER_PAGE = 4;

type FormState = {
  kodeRekening: string;
  bidang: BidangApbdes;
  uraian: string;
  subBidang: string;
  volume: string;
  lokasi: string;
  sumberValue: SumberDana;
  sumberLabel: string;
  paguAwal: string;
  perubahan: string;
  isUsulanGeser: boolean;
};

const initialForm: FormState = {
  kodeRekening: '',
  bidang: '2',
  uraian: '',
  subBidang: '',
  volume: '',
  lokasi: '',
  sumberValue: 'DD',
  sumberLabel: 'DD Tahap I',
  paguAwal: '',
  perubahan: '0',
  isUsulanGeser: false,
};

function sumberVariantFromValue(v: SumberDana): 'primary' | 'secondary' | 'tertiary' {
  if (v === 'DD' || v === 'DLL') return 'primary';
  if (v === 'ADD' || v === 'BHP') return 'secondary';
  return 'tertiary';
}

function sumberLabelDefault(v: SumberDana): string {
  switch (v) {
    case 'DD': return 'DD Tahap I';
    case 'ADD': return 'ADD Murni';
    case 'PADes': return 'PADes';
    case 'BHP': return 'BHP';
    case 'DLL': return 'DLL';
    default: return v;
  }
}

export function RabPage() {
  const [search, setSearch] = useState('');
  const [bidang, setBidang] = useState<BidangApbdes | 'all'>('all');
  const [sumber, setSumber] = useState<SumberDana | 'all'>('all');
  const [page, setPage] = useState(1);
  const [selectedRab, setSelectedRab] = useState<RabItem | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Supabase data state
  const [items, setItems] = useState<RabItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRevisiOpen, setIsRevisiOpen] = useState(false);

  // Form state
  const [form, setForm] = useState<FormState>(initialForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    setDbError(null);
    const { data, error } = await fetchRabItems();
    if (error) {
      // Tabel belum ada atau RLS / koneksi error -> fallback ke data lokal
      setDbError(error);
      setIsConnected(false);
      if (error.toLowerCase().includes('does not exist') || error.toLowerCase().includes('relation')) {
        setIsUsingFallback(true);
        setItems(fallbackRabItems);
        showToast('Tabel rab_items belum ada - gunakan SQL migration. Menampilkan data contoh lokal.');
      } else if (data.length === 0) {
        setIsUsingFallback(true);
        setItems(fallbackRabItems);
      } else {
        setItems(data.length ? data : fallbackRabItems);
        setIsUsingFallback(data.length === 0);
      }
    } else {
      setIsConnected(true);
      if (data.length === 0) {
        // Kosong tapi koneksi OK -> fallback + info
        setIsUsingFallback(true);
        setItems(fallbackRabItems);
      } else {
        setIsUsingFallback(false);
        setItems(data);
      }
      setDbError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    // Realtime subscription
    const channel = supabase
      .channel('rab_items_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rab_items' }, (payload) => {
        if (payload.eventType === 'INSERT' && payload.new) {
          const row = payload.new as unknown as import('../data/rabRepository').RabRow;
          // map quickly if needed; fallback to reload
          loadData();
        } else if (payload.eventType === 'DELETE' || payload.eventType === 'UPDATE') {
          loadData();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (bidang !== 'all' && item.bidang !== bidang) return false;
      if (sumber !== 'all' && item.sumberValue !== sumber) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${item.kodeRekening} ${item.uraian} ${item.subBidang} ${item.lokasi} ${item.volume}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, bidang, sumber, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const subtotal = filtered.reduce((acc, cur) => acc + cur.paguBerjalan, 0);

  const handleSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handleBidangChange = (v: BidangApbdes | 'all') => {
    setBidang(v);
    setPage(1);
  };
  const handleSumberChange = (v: SumberDana | 'all') => {
    setSumber(v);
    setPage(1);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validasi
    if (!form.kodeRekening.trim() || !/^[0-9]+\.[0-9]+\.[0-9]+/.test(form.kodeRekening.trim())) {
      setFormError('Kode Rekening wajib format contoh: 2.01.03 atau 1.01.01');
      return;
    }
    if (!form.uraian.trim()) {
      setFormError('Uraian / Kegiatan wajib diisi');
      return;
    }
    if (!form.subBidang.trim()) {
      setFormError('Sub-bidang wajib diisi');
      return;
    }
    if (!form.volume.trim() || !form.lokasi.trim()) {
      setFormError('Volume & Lokasi wajib diisi');
      return;
    }
    const paguAwalNum = Number(form.paguAwal.replace(/[^0-9]/g, ''));
    const perubahanNum = Number(form.perubahan.replace(/[^0-9-]/g, '')) || 0;
    if (!paguAwalNum || paguAwalNum <= 0) {
      setFormError('Pagu Awal harus > 0');
      return;
    }

    setSubmitting(true);
    const payload = {
      kodeRekening: form.kodeRekening.trim(),
      bidang: form.bidang,
      uraian: form.uraian.trim(),
      subBidang: form.subBidang.trim(),
      volume: form.volume.trim(),
      lokasi: form.lokasi.trim(),
      sumberValue: form.sumberValue,
      sumberLabel: form.sumberLabel.trim() || sumberLabelDefault(form.sumberValue),
      sumberVariant: sumberVariantFromValue(form.sumberValue),
      paguAwal: paguAwalNum,
      perubahan: perubahanNum,
      paguBerjalan: paguAwalNum + perubahanNum,
      isUsulanGeser: form.isUsulanGeser,
      tahunAnggaran: 2024,
    };

    const { data, error } = await insertRabItem(payload as never);
    setSubmitting(false);

    if (error) {
      // Jika tabel belum ada, beri petunjuk migration
      if (error.toLowerCase().includes('does not exist') || error.toLowerCase().includes('relation')) {
        setFormError('Tabel rab_items belum ada. Jalankan SQL migration di Supabase SQL Editor (lihat supabase/migrations).');
      } else {
        setFormError(error);
      }
      return;
    }

    if (data) {
      setItems((prev) => [data, ...prev]);
      setIsUsingFallback(false);
      setIsAddOpen(false);
      setForm(initialForm);
      showToast(`RAB ${data.kodeRekening} - ${data.uraian} berhasil ditambahkan`);
      setPage(1);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Hapus RAB "${label}"?`)) return;
    const { error } = await deleteRabItem(id);
    if (error) {
      showToast(`Gagal hapus: ${error}`);
    } else {
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast('Data RAB dihapus');
      if (selectedRab?.id === id) setSelectedRab(null);
    }
  };

  const totalBelanjaLive = items.reduce((a, b) => a + b.paguBerjalan, 0);

  return (
    <div className="rab-page">
      {/* TOP CONTEXT & COMMAND BAR */}
      <div className="rab-context-bar">
        <div className="rab-context-left">
          <div className="rab-context-title-row">
            <span className="rab-context-title">Perencanaan & Penyusunan APBDes T.A. 2024</span>
            <span className="rab-badge-perdes">
              <span className="dot-pulse" aria-hidden="true"></span>
              Perdes No. 04/2024 - Disetujui BPD
            </span>
            <span className="rab-badge-versi">Versi 1.2 (Paska Evaluasi Kecamatan)</span>
          </div>
          <p className="rab-context-desc">
            Rekonsiliasi pagu RKPDes terhadap Rancangan Anggaran Biaya (RAB) berjalan Desa Maju Jaya, Kec. Cikarang Pusat.
          </p>
          {/* Connection status */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginTop: 4 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '3px 8px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                background: isConnected === false ? '#fee2e2' : isConnected ? '#ecfdf5' : 'var(--surface-container)',
                color: isConnected === false ? '#991b1b' : isConnected ? '#065f46' : 'var(--on-surface-variant)',
                border: `1px solid ${isConnected === false ? '#fecaca' : isConnected ? '#a7f3d0' : 'var(--surface-container-high)'}`,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  background: isConnected === false ? '#dc2626' : isConnected ? '#10b981' : 'var(--outline-variant)',
                  display: 'inline-block',
                }}
              ></span>
              {loading ? 'Menghubungkan Supabase...' : isConnected === false ? 'Supabase: Gagal konek' : isConnected ? 'Supabase: Terhubung' : 'Supabase: Mengecek...'}
            </span>
            {isUsingFallback && !loading && (
              <span style={{ fontSize: 11, color: 'var(--on-surface-variant)', background: 'var(--surface-container-low)', padding: '3px 8px', borderRadius: 999 }}>
                Menampilkan data fallback lokal ({items.length} kegiatan) - sinkronkan DB untuk data live
              </span>
            )}
            {!isUsingFallback && !loading && (
              <span style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>
                {items.length} kegiatan di database • Total Belanja Live: Rp {formatCurrency(totalBelanjaLive)}
              </span>
            )}
            {dbError && (
              <span style={{ fontSize: 11, color: '#991b1b', background: '#fef2f2', padding: '3px 8px', borderRadius: 6 }}>
                DB Error: {dbError.slice(0, 120)}
              </span>
            )}
          </div>
        </div>
        <div className="rab-context-actions">
          <button type="button" className="rab-btn rab-btn-ghost" onClick={() => setIsAddOpen(true)}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              post_add
            </span>
            Tambah Kegiatan RKPDes
          </button>
          <button type="button" className="rab-btn rab-btn-light" onClick={() => setIsAddOpen(true)}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              receipt_long
            </span>
            Input RAB Baru
          </button>
          <button type="button" className="rab-btn rab-btn-primary" onClick={() => setIsRevisiOpen(true)}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              published_with_changes
            </span>
            Form Pergeseran / Revisi APBDes
          </button>
        </div>
      </div>

      {/* 4 KPI METRICS */}
      <div className="rab-metrics-grid">
        {/* Card 1 - Pendapatan */}
        <div className="rab-metric-card">
          <div className="rab-metric-top">
            <div>
              <div className="rab-metric-label">Total Pendapatan Desa</div>
              <div className="rab-metric-value primary">Rp {formatCurrency(rabMetrics.totalPendapatan)}</div>
            </div>
            <div className="rab-metric-icon primary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                trending_up
              </span>
            </div>
          </div>
          <div className="rab-progress-stack">
            <div className="rab-progress-bar">
              {rabMetrics.pendapatanBreakdown.map((b) => (
                <div key={b.label} className="rab-progress-seg" style={{ width: `${b.percent}%`, background: b.color }} title={`${b.label}: ${b.percent}%`}></div>
              ))}
            </div>
            <div className="rab-legend-row">
              <span className="rab-legend-item">
                <span className="rab-legend-dot" style={{ background: 'var(--primary-container)' }}></span>DD 45%
              </span>
              <span className="rab-legend-item">
                <span className="rab-legend-dot" style={{ background: 'var(--secondary)' }}></span>ADD 35%
              </span>
              <span className="rab-legend-item">
                <span className="rab-legend-dot" style={{ background: 'var(--tertiary-container)' }}></span>PADes 15%
              </span>
              <span className="rab-legend-item">
                <span className="rab-legend-dot" style={{ background: 'var(--outline-variant)' }}></span>Lain 5%
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 - Belanja */}
        <div className="rab-metric-card">
          <div className="rab-metric-top">
            <div>
              <div className="rab-metric-label">Total Belanja Desa</div>
              <div className="rab-metric-value secondary">Rp {formatCurrency(rabMetrics.totalBelanja)}</div>
            </div>
            <div className="rab-metric-icon secondary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                account_tree
              </span>
            </div>
          </div>
          <div className="rab-progress-stack">
            <div className="rab-progress-bar">
              {rabMetrics.belanjaBreakdown.map((b) => (
                <div key={b.label} className="rab-progress-seg" style={{ width: `${b.percent}%`, background: b.color }}></div>
              ))}
            </div>
            <div className="rab-legend-row">
              <span>Pembangunan 45%</span>
              <span>Pemerintahan 30%</span>
              <span>Sosial/Darurat 25%</span>
            </div>
          </div>
        </div>

        {/* Card 3 - Surplus */}
        <div className="rab-metric-card">
          <div className="rab-metric-top">
            <div>
              <div className="rab-metric-label">Surplus / (Defisit)</div>
              <div className="rab-metric-value tertiary">+Rp {formatCurrency(rabMetrics.surplus)}</div>
            </div>
            <div className="rab-metric-icon tertiary">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                savings
              </span>
            </div>
          </div>
          <div className="rab-metric-footer">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700, color: 'var(--on-surface)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--tertiary)' }}>
                check_circle
              </span>
              SILPA Tercover
            </span>
            <span style={{ fontSize: '11px', color: 'var(--on-surface-variant)' }}>Netto Siap Audit</span>
          </div>
        </div>

        {/* Card 4 - Pergeseran */}
        <div className="rab-metric-card">
          <div className="rab-metric-top">
            <div>
              <div className="rab-metric-label">Pergeseran / Revisi</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span className="rab-metric-value neutral" style={{ marginTop: 0 }}>
                  {items.filter((i) => i.isUsulanGeser).length || rabMetrics.usulanBerjalan}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>Usulan Berjalan</span>
              </div>
            </div>
            <div className="rab-metric-icon dim">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                history_edu
              </span>
            </div>
          </div>
          <div className="rab-chip-ready" style={{ justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span className="dot"></span> Siap Evaluasi Camat
            </span>
            <span style={{ color: 'var(--on-surface-variant)', fontWeight: 600 }}>Sub-bidang 02 & 04</span>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE 8-4 */}
      <div className="rab-workspace">
        {/* LEFT 8 COLS */}
        <div className="rab-left-stack">
          {/* Filters */}
          <div className="rab-filter-bar">
            <div className="rab-filter-left">
              <div className="rab-search-wrap">
                <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>
                  search
                </span>
                <input
                  placeholder="Cari Kode Rek. / Kegiatan..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  aria-label="Cari Kode Rekening atau Kegiatan"
                />
              </div>
              <select className="rab-select" value={bidang} onChange={(e) => handleBidangChange(e.target.value as BidangApbdes | 'all')} aria-label="Filter Bidang">
                {bidangOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <select className="rab-select" value={sumber} onChange={(e) => handleSumberChange(e.target.value as SumberDana | 'all')} aria-label="Filter Sumber Dana">
                {sumberOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="rab-filter-right">
              <button type="button" className="rab-filter-btn" onClick={loadData} disabled={loading}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  refresh
                </span>
                {loading ? 'Memuat...' : 'Refresh'}
              </button>
              <button type="button" className="rab-filter-btn" onClick={() => showToast('Ekspor XLS - hubungkan ke API export')}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                  file_download
                </span>
                Ekspor XLS
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="rab-table-card">
            <div className="rab-table-header">
              <div className="rab-table-title">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--primary)' }}>
                  account_balance
                </span>
                Rincian Rencana Anggaran Biaya (RAB) Berjalan
                {isUsingFallback && <span style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontWeight: 600, background: 'var(--surface-container)', padding: '2px 6px', borderRadius: 6 }}>FALLBACK</span>}
              </div>
              <span className="rab-table-subtitle">
                {loading ? 'Memuat data...' : `Menampilkan ${paginated.length} dari ${filtered.length} Kegiatan`}
              </span>
            </div>
            <div className="rab-table-wrap">
              <table className="rab-table">
                <thead>
                  <tr>
                    <th>Kode Rekening</th>
                    <th>Uraian / Kegiatan</th>
                    <th>Volume & Lokasi</th>
                    <th>Sumber</th>
                    <th style={{ textAlign: 'right' }}>Pagu Awal</th>
                    <th style={{ textAlign: 'right' }}>Perubahan (+/-)</th>
                    <th style={{ textAlign: 'right' }}>Pagu Berjalan</th>
                    <th style={{ textAlign: 'center' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8}>
                        <div className="rab-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 28, color: 'var(--primary)', animation: 'rabPulse 1.2s infinite' }}>progress_activity</span>
                          Memuat data RAB dari Supabase...
                        </div>
                      </td>
                    </tr>
                  ) : paginated.length === 0 ? (
                    <tr>
                      <td colSpan={8}>
                        <div className="rab-empty">Tidak ada kegiatan yang cocok dengan filter. Coba ubah filter atau tambah data baru.</div>
                      </td>
                    </tr>
                  ) : (
                    paginated.map((item) => (
                      <tr key={item.id} className={item.isUsulanGeser ? 'is-geser' : ''}>
                        <td>
                          <span className={`rab-kode ${item.isUsulanGeser ? 'tertiary' : ''}`}>{item.kodeRekening}</span>
                        </td>
                        <td style={{ minWidth: 220 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <span className="rab-uraian-main">{item.uraian}</span>
                            {item.isUsulanGeser && <span className="rab-geser-tag">Usulan Geser</span>}
                          </div>
                          <span className="rab-uraian-sub">{item.subBidang}</span>
                        </td>
                        <td>
                          <span className="rab-volume-chip">{item.volume}</span>
                          <div className="rab-lokasi">{item.lokasi}</div>
                        </td>
                        <td>
                          <span className={`rab-sumber-badge ${item.sumberVariant}`}>{item.sumberLabel}</span>
                        </td>
                        <td>
                          <span className="rab-currency right">{formatRupiah(item.paguAwal)}</span>
                        </td>
                        <td>
                          <span className={`rab-currency right ${item.perubahan > 0 ? 'tertiary' : item.perubahan < 0 ? 'muted' : 'muted'}`} style={{ fontWeight: item.perubahan !== 0 ? 700 : 400 }}>
                            {item.perubahan === 0 ? 'Rp 0' : `${item.perubahan > 0 ? '+' : ''}${formatRupiah(item.perubahan)}`}
                          </span>
                        </td>
                        <td>
                          <span className={`rab-currency right bold ${item.isUsulanGeser ? 'tertiary' : ''}`}>{formatRupiah(item.paguBerjalan)}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div className="rab-action-btns">
                            <button type="button" className="rab-icon-btn primary" title="Buka Detail RAB" onClick={() => setSelectedRab(item)}>
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                visibility
                              </span>
                            </button>
                            <button
                              type="button"
                              className="rab-icon-btn"
                              title="Hapus"
                              onClick={() => handleDelete(item.id, `${item.kodeRekening} ${item.uraian}`)}
                              style={{ color: 'var(--error)' }}
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                                delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="rab-table-footer">
              <span className="rab-subtotal">
                Subtotal Terpilih: <strong>Rp {formatCurrency(subtotal)}</strong> (Penyusunan Berjalan)
              </span>
              <div className="rab-pagination">
                <button type="button" className="rab-page-btn" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                  Sebelumnya
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button key={n} type="button" className={`rab-page-btn ${n === page ? 'active' : ''}`} onClick={() => setPage(n)}>
                    {n}
                  </button>
                ))}
                <button type="button" className="rab-page-btn" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="rab-doc-card">
            <div className="rab-doc-header">
              <div>
                <h3>Dokumentasi Titik Nol Titik Lokasi RKPDes</h3>
                <p>Bukti survei kelayakan tim verifikasi RKPDes sebelum penetapan APBDes</p>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); showToast('Kelola foto lokasi - fitur segera hadir'); }}>
                Kelola Foto Lokasi →
              </a>
            </div>
            <div className="rab-doc-grid">
              {surveyPoints.map((s) => (
                <div key={s.id} className="rab-doc-item">
                  <img src={s.image} alt={s.alt} />
                  <div className="rab-doc-item-text">
                    <strong>{s.title}</strong>
                    <span>{s.subtitle}</span>
                    <small>{s.meta}</small>
                    <span className={`rab-badge-mini ${s.badgeVariant}`}>{s.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT 4 COLS */}
        <div className="rab-right-stack">
          <div className="rab-timeline-card">
            <div className="rab-card-head">
              <div>
                <h3>Tahapan & Legalitas APBDes</h3>
                <p>Siklus Perencanaan T.A. 2024</p>
              </div>
              <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>
                gavel
              </span>
            </div>

            <div className="rab-timeline">
              {timelineSteps.map((step) => (
                <div key={step.id} className="rab-step" style={{ opacity: step.status === 'upcoming' ? 0.8 : 1 }}>
                  <div className={`rab-step-dot ${step.status}`}>
                    {step.status === 'done' && (
                      <span className="material-symbols-outlined" style={{ fontSize: '12px', color: '#fff' }}>
                        check
                      </span>
                    )}
                    {step.status === 'active' && <span className="inner-dot"></span>}
                    {step.status === 'upcoming' && <span className="inner-dot"></span>}
                  </div>
                  <div>
                    <div className={`rab-step-title ${step.status === 'active' ? 'active' : ''}`}>
                      <span>{step.title}</span>
                      <span className={`rab-step-date ${step.status === 'active' ? 'active' : ''}`}>{step.dateLabel}</span>
                    </div>
                    <p className="rab-step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rab-signoff">
              <span className="rab-signoff-label">Pejabat Pengesah Resmi</span>
              <div className="rab-signoff-row">
                <div>
                  <div className="rab-signoff-name">H. Mulyadi Kartasasmita</div>
                  <div className="rab-signoff-role">Kepala Desa Maju Jaya</div>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--primary)' }}>
                  verified_user
                </span>
              </div>
              <div className="rab-signoff-meta">
                <span>
                  Hash Siskeudes: <strong>7F39-B4A1-2024</strong>
                </span>
                <span className="ok">Sinkronisasi Pusat OK</span>
              </div>
            </div>
          </div>

          <div className="rab-archive-card">
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--on-surface)' }}>Arsip & Regulasi Penganggaran</h3>
            <div className="rab-archive-list">
              {rabDocuments.map((doc) => (
                <a
                  key={doc.id}
                  href="#"
                  className="rab-archive-item"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast(`Mengunduh ${doc.fileName}`);
                  }}
                >
                  <div className="rab-archive-item-left">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
                      {doc.icon}
                    </span>
                    <span>{doc.title}</span>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--on-surface-variant)' }}>
                    download
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRab && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setSelectedRab(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="modal-header">
              <h3>Detail RAB - {selectedRab.kodeRekening}</h3>
              <button type="button" className="btn-modal-close" onClick={() => setSelectedRab(null)} aria-label="Tutup modal">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{selectedRab.uraian}</div>
                <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{selectedRab.subBidang}</div>
              </div>
              <div className="rab-modal-grid">
                <div className="detail-item">
                  <span className="detail-label">Kode Rekening</span>
                  <span className="detail-val">{selectedRab.kodeRekening}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Sumber Dana</span>
                  <span className="detail-val">{selectedRab.sumberLabel}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Volume</span>
                  <span className="detail-val">{selectedRab.volume}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lokasi</span>
                  <span className="detail-val">{selectedRab.lokasi}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pagu Awal</span>
                  <span className="detail-val">{formatRupiah(selectedRab.paguAwal)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Perubahan</span>
                  <span className="detail-val" style={{ color: selectedRab.perubahan > 0 ? 'var(--tertiary)' : 'var(--on-surface)' }}>
                    {selectedRab.perubahan === 0 ? 'Rp 0' : `${selectedRab.perubahan > 0 ? '+' : ''}${formatRupiah(selectedRab.perubahan)}`}
                  </span>
                </div>
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="detail-label">Pagu Berjalan</span>
                  <span className="detail-val" style={{ fontSize: 20, color: 'var(--primary)' }}>{formatRupiah(selectedRab.paguBerjalan)}</span>
                </div>
              </div>
              {selectedRab.isUsulanGeser && (
                <div style={{ padding: 10, borderRadius: 8, background: 'var(--tertiary-fixed)', color: 'var(--on-tertiary-fixed)', fontSize: 12, fontWeight: 600 }}>
                  Usulan Pergeseran: +Rp {formatCurrency(selectedRab.perubahan)} menunggu validasi evaluasi Camat.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary-surface" onClick={() => setSelectedRab(null)}>
                Tutup
              </button>
              <button type="button" className="btn-primary-action" onClick={() => handleDelete(selectedRab.id, selectedRab.uraian)}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal - Terhubung Supabase */}
      {isAddOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => !submitting && setIsAddOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="modal-header">
              <h3>Tambah Kegiatan / Input RAB Baru</h3>
              <button type="button" className="btn-modal-close" onClick={() => !submitting && setIsAddOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="modal-body">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Kode Rekening *</label>
                  <input
                    className="form-input"
                    placeholder="Contoh: 2.01.04"
                    value={form.kodeRekening}
                    onChange={(e) => setForm({ ...form, kodeRekening: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Bidang APBDes *</label>
                  <select
                    className="form-select"
                    value={form.bidang}
                    onChange={(e) => setForm({ ...form, bidang: e.target.value as BidangApbdes })}
                  >
                    <option value="1">1. Penyelenggaraan Pemerintahan</option>
                    <option value="2">2. Pelaksanaan Pembangunan</option>
                    <option value="3">3. Pembinaan Kemasyarakatan</option>
                    <option value="4">4. Pemberdayaan Masyarakat</option>
                    <option value="5">5. Penanggulangan Bencana</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Uraian / Kegiatan *</label>
                <input
                  className="form-input"
                  placeholder="Contoh: Pembangunan Rabat Beton"
                  value={form.uraian}
                  onChange={(e) => setForm({ ...form, uraian: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sub-Bidang *</label>
                <input
                  className="form-input"
                  placeholder="Contoh: Sub-bidang Pekerjaan Umum Desa"
                  value={form.subBidang}
                  onChange={(e) => setForm({ ...form, subBidang: e.target.value })}
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Volume *</label>
                  <input
                    className="form-input"
                    placeholder="Contoh: 450 x 3 M"
                    value={form.volume}
                    onChange={(e) => setForm({ ...form, volume: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Lokasi *</label>
                  <input
                    className="form-input"
                    placeholder="Contoh: Dusun Sukamaju RT 04"
                    value={form.lokasi}
                    onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Sumber Dana *</label>
                  <select
                    className="form-select"
                    value={form.sumberValue}
                    onChange={(e) => {
                      const v = e.target.value as SumberDana;
                      setForm({ ...form, sumberValue: v, sumberLabel: sumberLabelDefault(v) });
                    }}
                  >
                    <option value="DD">Dana Desa (DD)</option>
                    <option value="ADD">Alokasi Dana Desa (ADD)</option>
                    <option value="PADes">Pendapatan Asli Desa (PADes)</option>
                    <option value="BHP">Bagi Hasil Pajak (BHP)</option>
                    <option value="DLL">Lain-lain (DLL)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Label Sumber</label>
                  <input
                    className="form-input"
                    placeholder="Contoh: DD Tahap I"
                    value={form.sumberLabel}
                    onChange={(e) => setForm({ ...form, sumberLabel: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Pagu Awal (Rp) *</label>
                  <input
                    className="form-input"
                    placeholder="185000000"
                    type="number"
                    min={0}
                    value={form.paguAwal}
                    onChange={(e) => setForm({ ...form, paguAwal: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Perubahan (+/-)</label>
                  <input
                    className="form-input"
                    placeholder="0 (opsional, bisa negatif)"
                    type="number"
                    value={form.perubahan}
                    onChange={(e) => setForm({ ...form, perubahan: e.target.value })}
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: 'var(--on-surface)' }}>
                <input
                  type="checkbox"
                  checked={form.isUsulanGeser}
                  onChange={(e) => setForm({ ...form, isUsulanGeser: e.target.checked })}
                  style={{ accentColor: 'var(--primary)' }}
                />
                Tandai sebagai <strong>Usulan Pergeseran</strong> (butuh evaluasi Camat)
              </label>

              {formError && (
                <div style={{ padding: '10px 12px', borderRadius: 8, background: '#fef2f2', color: '#991b1b', fontSize: 12, border: '1px solid #fecaca' }}>
                  {formError}
                </div>
              )}

              <div style={{ padding: 10, borderRadius: 8, background: 'var(--surface-container-low)', fontSize: 12, color: 'var(--on-surface-variant)' }}>
                Pagu Berjalan akan otomatis = Pagu Awal + Perubahan. Data disimpan ke <code>public.rab_items</code> di Supabase & tampil realtime.
                {isUsingFallback && ' (Saat ini fallback lokal aktif - pastikan tabel sudah dibuat).'}
              </div>

              <div className="modal-footer" style={{ margin: '8px -24px -24px', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                <button type="button" className="btn-secondary-surface" onClick={() => setIsAddOpen(false)} disabled={submitting}>
                  Batal
                </button>
                <button type="submit" className="btn-primary-action" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, animation: 'rabPulse 1s infinite' }}>progress_activity</span>
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan ke Database'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isRevisiOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setIsRevisiOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <h3>Form Pergeseran / Revisi APBDes</h3>
              <button type="button" className="btn-modal-close" onClick={() => setIsRevisiOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Pilih Kegiatan Sumber (Pemindah)</label>
                <select className="form-select">
                  {items.map((i) => (
                    <option key={i.id}>
                      {i.kodeRekening} - {i.uraian}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Pilih Kegiatan Tujuan (Penerima)</label>
                <select className="form-select">
                  {items.map((i) => (
                    <option key={i.id}>
                      {i.kodeRekening} - {i.uraian}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Nilai Pergeseran</label>
                  <input className="form-input" placeholder="Rp 5.000.000" />
                </div>
                <div className="form-group">
                  <label className="form-label">Alasan Pergeseran</label>
                  <input className="form-input" placeholder="Penyesuaian prioritas Musdes..." />
                </div>
              </div>
              <div style={{ padding: 10, borderRadius: 8, background: 'var(--surface-container-low)', fontSize: 12, color: 'var(--on-surface-variant)' }}>
                Pergeseran antar sub-bidang memerlukan persetujuan BPD dan evaluasi Camat (Perbup No. 12/2023).
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary-surface" onClick={() => setIsRevisiOpen(false)}>
                Batal
              </button>
              <button
                type="button"
                className="btn-primary-action"
                onClick={() => {
                  setIsRevisiOpen(false);
                  showToast('Usulan pergeseran dikirim untuk evaluasi Camat (hubungkan ke tabel pergeseran jika diperlukan)');
                }}
              >
                Ajukan Pergeseran
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            background: 'var(--inverse-surface)',
            color: 'var(--inverse-on-surface)',
            padding: '10px 14px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            zIndex: 120,
            maxWidth: 360,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
