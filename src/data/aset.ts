export type KibCategory = 'A' | 'B' | 'C' | 'D' | 'E';

export interface KibAsset {
  id: string;
  category: KibCategory;
  registerCode: string;
  documentType: string;
  documentNumber: string;
  name: string;
  specification: string;
  year: number;
  fundingSource: string;
  origin: string;
  condition: 'Baik / Produktif' | 'Baik' | 'Baik / Dikelola BUMDes' | 'Rusak Ringan' | 'Rusak Berat';
  acquisitionValue: number;
  accumulatedDepreciation: number;
  bookValue: number;
  location: string;
  personInCharge: string;
  notes?: string;
  coordinates?: string;
  statusLegal: string;
}

export interface BumdesUnit {
  id: string;
  unitNumber: string;
  name: string;
  status: 'Sehat' | 'Berkelanjutan' | 'Kurang Sehat';
  description: string;
  netProfitSemester2: number;
  padesContribution: number;
  progressPercentage: number;
  tagColor: 'primary' | 'secondary' | 'tertiary' | 'outline';
}

export interface DividendDeposit {
  id: string;
  date: string;
  referenceNumber: string;
  bankName: string;
  period: string;
  amount: number;
  status: 'Tervalidasi BKU' | 'Menunggu Verifikasi';
}

export interface AuditDocument {
  id: string;
  title: string;
  fileSize: string;
  verificationStatus: string;
  fileType: 'pdf' | 'doc';
  downloadUrl?: string;
}

export interface AssetMetrics {
  totalAssetValue: number;
  registeredCount: number;
  yoyGrowth: string;
  capitalParticipation: number;
  decreeNumber: string;
  perdesNumber: string;
  dividendRealization: number;
  dividendTarget: number;
  dividendRemaining: number;
  dividendPercentage: number;
  bumdesActiveUnits: number;
  unitList: string;
  statusLabel: string;
}

export const initialAssetMetrics: AssetMetrics = {
  totalAssetValue: 4820000000,
  registeredCount: 248,
  yoyGrowth: '+6.4% Thn Lalu',
  capitalParticipation: 350000000,
  decreeNumber: 'SK Kades No. 141/08/2021',
  perdesNumber: 'Perdes No. 04',
  dividendRealization: 48500000,
  dividendTarget: 50000000,
  dividendRemaining: 1500000,
  dividendPercentage: 97,
  bumdesActiveUnits: 4,
  unitList: 'Wisata, PAMSIMAS, PPOB, Gabah',
  statusLabel: 'Sehat',
};

export const kibCategoryTabs = [
  { id: 'A' as KibCategory, label: 'Tanah (KIB A)' },
  { id: 'B' as KibCategory, label: 'Mesin & Peralatan (KIB B)' },
  { id: 'C' as KibCategory, label: 'Gedung & Bangunan (KIB C)' },
  { id: 'D' as KibCategory, label: 'Jalan, Irigasi & Jaringan (KIB D)' },
  { id: 'E' as KibCategory, label: 'Aset Tetap Lainnya (KIB E)' },
];

export const initialKibAssets: KibAsset[] = [
  // KIB A - Tanah
  {
    id: 'tanah-1',
    category: 'A',
    registerCode: '01.01.11.04.01',
    documentType: 'Sertifikat Hak Pakai',
    documentNumber: 'SHP No. 12/MJ/2018',
    name: 'Tanah Kas Desa Blok Pari Gede',
    specification: 'Luas: 14.500 m² (Persil No. 42a)',
    year: 1982,
    fundingSource: 'Aset Asli Desa',
    origin: 'Warisan Adat',
    condition: 'Baik / Produktif',
    acquisitionValue: 2175000000,
    accumulatedDepreciation: 0,
    bookValue: 2175000000,
    location: 'Dusun II (Karang Anyar)',
    personInCharge: 'Kasie Pemerintahan',
    notes: 'Disewakan sebagian untuk kas desa sistem lelang tahunan garapan sawah irigasi teknis.',
    coordinates: '-6.342119, 107.164320',
    statusLegal: 'Sertifikat Hak Pakai Pemdes No. 12 Thn 2018',
  },
  {
    id: 'tanah-2',
    category: 'A',
    registerCode: '01.01.11.04.02',
    documentType: 'Sertifikat Desa',
    documentNumber: 'NIB: 10.02.04.11',
    name: 'Tanah Kantor Desa & Balai Warga',
    specification: 'Luas: 2.800 m² (Persil No. 10)',
    year: 1996,
    fundingSource: 'Hibah Pemkab',
    origin: 'Aset Hibah',
    condition: 'Baik',
    acquisitionValue: 840000000,
    accumulatedDepreciation: 0,
    bookValue: 840000000,
    location: 'Jl. Raya Utama Maju Jaya',
    personInCharge: 'Sekretaris Desa',
    notes: 'Kompleks kantor kepala desa, gedung BPD, balai pertemuan serbaguna, dan parkir umum.',
    coordinates: '-6.340915, 107.161045',
    statusLegal: 'Sertifikat Hak Pakai Desa Hak Pakai No. 04/1996',
  },
  {
    id: 'tanah-3',
    category: 'A',
    registerCode: '01.01.11.04.05',
    documentType: 'Pengadaan APBDes',
    documentNumber: 'AJB No. 44/Ckr/2022',
    name: 'Lahan Agro Wisata Curug Luhur',
    specification: 'Luas: 6.200 m² (Kawasan Wisata)',
    year: 2022,
    fundingSource: 'Dana Desa (DDS)',
    origin: 'Pembelian Bebas',
    condition: 'Baik / Dikelola BUMDes',
    acquisitionValue: 620000000,
    accumulatedDepreciation: 0,
    bookValue: 620000000,
    location: 'Dusun IV (Wates Hilir)',
    personInCharge: 'Direktur BUMDes',
    notes: 'Dikelola oleh unit usaha BUMDes Berkah Mandiri untuk wahana wisata alam dan foodcourt.',
    coordinates: '-6.348721, 107.170450',
    statusLegal: 'AJB Notaris PPAT No. 44/Ckr/2022 & Proses SHP',
  },
  {
    id: 'tanah-4',
    category: 'A',
    registerCode: '01.01.11.04.09',
    documentType: 'Sertifikat Hak Pakai',
    documentNumber: 'Letter C No. 109',
    name: 'Tanah Lapangan Olahraga & Pujasera',
    specification: 'Luas: 5.000 m² (Fasum Pemuda)',
    year: 2014,
    fundingSource: 'Aset Asli Desa',
    origin: 'Tanah Bengkok',
    condition: 'Baik',
    acquisitionValue: 450000000,
    accumulatedDepreciation: 0,
    bookValue: 450000000,
    location: 'Dusun I (Kramat)',
    personInCharge: 'Kasie Pelayanan',
    notes: 'Lapangan sepakbola desa, jogging track, dan sentra kuliner UMKM karang taruna.',
    coordinates: '-6.338420, 107.159200',
    statusLegal: 'Buku C Desa No. 109 Persil 18 S.III',
  },
  {
    id: 'tanah-5',
    category: 'A',
    registerCode: '01.01.11.04.12',
    documentType: 'Aset Tidak Bergerak',
    documentNumber: 'Register SIPADES: T-88',
    name: 'Tanah Saluran Pembuangan Irigasi Blok Barat',
    specification: 'Luas: 2.300 m² (Tanggul Rawan Longsor)',
    year: 2016,
    fundingSource: 'Aset Asli Desa',
    origin: 'Konversi Sungai',
    condition: 'Rusak Ringan',
    acquisitionValue: 235000000,
    accumulatedDepreciation: 0,
    bookValue: 235000000,
    location: 'Dusun III (Sindang Kasih)',
    personInCharge: 'Kaur Kesra',
    notes: 'Perlu penguatan bronjong tanggul penahan tanah sepanjang 120 meter.',
    coordinates: '-6.345120, 107.168500',
    statusLegal: 'Pencatatan Berita Acara Batas Desa No. 08/2016',
  },

  // KIB B - Mesin & Peralatan
  {
    id: 'mesin-1',
    category: 'B',
    registerCode: '02.02.01.03.01',
    documentType: 'Faktur Pengadaan',
    documentNumber: 'INV/2021/089-KBT',
    name: 'Traktor Roda 4 Kubota L4018',
    specification: 'Mesin Diesel 40 HP + Rotavator',
    year: 2021,
    fundingSource: 'Dana Desa (DDS)',
    origin: 'Pengadaan Baru APBDes',
    condition: 'Baik',
    acquisitionValue: 195000000,
    accumulatedDepreciation: 48750000,
    bookValue: 146250000,
    location: 'Gudang Pertanian Dusun I',
    personInCharge: 'Kaur Ekbang',
    notes: 'Dipinjamkan bergilir ke Gapoktan Sri Rejeki untuk olah tanam padi.',
    statusLegal: 'Faktur & Berita Acara Serah Terima No. 14/BAST/2021',
  },
  {
    id: 'mesin-2',
    category: 'B',
    registerCode: '02.02.04.01.03',
    documentType: 'Hibah Kementan',
    documentNumber: 'HB-KEMTAN-2023-012',
    name: 'Mesin Pengering Gabah Bed Dryer Kapasitas 10 Ton',
    specification: 'Circulating Grain Dryer Otomatis',
    year: 2023,
    fundingSource: 'Hibah Kementerian',
    origin: 'Bantuan Pemerintah',
    condition: 'Baik / Dikelola BUMDes',
    acquisitionValue: 285000000,
    accumulatedDepreciation: 35625000,
    bookValue: 249375000,
    location: 'Sentra Pasca Panen BUMDes',
    personInCharge: 'Direktur BUMDes',
    notes: 'Dioperasikan oleh Unit Usaha Dryer Center BUMDes.',
    statusLegal: 'SK Hibah BMN Kementan No. 202/Kpts/2023',
  },
  {
    id: 'mesin-3',
    category: 'B',
    registerCode: '02.03.01.02.05',
    documentType: 'STNK & BPKB',
    documentNumber: 'B 9482 FQ / BPKB No. L-098213',
    name: 'Mobil Ambulans Siaga Desa Suzuki APV',
    specification: 'Ambulans Transport Lengkap Tabung O2 & Brankar',
    year: 2020,
    fundingSource: 'Dana Desa (DDS)',
    origin: 'Pengadaan APBDes',
    condition: 'Baik',
    acquisitionValue: 240000000,
    accumulatedDepreciation: 80000000,
    bookValue: 160000000,
    location: 'Garasi Balai Desa',
    personInCharge: 'Kasie Pelayanan',
    notes: 'Layanan 24 jam gratis rujukan warga sakit ke RSUD.',
    statusLegal: 'STNK Milik Pemerintah Desa Maju Jaya',
  },

  // KIB C - Gedung & Bangunan
  {
    id: 'gedung-1',
    category: 'C',
    registerCode: '03.01.01.01.01',
    documentType: 'IMB / PBG Desa',
    documentNumber: 'PBG-3216-2019-001',
    name: 'Gedung Kantor Desa & Ruang Pelayanan',
    specification: '2 Lantai, Luas Bangunan: 480 m²',
    year: 2019,
    fundingSource: 'Bantuan Keuangan Provinsi',
    origin: 'Pembangunan Baru',
    condition: 'Baik',
    acquisitionValue: 720000000,
    accumulatedDepreciation: 90000000,
    bookValue: 630000000,
    location: 'Jl. Raya Utama Maju Jaya',
    personInCharge: 'Sekretaris Desa',
    notes: 'Pelayanan administrasi kependudukan terpadu satu pintu (PTSP Desa).',
    statusLegal: 'Register Bangunan Aset Tetap Desa',
  },
  {
    id: 'gedung-2',
    category: 'C',
    registerCode: '03.01.02.04.02',
    documentType: 'Berita Acara Selesai Fisik',
    documentNumber: 'BAST-FISIK-2022-89',
    name: 'Balai Pertemuan Serbaguna Desa',
    specification: 'Konstruksi Baja WF, Luas: 600 m²',
    year: 2022,
    fundingSource: 'Dana Desa (DDS)',
    origin: 'Pembangunan Baru APBDes',
    condition: 'Baik',
    acquisitionValue: 550000000,
    accumulatedDepreciation: 27500000,
    bookValue: 522500000,
    location: 'Kompleks Balai Desa',
    personInCharge: 'Kaur Umum',
    notes: 'Digunakan untuk Musrenbangdes, senam lansia, dan disewakan untuk resepsi warga.',
    statusLegal: 'SK Penetapan Status Penggunaan Aset Desa 2022',
  },

  // KIB D - Jalan, Irigasi & Jaringan
  {
    id: 'jalan-1',
    category: 'D',
    registerCode: '04.01.01.05.01',
    documentType: 'SK Jalan Desa',
    documentNumber: 'SK.KADES/32/2023',
    name: 'Jalan Usaha Tani Beton Dusun Sukamaju',
    specification: 'Panjang: 1.200 m, Lebar: 3 m, Tebal Cor: 15 cm',
    year: 2023,
    fundingSource: 'Dana Desa (DDS)',
    origin: 'Pembangunan Fisik',
    condition: 'Baik',
    acquisitionValue: 360000000,
    accumulatedDepreciation: 18000000,
    bookValue: 342000000,
    location: 'Dusun I RT 03/02',
    personInCharge: 'Kaur Ekbang',
    notes: 'Akses sentra gabah menuju jalan kabupaten.',
    statusLegal: 'Keputusan Kades tentang Ruas Jalan Desa',
  },
  {
    id: 'jaringan-1',
    category: 'D',
    registerCode: '04.03.02.01.04',
    documentType: 'BAST Sarana Air',
    documentNumber: 'PAMSIMAS/BA-2021-02',
    name: 'Jaringan Perpipaan & Bak Reservoir PAMSIMAS',
    specification: 'Pipa HDPE 4.800 m, Reservoir 20 m³, 480 SR',
    year: 2021,
    fundingSource: 'Alokasi Dana Desa & Hibah Pusat',
    origin: 'Pemberdayaan Masyarakat',
    condition: 'Baik / Dikelola BUMDes',
    acquisitionValue: 310000000,
    accumulatedDepreciation: 46500000,
    bookValue: 263500000,
    location: 'Dusun I - Dusun IV',
    personInCharge: 'Direktur BUMDes',
    notes: 'Melayani pasokan air bersih bagi 480 kepala keluarga.',
    statusLegal: 'Serah Terima Pengelolaan dari Pemdes ke BUMDes',
  },

  // KIB E - Aset Tetap Lainnya
  {
    id: 'aset-lain-1',
    category: 'E',
    registerCode: '05.01.02.01.01',
    documentType: 'Katalog Koleksi',
    documentNumber: 'PERPUS-DESA-01',
    name: 'Koleksi Buku & Digitalisasi Pojok Baca Perpustakaan Desa',
    specification: '1.450 Judul Buku + 4 Unit Tablet Pembaca',
    year: 2022,
    fundingSource: 'Dana Desa (DDS)',
    origin: 'Pengadaan APBDes',
    condition: 'Baik',
    acquisitionValue: 48000000,
    accumulatedDepreciation: 9600000,
    bookValue: 38400000,
    location: 'Balai Warga Maju Jaya',
    personInCharge: 'Kasie Pelayanan',
    notes: 'Fasilitas literasi anak dan warga.',
    statusLegal: 'Buku Induk Perpustakaan Desa',
  },
];

export const bumdesUnits: BumdesUnit[] = [
  {
    id: 'unit-1',
    unitNumber: 'UNIT 01',
    name: 'Wisata Desa & Resto Curug',
    status: 'Sehat',
    description: 'Pengelolaan tiket masuk, outbound flying fox, retribusi parkir, dan sewa booth UMKM lokal.',
    netProfitSemester2: 58200000,
    padesContribution: 23280000,
    progressPercentage: 100,
    tagColor: 'primary',
  },
  {
    id: 'unit-2',
    unitNumber: 'UNIT 02',
    name: 'Agen BRILink & PPOB Terpadu',
    status: 'Sehat',
    description: 'Layanan tarik-setor tunai warga, pembayaran listrik, PDAM, BPJS, transfer antarbank desa.',
    netProfitSemester2: 24500000,
    padesContribution: 9800000,
    progressPercentage: 88,
    tagColor: 'secondary',
  },
  {
    id: 'unit-3',
    unitNumber: 'UNIT 03',
    name: 'Dryer Center & Pengering Gabah',
    status: 'Sehat',
    description: 'Penyedia fasilitas pengering gabah mekanis kapasitas 10 ton/hari untuk Gapoktan Desa.',
    netProfitSemester2: 21000000,
    padesContribution: 8400000,
    progressPercentage: 75,
    tagColor: 'tertiary',
  },
  {
    id: 'unit-4',
    unitNumber: 'UNIT 04',
    name: 'Pengelolaan PAMSIMAS Desa',
    status: 'Berkelanjutan',
    description: 'Distribusi pipa air minum perumahan warga ke 480 sambungan rumah (SR) Dusun I-IV.',
    netProfitSemester2: 17550000,
    padesContribution: 7020000,
    progressPercentage: 80,
    tagColor: 'outline',
  },
];

export const dividendDeposits: DividendDeposit[] = [
  {
    id: 'trf-1',
    date: '15 Jan 2024',
    referenceNumber: 'TRF/BUMDES/24/001',
    bankName: 'Bank BJB Kas Desa',
    period: 'Deviden Smt II - T.A. 2023',
    amount: 23500000,
    status: 'Tervalidasi BKU',
  },
  {
    id: 'trf-2',
    date: '22 Jul 2024',
    referenceNumber: 'TRF/BUMDES/24/008',
    bankName: 'Bank BJB Kas Desa',
    period: 'Deviden Smt I - T.A. 2024',
    amount: 25000000,
    status: 'Tervalidasi BKU',
  },
];

export const auditDocuments: AuditDocument[] = [
  {
    id: 'doc-1',
    title: 'LPJ_Keuangan_BUMDes_2023.pdf',
    fileSize: '4.2 MB',
    verificationStatus: 'Audit Tuntas',
    fileType: 'pdf',
  },
  {
    id: 'doc-2',
    title: 'Neraca_Semester_I_2024.pdf',
    fileSize: '2.1 MB',
    verificationStatus: 'Terverifikasi BPD',
    fileType: 'pdf',
  },
  {
    id: 'doc-3',
    title: 'BA_Musdes_Bagi_Hasil_PADes.pdf',
    fileSize: '1.8 MB',
    verificationStatus: 'TTD Kades & BPD',
    fileType: 'doc',
  },
];

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencySimple(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}
