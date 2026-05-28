import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  subtext?: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label, 
  subtext,
  icon,
  accentColor = "border-white/10" 
}) => {
  return (
    <div className={`glass-panel-light rounded-xl p-3 flex flex-col justify-between items-center text-center border relative overflow-hidden select-none ${accentColor}`}>
      {/* Visual top highlighting overlay line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {icon && (
        <div className="text-valorant opacity-80 mb-1.5 transform hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      
      <div className="text-xl font-black text-white tracking-tight leading-none mt-1">
        {value}
      </div>
      
      <div className="text-[10px] text-grey-secondary font-bold tracking-widest mt-1.5 uppercase leading-none">
        {label}
      </div>

      {subtext && (
        <div className="text-[8px] text-grey-secondary/60 font-semibold mt-1">
          {subtext}
        </div>
      )}
    </div>
  );
};
