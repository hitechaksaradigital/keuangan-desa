import { useRef, useState, type FormEvent } from 'react';
import {
  ChatCenteredText,
  CheckCircle,
  DownloadSimple,
  FilePdf,
  FolderOpen,
  PaperPlaneRight,
  ShieldCheck,
} from '@phosphor-icons/react';

const publicDocuments = [
  {
    title: 'Buku Infografis APBDes 2024 (Edisi Cetak Warga)',
    meta: 'PDF • 4.8 MB • Diunduh 1.240 kali',
  },
  {
    title: 'Peraturan Desa No. 04/2024 tentang APBDes TA 2024',
    meta: 'PDF • Salinan Berita Daerah • 2.1 MB',
  },
  {
    title: 'Laporan Realisasi & LPJ Semester I TA 2024',
    meta: 'PDF • Hasil Audit BPD & Camat • 6.4 MB',
  },
];

export function DocumentsAndAspiration() {
  const [submitted, setSubmitted] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);
    form.reset();

    window.setTimeout(() => {
      alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  return (
    <section className="documents-grid content-section" id="dokumen-publik">
      <article className="portal-card document-portal" aria-labelledby="documents-title">
        <div>
          <div className="portal-card-heading">
            <div className="budget-icon budget-icon-primary">
              <FolderOpen size={24} weight="fill" aria-hidden="true" />
            </div>
            <div>
              <span className="section-eyebrow">Open Data Akuntabilitas</span>
              <h2 id="documents-title">Portal Unduh Dokumen Publik</h2>
            </div>
          </div>
          <p className="portal-description">
            Masyarakat berhak mengunduh salinan resmi Peraturan Desa, Buku Saku Anggaran, dan
            Rekap LPJ Semesteran dalam format PDF orisinal tanpa dipungut biaya.
          </p>

          <div className="document-list">
            {publicDocuments.map((document) => (
              <div className="document-item" key={document.title}>
                <div className="document-file">
                  <div className="pdf-icon">
                    <FilePdf size={24} weight="fill" aria-hidden="true" />
                  </div>
                  <div>
                    <strong>{document.title}</strong>
                    <span>{document.meta}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="download-button"
                  onClick={() => window.alert(`Mengunduh ${document.title}...`)}
                >
                  <DownloadSimple size={16} weight="bold" aria-hidden="true" />
                  <span>Unduh</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="verification-strip">
          <div>
            <ShieldCheck size={20} weight="fill" aria-hidden="true" />
            <span>Data terverifikasi melalui Siskeudes Mandiri Kementerian Dalam Negeri RI.</span>
          </div>
          <strong>PPID Desa Maju Jaya</strong>
        </div>
      </article>

      <article className="portal-card aspiration-portal" aria-labelledby="aspiration-title">
        <div>
          <div className="portal-card-heading">
            <div className="budget-icon budget-icon-secondary">
              <ChatCenteredText size={24} weight="fill" aria-hidden="true" />
            </div>
            <div>
              <span className="section-eyebrow">Layanan Partisipatif</span>
              <h2 id="aspiration-title">Kanal Aspirasi & Pengaduan Warga</h2>
            </div>
          </div>
          <p className="portal-description compact-description">
            Sampaikan masukan pembangunan, pertanyaan transparansi anggaran, atau adukan kendala
            fisik di lapangan langsung ke BPD dan Kepala Desa.
          </p>

          <form className="aspiration-form" onSubmit={handleFormSubmit}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="input-nama">Nama Lengkap (Atau &lsquo;Anonim&rsquo;)</label>
                <input id="input-nama" name="nama" type="text" placeholder="Contoh: Budi Santoso" required />
              </div>
              <div className="form-field">
                <label htmlFor="input-wa">Nomor WhatsApp Warga</label>
                <input id="input-wa" name="whatsapp" type="tel" placeholder="08xxxxxxxxxx (Untuk notifikasi)" />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="select-dusun">Dusun / RT Domisili</label>
                <select id="select-dusun" name="dusun" defaultValue="Dusun I - Sukamaju">
                  <option value="Dusun I - Sukamaju">Dusun I - Sukamaju</option>
                  <option value="Dusun II - Sumber Rejeki">Dusun II - Sumber Rejeki</option>
                  <option value="Dusun III - Kencana">Dusun III - Kencana</option>
                  <option value="Luar Wilayah Desa">Luar Wilayah Desa (Pemerhati)</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="select-kategori">Kategori Masukan</label>
                <select id="select-kategori" name="kategori" defaultValue="Usulan Pembangunan Fisik">
                  <option value="Usulan Pembangunan Fisik">Usulan Pembangunan Fisik (Musrenbangdes)</option>
                  <option value="Pertanyaan Anggaran APBDes">Pertanyaan Transparansi Anggaran</option>
                  <option value="Pengaduan Kerusakan / Penyelewengan">Pengaduan Lapangan & Kendala Fisik</option>
                  <option value="Layanan Publik Desa">Kritik & Saran Pelayanan Kantor Desa</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="input-pesan">Isi Masukan / Aspirasi</label>
              <textarea
                id="input-pesan"
                name="pesan"
                rows={3}
                placeholder="Tuliskan saran atau pengaduan secara jelas, santun, dan sertakan detail lokasi bila melaporkan fasilitas rusak..."
                required
              />
            </div>

            <div className="form-actions">
              <div className="anonymous-check">
                <input id="check-anonim" name="anonim" type="checkbox" />
                <label htmlFor="check-anonim">
                  Sembunyikan nama saya dari publik (Hanya dibaca Pemdes)
                </label>
              </div>
              <button type="submit" className="submit-button">
                <PaperPlaneRight size={18} weight="fill" aria-hidden="true" />
                <span>Kirim Aspirasi</span>
              </button>
            </div>
          </form>

          {submitted ? (
            <div className="form-alert" id="form-alert" ref={alertRef} role="status" aria-live="polite">
              <CheckCircle size={18} weight="fill" aria-hidden="true" />
              <span>
                Aspirasi Anda berhasil dicatat dengan Nomor Tiket <strong>#ASP-2024-089</strong> dan
                diteruskan ke Sekdes!
              </span>
            </div>
          ) : null}
        </div>
      </article>
    </section>
  );
}
