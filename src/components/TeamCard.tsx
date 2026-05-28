import React, { useRef } from 'react';
import type { Team } from '../data/teams';
import { TEAM_LOGO_URLS } from './TeamLogos';
import { CheckCircle } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  isSelected: boolean;
  onVote: (teamId: string) => void;
  hasVotedAny: boolean;
  dynamicSupportRate?: number;
}

const REGION_LABELS: Record<string, string> = {
  CN: 'CN',
  Pacific: 'PACIFIC',
  Americas: 'AMERICAS',
  EMEA: 'EMEA',
};

const REGION_COLORS: Record<string, string> = {
  CN: 'text-[#FF3B45] border-[#FF3B45]/40 bg-[#FF3B45]/10',
  Pacific: 'text-[#FF007F] border-[#FF007F]/40 bg-[#FF007F]/10',
  Americas: 'text-[#F0B700] border-[#F0B700]/40 bg-[#F0B700]/10',
  EMEA: 'text-[#00AAFF] border-[#00AAFF]/40 bg-[#00AAFF]/10',
};

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  isSelected,
  onVote,
  hasVotedAny,
  dynamicSupportRate,
}) => {
  const logoUrl = TEAM_LOGO_URLS[team.id];
  const regionLabel = REGION_LABELS[team.region] ?? team.region;
  const regionColorClass = REGION_COLORS[team.region] ?? 'text-white border-white/20 bg-white/5';
  const canVote = !hasVotedAny;
  const displaySupportRate = dynamicSupportRate ?? team.supportRate;
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canVote) return;
    // Ripple effect
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btnRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
    onVote(team.id);
  };

  return (
    <div
      onClick={() => canVote && onVote(team.id)}
      className={`
        relative flex flex-col items-center rounded-xl p-2.5 pt-3 select-none transition-all duration-300
        ${isSelected
          ? 'bg-[#0F1218] border-2 border-[#FF3B45] animate-breathe-glow'
          : 'bg-[#0A0D12] border border-white/[0.07] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-card-hover'
        }
        ${canVote ? 'cursor-pointer active:scale-95' : 'cursor-default'}
        ${hasVotedAny && !isSelected ? 'opacity-60' : ''}
      `}
    >
      {/* Selected check badge */}
      {isSelected && (
        <div className="absolute top-1.5 right-1.5 z-20">
          <CheckCircle className="w-4 h-4 text-[#FF3B45] fill-[#FF3B45]/20 animate-bounce-in" />
        </div>
      )}

      {/* 金色种子标签 */}
      {team.isDirectSeed && (
        <div className="absolute top-1.5 left-1.5 z-20">
          <span className="text-[6.5px] font-black seed-badge-gold px-1.5 py-0.5 rounded uppercase leading-none">
            种子
          </span>
        </div>
      )}

      {/* Region tag */}
      <span className={`text-[8px] font-black border rounded px-1.5 py-0.5 uppercase tracking-wider mb-2 leading-none ${regionColorClass}`}>
        {regionLabel}
      </span>

      {/* Logo with rotating gradient ring */}
      <div className="logo-ring-wrapper">
        <div
          className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden ${isSelected ? 'scale-110' : ''}`}
          style={{
            background: `radial-gradient(circle, ${team.bgAccent} 0%, rgba(5,7,10,0.95) 75%)`,
            boxShadow: isSelected ? `0 0 18px ${team.brandColor}90` : 'none',
            border: `2px solid ${team.brandColor}50`,
          }}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={`${team.name} logo`}
              className="w-9 h-9 object-contain"
              loading="lazy"
            />
          ) : (
            <span
              className="text-[11px] font-black tracking-tighter"
              style={{ color: team.brandColor }}
            >
              {team.logoText}
            </span>
          )}
        </div>
      </div>

      {/* Team name */}
      <h3 className="text-[11px] font-black text-white tracking-widest uppercase mt-2 leading-none">
        {team.name}
      </h3>

      {/* Support rate with flowing gradient bar */}
      <div className="w-full mt-2">
        <div className="flex justify-between items-center mb-1">
          <span
            className="text-[11px] font-extrabold"
            style={{ color: isSelected ? '#FF3B45' : '#9CA3AF' }}
          >
            {displaySupportRate}%
          </span>
        </div>
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min(displaySupportRate * 3, 100)}%`,
              background: isSelected
                ? 'linear-gradient(90deg,#B51220,#FF3B45,#FF8086)'
                : `linear-gradient(90deg, ${team.brandColor}55, ${team.brandColor})`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Vote button with ripple */}
      <button
        ref={btnRef}
        disabled={hasVotedAny}
        onClick={handleClick}
        className={`
          ripple-container w-full mt-2.5 py-[5px] rounded text-[10px] font-black uppercase tracking-wider transition-all duration-300
          slanted-cut-br
          ${isSelected
            ? 'text-white'
            : hasVotedAny
              ? 'bg-transparent text-white/20 border border-white/10 cursor-default'
              : 'bg-transparent text-white border border-white/20 hover:bg-white/8 active:scale-95'
          }
        `}
        style={
          isSelected
            ? { background: 'linear-gradient(90deg, #B51220, #FF3B45)', boxShadow: '0 0 12px rgba(255,59,69,0.45)' }
            : {}
        }
      >
        {isSelected ? '已支持 ✓' : '支持'}
      </button>
    </div>
  );
};
