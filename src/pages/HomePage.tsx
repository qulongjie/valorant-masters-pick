import React from 'react';
import { TEAMS } from '../data/teams';
import { TeamCard } from '../components/TeamCard';
import { Disclaimer } from '../components/Disclaimer';
import { Calendar, MapPin, Trophy, Megaphone } from 'lucide-react';

interface HomePageProps {
  championTeamId: string | null;
  supportRates: Record<string, number>;
  onVoteChampion: (teamId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  championTeamId,
  supportRates,
  onVoteChampion,
}) => {
  return (
    <div className="w-full flex flex-col select-none animate-fade-in">

      {/* ══ 1. HERO BANNER ══════════════════════════════════════ */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: '16/7' }}>

        {/* Background photo */}
        <img
          src="/hero_banner.png"
          alt="Valorant Masters London 2026"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B45]/15 via-transparent to-transparent" />

        {/* Badge row */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full px-2.5 py-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 2 L8 8 L2 14 M14 2 L8 8 L14 14" stroke="#FF3B45" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[9px] font-black text-white uppercase tracking-widest leading-none">
              VALORANT
            </span>
          </div>
        </div>

        {/* Activity rules button */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1">
            <span className="text-[9px] font-bold text-white/80">? 活动规则</span>
          </div>
        </div>

        {/* Bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <div className="flex items-center gap-1.5 bg-[#FF3B45]/20 border border-[#FF3B45]/40 rounded-full px-3 py-1 w-fit mb-1.5">
            <Trophy className="w-3 h-3 text-[#FF3B45]" />
            <span className="text-[10px] font-black text-[#FF3B45] uppercase tracking-widest">
              伦敦大师赛 全民PICK榜
            </span>
            <Trophy className="w-3 h-3 text-[#FF3B45]" />
          </div>

          <h1 className="text-[28px] font-black text-white italic tracking-tight leading-none drop-shadow-lg">
            谁能问鼎伦敦？
          </h1>

          <p className="text-[11px] text-white/70 font-semibold mt-1">
            选择你<span className="text-[#FF3B45] font-black">支持的队伍</span>，参与民间娱乐预测
          </p>

          <div className="flex flex-col gap-0.5 mt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-white/60 flex-shrink-0" />
              <span className="text-[10px] text-white/60 font-semibold">
                投票时间：2026.06.06 - 06.21
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-white/60 flex-shrink-0" />
              <span className="text-[10px] text-white/60 font-semibold">
                比赛地点：英国 · 伦敦 Copper Box Arena
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 2. STAGE INFO ══════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-[#0A0D12] border border-[#FF3B45]/20 rounded-xl p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF3B45] animate-pulse" />
            <span className="text-[9px] font-black text-[#FF3B45] uppercase tracking-widest">瑞士轮</span>
          </div>
          <p className="text-[11px] font-black text-white">6月6日 — 6月10日</p>
          <p className="text-[9px] text-white/40 font-medium">8队非种子 · BO3 · 前4晋级</p>
        </div>
        <div className="bg-[#0A0D12] border border-white/[0.07] rounded-xl p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3 h-3 text-[#F0B700]" />
            <span className="text-[9px] font-black text-[#F0B700] uppercase tracking-widest">季后赛</span>
          </div>
          <p className="text-[11px] font-black text-white">6月13日 — 6月21日</p>
          <p className="text-[9px] text-white/40 font-medium">4种子+4晋级 · 双败淘汰 · BO5</p>
        </div>
      </div>

      {/* ══ 3. CHAMPION VOTE ═══════════════════════════════════ */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-[3px] h-4 bg-[#FF3B45] rounded-full" />
          <div>
            <h2 className="text-[13px] font-black text-white uppercase tracking-wide leading-none">
              冠军预测投票
            </h2>
            <p className="text-[9px] text-white/40 font-medium mt-0.5">
              选择你认为夺冠的战队，限投一次
            </p>
          </div>
        </div>
      </div>

      {/* ══ 4. TEAM GRID ══════════════════════════════════════ */}
      <div className="grid grid-cols-4 gap-2">
        {TEAMS.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isSelected={championTeamId === team.id}
            onVote={onVoteChampion}
            hasVotedAny={championTeamId !== null}
            dynamicSupportRate={supportRates[team.id]}
          />
        ))}
      </div>

      {/* ══ 5. BOTTOM INFO ═════════════════════════════════════ */}
      <div className="flex items-center gap-2 mt-5 px-3 py-2 bg-[#0A0D12] border border-white/5 rounded-xl">
        <Megaphone className="w-3.5 h-3.5 text-[#FF3B45] flex-shrink-0" />
        <p className="text-[9px] text-white/50 font-semibold leading-snug">
          每人每日可参与娱乐预测，数据实时模拟更新。本活动不涉及任何金钱投注，纯属民间电竞娱乐。
        </p>
      </div>

      {/* ══ 6. DISCLAIMER ═════════════════════════════════════ */}
      <Disclaimer />
    </div>
  );
};
