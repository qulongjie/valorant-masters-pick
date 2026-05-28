import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#05070A] text-white flex items-center justify-center relative overflow-hidden select-none font-sans">
      
      {/* Desktop Ambient Background Graphic */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#150B10_0%,_#05070A_70%)] pointer-events-none z-0 hidden md:block" />
      
      {/* Elegant Red Laser Line overlay for desktop gaming aesthetic */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-valorant/10 to-transparent pointer-events-none z-0 hidden md:block" />
      
      {/* Ambient Red glow spots */}
      <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-valorant/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute -bottom-[20%] right-[20%] w-[600px] h-[600px] rounded-full bg-status-info/5 blur-[120px] pointer-events-none z-0" />
      
      {/* Centered H5 Device Simulator */}
      <div className="h5-container relative z-10 w-full shadow-2xl flex flex-col md:border-x md:border-white/5 md:my-4 md:rounded-[36px] md:max-h-[920px] md:h-[880px] overflow-hidden">
        
        {/* Subtle top device bar notch simulation on desktop */}
        <div className="hidden md:flex justify-center items-center h-6 bg-[#080B10] w-full border-b border-white/5 relative z-40 select-none">
          <div className="w-24 h-4 bg-[#05070A] rounded-b-xl border-x border-b border-white/5 absolute top-0 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-white/20 mr-1" />
            <span className="w-8 h-1 bg-white/10 rounded-full" />
          </div>
          <div className="text-[10px] text-grey-secondary font-medium tracking-wider absolute right-4">
            MASTERS LONDON
          </div>
        </div>

        {/* Scrollable H5 Content */}
        <div className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col pb-28 pt-4 radial-glow relative">
          
          {/* Skyline backdrop layer */}
          <div className="london-skyline" />

          {/* Children View components */}
          <div className="w-full flex-1 flex flex-col px-4 relative z-20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
