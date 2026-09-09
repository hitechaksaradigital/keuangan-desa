import { CheckCircle, Clock } from '@phosphor-icons/react';
import { logoUrl } from '../data/portal';

export function Hero() {
  return (
    <section className="hero-section" id="portal-transparansi">
      <div className="hero-glow hero-glow-secondary" aria-hidden="true" />
      <div className="hero-glow hero-glow-tertiary" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-identity">
          <div className="hero-logo-frame">
            <img src={logoUrl} alt="Logo Resmi Transparansi APBDes Desa Maju Jaya" />
          </div>
          <div className="hero-copy">
            <div className="legal-badge">
              <CheckCircle size={16} weight="fill" aria-hidden="true" />
              <span>Portal Resmi Keterbukaan Informasi Publik (UU No. 14 / 2008)</span>
            </div>
            <h1>Portal Keterbukaan Anggaran & Pembangunan Desa</h1>
            <p className="hero-subtitle">Desa Maju Jaya • Tahun Anggaran 2024</p>
            <p className="hero-description">
              “Transparan, Partisipatif, dan Akuntabel untuk Kesejahteraan Bersama. Setiap
              rupiah dana desa dikelola terbuka untuk kemajuan seluruh warga.”
            </p>
          </div>
        </div>

        <div className="hero-metrics" aria-label="Ringkasan APBDes">
          <article className="hero-metric-card">
            <span>Total Pendapatan APBDes</span>
            <strong className="currency">Rp 2.148.620.000</strong>
            <small>
              <CheckCircle size={14} weight="fill" aria-hidden="true" />
              Realisasi Semester I: 54.8%
            </small>
          </article>
          <article className="hero-metric-card">
            <span>Total Alokasi Belanja</span>
            <strong className="currency">Rp 2.132.890.000</strong>
            <small>
              <Clock size={14} weight="fill" aria-hidden="true" />
              18 Kegiatan Fisik & Sosial
            </small>
          </article>
        </div>
      </div>
    </section>
  );
}
