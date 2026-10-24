import React from 'react';
import { CLUB_LOGO, USER_AVATAR } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenNotifications,
  onOpenProfile,
  onOpenAdmin,
  unreadCount = 2,
}) => {
  const getSubLabel = () => {
    switch (activeTab) {
      case 'home':
        return 'HOME';
      case 'tournaments':
        return 'TOURNAMENTS';
      case 'players':
        return 'PLAYERS';
      case 'club-contact':
        return 'CLUB CONTACT';
      default:
        return 'SHIALKOL';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/90 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto h-16 px-3 sm:px-4 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Club Logo & Name */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <img
              alt="Shialkol Sports Association Logo"
              className="h-9 w-9 rounded-full object-cover shadow-sm ring-2 ring-red-600"
              src={CLUB_LOGO}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-1 ring-white"></span>
          </div>
          <div className="flex flex-col min-w-0 leading-tight">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-[14px] sm:text-[15px] text-[#005b34] tracking-tight truncate">
                শিয়ালকোল ক্রীড়া সংঘ
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black uppercase flex-shrink-0 leading-none shadow-xs">
                লাল-সবুজ
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-[#3f4941] truncate uppercase">
              {getSubLabel()} • EST ২০২০
            </span>
          </div>
        </div>

        {/* Action icons: Admin, Notification & User Profile */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onOpenAdmin}
            aria-label="অ্যাডমিন প্যানেল"
            className="h-8 px-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white flex items-center gap-1 text-[11px] font-bold shadow-sm active:scale-95 transition-all border border-red-300/40"
            title="আহ্বায়ক মোঃ আনিসুর রহমান (অ্যাডমিন প্যানেল ২০২৬)"
          >
            <span className="material-symbols-outlined text-[15px]">admin_panel_settings</span>
            <span className="text-[10px] font-bold">অ্যাডমিন</span>
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="বিজ্ঞপ্তি"
            className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-[#3f4941] hover:text-[#005b34] hover:bg-[#eaedff] active:scale-95 transition-all"
            title="ক্লাব বিজ্ঞপ্তি"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#fea619] ring-2 ring-[#faf8ff] animate-pulse"></span>
            )}
          </button>

          <button
            onClick={onOpenProfile}
            aria-label="প্রোফাইল"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#137547]/30 transition-all active:scale-95"
            title="সদস্য প্রোফাইল"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#137547]/20 shadow-sm"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
