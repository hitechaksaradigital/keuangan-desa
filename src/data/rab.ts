export type BidangApbdes = '1' | '2' | '3' | '4' | '5';
export type SumberDana = 'DD' | 'ADD' | 'PADes' | 'BHP' | 'DLL';

export interface RabItem {
  id: string;
  kodeRekening: string;
  bidang: BidangApbdes;
  uraian: string;
  subBidang: string;
  volume: string;
  lokasi: string;
  sumberLabel: string;
  sumberValue: SumberDana;
  sumberVariant: 'primary' | 'secondary' | 'tertiary';
  paguAwal: number;
  perubahan: number;
  paguBerjalan: number;
  isUsulanGeser?: boolean;
}

export interface RabMetrics {
  totalPendapatan: number;
  pendapatanBreakdown: { label: string; percent: number; color: string }[];
  totalBelanja: number;
  belanjaBreakdown: { label: string; percent: number; color: string }[];
  surplus: number;
  usulanBerjalan: number;
}

export interface TimelineStep {
  id: string;
  title: string;
  dateLabel: string;
  description: string;
  status: 'done' | 'active' | 'upcoming';
}

export interface RabDocument {
  id: string;
  title: string;
  fileName: string;
  icon: string;
}

export interface RabSurveyPoint {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  badge: string;
  badgeVariant: 'tertiary' | 'primary';
  image: string;
  alt: string;
}

export const rabMetrics: RabMetrics = {
  totalPendapatan: 2450000000,
  pendapatanBreakdown: [
    { label: 'DD', percent: 45, color: 'var(--primary-container)' },
    { label: 'ADD', percent: 35, color: 'var(--secondary)' },
    { label: 'PADes', percent: 15, color: 'var(--tertiary-container)' },
    { label: 'Lain', percent: 5, color: 'var(--outline-variant)' },
  ],
  totalBelanja: 2380000000,
  belanjaBreakdown: [
    { label: 'Pembangunan', percent: 45, color: 'var(--primary)' },
    { label: 'Penyelenggaraan', percent: 30, color: 'var(--secondary)' },
    { label: 'Pembinaan', percent: 10, color: 'var(--tertiary)' },
    { label: 'Pemberdayaan', percent: 10, color: 'var(--secondary-container)' },
    { label: 'Darurat', percent: 5, color: 'var(--error)' },
  ],
  surplus: 70000000,
  usulanBerjalan: 2,
};

export const rabItems: RabItem[] = [
  {
    id: 'rab-1',
    kodeRekening: '2.01.03',
    bidang: '2',
    uraian: 'Pembangunan Rabat Beton',
    subBidang: 'Sub-bidang Pekerjaan Umum Desa',
    volume: '450 x 3 M',
    lokasi: 'Dusun Sukamaju RT 04',
    sumberLabel: 'DD Tahap I',
    sumberValue: 'DD',
    sumberVariant: 'primary',
    paguAwal: 185000000,
    perubahan: 0,
    paguBerjalan: 185000000,
  },
  {
    id: 'rab-2',
    kodeRekening: '2.04.01',
    bidang: '2',
    uraian: 'Insentif Guru PAUD & Kader Posyandu',
    subBidang: 'Sub-bidang Pendidikan & Kesehatan',
    volume: '12 Bln / 10 Org',
    lokasi: 'Seluruh Posyandu Desa',
    sumberLabel: 'ADD Murni',
    sumberValue: 'ADD',
    sumberVariant: 'secondary',
    paguAwal: 36000000,
    perubahan: 0,
    paguBerjalan: 36000000,
  },
  {
    id: 'rab-3',
    kodeRekening: '4.02.02',
    bidang: '4',
    uraian: 'Pelatihan UMKM & Pengolahan Kopi',
    subBidang: 'Pemberdayaan Ekonomi Masyarakat',
    volume: '3 Angkatan (45 Peserta)',
    lokasi: 'Balai Desa & Sentra Kopi',
    sumberLabel: 'PADes',
    sumberValue: 'PADes',
    sumberVariant: 'tertiary',
    paguAwal: 20000000,
    perubahan: 5000000,
    paguBerjalan: 25000000,
    isUsulanGeser: true,
  },
  {
    id: 'rab-4',
    kodeRekening: '2.02.05',
    bidang: '2',
    uraian: 'Pembangunan Drainase Lingkungan',
    subBidang: 'Sub-bidang Kawasan Pemukiman',
    volume: '320 Meter U-Ditch',
    lokasi: 'RW 03 Kp. Babakan',
    sumberLabel: 'DD Tahap II',
    sumberValue: 'DD',
    sumberVariant: 'primary',
    paguAwal: 92500000,
    perubahan: 0,
    paguBerjalan: 92500000,
  },
  // tambahan untuk filter & pagination demo
  {
    id: 'rab-5',
    kodeRekening: '1.01.01',
    bidang: '1',
    uraian: 'Penyediaan Operasional Pemerintahan Desa',
    subBidang: 'Sub-bidang Tata Praja',
    volume: '12 Bulan',
    lokasi: 'Kantor Desa Maju Jaya',
    sumberLabel: 'ADD Murni',
    sumberValue: 'ADD',
    sumberVariant: 'secondary',
    paguAwal: 48000000,
    perubahan: -2000000,
    paguBerjalan: 46000000,
  },
  {
    id: 'rab-6',
    kodeRekening: '3.02.01',
    bidang: '3',
    uraian: 'Pembinaan Karang Taruna & Olahraga',
    subBidang: 'Sub-bidang Kepemudaan',
    volume: '4 Kegiatan',
    lokasi: 'Lapangan Desa',
    sumberLabel: 'PADes',
    sumberValue: 'PADes',
    sumberVariant: 'tertiary',
    paguAwal: 15000000,
    perubahan: 0,
    paguBerjalan: 15000000,
  },
  {
    id: 'rab-7',
    kodeRekening: '5.01.01',
    bidang: '5',
    uraian: 'Penanggulangan Bencana & Keadaan Darurat',
    subBidang: 'Sub-bidang Siaga Bencana',
    volume: '1 Paket Siaga',
    lokasi: 'Seluruh Dusun',
    sumberLabel: 'DLL',
    sumberValue: 'DLL',
    sumberVariant: 'primary',
    paguAwal: 25000000,
    perubahan: 0,
    paguBerjalan: 25000000,
  },
  {
    id: 'rab-8',
    kodeRekening: '2.01.05',
    bidang: '2',
    uraian: 'Rehabilitasi Jalan Lingkungan Aspal',
    subBidang: 'Sub-bidang Pekerjaan Umum',
    volume: '600 x 2.5 M',
    lokasi: 'Dusun I - II',
    sumberLabel: 'BHP',
    sumberValue: 'BHP',
    sumberVariant: 'secondary',
    paguAwal: 110000000,
    perubahan: 0,
    paguBerjalan: 110000000,
  },
];

export const timelineSteps: TimelineStep[] = [
  {
    id: 'step-1',
    title: '1. Musdes & RKPDes',
    dateLabel: 'Juli 2023',
    description: 'Penyusunan daftar usulan dusun & penetapan pagu indikatif tahunan.',
    status: 'done',
  },
  {
    id: 'step-2',
    title: '2. Rancangan APBDes',
    dateLabel: 'Okt 2023',
    description: 'Penganggaran terpadu Siskeudes oleh Kaur Keuangan dan Sekdes.',
    status: 'done',
  },
  {
    id: 'step-3',
    title: '3. Evaluasi Kecamatan',
    dateLabel: 'Des 2023',
    description: 'Surat Keputusan Camat Cikarang Pusat No. 140/512/PMD.',
    status: 'done',
  },
  {
    id: 'step-4',
    title: '4. Penetapan Perdes (Murni)',
    dateLabel: 'Aktif 2024',
    description: 'Perdes Desa Maju Jaya No. 04/2024 tentang APBDes T.A. 2024.',
    status: 'active',
  },
  {
    id: 'step-5',
    title: '5. Perubahan / PAK APBDes',
    dateLabel: 'Tahap Draf',
    description: 'Proses validasi 2 usulan pergeseran pos anggaran mendesak.',
    status: 'upcoming',
  },
];

export const rabDocuments: RabDocument[] = [
  { id: 'doc-1', title: 'Perdes_APBDes_Murni_2024.pdf', fileName: 'Perdes_APBDes_Murni_2024.pdf', icon: 'picture_as_pdf' },
  { id: 'doc-2', title: 'Lampiran_1B_Penjabaran_RAB.pdf', fileName: 'Lampiran_1B_Penjabaran_RAB.pdf', icon: 'description' },
  { id: 'doc-3', title: 'SK_BPD_Persetujuan_Bersama.pdf', fileName: 'SK_BPD_Persetujuan_Bersama.pdf', icon: 'task' },
];

export const surveyPoints: RabSurveyPoint[] = [
  {
    id: 'survey-1',
    title: 'Survei Titik Nol Rabat Beton',
    subtitle: 'Dusun Sukamaju RW 04',
    meta: 'Panjang: 450 m | Lebar: 3 m',
    badge: 'Verifikasi Lapangan OK',
    badgeVariant: 'tertiary',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDFR8q4-oPxw_bvuTOVGlxImj0IOj9JXUQI_7QfMxfmDPnH8CXkPcdLtorPE16ZS3r9_nXe0sC62BqYCKfdHzT_GcjnxiaEoXu3XHInjGHe0x4BD-faBcyNfEZXaEdBwsdE0RI8yi4vDY_iFTa1maByF9LmSC14A-kSRzlJKzjGNAVk1CCzBRuvbDjaR9beS-NnbH_rq9kzfwZJdwcWWv1l2x647BPaOpeFCsXkvEBMsVyL2bUdFzE-',
    alt: 'Survei jalan desa berlubang yang akan dibangun rabat beton di Desa Maju Jaya',
  },
  {
    id: 'survey-2',
    title: 'Survei Drainase Lingkungan',
    subtitle: 'Kampung Babakan RW 03',
    meta: 'Volume: 320 m Precast U-Ditch',
    badge: 'Prioritas Musdes',
    badgeVariant: 'primary',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4fEfi-A8DoB7uya3nDtjVumtR-RjwWni2ou0O_-cQilFHTl1c1r1-o9HjwyWBdAavYiuzNaVoBTVAzfJAvMQvBnWcuGLx3NLQ47Us5kISP5rtyccbiFvqA4kDrK0UCGWRv_kChIcd6lxw-BpdU0XjOhD7IF7xATUUm708X98jJIN55e8MOFwf4hlXbWhY_LvasRoa2WiEDUYTRvHb3yrdeU0ye16TP4bJ-STuLMKb5jglw_Zuha_J',
    alt: 'Saluran drainase tanah di pinggir pemukiman pedesaan',
  },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

export function formatRupiah(value: number): string {
  return 'Rp ' + formatCurrency(value);
}

export const bidangOptions: { value: BidangApbdes | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Bidang APBDes' },
  { value: '1', label: '1. Penyelenggaraan Pemerintahan' },
  { value: '2', label: '2. Pelaksanaan Pembangunan' },
  { value: '3', label: '3. Pembinaan Kemasyarakatan' },
  { value: '4', label: '4. Pemberdayaan Masyarakat' },
  { value: '5', label: '5. Penanggulangan Bencana' },
];

export const sumberOptions: { value: SumberDana | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua Sumber Dana' },
  { value: 'DD', label: 'Dana Desa (DD)' },
  { value: 'ADD', label: 'Alokasi Dana Desa (ADD)' },
  { value: 'PADes', label: 'Pendapatan Asli Desa (PADes)' },
  { value: 'BHP', label: 'Bagi Hasil Pajak (BHP)' },
];
