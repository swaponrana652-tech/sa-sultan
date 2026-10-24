import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  liveBadge?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  liveBadge = true,
}) => {
  const tabs: { id: TabType; label: string; icon: string; hasBadge?: boolean }[] = [
    { id: 'home', label: 'হোম', icon: 'sports_cricket' },
    { id: 'tournaments', label: 'টুর্নামেন্ট', icon: 'emoji_events', hasBadge: liveBadge },
    { id: 'players', label: 'খেলোয়াড়', icon: 'groups' },
    { id: 'club-contact', label: 'ক্লাব নোটিশ', icon: 'campaign' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl border-t border-black/[0.05] shadow-[0_-2px_12px_rgba(15,81,50,0.06)]">
      <div className="max-w-md mx-auto h-16 px-2 grid grid-cols-4 items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#137547] font-bold scale-[1.02]'
                  : 'text-[#3f4941] hover:text-[#005b34] active:scale-95'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px] transition-transform"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400" }}
                >
                  {tab.icon}
                </span>
                {tab.hasBadge && (
                  <span className="absolute -top-1 -right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                )}
              </div>
              <span className="text-[11px] tracking-tight leading-none text-center truncate max-w-full">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 rounded-full bg-red-600 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
