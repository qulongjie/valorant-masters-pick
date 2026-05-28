import React from 'react';
import type { Match } from '../data/matches';
import type { Team } from '../data/teams';
import type { Prediction } from '../lib/storage';
import { Disclaimer } from '../components/Disclaimer';
import { CheckCircle2, Share2, Calendar, ArrowLeft, Activity } from 'lucide-react';

interface ResultPageProps {
  match: Match;
  teamA: Team;
  teamB: Team;
  prediction: Prediction;
  onGenerateShare: (matchId: string) => void;
  onBackToPredict: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  match,
  teamA,
  teamB,
  prediction,
  onGenerateShare,
  onBackToPredict
}) => {
  const isASelected = prediction.winnerTeamId === teamA.id;
  const winnerName = isASelected ? teamA.name : teamB.name;

  const aPercentage = isASelected ? 61 : 39;
  const bPercentage = 100 - aPercentage;

  const scoreStats = isASelected
    ? [
        { label: `${teamA.name} 2:1`, pct: 46.8, highlight: prediction.score === "2:1" },
        { label: `${teamA.name} 2:0`, pct: 26.1, highlight: prediction.score === "2:0" },
        { label: `${teamB.name} 2:1`, pct: 19.3, highlight: false },
        { label: `${teamB.name} 2:0`, pct: 7.8, highlight: false }
      ]
    : [
        { label: `${teamB.name} 2:1`, pct: 44.2, highlight: prediction.score === "2:1" },
        { label: `${teamB.name} 2:0`, pct: 28.5, highlight: prediction.score === "2:0" },
        { label: `${teamA.name} 2:1`, pct: 18.1, highlight: false },
        { label: `${teamA.name} 2:0`, pct: 9.2, highlight: false }
      ];

  return (
    <div className="w-full flex flex-col select-none page-enter text-center">
      
      {/* 1. 成功勾号 — 缩放弹入 */}
      <div className="flex flex-col items-center mt-3 mb-6">
        <div className="w-14 h-14 bg-status-success/15 border border-status-success/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(55,214,122,0.15)] mb-3 animate-bounce-in">
          <CheckCircle2 className="w-8 h-8 text-status-success" />
        </div>
        <h1 className="text-xl font-black text-white tracking-wider uppercase italic animate-slide-up">
          预测已提交！
        </h1>
        <p className="text-[10px] text-grey-secondary font-bold tracking-wide mt-1">
          你的投票已写入防刷本地存储，预测积分已锁定
        </p>
      </div>

      {/* 2. Your Prediction Card */}
      <div className="glass-panel rounded-xl p-4 text-left border-l-2 border-l-valorant mb-5">
        <span className="text-[8px] text-grey-secondary font-bold tracking-widest uppercase mb-1 block">
          你的预测选择
        </span>
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span className="text-sm font-black text-white tracking-wide uppercase">
              {teamA.name} vs {teamB.name}
            </span>
            <span className="text-[9px] text-grey-secondary font-bold flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              比赛时间：{match.date} {match.time}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[9.5px] text-grey-secondary font-extrabold uppercase">{winnerName}</span>
              <span className="text-xl font-black text-valorant italic">{prediction.score}</span>
            </div>
            <span className="text-[8px] text-grey-secondary font-semibold mt-1">获胜</span>
          </div>
        </div>

        {/* 脉冲指示器 */}
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-white/5">
          <div className="relative">
            <Activity className="w-2.5 h-2.5 text-status-success" />
            <div className="absolute inset-0 w-2.5 h-2.5 bg-status-success/40 rounded-full animate-ping" />
          </div>
          <span className="text-[8px] text-grey-secondary/60 font-semibold uppercase tracking-wider">实时更新中</span>
        </div>
      </div>

      {/* 3. Public Opinion — 从中间向两边扩展动画 */}
      <div className="glass-panel rounded-xl p-4 border border-white/5 text-left mb-5">
        <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3">
          大众预测胜率
        </h3>
        <div className="flex justify-between items-center text-xs font-black mb-1.5 uppercase font-mono">
          <span className="text-valorant">{teamA.name} {aPercentage}%</span>
          <span className="text-status-info">{teamB.name} {bPercentage}%</span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden flex">
          <div className="h-full bg-gradient-to-r from-valorant-dark to-valorant shadow-[0_0_8px_#FF3B45] transition-all duration-1000" style={{ width: `${aPercentage}%` }} />
          <div className="h-full bg-gradient-to-l from-[#2563EB] to-status-info shadow-[0_0_8px_#3B82F6] transition-all duration-1000" style={{ width: `${bPercentage}%` }} />
        </div>
        <p className="text-[8px] text-grey-secondary/60 font-semibold mt-2.5 leading-normal">
          * 数据来自全国玩家的娱乐预测实时聚合统计，红色代表 {teamA.name}，蓝色代表 {teamB.name}。
        </p>
      </div>

      {/* 4. Hottest Scores — 延迟滑入 */}
      <div className="glass-panel rounded-xl p-4 border border-white/5 text-left mb-6">
        <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3">
          最热比分预测排行
        </h3>
        <div className="flex flex-col gap-2.5">
          {scoreStats.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col animate-slide-left"
              style={{ animationDelay: `${idx * 100 + 200}ms`, animationFillMode: 'backwards' }}
            >
              <div className="flex justify-between items-center text-[10px] font-extrabold mb-1">
                <span className={`${item.highlight ? 'text-valorant' : 'text-white'}`}>
                  {item.label} {item.highlight && <span className="text-[8px] bg-valorant/15 px-1 py-0.5 rounded font-black text-valorant uppercase ml-1">我的预测</span>}
                </span>
                <span className="text-grey-secondary font-mono">{item.pct}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.highlight ? 'bg-valorant shadow-red-glow' : 'bg-grey-secondary/30'}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Actions — shimmer + secondary outline */}
      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => onGenerateShare(match.id)}
          className="shimmer-btn w-full py-2.5 rounded-lg text-xs font-black uppercase bg-gradient-to-r from-valorant-dark to-valorant text-white hover:brightness-110 shadow-red-glow cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 slanted-cut-br"
        >
          <Share2 className="w-3.5 h-3.5" />
          生成分享卡片
        </button>
        
        <button
          onClick={onBackToPredict}
          className="w-full py-2.5 rounded-lg text-xs font-black uppercase bg-transparent text-grey-secondary border border-white/10 hover:border-white/20 hover:text-white cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          返回今日赛程
        </button>
      </div>

      <Disclaimer />
    </div>
  );
};
