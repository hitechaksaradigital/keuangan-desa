-- Seed RAB APBDes 2024 - 8 data awal (sinkron dengan src/data/rab.ts)
-- Jalankan setelah migration: copy-paste ke SQL Editor Supabase

insert into public.rab_items (kode_rekening, bidang, uraian, sub_bidang, volume, lokasi, sumber_label, sumber_value, sumber_variant, pagu_awal, perubahan, pagu_berjalan, is_usulan_geser, tahun_anggaran) values
  ('2.01.03','2','Pembangunan Rabat Beton','Sub-bidang Pekerjaan Umum Desa','450 x 3 M','Dusun Sukamaju RT 04','DD Tahap I','DD','primary',185000000,0,185000000,false,2024),
  ('2.04.01','2','Insentif Guru PAUD & Kader Posyandu','Sub-bidang Pendidikan & Kesehatan','12 Bln / 10 Org','Seluruh Posyandu Desa','ADD Murni','ADD','secondary',36000000,0,36000000,false,2024),
  ('4.02.02','4','Pelatihan UMKM & Pengolahan Kopi','Pemberdayaan Ekonomi Masyarakat','3 Angkatan (45 Peserta)','Balai Desa & Sentra Kopi','PADes','PADes','tertiary',20000000,5000000,25000000,true,2024),
  ('2.02.05','2','Pembangunan Drainase Lingkungan','Sub-bidang Kawasan Pemukiman','320 Meter U-Ditch','RW 03 Kp. Babakan','DD Tahap II','DD','primary',92500000,0,92500000,false,2024),
  ('1.01.01','1','Penyediaan Operasional Pemerintahan Desa','Sub-bidang Tata Praja','12 Bulan','Kantor Desa Maju Jaya','ADD Murni','ADD','secondary',48000000,-2000000,46000000,false,2024),
  ('3.02.01','3','Pembinaan Karang Taruna & Olahraga','Sub-bidang Kepemudaan','4 Kegiatan','Lapangan Desa','PADes','PADes','tertiary',15000000,0,15000000,false,2024),
  ('5.01.01','5','Penanggulangan Bencana & Keadaan Darurat','Sub-bidang Siaga Bencana','1 Paket Siaga','Seluruh Dusun','DLL','DLL','primary',25000000,0,25000000,false,2024),
  ('2.01.05','2','Rehabilitasi Jalan Lingkungan Aspal','Sub-bidang Pekerjaan Umum','600 x 2.5 M','Dusun I - II','BHP','BHP','secondary',110000000,0,110000000,false,2024)
on conflict do nothing;
