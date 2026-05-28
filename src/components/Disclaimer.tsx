import React from 'react';

interface DisclaimerProps {
  className?: string;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ className = "" }) => {
  return (
    <div className={`mt-6 px-4 py-3 bg-[#0F1218]/40 border border-white/5 rounded-xl flex items-start gap-2.5 text-left select-none ${className}`}>
      <svg 
        className="w-4 h-4 text-valorant mt-0.5 flex-shrink-0 opacity-80" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      <div className="flex-1">
        <p className="text-[10px] text-grey-secondary leading-relaxed font-sans font-medium tracking-wide">
          声明：本活动仅为玩家娱乐预测与战队应援，不涉及任何金钱投注、充值、博彩、赔率或现金奖励。请健康体验游戏，支持绿色公平竞技。
        </p>
      </div>
    </div>
  );
};
