import React from 'react';
import { TEAMS } from '../data/teams';
import { RankingTable } from '../components/RankingTable';
import { Disclaimer } from '../components/Disclaimer';
import { Zap } from 'lucide-react';

export const RankingPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col select-none animate-fade-in">
      
      {/* 1. Header block */}
      <div className="flex flex-col text-left mb-5 mt-2">
        <div className="flex items-center gap-1 bg-[#0F1218]/45 border border-white/5 text-grey-secondary px-2.5 py-0.5 rounded-full w-fit mb-2 text-[8px] font-bold uppercase tracking-wider">
          <Zap className="w-3 h-3 text-valorant" />
          <span>数据每分钟同步变化</span>
        </div>
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tight">
          实时支持率排行榜
        </h1>
        <p className="text-[10px] text-grey-secondary font-bold tracking-wide mt-1">
          根据全民 PICK 投票数实时计算的战队人气热度排行
        </p>
      </div>

      {/* 2. Interactive Ranking board */}
      <RankingTable teams={TEAMS} />

      {/* 3. Bottom Legal Disclaimer */}
      <Disclaimer />
    </div>
  );
};
