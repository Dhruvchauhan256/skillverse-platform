import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "sb_publishable_BRjF2nzuv71somtADpNGXg_nCSwDYpB";
const supabaseKey = "postgresql://postgres:SkillVerse@2026@db.waljvgvdbxqzfzlmqwtk.supabase.co:5432/postgres";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
