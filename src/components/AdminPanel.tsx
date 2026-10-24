import React, { useState } from 'react';
import { CONVENER_DATA, CLUB_LOGO, toBengaliDigits } from '../data/mockData';
import { MatchScore, ClubNotice, MembershipApplication, TeamRegistration } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  liveMatch: MatchScore;
  onUpdateLiveMatch: (updatedMatch: MatchScore) => void;
  notices: ClubNotice[];
  onAddNotice: (notice: ClubNotice) => void;
  membershipApplications: MembershipApplication[];
  onUpdateApplicationStatus: (id: string, status: 'approved' | 'rejected') => void;
  teamRegistrations: TeamRegistration[];
  onUpdateTeamStatus: (id: string, status: 'approved') => void;
  onShowToast: (msg: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  liveMatch,
  onUpdateLiveMatch,
  notices,
  onAddNotice,
  membershipApplications,
  onUpdateApplicationStatus,
  teamRegistrations,
  onUpdateTeamStatus,
  onShowToast,
}) => {
  const [adminTab, setAdminTab] = useState<'score' | 'members' | 'teams' | 'notices' | 'convener'>('score');

  // Match edit state
  const [homeScore, setHomeScore] = useState(liveMatch.homeTeam.score);
  const [awayScore, setAwayScore] = useState(liveMatch.awayTeam.score);
  const [matchMinute, setMatchMinute] = useState(liveMatch.matchMinute || '৬৭:১২"');
  const [matchStatus, setMatchStatus] = useState<'live' | 'completed'>(liveMatch.status === 'completed' ? 'completed' : 'live');
  const [goalScorer, setGoalScorer] = useState('রাকিবুল হাসান (৩৪\' মিনিট - হেডার)');
  const [possessionHome, setPossessionHome] = useState(liveMatch.stats?.possessionHome || 56);

  // New notice state
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState('টুর্নামেন্ট');
  const [newNoticeDesc, setNewNoticeDesc] = useState('');

  if (!isOpen) return null;

  const handleSaveMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: MatchScore = {
      ...liveMatch,
      status: matchStatus,
      matchMinute: matchMinute,
      highlightEvent: goalScorer,
      homeTeam: {
        ...liveMatch.homeTeam,
        score: homeScore,
      },
      awayTeam: {
        ...liveMatch.awayTeam,
        score: awayScore,
      },
      stats: {
        yellowCards: liveMatch.stats?.yellowCards || '১ - ২',
        corners: liveMatch.stats?.corners || '৫ - ৩',
        onTarget: liveMatch.stats?.onTarget || '৪ - ২',
        possessionHome: possessionHome,
        possessionAway: 100 - possessionHome,
      },
    };
    onUpdateLiveMatch(updated);
    onShowToast('লাইভ ম্যাচ স্কোর ও তথ্য সফলভাবে আপডেট হয়েছে!');
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    const notice: ClubNotice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: 'আজ, ২০২৬',
      description: newNoticeDesc || 'আহ্বায়ক মোঃ আনিসুর রহমানের নির্দেশক্রমে প্রকাশিত।',
      fileSize: '১.১ মেগাবাইট (PDF)',
    };
    onAddNotice(notice);
    setNewNoticeTitle('');
    setNewNoticeDesc('');
    onShowToast('নতুন নোটিশ সফলভাবে নোটিশবোর্ডে প্রকাশিত হয়েছে! 📢');
  };

  const pendingMembersCount = membershipApplications.filter((m) => m.status === 'pending').length;
  const pendingTeamsCount = teamRegistrations.filter((t) => t.status === 'pending').length;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-[#faf8ff] w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Convener Authority Header */}
        <div className="bg-gradient-to-r from-[#005b34] via-[#137547] to-[#1a5939] text-white p-4 relative overflow-hidden flex-shrink-0">
          <div className="flex items-center justify-between pb-3 border-b border-white/15">
            <div className="flex items-center gap-2.5">
              <img
                src={CLUB_LOGO}
                alt="SSA Logo"
                className="w-10 h-10 rounded-full object-cover bg-white ring-2 ring-[#fea619] shadow"
              />
              <div className="min-w-0">
                <span className="bg-[#fea619] text-[#684000] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                  অ্যাডমিন কন্ট্রোল প্যানেল
                </span>
                <h2 className="text-base font-black truncate leading-tight mt-0.5">
                  শিয়ালকোল স্পোর্টস অ্যাসোসিয়েশন
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Convener Identity Profile Strip */}
          <div className="mt-3 flex items-center justify-between bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-lg bg-white/20 p-0.5 ring-1 ring-[#fea619] overflow-hidden flex-shrink-0">
                <img
                  src={CONVENER_DATA.image}
                  alt={CONVENER_DATA.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-white">{CONVENER_DATA.name}</h3>
                  <span className="bg-[#fea619] text-[#684000] text-[9px] font-black px-1.5 py-0.2 rounded font-score">
                    ২০২৬
                  </span>
                </div>
                <p className="text-[10px] text-[#9cf6bc] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">verified_user</span>
                  <span>{CONVENER_DATA.role} • {CONVENER_DATA.committee}</span>
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-white/80 bg-white/10 px-2 py-1 rounded">
              সিরাজগঞ্জ সদর
            </span>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-1.5 mt-3 text-center text-white">
            <div className="bg-black/20 rounded-lg p-1.5">
              <span className="text-[10px] text-white/70 block">আবেদন</span>
              <span className="text-xs font-bold text-[#fea619]">
                {toBengaliDigits(membershipApplications.length)}টি
              </span>
            </div>
            <div className="bg-black/20 rounded-lg p-1.5">
              <span className="text-[10px] text-white/70 block">অপেক্ষমাণ</span>
              <span className="text-xs font-bold text-[#ffdad6]">
                {toBengaliDigits(pendingMembersCount)}টি
              </span>
            </div>
            <div className="bg-black/20 rounded-lg p-1.5">
              <span className="text-[10px] text-white/70 block">টিম এন্ট্রি</span>
              <span className="text-xs font-bold text-[#9cf6bc]">
                {toBengaliDigits(teamRegistrations.length)}টি
              </span>
            </div>
            <div className="bg-black/20 rounded-lg p-1.5">
              <span className="text-[10px] text-white/70 block">নোটিশ</span>
              <span className="text-xs font-bold text-white">
                {toBengaliDigits(notices.length)}টি
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#eaedff] px-2 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-[#bec9bf]/20">
          <button
            onClick={() => setAdminTab('score')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              adminTab === 'score' ? 'bg-[#005b34] text-white shadow-sm' : 'text-[#3f4941] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">sports_soccer</span>
            <span>লাইভ স্কোর কন্ট্রোল</span>
          </button>

          <button
            onClick={() => setAdminTab('members')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 relative ${
              adminTab === 'members' ? 'bg-[#005b34] text-white shadow-sm' : 'text-[#3f4941] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>সদস্য আবেদন</span>
            {pendingMembersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[9px] flex items-center justify-center font-bold">
                {toBengaliDigits(pendingMembersCount)}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('teams')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              adminTab === 'teams' ? 'bg-[#005b34] text-white shadow-sm' : 'text-[#3f4941] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">groups</span>
            <span>টিম রেজিস্ট্রেশন</span>
            {pendingTeamsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#fea619] text-[#684000] text-[9px] flex items-center justify-center font-bold">
                {toBengaliDigits(pendingTeamsCount)}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminTab('notices')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              adminTab === 'notices' ? 'bg-[#005b34] text-white shadow-sm' : 'text-[#3f4941] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">campaign</span>
            <span>নোটিশ প্রকাশ</span>
          </button>

          <button
            onClick={() => setAdminTab('convener')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              adminTab === 'convener' ? 'bg-[#005b34] text-white shadow-sm' : 'text-[#3f4941] hover:bg-white/50'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>আহ্বায়ক ২০২৬</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 flex-1 overflow-y-auto no-scrollbar space-y-4">
          {/* TAB 1: LIVE SCORE CONTROLLER */}
          {adminTab === 'score' && (
            <form onSubmit={handleSaveMatch} className="space-y-4">
              <div className="bg-white p-3.5 rounded-xl border border-[#bec9bf]/20 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#005b34] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">scoreboard</span>
                    ম্যাচ স্কোর পরিচালনা (শিয়ালকোল গোল্ডকাপ)
                  </h4>
                  <select
                    value={matchStatus}
                    onChange={(e) => setMatchStatus(e.target.value as any)}
                    className="text-xs font-bold px-2 py-1 rounded bg-[#eaedff] text-[#005b34] outline-none"
                  >
                    <option value="live">চলমান (LIVE)</option>
                    <option value="completed">সমাপ্ত (FT)</option>
                  </select>
                </div>

                {/* Score Modifier Row */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Home Score */}
                  <div className="bg-[#f2f3ff] p-3 rounded-lg text-center flex flex-col items-center">
                    <span className="text-xs font-bold text-[#005b34]">শিয়ালকোল ইয়ুথ (হোম)</span>
                    <div className="flex items-center gap-3 my-2">
                      <button
                        type="button"
                        onClick={() => setHomeScore(Math.max(0, homeScore - 1))}
                        className="w-8 h-8 rounded-full bg-white hover:bg-[#ffdad6] text-[#ba1a1a] font-bold text-lg shadow-sm flex items-center justify-center active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-3xl font-black text-[#005b34] font-score">{homeScore}</span>
                      <button
                        type="button"
                        onClick={() => setHomeScore(homeScore + 1)}
                        className="w-8 h-8 rounded-full bg-[#005b34] hover:bg-[#137547] text-white font-bold text-lg shadow-sm flex items-center justify-center active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Away Score */}
                  <div className="bg-[#f2f3ff] p-3 rounded-lg text-center flex flex-col items-center">
                    <span className="text-xs font-bold text-[#855300]">সলঙ্গা রাইডার্স (অতিথি)</span>
                    <div className="flex items-center gap-3 my-2">
                      <button
                        type="button"
                        onClick={() => setAwayScore(Math.max(0, awayScore - 1))}
                        className="w-8 h-8 rounded-full bg-white hover:bg-[#ffdad6] text-[#ba1a1a] font-bold text-lg shadow-sm flex items-center justify-center active:scale-95"
                      >
                        -
                      </button>
                      <span className="text-3xl font-black text-[#855300] font-score">{awayScore}</span>
                      <button
                        type="button"
                        onClick={() => setAwayScore(awayScore + 1)}
                        className="w-8 h-8 rounded-full bg-[#855300] hover:bg-[#684000] text-white font-bold text-lg shadow-sm flex items-center justify-center active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Match Minute */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3f4941] mb-1">
                      ম্যাচ মিনিট / অর্ধার্ধ
                    </label>
                    <input
                      type="text"
                      value={matchMinute}
                      onChange={(e) => setMatchMinute(e.target.value)}
                      placeholder={'উদা: ৭২:১৫" বা ফুল টাইম'}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#f2f3ff] text-xs font-bold outline-none border border-[#bec9bf]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#3f4941] mb-1">
                      হোম দখল (Possession %)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="20"
                        max="80"
                        value={possessionHome}
                        onChange={(e) => setPossessionHome(parseInt(e.target.value, 10))}
                        className="flex-1 accent-[#005b34]"
                      />
                      <span className="text-xs font-bold text-[#005b34] font-score">{possessionHome}%</span>
                    </div>
                  </div>
                </div>

                {/* Goal Scorer & Event */}
                <div>
                  <label className="block text-[11px] font-bold text-[#3f4941] mb-1">
                    সর্বশেষ গোল বা ইভেন্ট হাইলাইট
                  </label>
                  <input
                    type="text"
                    value={goalScorer}
                    onChange={(e) => setGoalScorer(e.target.value)}
                    placeholder="উদা: তানভীর আহমেদ (৬২' মিনিট - ফ্রি কিক)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#f2f3ff] text-xs outline-none border border-[#bec9bf]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#005b34] hover:bg-[#137547] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>লাইভ আপডেট প্রকাশ করুন</span>
              </button>
            </form>
          )}

          {/* TAB 2: MEMBERSHIP APPLICATIONS */}
          {adminTab === 'members' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#005b34] uppercase tracking-wider">
                  সদস্যপদ আবেদন তালিকা ({toBengaliDigits(membershipApplications.length)})
                </h4>
                <span className="text-[10px] text-[#3f4941]">অনুমোদনের জন্য ক্লিক করুন</span>
              </div>

              <div className="space-y-2">
                {membershipApplications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white p-3 rounded-xl border border-[#bec9bf]/20 shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-[#131b2e]">{app.name}</h5>
                          <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold uppercase ${
                            app.membershipType === 'lifetime'
                              ? 'bg-[#fea619] text-[#684000]'
                              : 'bg-[#eaedff] text-[#005b34]'
                          }`}>
                            {app.membershipType === 'lifetime' ? 'আজীবন' : 'সাধারণ'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#3f4941] flex items-center gap-2 mt-0.5">
                          <span>ফোন: {app.phone}</span>
                          <span>•</span>
                          <span>খেলা: {app.sport}</span>
                          <span>•</span>
                          <span className="text-[#ba1a1a] font-bold">রক্ত: {app.bloodGroup}</span>
                        </p>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status === 'approved'
                          ? 'bg-[#9cf6bc]/40 text-[#005b34]'
                          : app.status === 'rejected'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#fea619]/20 text-[#855300]'
                      }`}>
                        {app.status === 'approved' ? 'অনুমোদিত' : app.status === 'rejected' ? 'বাতিল' : 'অপেক্ষমাণ'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-[10px] text-[#3f4941]">
                      <span>আবেদনের তারিখ: {app.date}</span>
                      <div className="flex gap-1.5">
                        {app.status !== 'approved' && (
                          <button
                            onClick={() => {
                              onUpdateApplicationStatus(app.id, 'approved');
                              onShowToast(`${app.name}-এর আবেদন অনুমোদন করা হয়েছে!`);
                            }}
                            className="px-2.5 py-1 rounded bg-[#005b34] text-white font-bold hover:bg-[#137547] transition-colors"
                          >
                            অনুমোদন দিন
                          </button>
                        )}
                        {app.status === 'pending' && (
                          <button
                            onClick={() => {
                              onUpdateApplicationStatus(app.id, 'rejected');
                              onShowToast(`${app.name}-এর আবেদন বাতিল করা হয়েছে।`);
                            }}
                            className="px-2 py-1 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold hover:bg-[#ba1a1a] hover:text-white transition-colors"
                          >
                            বাতিল
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAM REGISTRATIONS */}
          {adminTab === 'teams' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#005b34] uppercase tracking-wider">
                  টুর্নামেন্টে নিবন্ধিত দলসমূহ ({toBengaliDigits(teamRegistrations.length)})
                </h4>
                <span className="text-[10px] text-[#3f4941]">আহ্বায়ক কমিটি অনুমোদনাধীন</span>
              </div>

              <div className="space-y-2">
                {teamRegistrations.map((team) => (
                  <div
                    key={team.id}
                    className="bg-white p-3 rounded-xl border border-[#bec9bf]/20 shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-xs sm:text-sm font-bold text-[#131b2e] flex items-center gap-1.5">
                          <span>{team.teamName}</span>
                          <span className="text-[10px] font-semibold text-[#005b34] bg-[#9cf6bc]/30 px-1.5 py-0.2 rounded">
                            {team.tournament}
                          </span>
                        </h5>
                        <p className="text-[11px] text-[#3f4941] mt-0.5">
                          ম্যানেজার: <strong>{team.managerName}</strong> • ফোন: {team.contactNumber} • দল সদস্য: {team.playerCount}
                        </p>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        team.status === 'approved'
                          ? 'bg-[#9cf6bc]/40 text-[#005b34]'
                          : 'bg-[#fea619]/20 text-[#855300]'
                      }`}>
                        {team.status === 'approved' ? 'কনফার্মড' : 'অপেক্ষমাণ'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-[10px] text-[#3f4941]">
                      <span>নিবন্ধন তারিখ: {team.date}</span>
                      {team.status !== 'approved' && (
                        <button
                          onClick={() => {
                            onUpdateTeamStatus(team.id, 'approved');
                            onShowToast(`"${team.teamName}" দলের এন্ট্রি কনফার্ম করা হয়েছে! 🏆`);
                          }}
                          className="px-2.5 py-1 rounded bg-[#005b34] text-white font-bold hover:bg-[#137547] transition-colors"
                        >
                          এন্ট্রি নিশ্চিত করুন
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTICE PUBLISH */}
          {adminTab === 'notices' && (
            <div className="space-y-4">
              <form onSubmit={handlePublishNotice} className="bg-white p-3.5 rounded-xl border border-[#bec9bf]/20 shadow-sm space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#005b34] text-[20px]">add_circle</span>
                  <h4 className="text-xs font-bold text-[#131b2e]">নতুন নোটিশ ও প্রেস বিজ্ঞপ্তি প্রকাশ</h4>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3f4941] mb-1">
                    নোটিশ শিরোনাম <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    placeholder="উদা: আহ্বায়ক কমিটি ২০২৬-এর প্রথম সাধারণ সভা সংক্রান্ত নোটিশ"
                    className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs outline-none border border-[#bec9bf]/20 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#3f4941] mb-1">ক্যাটাগরি</label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-[#f2f3ff] text-xs outline-none border border-[#bec9bf]/20 focus:bg-white"
                    >
                      <option value="আহ্বায়ক বিজ্ঞপ্তি">আহ্বায়ক বিজ্ঞপ্তি ২০২৬</option>
                      <option value="টুর্নামেন্ট">টুর্নামেন্ট</option>
                      <option value="মেম্বারশিপ">মেম্বারশিপ</option>
                      <option value="সাধারণ সভা">সাধারণ সভা</option>
                      <option value="জরুরি">জরুরি সার্কুলার</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#3f4941] mb-1">স্বাক্ষরকারী</label>
                    <input
                      disabled
                      type="text"
                      value="মোঃ আনিসুর রহমান (আহ্বায়ক)"
                      className="w-full px-2.5 py-2 rounded-lg bg-[#eaedff] text-xs text-[#005b34] font-bold border border-[#bec9bf]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#3f4941] mb-1">বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={3}
                    value={newNoticeDesc}
                    onChange={(e) => setNewNoticeDesc(e.target.value)}
                    placeholder="নোটিশের বিস্তারিত বক্তব্য এখানে লিখুন..."
                    className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs outline-none border border-[#bec9bf]/20 focus:bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#005b34] hover:bg-[#137547] text-white font-bold text-xs sm:text-sm rounded-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>নোটিশবোর্ডে তাৎক্ষণিক প্রকাশ করুন</span>
                </button>
              </form>

              {/* Existing Notices overview */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-bold text-[#3f4941] uppercase">বর্তমানে সক্রিয় নোটিশসমূহ</h5>
                {notices.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-lg bg-white border border-[#bec9bf]/20 text-xs flex justify-between items-center">
                    <span className="font-semibold text-[#131b2e] truncate max-w-[280px]">{n.title}</span>
                    <span className="text-[10px] text-[#005b34] font-bold px-1.5 py-0.5 rounded bg-[#9cf6bc]/30">{n.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONVENER 2026 PROFILE */}
          {adminTab === 'convener' && (
            <div className="bg-white p-4 rounded-xl border border-[#bec9bf]/20 shadow-sm space-y-3">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto p-1 bg-gradient-to-tr from-[#005b34] to-[#fea619] shadow-md mb-2">
                  <img
                    src={CONVENER_DATA.image}
                    alt={CONVENER_DATA.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="bg-[#fea619] text-[#684000] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                  আহ্বায়ক • ২০২৬ মেয়াদ
                </span>
                <h3 className="text-base font-black text-[#131b2e] mt-1">{CONVENER_DATA.name}</h3>
                <p className="text-xs text-[#005b34] font-bold">{CONVENER_DATA.nameEn}</p>
                <p className="text-[11px] text-[#3f4941]">শিয়ালকোল স্পোর্টস অ্যাসোসিয়েশন (EST 2020)</p>
              </div>

              <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#bec9bf]/20 text-xs text-[#3f4941] space-y-1.5 leading-relaxed italic">
                <div className="flex items-center gap-1 text-[#855300] font-bold not-italic text-[11px]">
                  <span className="material-symbols-outlined text-[16px]">format_quote</span>
                  <span>আহ্বায়কের নির্দেশনা বাণী ২০২৬:</span>
                </div>
                <p>{CONVENER_DATA.message}</p>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-lg bg-[#faf8ff] border border-[#bec9bf]/20 flex items-center justify-between">
                  <span className="text-[#3f4941]">কমিটির ধরণ</span>
                  <span className="font-bold text-[#005b34]">{CONVENER_DATA.committee}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#faf8ff] border border-[#bec9bf]/20 flex items-center justify-between">
                  <span className="text-[#3f4941]">অফিসিয়াল ফোন</span>
                  <span className="font-bold text-[#131b2e] font-mono">{CONVENER_DATA.phone}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#faf8ff] border border-[#bec9bf]/20 flex items-center justify-between">
                  <span className="text-[#3f4941]">ইমেইল</span>
                  <span className="font-bold text-[#005b34]">{CONVENER_DATA.email}</span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[10px] text-[#6f7a70] block">
                  সিরাজগঞ্জ জেলা ক্রীড়া সংস্থা অধিভুক্ত • শিয়ালকোল সদর
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Return Button */}
        <div className="p-3 bg-[#eaedff] border-t border-[#bec9bf]/20 flex justify-between items-center flex-shrink-0">
          <span className="text-[10px] text-[#3f4941] font-semibold">
            লগইন অবস্থা: <strong>মোঃ আনিসুর রহমান (আহ্বায়ক ২০২৬)</strong>
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#005b34] text-white text-xs font-bold shadow hover:bg-[#137547] active:scale-95 transition-all"
          >
            পাবলিক ভিউতে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};
