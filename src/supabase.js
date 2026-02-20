import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://YOUR_SUPABASE_PROJECT_ID.supabase.co";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
