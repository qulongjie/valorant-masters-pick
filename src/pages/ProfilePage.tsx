import React, { useState } from 'react';
import type { UserProfile, Prediction } from '../lib/storage';
import { MATCHES } from '../data/matches';
import { TEAMS } from '../data/teams';
import { TEAM_LOGO_URLS } from '../components/TeamLogos';
import { StatCard } from '../components/StatCard';
import { Disclaimer } from '../components/Disclaimer';
import { Edit2, Award, Calendar, ChevronRight, CheckCircle2, History } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfilePageProps {
  profile: UserProfile;
  predictions: Record<string, Prediction>;
  onNavigateToTab: (tab: 'home' | 'predict' | 'ranking' | 'profile') => void;
  onViewResult: (matchId: string) => void;
  onUpdateProfile: (newProfile: UserProfile) => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
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

  const getTeamById = (id: string) => {
    return TEAMS.find((t) => t.id === id);
  };

  const campTeam = profile.championTeamId ? getTeamById(profile.championTeamId) : null;
  const campLogo = profile.championTeamId ? TEAM_LOGO_URLS[profile.championTeamId] : null;

  const handleNicknameSave = () => {
    if (!nicknameInput.trim()) {
      onShowToast("昵称不能为空", "info");
      return;
    }
    if (nicknameInput.length > 10) {
      onShowToast("昵称长度限10个字符", "info");
      return;
    }
    const updated = { ...profile, nickname: nicknameInput.trim() };
    onUpdateProfile(updated);
    setIsEditingNickname(false);
    onShowToast("昵称修改成功！", "success");
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="w-full flex flex-col select-none animate-fade-in text-left">
      
      {/* 1. User Header */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-glass mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div className="bg-valorant text-white text-[7.5px] font-black py-0.5 w-24 text-center absolute top-2 right-[-24px] rotate-45 uppercase tracking-widest leading-none">
            PRO FILE
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${campTeam ? campTeam.color : 'from-[#3A3D40] to-[#1E2022]'} p-[2px] flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden`}>
            <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center relative overflow-hidden">
              {campLogo ? (
                <img src={campLogo} alt={campTeam?.name || ''} className="w-10 h-10 object-contain" />
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
                    className="bg-[#05070A] border border-valorant text-xs font-black text-white px-2 py-0.5 rounded focus:outline-none w-full"
                    maxLength={10}
                    autoFocus
                  />
                  <button 
                    onClick={handleNicknameSave}
                    className="text-[9px] bg-valorant text-white font-bold px-1.5 py-1 rounded cursor-pointer"
                  >
                    存
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-sm font-black text-white truncate max-w-[120px]">
                    {profile.nickname}
                  </span>
                  <button 
                    onClick={() => setIsEditingNickname(true)}
                    className="text-grey-secondary/60 hover:text-white transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
            
            <div className="mt-1.5 flex items-center">
              {campTeam ? (
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 bg-[#FF3B45]/10 border border-[#FF3B45]/25 text-[#FF3B45]`}>
                  <Award className="w-3 h-3" />
                  {campTeam.name} 阵营
                </span>
              ) : (
                <span className="text-[9px] text-grey-secondary/60 font-semibold">
                  尚未选择支持战队
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats Grid - all starting from 0 */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <StatCard 
          value={profile.points} 
          label="预测积分" 
          subtext="从0开始"
          icon={<Award className="w-4 h-4" />}
        />
        <StatCard 
          value={`${profile.hitRate}%`} 
          label="命中率" 
          subtext="从0开始"
          icon={<CheckCircle2 className="w-4 h-4" />}
          accentColor="border-status-success/20"
        />
        <StatCard 
          value={profile.dailyRank || '-'} 
          label="今日排名" 
          subtext="从0开始"
          icon={<History className="w-4 h-4" />}
          accentColor="border-status-info/20"
        />
      </div>

      {/* 3. Predictions List - only confirmed matches */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-glass mb-5">
        <div className="flex justify-between items-center pb-2.5 border-b border-white/5 mb-3">
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-valorant" />
            我的预测记录
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {MATCHES.map((match) => {
            const teamA = getTeamById(match.teamAId);
            const teamB = getTeamById(match.teamBId);
            const pred = predictions[match.id];

            if (!teamA || !teamB) return null;

            const logoA = TEAM_LOGO_URLS[teamA.id];
            const logoB = TEAM_LOGO_URLS[teamB.id];

            if (pred) {
              const winnerTeam = getTeamById(pred.winnerTeamId);
              return (
                <div 
                  key={match.id}
                  onClick={() => onViewResult(match.id)}
                  className="bg-white/[0.02] border border-white/5 hover:border-white/12 rounded-xl p-3 flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1">
                      <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                        {logoA ? <img src={logoA} alt={teamA.name} className="w-4 h-4 object-contain" /> : <span className="text-[6px] font-black text-white">{teamA.logoText}</span>}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                        {logoB ? <img src={logoB} alt={teamB.name} className="w-4 h-4 object-contain" /> : <span className="text-[6px] font-black text-white">{teamB.logoText}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white uppercase group-hover:text-valorant transition-colors">
                        {teamA.name} vs {teamB.name}
                      </span>
                      <span className="text-[8.5px] text-grey-secondary font-semibold mt-1">
                        预测：{winnerTeam?.name} 胜 / 比分 {pred.score}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] bg-status-success/10 border border-status-success/15 px-1.5 py-0.5 rounded font-black text-status-success uppercase leading-none">
                      已预测
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-grey-secondary group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            } else {
              return (
                <div 
                  key={match.id}
                  className="bg-white/[0.01] border border-white/5 border-dashed rounded-xl p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1">
                      <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                        {logoA ? <img src={logoA} alt={teamA.name} className="w-4 h-4 object-contain" /> : <span className="text-[6px] font-black text-white">{teamA.logoText}</span>}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-dark-card border border-white/10 flex items-center justify-center overflow-hidden">
                        {logoB ? <img src={logoB} alt={teamB.name} className="w-4 h-4 object-contain" /> : <span className="text-[6px] font-black text-white">{teamB.logoText}</span>}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-grey-secondary/80 uppercase">
                        {teamA.name} vs {teamB.name}
                      </span>
                      <span className="text-[8.5px] text-grey-secondary/50 font-semibold mt-1">
                        {match.date} {match.time} · 暂未预测
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onNavigateToTab('predict')}
                    className="px-2.5 py-1 bg-valorant/10 hover:bg-valorant text-valorant hover:text-white border border-valorant/25 text-[8.5px] font-black uppercase rounded transition-colors duration-300 cursor-pointer slanted-cut-br"
                  >
                    去预测
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* 4. Points History - starts empty */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-glass">
        <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 pb-2 border-b border-white/5 flex items-center gap-1">
          <History className="w-3.5 h-3.5 text-valorant" />
          积分获取历史记录
        </h3>

        <div className="flex flex-col gap-2.5">
          {profile.history.length > 0 ? (
            profile.history.map((log) => (
              <div 
                key={log.id} 
                className="flex justify-between items-center text-left py-1.5 border-b border-white/[0.02] last:border-b-0"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {log.description}
                  </span>
                  <span className="text-[8px] text-grey-secondary/60 font-semibold mt-0.5">
                    预测日期：{log.date}
                  </span>
                </div>
                <span className="text-xs font-black text-status-success tracking-tight bg-status-success/10 border border-status-success/15 px-2 py-0.5 rounded font-mono">
                  +{log.points}
                </span>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-xs text-grey-secondary font-medium">
              暂无积分历史，去预测比赛获取积分吧！
            </div>
          )}
        </div>
      </div>

      {/* 5. Disclaimer */}
      <Disclaimer />
    </div>
  );
};
