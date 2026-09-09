import {
  ArrowRight,
  Bank,
  CalendarBlank,
  FirstAid,
  Info,
  PiggyBank,
  RoadHorizon,
  ShieldCheck,
  Storefront,
} from '@phosphor-icons/react';

const revenueSources = [
  {
    label: 'Dana Desa Pusat (DDS)',
    percentage: 45,
    amount: '(Rp 966.8 Jt)',
    className: 'source-primary',
  },
  {
    label: 'Alokasi Dana Desa Kab (ADD)',
    percentage: 35,
    amount: '(Rp 752.0 Jt)',
    className: 'source-secondary',
  },
  {
    label: 'PADes & Bagi Hasil BUMDes',
    percentage: 15,
    amount: '(Rp 322.2 Jt)',
    className: 'source-tertiary',
  },
  {
    label: 'Bantuan Keuangan Provinsi',
    percentage: 5,
    amount: '(Rp 107.4 Jt)',
    className: 'source-lavender',
  },
];

const spendingPriorities = [
  {
    icon: RoadHorizon,
    title: 'Pembangunan Fisik Jalan & Irigasi',
    percentage: 45,
    amount: 'Rp 959.8 Jt dialokasikan untuk 6 titik rabat beton, drainase, dan fasilitas umum dusun.',
    className: 'source-primary',
  },
  {
    icon: ShieldCheck,
    title: 'Penyelenggaraan & Pelayanan Desa',
    percentage: 30,
    amount: 'Rp 639.8 Jt untuk siltap aparatur, operasional kantor, BPD, dan sistem administrasi digital.',
    className: 'source-secondary',
  },
  {
    icon: FirstAid,
    title: 'Bansos, Posyandu & Kesehatan',
    percentage: 15,
    amount: 'Rp 319.9 Jt untuk penanganan stunting balita, makanan tambahan lansia, dan BLT-Dana Desa.',
    className: 'source-tertiary',
  },
  {
    icon: Storefront,
    title: 'Pemberdayaan Warga & UMKM',
    percentage: 10,
    amount: 'Rp 213.2 Jt untuk bibit lele organik warga, pelatihan sablon karang taruna & modal BUMDes.',
    className: 'source-lavender',
  },
];

export function BudgetInfographics() {
  return (
    <section className="content-section" aria-labelledby="budget-title">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Infografis Visual Sederhana</span>
          <h2 id="budget-title">Dari Mana & Ke Mana Uang Desa Kita?</h2>
          <p>
            Penjelasan ringkas agar setiap warga desa dapat memahami struktur anggaran secara
            cepat tanpa istilah teknis.
          </p>
        </div>
        <div className="update-badge">
          <CalendarBlank size={20} aria-hidden="true" />
          <span>Pembaruan: 14 Juli 2024</span>
        </div>
      </div>

      <div className="budget-grid">
        <article className="budget-card">
          <div className="budget-card-header">
            <div className="budget-title-group">
              <div className="budget-icon budget-icon-primary">
                <PiggyBank size={24} weight="fill" aria-hidden="true" />
              </div>
              <div>
                <h3>Dari Mana Uang Desa Berasal?</h3>
                <span>Struktur Sumber Pendapatan Desa (Total 100%)</span>
              </div>
            </div>
            <span className="card-tag card-tag-primary">Pendapatan</span>
          </div>

          <div className="revenue-layout">
            <div className="donut-wrap" role="img" aria-label="Diagram donat sumber pendapatan desa">
              <svg viewBox="0 0 36 36" aria-hidden="true">
                <circle className="donut-track" cx="18" cy="18" r="15.9155" />
                <circle className="donut-primary" cx="18" cy="18" r="15.9155" />
                <circle className="donut-secondary" cx="18" cy="18" r="15.9155" />
                <circle className="donut-tertiary" cx="18" cy="18" r="15.9155" />
                <circle className="donut-lavender" cx="18" cy="18" r="15.9155" />
              </svg>
              <div className="donut-center">
                <span>Total Pagu</span>
                <strong className="currency">2.14 Miliar</strong>
              </div>
            </div>

            <div className="revenue-legend">
              {revenueSources.map((source) => (
                <div className="legend-item" key={source.label}>
                  <div className="legend-row">
                    <div className="legend-label">
                      <span className={`legend-dot ${source.className}`} aria-hidden="true" />
                      <span>{source.label}</span>
                    </div>
                    <div className="legend-value">
                      <strong className={source.className}>{source.percentage}%</strong>
                      <span>{source.amount}</span>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div
                      className={`progress-fill ${source.className}`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-strip">
            <Info size={20} aria-hidden="true" />
            <span>
              Pencairan Dana Desa disalurkan dalam 2 tahap langsung ke RKD (Rekening Kas Desa).
            </span>
          </div>
        </article>

        <article className="budget-card">
          <div className="budget-card-header">
            <div className="budget-title-group">
              <div className="budget-icon budget-icon-tertiary">
                <Bank size={24} weight="fill" aria-hidden="true" />
              </div>
              <div>
                <h3>Ke Mana Uang Desa Dibelanjakan?</h3>
                <span>Distribusi Prioritas Belanja Warga T.A. 2024</span>
              </div>
            </div>
            <span className="card-tag card-tag-tertiary">Belanja Warga</span>
          </div>

          <div className="spending-grid">
            {spendingPriorities.map((priority) => {
              const IconComponent = priority.icon;
              return (
                <article className="spending-box" key={priority.title}>
                  <div className="spending-topline">
                    <IconComponent size={24} className={priority.className} aria-hidden="true" />
                    <strong className={priority.className}>{priority.percentage}%</strong>
                  </div>
                  <h4>{priority.title}</h4>
                  <p>{priority.amount}</p>
                  <div className="progress-track compact">
                    <div
                      className={`progress-fill ${priority.className}`}
                      style={{ width: `${priority.percentage}%` }}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="info-strip split-strip">
            <span>Setiap pengeluaran diverifikasi oleh BPD dan Inspektorat Daerah.</span>
            <a href="#dokumen-publik">
              Cek Rincian APBDes <ArrowRight size={14} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
