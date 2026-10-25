import { Player, MatchScore, Fixture, Standing, ClubNotice, Facility, CommitteeMember, GalleryItem } from '../types';

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

export const PLAYER_LIST_DOCUMENT = "/assets/aistudio/20131_25cbbafa.jpg";

export const SHIALKOL_OFFICIAL_SQUAD: Player[] = [
  {
    id: 'sk-1',
    sl: 1,
    name: 'বাবলু',
    age: 24,
    jersey: '১',
    sport: 'football',
    role: 'গোলরক্ষক (GK)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&auto=format&fit=crop&q=80',
    matches: 26,
    cleanSheets: '১০টি',
    saveRate: '৮৮%',
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল বাজার',
    joinedYear: '২০২০',
    bio: 'শিয়ালকোল একাদশের ১ নম্বর নির্ভরযোগ্য গোলরক্ষক বাবলু। অদম্য সাহস ও নিখুঁত রিফ্লেক্সে ক্লাবের পোস্টের নিচে তিনি এক অপরাজেয় প্রহরী।'
  },
  {
    id: 'sk-2',
    sl: 2,
    name: 'লিমন',
    age: 22,
    jersey: '২',
    sport: 'football',
    role: 'রাইট ব্যাক (RB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80',
    matches: 22,
    assists: 4,
    goals: 1,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল উত্তরপাড়া',
    joinedYear: '২০২১',
    bio: 'রাইট উইং দিয়ে ক্ষিপ্রগতির ওভারল্যাপিং ও ক্রস প্রদানে পারদর্শী নির্ভরযোগ্য ডিফেন্ডার লিমন।'
  },
  {
    id: 'sk-3',
    sl: 3,
    name: 'হাসান',
    age: 23,
    jersey: '৩',
    sport: 'football',
    role: 'লেফট ব্যাক (LB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    matches: 24,
    assists: 5,
    goals: 2,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল মধ্যপাড়া',
    joinedYear: '২০২১',
    bio: 'বামের কঠিন উইঙ্গারদের আটকে দেওয়া এবং আক্রমণে নিখুঁত পাসে হাসান দলের অন্যতম ভরসা।'
  },
  {
    id: 'sk-4',
    sl: 4,
    name: 'রাকিব',
    age: 21,
    jersey: '৪',
    sport: 'football',
    role: 'সেন্টার ব্যাক (CB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    matches: 21,
    goals: 3,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল পূর্বপাড়া',
    joinedYear: '২০২২',
    bio: 'এরিয়াল বলে দুর্দান্ত হেড ও স্লাইডিং ট্যাকলে প্রতিপক্ষের ফরোয়ার্ডদের থামিয়ে দেন রাকিব।'
  },
  {
    id: 'sk-5',
    sl: 5,
    name: 'সাদ্দাম',
    age: 25,
    jersey: '৫',
    sport: 'football',
    role: 'সেন্ট্রাল ডিফেন্ডার (CB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    matches: 28,
    goals: 2,
    bloodGroup: 'AB (+ve)',
    village: 'শিয়ালকোল বাজার',
    joinedYear: '২০২০',
    bio: 'রক্ষনভাগের প্রাণভোমরা সাদ্দাম। ডিফেন্স লাইন পরিচালনার চমৎকার নেতৃত্বের অধিকারী অভিজ্ঞ খেলোয়াড়।'
  },
  {
    id: 'sk-6',
    sl: 6,
    name: 'আজমিন',
    age: 20,
    jersey: '৬',
    sport: 'football',
    role: 'ডিফেন্সিভ মিডফিল্ডার (DM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    matches: 19,
    goals: 1,
    assists: 3,
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল পশ্চিমপাড়া',
    joinedYear: '২০২৩',
    bio: 'মাঝমাঠের সংযোগকারী লিঙ্ক। প্রতিপক্ষের আক্রমণ ভেঙে দিয়ে দ্রুত প্রতিআক্রমণ রচনায় দক্ষ তরুণ প্রতিভা আজমিন।'
  },
  {
    id: 'sk-7',
    sl: 7,
    name: 'স্বপন',
    age: 22,
    jersey: '৭',
    sport: 'football',
    role: 'সেন্ট্রাল মিডফিল্ডার (CM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    matches: 25,
    goals: 7,
    assists: 8,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল দক্ষিণপাড়া',
    joinedYear: '২০২১',
    bio: 'মাঝমাঠের নিখুঁত প্লেমেকার স্বপন। দূরপাল্লার বুলেট শট ও থ্রু পাসে ম্যাচে পার্থক্য গড়ে দেন।'
  },
  {
    id: 'sk-8',
    sl: 8,
    name: 'রঞ্জন',
    age: 24,
    jersey: '৮',
    sport: 'football',
    role: 'অ্যাটাকিং মিডফিল্ডার (AM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    matches: 27,
    goals: 8,
    assists: 9,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল কলেজ রোড',
    joinedYear: '২০২০',
    bio: 'আক্রমণভাগের ইঞ্জিন রঞ্জন। ডিবক্সের ঠিক বাইরে থেকে ডিফেন্স চেরা পাসে তিনি সেরা।'
  },
  {
    id: 'sk-9',
    sl: 9,
    name: 'উজ্জ্বল',
    age: 23,
    jersey: '৯',
    sport: 'football',
    role: 'স্ট্রাইকার (ST)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    matches: 26,
    goals: 14,
    assists: 4,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল স্কুল মাঠ পাড়া',
    joinedYear: '২০২১',
    bio: 'বক্সের ভেতর এক ক্লিনিক্যাল ফিনিশার উজ্জ্বল। হেডিং ও দুই পায়ের নিখুঁত ভলিতে গোলের জোয়ার আনেন।'
  },
  {
    id: 'sk-10',
    sl: 10,
    name: 'শরিফ',
    age: 24,
    jersey: '১০',
    sport: 'football',
    role: 'ফরওয়ার্ড ও অধিনায়ক (FW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: USER_AVATAR,
    isCaptain: true,
    matches: 30,
    goals: 18,
    assists: 11,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল সেন্ট্রাল',
    joinedYear: '২০২০',
    bio: 'শিয়ালকোল ফুটবল একাদশের গৌরবময় তারকা শরিফ। গতি, ড্রিবলিং ও ম্যাচ জেতানো নেতৃত্বে অনন্য।'
  },
  {
    id: 'sk-11',
    sl: 11,
    name: 'সুলতান',
    age: 25,
    jersey: '১১',
    sport: 'football',
    role: 'লেফট উইঙ্গার (LW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    matches: 28,
    goals: 12,
    assists: 9,
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল উত্তরপাড়া',
    joinedYear: '২০২০',
    bio: 'বাম প্রান্তের ত্রাস সুলতান। বিদ্যুতগতির দৌড় আর অসাধারণ ক্রসিংয়ে প্রতিপক্ষ ডিফেন্ডারদের পরাস্ত করেন।'
  },
  {
    id: 'sk-12',
    sl: 12,
    name: 'ইদি',
    age: 22,
    jersey: '১২',
    sport: 'football',
    role: 'রাইট উইঙ্গার (RW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    matches: 20,
    goals: 6,
    assists: 7,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল পূর্বপাড়া',
    joinedYear: '২০২২',
    bio: 'ডান উইং দিয়ে বল টেনে এনে বক্সে ঠিকানা লেখা পাসে ইদি সবসময় প্রতিপক্ষের মাথাব্যথার কারণ।'
  },
  {
    id: 'sk-13',
    sl: 13,
    name: 'সুমন',
    age: 23,
    jersey: '১৩',
    sport: 'football',
    role: 'সেন্ট্রাল মিডফিল্ডার (CM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    matches: 22,
    goals: 4,
    assists: 6,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল মধ্যপাড়া',
    joinedYear: '২০২১',
    bio: 'মাঝমাঠে বল নিয়ন্ত্রণ ও পাসের ছন্দ ধরে রাখতে সুমনের ভূমিকা অপরিসীম।'
  },
  {
    id: 'sk-14',
    sl: 14,
    name: 'শাকিল',
    age: 20,
    jersey: '১৪',
    sport: 'football',
    role: 'স্ট্রাইকার (ST)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
    matches: 18,
    goals: 9,
    assists: 3,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল বাজার',
    joinedYear: '২০২৩',
    bio: 'তরুণ উদীয়মান স্ট্রাইকার শাকিল। ক্ষিপ্রগতি ও বক্সে বল ধরে রেখে আচমকা শটে গোল করার জন্য খ্যাতিমান।'
  },
  {
    id: 'sk-15',
    sl: 15,
    name: 'নাইম',
    age: 19,
    jersey: '১৫',
    sport: 'football',
    role: 'উইং ব্যাক (RWB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=400&auto=format&fit=crop&q=80',
    matches: 16,
    goals: 2,
    assists: 4,
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল দক্ষিণপাড়া',
    joinedYear: '২০২৩',
    bio: 'একাডেমির প্রতিভাবান তরুণ নাইম। আক্রমণ ও রক্ষণ উভয় দিকেই সমান উদ্যমী উইং ব্যাক।'
  },
  {
    id: 'sk-16',
    sl: 16,
    name: 'নোমান',
    age: 22,
    jersey: '১৬',
    sport: 'football',
    role: 'সেন্ট্রাল মিডফিল্ডার (CM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&auto=format&fit=crop&q=80',
    matches: 20,
    goals: 3,
    assists: 5,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল উত্তরপাড়া',
    joinedYear: '২০২২',
    bio: 'প্রতিপক্ষের মাঝমাঠের পাসিং চ্যানেল কেটে দিয়ে নিজ দলের আক্রমণ শানাতে নোমান সিদ্ধহস্ত।'
  },
  {
    id: 'sk-17',
    sl: 17,
    name: 'বুদ্ধু',
    age: 24,
    jersey: '১৭',
    sport: 'football',
    role: 'স্টপার ব্যাক (CB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&auto=format&fit=crop&q=80',
    matches: 23,
    goals: 1,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল পূর্বপাড়া',
    joinedYear: '২০২১',
    bio: 'দৃঢ় ডিফেন্স ও বল ইন্টারসেপশনে বুদ্ধু দলের অন্যতম নির্ভরযোগ্য ভরসার নাম।'
  },
  {
    id: 'sk-18',
    sl: 18,
    name: 'স্বপন',
    age: 21,
    jersey: '১৮',
    sport: 'football',
    role: 'ফরওয়ার্ড (FW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    matches: 19,
    goals: 7,
    assists: 4,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল পশ্চিমপাড়া',
    joinedYear: '২০২২',
    bio: 'আক্রমণভাগে গতি ও চটপটে মুভমেন্ট দিয়ে প্রতিপক্ষের ডিফেন্ডারদের ব্যস্ত রাখেন স্বপন।'
  },
  {
    id: 'sk-19',
    sl: 19,
    name: 'হোসেন',
    age: 23,
    jersey: '১৯',
    sport: 'football',
    role: 'লেফট ব্যাক (LB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    matches: 21,
    goals: 1,
    assists: 3,
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল মধ্যপাড়া',
    joinedYear: '২০২১',
    bio: 'রক্ষণভাগ সামলানো ও উইংয়ে নিখুঁত সাপোর্টের জন্য হোসেন অত্যন্ত নির্ভরযোগ্য ডিফেন্ডার।'
  },
  {
    id: 'sk-20',
    sl: 20,
    name: 'রিপন',
    age: 25,
    jersey: '২০',
    sport: 'football',
    role: 'সেন্ট্রাল মিডফিল্ডার (CM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    matches: 26,
    goals: 5,
    assists: 6,
    bloodGroup: 'AB (+ve)',
    village: 'শিয়ালকোল বাজার',
    joinedYear: '২০২০',
    bio: 'মাঝমাঠে অভিজ্ঞ রিপন দলের আক্রমণ সাজাতে দারুণ পরিপক্কতার পরিচয় দেন।'
  },
  {
    id: 'sk-21',
    sl: 21,
    name: 'জাকায়িরা',
    age: 20,
    jersey: '২১',
    sport: 'football',
    role: 'উইঙ্গার / ফরোয়ার্ড (W/FW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    matches: 17,
    goals: 6,
    assists: 5,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল উত্তরপাড়া',
    joinedYear: '২০২৩',
    bio: 'চমৎকার বল ড্রিবলিং ও দ্রুতগতির কাট-ইন করে শট নেওয়ায় জাকায়িরা এক প্রতিভাবান অস্ত্র।'
  },
  {
    id: 'sk-22',
    sl: 22,
    name: 'সোহাগ',
    age: 22,
    jersey: '২২',
    sport: 'football',
    role: 'রাইট ব্যাক (RB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    matches: 20,
    goals: 1,
    assists: 4,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল পূর্বপাড়া',
    joinedYear: '২০২২',
    bio: 'ডান দিকের উইংয়ে শারীরিক শক্তি ও চমৎকার ট্যাকলিংয়ের সমন্বয়ে সোহাগ এক শক্ত ডিফেন্ডার।'
  },
  {
    id: 'sk-23',
    sl: 23,
    name: 'ফারুক',
    age: 24,
    jersey: '২৩',
    sport: 'football',
    role: 'সেন্টার ব্যাক (CB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    matches: 24,
    goals: 2,
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল দক্ষিণপাড়া',
    joinedYear: '২০২১',
    bio: 'ডিফেন্সের মাঝখানে প্রতিপক্ষের আক্রমণকে নস্যাৎ করে দিতে ফারুকের উচ্চতা ও হেডিং অতুলনীয়।'
  },
  {
    id: 'sk-24',
    sl: 24,
    name: 'হুমায়ন',
    age: 23,
    jersey: '২৪',
    sport: 'football',
    role: 'ডিফেন্সিভ মিডফিল্ডার (DM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    matches: 22,
    goals: 2,
    assists: 4,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল বাজার',
    joinedYear: '২০২১',
    bio: 'মাঝমাঠের সুরক্ষায় হুমায়নের নিঃশব্দ পরিশ্রম ও নিখুঁত ইন্টারসেপশন দল গঠনে গুরুত্বপূর্ণ।'
  },
  {
    id: 'sk-25',
    sl: 25,
    name: 'ফিরোজ',
    age: 21,
    jersey: '২৫',
    sport: 'football',
    role: 'লেফট উইঙ্গার (LW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    matches: 18,
    goals: 5,
    assists: 6,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল পশ্চিমপাড়া',
    joinedYear: '২০২৩',
    bio: 'বাম প্রান্তের দ্রুতগতির দৌড়ে ক্রস পাঠানোর মাধ্যমে উইংয়ে ঝড় তোলেন ফিরোজ।'
  },
  {
    id: 'sk-26',
    sl: 26,
    name: 'মামুন',
    age: 22,
    jersey: '২৬',
    sport: 'football',
    role: 'স্ট্রাইকার (ST)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80',
    matches: 19,
    goals: 8,
    assists: 3,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল উত্তরপাড়া',
    joinedYear: '২০২২',
    bio: 'ডিবক্সের ভেতর ক্ষিপ্র ফিনিশার মামুন। মোক্ষম সময়ে গোলের সুযোগ কাজে লাগাতে দক্ষ।'
  },
  {
    id: 'sk-27',
    sl: 27,
    name: 'মামুন',
    age: 20,
    jersey: '২৭',
    sport: 'football',
    role: 'অ্যাটাকিং মিডফিল্ডার (AM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    matches: 17,
    goals: 4,
    assists: 5,
    bloodGroup: 'A (+ve)',
    village: 'শিয়ালকোল মধ্যপাড়া',
    joinedYear: '২০২৩',
    bio: 'সৃজনশীল খেলার জন্য তরুণ মামুন পরিচিত। যেকোনো কঠিন ডিফেন্সের ফাঁক খুঁজে বের করতে পারেন।'
  },
  {
    id: 'sk-28',
    sl: 28,
    name: 'আলী',
    age: 25,
    jersey: '২৮',
    sport: 'football',
    role: 'গোলরক্ষক (GK)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&auto=format&fit=crop&q=80',
    matches: 18,
    cleanSheets: '৭টি',
    saveRate: '৮৪%',
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল বাজার',
    joinedYear: '২০২১',
    bio: 'অভিজ্ঞ গোলকিপার আলী। এরিয়াল ক্যাচিং ও পেনাল্টি শটে তিনি দলের বিশ্বস্ত হাত।'
  },
  {
    id: 'sk-29',
    sl: 29,
    name: 'সুমন',
    age: 21,
    jersey: '২৯',
    sport: 'football',
    role: 'সেন্টার ব্যাক (CB)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=80',
    matches: 18,
    goals: 1,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল পূর্বপাড়া',
    joinedYear: '২০২৩',
    bio: 'পাওয়ারফুল ট্যাকল ও রক্ষণভাগের শৃঙ্খলা বজায় রাখতে সুমনের নিবেদন প্রশংসনীয়।'
  },
  {
    id: 'sk-30',
    sl: 30,
    name: 'জুয়েল',
    age: 23,
    jersey: '৩০',
    sport: 'football',
    role: 'সেন্ট্রাল মিডফিল্ডার (CM)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&auto=format&fit=crop&q=80',
    matches: 21,
    goals: 3,
    assists: 6,
    bloodGroup: 'AB (+ve)',
    village: 'শিয়ালকোল দক্ষিণপাড়া',
    joinedYear: '২০২২',
    bio: 'মাঝমাঠের নিয়ন্ত্রণ ও গতি পরিবর্তনে জুয়েলের পারদর্শিতা শিয়ালকোল দলকে এগিয়ে রাখে।'
  },
  {
    id: 'sk-31',
    sl: 31,
    name: 'রাজু',
    age: 22,
    jersey: '৩১',
    sport: 'football',
    role: 'উইঙ্গার (W)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?w=400&auto=format&fit=crop&q=80',
    matches: 19,
    goals: 5,
    assists: 4,
    bloodGroup: 'O (+ve)',
    village: 'শিয়ালকোল পশ্চিমপাড়া',
    joinedYear: '২০২২',
    bio: 'উইংয়ে দ্রুত দৌড় ও প্রতিপক্ষ ডিফেন্সকে ভেঙে ভেতরে ঢুকে শট নিতে রাজু অত্যন্ত দক্ষ।'
  },
  {
    id: 'sk-32',
    sl: 32,
    name: 'রাজু',
    age: 24,
    jersey: '৩২',
    sport: 'football',
    role: 'ফরোয়ার্ড (FW)',
    team: 'শিয়ালকোল স্পোর্টস একাদশ',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    matches: 23,
    goals: 8,
    assists: 5,
    bloodGroup: 'B (+ve)',
    village: 'শিয়ালকোল উত্তরপাড়া',
    joinedYear: '২০২১',
    bio: 'আক্রমণভাগের আক্রমণকারী তারকা রাজু। পাওয়ার শট ও নির্ভুল হেডিংয়ে দলকে এনে দেন কাঙ্ক্ষিত জয়।'
  }
];

export const OTHER_STAFF: Player[] = [
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
    age: 38,
    bio: 'প্রাক্তন জেলা দলের ফুটবলার ও বিসিবি সার্টিফাইড কোচ। তরুণদের ডিসিপ্লিন, সঠিক কৌশল ও আধুনিক ফিটনেস পরিচালনায় নিবেদিতপ্রাণ ক্রীড়া সংগঠক।',
    joinedYear: '২০২০'
  },
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
    age: 23,
    bio: 'মাঝের ওভারগুলোতে মারকুটে ব্যাটিং এবং নির্ভরযোগ্য মিডিয়াম পেস বোলিং দিয়ে একাধিক টুর্নামেন্টে দলকে একাই জিতিয়েছেন মাহমুদুল।',
    bloodGroup: 'O (+ve)',
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
    age: 24,
    honors: 'সিরাজগঞ্জ শীতকালীন ব্যাডমিন্টন ট্রফি ২০২৪ চ্যাম্পিয়ন',
    bio: 'দ্রুত স্ম্যাশ ও নেট গেমে দক্ষ। জেলা পর্যায়ে টানা ২ বারের চ্যাম্পিয়ন। ক্লাবের ইনডোর সুবিধায় নিয়মিত অনুশীলন পরিচালনা করেন।',
    bloodGroup: 'B (+ve)',
    joinedYear: '২০২৩'
  }
];

export const SQUAD_PLAYERS: Player[] = [...SHIALKOL_OFFICIAL_SQUAD, ...OTHER_STAFF];

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
    id: 'notice-office-sufl2026',
    title: 'শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ-২০২৬ (২য় আসর) - খেলোয়াড় নিবন্ধন ফরম',
    date: '২০২৬ সেশন',
    category: 'অফিস ও নিবন্ধন',
    description: 'শিয়ালকোল ক্রীড়া সংঘ আয়োজিত "শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ-২০২৬ইং দ্বিতীয় আসর"-এর অফিসিয়াল খেলোয়াড় নিবন্ধন ফরম (SUFL-26)। সকল দল ও খেলোয়াড়দের পূরণকৃত ফরম ও ১ কপি পাসপোর্ট সাইজ ছবিসহ ক্লাবে জমা দেওয়ার আহ্বান জানানো যাচ্ছে।',
    fileSize: 'অফিসিয়াল ফরম কপি (JPG)',
    downloadUrl: '/assets/aistudio/20133_5f36db33.jpg',
    image: '/assets/aistudio/20133_5f36db33.jpg'
  },
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
    name: 'এস এ সুলতান',
    role: 'সাধারণ সম্পাদক',
    roleTag: 'সাধারণ সম্পাদক',
    message: '"আধুনিক জিম, একাডেমি সুবিধা ও নিয়মিত টুর্নামেন্ট আয়োজনের মাধ্যমে আমরা শিয়ালকোলের তৃণমূলের প্রতিভাবান খেলোয়াড়দের উপযুক্ত ট্রেনিং ও সহায়তা নিশ্চিত করছি।"',
    image: '/assets/aistudio/20132__2__062f765a.jpg',
    phone: '+৮৮ ০১৭১২-৩১৭৬৭১'
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

export const GALLERY_MOMENTS: GalleryItem[] = [
  {
    id: 'gal-convener-anisur',
    tag: 'প্রধান আহ্বায়ক',
    category: 'office',
    title: 'মোঃ আনিসুর রহমান - প্রধান আহ্বায়ক ২০২৬',
    sub: 'শিয়ালকোল ক্রীড়া সংঘ আহ্বায়ক কমিটি',
    image: '/assets/aistudio/20143_c6e34012.jpg',
    caption: 'শিয়ালকোল ক্রীড়া সংঘের প্রধান আহ্বায়ক মোঃ আনিসুর রহমান (Md Anisur Rahaman)। ২০২৬ সেশনের আহ্বায়ক কমিটি ও সামগ্রিক ক্রীড়া উন্নয়ন পরিচালনা।'
  },
  {
    id: 'gal-sa-sultan-trophy',
    tag: 'চ্যাম্পিয়ন ট্রফি',
    category: 'ceremony',
    title: 'এস এ সুলতান ও চ্যাম্পিয়ন ট্রফি ২০২৬',
    sub: 'SUIFL-26 চ্যাম্পিয়ন সেলিব্রেশন',
    image: '/assets/aistudio/20132__2__062f765a.jpg',
    caption: 'শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ-২০২৬ (SUIFL-26) চ্যাম্পিয়ন ট্রফির সাথে ক্লাবের নেতৃবৃন্দ এস এ সুলতান (SA Sultan)।'
  },
  {
    id: 'gal-office-form-2026',
    tag: 'অফিস গ্যালারি',
    category: 'office',
    title: 'খেলোয়াড় নিবন্ধন ফরম ২০২৬',
    sub: 'শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ (২য় আসর)',
    image: '/assets/aistudio/20133_5f36db33.jpg',
    caption: 'শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ-২০২৬ইং দ্বিতীয় আসরের অফিসিয়াল খেলোয়াড় নিবন্ধন ফরম (SUFL-26)। শিয়ালকোল ক্রীড়া সংঘ কার্যালয় ও অফিস নথি।'
  },
  {
    id: 'gal-crowd-football',
    tag: 'ফুটবল ম্যাচ',
    category: 'match',
    title: 'দর্শকে মুখরিত শিয়ালকোল মাঠ',
    sub: 'শিয়ালকোল হাই স্কুল মাঠ',
    image: '/assets/aistudio/20128__1__37ecda23.jpg',
    caption: 'শত শত ফুটবলপ্রেমী দর্শকের করতালিতে মুখরিত শিয়ালকোল হাই স্কুল মাঠে আয়োজিত টুর্নামেন্টের জমজমাট ফুটবল ম্যাচ।'
  },
  {
    id: 'gal-trophy-handover',
    tag: 'ট্রফি বিতরণ',
    category: 'ceremony',
    title: 'চ্যাম্পিয়ন ট্রফি ও ক্রেস্ট বিতরণ',
    sub: 'শিয়ালকোল ক্রীড়া সংঘ মঞ্চ',
    image: '/assets/aistudio/20129__2__971a59e3.png',
    caption: 'শিয়ালকোল ক্রীড়া সংঘের আয়োজনে টুর্নামেন্টের জমকালো ফাইনাল শেষে প্রধান অতিথিদের উপস্থিতিতে চ্যাম্পিয়ন ট্রফি ও বিশেষ সম্মাননা স্মারক বিতরণ।'
  },
  {
    id: 'gal-crest-ceremony',
    tag: 'সম্মাননা স্মারক',
    category: 'ceremony',
    title: 'টুর্নামেন্ট সম্মাননা ক্রেস্ট গ্রহণ',
    sub: 'শিয়ালকোল একাদশ দল',
    image: '/assets/aistudio/20127__1__68de288f.jpg',
    caption: 'শিয়ালকোল ক্রীড়া সংঘের খেলোয়াড় ও নেতৃবৃন্দের বিশেষ সম্মাননা স্মারক ক্রেস্ট গ্রহণ ও আনন্দ উদযাপন।'
  },
  {
    id: 'gal-trophy-past',
    tag: 'চ্যাম্পিয়ন সেলিব্রেশন',
    category: 'match',
    title: 'গোল্ডকাপ জয় উদযাপন',
    sub: 'ফাইনাল ২০২৫',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPWBpGiMz4VkwFUuZ7YPTUvAuw-rBS7xiiVb_85N6hV7dBUPfEF3KcAjjkq2o-VeqMxz5cRaMCQzwclZOYQwKT_LsjysDCV_kkYTK0uneWxcmr1zylV_vQsS2Agrzw9uAXBbQS6eksMnfwVbL5l_MJl7ekFS05Ph-6aYmqXp68PEvosp299jTcq692YOOndveS1xsExl1Vqt8dtUYAT4LCVP9PzWqe0i_ynrtVp0Ybk-caKUzc0UkT7g',
    caption: 'উপজেলা গোল্ডকাপ ফুটবল টুর্নামেন্টে চ্যাম্পিয়ন ট্রফি নিয়ে শিয়ালকোল একাদশের বিজয়ের উচ্ছ্বাস।'
  },
  {
    id: 'gal-practice',
    tag: 'অনুশীলন সেশন',
    category: 'match',
    title: 'সকালের নেট প্র্যাকটিস',
    sub: 'ক্রিকেট একাডেমি',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQCUHfoBFWrsK0gEZ7VjwBjSeZ120hENRbvce32bHi60TNbmw9QpSLJlpWQtTUOLijvDB5p1-rKbDSYjnlDjZaRLhuGGztq1NRXrb8gW5s2jGZVGy9e7ei0uMrQRiYHSKv9MIObu7-2tW91IJtfx8EhBCRAdbYAKr2r77jR4F6QKXjAM_WCLkQC71qf-lYe33Cq4AKlott_30cxUueb3NRPZLHRVSWXCSMoVorkEB8NELi2Lx3QwAlwA',
    caption: 'সূর্যোদয়ের সাথে সাথেই শিয়ালকোল মাঠে কিশোর ক্রিকেটারদের ব্যাটিং ও পেস বোলিং নেট অনুশীলন।'
  }
];

export const OFFICE_GALLERY_DOCS = [
  {
    id: 'office-doc-sufl2026',
    title: 'শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ-২০২৬ইং (২য় আসর)',
    subtitle: 'অফিসিয়াল খেলোয়াড় নিবন্ধন ফরম (SUFL-26)',
    tag: 'খেলোয়াড় নিবন্ধন ফরম',
    watermark: 'SUFL-26',
    date: '২০২৬ইং',
    image: '/assets/aistudio/20133_5f36db33.jpg',
    description: 'শিয়ালকোল ইউনিয়ন আন্তঃ ফুটবল লীগ-২০২৬ইং দ্বিতীয় আসরের খেলোয়াড় নিবন্ধন ফরম। অফিসিয়াল অনুমোদন, খেলোয়াড়ের নাম, পিতার নাম, গ্রাম, জন্ম তারিখ, জার্সি নম্বর ও অধিনায়ক/ম্যানেজার স্বাক্ষরের ফরম্যাট।'
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
  phone: '+৮৮ ০১৭১২-৩১৭৬৭১',
  email: 'sasultan6522@gmail.com',
  image: '/assets/aistudio/20143_c6e34012.jpg'
};

export const DEFAULT_ADMIN_ACCOUNTS: import('../types').AdminProfile[] = [
  {
    id: 'admin-sasultan',
    name: 'এস এ সুলতান',
    nameEn: 'SA Sultan',
    role: 'সুপার অ্যাডমিন',
    roleTitle: 'সুপার অ্যাডমিন ও টেকনিক্যাল ডিরেক্টর',
    committee: 'আইটি ও ক্রীড়া পরিচালনা পর্ষদ',
    phone: '01712317671',
    email: 'sasultan6522@gmail.com',
    image: '/assets/aistudio/20132__2__062f765a.jpg',
    bio: 'শিয়ালকোল ক্রীড়া সংঘের ডিজিটাল ম্যানেজমেন্ট, টুর্নামেন্ট ডাটাবেস ও খেলোয়াড় তালিকা ব্যবস্থাপনায় নিবেদিত।',
    officeAddress: 'শিয়ালকোল বাজার সংলগ্ন, সদর, সিরাজগঞ্জ-৬৭০০',
    lastLogin: 'আজ, ২০২৬ (সক্রিয়)',
  }
];


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

