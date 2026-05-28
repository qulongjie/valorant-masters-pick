import React from 'react';
import { Home, BarChart3, Trophy, User } from 'lucide-react';

export type TabType = 'home' | 'predict' | 'ranking' | 'profile';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',    label: '首页',   icon: <Home className="w-6 h-6" /> },
  { id: 'predict', label: '预测',   icon: <BarChart3 className="w-6 h-6" /> },
  { id: 'ranking', label: '排行榜', icon: <Trophy className="w-6 h-6" /> },
  { id: 'profile', label: '我的',   icon: <User className="w-6 h-6" /> },
];

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const handlePress = (tabId: TabType) => {
    // 长按震动反馈
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onChangeTab(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 nav-top-edge bg-[#080B10]/80 backdrop-blur-xl">
      <div className="max-w-[430px] mx-auto flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handlePress(item.id)}
              className={`
                relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl
                transition-all duration-300 min-w-[56px]
                ${isActive
                  ? 'text-valorant scale-105'
                  : 'text-grey-secondary/60 hover:text-grey-secondary active:scale-95'
                }
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-valorant" 
                     style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
              )}

              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] font-bold tracking-wide ${isActive ? 'font-black' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
