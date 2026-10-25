import React from 'react';
import { Player } from '../types';

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
  onCheer?: (playerName: string) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose, onCheer }) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#faf8ff] w-full max-w-md rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover / Photo Header */}
        <div className="relative w-full h-56 bg-gradient-to-t from-[#131b2e] to-[#005b34] overflow-hidden">
          <img
            src={player.image}
            alt={player.name}
            className="w-full h-full object-cover object-top opacity-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {/* Captain / Role Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#fea619] text-[#684000] px-2.5 py-1 rounded-full shadow-sm text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {player.isCaptain ? 'military_tech' : player.isCoach ? 'sports' : 'verified'}
            </span>
            <span>{player.isCaptain ? 'অধিনায়ক' : player.role}</span>
          </div>

          {/* Jersey Watermark */}
          <div className="absolute bottom-2 right-4 text-white/20 font-black text-6xl select-none pointer-events-none">
            #{player.jersey}
          </div>

          {/* Name & Team Overlay */}
          <div className="absolute bottom-3 left-4 right-16">
            <h3 className="text-white text-xl font-black drop-shadow tracking-tight">
              {player.name}
            </h3>
            <p className="text-[#9cf6bc] text-xs font-semibold flex items-center gap-1.5 mt-0.5">
              <span>{player.role}</span>
              <span className="w-1 h-1 rounded-full bg-white/60"></span>
              <span>{player.team}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4">
          {/* Key Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-white rounded-xl p-3 shadow-sm border border-[#bec9bf]/30 text-center">
            {player.goals !== undefined && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">গোল সংখ্যা</span>
                <span className="text-xl font-black text-[#855300]">{player.goals}</span>
              </div>
            )}
            {player.assists !== undefined && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">অ্যাসিস্ট</span>
                <span className="text-xl font-black text-[#005b34]">{player.assists}</span>
              </div>
            )}
            {player.matches !== undefined && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">ম্যাচ সংখ্যা</span>
                <span className="text-xl font-black text-[#005b34]">{player.matches}</span>
              </div>
            )}
            {player.avgRuns && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">গড় রান</span>
                <span className="text-xl font-black text-[#005b34]">{player.avgRuns}</span>
              </div>
            )}
            {player.wickets && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">উইকেট</span>
                <span className="text-xl font-black text-[#855300]">{player.wickets}</span>
              </div>
            )}
            {player.cleanSheets && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">ক্লিনশিট</span>
                <span className="text-xl font-black text-[#005b34]">{player.cleanSheets}</span>
              </div>
            )}
            {player.saveRate && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">সেভ রেট</span>
                <span className="text-xl font-black text-[#855300]">{player.saveRate}</span>
              </div>
            )}
            {player.topSpeed && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">টপ স্পিড</span>
                <span className="text-xl font-black text-[#005b34]">{player.topSpeed} কিমি</span>
              </div>
            )}
            {player.economy && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">ইকোনমি</span>
                <span className="text-xl font-black text-[#855300]">{player.economy}</span>
              </div>
            )}
            {player.passAccuracy && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">পাস একুরেসি</span>
                <span className="text-xl font-black text-[#005b34]">{player.passAccuracy}</span>
              </div>
            )}
            {player.license && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">কোচিং সনদ</span>
                <span className="text-sm font-black text-[#005b34]">{player.license}</span>
              </div>
            )}
            {player.experience && (
              <div>
                <span className="block text-[11px] text-[#3f4941] font-medium">অভিজ্ঞতা</span>
                <span className="text-sm font-black text-[#855300]">{player.experience}</span>
              </div>
            )}
          </div>

          {/* Honors & Achievements */}
          {player.honors && (
            <div className="bg-[#fea619]/10 rounded-xl p-3 border border-[#fea619]/30 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#855300] text-[20px] flex-shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                emoji_events
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#684000] uppercase tracking-wider">অর্জন ও সম্মাননা</h4>
                <p className="text-sm font-semibold text-[#131b2e] mt-0.5">{player.honors}</p>
              </div>
            </div>
          )}

          {/* Player Bio */}
          {player.bio && (
            <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bec9bf]/20">
              <h4 className="text-xs font-bold text-[#005b34] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">info</span>
                খেলোয়াড় পরিচিতি
              </h4>
              <p className="text-xs sm:text-sm text-[#3f4941] leading-relaxed">
                {player.bio}
              </p>
            </div>
          )}

          {/* Attributes List */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {player.age && (
              <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-[#3f4941]">বয়স</span>
                <span className="font-bold text-[#005b34]">{player.age} বছর</span>
              </div>
            )}
            {player.sl && (
              <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-[#3f4941]">স্কোয়াড ক্রঃ</span>
                <span className="font-bold text-[#005b34]">#{player.sl}</span>
              </div>
            )}
            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between">
              <span className="text-[#3f4941]">জার্সি নম্বর</span>
              <span className="font-bold text-[#005b34]">#{player.jersey}</span>
            </div>
            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between">
              <span className="text-[#3f4941]">রক্তের গ্রুপ</span>
              <span className="font-bold text-[#ba1a1a]">{player.bloodGroup || 'B (+ve)'}</span>
            </div>
            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between">
              <span className="text-[#3f4941]">গ্রাম / এলাকা</span>
              <span className="font-bold text-[#131b2e]">{player.village || 'শিয়ালকোল'}</span>
            </div>
            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between">
              <span className="text-[#3f4941]">ক্লাবে যোগদান</span>
              <span className="font-bold text-[#131b2e]">{player.joinedYear || '২০২০'}</span>
            </div>
            <div className="bg-[#f2f3ff] p-2.5 rounded-lg flex items-center justify-between col-span-2">
              <span className="text-[#3f4941]">স্ট্যাটাস</span>
              <span className="font-bold text-[#005b34]">সক্রিয় প্রথম একাদশ স্কোয়াড</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                if (onCheer) onCheer(player.name);
                onClose();
              }}
              className="flex-1 py-2.5 rounded-lg bg-[#005b34] hover:bg-[#137547] active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              <span>খেলোয়াড়কে শুভকামনা জানান</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
