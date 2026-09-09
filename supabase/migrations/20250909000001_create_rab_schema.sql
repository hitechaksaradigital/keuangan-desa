-- ======================================================================
-- Skema RAB (Rencana Anggaran Biaya) APBDes untuk SISKEUDES
-- Jalankan di Supabase SQL Editor: Database > SQL Editor
-- ======================================================================

-- Ekstensi untuk UUID (opsional, id pakai TEXT/UUID bebas)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------
-- 1. Tabel utama: rab_items
-- Menyimpan rincian RAB Berjalan per kode rekening APBDes
-- ----------------------------------------------------------------------
create table if not exists public.rab_items (
  id uuid primary key default gen_random_uuid(),
  kode_rekening text not null constraint rab_kode_rekening_check check (kode_rekening ~ '^[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?$'),
  bidang text not null constraint rab_bidang_check check (bidang in ('1','2','3','4','5')),
  uraian text not null,
  sub_bidang text not null,
  volume text not null,
  lokasi text not null,
  sumber_label text not null,
  sumber_value text not null constraint rab_sumber_check check (sumber_value in ('DD','ADD','PADes','BHP','DLL')),
  sumber_variant text not null default 'primary' constraint rab_variant_check check (sumber_variant in ('primary','secondary','tertiary')),
  pagu_awal bigint not null constraint rab_pagu_awal_check check (pagu_awal >= 0),
  perubahan bigint not null default 0,
  pagu_berjalan bigint not null constraint rab_pagu_berjalan_check check (pagu_berjalan >= 0),
  is_usulan_geser boolean not null default false,
  tahun_anggaran integer not null default 2024 constraint rab_tahun_check check (tahun_anggaran between 2020 and 2100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index untuk filter & search yang dipakai di halaman /rab
create index if not exists idx_rab_items_bidang on public.rab_items (bidang);
create index if not exists idx_rab_items_sumber on public.rab_items (sumber_value);
create index if not exists idx_rab_items_kode on public.rab_items (kode_rekening);
create index if not exists idx_rab_items_tahun on public.rab_items (tahun_anggaran);
create index if not exists idx_rab_items_updated on public.rab_items (updated_at desc);
-- Full-text search sederhana (uraian + sub_bidang + lokasi)
create index if not exists idx_rab_items_search on public.rab_items using gin (
  to_tsvector('indonesian', uraian || ' ' || sub_bidang || ' ' || lokasi || ' ' || kode_rekening)
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_rab_items_updated_at on public.rab_items;
create trigger trg_rab_items_updated_at
  before update on public.rab_items
  for each row execute function public.set_updated_at();

-- Validasi pagu_berjalan = pagu_awal + perubahan (warning, tidak hard-fail agar fleksibel revisi)
create or replace function public.validate_pagu_berjalan()
returns trigger language plpgsql as $$
begin
  if new.pagu_berjalan != new.pagu_awal + new.perubahan then
    raise warning 'pagu_berjalan (%) != pagu_awal (%) + perubahan (%)', new.pagu_berjalan, new.pagu_awal, new.perubahan;
  end if;
  return new;
end; $$;

drop trigger if exists trg_rab_validate_pagu on public.rab_items;
create trigger trg_rab_validate_pagu
  before insert or update on public.rab_items
  for each row execute function public.validate_pagu_berjalan();

-- ----------------------------------------------------------------------
-- 2. Row Level Security (RLS)
-- Untuk MVP transparansi publik: read terbuka, write butuh anon (bisa diperketat ke authenticated nanti)
-- ----------------------------------------------------------------------
alter table public.rab_items enable row level security;

-- Hapus policy lama jika rerun
drop policy if exists "rab_items_select_all" on public.rab_items;
drop policy if exists "rab_items_insert_all" on public.rab_items;
drop policy if exists "rab_items_update_all" on public.rab_items;
drop policy if exists "rab_items_delete_all" on public.rab_items;

-- Baca: semua orang (anon + authenticated) bisa SELECT
create policy "rab_items_select_all"
  on public.rab_items for select
  using (true);

-- Tulis: anon & authenticated bisa INSERT/UPDATE/DELETE (untuk demo; ganti ke authenticated saja jika butuh login)
create policy "rab_items_insert_all"
  on public.rab_items for insert
  with check (true);

create policy "rab_items_update_all"
  on public.rab_items for update
  using (true) with check (true);

create policy "rab_items_delete_all"
  on public.rab_items for delete
  using (true);

-- Jika ingin hanya user login yang bisa tulis, ganti dengan:
-- create policy "rab_items_insert_auth" on public.rab_items for insert to authenticated with check (true);
-- dst.

-- ----------------------------------------------------------------------
-- 3. View ringkasan (opsional) - untuk KPI di header /rab
-- ----------------------------------------------------------------------
create or replace view public.v_rab_summary as
select
  tahun_anggaran,
  count(*)::int as total_kegiatan,
  sum(pagu_awal)::bigint as sum_pagu_awal,
  sum(perubahan)::bigint as sum_perubahan,
  sum(pagu_berjalan)::bigint as sum_pagu_berjalan,
  count(*) filter (where is_usulan_geser = true)::int as usulan_geser_count,
  sum(pagu_berjalan) filter (where is_usulan_geser = true)::bigint as sum_geser
from public.rab_items
group by tahun_anggaran;

-- ----------------------------------------------------------------------
-- 4. Realtime (supaya halaman auto-update tanpa refresh)
-- ----------------------------------------------------------------------
-- Aktifkan di Dashboard: Database > Realtime > enable untuk rab_items
-- atau via SQL (jika belum aktif):
-- alter publication supabase_realtime add table public.rab_items;

-- ----------------------------------------------------------------------
-- 5. Contoh seed - 8 baris default (jalankan seed terpisah atau uncomment di bawah)
-- ----------------------------------------------------------------------
-- insert into public.rab_items (kode_rekening, bidang, uraian, sub_bidang, volume, lokasi, sumber_label, sumber_value, sumber_variant, pagu_awal, perubahan, pagu_berjalan, is_usulan_geser) values
--   ('2.01.03','2','Pembangunan Rabat Beton','Sub-bidang Pekerjaan Umum Desa','450 x 3 M','Dusun Sukamaju RT 04','DD Tahap I','DD','primary',185000000,0,185000000,false),
--   ('2.04.01','2','Insentif Guru PAUD & Kader Posyandu','Sub-bidang Pendidikan & Kesehatan','12 Bln / 10 Org','Seluruh Posyandu Desa','ADD Murni','ADD','secondary',36000000,0,36000000,false),
--   ('4.02.02','4','Pelatihan UMKM & Pengolahan Kopi','Pemberdayaan Ekonomi Masyarakat','3 Angkatan (45 Peserta)','Balai Desa & Sentra Kopi','PADes','PADes','tertiary',20000000,5000000,25000000,true),
--   ('2.02.05','2','Pembangunan Drainase Lingkungan','Sub-bidang Kawasan Pemukiman','320 Meter U-Ditch','RW 03 Kp. Babakan','DD Tahap II','DD','primary',92500000,0,92500000,false)
-- on conflict do nothing;
