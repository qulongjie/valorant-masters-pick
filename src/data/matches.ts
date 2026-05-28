export interface Match {
  id: string;
  date: string; // e.g., "6月6日"
  time: string; // e.g., "16:00"
  stage: string; // e.g., "瑞士轮 第一轮"
  format: "BO3" | "BO5";
  teamAId: string;
  teamBId: string;
  status: "upcoming" | "live" | "finished";
}

// ═══════════════════════════════════════════════════════════
// 赛制说明：
// 瑞士轮：8支非种子队参加，BO3，前4名晋级季后赛
// 季后赛：4种子 + 4瑞士轮晋级 = 8队，双败淘汰，总决赛BO5
// ═══════════════════════════════════════════════════════════

export const MATCHES: Match[] = [
  // ── 瑞士轮 第一轮 (已确认) ──────────────────────────────
  {
    id: "m_6_1",
    date: "6月6日",
    time: "23:00",
    stage: "瑞士轮 第一轮",
    format: "BO3",
    teamAId: "XLG",
    teamBId: "NRG",
    status: "upcoming"
  },
  {
    id: "m_7_1",
    date: "6月7日",
    time: "02:00",
    stage: "瑞士轮 第一轮",
    format: "BO3",
    teamAId: "VIT",
    teamBId: "DRG",
    status: "upcoming"
  },
  {
    id: "m_7_2",
    date: "6月7日",
    time: "23:00",
    stage: "瑞士轮 第一轮",
    format: "BO3",
    teamAId: "FS",
    teamBId: "FUT",
    status: "upcoming"
  },
  {
    id: "m_8_1",
    date: "6月8日",
    time: "02:00",
    stage: "瑞士轮 第一轮",
    format: "BO3",
    teamAId: "LEV",
    teamBId: "GE",
    status: "upcoming"
  }
];
