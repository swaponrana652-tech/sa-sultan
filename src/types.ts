export type TabType = 'home' | 'tournaments' | 'players' | 'club-contact';

export interface Player {
  id: string;
  name: string;
  jersey: string;
  sport: 'football' | 'cricket' | 'indoor' | 'coach';
  role: string;
  team: string;
  image: string;
  isCaptain?: boolean;
  isCoach?: boolean;
  license?: string;
  form?: string[];
  matches?: number | string;
  goals?: number;
  assists?: number;
  avgRuns?: number | string;
  wickets?: number | string;
  cleanSheets?: string;
  saveRate?: string;
  topSpeed?: string;
  economy?: string;
  passAccuracy?: string;
  experience?: string;
  honors?: string;
  bio?: string;
  bloodGroup?: string;
  joinedYear?: string;
  age?: number | string;
  sl?: number;
  village?: string;
}

export interface MatchScore {
  id: string;
  tournament: string;
  stage: string;
  status: 'live' | 'completed' | 'upcoming';
  matchMinute?: string;
  homeTeam: {
    name: string;
    shortName: string;
    score: number;
    badgeLetter: string;
    isHome: boolean;
  };
  awayTeam: {
    name: string;
    shortName: string;
    score: number;
    badgeLetter: string;
    isHome: boolean;
  };
  venue: string;
  spectators?: string;
  highlightEvent?: string;
  bannerImage?: string;
  stats?: {
    yellowCards: string;
    corners: string;
    onTarget: string;
    possessionHome: number;
    possessionAway: number;
  };
  liveCommentary?: string;
  cheerCount?: number;
}

export interface Fixture {
  id: string;
  title: string;
  matchNo?: string;
  tournamentType: string;
  team1: { name: string; captain: string; badge: string };
  team2: { name: string; captain: string; badge: string };
  date: string;
  time: string;
  venue: string;
  isRegistrationOpen?: boolean;
  registrationDeadline?: string;
  teamsCount?: string;
  prizeMoney?: string;
  image?: string;
}

export interface Standing {
  rank: number;
  team: string;
  played: number;
  wonDraw: string;
  points: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDiff?: number;
  isLeader?: boolean;
}

export interface ClubNotice {
  id: string;
  title: string;
  date: string;
  category: string;
  description?: string;
  fileSize?: string;
  downloadUrl?: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  tag: string;
  title: string;
  sub?: string;
  image: string;
  caption?: string;
  category?: 'match' | 'ceremony' | 'office';
}

export interface Facility {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  features?: string[];
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  roleTag: string;
  message: string;
  image: string;
  phone?: string;
  term?: string;
}

export interface MembershipApplication {
  id: string;
  name: string;
  phone: string;
  sport: string;
  bloodGroup: string;
  membershipType: 'general' | 'lifetime';
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TeamRegistration {
  id: string;
  teamName: string;
  tournament: string;
  managerName: string;
  contactNumber: string;
  playerCount: string;
  date: string;
  status: 'pending' | 'approved';
}

export interface AdminProfile {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleTitle: string;
  committee: string;
  phone: string;
  email: string;
  image: string;
  bio: string;
  officeAddress?: string;
  lastLogin?: string;
}

