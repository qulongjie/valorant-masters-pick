export interface Team {
  id: string;
  name: string;
  fullName: string;
  region: "CN" | "Pacific" | "Americas" | "EMEA";
  logoText: string;
  /** Is this team a #1 seed (direct to playoffs)? */
  isDirectSeed: boolean;
  supportRate: number;        // Champion vote share %
  rankingSupportRate: number; // Leaderboard heat score %
  changeRate: number;         // Leaderboard trend
  color: string;              // Tailwind gradient classes
  bgAccent: string;           // CSS rgba glow color
  brandColor: string;         // Hex for logo ring
}

// ═══════════════════════════════════════════════════════════
// 12支参赛队伍
// 4种子（直通季后赛）：EDG, PRX, G2, TH
// 8非种子（参加瑞士轮）：DRG, VIT, XLG, NRG, GE, FUT, FS, LEV
// ═══════════════════════════════════════════════════════════

export const TEAMS: Team[] = [
  // ─── 直通季后赛 种子队 ──────────────────────────────────
  {
    id: "EDG",
    name: "EDG",
    fullName: "EDward Gaming",
    region: "CN",
    logoText: "EDG",
    isDirectSeed: true,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#CC0000] to-[#800000]",
    bgAccent: "rgba(204,0,0,0.25)",
    brandColor: "#CC0000"
  },
  {
    id: "PRX",
    name: "PRX",
    fullName: "Paper Rex",
    region: "Pacific",
    logoText: "PRX",
    isDirectSeed: true,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#FF007F] to-[#800040]",
    bgAccent: "rgba(255,0,127,0.25)",
    brandColor: "#FF007F"
  },
  {
    id: "G2",
    name: "G2",
    fullName: "G2 Esports",
    region: "Americas",
    logoText: "G2",
    isDirectSeed: true,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#F0B700] to-[#7A5C00]",
    bgAccent: "rgba(240,183,0,0.25)",
    brandColor: "#F0B700"
  },
  {
    id: "TH",
    name: "TH",
    fullName: "Team Heretics",
    region: "EMEA",
    logoText: "TH",
    isDirectSeed: true,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#2ECC40] to-[#145A1E]",
    bgAccent: "rgba(46,204,64,0.25)",
    brandColor: "#2ECC40"
  },

  // ─── 瑞士轮 非种子队 ────────────────────────────────────
  {
    id: "DRG",
    name: "DRG",
    fullName: "Dragon Ranger Gaming",
    region: "CN",
    logoText: "DRG",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#0066FF] to-[#001166]",
    bgAccent: "rgba(0,102,255,0.25)",
    brandColor: "#0066FF"
  },
  {
    id: "VIT",
    name: "VIT",
    fullName: "Team Vitality",
    region: "EMEA",
    logoText: "VIT",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#F0E000] to-[#806000]",
    bgAccent: "rgba(240,224,0,0.25)",
    brandColor: "#F0E000"
  },
  {
    id: "XLG",
    name: "XLG",
    fullName: "Xi Lai Gaming",
    region: "CN",
    logoText: "XLG",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#00D4CC] to-[#005555]",
    bgAccent: "rgba(0,212,204,0.25)",
    brandColor: "#00D4CC"
  },
  {
    id: "NRG",
    name: "NRG",
    fullName: "NRG Esports",
    region: "Americas",
    logoText: "NRG",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#00AAFF] to-[#004477]",
    bgAccent: "rgba(0,170,255,0.25)",
    brandColor: "#00AAFF"
  },
  {
    id: "GE",
    name: "GE",
    fullName: "Global Esports",
    region: "Pacific",
    logoText: "GE",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#1447E3] to-[#081A66]",
    bgAccent: "rgba(20,71,227,0.25)",
    brandColor: "#1447E3"
  },
  {
    id: "FUT",
    name: "FUT",
    fullName: "FUT Esports",
    region: "EMEA",
    logoText: "FUT",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#FF5500] to-[#661E00]",
    bgAccent: "rgba(255,85,0,0.25)",
    brandColor: "#FF5500"
  },
  {
    id: "FS",
    name: "FS",
    fullName: "FULL SENSE",
    region: "Pacific",
    logoText: "FS",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#EC1C24] to-[#7F0E12]",
    bgAccent: "rgba(236,28,36,0.25)",
    brandColor: "#EC1C24"
  },
  {
    id: "LEV",
    name: "LEV",
    fullName: "Leviatán",
    region: "Americas",
    logoText: "LEV",
    isDirectSeed: false,
    supportRate: 0,
    rankingSupportRate: 0,
    changeRate: 0,
    color: "from-[#00A2E8] to-[#004466]",
    bgAccent: "rgba(0,162,232,0.25)",
    brandColor: "#00A2E8"
  }
];
