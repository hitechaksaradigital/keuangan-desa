export const logoUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAA05vXwbxflBPmpmtPEUIwtV_KL3U7NkF-poZI1a-qtn14cS3vpp45n3w6iiSrlWueQOX9kbu4GVmz4kcuU63-eR-uxYiiHspaGmsBBc9AEqCsRhfHRi_jXJkRJiLzdccsHpX4UJJN_NqgqcjS3zHT2FvR8_lmIq6W6dhV5w3xsCddXhlKMkdbhypEMMRrPeVBwKdxEaVLX3c9bKbcf11wU-6klWhE-MjMeC4J0M42Ax58oWSRoR3I';

export const mapImageUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCtgXXzYIVvyc41b7aykElE2FXhRK43CBKDFkxJJmBt9Fy-51hNW_-uW5B6bPItUl2zd5w1ItGG6bEo7J0g35CoegfV8IOrYlM5LvF0EybNqHgpZPuqD18T-p0BpvQ0uuBFIdrsrsxv8ztcCEUmGNx8agmgGLp0IlBZi-eAAztGWyklpYiU98js2J3BeGpZ_X5vrR2kO0QCFk-Wh1fZI1RTMz8lU90mLPnInWTxm1J03bpgVfKXkzFw';

export type ProjectStatus = 'completed' | 'in-progress' | 'ready';

export interface Project {
  id: 'sukamaju' | 'saluran' | 'posyandu';
  title: string;
  location: string;
  status: ProjectStatus;
  statusLabel: string;
  amount: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tpk: string;
  volume: string;
  source: string;
  duration?: string;
  targetStart?: string;
  progress?: number;
  ctaLabel: string;
  modalStatus: string;
}

export const projects: Project[] = [
  {
    id: 'sukamaju',
    title: 'Pengaspalan & Rabat Beton Dusun Sukamaju',
    location: 'Dusun I RT 03/02',
    status: 'completed',
    statusLabel: 'Selesai 100%',
    amount: 'Rp 185.000.000',
    description:
      'Peningkatan aksesibilitas jalan sentra pertanian gabah & hortikultura sepanjang 620 meter.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsjhae6iX4h7oy-gWAWtdNvL4gcxaL62d5HrHfiYoXkvJGaUCc_erbk-VEG3AvzuhVbHeX4Vv0t_T1sz1bDbNYFVm3ZsTohSdY8LEUpL3k8dqT5-1we6f3NliuCcFeBFHsgw-GwosxQycIKpKYSCVidXx024PwhoaqgeKDhfKZ8yTCG8sWiPgMd-D2flpV2JrgpWs7csNmf5_zJihiZrLbOW_nXeI3z-l_XwFQ1Sri1IPLksAEUzR3',
    imageAlt:
      'Foto dokumentasi hasil pembangunan jalan aspal baru di desa dengan permukaan aspal hitam mulus membentang melewati hamparan sawah hijau di pagi hari yang cerah.',
    tpk: 'Kusnadi (Ketua TPK Desa), Hendra (Kaur Ekbang), didampingi LPMD.',
    volume: '620 meter x 3 meter (Tebal Cor 15 cm + Lapen Aspal 5 cm)',
    source: 'Dana Desa (DDS) Tahap 1',
    duration: 'Durasi: 45 Hari Kalender',
    ctaLabel: 'Lihat SPJ & Dokumentasi',
    modalStatus: 'Selesai 100%',
  },
  {
    id: 'saluran',
    title: 'Pembangunan Saluran Air Bersih & Pipanisasi',
    location: 'Dusun II Sumber Rejeki',
    status: 'in-progress',
    statusLabel: 'Pengerjaan 65%',
    amount: 'Rp 75.000.000',
    description:
      'Pembuatan tandon penampungan 5000 liter dan instalasi pipa sambungan ke 85 rumah warga.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAjipfihCJBAf2yO6GVSYNa6ZFAgoFNDzOa6OFtEmoTJbcbOVzVPgeA2yW78Zl9EvQ_oXs0NIfn2VsHewK3wgoDsLRlIM6Uj1mFcbIrua0aKKrMshLFgRx_ota1PRI8TNRIoFMS47-TbaVVgJl_nhAIkweCPbpLmGGatRKx7sgns_22ps_HkmsiNYRoHNkgo7WUxsS5BN-cHIsgoUmFMeIh9A-yVSkNWK6JrK7bxPpKabjenz7GtfvU',
    imageAlt:
      'Pekerja konstruksi desa dan warga bergotong royong memasang pipa saluran air bersih paralon biru besar di tepi parit jalan pedesaan yang asri dan bersih.',
    tpk: 'Bambang Sukoco (Kaur Kesra) & Kelompok Pengelola Sarana Air Bersih (KPSPAM)',
    volume: '1.200 m pipa paralon + 1 unit menara tandon beton + 85 water meter',
    source: 'Alokasi Dana Desa (ADD)',
    progress: 65,
    ctaLabel: 'Detail Proyek',
    modalStatus: 'Pengerjaan 65%',
  },
  {
    id: 'posyandu',
    title: 'Renovasi Gedung Posyandu Mawar & Sarana Stunting',
    location: 'Dusun III Kencana',
    status: 'ready',
    statusLabel: 'Siap Dimulai',
    amount: 'Rp 42.000.000',
    description:
      'Penggantian plafon, lantai keramik, dan penambahan ruang konsultasi laktasi ibu & balita.',
    tpk: 'Ibu Nurhayati (Kader PKK Pokja IV) & Tim Pelaksana Kegiatan Desa',
    volume: 'Gedung 6 m x 8 m + Alat Antropometri Kit Kemenkes Standar',
    source: 'Dana Desa (DDS) Tahap 2',
    targetStart: 'Target Mulai: 01 Agustus 2024',
    ctaLabel: 'Detail Kegiatan',
    modalStatus: 'Siap Dimulai (Jadwal: 1 Ags)',
  },
];
