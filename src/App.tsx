/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Player, ClubNotice, MatchScore, MembershipApplication, TeamRegistration, Fixture } from './types';
import { LIVE_MATCH, NOTICES, INITIAL_MEMBERSHIP_APPLICATIONS, INITIAL_TEAM_REGISTRATIONS, FIXTURES } from './data/mockData';
import {
  seedDatabaseIfEmpty,
  subscribeToLiveMatch,
  saveLiveMatchToDb,
  subscribeToFixtures,
  saveFixtureToDb,
  deleteFixtureFromDb,
  subscribeToNotices,
  saveNoticeToDb,
  deleteNoticeFromDb,
  subscribeToMembershipApplications,
  saveMembershipApplicationToDb,
  updateMembershipApplicationStatusInDb,
  subscribeToTeamRegistrations,
  saveTeamRegistrationToDb,
  updateTeamRegistrationStatusInDb,
} from './firebase';
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

  // Live and Admin Data States (Connected to Firestore Realtime)
  const [liveMatch, setLiveMatch] = useState<MatchScore>(LIVE_MATCH);
  const [fixtures, setFixtures] = useState<Fixture[]>(FIXTURES);
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

  // Real-time Firestore Subscriptions
  useEffect(() => {
    // 1. Initialize Firestore collections if empty
    seedDatabaseIfEmpty(
      LIVE_MATCH,
      FIXTURES,
      NOTICES,
      INITIAL_MEMBERSHIP_APPLICATIONS,
      INITIAL_TEAM_REGISTRATIONS
    );

    // 2. Real-time Live Match listener
    const unsubMatch = subscribeToLiveMatch((updatedMatch) => {
      setLiveMatch(updatedMatch);
    });

    // 3. Real-time Fixtures listener
    const unsubFixtures = subscribeToFixtures((loadedFixtures) => {
      if (loadedFixtures && loadedFixtures.length > 0) {
        setFixtures(loadedFixtures);
      }
    });

    // 4. Real-time Notices listener
    const unsubNotices = subscribeToNotices((loadedNotices) => {
      if (loadedNotices && loadedNotices.length > 0) {
        setNotices(loadedNotices);
      }
    });

    // 5. Real-time Membership Applications listener
    const unsubApps = subscribeToMembershipApplications((loadedApps) => {
      if (loadedApps && loadedApps.length > 0) {
        setMembershipApplications(loadedApps);
      }
    });

    // 6. Real-time Team Registrations listener
    const unsubTeams = subscribeToTeamRegistrations((loadedTeams) => {
      if (loadedTeams && loadedTeams.length > 0) {
        setTeamRegistrations(loadedTeams);
      }
    });

    return () => {
      unsubMatch();
      unsubFixtures();
      unsubNotices();
      unsubApps();
      unsubTeams();
    };
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeamReg = (tournamentTitle?: string) => {
    if (tournamentTitle) setPreselectedTournament(tournamentTitle);
    setIsTeamRegOpen(true);
  };

  // Live Match Mutation
  const handleUpdateLiveMatch = async (updated: MatchScore) => {
    setLiveMatch(updated);
    try {
      await saveLiveMatchToDb(updated);
    } catch (e) {
      console.error('Failed to update live match in Firestore:', e);
    }
  };

  // Fixtures Mutations
  const handleAddFixture = async (fixture: Fixture) => {
    setFixtures((prev) => [fixture, ...prev]);
    try {
      await saveFixtureToDb(fixture);
    } catch (e) {
      console.error('Failed to save fixture to Firestore:', e);
    }
  };

  const handleUpdateFixture = async (fixture: Fixture) => {
    setFixtures((prev) => prev.map((f) => (f.id === fixture.id ? fixture : f)));
    try {
      await saveFixtureToDb(fixture);
    } catch (e) {
      console.error('Failed to update fixture in Firestore:', e);
    }
  };

  const handleDeleteFixture = async (id: string) => {
    setFixtures((prev) => prev.filter((f) => f.id !== id));
    try {
      await deleteFixtureFromDb(id);
    } catch (e) {
      console.error('Failed to delete fixture in Firestore:', e);
    }
  };

  // Notice Mutations
  const handleAddNotice = async (notice: ClubNotice) => {
    setNotices((prev) => [notice, ...prev]);
    try {
      await saveNoticeToDb(notice);
    } catch (e) {
      console.error('Failed to save notice to Firestore:', e);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNoticeFromDb(id);
    } catch (e) {
      console.error('Failed to delete notice from Firestore:', e);
    }
  };

  // Membership Application Mutations
  const handleNewApplication = async (app: {
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
    setMembershipApplications((prev) => [newApp, ...prev]);
    try {
      await saveMembershipApplicationToDb(newApp);
    } catch (e) {
      console.error('Failed to save membership application in Firestore:', e);
    }
  };

  const handleUpdateApplicationStatus = async (id: string, status: 'approved' | 'rejected') => {
    setMembershipApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    try {
      await updateMembershipApplicationStatusInDb(id, status);
    } catch (e) {
      console.error('Failed to update application status in Firestore:', e);
    }
  };

  // Team Registration Mutations
  const handleTeamRegSuccess = async (team: string, tournament: string) => {
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
    setTeamRegistrations((prev) => [newTeam, ...prev]);
    showToast(`অভিনন্দন! "${team}" দল সফলভাবে "${tournament}"-এ নিবন্ধিত হয়েছে।`);
    try {
      await saveTeamRegistrationToDb(newTeam);
    } catch (e) {
      console.error('Failed to save team registration to Firestore:', e);
    }
  };

  const handleUpdateTeamStatus = async (id: string, status: 'approved') => {
    setTeamRegistrations((prev) =>
      prev.map((team) => (team.id === id ? { ...team, status } : team))
    );
    try {
      await updateTeamRegistrationStatusInDb(id, status);
    } catch (e) {
      console.error('Failed to update team status in Firestore:', e);
    }
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
              liveMatch={liveMatch}
              fixtures={fixtures}
            />
          )}

          {activeTab === 'tournaments' && (
            <TournamentsScreen
              onOpenTeamRegistration={handleOpenTeamReg}
              onShowToast={showToast}
              liveMatch={liveMatch}
              fixtures={fixtures}
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
              onOpenPhoto={(photo) => setSelectedPhoto(photo)}
              onShowToast={showToast}
              notices={notices}
              onAddNotice={handleAddNotice}
              onDeleteNotice={handleDeleteNotice}
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
          onSuccess={handleTeamRegSuccess}
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
          onSuccess={(candidate, fee) =>
            showToast(`ধন্যবাদ ${candidate}! ${fee ? `${fee} ফিসহ ` : ''}রেজিস্ট্রেশন আবেদন সফলভাবে গৃহীত হয়েছে। 🌟`)
          }
        />

        {/* Admin Control Panel for SA Sultan */}
        <AdminPanel
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          liveMatch={liveMatch}
          onUpdateLiveMatch={handleUpdateLiveMatch}
          fixtures={fixtures}
          onAddFixture={handleAddFixture}
          onUpdateFixture={handleUpdateFixture}
          onDeleteFixture={handleDeleteFixture}
          notices={notices}
          onAddNotice={handleAddNotice}
          onDeleteNotice={handleDeleteNotice}
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
