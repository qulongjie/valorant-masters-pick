import React from 'react';
import type { Match } from '../data/matches';
import type { Team } from '../data/teams';
import type { Prediction } from '../lib/storage';
import { SharePoster } from '../components/SharePoster';
import { ChevronLeft, Share2 } from 'lucide-react';

interface SharePageProps {
  match: Match | null;
  teamA: Team | null;
  teamB: Team | null;
  prediction: Prediction | null;
  favoriteTeam: Team | null;
  onBack: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info') => void;
}

export const SharePage: React.FC<SharePageProps> = ({
  match,
  teamA,
  teamB,
  prediction,
  favoriteTeam,
  onBack,
  onShowToast
}) => {
  return (
    <div className="w-full flex flex-col select-none animate-fade-in text-center">
      
      {/* Top Header Row with back arrow */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-grey-secondary hover:text-white transition-colors cursor-pointer select-none py-1 px-2 bg-white/5 border border-white/5 rounded-lg active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          返回
        </button>
        <span className="text-[10px] font-black text-grey-secondary uppercase tracking-widest">
          应援预测海报分享
        </span>
        {/* Placeholder invisible box to balance back button */}
        <div className="w-[50px] pointer-events-none opacity-0" />
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="flex items-center gap-1.5 justify-center mb-1">
          <Share2 className="w-4 h-4 text-valorant" />
          <span className="text-[10px] font-black uppercase text-valorant tracking-widest">
            VALORANT MASTERS LONDON
          </span>
        </div>
        <p className="text-[10px] text-grey-secondary font-bold tracking-wide">
          分享你的应援立场与焦点之战比分，邀请瓦友一起竞猜
        </p>
      </div>

      {/* The 9:16 interactive Poster */}
      <div className="w-full flex justify-center py-2">
        <SharePoster
          favoriteTeam={favoriteTeam}
          selectedMatch={match}
          matchPrediction={prediction}
          teamA={teamA}
          teamB={teamB}
          onShowToast={onShowToast}
        />
      </div>
      
      {/* Compact safety notice at page footer */}
      <p className="text-[7.5px] text-grey-secondary/30 mt-6 leading-normal tracking-wide">
        * 本活动属于战队应援与娱乐预测性质，不包含任何商业金钱投注行为，禁止用于任何博彩用途。
      </p>
    </div>
  );
};
