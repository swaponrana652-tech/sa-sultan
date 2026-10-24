import React from 'react';
import { CLUB_LOGO, USER_AVATAR } from '../data/mockData';

interface MembershipCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MembershipCardModal: React.FC<MembershipCardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-white/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f3ff] text-[#3f4941] flex items-center justify-center hover:bg-[#eaedff]"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Digital Member Card */}
        <div className="rounded-xl bg-gradient-to-br from-[#005b34] via-[#137547] to-[#1a5939] text-white p-4 shadow-xl relative overflow-hidden">
          {/* Decorative accents */}
          <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#fea619]/20 blur-xl pointer-events-none" />
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2">
              <img src={CLUB_LOGO} alt="Club Logo" className="w-10 h-10 object-cover rounded-full bg-white ring-1 ring-white/50" />
              <div>
                <h4 className="text-xs font-bold leading-tight">শিয়ালকোল ক্রীড়া সংঘ</h4>
                <p className="text-[9px] text-[#9cf6bc]">ডিজিটাল মেম্বারশিপ কার্ড • EST 2020</p>
              </div>
            </div>
            <span className="bg-[#fea619] text-[#684000] text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
              আজীবন সদস্য
            </span>
          </div>

          <div className="flex items-center gap-3.5 my-3.5">
            <img
              src={USER_AVATAR}
              alt="Member"
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-[#fea619] shadow"
            />
            <div className="min-w-0">
              <h3 className="text-base font-black truncate">তানভীর আহমেদ</h3>
              <p className="text-xs text-[#9cf6bc] font-semibold">জার্সি #১০ • অধিনায়ক</p>
              <p className="text-[10px] text-white/70 mt-1">আইডি নং: SSC-2025-010</p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/15 grid grid-cols-2 text-[10px] text-white/80">
            <div>
              <span className="text-white/60 block">মেয়াদ</span>
              <span className="font-bold text-white">আজীবন (Life Member)</span>
            </div>
            <div className="text-right">
              <span className="text-white/60 block">রক্তের গ্রুপ</span>
              <span className="font-bold text-[#fea619]">B (+ve)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-[#3f4941]">
            মাঠে প্রবেশ ও ক্লাব সুবিধাসমূহ ব্যবহারের জন্য এই ডিজিটাল কার্ডটি প্রদর্শন করুন।
          </p>
          <button
            onClick={onClose}
            className="mt-3 w-full py-2 bg-[#005b34] text-white rounded-lg text-xs font-bold shadow hover:bg-[#137547] transition-all"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};
