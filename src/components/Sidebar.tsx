import {
  Buildings,
  ClipboardText,
  GlobeHemisphereWest,
  HandCoins,
  Wallet,
} from '@phosphor-icons/react';
import { logoUrl } from '../data/portal';

const navItems = [
  { label: 'Perencanaan & APBDes', icon: Wallet, active: false },
  { label: 'Penatausahaan & Kas', icon: HandCoins, active: false },
  { label: 'Aset & BUMDes', icon: Buildings, active: false },
  { label: 'Laporan & Audit', icon: ClipboardText, active: false },
  { label: 'Transparansi Publik', icon: GlobeHemisphereWest, active: true },
];

export function Sidebar() {
  return (
    <>
      <aside className="sidebar" aria-label="Navigasi utama SISKEUDES">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img src={logoUrl} alt="Logo Lambang APBDes Desa" />
            <div className="sidebar-brand-text">
              <strong>SISKEUDES</strong>
              <span>Desa Maju Jaya</span>
            </div>
          </div>

          <div className="fiscal-year-card" aria-label="Tahun anggaran aktif">
            <span>T.A. Aktif</span>
            <strong>2024 Murni</strong>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.active ? '#portal-transparansi' : '#'}
                  className={item.active ? 'active' : undefined}
                  aria-current={item.active ? 'page' : undefined}
                >
                  <IconComponent size={20} weight={item.active ? 'fill' : 'regular'} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="database-status">
          <div>
            <span className="status-dot" aria-hidden="true" />
            <strong>Database Online</strong>
          </div>
          <span>Server Siskeudes Prov.</span>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Navigasi modul">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.active ? '#portal-transparansi' : '#'}
              className={item.active ? 'active' : undefined}
              aria-current={item.active ? 'page' : undefined}
            >
              <IconComponent size={18} weight={item.active ? 'fill' : 'regular'} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
