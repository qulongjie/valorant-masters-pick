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
  },

  // ── 瑞士轮 第二轮 ──────────────────────────────────────
  {
    id: "m_8_2",
    date: "6月8日",
    time: "23:00",
    stage: "瑞士轮 第二轮 (胜者组)",
    format: "BO3",
    teamAId: "TBD_W1",
    teamBId: "TBD_W2",
    status: "upcoming"
  },
  {
    id: "m_9_1",
    date: "6月9日",
    time: "02:00",
    stage: "瑞士轮 第二轮 (胜者组)",
    format: "BO3",
    teamAId: "TBD_W3",
    teamBId: "TBD_W4",
    status: "upcoming"
  },
  {
    id: "m_9_2",
    date: "6月9日",
    time: "23:00",
    stage: "瑞士轮 第二轮 (败者组)",
    format: "BO3",
    teamAId: "TBD_L1",
    teamBId: "TBD_L2",
    status: "upcoming"
  },
  {
    id: "m_9_3",
    date: "6月10日",
    time: "02:00",
    stage: "瑞士轮 第二轮 (败者组)",
    format: "BO3",
    teamAId: "TBD_L3",
    teamBId: "TBD_L4",
    status: "upcoming"
  },

  // ── 瑞士轮 第三轮 ──────────────────────────────────────
  {
    id: "m_10_1",
    date: "6月10日",
    time: "23:00",
    stage: "瑞士轮 第三轮 (晋级赛)",
    format: "BO3",
    teamAId: "TBD_2W1",
    teamBId: "TBD_2W2",
    status: "upcoming"
  },
  {
    id: "m_10_2",
    date: "6月11日",
    time: "02:00",
    stage: "瑞士轮 第三轮 (淘汰赛)",
    format: "BO3",
    teamAId: "TBD_2L1",
    teamBId: "TBD_2L2",
    status: "upcoming"
  },

  // ── 季后赛 ─────────────────────────────────────────────
  // 上半区
  {
    id: "po_ub_1",
    date: "6月13日",
    time: "22:00",
    stage: "季后赛 上半区 第一轮",
    format: "BO3",
    teamAId: "EDG",
    teamBId: "TBD_SW1",
    status: "upcoming"
  },
  {
    id: "po_ub_2",
    date: "6月14日",
    time: "01:00",
    stage: "季后赛 上半区 第一轮",
    format: "BO3",
    teamAId: "G2",
    teamBId: "TBD_SW3",
    status: "upcoming"
  },
  {
    id: "po_ub_3",
    date: "6月14日",
    time: "22:00",
    stage: "季后赛 上半区 第一轮",
    format: "BO3",
    teamAId: "PRX",
    teamBId: "TBD_SW2",
    status: "upcoming"
  },
  {
    id: "po_ub_4",
    date: "6月15日",
    time: "01:00",
    stage: "季后赛 上半区 第一轮",
    format: "BO3",
    teamAId: "TH",
    teamBId: "TBD_SW4",
    status: "upcoming"
  },
  {
    id: "po_ub_sf1",
    date: "6月15日",
    time: "22:00",
    stage: "季后赛 上半区 半决赛",
    format: "BO3",
    teamAId: "TBD_PO1",
    teamBId: "TBD_PO2",
    status: "upcoming"
  },
  {
    id: "po_ub_sf2",
    date: "6月16日",
    time: "01:00",
    stage: "季后赛 上半区 半决赛",
    format: "BO3",
    teamAId: "TBD_PO3",
    teamBId: "TBD_PO4",
    status: "upcoming"
  },
  {
    id: "po_ub_final",
    date: "6月17日",
    time: "22:00",
    stage: "季后赛 上半区 决赛",
    format: "BO3",
    teamAId: "TBD_UBS1",
    teamBId: "TBD_UBS2",
    status: "upcoming"
  },

  // 下半区
  {
    id: "po_lb_1",
    date: "6月16日",
    time: "22:00",
    stage: "季后赛 下半区 第一轮",
    format: "BO3",
    teamAId: "TBD_LPO1",
    teamBId: "TBD_LPO2",
    status: "upcoming"
  },
  {
    id: "po_lb_2",
    date: "6月17日",
    time: "01:00",
    stage: "季后赛 下半区 第一轮",
    format: "BO3",
    teamAId: "TBD_LPO3",
    teamBId: "TBD_LPO4",
    status: "upcoming"
  },
  {
    id: "po_lb_sf1",
    date: "6月18日",
    time: "22:00",
    stage: "季后赛 下半区 半决赛",
    format: "BO3",
    teamAId: "TBD_LBW1",
    teamBId: "TBD_LBW2",
    status: "upcoming"
  },
  {
    id: "po_lb_final",
    date: "6月19日",
    time: "22:00",
    stage: "季后赛 下半区 决赛",
    format: "BO3",
    teamAId: "TBD_LBSF",
    teamBId: "TBD_LBF",
    status: "upcoming"
  },

  // 总决赛
  {
    id: "po_grand_final",
    date: "6月21日",
    time: "22:00",
    stage: "总决赛",
    format: "BO5",
    teamAId: "TBD_UBF",
    teamBId: "TBD_LBF",
    status: "upcoming"
  }
];
