import React, { useState, useMemo } from 'react';
import { CAPTAIN_PLAYER, SQUAD_PLAYERS, PLAYER_LIST_DOCUMENT, toBengaliDigits } from '../data/mockData';
import { Player } from '../types';

interface PlayersScreenProps {
  onSelectPlayer: (player: Player) => void;
  onShowToast: (msg: string) => void;
  onOpenTrialModal: () => void;
}

export const PlayersScreen: React.FC<PlayersScreenProps> = ({
  onSelectPlayer,
  onShowToast,
  onOpenTrialModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'football' | 'cricket' | 'indoor' | 'coach'>('all');
  const [sortBy, setSortBy] = useState<'sl' | 'name' | 'jersey' | 'age'>('sl');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showDocModal, setShowDocModal] = useState(false);

  const categories = [
    { id: 'all', label: 'সকল (৩২+)', icon: 'verified' },
    { id: 'football', label: 'শিয়ালকোল ফুটবল স্কোয়াড', icon: 'sports_soccer' },
    { id: 'cricket', label: 'ক্রিকেট টিম', icon: 'sports_cricket' },
    { id: 'indoor', label: 'ইনডোর স্পোর্টস', icon: 'sports_tennis' },
    { id: 'coach', label: 'কোচিং স্টাফ', icon: 'sports' },
  ] as const;

  const filteredSquad = useMemo(() => {
    const list = SQUAD_PLAYERS.filter((player) => {
      const matchesCategory = selectedCategory === 'all' || player.sport === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = player.name.toLowerCase().includes(query);
      const matchesJersey = player.jersey.toLowerCase().includes(query) || toBengaliDigits(player.jersey).includes(query);
      const matchesRole = player.role.toLowerCase().includes(query);
      const matchesAge = player.age ? (String(player.age).includes(query) || toBengaliDigits(player.age).includes(query)) : false;

      return matchesCategory && (matchesName || matchesJersey || matchesRole || matchesAge);
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'sl') {
        return (a.sl || 999) - (b.sl || 999);
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'bn');
      }
      if (sortBy === 'jersey') {
        return (parseInt(a.jersey, 10) || 999) - (parseInt(b.jersey, 10) || 999);
      }
      if (sortBy === 'age') {
        return (Number(b.age) || 0) - (Number(a.age) || 0);
      }
      return (a.sl || 999) - (b.sl || 999);
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const showCaptain = useMemo(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'football') return false;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      CAPTAIN_PLAYER.name.toLowerCase().includes(query) ||
      CAPTAIN_PLAYER.jersey.includes(query) ||
      CAPTAIN_PLAYER.role.toLowerCase().includes(query)
    );
  }, [selectedCategory, searchQuery]);

  const totalVisibleCount = (showCaptain ? 1 : 0) + filteredSquad.length;

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 1. SEARCH & CATEGORY FILTER BAR */}
      <section className="px-4 pt-3 pb-2 flex flex-col gap-2.5 bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] border-b border-black/[0.04]">
        {/* Search Input */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#3f4941]">
            <span className="material-symbols-outlined text-[20px]">person_search</span>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="খেলোয়াড়ের নাম বা জার্সি নং খুঁজুন..."
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-white text-[#131b2e] text-xs sm:text-sm placeholder:text-[#6f7a70] focus:outline-none focus:ring-2 focus:ring-[#005b34]/20 transition-all shadow-[0_2px_8px_rgba(15,81,50,0.04)] border border-[#bec9bf]/20"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="px-1.5 py-0.5 rounded bg-[#eaedff] text-[#3f4941] text-[10px] font-bold uppercase">
              #নং
            </span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 h-8 px-3 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#005b34] text-white shadow-sm scale-[1.02]'
                    : 'bg-[#eaedff] text-[#3f4941] hover:bg-[#dae2fd]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="px-4 flex flex-col gap-4 mt-2">
        {/* 2. FEATURED CAPTAIN SPOTLIGHT CARD */}
        {showCaptain && (
          <section className="pt-1">
            <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-[0_4px_16px_rgba(0,91,52,0.08)] border border-[#bec9bf]/20 flex flex-col">
              {/* Captain Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-[#fea619] text-[#684000] px-2.5 py-1 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  military_tech
                </span>
                <span className="text-[11px] font-bold tracking-wider uppercase">
                  ক্লাব দলনেতা • অধিনায়ক
                </span>
              </div>

              {/* Jersey Number Background & Photo */}
              <div className="relative w-full h-56 overflow-hidden bg-[#137547]">
                <img
                  src={CAPTAIN_PLAYER.image}
                  alt={CAPTAIN_PLAYER.name}
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-[#131b2e]/40 to-transparent" />
                <div className="absolute -right-4 -bottom-6 font-score text-[96px] text-white/15 select-none pointer-events-none leading-none font-black">
                  10
                </div>

                {/* Jersey Pill */}
                <div className="absolute bottom-3 right-3 bg-[#005b34] text-white font-score text-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md font-bold">
                  <span className="text-[#fea619]">#</span>10
                </div>

                {/* Sport Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[#005b34] text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">sports_soccer</span>
                  <span>ফুটবল একাদশ</span>
                </div>
              </div>

              {/* Captain Details & Stats */}
              <div className="p-3.5 flex flex-col gap-2.5 bg-white">
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <h2 className="text-base font-bold text-[#131b2e] tracking-tight">
                      {CAPTAIN_PLAYER.name}
                    </h2>
                    <p className="text-xs text-[#3f4941] flex items-center gap-1 mt-0.5">
                      <span>{CAPTAIN_PLAYER.role}</span>
                      <span className="w-1 h-1 rounded-full bg-[#bec9bf]" />
                      <span className="text-[#005b34] font-bold">শিয়ালকোল স্পোর্টস ক্লাব</span>
                    </p>
                  </div>

                  {/* Form Tracker */}
                  <div className="flex items-center gap-1 bg-[#f2f3ff] px-2 py-1 rounded-lg">
                    <span className="text-[10px] text-[#3f4941] mr-0.5 font-bold">ফর্ম</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#005b34]" title="Win/Goal" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#005b34]" title="Win/Goal" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fea619]" title="Draw/Assist" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#005b34]" title="Win/Goal" />
                  </div>
                </div>

                {/* Metric Strips */}
                <div className="grid grid-cols-3 gap-1 py-1 bg-[#f2f3ff] rounded-lg p-2 text-center">
                  <div className="flex flex-col">
                    <span className="font-score text-lg text-[#005b34] font-bold leading-tight">
                      ২৮
                    </span>
                    <span className="text-[10px] text-[#3f4941]">ম্যাচ খেলেছেন</span>
                  </div>
                  <div className="flex flex-col border-x border-[#bec9bf]/20 bg-white/40 rounded py-0.5">
                    <span className="font-score text-lg text-[#855300] font-bold leading-tight">
                      ১৯
                    </span>
                    <span className="text-[10px] text-[#3f4941]">গোল সংখ্যা</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-score text-lg text-[#005b34] font-bold leading-tight">
                      ০৭
                    </span>
                    <span className="text-[10px] text-[#3f4941]">অ্যাসিস্ট</span>
                  </div>
                </div>

                {/* Tournament Honors Tagline */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#e2e7ff] text-[#131b2e]">
                  <span className="material-symbols-outlined text-[18px] text-[#fea619] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                    emoji_events
                  </span>
                  <span className="text-xs truncate font-semibold">
                    {CAPTAIN_PLAYER.honors}
                  </span>
                </div>

                {/* Captain CTA */}
                <button
                  onClick={() => onSelectPlayer(CAPTAIN_PLAYER)}
                  className="w-full h-10 mt-0.5 rounded-lg bg-[#005b34] hover:bg-[#137547] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <span>সম্পূর্ণ অধিনায়ক প্রোফাইল</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 3. SQUAD ROSTER CONTROLS & HEADER */}
        <section className="flex flex-col gap-2 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-[#131b2e] tracking-tight">
                শিয়ালকোল খেলোয়াড় তালিকা
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#005b34] text-white text-[10px] font-bold">
                {toBengaliDigits(totalVisibleCount)} জন
              </span>
            </div>

            {/* Document Viewer Button */}
            <button
              onClick={() => setShowDocModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shadow-sm active:scale-95 transition-all border border-red-300/40"
              title="মূল তালিকা ডকুমেন্ট দেখুন"
            >
              <span className="material-symbols-outlined text-[14px]">description</span>
              <span>মূল ডকুমেন্ট (৩২ জন)</span>
            </button>
          </div>

          {/* View Mode & Sort Bar */}
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#bec9bf]/20 shadow-xs">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#f2f3ff] p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#005b34] text-white shadow-xs'
                    : 'text-[#3f4941] hover:text-[#005b34]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">table_rows</span>
                <span>তালিকা ভিউ</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-[#005b34] text-white shadow-xs'
                    : 'text-[#3f4941] hover:text-[#005b34]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">grid_view</span>
                <span>কার্ড ভিউ</span>
              </button>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => {
                const modes = ['sl', 'age', 'name', 'jersey'] as const;
                const nextIdx = (modes.indexOf(sortBy) + 1) % modes.length;
                setSortBy(modes[nextIdx]);
                const label = modes[nextIdx] === 'sl' ? 'ক্রমিক #১-৩২' : modes[nextIdx] === 'age' ? 'বয়স' : modes[nextIdx] === 'name' ? 'নাম' : 'জার্সি';
                onShowToast(`সর্ট করা হয়েছে: ${label}`);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#005b34] text-xs font-bold hover:bg-[#dae2fd] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>
                সর্ট: {sortBy === 'sl' ? 'ক্রঃ #' : sortBy === 'age' ? 'বয়স' : sortBy === 'name' ? 'নাম' : 'জার্সি'}
              </span>
            </button>
          </div>
        </section>

        {/* 4. PLAYER LIST RENDER (TABLE OR CARDS) */}
        {filteredSquad.length === 0 && !showCaptain ? (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center rounded-xl bg-white border border-[#bec9bf]/20 mt-2">
            <div className="w-14 h-14 rounded-full bg-[#e2e7ff] flex items-center justify-center text-[#3f4941] mb-2">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <h5 className="text-sm font-bold text-[#131b2e]">কোন খেলোয়াড় পাওয়া যায়নি</h5>
            <p className="text-xs text-[#3f4941] mt-1 max-w-xs">
              অনুগ্রহ করে অন্য নাম বা জার্সি নম্বর দিয়ে পুনরায় অনুসন্ধান করুন।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-[#eaedff] text-[#005b34] text-xs font-bold hover:bg-[#dae2fd]"
            >
              সকল ফিল্টার মুছুন
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* OFFICIAL SQUAD ROSTER TABLE (NAME, AGE, JERSEY, POSITION) */
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#bec9bf]/20">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[340px]">
                <thead>
                  <tr className="bg-gradient-to-r from-[#005b34] to-[#137547] text-white text-[11px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-2.5 text-center w-10">ক্রঃ</th>
                    <th className="py-2.5 px-3">খেলোয়াড়ের নাম</th>
                    <th className="py-2.5 px-2 text-center">বয়স</th>
                    <th className="py-2.5 px-2 text-center">জার্সি</th>
                    <th className="py-2.5 px-2">পজিশন</th>
                    <th className="py-2.5 px-2.5 text-center">প্রোফাইল</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaedff] text-xs">
                  {filteredSquad.map((player) => (
                    <tr
                      key={player.id}
                      onClick={() => onSelectPlayer(player)}
                      className="hover:bg-emerald-50/70 active:bg-emerald-100/60 transition-colors cursor-pointer group"
                    >
                      {/* Serial Number */}
                      <td className="py-2 px-2.5 text-center font-bold text-[#005b34] bg-emerald-50/30">
                        {player.sl ? toBengaliDigits(player.sl) : '-'}
                      </td>

                      {/* Name & Avatar */}
                      <td className="py-2 px-3 font-extrabold text-[#131b2e]">
                        <div className="flex items-center gap-2">
                          <img
                            src={player.image}
                            alt={player.name}
                            className="w-7 h-7 rounded-full object-cover ring-1 ring-[#005b34]/20 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="block truncate text-xs sm:text-sm font-bold text-[#131b2e] group-hover:text-[#005b34]">
                              {player.name}
                            </span>
                            {player.village && (
                              <span className="text-[10px] text-[#3f4941] block truncate leading-none">
                                {player.village}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Age (Highlighted in Red Badge) */}
                      <td className="py-2 px-2 text-center">
                        <span className="inline-block px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-extrabold text-[11px] border border-red-200">
                          {player.age ? `${toBengaliDigits(player.age)}` : '-'}
                        </span>
                      </td>

                      {/* Jersey */}
                      <td className="py-2 px-2 text-center">
                        <span className="px-1.5 py-0.5 rounded bg-[#f2f3ff] text-[#005b34] font-bold text-[10px]">
                          #{player.jersey}
                        </span>
                      </td>

                      {/* Position */}
                      <td className="py-2 px-2 text-[#3f4941] font-semibold text-[11px] truncate max-w-[110px]">
                        {player.role}
                      </td>

                      {/* Action */}
                      <td className="py-2 px-2.5 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPlayer(player);
                          }}
                          className="px-2 py-1 rounded-md bg-[#005b34] hover:bg-[#137547] text-white text-[10px] font-bold flex items-center justify-center gap-0.5 mx-auto active:scale-95 transition-all shadow-2xs"
                        >
                          <span>দেখুন</span>
                          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ATHLETIC CARD VIEW (2-COLUMN GRID WITH AGE & STATS) */
          <div className="grid grid-cols-2 gap-2.5">
            {filteredSquad.map((player) => {
              const isCoachCard = player.isCoach;
              return (
                <div
                  key={player.id}
                  onClick={() => onSelectPlayer(player)}
                  className={`flex rounded-xl overflow-hidden bg-white shadow-sm border border-[#bec9bf]/20 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                    isCoachCard ? 'col-span-2 flex-row p-3 gap-3 items-center' : 'flex-col'
                  }`}
                >
                  {isCoachCard ? (
                    // Coach Layout
                    <>
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#eaedff]">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute bottom-1 right-1 bg-[#fea619] text-[#684000] rounded p-0.5 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[14px]">sports</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-[#1a5939] text-white text-[10px] font-bold">
                              {player.role}
                            </span>
                            <span className="text-[#005b34] text-[10px] font-bold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">verified</span>
                              {player.license}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1 truncate">
                            {player.name}
                          </h4>
                          <p className="text-[11px] text-[#3f4941] truncate">{player.team}</p>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-[#3f4941]">
                            অভিজ্ঞতা: {player.experience}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPlayer(player);
                            }}
                            className="px-2.5 py-1 rounded-md bg-[#005b34] text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                          >
                            <span>পরিচিতি</span>
                            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Regular Squad Player Card (2-Col)
                    <>
                      <div className="relative w-full h-36 bg-[#eaedff]">
                        <img
                          src={player.image}
                          alt={player.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Jersey & SL Badge */}
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                          {player.sl && (
                            <span className="bg-black/60 text-white font-score text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                              #{toBengaliDigits(player.sl)}
                            </span>
                          )}
                          <span className="bg-white/95 text-[#005b34] font-score text-xs font-bold px-1.5 py-0.5 rounded shadow-xs">
                            #{player.jersey}
                          </span>
                        </div>

                        {/* Role Chip */}
                        <span className="absolute bottom-2 left-2 bg-[#005b34] text-white px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">
                            {player.sport === 'cricket' ? 'sports_cricket' : player.sport === 'football' ? 'sports_soccer' : 'sports_tennis'}
                          </span>
                          <span>{player.role}</span>
                        </span>
                      </div>

                      <div className="p-2.5 flex flex-col justify-between flex-1 gap-2">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-bold text-[#131b2e] leading-tight truncate">
                              {player.name}
                            </h4>
                            {player.age && (
                              <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-black flex-shrink-0">
                                {toBengaliDigits(player.age)} বছর
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#3f4941] block mt-0.5 truncate">{player.team}</span>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-1 bg-[#f2f3ff] p-1.5 rounded text-center">
                          {player.goals !== undefined ? (
                            <div>
                              <span className="block text-[9px] text-[#3f4941]">গোল</span>
                              <span className="font-score text-xs font-bold text-[#ba1a1a]">{toBengaliDigits(player.goals)}</span>
                            </div>
                          ) : player.cleanSheets ? (
                            <div>
                              <span className="block text-[9px] text-[#3f4941]">ক্লিনশিট</span>
                              <span className="font-score text-xs font-bold text-[#005b34]">{player.cleanSheets}</span>
                            </div>
                          ) : null}

                          {player.matches && (
                            <div>
                              <span className="block text-[9px] text-[#3f4941]">ম্যাচ</span>
                              <span className="font-score text-xs font-bold text-[#005b34]">{toBengaliDigits(player.matches)}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPlayer(player);
                          }}
                          className="w-full py-1.5 rounded-md bg-[#eaedff] hover:bg-[#005b34] hover:text-white text-[#005b34] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>প্রোফাইল</span>
                          <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 5. ORIGINAL DOCUMENT MODAL (৩২ খেলোয়াড় তালিকা) */}
        {showDocModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200"
            onClick={() => setShowDocModal(false)}
          >
            <div 
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3.5 bg-gradient-to-r from-[#005b34] to-[#137547] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">শিয়ালকোল খেলোয়াড় তালিকা</h3>
                    <p className="text-[10px] text-emerald-200">মূল অফিশিয়াল স্কোয়াড নথি (৩২ জন)</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDocModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="overflow-y-auto p-4 flex flex-col items-center bg-[#faf8ff]">
                <img
                  src={PLAYER_LIST_DOCUMENT}
                  alt="শিয়ালকোল খেলোয়াড় তালিকা ডকুমেন্ট"
                  className="w-full max-w-sm rounded-lg shadow-md border border-[#bec9bf]/40 object-contain"
                />
                <div className="w-full mt-3 p-3 bg-white rounded-xl border border-emerald-200 text-xs text-[#131b2e]">
                  <p className="font-bold text-[#005b34] flex items-center gap-1 mb-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>অফিশিয়াল ৩২ জন খেলোয়াড় তালিকাভুক্ত</span>
                  </p>
                  <p className="text-[11px] text-[#3f4941] leading-relaxed">
                    এই তালিকার সকল খেলোয়াড়ের নাম, বয়স, জার্সি নং ও পজিশন ডেটাবেজে সক্রিয় রয়েছে।
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white border-t border-[#bec9bf]/20 flex justify-end">
                <button
                  onClick={() => setShowDocModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-[#005b34] text-white text-xs font-bold"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. JOIN CLUB TRIAL CALLOUT */}
        <section className="pt-2">
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#005b34] to-[#1a5939] text-white shadow-md flex items-center justify-between gap-3 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-white/10 select-none pointer-events-none">
              <span className="material-symbols-outlined text-[85px]">workspace_premium</span>
            </div>
            <div className="flex flex-col min-w-0 z-10">
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-[#fea619] text-[#684000] text-[9px] font-black uppercase">
                  নতুন ট্রায়াল
                </span>
                <span className="text-[10px] text-white/80">২০২৫ সেশন</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                তুমি কি ক্লাবের অংশ হতে চাও?
              </h4>
              <p className="text-[11px] text-white/80 mt-0.5 line-clamp-1">
                অনূর্ধ্ব-১৬ ও অনূর্ধ্ব-১৯ ট্রায়ালে যোগ দিন
              </p>
            </div>
            <button
              onClick={onOpenTrialModal}
              className="flex-shrink-0 z-10 px-3.5 py-2 rounded-lg bg-[#fea619] hover:bg-[#855300] text-[#684000] hover:text-white text-xs font-bold shadow transition-colors whitespace-nowrap active:scale-95"
            >
              আবেদন করুন
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
