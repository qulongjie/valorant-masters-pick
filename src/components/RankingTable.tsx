import React, { useState, useEffect } from 'react';
import type { Team } from '../data/teams';
import { TEAM_LOGO_URLS } from './TeamLogos';
import { ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface RankingTableProps {
  teams: Team[];
}

type RegionFilter = 'ALL' | 'CN' | 'Pacific' | 'EMEA' | 'Americas';

export const RankingTable: React.FC<RankingTableProps> = ({ teams }) => {
  const [activeFilter, setActiveFilter] = useState<RegionFilter>('ALL');
  const [simulatedTeams, setSimulatedTeams] = useState<Team[]>(teams);

  const filteredTeams = simulatedTeams
    .filter((team) => {
      if (activeFilter === 'ALL') return true;
      return team.region === activeFilter;
    })
    .sort((a, b) => b.rankingSupportRate - a.rankingSupportRate);

  // Live simulation - starts from 0 and slowly builds up
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTeams((prevTeams) => {
        return prevTeams.map((team) => {
          // Small chance each team changes slightly on tick
          if (Math.random() > 0.85) {
            const isIncrease = Math.random() > 0.4;
            const changeAmount = Number((Math.random() * 0.1).toFixed(2));
            const newSupportRate = isIncrease 
              ? Number((team.rankingSupportRate + changeAmount).toFixed(1))
              : Number(Math.max(0, team.rankingSupportRate - changeAmount).toFixed(1));
            
            const newChangeRate = isIncrease
              ? Number((team.changeRate + changeAmount).toFixed(2))
              : Number((team.changeRate - changeAmount).toFixed(2));

            return {
              ...team,
              rankingSupportRate: newSupportRate,
              changeRate: Number(newChangeRate.toFixed(1))
            };
          }
          return team;
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#FFD700] to-[#B8860B] flex items-center justify-center text-[10px] font-black text-[#05070A] shadow-[0_0_8px_rgba(255,215,0,0.5)]">
            1
          </div>
        );
      case 1:
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#C0C0C0] to-[#708090] flex items-center justify-center text-[10px] font-black text-[#05070A] shadow-[0_0_8px_rgba(192,192,192,0.3)]">
            2
          </div>
        );
      case 2:
        return (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#8B4513] flex items-center justify-center text-[10px] font-black text-[#05070A] shadow-[0_0_8px_rgba(205,127,50,0.3)]">
            3
          </div>
        );
      default:
        return (
          <span className="text-xs font-bold text-grey-secondary/80 w-5 text-center">
            {index + 1}
          </span>
        );
    }
  };

  const filters: { id: RegionFilter; label: string }[] = [
    { id: 'ALL', label: '总榜' },
    { id: 'CN', label: 'CN赛区' },
    { id: 'Pacific', label: 'PAC' },
    { id: 'EMEA', label: 'EMEA' },
    { id: 'Americas', label: 'Americas' },
  ];

  return (
    <div className="w-full flex flex-col select-none">
      
      {/* Filter Capsules */}
      <div className="flex gap-1.5 overflow-x-auto pb-3.5 scrollbar-none scroll-smooth">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
              activeFilter === f.id
                ? 'bg-valorant border-valorant text-white shadow-red-glow'
                : 'bg-[#0F1218]/45 border-white/5 text-grey-secondary hover:text-white hover:border-white/10'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-glass">
        
        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-3 bg-white/[0.02] border-b border-white/5 text-[9px] font-black tracking-widest text-grey-secondary uppercase">
          <div className="col-span-2 text-left">排名</div>
          <div className="col-span-5 text-left">队伍</div>
          <div className="col-span-3 text-right">支持率</div>
          <div className="col-span-2 text-right">今日变化</div>
        </div>

        {/* Body */}
        <div className="divide-y divide-white/5 max-h-[440px] overflow-y-auto">
          {filteredTeams.map((team) => {
            const globalRankIndex = simulatedTeams
              .sort((a, b) => b.rankingSupportRate - a.rankingSupportRate)
              .findIndex((t) => t.id === team.id);

            const isUp = team.changeRate > 0;
            const isDown = team.changeRate < 0;
            const absoluteChange = Math.abs(team.changeRate).toFixed(1);
            const logoUrl = TEAM_LOGO_URLS[team.id];

            return (
              <div 
                key={team.id} 
                className="grid grid-cols-12 px-4 py-3.5 items-center hover:bg-white/[0.02] transition-colors duration-200"
              >
                <div className="col-span-2 flex justify-start items-center">
                  {getRankBadge(globalRankIndex)}
                </div>

                <div className="col-span-5 flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${team.color} p-[1px] flex items-center justify-center flex-shrink-0 shadow overflow-hidden`}>
                    <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
                      {logoUrl ? (
                        <img src={logoUrl} alt={team.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <span className="text-[7.5px] font-black text-white">{team.logoText}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-white tracking-wide uppercase">
                      {team.name}
                    </span>
                    <span className="text-[7.5px] text-grey-secondary font-bold tracking-widest uppercase leading-none mt-0.5">
                      {team.region}
                    </span>
                  </div>
                </div>

                <div className="col-span-3 text-right">
                  <div className="text-xs font-extrabold text-white tracking-tighter">
                    {team.rankingSupportRate.toFixed(1)}%
                  </div>
                  <div className="w-full h-[3px] bg-white/5 rounded-full mt-1 ml-auto overflow-hidden max-w-[60px]">
                    <div 
                      className="h-full rounded-full bg-valorant shadow-red-glow"
                      style={{ width: `${Math.max(team.rankingSupportRate * 2.5, 0)}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-2 flex justify-end items-center gap-0.5 text-right">
                  {isUp && (
                    <>
                      <ArrowUp className="w-3 h-3 text-valorant" strokeWidth={3} />
                      <span className="text-[10px] font-extrabold text-valorant tracking-tight">
                        {absoluteChange}%
                      </span>
                    </>
                  )}
                  {isDown && (
                    <>
                      <ArrowDown className="w-3 h-3 text-grey-secondary/60" strokeWidth={3} />
                      <span className="text-[10px] font-bold text-grey-secondary/70 tracking-tight">
                        {absoluteChange}%
                      </span>
                    </>
                  )}
                  {!isUp && !isDown && (
                    <span className="text-[9px] font-semibold text-grey-secondary/50 pr-1.5">
                      0%
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredTeams.length === 0 && (
            <div className="py-8 text-center text-xs text-grey-secondary font-medium">
              无该赛区参赛队伍数据
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-white/[0.01] border-t border-white/5 flex items-center justify-center gap-1.5">
          <Activity className="w-3 h-3 text-valorant animate-pulse" />
          <span className="text-[8px] text-grey-secondary/60 font-semibold uppercase tracking-wider">
            数据从0开始，每分钟模拟更新
          </span>
        </div>
      </div>
    </div>
  );
};
