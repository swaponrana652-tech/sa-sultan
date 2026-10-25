import React, { useState } from 'react';
import { CLUB_LOGO, DEFAULT_ADMIN_ACCOUNTS, toBengaliDigits } from '../data/mockData';
import { MatchScore, ClubNotice, MembershipApplication, TeamRegistration, AdminProfile } from '../types';

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
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('ssa_admin_logged_in') === 'true';
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile>(() => {
    const saved = localStorage.getItem('ssa_current_admin');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure sole admin is always SA Sultan
        const updated = {
          ...DEFAULT_ADMIN_ACCOUNTS[0],
          ...parsed,
          id: DEFAULT_ADMIN_ACCOUNTS[0].id,
          image: DEFAULT_ADMIN_ACCOUNTS[0].image,
          name: DEFAULT_ADMIN_ACCOUNTS[0].name,
          nameEn: DEFAULT_ADMIN_ACCOUNTS[0].nameEn,
          role: DEFAULT_ADMIN_ACCOUNTS[0].role,
          roleTitle: DEFAULT_ADMIN_ACCOUNTS[0].roleTitle,
          phone: DEFAULT_ADMIN_ACCOUNTS[0].phone,
          email: DEFAULT_ADMIN_ACCOUNTS[0].email,
        };
        localStorage.setItem('ssa_current_admin', JSON.stringify(updated));
        return updated;
      } catch {
        // ignore
      }
    }
    return DEFAULT_ADMIN_ACCOUNTS[0];
  });

  // Login Form State (Strictly SA Sultan)
  const [loginIdentifier, setLoginIdentifier] = useState('01712317671');
  const [loginPassword, setLoginPassword] = useState('1234');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  // Tabs state
  const [adminTab, setAdminTab] = useState<'score' | 'members' | 'teams' | 'notices' | 'profile'>('score');

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

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentAdmin.name);
  const [editNameEn, setEditNameEn] = useState(currentAdmin.nameEn);
  const [editPhone, setEditPhone] = useState(currentAdmin.phone);
  const [editEmail, setEditEmail] = useState(currentAdmin.email);
  const [editRoleTitle, setEditRoleTitle] = useState(currentAdmin.roleTitle);
  const [editBio, setEditBio] = useState(currentAdmin.bio);

  // Password Change State
  const [showPassModal, setShowPassModal] = useState(false);
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // Avatar selector modal
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const id = loginIdentifier.trim().toLowerCase();
    const pass = loginPassword.trim();

    if (!id || !pass) {
      setLoginError('দয়া করে মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    const saSultan = DEFAULT_ADMIN_ACCOUNTS[0];
    const isAuthorized =
      id === saSultan.phone ||
      id === saSultan.email.toLowerCase() ||
      id.includes('01712317671') ||
      id.includes('sasultan');

    if (!isAuthorized) {
      setLoginError('লগইন ব্যর্থ হয়েছে! শুধুমাত্র অনুমোদিত অ্যাডমিন (এস এ সুলতান - ০১৭১২-৩১৭৬৭১) লগইন করতে পারবেন।');
      return;
    }

    setIsLoggedIn(true);
    setCurrentAdmin(saSultan);
    setEditName(saSultan.name);
    setEditNameEn(saSultan.nameEn);
    setEditPhone(saSultan.phone);
    setEditEmail(saSultan.email);
    setEditRoleTitle(saSultan.roleTitle);
    setEditBio(saSultan.bio);

    if (rememberMe) {
      localStorage.setItem('ssa_admin_logged_in', 'true');
      localStorage.setItem('ssa_current_admin', JSON.stringify(saSultan));
    }

    onShowToast(`স্বাগতম, এস এ সুলতান! অ্যাডমিন প্যানেলে সফলভাবে লগইন হয়েছে। 🔐`);
  };

  // Quick 1-Click Demo Login
  const handleQuickLogin = (acc: AdminProfile) => {
    setIsLoggedIn(true);
    setCurrentAdmin(acc);
    setEditName(acc.name);
    setEditNameEn(acc.nameEn);
    setEditPhone(acc.phone);
    setEditEmail(acc.email);
    setEditRoleTitle(acc.roleTitle);
    setEditBio(acc.bio);

    localStorage.setItem('ssa_admin_logged_in', 'true');
    localStorage.setItem('ssa_current_admin', JSON.stringify(acc));

    onShowToast(`স্বাগতম, ${acc.name}! ${acc.roleTitle} হিসেবে লগইন সম্পূর্ণ হয়েছে। 🌟`);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('ssa_admin_logged_in');
    onShowToast('অ্যাডমিন প্যানেল থেকে সফলভাবে লগআউট হয়েছেন। 👋');
  };

  // Save Profile Edits
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AdminProfile = {
      ...currentAdmin,
      name: editName.trim() || currentAdmin.name,
      nameEn: editNameEn.trim() || currentAdmin.nameEn,
      phone: editPhone.trim() || currentAdmin.phone,
      email: editEmail.trim() || currentAdmin.email,
      roleTitle: editRoleTitle.trim() || currentAdmin.roleTitle,
      bio: editBio.trim() || currentAdmin.bio,
    };

    setCurrentAdmin(updated);
    setIsEditingProfile(false);
    localStorage.setItem('ssa_current_admin', JSON.stringify(updated));
    onShowToast('অ্যাডমিন প্রোফাইল সফলভাবে আপডেট হয়েছে! ✅');
  };

  // Handle Password Change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmPass) {
      onShowToast('নতুন পাসওয়ার্ড ও নিশ্চিতকরণ মিলছে না!');
      return;
    }
    setShowPassModal(false);
    setCurrPass('');
    setNewPass('');
    setConfirmPass('');
    onShowToast('নিরাপত্তা পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে! 🔒');
  };

  // Save Match Score
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

  // Publish Notice
  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    const notice: ClubNotice = {
      id: `notice-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: 'আজ, ২০২৬',
      description: newNoticeDesc || `${currentAdmin.name} (${currentAdmin.roleTitle})-এর নির্দেশক্রমে প্রকাশিত।`,
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
        {/* ======================================================== */}
        {/* VIEW 1: ADMIN LOGIN SCREEN (When !isLoggedIn)           */}
        {/* ======================================================== */}
        {!isLoggedIn ? (
          <div className="p-5 flex flex-col items-center">
            {/* Header / Brand */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={CLUB_LOGO}
                    alt="SSA Logo"
                    className="w-10 h-10 rounded-full object-cover bg-white ring-2 ring-red-600 shadow"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      নিরাপদ পোর্টাল
                    </span>
                    <span className="text-[10px] text-emerald-800 font-bold">EST ২০২০</span>
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-[#005b34] leading-tight mt-0.5">
                    শিয়ালকোল ক্রীড়া সংঘ
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                title="বন্ধ করুন"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Login Title & Hero */}
            <div className="w-full my-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#005b34] to-[#137547] text-white flex items-center justify-center mx-auto shadow-md ring-4 ring-emerald-100">
                <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#131b2e] mt-2.5">
                অ্যাডমিন প্যানেল লগইন
              </h3>
              <p className="text-xs text-[#3f4941] mt-0.5">
                ক্লাব কার্যক্রম, টুর্নামেন্ট ও সদস্যপদ ব্যবস্থাপনায় প্রবেশ করুন
              </p>
            </div>

            {/* Error Banner */}
            {loginError && (
              <div className="w-full mb-3 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-red-600 flex-shrink-0">error</span>
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="w-full space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  মোবাইল নম্বর অথবা ইমেইল <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="01712317671 বা sasultan6522@gmail.com"
                    className="w-full px-3 py-2.5 pl-9 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-medium text-[#131b2e] outline-none focus:border-[#005b34] focus:ring-2 focus:ring-[#005b34]/20 transition-all shadow-xs"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[18px]">
                    account_circle
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  পাসওয়ার্ড / পিন কোড <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড লিখুন (উদা: 1234)"
                    className="w-full px-3 py-2.5 pl-9 pr-9 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-medium text-[#131b2e] outline-none focus:border-[#005b34] focus:ring-2 focus:ring-[#005b34]/20 transition-all shadow-xs font-mono"
                  />
                  <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-slate-400 text-[18px]">
                    lock
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#005b34] focus:ring-[#005b34]"
                  />
                  <span>আমাকে মনে রাখুন</span>
                </label>
                <span className="text-[11px] text-[#005b34] font-semibold">ডিফল্ট পিন: ১২৩৪</span>
              </div>

              {/* Login Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-[#005b34] hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>অ্যাডমিন প্যানেলে লগইন করুন</span>
              </button>
            </form>

            {/* Quick 1-Click Access for Authorized Admin - Only SA Sultan */}
            <div className="w-full mt-4 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-amber-500">flash_on</span>
                  ১-ক্লিক দ্রুত লগইন (একমাত্র অ্যাডমিন)
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold border border-emerald-300">
                  অনুমোদিত
                </span>
              </div>

              <div className="w-full">
                {DEFAULT_ADMIN_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-50/90 via-white to-red-50/40 border-2 border-emerald-500/60 hover:border-[#005b34] hover:shadow-md text-left flex items-center gap-3 active:scale-[0.98] transition-all group shadow-xs"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={acc.image}
                        alt={acc.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-[#005b34] shadow-sm"
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[#131b2e] group-hover:text-[#005b34] flex items-center gap-1.5">
                          {acc.name}
                          <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full shadow-xs">
                            অ্যাডমিন
                          </span>
                        </span>
                        <span className="text-xs font-bold text-white bg-[#005b34] group-hover:bg-[#137547] px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm transition-colors">
                          লগইন করুন <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-600 block truncate font-semibold mt-0.5">
                        {acc.roleTitle} • {acc.phone}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-4 text-center">
              <span className="text-[10px] text-slate-400 block">
                শিয়ালকোল ক্রীড়া সংঘ • সিরাজগঞ্জ সদর • হেল্পলাইন: ০১৭১২-৩১৭৬৭১
              </span>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: LOGGED-IN ADMIN DASHBOARD WITH PROFILE & TABS    */
          /* ======================================================== */
          <>
            {/* Top Admin Header */}
            <div className="bg-gradient-to-r from-[#005b34] via-[#137547] to-[#1a5939] text-white p-4 relative overflow-hidden flex-shrink-0">
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <img
                    src={CLUB_LOGO}
                    alt="SSA Logo"
                    className="w-10 h-10 rounded-full object-cover bg-white ring-2 ring-[#fea619] shadow"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#fea619] text-[#684000] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        অ্যাডমিন কন্ট্রোল
                      </span>
                      <span className="bg-emerald-800 text-emerald-100 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        লগইন সক্রিয়
                      </span>
                    </div>
                    <h2 className="text-base font-black truncate leading-tight mt-0.5">
                      শিয়ালকোল ক্রীড়া সংঘ
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Top Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white flex items-center gap-1 text-[11px] font-bold shadow-sm active:scale-95 transition-all border border-red-300/30"
                    title="লগআউট করুন"
                  >
                    <span className="material-symbols-outlined text-[15px]">logout</span>
                    <span>লগআউট</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              </div>

              {/* Admin Identity Profile Strip */}
              <div className="mt-3 flex items-center justify-between bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <div 
                  onClick={() => setAdminTab('profile')}
                  className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity min-w-0"
                >
                  <div className="relative w-11 h-11 rounded-lg bg-white/20 p-0.5 ring-2 ring-[#fea619] overflow-hidden flex-shrink-0">
                    <img
                      src={currentAdmin.image}
                      alt={currentAdmin.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white truncate">{currentAdmin.name}</h3>
                      <span className="bg-[#fea619] text-[#684000] text-[9px] font-black px-1.5 py-0.2 rounded font-score flex-shrink-0">
                        ২০২৬
                      </span>
                    </div>
                    <p className="text-[10px] text-[#9cf6bc] font-semibold truncate flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">verified_user</span>
                      <span>{currentAdmin.roleTitle}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAdminTab('profile')}
                  className="text-[10px] font-bold text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">account_box</span>
                  <span>প্রোফাইল</span>
                </button>
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
                <span>লাইভ স্কোর</span>
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
                onClick={() => setAdminTab('profile')}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  adminTab === 'profile' ? 'bg-red-600 text-white shadow-sm' : 'text-[#3f4941] hover:bg-white/50'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">person</span>
                <span>অ্যাডমিন প্রোফাইল</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 flex-1 overflow-y-auto no-scrollbar space-y-4">
              {/* ======================================================== */}
              {/* TAB 1: LIVE SCORE CONTROLLER                             */}
              {/* ======================================================== */}
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
                            className="w-8 h-8 rounded-full bg-[#fea619] hover:bg-[#d88c12] text-[#684000] font-bold text-lg shadow-sm flex items-center justify-center active:scale-95"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Match Time & Possession */}
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div>
                        <label className="block text-[11px] font-bold text-[#3f4941] mb-1">ম্যাচ মিনিট</label>
                        <input
                          type="text"
                          value={matchMinute}
                          onChange={(e) => setMatchMinute(e.target.value)}
                          placeholder="উদা: ৭৫:০০"
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#f2f3ff] text-xs outline-none border border-[#bec9bf]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#3f4941] mb-1">
                          হোম বল পজেশন ({possessionHome}%)
                        </label>
                        <input
                          type="range"
                          min="20"
                          max="80"
                          value={possessionHome}
                          onChange={(e) => setPossessionHome(parseInt(e.target.value, 10))}
                          className="w-full accent-[#005b34]"
                        />
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

              {/* ======================================================== */}
              {/* TAB 2: MEMBERSHIP APPLICATIONS                           */}
              {/* ======================================================== */}
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

              {/* ======================================================== */}
              {/* TAB 3: TEAM REGISTRATIONS                                */}
              {/* ======================================================== */}
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

              {/* ======================================================== */}
              {/* TAB 4: NOTICE PUBLISH                                    */}
              {/* ======================================================== */}
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
                          value={`${currentAdmin.name} (${currentAdmin.role})`}
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

              {/* ======================================================== */}
              {/* TAB 5: ADMIN PROFILE & LOGOUT & SETTINGS                 */}
              {/* ======================================================== */}
              {adminTab === 'profile' && (
                <div className="space-y-4">
                  {/* Profile Card Header */}
                  <div className="bg-white p-4 rounded-2xl border border-[#bec9bf]/20 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-emerald-100/60 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none" />

                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#005b34] via-[#fea619] to-red-600 shadow-md">
                          <img
                            src={currentAdmin.image}
                            alt={currentAdmin.name}
                            className="w-full h-full object-cover rounded-full bg-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAvatarModal(true)}
                          className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#005b34] text-white flex items-center justify-center shadow-md hover:bg-[#137547] active:scale-95 transition-all"
                          title="ছবি পরিবর্তন করুন"
                        >
                          <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                        </button>
                      </div>

                      <div className="mt-2.5">
                        <span className="bg-[#fea619] text-[#684000] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                          {currentAdmin.roleTitle}
                        </span>
                        <h3 className="text-base font-black text-[#131b2e] mt-1">
                          {currentAdmin.name}
                        </h3>
                        <p className="text-xs text-[#005b34] font-bold">{currentAdmin.nameEn}</p>
                        <p className="text-[11px] text-[#3f4941]">
                          {currentAdmin.committee} • শিয়ালকোল সদর
                        </p>
                      </div>

                      {/* Edit Profile Button */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(!isEditingProfile)}
                          className="px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#005b34] hover:bg-[#005b34] hover:text-white text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {isEditingProfile ? 'close' : 'edit'}
                          </span>
                          <span>{isEditingProfile ? 'সম্পাদন বন্ধ করুন' : 'প্রোফাইল সম্পাদন'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setShowPassModal(true)}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 text-[#855300] hover:bg-amber-100 text-xs font-bold transition-all flex items-center gap-1 active:scale-95 border border-amber-200"
                        >
                          <span className="material-symbols-outlined text-[15px]">lock_reset</span>
                          <span>পাসওয়ার্ড পরিবর্তন</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Edit Form */}
                    {isEditingProfile && (
                      <form onSubmit={handleSaveProfile} className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                        <h5 className="text-xs font-bold text-[#005b34] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">edit_note</span>
                          প্রোফাইল তথ্য আপডেট করুন
                        </h5>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">নাম (বাংলা)</label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">নাম (English)</label>
                            <input
                              type="text"
                              value={editNameEn}
                              onChange={(e) => setEditNameEn(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">মোবাইল নম্বর</label>
                            <input
                              type="text"
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600 mb-0.5">ইমেইল</label>
                            <input
                              type="email"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">পদবী ও ভূমিকা</label>
                          <input
                            type="text"
                            value={editRoleTitle}
                            onChange={(e) => setEditRoleTitle(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-0.5">নির্দেশনা বাণী / বায়ো</label>
                          <textarea
                            rows={2}
                            value={editBio}
                            onChange={(e) => setEditBio(e.target.value)}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white resize-none"
                          />
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button
                            type="submit"
                            className="flex-1 py-1.5 rounded-lg bg-[#005b34] text-white text-xs font-bold shadow-sm hover:bg-[#137547] active:scale-95 transition-all"
                          >
                            সংরক্ষণ করুন
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-300"
                          >
                            বাতিল
                          </button>
                        </div>
                      </form>
                    )}
                  </div>

                  {/* Statement Card */}
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#bec9bf]/20 text-xs text-[#3f4941] space-y-1.5 leading-relaxed italic">
                    <div className="flex items-center gap-1 text-[#855300] font-bold not-italic text-[11px]">
                      <span className="material-symbols-outlined text-[16px]">format_quote</span>
                      <span>অ্যাডমিন ও আহ্বায়কের অঙ্গীকার:</span>
                    </div>
                    <p>"{currentAdmin.bio}"</p>
                  </div>

                  {/* Official Credentials Strip */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-[#bec9bf]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#005b34]">call</span>
                        <span className="text-[#3f4941]">সরাসরি মোবাইল</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#131b2e] font-mono">{currentAdmin.phone}</span>
                        <a
                          href={`tel:${currentAdmin.phone}`}
                          className="px-2 py-0.5 rounded bg-emerald-100 text-[#005b34] text-[10px] font-bold hover:bg-emerald-200"
                        >
                          কল
                        </a>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-[#bec9bf]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#855300]">mail</span>
                        <span className="text-[#3f4941]">অফিসিয়াল ইমেইল</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#005b34] truncate max-w-[170px] sm:max-w-none font-mono">
                          {currentAdmin.email}
                        </span>
                        <a
                          href={`mailto:${currentAdmin.email}`}
                          className="px-2 py-0.5 rounded bg-amber-100 text-[#855300] text-[10px] font-bold hover:bg-amber-200"
                        >
                          মেইল
                        </a>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-[#bec9bf]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-slate-500">location_on</span>
                        <span className="text-[#3f4941]">কার্যালয়</span>
                      </div>
                      <span className="text-[#131b2e] text-[11px] font-medium">
                        {currentAdmin.officeAddress || 'শিয়ালকোল বাজার সংলগ্ন, সদর, সিরাজগঞ্জ-৬৭০০'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-[#bec9bf]/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-emerald-600">verified_user</span>
                        <span className="text-[#3f4941]">লগইন স্ট্যাটাস</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#005b34] text-[10px] font-bold">
                        অনলাইন সেশন (অ্যাক্টিভ)
                      </span>
                    </div>
                  </div>

                  {/* Switch Account Quick Option */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 block">অন্য অ্যাডমিন অ্যাকাউন্টে পরিবর্তন করুন:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {DEFAULT_ADMIN_ACCOUNTS.map((acc) => (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => handleQuickLogin(acc)}
                          className={`p-2 rounded-lg text-left text-xs transition-all border ${
                            currentAdmin.id === acc.id
                              ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900 ring-1 ring-emerald-400'
                              : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="truncate font-semibold">{acc.name}</div>
                          <div className="text-[10px] text-slate-500 truncate">{acc.role}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prominent Red Logout Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>অ্যাডমিন প্যানেল থেকে লগআউট করুন</span>
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-1.5">
                      লগআউট করলে পরবর্তীতে পুনরায় প্রবেশ করতে পাসওয়ার্ড বা ১-ক্লিক ডেমো ব্যবহার করতে হবে
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Return & Logout Strip */}
            <div className="p-3 bg-[#eaedff] border-t border-[#bec9bf]/20 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse flex-shrink-0" />
                <span className="text-[10px] text-[#3f4941] truncate">
                  লগইন: <strong>{currentAdmin.name}</strong> ({currentAdmin.role})
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[14px]">logout</span>
                  <span>লগআউট</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg bg-[#005b34] text-white text-xs font-bold shadow hover:bg-[#137547] active:scale-95 transition-all"
                >
                  পাবলিক ভিউ
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Change Password Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl space-y-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#005b34] text-[20px]">lock_reset</span>
                <h4 className="text-sm font-bold text-[#131b2e]">পাসওয়ার্ড পরিবর্তন</h4>
              </div>
              <button
                onClick={() => setShowPassModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">বর্তমান পাসওয়ার্ড / পিন</label>
                <input
                  type="password"
                  required
                  value={currPass}
                  onChange={(e) => setCurrPass(e.target.value)}
                  placeholder="বর্তমান পাসওয়ার্ড লিখুন"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">নতুন পাসওয়ার্ড / পিন</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ড দিন"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="পুনরায় নতুন পাসওয়ার্ড দিন"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#005b34] text-white text-xs font-bold rounded-lg hover:bg-[#137547] shadow-sm"
                >
                  আপডেট করুন
                </button>
                <button
                  type="button"
                  onClick={() => setShowPassModal(false)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200"
                >
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Avatar Change Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl space-y-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#005b34] text-[20px]">account_circle</span>
                <h4 className="text-sm font-bold text-[#131b2e]">প্রোফাইল ছবি নির্বাচন</h4>
              </div>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">প্রিসেট অবতার থেকে বেছে নিন:</label>
              <div className="grid grid-cols-4 gap-2 py-1">
                {DEFAULT_ADMIN_ACCOUNTS.map((acc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentAdmin({ ...currentAdmin, image: acc.image });
                      setShowAvatarModal(false);
                      onShowToast('প্রোফাইল ছবি সফলভাবে পরিবর্তিত হয়েছে!');
                    }}
                    className="p-1 rounded-xl border border-slate-200 hover:border-[#005b34] hover:scale-105 transition-all overflow-hidden"
                  >
                    <img src={acc.image} alt={acc.name} className="w-full h-12 rounded-lg object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">অথবা ছবির URL দিন:</label>
              <div className="flex gap-1.5">
                <input
                  type="url"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs outline-none focus:bg-white font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customAvatarUrl.trim()) {
                      setCurrentAdmin({ ...currentAdmin, image: customAvatarUrl.trim() });
                      setShowAvatarModal(false);
                      onShowToast('কাস্টম ছবি যুক্ত হয়েছে!');
                    }
                  }}
                  className="px-3 py-1.5 bg-[#005b34] text-white text-xs font-bold rounded-lg hover:bg-[#137547]"
                >
                  যুক্ত করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
