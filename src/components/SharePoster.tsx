import React, { useRef } from 'react';
import type { Team } from '../data/teams';
import type { Match } from '../data/matches';
import type { Prediction } from '../lib/storage';
import { TEAM_LOGO_URLS } from './TeamLogos';
import { Download, Link, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SharePosterProps {
  favoriteTeam: Team | null;
  selectedMatch: Match | null;
  matchPrediction: Prediction | null;
  teamA: Team | null;
  teamB: Team | null;

  onShowToast: (message: string, type?: 'success' | 'info') => void;
}

export const SharePoster: React.FC<SharePosterProps> = ({
  favoriteTeam,
  selectedMatch,
  matchPrediction,
  teamA,
  teamB,
  onShowToast
}) => {
  const posterRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    const dummyUrl = window.location.origin + "/?ref=masters_pick_9527";
    navigator.clipboard.writeText(dummyUrl).then(() => {
      onShowToast("分享链接复制成功，快发给好友吧！", "success");
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });
    }).catch(() => {
      onShowToast("链接复制失败，请重试", "info");
    });
  };

  const handleDownloadPoster = () => {
    onShowToast("正在生成高清海报，请稍候...", "info");
    
    setTimeout(() => {
      onShowToast("🎉 海报生成成功！已保存至相册", "success");
      
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }, 1500);
  };

  const displayTeam = favoriteTeam || {
    id: "EDG",
    name: "EDG",
    fullName: "EDward Gaming",
    color: "from-[#FF1E27] to-[#B80007]",
    logoText: "EDG",
    region: "CN" as const,
    supportRate: 28.6
  };

  const hasPredict = selectedMatch && matchPrediction && teamA && teamB;
  const favoriteLogo = TEAM_LOGO_URLS[displayTeam.id] || TEAM_LOGO_URLS["EDG"];
  const teamALogo = teamA ? TEAM_LOGO_URLS[teamA.id] : undefined;
  const teamBLogo = teamB ? TEAM_LOGO_URLS[teamB.id] : undefined;

  return (
    <div className="w-full flex flex-col items-center select-none animate-slide-up">
      {/* 9:16 Poster Card Wrapper */}
      <div 
        ref={posterRef}
        className="w-full max-w-[340px] aspect-[9/16] bg-[#05070A] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between shadow-2xl"
        style={{
          boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,59,69,0.05)'
        }}
      >
        {/* Glow lights inside poster */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-valorant/10 to-transparent pointer-events-none z-0 blur-2xl" />
        <div className="london-skyline opacity-[0.06] z-0" />
        
        {/* Top Header Grid */}
        <div className="flex flex-col items-center border-b border-white/10 pb-3 relative z-10">
          <div className="text-[10px] font-black tracking-[0.25em] text-valorant uppercase">
            VALORANT MASTERS
          </div>
          <div className="text-[14px] font-black tracking-[0.35em] text-white uppercase mt-0.5 font-mono">
            LONDON 2026
          </div>
        </div>

        {/* Central visual block (Champion focus) */}
        <div className="flex flex-col items-center my-auto py-2 relative z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-valorant/25 to-transparent rotate-[-30deg] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-valorant/15 to-transparent rotate-[30deg] pointer-events-none" />

          {/* Large Team Badge with Official Logo */}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${displayTeam.color} p-[2.5px] flex items-center justify-center shadow-lg shadow-black/80 relative overflow-hidden`}>
            <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center overflow-hidden">
              {favoriteLogo ? (
                <img src={favoriteLogo} alt={displayTeam.name} className="w-16 h-16 object-contain" />
              ) : (
                <span className="text-[20px] font-black text-white font-mono tracking-tighter">
                  {displayTeam.logoText}
                </span>
              )}
            </div>
          </div>

          <div className="text-[10px] text-grey-secondary font-black tracking-widest mt-2 uppercase">
            {displayTeam.region}
          </div>

          <h2 className="text-[28px] font-black text-white tracking-tight mt-1 leading-none font-mono">
            {displayTeam.name}
          </h2>

          <p className="text-[9px] text-valorant font-black tracking-widest uppercase mt-1">
            我支持 · 问鼎伦敦！
          </p>
        </div>

        {/* Match Prediction Section */}
        <div className="border-t border-white/10 pt-4 relative z-10">
          {hasPredict ? (
            <div className="flex flex-col">
              <div className="text-[8px] text-grey-secondary/60 font-bold tracking-widest uppercase mb-2">
                我预测今日比分
              </div>
              
              <div className="flex items-center justify-between bg-white/[0.03] rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2">
                  {teamALogo && <img src={teamALogo} alt={teamA!.name} className="w-6 h-6 object-contain" />}
                  <span className="text-sm font-black text-white">{teamA?.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-valorant italic">
                    {matchPrediction?.score}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">{teamB?.name}</span>
                  {teamBLogo && <img src={teamBLogo} alt={teamB!.name} className="w-6 h-6 object-contain" />}
                </div>
              </div>
              
              <div className="text-[8.5px] text-grey-secondary/80 mt-2 bg-white/[0.02] py-1 px-1.5 rounded leading-normal border-l-2 border-valorant">
                看好：大众 61% 的玩家认为 {matchPrediction?.winnerTeamId === teamA?.id ? teamA?.name : teamB?.name} 将赢得比赛。
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2.5">
              <Award className="w-5 h-5 text-grey-secondary/40 mb-1.5 animate-pulse" />
              <p className="text-[9px] text-grey-secondary font-bold tracking-widest uppercase">
                当前尚未提交今日赛程预测
              </p>
              <p className="text-[8px] text-grey-secondary/50 font-semibold mt-1">
                去赛事预测投出你的一票，生成专属战报！
              </p>
            </div>
          )}
        </div>

        {/* Bottom QR Section */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-3 relative z-10">
          <div className="flex flex-col text-left flex-1 mr-4">
            <span className="text-[9px] text-grey-secondary font-bold tracking-widest uppercase mb-1">
              全民 PICK 娱乐赛
            </span>
            <span className="text-[11px] font-black text-white tracking-wide">
              扫码参与赛事预测
            </span>
            <span className="text-[9px] text-grey-secondary font-medium tracking-wide leading-none mt-0.5">
              为你的主队加油投票！
            </span>
          </div>

          <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center relative border border-white/15 shadow">
            <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-valorant" />
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-valorant" />
            
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              <rect x="0" y="0" width="30" height="30" fill="currentColor"/>
              <rect x="5" y="5" width="20" height="20" fill="white"/>
              <rect x="10" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="70" y="0" width="30" height="30" fill="currentColor"/>
              <rect x="75" y="5" width="20" height="20" fill="white"/>
              <rect x="80" y="10" width="10" height="10" fill="currentColor"/>
              <rect x="0" y="70" width="30" height="30" fill="currentColor"/>
              <rect x="5" y="75" width="20" height="20" fill="white"/>
              <rect x="10" y="80" width="10" height="10" fill="currentColor"/>
              <rect x="40" y="10" width="10" height="30" fill="currentColor"/>
              <rect x="50" y="20" width="15" height="10" fill="currentColor"/>
              <rect x="40" y="50" width="20" height="15" fill="currentColor"/>
              <rect x="75" y="45" width="15" height="15" fill="currentColor"/>
              <rect x="70" y="80" width="20" height="10" fill="currentColor"/>
              <rect x="45" y="85" width="10" height="10" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <p className="text-[7px] text-grey-secondary/30 mt-3 tracking-wide text-center">
          * 本活动为民间娱乐应援，不含任何博彩或商业金钱投注
        </p>
      </div>

      {/* Trigger buttons */}
      <div className="w-full max-w-[340px] grid grid-cols-2 gap-3 mt-5">
        <button
          onClick={handleDownloadPoster}
          className="py-2.5 rounded-lg text-xs font-black uppercase bg-gradient-to-r from-valorant-dark to-valorant text-white hover:brightness-110 shadow-red-glow cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 slanted-cut-br"
        >
          <Download className="w-3.5 h-3.5" />
          保存海报
        </button>
        <button
          onClick={handleCopyLink}
          className="py-2.5 rounded-lg text-xs font-black uppercase bg-transparent text-white border border-white/20 hover:bg-white/5 active:bg-white/10 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 slanted-cut-br"
        >
          <Link className="w-3.5 h-3.5" />
          复制链接
        </button>
      </div>
    </div>
  );
};
