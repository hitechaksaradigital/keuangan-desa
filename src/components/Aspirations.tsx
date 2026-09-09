import { ArrowRight } from '@phosphor-icons/react';

const answeredAspirations = [
  {
    location: 'Dusun I Sukamaju',
    time: '2 hari lalu',
    title: 'Usulan Drainase Depan Masjid Al-Ikhlas',
    message:
      '“Mohon agar saluran air di pertigaan masjid diperdalam karena sering meluap saat hujan deras.” — Warga RT 02',
    responseBy: 'Tanggapan Kaur Kesra & TPK:',
    response:
      '“Terima kasih masukannya. Telah kami survei dan masuk dalam anggaran perubahan APBDes Perubahan 2024 bulan September nanti.”',
  },
  {
    location: 'Dusun II Sumber Rejeki',
    time: '4 hari lalu',
    title: 'Jadwal Pemasangan Sambungan Air Bersih',
    message:
      '“Apakah pipa air bersih untuk gang melati sudah mulai bisa disambungkan ke meteran rumah tangga?” — Pak Hendra',
    responseBy: 'Tanggapan Tim Pelaksana Kegiatan:',
    response:
      '“Pemasangan sambungan pipa rumah tangga Gang Melati dijadwalkan tanggal 20-25 Juli ini setelah pengetesan debit tandon selesai.”',
  },
  {
    location: 'Dusun III Kencana',
    time: '1 minggu lalu',
    title: 'Penerima Bantuan Bibit Ikan BUMDes',
    message:
      '“Kapan pendaftaran kelompok tani lele dibuka kembali untuk kelompok pemuda?” — Karang Taruna RW 05',
    responseBy: 'Tanggapan Direktur BUMDes:',
    response:
      '“Pendaftaran kelompok tani batch 2 akan dibuka saat Musyawarah Dusun bulan depan di balai dusun. Silakan koordinasi dengan Pak Kadus.”',
  },
];

export function Aspirations() {
  return (
    <section className="aspirations-section content-section" aria-labelledby="answered-title">
      <div className="answered-header">
        <div>
          <span className="section-eyebrow">Akuntabilitas Respon Cepat</span>
          <h2 id="answered-title">Aspirasi Warga Terbaru yang Telah Dijawab Pemdes</h2>
        </div>
        <span className="response-badge">Rata-rata Respon: &lt; 48 Jam Kerja</span>
      </div>

      <div className="answered-grid">
        {answeredAspirations.map((aspiration) => (
          <article className="answered-card" key={aspiration.title}>
            <div>
              <div className="answered-meta">
                <span>{aspiration.location}</span>
                <time>{aspiration.time}</time>
              </div>
              <h3>{aspiration.title}</h3>
              <p>{aspiration.message}</p>
            </div>

            <div className="official-response">
              <div>
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
                <strong>{aspiration.responseBy}</strong>
              </div>
              <p>{aspiration.response}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
