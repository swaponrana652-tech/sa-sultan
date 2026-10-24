/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Player, ClubNotice, MatchScore, MembershipApplication, TeamRegistration } from './types';
import { LIVE_MATCH, NOTICES, INITIAL_MEMBERSHIP_APPLICATIONS, INITIAL_TEAM_REGISTRATIONS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { TournamentsScreen } from './components/TournamentsScreen';
import { PlayersScreen } from './components/PlayersScreen';
import { ClubContactScreen } from './components/ClubContactScreen';
import { PlayerModal } from './components/PlayerModal';
import { NoticeModal } from './components/NoticeModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { TeamRegistrationModal } from './components/TeamRegistrationModal';
import { NotificationModal } from './components/NotificationModal';
import { MembershipCardModal } from './components/MembershipCardModal';
import { TrialApplicationModal } from './components/TrialApplicationModal';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<ClubNotice | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    title: string;
    sub?: string;
    image: string;
    caption?: string;
  } | null>(null);

  // Live and Admin Data States
  const [liveMatch, setLiveMatch] = useState<MatchScore>(LIVE_MATCH);
  const [notices, setNotices] = useState<ClubNotice[]>(NOTICES);
  const [membershipApplications, setMembershipApplications] = useState<MembershipApplication[]>(
    INITIAL_MEMBERSHIP_APPLICATIONS
  );
  const [teamRegistrations, setTeamRegistrations] = useState<TeamRegistration[]>(
    INITIAL_TEAM_REGISTRATIONS
  );

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTeamRegOpen, setIsTeamRegOpen] = useState(false);
  const [preselectedTournament, setPreselectedTournament] = useState('বিজয় দিবস ব্যাডমিন্টন ২০২৫');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeamReg = (tournamentTitle?: string) => {
    if (tournamentTitle) setPreselectedTournament(tournamentTitle);
    setIsTeamRegOpen(true);
  };

  const handleNewApplication = (app: {
    name: string;
    phone: string;
    sport: string;
    bloodGroup: string;
    membershipType: 'general' | 'lifetime';
  }) => {
    const newApp: MembershipApplication = {
      id: `app-${Date.now()}`,
      name: app.name,
      phone: app.phone,
      sport: app.sport,
      bloodGroup: app.bloodGroup,
      membershipType: app.membershipType,
      date: 'আজ, ২০২৬',
      status: 'pending',
    };
    setMembershipApplications([newApp, ...membershipApplications]);
  };

  const handleUpdateApplicationStatus = (id: string, status: 'approved' | 'rejected') => {
    setMembershipApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleUpdateTeamStatus = (id: string, status: 'approved') => {
    setTeamRegistrations((prev) =>
      prev.map((team) => (team.id === id ? { ...team, status } : team))
    );
  };

  const handleAddNotice = (notice: ClubNotice) => {
    setNotices([notice, ...notices]);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex justify-center selection:bg-[#fea619]/30 selection:text-[#005b34]">
      {/* Mobile Shell Wrapper with max-w-md centered container */}
      <div className="w-full max-w-md bg-[#faf8ff] min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.08)] flex flex-col">
        {/* Fixed Header */}
        <Header
          activeTab={activeTab}
          onOpenNotifications={() => setIsNotifOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          unreadCount={2}
        />

        {/* Main Screen Content */}
        <main className="flex-1 w-full pt-16 bg-[#faf8ff]">
          {activeTab === 'home' && (
            <HomeScreen
              onNavigateTab={handleTabChange}
              onOpenPhoto={(photo) => setSelectedPhoto(photo)}
              onShowToast={showToast}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          )}

          {activeTab === 'tournaments' && (
            <TournamentsScreen
              onOpenTeamRegistration={handleOpenTeamReg}
              onShowToast={showToast}
              liveMatch={liveMatch}
            />
          )}

          {activeTab === 'players' && (
            <PlayersScreen
              onSelectPlayer={(p) => setSelectedPlayer(p)}
              onShowToast={showToast}
              onOpenTrialModal={() => setIsTrialOpen(true)}
            />
          )}

          {activeTab === 'club-contact' && (
            <ClubContactScreen
              onOpenNotice={(n) => setSelectedNotice(n)}
              onShowToast={showToast}
              notices={notices}
              onOpenAdmin={() => setIsAdminOpen(true)}
              onNewApplication={handleNewApplication}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav activeTab={activeTab} onChangeTab={handleTabChange} />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-[#faf8ff] px-4 py-2 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
            <span className="material-symbols-outlined text-[#fea619] text-[18px]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modals */}
        <PlayerModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onCheer={(name) => showToast(`${name}-কে আপনার শুভকামনা পৌঁছানো হয়েছে! 🌟`)}
        />

        <NoticeModal
          notice={selectedNotice}
          onClose={() => setSelectedNotice(null)}
        />

        <PhotoLightboxModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />

        <TeamRegistrationModal
          isOpen={isTeamRegOpen}
          preselectedTournament={preselectedTournament}
          onClose={() => setIsTeamRegOpen(false)}
          onSuccess={(team, tournament) => {
            const newTeam: TeamRegistration = {
              id: `team-${Date.now()}`,
              teamName: team,
              tournament: tournament,
              managerName: 'অনলাইন আবেদনকারী',
              contactNumber: '০১৭XXXXXXXX',
              playerCount: '২ জন',
              date: 'আজ, ২০২৬',
              status: 'pending',
            };
            setTeamRegistrations([newTeam, ...teamRegistrations]);
            showToast(`অভিনন্দন! "${team}" দল সফলভাবে "${tournament}"-এ নিবন্ধিত হয়েছে।`);
          }}
        />

        <NotificationModal
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
          onSelectTab={handleTabChange}
        />

        <MembershipCardModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />

        <TrialApplicationModal
          isOpen={isTrialOpen}
          onClose={() => setIsTrialOpen(false)}
          onSuccess={(candidate) =>
            showToast(`ধন্যবাদ ${candidate}! ট্রায়াল রেজিস্ট্রেশন নিশ্চিত করা হয়েছে।`)
          }
        />

        {/* Admin Control Panel for Convener Md Anisur Rahaman 2026 */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          liveMatch={liveMatch}
          onUpdateLiveMatch={(updated) => setLiveMatch(updated)}
          notices={notices}
          onAddNotice={handleAddNotice}
          membershipApplications={membershipApplications}
          onUpdateApplicationStatus={handleUpdateApplicationStatus}
          teamRegistrations={teamRegistrations}
          onUpdateTeamStatus={handleUpdateTeamStatus}
          onShowToast={showToast}
        />
      </div>
    </div>
  );
}
