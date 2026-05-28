import React, { useState, useEffect, useRef } from 'react';
import type { UserProfile, Prediction } from '../lib/storage';
import { MATCHES } from '../data/matches';
import { TEAMS } from '../data/teams';
import { TEAM_LOGO_URLS } from '../components/TeamLogos';

import { Disclaimer } from '../components/Disclaimer';
import { Edit2, Award, Calendar, ChevronRight, History } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfilePageProps {
  profile: UserProfile;
  predictions: Record<string, Prediction>;
  onNavigateToTab: (tab: 'home' | 'predict' | 'ranking' | 'profile') => void;
  onViewResult: (matchId: string) => void;
  onUpdateProfile: (newProfile: UserProfile) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

/** 数字滚动动画 Hook */
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const prevRef = useRef<number>(0);
  
  useEffect(() => {
    if (target === 0) {
      prevRef.current = 0;
      return;
    }
    const start = performance.now();
    const from = prevRef.current;
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (target - from) * eased);
      setValue(current);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        prevRef.current = target;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  predictions,
  onNavigateToTab,
  onViewResult,
  onUpdateProfile,
  onShowToast
}) => {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(profile.nickname);
  const animatedPoints = useCountUp(profile.points, 1000);
  const animatedHitRate = useCountUp(Math.round(profile.hitRate * 10), 1000);

  const getTeamById = (id: string) => TEAMS.find((t) => t.id === id);
  const campTeam = profile.championTeamId ? getTeamById(profile.championTeamId) : null;
  const campLogo = profile.championTeamId ? TEAM_LOGO_URLS[profile.championTeamId] : null;

  const handleNicknameSave = () => {
    if (!nicknameInput.trim()) { onShowToast("昵称不能为空", "info"); return; }
    if (nicknameInput.length > 10) { onShowToast("昵称长度限10个字符", "info"); return; }
    onUpdateProfile({ ...profile, nickname: nicknameInput.trim() });
    setIsEditingNickname(false);
    onShowToast("昵称修改成功！", "success");
    confetti({ particleCount: 20, spread: 50, origin: { y: 0.8 } });
  };


  return (
    <div className="w-full flex flex-col select-none page-enter text-left">
      
      {/* 1. User Header — 战队主题色光环 */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-glass mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div className="bg-valorant text-white text-[7.5px] font-black py-0.5 w-24 text-center absolute top-2 right-[-24px] rotate-45 uppercase tracking-widest leading-none">
            PRO FILE
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 头像 — 呼吸光环 */}
          <div className={`w-14 h-14 rounded-full p-[2.5px] flex items-center justify-center flex-shrink-0 overflow-hidden ${campTeam ? 'animate-breathe-glow' : ''}`}
               style={campTeam ? { background: `conic-gradient(from 0deg, ${campTeam.brandColor}, transparent, ${campTeam.brandColor})` } : { background: 'linear-gradient(135deg, #3A3D40, #1E2022)' }}>
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center relative overflow-hidden">
              {campLogo ? (
                <img src={campLogo} alt={campTeam?.name || ''} className="w-10 h-10 object-contain" loading="lazy" />
              ) : (
                <span className="text-lg font-black text-grey-secondary/60 font-mono">瓦</span>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 pr-8">
            <div className="flex items-center gap-1.5 min-w-0">
              {isEditingNickname ? (
                <div className="flex items-center gap-1 w-full max-w-[150px]">
                  <input
                    type="text"
                    value={nicknameInput}
                    onChange={(e) => setNicknameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNicknameSave()}
                    className="bg-[#05070A] border border-valorant/50 text-xs font-black text-white px-2 py-0.5 rounded focus:outline-none focus:border-valorant focus:shadow-[0_0_12px_rgba(255,59,69,0.4)] transition-all w-full"
                    maxLength={10}
                    autoFocus
                  />
                  <button onClick={handleNicknameSave} className="text-[9px] bg-valorant text-white font-bold px-1.5 py-1 rounded cursor-pointer active:scale-95">存</button>
                </div>
              ) : (
                <>
                  <span className="text-sm font-black text-white truncate max-w-[120px]">{profile.nickname}</span>
                  <button onClick={() => setIsEditingNickname(true)} className="text-grey-secondary/60 hover:text-white transition-colors cursor-pointer"><Edit2 className="w-3.5 h-3.5" /></button>
                </>
              )}
            </div>
            <div className="mt-1.5 flex items-center">
              {campTeam ? (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 bg-[#FF3B45]/10 border border-[#FF3B45]/25 text-[#FF3B45]">
                  <Award className="w-3 h-3" /> {campTeam.name} 支持者
                </span>
              ) : (
                <span className="text-[9px] font-bold text-grey-secondary/50">暂未选择支持阵营</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats — 数字滚动动画 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="glass-panel rounded-xl p-3 border border-white/10 flex flex-col items-center">
          <span className="text-[20px] font-black text-valorant font-mono">{animatedPoints}</span>
          <span className="text-[8px] text-grey-secondary font-bold uppercase tracking-wider mt-0.5">积分</span>
        </div>
        <div className="glass-panel rounded-xl p-3 border border-white/10 flex flex-col items-center">
          <span className="text-[20px] font-black text-status-success font-mono">{profile.hitRate > 0 ? `${(animatedHitRate / 10).toFixed(1)}%` : '—'}</span>
          <span className="text-[8px] text-grey-secondary font-bold uppercase tracking-wider mt-0.5">命中率</span>
        </div>
        <div className="glass-panel rounded-xl p-3 border border-white/10 flex flex-col items-center">
          <span className="text-[20px] font-black text-status-info font-mono">{profile.dailyRank > 0 ? `#${profile.dailyRank}` : '—'}</span>
          <span className="text-[8px] text-grey-secondary font-bold uppercase tracking-wider mt-0.5">日排名</span>
        </div>
      </div>

      {/* 3. Predictions — 交错滑入 */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-glass mb-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 pb-2 border-b border-white/5 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-valorant" /> 我的预测记录
        </h3>
        <div className="flex flex-col gap-2.5">
          {MATCHES.map((match, idx) => {
            const pred = predictions[match.id];
            const teamA = getTeamById(match.teamAId);
            const teamB = getTeamById(match.teamBId);
            if (!teamA || !teamB) return null;
            const logoA = TEAM_LOGO_URLS[teamA.id];
            const logoB = TEAM_LOGO_URLS[teamB.id];
            const winnerTeam = pred ? getTeamById(pred.winnerTeamId) : null;

            return pred ? (
              <div
                key={match.id}
                onClick={() => onViewResult(match.id)}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors group animate-slide-left"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                      {logoA ? <img src={logoA} alt={teamA.name} className="w-4 h-4 object-contain" loading="lazy" /> : <span className="text-[6px] font-black text-white">{teamA.logoText}</span>}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                      {logoB ? <img src={logoB} alt={teamB.name} className="w-4 h-4 object-contain" loading="lazy" /> : <span className="text-[6px] font-black text-white">{teamB.logoText}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white uppercase group-hover:text-valorant transition-colors">{teamA.name} vs {teamB.name}</span>
                    <span className="text-[8.5px] text-grey-secondary font-semibold mt-1">预测：{winnerTeam?.name} 胜 / 比分 {pred.score}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] bg-status-success/10 border border-status-success/15 px-1.5 py-0.5 rounded font-black text-status-success uppercase leading-none">已预测</span>
                  <ChevronRight className="w-3.5 h-3.5 text-grey-secondary group-hover:text-white transition-colors" />
                </div>
              </div>
            ) : (
              <div
                key={match.id}
                className="bg-white/[0.01] border border-white/5 border-dashed rounded-xl p-3 flex items-center justify-between animate-slide-left"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'backwards' }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                      {logoA ? <img src={logoA} alt={teamA.name} className="w-4 h-4 object-contain" loading="lazy" /> : <span className="text-[6px] font-black text-white">{teamA.logoText}</span>}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                      {logoB ? <img src={logoB} alt={teamB.name} className="w-4 h-4 object-contain" loading="lazy" /> : <span className="text-[6px] font-black text-white">{teamB.logoText}</span>}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-grey-secondary/80 uppercase">{teamA.name} vs {teamB.name}</span>
                    <span className="text-[8.5px] text-grey-secondary/50 font-semibold mt-1">{match.date} {match.time} · 暂未预测</span>
                  </div>
                </div>
                <button onClick={() => onNavigateToTab('predict')} className="px-2.5 py-1 bg-valorant/10 hover:bg-valorant text-valorant hover:text-white border border-valorant/25 text-[8.5px] font-black uppercase rounded transition-colors duration-300 cursor-pointer slanted-cut-br active:scale-95">
                  去预测
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Points History — 颜色编码 */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-glass">
        <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 pb-2 border-b border-white/5 flex items-center gap-1">
          <History className="w-3.5 h-3.5 text-valorant" /> 积分获取历史记录
        </h3>
        <div className="flex flex-col gap-2.5">
          {profile.history.length > 0 ? (
            profile.history.map((log) => {
              const isHigh = log.points >= 5;
              return (
                <div key={log.id} className="flex justify-between items-center text-left py-1.5 border-b border-white/[0.02] last:border-b-0">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white tracking-wide">{log.description}</span>
                    <span className="text-[8px] text-grey-secondary/60 font-semibold mt-0.5">预测日期：{log.date}</span>
                  </div>
                  <span className={`text-xs font-black tracking-tight px-2 py-0.5 rounded font-mono ${isHigh ? 'text-status-info bg-status-info/10 border border-status-info/15' : 'text-status-success bg-status-success/10 border border-status-success/15'}`}>
                    +{log.points}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-6 flex flex-col items-center gap-2">
              {campLogo ? (
                <img src={campLogo} alt="" className="w-10 h-10 object-contain opacity-20 animate-breathe" loading="lazy" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <History className="w-5 h-5 text-grey-secondary/30" />
                </div>
              )}
              <span className="text-xs text-grey-secondary/50 font-medium text-center">暂无积分历史，去预测比赛获取积分吧！</span>
            </div>
          )}
        </div>
      </div>

      <Disclaimer />
    </div>
  );
};
