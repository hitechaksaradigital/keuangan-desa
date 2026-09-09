import { CheckCircle, CloudCheck } from '@phosphor-icons/react';

export function Header() {
  return (
    <header className="top-header">
      <div className="header-badge">
        <CheckCircle size={18} weight="fill" aria-hidden="true" />
        <strong>SISKEUDES MANDIRI</strong>
        <span aria-hidden="true">|</span>
        <span>Kec. Cikarang Pusat, Kab. Bekasi</span>
      </div>

      <div className="header-right">
        <div className="sync-badge">
          <CloudCheck size={16} weight="fill" aria-hidden="true" />
          <span>Sinkronisasi Aktif</span>
        </div>
        <div className="profile-summary">
          <div className="profile-copy">
            <strong>Siti Rahmawati, S.Ak</strong>
            <span>Kaur Keuangan / Bendahara Desa</span>
          </div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtQLjRxvwUOFTWLhhFlOXpJllbaRGr5W-iW-SnIF_0jhXkANV1aGmgSJ3ECm1-5H5S6nSKrBnuYs9xLMMjUz-saltZvCZCW0HopEPAqKdDPrnmL0KGqvOmdJJWtHMVT4tshWy3yNUvJVZ0TmtvtAoCCq-3wbHtU0eW3hJzmtlvpbXEDBE9widhXp1sM6k7sSgx2-QlrIBh19coc943U--mIBiUo0Uq4Vq3mmjmEwXOrb-OKmLhRpPr"
            alt="Foto profil Siti Rahmawati"
          />
        </div>
      </div>
    </header>
  );
}
