import React, { useState } from 'react';
import { CLUB_LOGO, NEWS_STORIES, GALLERY_MOMENTS } from '../data/mockData';
import { TabType } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenPhoto: (photo: { title: string; sub?: string; image: string; caption?: string }) => void;
  onShowToast: (msg: string) => void;
  onOpenAdmin?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onOpenPhoto,
  onShowToast,
  onOpenAdmin,
}) => {
  const [reminderSet, setReminderSet] = useState(false);
  const [selectedNews, setSelectedNews] = useState<typeof NEWS_STORIES[0] | null>(null);
  const [showHighlights, setShowHighlights] = useState(false);

  const toggleReminder = () => {
    const nextState = !reminderSet;
    setReminderSet(nextState);
    if (nextState) {
      onShowToast('১৫ নভেম্বর ম্যাচের জন্য রিমাইন্ডার সক্রিয় করা হয়েছে! 🔔');
    } else {
      onShowToast('রিমাইন্ডার বন্ধ করা হয়েছে।');
    }
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 1. CLUB HERO BANNER - RED & GREEN THEME */}
      <section className="relative w-full bg-gradient-to-br from-[#005a30] via-[#016838] to-[#013f20] px-4 pt-5 pb-6 overflow-hidden shadow-xl border-b-4 border-red-600">
        {/* Red & Green ambient circles for Bangladesh / Sports motif */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-red-600/30 blur-2xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 w-32 h-32 rounded-full bg-red-500/20 blur-xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-40 h-40 rounded-full bg-emerald-400/15 blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex items-start gap-3.5">
          {/* Logo with red ring & est tag */}
          <div className="relative flex-shrink-0 w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white p-1 shadow-2xl ring-4 ring-red-600 flex items-center justify-center overflow-hidden">
            <img
              alt="শিয়ালকোল ক্রীড়া সংঘ ক্রেস্ট"
              className="w-full h-full object-cover rounded-full"
              src={CLUB_LOGO}
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </span>
          </div>

          <div className="flex flex-col justify-center min-w-0 flex-1">
            {/* Red Badge for EST 2020 */}
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                EST ২০২০
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                সিরাজগঞ্জ সদর
              </span>
            </div>

            {/* Prominent Club Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              শিয়ালকোল <span className="text-red-400 drop-shadow">ক্রীড়া সংঘ</span>
            </h1>

            {/* Slogan */}
            <p className="text-xs text-emerald-100 font-semibold mt-1 flex items-center gap-1.5 line-clamp-1">
              <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
              ঐতিহ্য ও তারুণ্যের শক্তিতে জাগ্রত
            </p>
          </div>
        </div>

        {/* QUICK STATS TILES (RED & GREEN THEMED) */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-emerald-950/70 backdrop-blur-sm rounded-xl p-2.5 text-center shadow-sm border-t-2 border-red-500">
            <span className="text-xl font-black text-white block leading-none font-score">১২টি</span>
            <span className="text-[10px] text-emerald-300 mt-1 block font-bold">চ্যাম্পিয়ন ট্রফি</span>
          </div>
          <div className="bg-emerald-950/70 backdrop-blur-sm rounded-xl p-2.5 text-center shadow-sm border-t-2 border-emerald-400">
            <span className="text-xl font-black text-red-400 block leading-none font-score">৪৫০+</span>
            <span className="text-[10px] text-emerald-300 mt-1 block font-bold">সক্রিয় খেলোয়াড়</span>
          </div>
          <div className="bg-emerald-950/70 backdrop-blur-sm rounded-xl p-2.5 text-center shadow-sm border-t-2 border-red-500">
            <span className="text-xl font-black text-white block leading-none font-score">২০২০</span>
            <span className="text-[10px] text-emerald-300 mt-1 block font-bold">প্রতিষ্ঠা (EST)</span>
          </div>
        </div>

        {/* Convener Leadership Strip - Red & Green Styled */}
        <div className="mt-3.5 bg-gradient-to-r from-emerald-950/90 via-black/40 to-red-950/50 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between gap-2 border border-red-500/30 shadow-md">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0 shadow">
              <span className="material-symbols-outlined text-[18px]">shield_person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider flex items-center gap-1">
                আহ্বায়ক কমিটি ২০২৬
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-xs font-black text-white truncate">আহ্বায়ক: মোঃ আনিসুর রহমান</span>
            </div>
          </div>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 active:scale-95 transition-all shadow-md border border-red-300/40"
              title="আহ্বায়ক অ্যাডমিন প্যানেল"
            >
              <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
              অ্যাডমিন
            </button>
          )}
        </div>
      </section>

      {/* 2. QUICK ACTION PILLS (HORIZONTAL SCROLL - RED & GREEN ACCENTS) */}
      <section className="w-full px-4 -mt-3.5 z-20">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold shadow-md active:scale-95 transition-transform border border-red-400/40"
            >
              <span className="material-symbols-outlined text-[17px] text-white">admin_panel_settings</span>
              অ্যাডমিন ২০২৬
            </button>
          )}
          <button
            onClick={() => onNavigateTab('tournaments')}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#005b34] text-white text-xs font-bold shadow-md active:scale-95 transition-transform border border-emerald-400/30"
          >
            <span className="material-symbols-outlined text-[18px] text-red-400">sensors</span>
            লাইভ স্কোর
          </button>
          <button
            onClick={() => onNavigateTab('tournaments')}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#005b34] text-xs font-bold shadow-sm active:scale-95 transition-transform border border-red-200 hover:border-red-400"
          >
            <span className="material-symbols-outlined text-[18px] text-red-600">calendar_month</span>
            আসন্ন ম্যাচ
          </button>
          <button
            onClick={() => onNavigateTab('club-contact')}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#131b2e] text-xs font-bold shadow-sm active:scale-95 transition-transform border border-emerald-200 hover:border-emerald-400"
          >
            <span className="material-symbols-outlined text-[18px] text-[#005b34]">how_to_reg</span>
            সদস্যপদ ফর্ম
          </button>
          <button
            onClick={() => onOpenPhoto(GALLERY_MOMENTS[0])}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#131b2e] text-xs font-bold shadow-sm active:scale-95 transition-transform border border-red-200 hover:border-red-400"
          >
            <span className="material-symbols-outlined text-[18px] text-red-600">photo_library</span>
            ফটো গ্যালারি
          </button>
        </div>
      </section>

      {/* 3. MATCH HIGHLIGHT / LIVE SCORECARD WIDGET */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse" />
            <span className="text-sm font-bold text-[#131b2e] tracking-tight">
              ম্যাচ ফলাফল ও লাইভ আপডেট
            </span>
          </div>
          <span className="text-xs text-[#005b34] font-bold">ফুটবল</span>
        </div>

        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bec9bf]/20 overflow-hidden relative">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#eaedff]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffddb8] text-[#855300] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">trophy</span>
              শিয়ালকোল গোল্ডকাপ ২০২৫ - ফাইনাল
            </div>
            <span className="text-[10px] text-[#3f4941] font-bold uppercase">ফুল টাইম (FT)</span>
          </div>

          {/* Teams & Scores */}
          <div className="grid grid-cols-7 items-center gap-2 py-1">
            {/* Team 1: Shialkol */}
            <div className="col-span-3 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white p-0.5 flex items-center justify-center mb-1 shadow-md ring-1 ring-[#005b34]/20 overflow-hidden">
                <img
                  alt="শিয়ালকোল একাদশ ক্রেস্ট"
                  className="w-full h-full object-cover rounded-full"
                  src={CLUB_LOGO}
                />
              </div>
              <span className="text-sm font-bold text-[#005b34] leading-tight line-clamp-1">
                শিয়ালকোল
              </span>
              <span className="text-[10px] text-[#3f4941]">হোম একাদশ</span>
            </div>

            {/* Scoreboard Center */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-[#005b34] font-score">২</span>
                <span className="text-lg font-bold text-[#bec9bf]">-</span>
                <span className="text-2xl font-black text-[#3f4941] font-score">১</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#e2e7ff] text-[#3f4941] text-[9px] font-bold mt-0.5 whitespace-nowrap">
                ৮৪' শেষ গোল
              </span>
            </div>

            {/* Team 2: Kazipur */}
            <div className="col-span-3 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#eaedff] p-1 flex items-center justify-center mb-1 shadow-inner">
                <div className="w-9 h-9 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#005b34] font-bold text-xs">
                  কেএস
                </div>
              </div>
              <span className="text-sm font-bold text-[#131b2e] leading-tight line-clamp-1">
                কাজিপুর স্পোর্টিং
              </span>
              <span className="text-[10px] text-[#3f4941]">অতিথি দল</span>
            </div>
          </div>

          {/* Match Key Event Strip */}
          <div className="mt-3 p-2 rounded-lg bg-[#eaedff] flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#fea619] flex items-center justify-center text-[#684000]">
                <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
              </span>
              <p className="text-xs text-[#131b2e] truncate">
                <strong className="font-bold text-[#005b34]">৮৪' মিনিটে গোল!</strong> সাকিব হোসেন (শিয়ালকোল)
              </p>
            </div>
            <button
              onClick={() => setShowHighlights(true)}
              className="flex-shrink-0 text-xs font-bold text-[#005b34] px-2 py-1 rounded hover:bg-white active:scale-95 transition-all"
            >
              হাইলাইটস
            </button>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING FIXTURE BANNER */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-[#131b2e] tracking-tight">পরবর্তী ফিক্সচার</h3>
          <button
            onClick={() => onNavigateTab('tournaments')}
            className="text-xs text-[#005b34] font-bold flex items-center hover:underline"
          >
            সকল ফিক্সচার <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="bg-[#f2f3ff] rounded-xl p-3.5 shadow-sm border border-[#bec9bf]/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#855300] text-[20px]">sports_cricket</span>
              <span className="text-xs font-bold text-[#855300]">আন্তঃইউনিয়ন ক্রিকেট ২০২৫</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#005b34]/10 text-[#005b34] text-[10px] font-bold">
              টি-২০ টুর্নামেন্ট
            </span>
          </div>

          <div className="mt-2.5 flex items-center justify-between bg-white p-3 rounded-lg border border-[#bec9bf]/10">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-lg bg-[#005b34]/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[#005b34] text-[22px]">event</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#131b2e] truncate">১৫ নভেম্বর, ২০২৫</p>
                <p className="text-[11px] text-[#3f4941] flex items-center gap-1 truncate mt-0.5">
                  <span className="material-symbols-outlined text-[13px] text-[#005b34]">location_on</span>
                  শিয়ালকোল হাই স্কুল মাঠ
                </p>
              </div>
            </div>

            <button
              onClick={toggleReminder}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1 ${
                reminderSet
                  ? 'bg-[#9cf6bc] text-[#002110]'
                  : 'bg-[#005b34] text-white hover:bg-[#137547]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {reminderSet ? 'check_circle' : 'notifications_active'}
              </span>
              <span>{reminderSet ? 'যুক্ত আছে' : 'রিমাইন্ডার'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. LATEST CLUB NEWS & ANNOUNCEMENTS */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#005b34] text-[20px]">campaign</span>
            <h3 className="text-sm font-bold text-[#131b2e] tracking-tight">ক্লাব নোটিশ ও সংবাদ</h3>
          </div>
          <button
            onClick={() => onNavigateTab('club-contact')}
            className="text-xs text-[#005b34] font-bold hover:underline"
          >
            সবগুলো দেখুন
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {NEWS_STORIES.map((news) => (
            <article
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#bec9bf]/20 flex gap-3 items-start cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#eaedff]">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#9cf6bc] text-[#00522f] text-[10px] font-bold">
                    {news.category}
                  </span>
                  <span className="text-[10px] text-[#3f4941]">{news.timeAgo}</span>
                </div>
                <h4 className="text-xs font-bold text-[#131b2e] leading-snug line-clamp-2">
                  {news.title}
                </h4>
                <p className="text-[11px] text-[#3f4941] mt-1 line-clamp-2 leading-relaxed">
                  {news.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. PHOTO GALLERY HIGHLIGHTS */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#855300] text-[20px]">photo_camera</span>
            <h3 className="text-sm font-bold text-[#131b2e] tracking-tight">গ্যালারি ও স্মরণীয় মুহূর্ত</h3>
          </div>
          <span className="text-xs text-[#3f4941]">মুহূর্তসমূহ</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {GALLERY_MOMENTS.map((moment) => (
            <div
              key={moment.id}
              onClick={() => onOpenPhoto(moment)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#bec9bf]/20 flex flex-col cursor-pointer group hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="relative w-full h-28 bg-[#eaedff] overflow-hidden">
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] font-bold backdrop-blur-sm">
                  {moment.tag}
                </span>
              </div>
              <div className="p-2">
                <p className="text-xs font-bold text-[#131b2e] truncate">{moment.title}</p>
                <span className="text-[10px] text-[#3f4941] mt-0.5 block">{moment.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CLUB MOTTO CALLOUT */}
      <section className="px-4 mt-6">
        <div className="bg-[#eaedff] rounded-xl p-4 text-center shadow-sm border border-[#bec9bf]/20">
          <span className="material-symbols-outlined text-[#005b34] text-[32px] mb-1">sports</span>
          <h4 className="text-sm font-black text-[#005b34]">
            "মাঠ হোক মাদক ও হতাশার বিরুদ্ধে সেরা আশ্রয়"
          </h4>
          <p className="text-xs text-[#3f4941] mt-1 max-w-xs mx-auto">
            শিয়ালকোল ইউনিয়নের তরুণদের সুস্থ ক্রীড়া চর্চায় আমরা প্রতিশ্রুতিবদ্ধ
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-[#005b34] text-[10px] font-bold mt-2 shadow-sm border border-[#bec9bf]/20">
            <span className="material-symbols-outlined text-[13px] text-[#fea619]">verified</span>
            <span>আহ্বায়ক: মোঃ আনিসুর রহমান (২০২৬)</span>
          </div>
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => onNavigateTab('club-contact')}
              className="px-5 py-2 rounded-lg bg-[#005b34] hover:bg-[#137547] text-white text-xs font-bold shadow-md active:scale-95 transition-transform"
            >
              ক্লাবে যোগ দিন
            </button>
          </div>
        </div>
      </section>

      {/* News Details Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f4941]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="w-full h-44 rounded-xl overflow-hidden mb-3 bg-[#eaedff]">
              <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
            </div>
            <span className="px-2 py-0.5 rounded bg-[#9cf6bc] text-[#00522f] text-[10px] font-bold">
              {selectedNews.category}
            </span>
            <h3 className="text-base font-bold text-[#131b2e] mt-1 mb-2">{selectedNews.title}</h3>
            <p className="text-xs text-[#3f4941] leading-relaxed">{selectedNews.content}</p>
            <button
              onClick={() => setSelectedNews(null)}
              className="mt-4 w-full py-2 bg-[#005b34] text-white rounded-lg text-xs font-bold"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {/* Match Highlights Modal */}
      {showHighlights && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 shadow-2xl relative">
            <button
              onClick={() => setShowHighlights(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f4941]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#005b34]">smart_display</span>
              <h3 className="text-base font-bold text-[#131b2e]">ম্যাচ হাইলাইটস ও গোল টাইমলাইন</h3>
            </div>
            <div className="space-y-2 text-xs text-[#3f4941]">
              <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
                <span>২৪' মিনিটে প্রথম গোল (শিয়ালকোল)</span>
                <span className="font-bold text-[#005b34]">তানভীর আহমেদ</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center justify-between">
                <span>৫১' সমতাসূচক গোল (কাজিপুর)</span>
                <span className="font-bold text-[#ba1a1a]">ইমন রানা</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#9cf6bc]/30 flex items-center justify-between border border-[#9cf6bc]">
                <span>৮৪' বিজয়ী হেডার গোল!</span>
                <span className="font-black text-[#005b34]">সাকিব হোসেন</span>
              </div>
            </div>
            <p className="text-[11px] text-[#3f4941] mt-3">
              পূর্ণাঙ্গ ভিডিও রেকর্ডিং ক্লাব আর্কাইভ ও ইউটিউব চ্যানেলে সংরক্ষিত আছে।
            </p>
            <button
              onClick={() => setShowHighlights(false)}
              className="mt-4 w-full py-2 bg-[#005b34] text-white rounded-lg text-xs font-bold"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
