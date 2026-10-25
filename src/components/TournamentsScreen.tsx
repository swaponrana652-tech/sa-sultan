import React, { useState, useRef } from 'react';
import { LIVE_MATCH, STANDINGS, FIXTURES, toBengaliDigits } from '../data/mockData';
import { MatchScore, Fixture } from '../types';

interface TournamentsScreenProps {
  onOpenTeamRegistration: (tournamentTitle?: string) => void;
  onShowToast: (msg: string) => void;
  liveMatch?: MatchScore;
  fixtures?: Fixture[];
  onCheerMatch?: () => void;
}

export const TournamentsScreen: React.FC<TournamentsScreenProps> = ({
  onOpenTeamRegistration,
  onShowToast,
  liveMatch,
  fixtures,
  onCheerMatch,
}) => {
  const match = liveMatch || LIVE_MATCH;
  const currentFixtures = fixtures && fixtures.length > 0 ? fixtures : FIXTURES;
  const [activeSubTab, setActiveSubTab] = useState<'live' | 'upcoming' | 'history'>('live');
  const [cheers, setCheers] = useState(match.cheerCount || 142);
  const [isCheering, setIsCheering] = useState(false);
  const [cricketReminder, setCricketReminder] = useState(false);
  const [showFullStandings, setShowFullStandings] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [showRulebook, setShowRulebook] = useState(false);

  const liveRef = useRef<HTMLDivElement>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleSubTabChange = (tab: 'live' | 'upcoming' | 'history') => {
    setActiveSubTab(tab);
    if (tab === 'live' && liveRef.current) {
      liveRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'upcoming' && upcomingRef.current) {
      upcomingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'history' && historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCheer = () => {
    setCheers((prev) => prev + 1);
    setIsCheering(true);
    setTimeout(() => setIsCheering(false), 600);
    onShowToast('শিয়ালকোল দলকে চিয়ার করার জন্য ধন্যবাদ! ⚽🔥');
  };

  const toggleCricketReminder = () => {
    const next = !cricketReminder;
    setCricketReminder(next);
    if (next) {
      onShowToast('ম্যাচ শুরু হওয়ার ৩০ মিনিট পূর্বে অ্যালার্ট পাবেন!');
    } else {
      onShowToast('রিমাইন্ডার বাতিল করা হয়েছে।');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'শিয়ালকোল ক্রীড়া সংঘ টুর্নামেন্ট',
        text: 'চলতি টুর্নামেন্ট ও লাইভ স্কোর দেখুন শিয়ালকোল ক্লাবে!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      onShowToast('লিংক কপি করা হয়েছে!');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 1. SPORTS FILTER NAVIGATION RIBBON */}
      <section className="sticky top-16 z-40 bg-[#faf8ff]/95 backdrop-blur-md px-4 py-2 flex items-center justify-between gap-2 shadow-sm border-b border-black/[0.04]">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
          <button
            onClick={() => handleSubTabChange('live')}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              activeSubTab === 'live'
                ? 'bg-[#005b34] text-white'
                : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#fea619] animate-ping" />
            <span>চলমান ও লাইভ</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px]">১</span>
          </button>

          <button
            onClick={() => handleSubTabChange('upcoming')}
            className={`flex-shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeSubTab === 'upcoming'
                ? 'bg-[#005b34] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
            }`}
          >
            <span>আসন্ন টুর্নামেন্ট</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#d2d9f4] text-[#3f4941] text-[10px]">২</span>
          </button>

          <button
            onClick={() => handleSubTabChange('history')}
            className={`flex-shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeSubTab === 'history'
                ? 'bg-[#005b34] text-white shadow-sm'
                : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
            }`}
          >
            <span>পয়েন্ট ও ইতিহাস</span>
          </button>
        </div>
      </section>

      {/* 2. LIVE MATCH HERO CARD */}
      <div className="px-4 flex flex-col gap-5 mt-4">
        <div ref={liveRef} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#005b34] text-[22px]">sports_soccer</span>
              <h2 className="text-sm font-bold text-[#131b2e] tracking-tight">চলমান ফিচার্ড ম্যাচ</h2>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />
              লাইভ • ৬৭ মি:
            </span>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-white shadow-md border border-[#bec9bf]/20 flex flex-col">
            {/* Tournament Meta Bar */}
            <div className="bg-[#005b34] text-white px-3.5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined text-[18px] text-[#fea619]">emoji_events</span>
                <span className="text-xs font-bold truncate">শিয়ালকোল গোল্ডকাপ ফুটবল ২০২৫</span>
              </div>
              <span className="text-[10px] font-bold bg-[#fea619] text-[#684000] px-2 py-0.5 rounded-full flex-shrink-0">
                সেমিফাইনাল ২
              </span>
            </div>

            {/* Stadium Visual Banner */}
            <div className="relative w-full h-28 overflow-hidden bg-[#137547]">
              <img
                src={LIVE_MATCH.bannerImage}
                alt="Match Ground"
                className="w-full h-full object-cover opacity-40 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-2 px-3.5 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#131b2e] flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-[#005b34]">location_on</span>
                  {LIVE_MATCH.venue}
                </span>
                <span className="text-[10px] font-bold text-[#3f4941] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
                  দর্শক: ৪,৫০০+
                </span>
              </div>
            </div>

            {/* Versus Scoreboard Grid */}
            <div className="px-3.5 pt-1 pb-3.5 flex flex-col gap-3">
              <div className="grid grid-cols-7 items-center">
                {/* Home Team */}
                <div className="col-span-3 flex flex-col items-center text-center gap-0.5">
                  <div className="w-14 h-14 rounded-full bg-[#f2f3ff] flex items-center justify-center shadow-sm relative">
                    <span className="material-symbols-outlined text-[#005b34] text-[32px]">shield</span>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#005b34] text-white text-[10px] flex items-center justify-center font-bold">
                      শ
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#131b2e] mt-1 leading-snug">শিয়ালকোল ইয়ুথ</h3>
                  <span className="text-[10px] text-[#005b34] font-semibold">স্বাগতিক দল</span>
                </div>

                {/* Score Hub */}
                <div className="col-span-1 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1 text-2xl font-black text-[#131b2e] font-score">
                    <span className="text-[#005b34]">১</span>
                    <span className="text-[#bec9bf]">-</span>
                    <span>০</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#ba1a1a] bg-[#ffdad6]/60 px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap">
                    ২য় অর্ধার্ধ
                  </span>
                </div>

                {/* Away Team */}
                <div className="col-span-3 flex flex-col items-center text-center gap-0.5">
                  <div className="w-14 h-14 rounded-full bg-[#f2f3ff] flex items-center justify-center shadow-sm relative">
                    <span className="material-symbols-outlined text-[#855300] text-[32px]">sports_kabaddi</span>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#855300] text-white text-[10px] flex items-center justify-center font-bold">
                      স
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#131b2e] mt-1 leading-snug">সলঙ্গা রাইডার্স</h3>
                  <span className="text-[10px] text-[#3f4941]">আমন্ত্রিত একাদশ</span>
                </div>
              </div>

              {/* Goal Event Notification Tag */}
              <div className="bg-[#f2f3ff] rounded-lg p-2 flex items-center gap-2 border border-[#bec9bf]/20">
                <span className="material-symbols-outlined text-[#fea619] text-[20px]">sports</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#131b2e] truncate">
                    <span className="font-bold text-[#005b34]">গোল!</span> রাকিবুল হাসান (৩৪' মিনিট - হেডার)
                  </p>
                </div>
                <button
                  onClick={() => setShowReplay(true)}
                  className="text-[11px] font-bold text-[#005b34] bg-[#9cf6bc]/50 px-2 py-0.5 rounded hover:bg-[#9cf6bc] transition-colors"
                >
                  রিপ্লে
                </button>
              </div>

              {/* Mini Match Metric Tracker Strip */}
              <div className="bg-[#eaedff] rounded-lg p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs text-[#3f4941] px-1 font-semibold">
                  <span>ম্যাচ স্ট্যাটাস ও ট্র্যাকার</span>
                  <span className="text-[#005b34] font-bold font-score">৬৭:১২"</span>
                </div>

                {/* Stat Counters */}
                <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
                  <div className="bg-white rounded py-1.5 px-1 shadow-sm flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[#3f4941] text-[10px]">
                      <span className="w-2 h-3 rounded-[1px] bg-[#fea619] inline-block" />
                      <span>হলুদ কার্ড</span>
                    </div>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5 font-score">১ - ২</span>
                  </div>

                  <div className="bg-white rounded py-1.5 px-1 shadow-sm flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[#3f4941] text-[10px]">
                      <span className="material-symbols-outlined text-[14px] text-[#005b34]">flag</span>
                      <span>কর্নার</span>
                    </div>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5 font-score">৫ - ৩</span>
                  </div>

                  <div className="bg-white rounded py-1.5 px-1 shadow-sm flex flex-col items-center">
                    <div className="flex items-center gap-1 text-[#3f4941] text-[10px]">
                      <span className="material-symbols-outlined text-[14px] text-[#1a5939]">target</span>
                      <span>অন-টার্গেট</span>
                    </div>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5 font-score">৪ - ২</span>
                  </div>
                </div>

                {/* Possession Flow Bar */}
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex justify-between text-[10px] text-[#3f4941] font-semibold">
                    <span>বল দখল (Ball Possession)</span>
                    <span className="font-bold text-[#131b2e]">৫৬% : ৪৪%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#dae2fd] overflow-hidden flex">
                    <div className="h-full bg-[#005b34]" style={{ width: '56%' }} />
                    <div className="h-full bg-[#fea619]" style={{ width: '44%' }} />
                  </div>
                </div>
              </div>

              {/* Commentary Micro-feed & Cheer */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005b34] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#005b34]" />
                  </span>
                  <p className="text-xs text-[#3f4941] truncate max-w-[210px]">
                    {LIVE_MATCH.liveCommentary}
                  </p>
                </div>
                <button
                  onClick={handleCheer}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fea619] text-[#684000] text-xs font-bold shadow-sm active:scale-90 transition-transform ${
                    isCheering ? 'ring-2 ring-[#684000]' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">celebration</span>
                  <span>চিয়ার ({toBengaliDigits(cheers)})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. UPCOMING FIXTURES */}
        <div ref={upcomingRef} className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#855300] text-[22px]">event_upcoming</span>
              <h2 className="text-sm font-bold text-[#131b2e] tracking-tight">আসন্ন ক্রীড়া সূচি ও ফিক্সচার</h2>
            </div>
            <span className="text-xs text-[#005b34] font-bold">
              মোট: {toBengaliDigits(currentFixtures.length)}টি
            </span>
          </div>

          {currentFixtures.length === 0 ? (
            <div className="bg-white rounded-xl p-4 text-center text-xs text-[#3f4941] border border-[#bec9bf]/20">
              বর্তমানে কোনো আসন্ন ফিক্সচার নেই।
            </div>
          ) : (
            currentFixtures.map((fixture) => (
              <div
                key={fixture.id}
                className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bec9bf]/20 flex flex-col gap-2.5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[#005b34] bg-[#f2f3ff] px-2 py-0.5 rounded text-[11px] font-bold truncate max-w-[220px]">
                    <span className="material-symbols-outlined text-[15px]">sports_soccer</span>
                    <span className="truncate">{fixture.title}</span>
                  </span>
                  {fixture.matchNo ? (
                    <span className="bg-[#ffddb8] text-[#855300] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {fixture.matchNo}
                    </span>
                  ) : fixture.isRegistrationOpen ? (
                    <span className="bg-[#fea619] text-[#684000] text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                      রেজিস্ট্রেশন চলছে
                    </span>
                  ) : (
                    <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {fixture.tournamentType || 'ফিক্সচার'}
                    </span>
                  )}
                </div>

                {/* Team 1 vs Team 2 */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#9cf6bc] flex items-center justify-center text-xs font-bold text-[#002110] flex-shrink-0">
                      {fixture.team1?.badge || fixture.team1?.name?.slice(0, 2) || 'দ১'}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] truncate">{fixture.team1?.name}</span>
                      {fixture.team1?.captain && (
                        <span className="text-[10px] text-[#3f4941]">অধিনায়ক: {fixture.team1.captain}</span>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-[#3f4941] px-2 font-bold">বনাম</span>

                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end text-right">
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] truncate">{fixture.team2?.name}</span>
                      {fixture.team2?.captain && (
                        <span className="text-[10px] text-[#3f4941]">অধিনায়ক: {fixture.team2.captain}</span>
                      )}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#e2e7ff] flex items-center justify-center text-xs font-bold text-[#131b2e] flex-shrink-0">
                      {fixture.team2?.badge || fixture.team2?.name?.slice(0, 2) || 'দ২'}
                    </div>
                  </div>
                </div>

                {/* Date & Details */}
                <div className="bg-[#f2f3ff] rounded-lg p-2.5 flex items-center justify-between mt-0.5 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 text-[#3f4941]">
                    <span className="material-symbols-outlined text-[#855300] text-[18px]">calendar_month</span>
                    <span className="text-xs font-semibold text-[#131b2e]">
                      {fixture.date} • {fixture.time} {fixture.venue ? `(${fixture.venue})` : ''}
                    </span>
                  </div>

                  {fixture.isRegistrationOpen ? (
                    <button
                      onClick={() => onOpenTeamRegistration(fixture.title)}
                      className="px-3 py-1 rounded bg-[#005b34] hover:bg-[#137547] text-white text-[11px] font-bold inline-flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                    >
                      <span>দল নিবন্ধন</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      onClick={toggleCricketReminder}
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-white text-[#005b34] hover:bg-[#005b34] hover:text-white shadow-xs transition-all"
                    >
                      <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                      <span>রিমাইন্ডার</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 4. POINTS TABLE SNAPSHOT */}
        <div ref={historyRef} className="flex flex-col gap-2.5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#005b34] text-[22px]">format_list_numbered</span>
              <h2 className="text-sm font-bold text-[#131b2e] tracking-tight">পয়েন্ট টেবিল (গ্রুপ এ)</h2>
            </div>
            <span className="text-xs text-[#3f4941]">গোল্ডকাপ ২০২৫</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#bec9bf]/20 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#f2f3ff] px-3 py-2 text-[11px] font-bold text-[#3f4941]">
              <span className="col-span-6">দল (Club)</span>
              <span className="col-span-2 text-center">ম্যাচ</span>
              <span className="col-span-2 text-center">জয়-ড্র</span>
              <span className="col-span-2 text-right">পয়েন্ট</span>
            </div>

            {/* Table Rows */}
            {STANDINGS.map((row) => (
              <div
                key={row.rank}
                className={`grid grid-cols-12 px-3 py-2.5 items-center border-t border-[#eaedff] ${
                  row.isLeader ? 'bg-[#9cf6bc]/15 font-bold' : ''
                }`}
              >
                <div className="col-span-6 flex items-center gap-1.5 min-w-0">
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold flex-shrink-0 ${
                      row.isLeader
                        ? 'bg-[#005b34] text-white'
                        : 'bg-[#eaedff] text-[#131b2e]'
                    }`}
                  >
                    {toBengaliDigits(row.rank)}
                  </span>
                  <span className={`text-xs truncate ${row.isLeader ? 'text-[#005b34]' : 'text-[#131b2e]'}`}>
                    {row.team}
                  </span>
                </div>
                <span className="col-span-2 text-center text-xs text-[#131b2e]">
                  {toBengaliDigits(row.played)}
                </span>
                <span className="col-span-2 text-center text-xs text-[#3f4941]">
                  {row.wonDraw}
                </span>
                <span className={`col-span-2 text-right text-xs font-bold ${
                  row.isLeader ? 'text-[#005b34]' : 'text-[#131b2e]'
                }`}>
                  {toBengaliDigits(row.points)}
                </span>
              </div>
            ))}

            <div className="p-2 bg-[#f2f3ff] text-center border-t border-[#eaedff]">
              <button
                onClick={() => setShowFullStandings(!showFullStandings)}
                className="text-xs text-[#005b34] font-bold hover:underline inline-flex items-center gap-1"
              >
                {showFullStandings ? 'সংক্ষিপ্ত ভিউ' : 'সম্পূর্ণ গ্রুপ তালিকা ও গোল ব্যবধান দেখুন'}
                <span className="material-symbols-outlined text-[14px]">
                  {showFullStandings ? 'expand_less' : 'chevron_right'}
                </span>
              </button>
            </div>

            {/* Expanded Standings details */}
            {showFullStandings && (
              <div className="p-3 bg-white border-t border-[#eaedff] text-xs text-[#3f4941] space-y-1.5">
                <p className="font-semibold text-[#005b34]">গোল ব্যবধান পরিসংখ্যান (GD Stats):</p>
                {STANDINGS.map((s) => (
                  <div key={s.team} className="flex justify-between items-center text-[11px] py-1 border-b border-[#f2f3ff]">
                    <span>{s.team}</span>
                    <span>গোল: {toBengaliDigits(s.goalsFor || 0)} - {toBengaliDigits(s.goalsAgainst || 0)} (GD: {toBengaliDigits(s.goalDiff || 0)})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 5. REGISTRATION CTA BANNER */}
        <div
          id="register-banner"
          className="relative rounded-2xl bg-gradient-to-br from-[#005b34] to-[#137547] text-white p-4 shadow-lg overflow-hidden flex flex-col gap-2 mt-2"
        >
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#fea619]/20 pointer-events-none blur-xl" />
          <div className="absolute right-3 top-3 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[80px]">sports_volleyball</span>
          </div>

          <div className="inline-flex items-center gap-1 bg-[#fea619] text-[#684000] px-2.5 py-0.5 rounded-full text-[10px] self-start font-bold uppercase">
            <span className="material-symbols-outlined text-[13px]">how_to_reg</span>
            নতুন সিজন রেজিস্ট্রেশন
          </div>

          <h3 className="text-base sm:text-lg font-black tracking-tight max-w-[85%] leading-snug">
            আপনার টিম কি চ্যাম্পিয়ন হতে প্রস্তুত?
          </h3>

          <p className="text-xs text-white/90 max-w-[90%] leading-relaxed">
            শিয়ালকোল প্রিমিয়ার শীতকালীন ব্যাডমিন্টন ও ভলিবল ২০২৫-এর জন্য ক্লাব বা পাড়া ভিত্তিক দল নিবন্ধন চলছে। সীমিত আসন!
          </p>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/70 uppercase">নিবন্ধনের শেষ সময়</span>
              <span className="text-xs font-bold text-[#fea619]">১০ ডিসেম্বর ২০২৫</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => onOpenTeamRegistration('শিয়ালকোল প্রিমিয়ার ২০২৫')}
              className="flex-1 min-h-[44px] bg-[#fea619] hover:bg-[#855300] text-[#684000] hover:text-white text-xs font-bold rounded-lg py-2.5 px-3 text-center shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">app_registration</span>
              <span>টিম নিবন্ধন করুন</span>
            </button>
            <button
              onClick={handleShare}
              aria-label="শেয়ার করুন"
              className="w-11 h-11 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center active:scale-95 transition-all flex-shrink-0"
              title="টুর্নামেন্ট শেয়ার করুন"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {/* 6. RULEBOOK CARD */}
        <div className="bg-[#eaedff] rounded-xl p-3.5 flex items-center justify-between border border-[#bec9bf]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#fea619]/20 flex items-center justify-center text-[#855300] flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">policy</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">টুর্নামেন্টের নিয়মাবলী ও হ্যান্ডবুক</span>
              <span className="text-[10px] text-[#3f4941]">প্লেয়ার ড্রাফট ও আচরণবিধি ২০২৫</span>
            </div>
          </div>
          <button
            onClick={() => setShowRulebook(true)}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#005b34] shadow-sm hover:bg-[#005b34] hover:text-white transition-all active:scale-95 flex-shrink-0"
            title="হ্যান্ডবুক ডাউনলোড"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
        </div>
      </div>

      {/* Goal Replay Simulator Modal */}
      {showReplay && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl relative text-center">
            <button
              onClick={() => setShowReplay(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f4941]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-[#9cf6bc]/40 text-[#005b34] mx-auto flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[28px]">sports_soccer</span>
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">গোল সিমুলেশন ও বর্ণনা</h3>
            <p className="text-xs text-[#3f4941] mt-2 leading-relaxed">
              ৩৪' মিনিটে বাম প্রান্ত থেকে মিডফিল্ডার আরিফুল হকের চমৎকার মাপা ক্রসে ভেসে আসা বল পেনাল্টি বক্সে অসাধারণ হেডে জালে জড়ান স্ট্রাইকার রাকিবুল হাসান।
            </p>
            <button
              onClick={() => setShowReplay(false)}
              className="mt-4 w-full py-2 bg-[#005b34] text-white rounded-lg text-xs font-bold"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {/* Rulebook Modal */}
      {showRulebook && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl relative">
            <button
              onClick={() => setShowRulebook(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f4941]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#855300]">verified</span>
              <h3 className="text-base font-bold text-[#131b2e]">টুর্নামেন্ট আচরণবিধি ২০২৫</h3>
            </div>
            <ul className="text-xs text-[#3f4941] space-y-1.5 list-disc pl-4 mt-2">
              <li>সকল খেলোয়াড়কে জাতীয় পরিচয়পত্র বা জন্মনিবন্ধন প্রদর্শন করতে হবে।</li>
              <li>ম্যাচ শুরুর ৩০ মিনিট পূর্বে রিপোর্টিং করতে হবে।</li>
              <li>রেফারি ও আম্পায়ারদের সিদ্ধান্ত চূড়ান্ত বলে গণ্য হবে।</li>
              <li>শৃঙ্খলাভঙ্গে যেকোনো দল সরাসরি বহিষ্কার হতে পারে।</li>
            </ul>
            <button
              onClick={() => {
                onShowToast('হ্যান্ডবুক PDF ডাউনলোড শুরু হয়েছে...');
                setShowRulebook(false);
              }}
              className="mt-4 w-full py-2 bg-[#005b34] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>PDF ডাউনলোড করুন (৮৫০ KB)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
