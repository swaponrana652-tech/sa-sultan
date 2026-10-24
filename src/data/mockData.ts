import { Player, MatchScore, Fixture, Standing, ClubNotice, Facility, CommitteeMember } from '../types';

export const CLUB_LOGO = "/assets/aistudio/20114_53f15216.jpg";
export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAW5HdlSQqtmq8Sqq8K80V6s3-nEl7Xr_ckrtIHnwjPS38dkk1-OUQ8lr0g61Cz4CvhC8JM6_zMIeGTx6mTZwhBDFFU6QYVUMDhN8pccvITDdGGCyquRbjCF_Xfq7yRRUQ8eaXVG4PVxxHwGg08eqPM6i3hESGrc9ZD90EPyGM0L-Wljbo4Chjd70qTemjj5r6abx5AVd_RljQSd710oER-tR_OlyxoWqAPZT_zrce4_Q31bTqrJVck4w";

export const CAPTAIN_PLAYER: Player = {
  id: 'tanvir-10',
  name: 'তানভীর আহমেদ',
  jersey: '১০',
  sport: 'football',
  role: 'স্ট্রাইকার ও প্লেমেকার',
  team: 'শিয়ালকোল স্পোর্টস ক্লাব',
  image: USER_AVATAR,
  isCaptain: true,
  form: ['W', 'W', 'D', 'W'],
  matches: 28,
  goals: 19,
  assists: 7,
  honors: 'ম্যান অব দ্য টুর্নামেন্ট ২০২৪ • জেলা চ্যাম্পিয়নশিপ',
  bio: 'শিয়ালকোল স্পোর্টস ক্লাবের ফুটবল একাদশের গৌরবময় অধিনায়ক। মাঠে সৃষ্টিশীল ড্রিবলিং ও নিখুঁত ফিনিশিংয়ের জন্য সিরাজগঞ্জ জেলায় সুপরিচিত। ক্লাবের যুব একাডেমি থেকে উঠে আসা এক উজ্জ্বল নক্ষত্র।',
  bloodGroup: 'B (+ve)',
  joinedYear: '২০১৯'
};

export const SQUAD_PLAYERS: Player[] = [
  {
    id: 'mahmudul-7',
    name: 'মাহমুদুল হাসান',
    jersey: '৭',
    sport: 'cricket',
    role: 'অলরাউন্ডার',
    team: 'ক্রিকেট দল',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV9zeERDcNuK9qOEJIizDFvTuL5MSwh0mVODCNqXblwP9Gv8igxO-4VkpWaYmJQt3PX3GDoCxnz9c0GdGfC-nLXnPTRKnlGomE0WYCZDpd7Utsk5BglWJ_trj9SpJR8MXpwMWOMU9oV_AufMZnrZNUkdvtfN_a1ZMs3W9nzqddJcQQAYEdA9xmTis-zF9-cYS1SQWRQe3eNpH59CCD6WU79fvzmZIFdK8R7It3IK4KF6M4erSNQXsGpw',
    avgRuns: '৩৪.৫',
    wickets: '১৮',
    matches: 24,
    bio: 'মাঝের ওভারগুলোতে মারকুটে ব্যাটিং এবং নির্ভরযোগ্য মিডিয়াম পেস বোলিং দিয়ে একাধিক টুর্নামেন্টে দলকে একাই জিতিয়েছেন মাহমুদুল।',
    bloodGroup: 'O (+ve)',
    joinedYear: '২০২০'
  },
  {
    id: 'sakibur-1',
    name: 'সাকিবুর রহমান',
    jersey: '১',
    sport: 'football',
    role: 'গোলরক্ষক',
    team: 'ফুটবল একাদশ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTR7fv5v_griPWtn4zNyXwUI_eOxSCPv-M8fAvOV0H0sBQqgjp8VEkFD_lxQFdXPRjPHVbknsiSf1fm-xYRSZCa23LPaKHW3mfbU87GdQz0qzHNzejoJ_j30a3mJKsDIyflhzJWhCCa9OHNmgCDoq_BNA1N-6H-qF6CqlX6h12A3m50m49MA2SUu7-dJ-3cuuATw1tbVLl6o6tI6TrdGpPcvKkfqlvylJmH5sX106B4nv2r7OC1R34DQ',
    cleanSheets: '১২টি',
    saveRate: '৮৬%',
    matches: 30,
    bio: 'পোস্টের নিচে যেন দুর্ভেদ্য প্রাচীর! পেনাল্টি সেভ এবং এরিয়াল বলে অসাধারণ দক্ষতার অধিকারী সাকিবুর গোল্ডকাপে সেরা গোলকিপারের পুরস্কার অর্জন করেন।',
    bloodGroup: 'A (+ve)',
    joinedYear: '২০২১'
  },
  {
    id: 'rakibul-18',
    name: 'রাকিবুল ইসলাম',
    jersey: '১৮',
    sport: 'cricket',
    role: 'ফাস্ট বোলার',
    team: 'পেস ব্যাটারি',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh08zF_e6YLJ4R_vMUkW20mvaE_DVh3vma2vRk6CzuCxOfCreug5Co9IzTv-eH4En3OIfTWDVn7iYW_mAjuf1ET4cvURUT3r0yyRnQO4N1S0VLxLEmEiZGioYXHC1AVqe6HHNw-TG3lotxdZkceKywCZU2oxGe3WAzVB6ioqKI1Hict0JluWH7icPQbFWJTrLk8u_0Mb08h_po5Uig5LVSrR2l11DHkeEheDp99UsTXIz1Gy8faOZRTw',
    topSpeed: '১৩৫',
    economy: '৪.৮',
    matches: 21,
    bio: 'গতি ও ইন-সুইংয়ের বিধ্বংসী মিশ্রণ। পাওয়ারপ্লে ও ডেথ ওভারে ব্যাটসম্যানদের পরাস্ত করতে রাকিবুলের ইয়র্কার ক্লাব ক্রিকেটে এক ত্রাস।',
    bloodGroup: 'B (+ve)',
    joinedYear: '২০২২'
  },
  {
    id: 'ariful-8',
    name: 'আরিফুল হক',
    jersey: '৮',
    sport: 'football',
    role: 'মিডফিল্ডার',
    team: 'প্লেমেকার ও উইঙ্গার',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR2I1ePlMjdah-znwAGdyugFYtby_of6wfoisQLBVeRIPiV2ZpdZO_ZJQpZZTwuM7-gP0RiYFhYfx-aatGRIyJcAUbgF19a50kPsC3ciUdLtwZr8vMxyOlDayU-yTXeAsRvK-KT8JVlEOICtI7jaPXu9gaHUJYaZl8T1CzoLdA2IPC4amp17l3wgEGJVeuWBisPCko-b8RUsx9CIDDVSrvd5-fIxy4ZTMdcMIn7b-LgZgypOpx16CJ9Q',
    passAccuracy: '৮৯%',
    matches: '২২',
    bio: 'মাঝমাঠের চালিকাশক্তি আরিফুল হক। বলের নিখুঁত নিয়ন্ত্রণ, ট্যাকলিং এবং ফরোয়ার্ডদের গোলের বল যোগান দেওয়ায় তিনি অপ্রতিদ্বন্দ্বী।',
    bloodGroup: 'AB (+ve)',
    joinedYear: '২০২১'
  },
  {
    id: 'zahirul-coach',
    name: 'মোঃ জহিরুল ইসলাম',
    jersey: 'কোচ',
    sport: 'coach',
    role: 'প্রধান কোচ',
    team: 'বিসিবি ও বাফুফে স্বীকৃত প্রশিক্ষক',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMagW0NVTituctwrCySoN2Tfj5kJ_XnW-b8xPwqNL9-cbOvNSzAcRbCFb-6NSgAN2T22ZmFGVnnK50Cz7UMwplvBJ7dB9RN92x8N6LnbexMez6xT9fQ-hOIzN_wDSvPHJeFEgYFF0J0LGbHCBMw7dPcIVGfInUMVjuDLMLKQLdDCiy7famuG7Rm07i4LEUBTM0wuXm7FVgD8pkXxOHdDKE2_TsoKjamppkE8-0ayYWttGOjFsOhQ1zkQ',
    license: 'এ-লাইসেন্স',
    experience: '৮+ বছর',
    isCoach: true,
    bio: 'প্রাক্তন জেলা দলের ফুটবলার ও বিসিবি সার্টিফাইড কোচ। তরুণদের ডিসিপ্লিন, সঠিক কৌশল ও আধুনিক ফিটনেস পরিচালনায় নিবেদিতপ্রাণ ক্রীড়া সংগঠক।',
    joinedYear: '২০২০'
  },
  {
    id: 'imran-badminton',
    name: 'ইমরান খন্দকার',
    jersey: '৪',
    sport: 'indoor',
    role: 'ব্যাডমিন্টন চ্যাম্পিয়ন (একক)',
    team: 'ইনডোর স্পোর্টস স্কোয়াড',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_W_JRbA8BT53NXn3gDnDfRCYhPJ81Tim71RkoGLBbgr2kFDhl11ONftlbFuPQ9u1xNsg0kooE85BuHBMuNn_3HaQeBiZg0Ohlgx5h5883QwIeVpnk68wgbCZPmRA67uAi92rSrbSFP1y1X2ckzfNIHPzOtbEtYirkkItYk1J5JZkplgRWWf0Wkpqbksnfj4rN7-5873Lmx6sILncvlkvg2GkR5CNYsHWq4rjJ-YEERnTT8DYK9tzWyg',
    matches: 18,
    honors: 'সিরাজগঞ্জ শীতকালীন ব্যাডমিন্টন ট্রফি ২০২৪ চ্যাম্পিয়ন',
    bio: 'দ্রুত স্ম্যাশ ও নেট গেমে দক্ষ। জেলা পর্যায়ে টানা ২ বারের চ্যাম্পিয়ন। ক্লাবের ইনডোর সুবিধায় নিয়মিত অনুশীলন পরিচালনা করেন।',
    bloodGroup: 'B (+ve)',
    joinedYear: '২০২৩'
  }
];

export const LIVE_MATCH: MatchScore = {
  id: 'live-goldcup-2025',
  tournament: 'শিয়ালকোল গোল্ডকাপ ফুটবল ২০২৫',
  stage: 'সেমিফাইনাল ২',
  status: 'live',
  matchMinute: '৬৭:১২"',
  homeTeam: {
    name: 'শিয়ালকোল ইয়ুথ',
    shortName: 'শিয়ালকোল',
    score: 1,
    badgeLetter: 'শ',
    isHome: true
  },
  awayTeam: {
    name: 'সলঙ্গা রাইডার্স',
    shortName: 'সলঙ্গা',
    score: 0,
    badgeLetter: 'স',
    isHome: false
  },
  venue: 'শিয়ালকোল সেন্ট্রাল হাই স্কুল মাঠ',
  spectators: '৪,৫০০+',
  highlightEvent: 'রাকিবুল হাসান (৩৪\' মিনিট - হেডার)',
  bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDmXeC_nL8JShWMOyiJHYtrqH6g8MBoMpEy5D_J2V2MhF-gTj-TnwXXad8baz1xNzzvrk2GBn_NqPwUpbjRWz0fjD3eC7oQAIQD4QDMTt24AM4_J2A3ryQzvMgSTPgdICnG72PYEyhjFCiDX8I8T0t-a4JisOVdBORlXcOJ9N5g47cwBpAXD8t0YMqspFHRD0iP8k2d0i_zCThr4fx8doBzGRTA6nfUI0mj6cP17_y_pmNYR7SAnpz4w',
  stats: {
    yellowCards: '১ - ২',
    corners: '৫ - ৩',
    onTarget: '৪ - ২',
    possessionHome: 56,
    possessionAway: 44
  },
  liveCommentary: 'সলঙ্গার কর্নার শট সেভ করলেন গোলরক্ষক সজীব... দর্শকে কানায় কানায় পূর্ণ স্টেডিয়াম!',
  cheerCount: 142
};

export const HOME_MATCH_RESULT: MatchScore = {
  id: 'result-final-2025',
  tournament: 'শিয়ালকোল গোল্ডকাপ ২০২৫ - ফাইনাল',
  stage: 'ফাইনাল',
  status: 'completed',
  homeTeam: {
    name: 'শিয়ালকোল',
    shortName: 'শিয়ালকোল',
    score: 2,
    badgeLetter: 'শ',
    isHome: true
  },
  awayTeam: {
    name: 'কাজিপুর স্পোর্টিং',
    shortName: 'কেএস',
    score: 1,
    badgeLetter: 'কে',
    isHome: false
  },
  venue: 'শিয়ালকোল সেন্ট্রাল হাই স্কুল মাঠ',
  highlightEvent: '৮৪\' মিনিটে গোল! সাকিব হোসেন (শিয়ালকোল)'
};

export const FIXTURES: Fixture[] = [
  {
    id: 'fixture-cricket-1',
    title: 'শিয়ালকোল ক্রিকেট সুপার লিগ ২০২৫',
    matchNo: 'ম্যাচ #০৪',
    tournamentType: 'টি-২০ টুর্নামেন্ট',
    team1: { name: 'শিয়ালকোল টাইটানস', captain: 'আরিফ', badge: 'টা' },
    team2: { name: 'রতনকান্দি কিংস', captain: 'তানভীর', badge: 'কি' },
    date: '২০ নভেম্বর ২০২৫',
    time: 'দুপুর ২:০০',
    venue: 'শিয়ালকোল হাই স্কুল মাঠ'
  },
  {
    id: 'fixture-badminton-1',
    title: 'বিজয় দিবস ব্যাডমিন্টন টুর্নামেন্ট',
    tournamentType: 'উন্মুক্ত দ্বৈত ব্যাডমিন্টন ২০২৫',
    team1: { name: 'ক্লাব ইনডোর কোর্ট', captain: '', badge: '' },
    team2: { name: 'শিয়ালকোল বাজার', captain: '', badge: '' },
    date: '১৫ ডিসেম্বর ২০২৫',
    time: 'সন্ধ্যা ৬:৩০',
    venue: 'ক্লাব ইনডোর কোর্ট, শিয়ালকোল বাজার',
    isRegistrationOpen: true,
    registrationDeadline: '১৫ ডিসেম্বর ২০২৫',
    teamsCount: '৩২ টিম',
    prizeMoney: '১৫,০০০৳',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_W_JRbA8BT53NXn3gDnDfRCYhPJ81Tim71RkoGLBbgr2kFDhl11ONftlbFuPQ9u1xNsg0kooE85BuHBMuNn_3HaQeBiZg0Ohlgx5h5883QwIeVpnk68wgbCZPmRA67uAi92rSrbSFP1y1X2ckzfNIHPzOtbEtYirkkItYk1J5JZkplgRWWf0Wkpqbksnfj4rN7-5873Lmx6sILncvlkvg2GkR5CNYsHWq4rjJ-YEERnTT8DYK9tzWyg'
  }
];

export const STANDINGS: Standing[] = [
  { rank: 1, team: 'শিয়ালকোল স্পোর্টস', played: 3, wonDraw: '৩-০', points: 9, goalsFor: 7, goalsAgainst: 1, goalDiff: 6, isLeader: true },
  { rank: 2, team: 'সলঙ্গা রাইডার্স', played: 3, wonDraw: '২-০', points: 6, goalsFor: 4, goalsAgainst: 2, goalDiff: 2 },
  { rank: 3, team: 'রতনকান্দি একাদশ', played: 3, wonDraw: '১-১', points: 4, goalsFor: 3, goalsAgainst: 3, goalDiff: 0 },
  { rank: 4, team: 'বাগবাটি ওয়ারিয়র্স', played: 3, wonDraw: '০-১', points: 1, goalsFor: 1, goalsAgainst: 5, goalDiff: -4 }
];

export const NOTICES: ClubNotice[] = [
  {
    id: 'notice-1',
    title: '২০২৫ সেশনের নতুন আজীবন ও সাধারণ সদস্য নবায়ন সংক্রান্ত বিজ্ঞপ্তি',
    date: '২৮ ফেব্রুয়ারি, ২০২৫',
    category: 'মেম্বারশিপ',
    description: 'সম্মানিত সদস্যদের অবগতির জন্য জানানো যাচ্ছে যে, ২০২৫ সালের সদস্য নবায়ন ফি এবং নতুন ফরম বিতরণ কার্যক্রম ক্লাব কার্যালয়ে সকাল ১০টা থেকে রাত ৮টা পর্যন্ত চলমান থাকবে।',
    fileSize: '১.২ মেগাবাইট (PDF)'
  },
  {
    id: 'notice-2',
    title: 'শহীদ স্মৃতি ক্রিকেট টুর্নামেন্টের সেমিফাইনাল সময়সূচী ও প্লেয়িং ইলেভেন',
    date: '২৫ ফেব্রুয়ারি, ২০২৫',
    category: 'ক্রিকেট',
    description: 'আগামীকাল শুক্রবার অনুষ্ঠিতব্য সেমিফাইনাল ম্যাচের সময়সূচী ও উভয় দলের খেলোয়াড় তালিকা প্রকাশ করা হয়েছে। ম্যাচ যথাসময়ে শুরু হবে।',
    fileSize: '৮৫০ কিলোবাইট (PDF)'
  },
  {
    id: 'notice-3',
    title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও যুব পুরস্কার বিতরণী ২০২৫',
    date: '২০ ফেব্রুয়ারি, ২০২৫',
    category: 'বার্ষিক উৎসব',
    description: 'শিয়ালকোল ইউনিয়নের সকল ক্রীড়ানুরাগীদের উপস্থিতিতে ক্লাব মাঠে বর্ণাঢ্য বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে।',
    fileSize: '১.৮ মেগাবাইট (PDF)'
  }
];

export const COMMITTEE: CommitteeMember[] = [
  {
    id: 'comm-1',
    name: 'আলহাজ্ব মো: রফিকুল ইসলাম',
    role: 'সভাপতি',
    roleTag: 'সভাপতি',
    message: '"শিয়ালকোলের প্রতিটি তরুণকে মাঠমুখী করে ক্রীড়ানৈপুণ্যের মাধ্যমে জাতীয় পর্যায়ে সিরাজগঞ্জের মুখ উজ্জ্বল করাই আমাদের মূল লক্ষ্য।"',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpH0484XI1pCzSPxqzjWvYMWi31AEfUW5xhUVP-UYPymJiyqxaQVPd_ia2V5RnjBoyXvrpMxfmLyelaWvGYenZdfdZHoWvWbAughQ5GcDmIqw2uxweOdZJz-0xLdRX0ldTupvV52F5lZQr6petqjfkj8tqXmzJ0PaDXo2eTo0VAE8ARrS9_0DTn4ubcyzyQU9G7G1Uvixeur8uEN101fEssB9r4phzY1DeewzRTndYCR3mPKqAp1x9qw',
    phone: '+৮৮০১৭১২-১১২২৩৩'
  },
  {
    id: 'comm-2',
    name: 'কাজী তারেক রহমান',
    role: 'সাধারণ সম্পাদক',
    roleTag: 'সাধারণ সম্পাদক',
    message: '"আধুনিক জিম ও একাডেমি সুবিধার মাধ্যমে আমরা তৃণমূলের প্রতিভাবান খেলোয়াড়দের উপযুক্ত ট্রেনিং ও খাদ্য সহায়তা নিশ্চিত করছি।"',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv8mMwiO8xW0IAlA3dGj78Upq4A-sqzf01JFQJZCtbgZ90FJrP6va-XSOup9rm16JMZfS2ICgdwSMlK6NVESLgxFq2eLT7a0QPvuerg9Pbqo0nZ2fYfUTcqbnOES-M2RTs1TUgfHPrHzZLtm0aKczW3rYeXIrjyEaWIICI9-RBkv7Vs2O_QX42IXZ6tHYM_QKd8Gn3S26m4s2UcyAaETlo8wPhAXq-usWXfYf4kilrw0UG8EeVuDNzIw',
    phone: '+৮৮০১৭১২-৩৪৫৬৭৮'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'facility-pitch',
    title: 'নিজস্ব খেলার মাঠ',
    tag: 'সিরাজগঞ্জ',
    description: 'সবুজ ঘাসের পূর্ণাঙ্গ মাঠ ও ফ্লাডলাইট',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvzzYd7XpSVoAHK8bDaspIsi29MHiSqg22zJLocXWMuG0MK2bnCfsqjAblANT1gsVr12ORQn5W_nLDjBED3QyShxyFVRGm50APWwp2DiboZLsme5DjAlmrr2nzaDjKeqo80IrMv0OkyhT2f-TionI41OL0M3Wp52cFeF9pQ_ymT5Gs93mu5EmGZwhy97pe7b5-fOjh9s0kzM6WKBGCQ3y_FOvUTgzp0NY76xSJSjzj4QwXUlJpQVqwcA',
    features: ['আন্তর্জাতিক মাপের ফুটবল ও ক্রিকেট পিচ', 'রাতে খেলার জন্য উচ্চক্ষমতাসম্পন্ন ফ্লাডলাইট', 'দর্শকদের বসার পাকা গ্যালারি']
  },
  {
    id: 'facility-gym',
    title: 'ফিটনেস জিম',
    tag: 'মর্ডান জিম',
    description: 'খেলোয়াড়দের জন্য বিশেষায়িত ট্রেইনিং',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP09t7NCmKDA5EkGkANsntmfzMYnUNnNQSOysR8M4ZN3KkPVvCzWscpusdhYcbSLVggWMyUFWIefBTyREgr6jISbjf6RJLVdmxNXaYZfWhhmcQoWBb_NkhxExBR1TGXTIreanjmhLGObQZrSJXNGNbRyMepQ2IMYcn8EH8B3mCI9Gfc0MKPnZi6PAvGd_hZ9zVPqT0q8LoyzGyqoaaJ2x73_q330aGr3Aj0t4FeTL-J80VqAxUCfo1MQ',
    features: ['কার্ডিও ও ওয়েট ট্রেনিং ইকুইপমেন্ট', 'ফিজিওথেরাপিস্ট ও নিউট্রিশনিস্ট পরামর্শ', 'খেলোয়াড়দের জন্য ফ্রি মেম্বারশিপ']
  },
  {
    id: 'facility-academy',
    title: 'একাডেমি ট্রেনিং',
    tag: 'বয়সভিত্তিক',
    description: 'অনূর্ধ্ব-১৪ ও ১৬ ফুটবল-ক্রিকেট একাডেমি',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-Li0Ky_e3e2EPeYA55p80OKBw4_4Wzo9Opd7koGR0bECh6TvoFrwf6Royi5zFsl2Yeu73cQk1OfW8McLHmzGzo8p52luT77A0jGqfa9kzTaLvuQCFCkYw5SDJtzNsM0BMKXJ0QTBn-LgcS8YLh7YhdPyi_Nt-FXtDA9dGndwrZr5F3hYCbpIX8jvKBcO7lvKk84mKC6AWilD_kEbZ-elNl440A20_KWdeuKjt_Ee5ajbIDRVky8YNbA',
    features: ['বিসিবি ও বাফুফে স্বীকৃত কোচ', 'সপ্তাহে ৫ দিন বিশেষ ড্রিল ও নেট সেশন', 'প্রতিভাবানদের জন্য সম্পূর্ণ বিনা খরচে কিট']
  },
  {
    id: 'facility-culture',
    title: 'বার্ষিক ক্রীড়া ও সংস্কৃতি',
    tag: 'বার্ষিক উৎসব',
    description: 'প্রতিযোগিতা ও সাংস্কৃতিক সন্ধ্যা',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1dY1uzJbwJmA13PZW-SaYY4XThcbBcboiy5ISeEbxqLZ1uHeIlmTPDGpj7By0U03KgjxEmoQO6St4HqRsW3cdLC6We2KzgAFyh7phf3Fidvi-ykaPUBnZwpVRInLzNuRNTAvB49R77xDy8T-bD7ydYGI9hBv6WuhVwqenPumBpYpMbvCjv3YgppVNhYR4cHLtSlm72g3zAmPBwl8rq2B_Z0NI-vaIWYhbsb9TAd0hyG_tOUM97subiA',
    features: ['শীতকালীন বার্ষিক ক্রীড়া প্রতিযোগিতা', 'কমিউনিটি মিলনমেলা ও সাংস্কৃতিক সন্ধ্যা', 'গুণী ক্রীড়াবিদ সম্মাননা পদক প্রদান']
  }
];

export const NEWS_STORIES = [
  {
    id: 'news-draft',
    category: 'টুর্নামেন্ট আপডেট',
    timeAgo: '২ ঘণ্টা আগে',
    title: 'শিয়ালকোল প্রিমিয়ার লিগ ২০২৫ এর প্লেয়ার ড্রাফট সম্পন্ন',
    summary: '৮টি দল ও ১৬০ জন উদীয়মান ক্রিকেট প্রতিভার চূড়ান্ত দলবদল সম্পন্ন হয়েছে।',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj3M_B1RRlkXo4XJNgbM120UdLn7-54XLJOlsWAmvkvCyVxse-3GDGjE5wiqYHZtVH2OEHBx3tZ47YvmpyaHQ5Gc25d5JE6iQa2ft2RIomU6d0IPEWr6eogrIQb3UTrT4ttw_rKC1Po8ishLEuQJKHPOPJdygv1c0miVO1UmIda3DC3qTf5MKGII4N5eSetpZdDA5A7QXZb4XB1tOcnBc6KZJNFHb1iPZ2NgzijeRfBiiHuLCtAbFxmA',
    content: 'শিয়ালকোল ক্রীড়া সংঘের উদ্যোগে আয়োজিত প্রিমিয়ার লিগের মেগা প্লেয়ার ড্রাফট স্থানীয় মিলনায়তনে উৎসবমুখর পরিবেশে সম্পন্ন হয়েছে। সিরাজগঞ্জ সদর ও আশপাশের বিভিন্ন উপজেলার সেরা খেলোয়াড়দের নিয়ে ৮টি ফ্র্যাঞ্চাইজি দল গঠিত হয়।'
  },
  {
    id: 'news-jersey',
    category: 'সদস্য বিজ্ঞপ্তি',
    timeAgo: 'গতকাল',
    title: 'ক্লাবের নতুন সদস্যদের জার্সি বিতরণ আগামী শুক্রবার',
    summary: 'ক্লাব প্রাঙ্গণে বিকেল ৪টায় সকল নিবন্ধিত সদস্যদের আনুষ্ঠানিক জার্সি ও কিট প্রদান করা হবে।',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsGSvI0MfN0Fi8M9VqRzgBEPThuAFW41YDRlqSPqPCAXXChITp9AyTuiAypn-IUjvBUU1VQ0jaGUfXKMkYsts17C16KiDM0KE9qb9dP6wxuVYLby6Hyu2-7TbwP9NHPPDbpndRDinmPGe8oGIsmCx4n0saTwlgjA6Z-5LLKJTPdsUJMdvGwSPK1u40PZQWB804UtswWD017DtNxtKqJWpSMtABdzfUDHkygLXUdLBxl7CyzjSUavuA-w',
    content: '২০২৫ সেশনের নবনিবন্ধিত সাধারণ ও আজীবন সদস্যদের জন্য বিশেষ জার্সি ও কিট বিতরণ অনুষ্ঠানের আয়োজন করা হয়েছে। সকল সদস্যকে নির্ধারিত সময়ে উপস্থিত থাকার জন্য ক্লাবের পক্ষ থেকে অনুরোধ জানানো যাচ্ছে।'
  }
];

export const GALLERY_MOMENTS = [
  {
    id: 'gal-practice',
    tag: 'অনুশীলন সেশন',
    title: 'সকালের নেট প্র্যাকটিস',
    sub: 'ক্রিকেট একাডেমি',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQCUHfoBFWrsK0gEZ7VjwBjSeZ120hENRbvce32bHi60TNbmw9QpSLJlpWQtTUOLijvDB5p1-rKbDSYjnlDjZaRLhuGGztq1NRXrb8gW5s2jGZVGy9e7ei0uMrQRiYHSKv9MIObu7-2tW91IJtfx8EhBCRAdbYAKr2r77jR4F6QKXjAM_WCLkQC71qf-lYe33Cq4AKlott_30cxUueb3NRPZLHRVSWXCSMoVorkEB8NELi2Lx3QwAlwA',
    caption: 'সূর্যোদয়ের সাথে সাথেই শিয়ালকোল মাঠে কিশোর ক্রিকেটারদের ব্যাটিং ও পেস বোলিং নেট অনুশীলন।'
  },
  {
    id: 'gal-trophy',
    tag: 'চ্যাম্পিয়ন সেলিব্রেশন',
    title: 'গোল্ডকাপ জয় উদযাপন',
    sub: 'ফাইনাল ২০২৫',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPWBpGiMz4VkwFUuZ7YPTUvAuw-rBS7xiiVb_85N6hV7dBUPfEF3KcAjjkq2o-VeqMxz5cRaMCQzwclZOYQwKT_LsjysDCV_kkYTK0uneWxcmr1zylV_vQsS2Agrzw9uAXBbQS6eksMnfwVbL5l_MJl7ekFS05Ph-6aYmqXp68PEvosp299jTcq692YOOndveS1xsExl1Vqt8dtUYAT4LCVP9PzWqe0i_ynrtVp0Ybk-caKUzc0UkT7g',
    caption: 'উপজেলা গোল্ডকাপ ফুটবল টুর্নামেন্টে চ্যাম্পিয়ন ট্রফি নিয়ে শিয়ালকোল একাদশের বিজয়ের উচ্ছ্বাস।'
  }
];

export const MAP_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAZXUJhFljNsqTii2rhluCT3FqkiiE0kbAZjm-N81-lMm6VLlVOEv9soqCdeGfZc17aWmJR3XYa73IcuiUkakegNhZIIbFH5Vn9H2-bX1RfVdCOE4DwuShhigAMHq6a4e6UypHU65aFXCkXc_NdelNsVRiJx_Htt4dJF8usX6ZpuQ3O5KjDf-qaZV7Hq0IOoQHPcqVd9vMyRJBxvwJzUaa0MVI489gme6rBJXKlOSY6k4cUoWdC2Gptzw";

// Bengali numeral conversion helper
export const toBengaliDigits = (num: number | string): string => {
  const bn = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(num).replace(/[0-9]/g, (w) => bn[parseInt(w, 10)]);
};

export const CONVENER_DATA = {
  name: 'মোঃ আনিসুর রহমান',
  nameEn: 'Md Anisur Rahaman',
  role: 'আহ্বায়ক (Convener)',
  term: '২০২৬',
  committee: 'আহ্বায়ক কমিটি ২০২৬',
  message: '"শিয়ালকোল স্পোর্টস অ্যাসোসিয়েশনকে আধুনিক, দুর্নীতিমুক্ত ও তৃণমূলের প্রকৃত ক্রীড়াবিদদের মিলনমেলায় রূপান্তর করাই ২০২৬ আহ্বায়ক কমিটির অঙ্গীকার।"',
  phone: '+৮৮০১৭১২-৯৮৭৬৫৪',
  email: 'convener@shialkolsports.org',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpH0484XI1pCzSPxqzjWvYMWi31AEfUW5xhUVP-UYPymJiyqxaQVPd_ia2V5RnjBoyXvrpMxfmLyelaWvGYenZdfdZHoWvWbAughQ5GcDmIqw2uxweOdZJz-0xLdRX0ldTupvV52F5lZQr6petqjfkj8tqXmzJ0PaDXo2eTo0VAE8ARrS9_0DTn4ubcyzyQU9G7G1Uvixeur8uEN101fEssB9r4phzY1DeewzRTndYCR3mPKqAp1x9qw'
};

export const INITIAL_MEMBERSHIP_APPLICATIONS: import('../types').MembershipApplication[] = [
  {
    id: 'app-1',
    name: 'মো: সাব্বির আহমেদ',
    phone: '০১৭১২-৩৪৫৬৭৮',
    sport: 'ফুটবল',
    bloodGroup: 'B+',
    membershipType: 'general',
    date: '২৮ অক্টোবর, ২০২৬',
    status: 'approved'
  },
  {
    id: 'app-2',
    name: 'তানভীরুল ইসলাম',
    phone: '০১৭৮৯-১২৩৪৫৬',
    sport: 'ক্রিকেট',
    bloodGroup: 'A+',
    membershipType: 'lifetime',
    date: '২৩ অক্টোবর, ২০২৬',
    status: 'pending'
  },
  {
    id: 'app-3',
    name: 'মোঃ রাশেদুল করিম',
    phone: '০১৮১২-৯৮৭৬৫৪',
    sport: 'ব্যাডমিন্টন',
    bloodGroup: 'O+',
    membershipType: 'general',
    date: '২০ অক্টোবর, ২০২৬',
    status: 'pending'
  }
];

export const INITIAL_TEAM_REGISTRATIONS: import('../types').TeamRegistration[] = [
  {
    id: 'team-reg-1',
    teamName: 'শিয়ালকোল টাইগার্স',
    tournament: 'বিজয় দিবস ব্যাডমিন্টন ২০২৫',
    managerName: 'আরিফ হোসেন',
    contactNumber: '০১৭১১-২২৩৩৪৪',
    playerCount: '২ জন',
    date: '২২ অক্টোবর, ২০২৬',
    status: 'approved'
  },
  {
    id: 'team-reg-2',
    teamName: 'সিরাজগঞ্জ স্টারস',
    tournament: 'বিজয় দিবস ব্যাডমিন্টন ২০২৫',
    managerName: 'কবির আহমেদ',
    contactNumber: '০১৮১৯-৫৫৬৬৭৭',
    playerCount: '২ জন',
    date: '২১ অক্টোবর, ২০২৬',
    status: 'pending'
  },
  {
    id: 'team-reg-3',
    teamName: 'রতনকান্দি রাইডার্স',
    tournament: 'শিয়ালকোল ভলিবল চ্যালেঞ্জ কাপ',
    managerName: 'সুজন ইসলাম',
    contactNumber: '০১৭১৩-৮৮৯৯০০',
    playerCount: '৬ জন',
    date: '১৯ অক্টোবর, ২০২৬',
    status: 'pending'
  }
];

