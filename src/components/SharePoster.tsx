import React, { useRef, useState } from 'react';
import type { Team } from '../data/teams';
import type { Match } from '../data/matches';
import type { Prediction } from '../lib/storage';
import { TEAM_LOGO_URLS } from './TeamLogos';
import { Download, Link, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';

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
  const [isSaving, setIsSaving] = useState(false);

  const handleCopyLink = () => {
    const dummyUrl = window.location.origin + "/?ref=masters_pick_9527";
    navigator.clipboard.writeText(dummyUrl).then(() => {
      onShowToast("分享链接复制成功，快发给好友吧！", "success");
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }).catch(() => {
      onShowToast("链接复制失败，请重试", "info");
    });
  };

  const handleDownloadPoster = async () => {
    if (!posterRef.current || isSaving) return;
    setIsSaving(true);
    onShowToast("正在生成高清海报，请稍候...", "info");

    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#05070A',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `valorant_masters_pick_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      onShowToast("🎉 海报生成成功！已保存至相册", "success");
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });
    } catch {
      onShowToast("海报生成失败，请截图保存", "info");
    } finally {
      setIsSaving(false);
    }
  };

  const displayTeam = favoriteTeam || {
    id: "EDG", name: "EDG", fullName: "EDward Gaming",
    color: "from-[#FF1E27] to-[#B80007]", logoText: "EDG",
    region: "CN" as const, isDirectSeed: true,
    supportRate: 0, rankingSupportRate: 0, changeRate: 0,
    bgAccent: "rgba(255,30,39,0.25)", brandColor: "#FF1E27"
  };

  const hasPredict = selectedMatch && matchPrediction && teamA && teamB;
  const favoriteLogo = TEAM_LOGO_URLS[displayTeam.id] || TEAM_LOGO_URLS["EDG"];
  const teamALogo = teamA ? TEAM_LOGO_URLS[teamA.id] : undefined;
  const teamBLogo = teamB ? TEAM_LOGO_URLS[teamB.id] : undefined;

  return (
    <div className="w-full flex flex-col items-center select-none page-enter">
      {/* Poster Card — 红色发光边框 */}
      <div 
        ref={posterRef}
        className="w-full max-w-[340px] aspect-[9/16] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
        style={{
          background: 'linear-gradient(180deg, #0A0D14 0%, #05070A 40%, #0A0510 100%)',
          boxShadow: '0 0 0 1px rgba(255,59,69,0.3), 0 0 30px rgba(255,59,69,0.15), 0 20px 50px rgba(0,0,0,0.6)',
        }}
      >
        {/* 顶部红色光晕 */}
        <div className="absolute top-[-15%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-valorant/12 to-transparent pointer-events-none z-0 blur-3xl" />
        
        {/* 城市天际线剪影 */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-0 opacity-[0.04]"
             style={{
               background: 'linear-gradient(to top, rgba(255,255,255,0.08) 0%, transparent 100%)',
               clipPath: 'polygon(0% 100%, 3% 70%, 5% 72%, 8% 55%, 10% 58%, 12% 45%, 14% 48%, 16% 35%, 18% 38%, 20% 30%, 22% 33%, 25% 25%, 27% 28%, 30% 40%, 32% 42%, 35% 50%, 37% 48%, 40% 55%, 42% 52%, 45% 60%, 48% 45%, 50% 42%, 52% 48%, 55% 35%, 57% 38%, 60% 30%, 62% 33%, 65% 25%, 67% 28%, 70% 35%, 72% 38%, 75% 45%, 77% 42%, 80% 50%, 82% 48%, 85% 55%, 87% 52%, 90% 60%, 92% 55%, 95% 65%, 97% 62%, 100% 70%, 100% 100%)'
             }}
        />

        {/* Header */}
        <div className="flex flex-col items-center border-b border-white/10 pb-3 relative z-10">
          <div className="text-[10px] font-black tracking-[0.25em] text-valorant uppercase">VALORANT MASTERS</div>
          <div className="text-[14px] font-black tracking-[0.35em] text-white uppercase mt-0.5 font-mono">LONDON 2026</div>
        </div>

        {/* Central — 120x120 Logo */}
        <div className="flex flex-col items-center my-auto py-2 relative z-10">
          {/* 装饰线 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-valorant/25 to-transparent rotate-[-30deg] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-valorant/15 to-transparent rotate-[30deg] pointer-events-none" />

          <div className="text-[8px] font-black text-grey-secondary tracking-[0.3em] uppercase mb-3">我的冠军预测</div>

          <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${displayTeam.color} p-[3px] flex items-center justify-center shadow-lg shadow-black/80 relative`}>
            <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center overflow-hidden">
              {favoriteLogo ? (
                <img src={favoriteLogo} alt={displayTeam.name} className="w-24 h-24 object-contain" />
              ) : (
                <span className="text-[28px] font-black text-white">{displayTeam.logoText}</span>
              )}
            </div>
          </div>

          <div className="mt-3 text-xl font-black text-white tracking-wider uppercase">{displayTeam.name}</div>
          <div className="text-[9px] text-grey-secondary font-bold tracking-widest uppercase mt-0.5">{displayTeam.fullName}</div>
        </div>

        {/* Prediction Card — 卡片式布局 */}
        <div className="relative z-10 mb-2">
          {hasPredict ? (
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5">
              <div className="text-[8px] font-black text-grey-secondary tracking-widest uppercase mb-2 text-center">比赛预测</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {teamALogo && <img src={teamALogo} alt={teamA!.name} className="w-8 h-8 object-contain" />}
                  <span className="text-sm font-black text-white">{teamA?.name}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[18px] font-black text-valorant italic tracking-tight">VS</span>
                  <span className="text-xl font-black text-valorant font-mono mt-0.5">{matchPrediction?.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">{teamB?.name}</span>
                  {teamBLogo && <img src={teamBLogo} alt={teamB!.name} className="w-8 h-8 object-contain" />}
                </div>
              </div>
              <div className="text-[8px] text-grey-secondary/80 mt-2.5 bg-white/[0.02] py-1.5 px-2 rounded leading-normal border-l-2 border-valorant">
                看好：大众 61% 的玩家认为 {matchPrediction?.winnerTeamId === teamA?.id ? teamA?.name : teamB?.name} 将赢得比赛。
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-3">
              <Award className="w-5 h-5 text-grey-secondary/40 mb-1.5 animate-pulse" />
              <p className="text-[9px] text-grey-secondary font-bold tracking-widest uppercase">当前尚未提交今日赛程预测</p>
              <p className="text-[8px] text-grey-secondary/50 font-semibold mt-1">去赛事预测投出你的一票，生成专属战报！</p>
            </div>
          )}
        </div>

        {/* Bottom QR — 红色角标 */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-1 relative z-10">
          <div className="flex flex-col text-left flex-1 mr-4">
            <span className="text-[9px] text-grey-secondary font-bold tracking-widest uppercase mb-1">全民 PICK 娱乐赛</span>
            <span className="text-[11px] font-black text-white tracking-wide">扫码参与赛事预测</span>
            <span className="text-[9px] text-grey-secondary font-medium tracking-wide leading-none mt-0.5">为你的主队加油投票！</span>
          </div>
          <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center relative border border-white/15 shadow">
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-valorant rounded-tl-sm" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-valorant rounded-tr-sm" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-valorant rounded-bl-sm" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-valorant rounded-br-sm" />
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

        <p className="text-[7px] text-grey-secondary/30 mt-2 tracking-wide text-center relative z-10">
          * 本活动为民间娱乐应援，不含任何博彩或商业金钱投注
        </p>
      </div>

      {/* Action buttons */}
      <div className="w-full max-w-[340px] grid grid-cols-2 gap-3 mt-5">
        <button
          onClick={handleDownloadPoster}
          disabled={isSaving}
          className="shimmer-btn py-2.5 rounded-lg text-xs font-black uppercase bg-gradient-to-r from-valorant-dark to-valorant text-white hover:brightness-110 shadow-red-glow cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 slanted-cut-br disabled:opacity-60"
        >
          <Download className="w-3.5 h-3.5" />
          {isSaving ? '生成中...' : '保存海报'}
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
