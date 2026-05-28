import React from 'react';
import { Home, CalendarCheck, BarChart3, User } from 'lucide-react';

export type TabType = 'home' | 'predict' | 'ranking' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: '全民PICK',
      icon: Home,
    },
    {
      id: 'predict' as TabType,
      label: '赛事预测',
      icon: CalendarCheck,
    },
    {
      id: 'ranking' as TabType,
      label: '排行榜',
      icon: BarChart3,
    },
    {
      id: 'profile' as TabType,
      label: '我的记录',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="w-full max-w-[430px] px-4 pb-5 pt-2 pointer-events-auto">
        <div className="glass-panel rounded-2xl flex items-center justify-around py-2 px-1 shadow-glass border border-white/10 relative overflow-hidden">
          {/* Subtle neon horizontal line across tab top */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className="flex-1 py-1.5 flex flex-col items-center justify-center transition-all duration-300 relative select-none cursor-pointer focus:outline-none"
              >
                {/* Visual glow backdrop for active tab */}
                {isActive && (
                  <div className="absolute inset-0 bg-valorant/5 blur-md rounded-xl transition-all duration-300" />
                )}

                <div 
                  className={`relative transition-all duration-300 transform ${
                    isActive ? 'text-valorant scale-110' : 'text-grey-secondary hover:text-white scale-100'
                  }`}
                >
                  <Icon className="w-[22px] h-[22px] stroke-[2.2]" />
                  
                  {/* Subtle red point indicator above active icon */}
                  {isActive && (
                    <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 bg-valorant rounded-full animate-ping" />
                  )}
                </div>

                <span 
                  className={`text-[10px] font-semibold mt-1 tracking-wider transition-all duration-300 ${
                    isActive 
                      ? 'text-valorant opacity-100 font-bold' 
                      : 'text-grey-secondary opacity-75 font-medium'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Bottom line marker */}
                <div 
                  className={`absolute bottom-0 w-8 h-[2.5px] rounded-full transition-all duration-500 transform ${
                    isActive ? 'bg-valorant opacity-100 scale-100' : 'bg-transparent opacity-0 scale-50'
                  }`}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 4px #FF3B45)' : 'none'
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
