import React, { useState, useMemo } from 'react';
import { MATCHES } from '../data/matches';
import { TEAMS } from '../data/teams';
import type { Prediction } from '../lib/storage';
import { MatchPredictionCard } from '../components/MatchPredictionCard';
import { Disclaimer } from '../components/Disclaimer';
import { Info } from 'lucide-react';

interface PredictPageProps {
  predictions: Record<string, Prediction>;
  onSubmitPrediction: (matchId: string, winnerId: string, score: "2:0" | "2:1" | "3:0" | "3:1" | "3:2") => void;
  onViewResult: (matchId: string) => void;
}

export const PredictPage: React.FC<PredictPageProps> = ({
  predictions,
  onSubmitPrediction,
  onViewResult
}) => {
  // Dynamically extract all unique dates from matches
  const allDates = useMemo(() => {
    const dateSet = new Set(MATCHES.map(m => m.date));
    return Array.from(dateSet);
  }, []);

  const [selectedDate, setSelectedDate] = useState(allDates[0] || '6月6日');

  // Filter matches for the selected date
  const dailyMatches = MATCHES.filter((m) => m.date === selectedDate);

  const getTeamById = (id: string) => {
    return TEAMS.find((t) => t.id === id) || TEAMS[0];
  };

  return (
    <div className="w-full flex flex-col select-none animate-fade-in">
      
      {/* 1. Header */}
      <div className="flex flex-col text-left mb-5 mt-2">
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tight">
          今日比赛预测
        </h1>
        <p className="text-[10px] text-grey-secondary font-bold tracking-wide mt-1">
          瑞士轮 BO3 对阵已确认，后续轮次将根据战绩重新分组
        </p>
      </div>

      {/* 2. Date Selector */}
      <div className="grid gap-2.5 mb-5 bg-[#0F1218]/45 border border-white/5 p-1 rounded-xl"
        style={{ gridTemplateColumns: `repeat(${allDates.length}, 1fr)` }}
      >
        {allDates.map((d) => {
          const isActive = selectedDate === d;
          const matchCount = MATCHES.filter(m => m.date === d).length;
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`py-2 rounded-lg text-[10px] sm:text-xs font-black transition-all duration-300 transform select-none cursor-pointer focus:outline-none flex flex-col items-center gap-0.5 ${
                isActive
                  ? 'bg-valorant text-white shadow-red-glow scale-[1.02]'
                  : 'bg-transparent text-grey-secondary hover:text-white'
              }`}
            >
              <span>{d}</span>
              <span className={`text-[7px] font-bold ${isActive ? 'text-white/70' : 'text-grey-secondary/50'}`}>
                {matchCount}场
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Match Prediction Cards */}
      <div className="flex flex-col gap-4">
        {dailyMatches.length > 0 ? (
          dailyMatches.map((match) => {
            const teamA = getTeamById(match.teamAId);
            const teamB = getTeamById(match.teamBId);
            const existingPrediction = predictions[match.id];

            return (
              <MatchPredictionCard
                key={match.id}
                match={match}
                teamA={teamA}
                teamB={teamB}
                existingPrediction={existingPrediction}
                onSubmitPrediction={onSubmitPrediction}
                onViewResult={onViewResult}
              />
            );
          })
        ) : (
          <div className="py-10 text-center">
            <p className="text-xs text-grey-secondary font-bold">
              当日暂无比赛安排
            </p>
            <p className="text-[9px] text-grey-secondary/50 mt-1">
              请切换其他日期查看赛程
            </p>
          </div>
        )}
      </div>

      {/* 4. Info Strip */}
      <div className="mt-5 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-2 select-none">
        <Info className="w-3.5 h-3.5 text-valorant flex-shrink-0" />
        <span className="text-[9px] text-grey-secondary font-semibold leading-snug text-left">
          每场比赛只能预测一次，提交预测后即可实时查看大众比分及胜率支持率统计数据。
        </span>
      </div>

      {/* 5. Disclaimer */}
      <Disclaimer />
    </div>
  );
};
