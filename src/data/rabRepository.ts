import { supabase } from '../lib/supabase';
import type { BidangApbdes, RabItem, SumberDana } from './rab';

// DB row shape (snake_case)
export interface RabRow {
  id: string;
  kode_rekening: string;
  bidang: BidangApbdes;
  uraian: string;
  sub_bidang: string;
  volume: string;
  lokasi: string;
  sumber_label: string;
  sumber_value: SumberDana;
  sumber_variant: 'primary' | 'secondary' | 'tertiary';
  pagu_awal: number;
  perubahan: number;
  pagu_berjalan: number;
  is_usulan_geser: boolean;
  tahun_anggaran: number;
  created_at: string;
  updated_at: string;
}

export function mapRowToItem(row: RabRow): RabItem {
  return {
    id: row.id,
    kodeRekening: row.kode_rekening,
    bidang: row.bidang,
    uraian: row.uraian,
    subBidang: row.sub_bidang,
    volume: row.volume,
    lokasi: row.lokasi,
    sumberLabel: row.sumber_label,
    sumberValue: row.sumber_value,
    sumberVariant: row.sumber_variant,
    paguAwal: Number(row.pagu_awal),
    perubahan: Number(row.perubahan),
    paguBerjalan: Number(row.pagu_berjalan),
    isUsulanGeser: row.is_usulan_geser,
  };
}

export function mapItemToRow(item: Omit<RabItem, 'id'> & { id?: string; tahunAnggaran?: number }): Omit<RabRow, 'id' | 'created_at' | 'updated_at'> & { id?: string } {
  return {
    ...(item.id ? { id: item.id } : {}),
    kode_rekening: item.kodeRekening,
    bidang: item.bidang,
    uraian: item.uraian,
    sub_bidang: item.subBidang,
    volume: item.volume,
    lokasi: item.lokasi,
    sumber_label: item.sumberLabel,
    sumber_value: item.sumberValue,
    sumber_variant: item.sumberVariant,
    pagu_awal: item.paguAwal,
    perubahan: item.perubahan,
    pagu_berjalan: item.paguBerjalan,
    is_usulan_geser: !!item.isUsulanGeser,
    tahun_anggaran: item.tahunAnggaran ?? 2024,
  };
}

export async function fetchRabItems(): Promise<{ data: RabItem[]; error: string | null }> {
  const { data, error } = await supabase
    .from('rab_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: (data as RabRow[]).map(mapRowToItem), error: null };
}

export interface CreateRabPayload {
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
  paguBerjalan?: number; // if omitted, computed as paguAwal+perubahan
  isUsulanGeser?: boolean;
  tahunAnggaran?: number;
}

export async function insertRabItem(payload: CreateRabPayload): Promise<{ data: RabItem | null; error: string | null }> {
  const row = {
    kode_rekening: payload.kodeRekening.trim(),
    bidang: payload.bidang,
    uraian: payload.uraian.trim(),
    sub_bidang: payload.subBidang.trim(),
    volume: payload.volume.trim(),
    lokasi: payload.lokasi.trim(),
    sumber_label: payload.sumberLabel.trim(),
    sumber_value: payload.sumberValue,
    sumber_variant: payload.sumberVariant,
    pagu_awal: payload.paguAwal,
    perubahan: payload.perubahan,
    pagu_berjalan: payload.paguBerjalan ?? payload.paguAwal + payload.perubahan,
    is_usulan_geser: !!payload.isUsulanGeser,
    tahun_anggaran: payload.tahunAnggaran ?? 2024,
  };

  const { data, error } = await supabase.from('rab_items').insert(row).select().single();
  if (error) return { data: null, error: error.message };
  return { data: mapRowToItem(data as RabRow), error: null };
}

export async function deleteRabItem(id: string): Promise<{ error: string | null }> {
  const { error } = await supabase.from('rab_items').delete().eq('id', id);
  if (error) return { error: error.message };
  return { error: null };
}

export async function updateRabItem(id: string, patch: Partial<CreateRabPayload>): Promise<{ data: RabItem | null; error: string | null }> {
  const rowPatch: Record<string, unknown> = {};
  if (patch.kodeRekening !== undefined) rowPatch.kode_rekening = patch.kodeRekening;
  if (patch.bidang !== undefined) rowPatch.bidang = patch.bidang;
  if (patch.uraian !== undefined) rowPatch.uraian = patch.uraian;
  if (patch.subBidang !== undefined) rowPatch.sub_bidang = patch.subBidang;
  if (patch.volume !== undefined) rowPatch.volume = patch.volume;
  if (patch.lokasi !== undefined) rowPatch.lokasi = patch.lokasi;
  if (patch.sumberLabel !== undefined) rowPatch.sumber_label = patch.sumberLabel;
  if (patch.sumberValue !== undefined) rowPatch.sumber_value = patch.sumberValue;
  if (patch.sumberVariant !== undefined) rowPatch.sumber_variant = patch.sumberVariant;
  if (patch.paguAwal !== undefined) rowPatch.pagu_awal = patch.paguAwal;
  if (patch.perubahan !== undefined) rowPatch.perubahan = patch.perubahan;
  if (patch.paguBerjalan !== undefined) rowPatch.pagu_berjalan = patch.paguBerjalan;
  if (patch.isUsulanGeser !== undefined) rowPatch.is_usulan_geser = patch.isUsulanGeser;

  const { data, error } = await supabase.from('rab_items').update(rowPatch).eq('id', id).select().single();
  if (error) return { data: null, error: error.message };
  return { data: mapRowToItem(data as RabRow), error: null };
}
