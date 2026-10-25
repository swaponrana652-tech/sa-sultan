import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';
import { MatchScore, Fixture, ClubNotice, MembershipApplication, TeamRegistration } from './types';

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// 2. Validate Connection to Firestore (Skill Requirement)
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore client is offline, check configuration.');
    }
  }
}
testConnection();

// 3. Error Handling conforming to FirestoreErrorInfo (Skill Requirement)
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((p) => ({
        providerId: p.providerId,
        email: p.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 4. Real-time Live Match Database Services
const LIVE_MATCH_DOC_ID = 'current-live-match';

export function subscribeToLiveMatch(onUpdate: (match: MatchScore) => void) {
  const matchRef = doc(db, 'matches', LIVE_MATCH_DOC_ID);
  return onSnapshot(
    matchRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as MatchScore;
        onUpdate({ ...data, id: snapshot.id });
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, `matches/${LIVE_MATCH_DOC_ID}`);
    }
  );
}

export async function saveLiveMatchToDb(matchData: MatchScore): Promise<void> {
  const matchRef = doc(db, 'matches', LIVE_MATCH_DOC_ID);
  try {
    await setDoc(matchRef, { ...matchData, id: LIVE_MATCH_DOC_ID }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `matches/${LIVE_MATCH_DOC_ID}`);
  }
}

// 5. Fixtures Database Services
export function subscribeToFixtures(onUpdate: (fixtures: Fixture[]) => void) {
  const colRef = collection(db, 'fixtures');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Fixture[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ ...(docSnap.data() as Fixture), id: docSnap.id });
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'fixtures');
    }
  );
}

export async function saveFixtureToDb(fixture: Fixture): Promise<void> {
  const docRef = doc(db, 'fixtures', fixture.id);
  try {
    await setDoc(docRef, fixture, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `fixtures/${fixture.id}`);
  }
}

export async function deleteFixtureFromDb(fixtureId: string): Promise<void> {
  const docRef = doc(db, 'fixtures', fixtureId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `fixtures/${fixtureId}`);
  }
}

// 6. Notices Database Services
export function subscribeToNotices(onUpdate: (notices: ClubNotice[]) => void) {
  const colRef = collection(db, 'notices');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: ClubNotice[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ ...(docSnap.data() as ClubNotice), id: docSnap.id });
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notices');
    }
  );
}

export async function saveNoticeToDb(notice: ClubNotice): Promise<void> {
  const docRef = doc(db, 'notices', notice.id);
  try {
    await setDoc(docRef, notice, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `notices/${notice.id}`);
  }
}

export async function deleteNoticeFromDb(noticeId: string): Promise<void> {
  const docRef = doc(db, 'notices', noticeId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `notices/${noticeId}`);
  }
}

// 7. Membership Applications Database Services
export function subscribeToMembershipApplications(onUpdate: (apps: MembershipApplication[]) => void) {
  const colRef = collection(db, 'membershipApplications');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: MembershipApplication[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ ...(docSnap.data() as MembershipApplication), id: docSnap.id });
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'membershipApplications');
    }
  );
}

export async function saveMembershipApplicationToDb(appData: MembershipApplication): Promise<void> {
  const docRef = doc(db, 'membershipApplications', appData.id);
  try {
    await setDoc(docRef, appData, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `membershipApplications/${appData.id}`);
  }
}

export async function updateMembershipApplicationStatusInDb(
  appId: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  const docRef = doc(db, 'membershipApplications', appId);
  try {
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `membershipApplications/${appId}`);
  }
}

// 8. Team Registrations Database Services
export function subscribeToTeamRegistrations(onUpdate: (teams: TeamRegistration[]) => void) {
  const colRef = collection(db, 'teamRegistrations');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: TeamRegistration[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ ...(docSnap.data() as TeamRegistration), id: docSnap.id });
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'teamRegistrations');
    }
  );
}

export async function saveTeamRegistrationToDb(teamData: TeamRegistration): Promise<void> {
  const docRef = doc(db, 'teamRegistrations', teamData.id);
  try {
    await setDoc(docRef, teamData, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `teamRegistrations/${teamData.id}`);
  }
}

export async function updateTeamRegistrationStatusInDb(
  teamId: string,
  status: 'approved'
): Promise<void> {
  const docRef = doc(db, 'teamRegistrations', teamId);
  try {
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `teamRegistrations/${teamId}`);
  }
}

// 9. Initial Seed: Populates database if empty so live data is immediately available
export async function seedDatabaseIfEmpty(
  defaultMatch: MatchScore,
  defaultFixtures: Fixture[],
  defaultNotices: ClubNotice[],
  defaultApps: MembershipApplication[],
  defaultTeams: TeamRegistration[]
) {
  try {
    // Check match
    const matchSnap = await getDocs(collection(db, 'matches'));
    if (matchSnap.empty) {
      await saveLiveMatchToDb(defaultMatch);
    }

    // Check fixtures
    const fixSnap = await getDocs(collection(db, 'fixtures'));
    if (fixSnap.empty) {
      for (const fix of defaultFixtures) {
        await saveFixtureToDb(fix);
      }
    }

    // Check notices
    const noticeSnap = await getDocs(collection(db, 'notices'));
    if (noticeSnap.empty) {
      for (const notice of defaultNotices) {
        await saveNoticeToDb(notice);
      }
    }

    // Check applications
    const appSnap = await getDocs(collection(db, 'membershipApplications'));
    if (appSnap.empty) {
      for (const app of defaultApps) {
        await saveMembershipApplicationToDb(app);
      }
    }

    // Check teams
    const teamSnap = await getDocs(collection(db, 'teamRegistrations'));
    if (teamSnap.empty) {
      for (const team of defaultTeams) {
        await saveTeamRegistrationToDb(team);
      }
    }
  } catch (err) {
    console.warn('Database seed check non-fatal error:', err);
  }
}
