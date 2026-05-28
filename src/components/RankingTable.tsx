import React, { useState, useEffect, useRef } from 'react';
import type { Team } from '../data/teams';
import { TEAM_LOGO_URLS } from './TeamLogos';
import { ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface RankingTableProps {
  teams: Team[];
  /** 真实投票支持率，从首页投票同步过来 */
  supportRates?: Record<string, number>;
}

type RegionFilter = 'ALL' | 'CN' | 'Pacific' | 'EMEA' | 'Americas';

export const RankingTable: React.FC<RankingTableProps> = ({ teams, supportRates }) => {
  const [activeFilter, setActiveFilter] = useState<RegionFilter>('ALL');
  const prevRatesRef = useRef<Record<string, number>>({});

  // 用真实投票数据构建排行，模拟波动只做微调
  const [displayTeams, setDisplayTeams] = useState<Team[]>(() =>
    teams.map(t => ({
      ...t,
      rankingSupportRate: supportRates?.[t.id] ?? 0,
    }))
  );

  // 真实数据变化时立即同步（投票后立刻反映）
  useEffect(() => {
    if (!supportRates || Object.keys(supportRates).length === 0) return;
    const changed = JSON.stringify(supportRates) !== JSON.stringify(prevRatesRef.current);
    if (!changed) return;
    prevRatesRef.current = { ...supportRates };

    setDisplayTeams(prev =>
      prev.map(t => ({
        ...t,
        rankingSupportRate: supportRates[t.id] ?? t.rankingSupportRate,
        changeRate: 0,
      }))
    );
  }, [supportRates]);

  // 微波动模拟：每 5 秒在真实值附近 ±0.1% 波动
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayTeams(prev =>
        prev.map(t => {
          const base = supportRates?.[t.id] ?? t.rankingSupportRate;
          if (base === 0) return t;
          const jitter = Number(((Math.random() - 0.5) * 0.2).toFixed(2));
          const newRate = Number(Math.max(0, base + jitter).toFixed(1));
          return {
            ...t,
            rankingSupportRate: newRate,
            changeRate: jitter,
          };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [supportRates]);

  const filteredTeams = displayTeams
    .filter(t => activeFilter === 'ALL' || t.region === activeFilter)
    .sort((a, b) => b.rankingSupportRate - a.rankingSupportRate);

  const getRankBadge = (index: number) => {
    const badges = [
      { bg: 'from-[#FFD700] to-[#B8860B]', shadow: 'rgba(255,215,0,0.5)' },
      { bg: 'from-[#C0C0C0] to-[#708090]', shadow: 'rgba(192,192,192,0.3)' },
      { bg: 'from-[#CD7F32] to-[#8B4513]', shadow: 'rgba(205,127,50,0.3)' },
    ];
    if (index < 3) {
      const b = badges[index];
      return (
        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${b.bg} flex items-center justify-center text-[10px] font-black text-[#05070A]`}
             style={{ boxShadow: `0 0 8px ${b.shadow}` }}>
          {index + 1}
        </div>
      );
    }
    return <span className="text-xs font-bold text-grey-secondary/80 w-5 text-center">{index + 1}</span>;
  };

  const filters: { id: RegionFilter; label: string }[] = [
    { id: 'ALL', label: '总榜' },
    { id: 'CN', label: 'CN' },
    { id: 'Pacific', label: 'PAC' },
    { id: 'EMEA', label: 'EMEA' },
    { id: 'Americas', label: 'AMER' },
  ];

  return (
    <div className="w-full flex flex-col select-none">
      <div className="flex gap-1.5 overflow-x-auto pb-3.5 scrollbar-none">
        {filters.map(f => (
          <button key={f.id} onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
              activeFilter === f.id
                ? 'bg-valorant border-valorant text-white shadow-red-glow'
                : 'bg-[#0F1218]/45 border-white/5 text-grey-secondary hover:text-white hover:border-white/10'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-glass">
        <div className="grid grid-cols-12 px-4 py-3 bg-white/[0.02] border-b border-white/5 text-[9px] font-black tracking-widest text-grey-secondary uppercase">
          <div className="col-span-2 text-left">排名</div>
          <div className="col-span-5 text-left">队伍</div>
          <div className="col-span-3 text-right">支持率</div>
          <div className="col-span-2 text-right">变化</div>
        </div>

        <div className="divide-y divide-white/5 max-h-[440px] overflow-y-auto">
          {filteredTeams.map((team) => {
            const rank = [...displayTeams].sort((a, b) => b.rankingSupportRate - a.rankingSupportRate).findIndex(t => t.id === team.id);
            const logoUrl = TEAM_LOGO_URLS[team.id];
            const isUp = team.changeRate > 0;
            const isDown = team.changeRate < 0;
            const rowClass = rank === 0 ? 'row-gold' : rank === 1 ? 'row-silver' : rank === 2 ? 'row-bronze' : '';

            return (
              <div key={team.id} className={`grid grid-cols-12 px-4 py-3.5 items-center hover:bg-white/[0.03] transition-colors duration-200 ${rowClass}`}>
                <div className="col-span-2 flex justify-start items-center">{getRankBadge(rank)}</div>
                <div className="col-span-5 flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${team.color} p-[1px] flex items-center justify-center flex-shrink-0 shadow overflow-hidden`}>
                    <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
                      {logoUrl ? <img src={logoUrl} alt={team.name} className="w-5 h-5 object-contain" loading="lazy" /> : <span className="text-[7.5px] font-black text-white">{team.logoText}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-white tracking-wide uppercase">{team.name}</span>
                    <span className="text-[7.5px] text-grey-secondary font-bold tracking-widest uppercase leading-none mt-0.5">{team.region}</span>
                  </div>
                </div>
                <div className="col-span-3 text-right">
                  <div className="text-xs font-extrabold text-white tracking-tighter">{team.rankingSupportRate.toFixed(1)}%</div>
                  <div className="w-full h-[4px] bg-white/5 rounded-full mt-1 ml-auto overflow-hidden max-w-[60px]">
                    <div className="h-full rounded-full bg-valorant shadow-red-glow transition-all duration-700"
                         style={{ width: `${Math.max(team.rankingSupportRate * 2.5, 0)}%` }} />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end items-center gap-0.5 text-right">
                  {isUp && <><ArrowUp className="w-3 h-3 text-valorant animate-bounce-arrow" strokeWidth={3} /><span className="text-[10px] font-extrabold text-valorant">{Math.abs(team.changeRate).toFixed(1)}%</span></>}
                  {isDown && <><ArrowDown className="w-3 h-3 text-grey-secondary/60" strokeWidth={3} /><span className="text-[10px] font-bold text-grey-secondary/70">{Math.abs(team.changeRate).toFixed(1)}%</span></>}
                  {!isUp && !isDown && <span className="text-[9px] font-semibold text-grey-secondary/50 pr-1.5">0%</span>}
                </div>
              </div>
            );
          })}
          {filteredTeams.length === 0 && <div className="py-8 text-center text-xs text-grey-secondary font-medium">无该赛区参赛队伍数据</div>}
        </div>

        <div className="px-4 py-2.5 bg-white/[0.01] border-t border-white/5 flex items-center justify-center gap-1.5">
          <div className="relative"><Activity className="w-3 h-3 text-valorant" /><div className="absolute inset-0 w-3 h-3 bg-valorant/40 rounded-full animate-ping" /></div>
          <span className="text-[8px] text-grey-secondary/60 font-semibold uppercase tracking-wider">支持率随投票实时更新</span>
        </div>
      </div>
    </div>
  );
};
