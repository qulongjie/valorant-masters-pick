/**
 * Supabase Client Configuration & Table Schemas Placeholder
 * 
 * To activate live database storage in the next phase, add these variables to your `.env` file:
 * VITE_SUPABASE_URL=https://your-project-id.supabase.co
 * VITE_SUPABASE_ANON_KEY=your-anon-key
 */

// import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Exports a dummy client structure for front-end mock compatibility.
// When ready, simply uncomment the @supabase/supabase-js import and creation.
export const supabase = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
  },
  from: (tableName: string) => {
    console.log(`[Supabase Mock] Querying table ${tableName} on ${supabaseUrl.substring(0, 15)}... using key: ${supabaseAnonKey.substring(0, 10)}...`);
    return {
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
        }),
        order: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: (data: Record<string, unknown>) => Promise.resolve({ data, error: null }),
      update: (data: Record<string, unknown>) => Promise.resolve({ data, error: null }),
    };
  }
};

/*
--------------------------------------------------------------------------------
DATABASE TABLES SCHEMAS FOR SUPABASE (SQL BLUEPRINTS)
--------------------------------------------------------------------------------

1. teams Table
================================================================================
CREATE TABLE public.teams (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  region VARCHAR(50) NOT NULL, -- CN / Pacific / Americas / EMEA
  logo_text VARCHAR(10) NOT NULL,
  support_rate NUMERIC DEFAULT 0.0,
  ranking_support_rate NUMERIC DEFAULT 0.0,
  change_rate NUMERIC DEFAULT 0.0,
  color VARCHAR(100) NOT NULL,
  bg_accent VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to teams" ON public.teams FOR SELECT USING (true);


2. matches Table
================================================================================
CREATE TABLE public.matches (
  id VARCHAR(50) PRIMARY KEY,
  date VARCHAR(50) NOT NULL, -- e.g. "6月10日"
  time VARCHAR(50) NOT NULL, -- e.g. "16:00"
  stage VARCHAR(100) NOT NULL, -- e.g. "瑞士轮 第一轮"
  format VARCHAR(10) DEFAULT 'BO3' NOT NULL, -- BO3 / BO5
  team_a_id VARCHAR(50) REFERENCES public.teams(id),
  team_b_id VARCHAR(50) REFERENCES public.teams(id),
  status VARCHAR(50) DEFAULT 'upcoming' NOT NULL, -- upcoming / live / finished
  winner_team_id VARCHAR(50) REFERENCES public.teams(id),
  score_result VARCHAR(20), -- e.g. "2:1"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to matches" ON public.matches FOR SELECT USING (true);


3. champion_votes Table
================================================================================
CREATE TABLE public.champion_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id VARCHAR(50) NOT NULL REFERENCES public.teams(id),
  user_ip VARCHAR(100), -- For basic duplication control
  device_fingerprint VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.champion_votes ENABLE ROW LEVEL SECURITY;
-- Anyone can read totals (via RPC or aggregation)
CREATE POLICY "Allow public read access to champion_votes" ON public.champion_votes FOR SELECT USING (true);
CREATE POLICY "Allow anonymous vote insertions" ON public.champion_votes FOR INSERT WITH CHECK (true);


4. match_predictions Table
================================================================================
CREATE TABLE public.match_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id VARCHAR(50) NOT NULL REFERENCES public.matches(id),
  winner_team_id VARCHAR(50) NOT NULL REFERENCES public.teams(id),
  score VARCHAR(10) NOT NULL, -- "2:0" / "2:1" etc.
  user_ip VARCHAR(100),
  device_fingerprint VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.match_predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to predictions" ON public.match_predictions FOR SELECT USING (true);
CREATE POLICY "Allow anonymous predictions insertion" ON public.match_predictions FOR INSERT WITH CHECK (true);

--------------------------------------------------------------------------------
SUPPORT RATE DYNAMIC UPDATES (TRIGGER FUNCTION)
--------------------------------------------------------------------------------
-- Dynamic trigger to recalculate team support rates whenever a champion vote is cast:
CREATE OR REPLACE FUNCTION update_team_champion_support() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.teams
  SET support_rate = (
    SELECT ROUND((COUNT(*)::NUMERIC / (SELECT COUNT(*)::NUMERIC FROM public.champion_votes) * 100), 1)
    FROM public.champion_votes
    WHERE team_id = teams.id
  )
  WHERE EXISTS (SELECT 1 FROM public.champion_votes);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_champion_vote_cast
AFTER INSERT ON public.champion_votes
FOR EACH ROW
EXECUTE FUNCTION update_team_champion_support();
*/
