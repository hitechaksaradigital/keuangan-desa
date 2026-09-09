# Supabase - SISKEUDES RAB

## Setup awal

1. Buka **Supabase Dashboard** project `eafnwuiprhcpzvxzlhbs`:
   - `https://app.supabase.com/project/eafnwuiprhcpzvxzlhbs`

2. Buka **SQL Editor** > New Query, copy-paste isi file:
   - `supabase/migrations/20250909000001_create_rab_schema.sql` → Run
   - Verifikasi: Table Editor > `rab_items` harus muncul dengan 8 index + RLS enabled

3. Seed data awal (opsional, jika tabel kosong):
   - Copy-paste `supabase/seeds/rab_seed.sql` → Run
   - Cek: `select count(*) from public.rab_items;` harus 8

4. Aktifkan **Realtime** (agar halaman /rab auto-update):
   - Database > Realtime > enable untuk `rab_items`
   - atau jalankan: `alter publication supabase_realtime add table public.rab_items;`

## ENV

Pastikan `.env` ada (sudah terisi):
```
VITE_SUPABASE_URL=https://eafnwuiprhcpzvxzlhbs.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...
```

## Skema `public.rab_items`

| kolom | tipe | catatan |
|---|---|---|
| id | uuid pk | gen_random_uuid() |
| kode_rekening | text | format `x.xx.xx` validasi regex |
| bidang | text | 1-5 |
| uraian | text | nama kegiatan |
| sub_bidang | text | |
| volume | text | contoh `450 x 3 M` |
| lokasi | text | |
| sumber_label | text | `DD Tahap I` dll |
| sumber_value | text | DD/ADD/PADes/BHP/DLL |
| sumber_variant | text | primary/secondary/tertiary |
| pagu_awal | bigint | >=0 |
| perubahan | bigint | bisa negatif |
| pagu_berjalan | bigint | ideal = pagu_awal+perubahan |
| is_usulan_geser | boolean | |
| tahun_anggaran | int | default 2024 |
| created_at | timestamptz | |
| updated_at | timestamptz | auto via trigger |

## RLS

- `SELECT` terbuka untuk publik (portal transparansi)
- `INSERT/UPDATE/DELETE` terbuka untuk `anon` & `authenticated` (demo). Untuk produksi, ganti ke `authenticated` saja di SQL.

## Penggunaan di kode

- Client: `src/lib/supabase.ts`
- Fetch: `supabase.from('rab_items').select('*').order('created_at', {ascending:false})`
- Insert: `supabase.from('rab_items').insert({...}).select().single()`
- Halaman `/rab` sudah terhubung dengan fallback ke data lokal jika DB kosong/offline.
