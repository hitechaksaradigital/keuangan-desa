import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum diset. Pastikan file .env terisi.'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: { persistSession: false, autoRefreshToken: false },
});

// helper untuk cek koneksi
export async function checkSupabaseConnection(): Promise<{ ok: boolean; error?: string }> {
  if (!supabaseUrl || !supabaseAnonKey) return { ok: false, error: 'ENV belum dikonfigurasi' };
  const { error } = await supabase.from('rab_items').select('id').limit(1);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
