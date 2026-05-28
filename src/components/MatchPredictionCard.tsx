import React, { useState } from 'react';
import type { Match } from '../data/matches';
import type { Team } from '../data/teams';
import type { Prediction } from '../lib/storage';
import { TEAM_LOGO_URLS } from './TeamLogos';

interface MatchPredictionCardProps {
  match: Match;
  teamA: Team;
  teamB: Team;
  existingPrediction?: Prediction;
  onSubmitPrediction: (matchId: string, winnerId: string, score: "2:0" | "2:1" | "3:0" | "3:1" | "3:2") => void;
  onViewResult: (matchId: string) => void;
}

export const MatchPredictionCard: React.FC<MatchPredictionCardProps> = ({
  match,
  teamA,
  teamB,
  existingPrediction,
  onSubmitPrediction,
  onViewResult
}) => {
  const [selectedWinnerId, setSelectedWinnerId] = useState<string | null>(
    existingPrediction ? existingPrediction.winnerTeamId : null
  );
  const [selectedScore, setSelectedScore] = useState<string | null>(
    existingPrediction ? existingPrediction.score : null
  );

  const isBO5 = match.format === 'BO5';
  const scoreOptions = isBO5 ? ["3:0", "3:1", "3:2"] : ["2:0", "2:1"];

  const handleSelectWinner = (teamId: string) => {
    if (existingPrediction) return;
    setSelectedWinnerId(teamId);
    setSelectedScore(null);
  };

  const handleSelectScore = (score: string) => {
    if (existingPrediction) return;
    setSelectedScore(score);
  };

  const isFormComplete = selectedWinnerId !== null && selectedScore !== null;

  const handleSubmit = () => {
    if (!isFormComplete || existingPrediction) return;
    onSubmitPrediction(
      match.id,
      selectedWinnerId!,
      selectedScore as "2:0" | "2:1" | "3:0" | "3:1" | "3:2"
    );
  };

  const logoA = TEAM_LOGO_URLS[teamA.id];
  const logoB = TEAM_LOGO_URLS[teamB.id];

  return (
    <div className={`glass-panel rounded-2xl p-4 border transition-all duration-300 relative overflow-hidden flex flex-col ${
      existingPrediction 
        ? 'border-white/5 opacity-90' 
        : isFormComplete 
          ? 'border-valorant/30 shadow-red-glow' 
          : 'border-white/10 hover:border-white/15'
    }`}>
      
      {/* Top Match Info Badge */}
      <div className="flex justify-between items-center pb-3 border-b border-white/5 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-valorant rounded-full animate-ping" />
          <span className="text-[10px] text-grey-secondary font-black tracking-wider uppercase">
            {match.stage} ({match.format})
          </span>
        </div>
        <span className="text-[10px] bg-white/5 text-grey-secondary px-2 py-0.5 rounded-full font-bold">
          {match.time}
        </span>
      </div>

      {/* Versus Grid Panel */}
      <div className="grid grid-cols-7 items-center justify-center my-4 select-none">
        {/* Team A */}
        <div className="col-span-3 flex flex-col items-center">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${teamA.color} p-[1.5px] flex items-center justify-center overflow-hidden`}>
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
              {logoA ? (
                <img src={logoA} alt={teamA.name} className="w-9 h-9 object-contain" />
              ) : (
                <span className="text-[11px] font-black text-white">{teamA.logoText}</span>
              )}
            </div>
          </div>
          <span className="text-xs font-black text-white mt-1.5 uppercase tracking-wide truncate max-w-[65px]">
            {teamA.name}
          </span>
          <span className="text-[8px] text-grey-secondary font-bold tracking-widest uppercase mt-0.5">
            {teamA.region}
          </span>
        </div>

        {/* VS Divider */}
        <div className="col-span-1 flex flex-col items-center justify-center relative">
          <span className="text-sm font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-valorant to-[#FF8086]">
            VS
          </span>
          {existingPrediction && (
            <span className="absolute -bottom-3 text-[8px] text-status-success bg-status-success/10 border border-status-success/20 px-1 rounded font-bold uppercase whitespace-nowrap">
              已预测
            </span>
          )}
        </div>

        {/* Team B */}
        <div className="col-span-3 flex flex-col items-center">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${teamB.color} p-[1.5px] flex items-center justify-center overflow-hidden`}>
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center overflow-hidden">
              {logoB ? (
                <img src={logoB} alt={teamB.name} className="w-9 h-9 object-contain" />
              ) : (
                <span className="text-[11px] font-black text-white">{teamB.logoText}</span>
              )}
            </div>
          </div>
          <span className="text-xs font-black text-white mt-1.5 uppercase tracking-wide truncate max-w-[65px]">
            {teamB.name}
          </span>
          <span className="text-[8px] text-grey-secondary font-bold tracking-widest uppercase mt-0.5">
            {teamB.region}
          </span>
        </div>
      </div>

      {/* Interactive Selection Flow */}
      {existingPrediction ? (
        <div className="mt-2 bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center select-none animate-fade-in">
          <div className="text-[10px] text-grey-secondary font-semibold uppercase tracking-wider">
            你的预测结果
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-black text-white">
              {existingPrediction.winnerTeamId === teamA.id ? teamA.name : teamB.name}
            </span>
            <span className="text-lg font-black text-valorant">
              {existingPrediction.score}
            </span>
            <span className="text-[10px] font-bold text-grey-secondary">
              获胜
            </span>
          </div>
          <button
            onClick={() => onViewResult(match.id)}
            className="w-full mt-3 py-1.5 rounded-lg text-[10px] font-black text-white border border-white/10 hover:border-white/20 bg-transparent transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
          >
            查看大众支持率与比分 &gt;
          </button>
        </div>
      ) : (
        <div className="mt-2 flex flex-col gap-3 select-none">
          {/* Winner Selector */}
          <div>
            <div className="text-[9px] text-grey-secondary font-bold uppercase tracking-widest mb-1.5 text-center">
              1. 谁会赢？
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleSelectWinner(teamA.id)}
                className={`py-2 rounded-lg text-xs font-black uppercase transition-all duration-300 slanted-cut-br border ${
                  selectedWinnerId === teamA.id
                    ? 'bg-gradient-to-r from-valorant/20 to-valorant border-valorant text-white shadow-red-glow'
                    : 'bg-transparent border-white/10 hover:border-white/20 text-grey-secondary hover:text-white'
                }`}
              >
                {teamA.name} 胜
              </button>
              <button
                onClick={() => handleSelectWinner(teamB.id)}
                className={`py-2 rounded-lg text-xs font-black uppercase transition-all duration-300 slanted-cut-br border ${
                  selectedWinnerId === teamB.id
                    ? 'bg-gradient-to-l from-valorant/20 to-valorant border-valorant text-white shadow-red-glow'
                    : 'bg-transparent border-white/10 hover:border-white/20 text-grey-secondary hover:text-white'
                }`}
              >
                {teamB.name} 胜
              </button>
            </div>
          </div>

          {/* Score Selector */}
          <div className={`transition-all duration-300 ${selectedWinnerId ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden pointer-events-none'}`}>
            <div className="text-[9px] text-grey-secondary font-bold uppercase tracking-widest mb-1.5 text-center">
              2. 预测比分是多少？
            </div>
            <div className="flex justify-center gap-3">
              {scoreOptions.map((score) => {
                const isSelected = selectedScore === score;
                return (
                  <button
                    key={score}
                    onClick={() => handleSelectScore(score)}
                    className={`px-5 py-1.5 rounded-lg text-xs font-black transition-all duration-300 border ${
                      isSelected
                        ? 'bg-valorant border-valorant text-white shadow-red-glow'
                        : 'bg-transparent border-white/10 hover:border-white/20 text-grey-secondary hover:text-white'
                    }`}
                  >
                    {score}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Prediction */}
          <button
            disabled={!isFormComplete}
            onClick={handleSubmit}
            className={`w-full mt-2 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 slanted-cut-br ${
              isFormComplete
                ? 'bg-gradient-to-r from-valorant-dark to-valorant text-white hover:brightness-110 shadow-red-glow cursor-pointer active:scale-95'
                : 'bg-white/5 border border-white/5 text-grey-secondary/35 cursor-not-allowed'
            }`}
          >
            提交预测
          </button>
        </div>
      )}
    </div>
  );
};
