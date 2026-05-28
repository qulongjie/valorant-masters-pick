import React, { useRef, useState, useEffect } from 'react';
import type { Team } from '../data/teams';
import type { Match } from '../data/matches';
import type { Prediction } from '../lib/storage';
import { TEAM_LOGO_URLS } from './TeamLogos';
import { Download, Link, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

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
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Generate QR code
  useEffect(() => {
    const url = window.location.origin + '/?ref=pick';
    QRCode.toDataURL(url, {
      width: 96,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    }).then(setQrDataUrl).catch(console.error);
  }, []);

  const handleCopyLink = () => {
    const url = window.location.origin + '/?ref=pick';
    navigator.clipboard.writeText(url).then(() => {
      onShowToast("链接已复制，快发给好友吧！", "success");
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    }).catch(() => onShowToast("复制失败，请手动复制", "info"));
  };

  const handleDownloadPoster = async () => {
    if (!posterRef.current || isSaving) return;
    setIsSaving(true);
    onShowToast("正在生成海报...", "info");

    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#05070A',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `valorant_pick_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onShowToast("🎉 海报已保存！", "success");
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });
    } catch (err) {
      console.error(err);
      onShowToast("生成失败，请长按截图保存", "info");
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
  const favoriteLogo = TEAM_LOGO_URLS[displayTeam.id];
  const teamALogo = teamA ? TEAM_LOGO_URLS[teamA.id] : undefined;
  const teamBLogo = teamB ? TEAM_LOGO_URLS[teamB.id] : undefined;

  return (
    <div className="w-full flex flex-col items-center select-none page-enter">
      <div 
        ref={posterRef}
        className="w-full max-w-[340px] aspect-[9/16] rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between"
        style={{
          background: 'linear-gradient(180deg, #0A0D14 0%, #05070A 40%, #0A0510 100%)',
          border: '1px solid rgba(255,59,69,0.3)',
          boxShadow: '0 0 30px rgba(255,59,69,0.15), 0 20px 50px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top glow */}
        <div className="absolute top-[-15%] left-[-10%] w-[120%] h-[40%] pointer-events-none z-0"
             style={{ background: 'radial-gradient(ellipse, rgba(255,59,69,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none z-0"
             style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.03) 0%, transparent 100%)' }} />

        {/* Header */}
        <div className="flex flex-col items-center pb-3 relative z-10"
             style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="text-[10px] font-black text-valorant uppercase" style={{ letterSpacing: '0.25em' }}>VALORANT MASTERS</div>
          <div className="text-[14px] font-black text-white uppercase mt-0.5 font-mono" style={{ letterSpacing: '0.35em' }}>LONDON 2026</div>
        </div>

        {/* Central Logo */}
        <div className="flex flex-col items-center my-auto py-2 relative z-10">
          <div className="text-[8px] font-black text-grey-secondary uppercase mb-3" style={{ letterSpacing: '0.3em' }}>我的冠军预测</div>
          <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${displayTeam.color} p-[3px] flex items-center justify-center`}>
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#05070A' }}>
              {favoriteLogo ? (
                <img src={favoriteLogo} alt={displayTeam.name} className="w-24 h-24 object-contain" crossOrigin="anonymous" />
              ) : (
                <span className="text-[28px] font-black text-white">{displayTeam.logoText}</span>
              )}
            </div>
          </div>
          <div className="mt-3 text-xl font-black text-white uppercase" style={{ letterSpacing: '0.15em' }}>{displayTeam.name}</div>
          <div className="text-[9px] text-grey-secondary font-bold uppercase mt-0.5" style={{ letterSpacing: '0.15em' }}>{displayTeam.fullName}</div>
        </div>

        {/* Prediction Card */}
        <div className="relative z-10 mb-2">
          {hasPredict ? (
            <div className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="text-[8px] font-black text-grey-secondary uppercase mb-2 text-center" style={{ letterSpacing: '0.15em' }}>比赛预测</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {teamALogo && <img src={teamALogo} alt={teamA!.name} className="w-8 h-8 object-contain" crossOrigin="anonymous" />}
                  <span className="text-sm font-black text-white">{teamA?.name}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[18px] font-black text-valorant italic">VS</span>
                  <span className="text-xl font-black text-valorant font-mono mt-0.5">{matchPrediction?.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">{teamB?.name}</span>
                  {teamBLogo && <img src={teamBLogo} alt={teamB!.name} className="w-8 h-8 object-contain" crossOrigin="anonymous" />}
                </div>
              </div>
              <div className="text-[8px] text-grey-secondary mt-2.5 rounded leading-normal pl-2"
                   style={{ background: 'rgba(255,255,255,0.02)', borderLeft: '2px solid #FF3B45' }}>
                看好：大众 61% 的玩家认为 {matchPrediction?.winnerTeamId === teamA?.id ? teamA?.name : teamB?.name} 将赢得比赛。
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-3">
              <Award className="w-5 h-5 mb-1.5" style={{ color: 'rgba(160,166,178,0.4)' }} />
              <p className="text-[9px] text-grey-secondary font-bold uppercase" style={{ letterSpacing: '0.15em' }}>当前尚未提交今日赛程预测</p>
              <p className="text-[8px] font-semibold mt-1" style={{ color: 'rgba(160,166,178,0.5)' }}>去赛事预测投出你的一票，生成专属战报！</p>
            </div>
          )}
        </div>

        {/* Bottom QR — 真实二维码 */}
        <div className="flex items-center justify-between pt-3 mt-1 relative z-10"
             style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex flex-col text-left flex-1 mr-4">
            <span className="text-[9px] text-grey-secondary font-bold uppercase mb-1" style={{ letterSpacing: '0.15em' }}>全民 PICK 娱乐赛</span>
            <span className="text-[11px] font-black text-white" style={{ letterSpacing: '0.1em' }}>扫码参与赛事预测</span>
            <span className="text-[9px] text-grey-secondary font-medium mt-0.5" style={{ letterSpacing: '0.1em' }}>为你的主队加油投票！</span>
          </div>
          <div className="w-14 h-14 rounded-lg p-1 flex items-center justify-center relative flex-shrink-0"
               style={{ background: 'white', border: '1px solid rgba(255,255,255,0.15)' }}>
            {/* Red corner decorations */}
            <div className="absolute -top-1 -left-1 w-2 h-2" style={{ borderTop: '2px solid #FF3B45', borderLeft: '2px solid #FF3B45' }} />
            <div className="absolute -top-1 -right-1 w-2 h-2" style={{ borderTop: '2px solid #FF3B45', borderRight: '2px solid #FF3B45' }} />
            <div className="absolute -bottom-1 -left-1 w-2 h-2" style={{ borderBottom: '2px solid #FF3B45', borderLeft: '2px solid #FF3B45' }} />
            <div className="absolute -bottom-1 -right-1 w-2 h-2" style={{ borderBottom: '2px solid #FF3B45', borderRight: '2px solid #FF3B45' }} />
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="w-full h-full object-contain rounded" />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded animate-pulse" />
            )}
          </div>
        </div>

        <p className="text-[7px] mt-2 tracking-wide text-center relative z-10" style={{ color: 'rgba(160,166,178,0.3)' }}>
          * 本活动为民间娱乐应援，不含任何博彩或商业金钱投注
        </p>
      </div>

      {/* Actions */}
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
