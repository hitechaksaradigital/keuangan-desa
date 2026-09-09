import {
  Buildings,
  ClipboardText,
  GlobeHemisphereWest,
  HandCoins,
  Wallet,
} from '@phosphor-icons/react';
import { logoUrl } from '../data/portal';

interface NavItemConfig {
  label: string;
  icon: typeof Wallet;
  path?: string;
}

const navItems: NavItemConfig[] = [
  { label: 'Perencanaan & APBDes', icon: Wallet, path: '/rab' },
  { label: 'Penatausahaan & Kas', icon: HandCoins },
  { label: 'Aset & BUMDes', icon: Buildings, path: '/aset' },
  { label: 'Laporan & Audit', icon: ClipboardText },
  { label: 'Transparansi Publik', icon: GlobeHemisphereWest, path: '/' },
];

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export function Sidebar({ currentPath = '/', onNavigate }: SidebarProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItemConfig
  ) => {
    if (item.path) {
      e.preventDefault();
      onNavigate?.(item.path);
    }
  };

  return (
    <>
      <aside className="sidebar" aria-label="Navigasi utama SISKEUDES">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="sidebar-brand-logo">
              <img src={logoUrl} alt="Logo Lambang APBDes Desa" />
            </div>
            <div className="sidebar-brand-text">
              <strong>SISKEUDES</strong>
              <span>Desa Maju Jaya</span>
            </div>
          </div>

          <div className="fiscal-year-card" aria-label="Tahun anggaran aktif">
            <div className="fiscal-year-card-left">
              <span className="fiscal-year-card-label">T.A. Aktif</span>
              <span className="fiscal-year-card-sub">Kec. Cikarang Pusat</span>
            </div>
            <strong>2024 Murni</strong>
          </div>

          <div className="sidebar-nav-label">Menu Utama</div>
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive =
                (item.path === '/aset' && currentPath === '/aset') ||
                (item.path === '/rab' && currentPath === '/rab') ||
                (item.path === '/' && currentPath === '/' && !['/aset', '/rab'].includes(currentPath));

              return (
                <a
                  key={item.label}
                  href={item.path || '#'}
                  className={isActive ? 'active' : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  <span className="sidebar-nav-icon" aria-hidden="true">
                    <IconComponent size={18} weight={isActive ? 'fill' : 'regular'} />
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="database-status">
          <div className="database-status-header">
            <div className="database-status-title">
              <span className="status-dot" aria-hidden="true" />
              <strong>Database Online</strong>
            </div>
            <span className="database-status-badge">Live</span>
          </div>
          <span className="database-status-desc">Server Siskeudes Prov. • Sinkron aktif</span>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Navigasi modul">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive =
            (item.path === '/aset' && currentPath === '/aset') ||
            (item.path === '/rab' && currentPath === '/rab') ||
            (item.path === '/' && currentPath === '/' && !['/aset', '/rab'].includes(currentPath));

          return (
            <a
              key={item.label}
              href={item.path || '#'}
              className={isActive ? 'active' : undefined}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => handleNavClick(e, item)}
            >
              <IconComponent size={16} weight={isActive ? 'fill' : 'regular'} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
