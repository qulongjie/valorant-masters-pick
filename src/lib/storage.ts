export interface Prediction {
  matchId: string;
  winnerTeamId: string;
  score: "2:0" | "2:1" | "3:0" | "3:1" | "3:2";
  createdAt: string;
}

export interface UserPointHistory {
  id: string;
  date: string; // e.g. "6/6"
  description: string; // e.g. "预测了 XLG vs NRG 胜方"
  points: number; // e.g. 3
}

export interface UserProfile {
  nickname: string;
  points: number;
  hitRate: number;
  dailyRank: number;
  championTeamId: string | null;
  history: UserPointHistory[];
}

const STORAGE_KEYS = {
  CHAMPION_VOTE: "valorant_london_champion_vote",
  MATCH_PREDICTIONS: "valorant_london_match_predictions",
  USER_PROFILE: "valorant_london_user_profile"
};

// 默认用户数据 - 全部从0开始
const DEFAULT_PROFILE: UserProfile = {
  nickname: "瓦友_9527",
  points: 0,
  hitRate: 0,
  dailyRank: 0,
  championTeamId: null,
  history: []
};

export const getChampionVote = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.CHAMPION_VOTE);
};

export const saveChampionVote = (teamId: string): void => {
  localStorage.setItem(STORAGE_KEYS.CHAMPION_VOTE, teamId);
  
  const profile = getUserProfile();
  profile.championTeamId = teamId;
  saveUserProfile(profile);
};

export const getMatchPredictions = (): Record<string, Prediction> => {
  const data = localStorage.getItem(STORAGE_KEYS.MATCH_PREDICTIONS);
  return data ? JSON.parse(data) : {};
};

export const saveMatchPrediction = (prediction: Prediction): void => {
  const predictions = getMatchPredictions();
  predictions[prediction.matchId] = prediction;
  localStorage.setItem(STORAGE_KEYS.MATCH_PREDICTIONS, JSON.stringify(predictions));
};

export const getUserProfile = (): UserProfile => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_PROFILE));
    const champ = getChampionVote();
    if (champ) {
      const p = { ...DEFAULT_PROFILE, championTeamId: champ };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(p));
      return p;
    }
    return DEFAULT_PROFILE;
  }
  
  const profile: UserProfile = JSON.parse(data);
  const champ = getChampionVote();
  if (champ && profile.championTeamId !== champ) {
    profile.championTeamId = champ;
    saveUserProfile(profile);
  }
  return profile;
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
};

export const addPointHistory = (description: string, points: number): void => {
  const profile = getUserProfile();
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
  
  const newLog: UserPointHistory = {
    id: `h_${Date.now()}`,
    date: dateStr,
    description,
    points
  };
  
  profile.points += points;
  profile.history = [newLog, ...profile.history];
  saveUserProfile(profile);
};

// ═══════════════════════════════════════════════════════════
// Champion Vote Support Rates
// 模拟社区投票池：预埋基础票数 + 用户投票实时计入
// ═══════════════════════════════════════════════════════════

const VOTE_POOL_KEY = "valorant_london_vote_pool";

// 预埋基础票数，模拟已有社区投票数据
const SEED_VOTES: Record<string, number> = {};

export const getSupportRates = (): Record<string, number> => {
  const raw = localStorage.getItem(VOTE_POOL_KEY);
  const pool: Record<string, number> = raw ? JSON.parse(raw) : { ...SEED_VOTES };

  const total = Object.values(pool).reduce((s, v) => s + v, 0);
  if (total === 0) return {};

  const rates: Record<string, number> = {};
  for (const [id, count] of Object.entries(pool)) {
    rates[id] = Number(((count / total) * 100).toFixed(1));
  }
  return rates;
};

export const recordChampionVoteToPool = (teamId: string): void => {
  const raw = localStorage.getItem(VOTE_POOL_KEY);
  const pool: Record<string, number> = raw ? JSON.parse(raw) : { ...SEED_VOTES };
  pool[teamId] = (pool[teamId] || 0) + 1;
  localStorage.setItem(VOTE_POOL_KEY, JSON.stringify(pool));
};
