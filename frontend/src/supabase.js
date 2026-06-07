import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "postgresql://postgres:[YOUR-PASSWORD]@db.waljvgvdbxqzfzlmqwtk.supabase.co:5432/postgres";
const supabaseKey = "sb_publishable_BRjF2nzuv71somtADpNGXg_nCSwDYpB";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
