import React, { useState } from 'react';
import { CLUB_LOGO, COMMITTEE, FACILITIES, NOTICES, MAP_IMAGE, CONVENER_DATA } from '../data/mockData';
import { ClubNotice, Facility } from '../types';

interface ClubContactScreenProps {
  onOpenNotice: (notice: ClubNotice) => void;
  onShowToast: (msg: string) => void;
  notices?: ClubNotice[];
  onOpenAdmin?: () => void;
  onNewApplication?: (app: {
    name: string;
    phone: string;
    sport: string;
    bloodGroup: string;
    membershipType: 'general' | 'lifetime';
  }) => void;
}

export const ClubContactScreen: React.FC<ClubContactScreenProps> = ({
  onOpenNotice,
  onShowToast,
  notices,
  onOpenAdmin,
  onNewApplication,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    sport: 'cricket',
    bloodGroup: 'B+',
    membershipType: 'general' as 'general' | 'lifetime',
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onNewApplication) {
      onNewApplication({ ...formData });
    }
    onShowToast('আপনার সদস্যপদ আবেদনটি সফলভাবে জমা হয়েছে! 🎉');
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      sport: 'cricket',
      bloodGroup: 'B+',
      membershipType: 'general',
    });
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* 1. HERO / CLUB HERITAGE CARD */}
      <section className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#005b34] via-[#137547] to-[#1a5939] p-5 text-white shadow-xl">
          {/* Subtle glow circles */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#fea619]/15 blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-[#9cf6bc]/10 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Club Crest Emblem */}
            <div className="relative w-24 h-24 mb-2 p-1 rounded-full bg-white shadow-xl ring-2 ring-white/50 flex items-center justify-center">
              <img
                alt="শিয়ালকোল স্পোর্টস অ্যাসোসিয়েশন প্রতীক"
                className="w-full h-full object-cover rounded-full"
                src={CLUB_LOGO}
              />
              <span className="absolute -bottom-1 bg-[#fea619] text-[#684000] px-2.5 py-0.5 rounded-full text-[10px] shadow-sm font-black uppercase tracking-wider whitespace-nowrap">
                স্থাপিত ২০২০ • EST 2020
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              শিয়ালকোল ক্রীড়া সংঘ
            </h1>
            <p className="text-xs text-[#9cf6bc] mt-0.5 font-semibold tracking-wider uppercase">
              সিরাজগঞ্জ সদর • জেলা ক্রীড়া সংস্থা অধিভুক্ত
            </p>

            {/* Slogan Ribbon */}
            <div className="mt-3.5 w-full bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[#9cf6bc] text-xs italic flex items-center justify-center gap-1 border border-white/10">
              <span className="material-symbols-outlined text-[16px] text-[#fea619]">format_quote</span>
              <span>"সুস্থ দেহ, সুন্দর মন, ক্রীড়াতেই যুব উন্নয়ন"</span>
              <span className="material-symbols-outlined text-[16px] text-[#fea619]">format_quote</span>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-3 gap-2 w-full mt-3.5 pt-2 border-t border-white/10 bg-[#005b34]/30 rounded-lg p-2.5">
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-[#fea619] font-score">৮৫০+</span>
                <span className="text-[10px] text-white/80">সদস্য</span>
              </div>
              <div className="flex flex-col items-center border-x border-white/10">
                <span className="text-lg font-black text-[#fea619] font-score">১৪</span>
                <span className="text-[10px] text-white/80">শিরোপা</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-[#fea619] font-score">২০২০</span>
                <span className="text-[10px] text-white/80">স্থাপিত (EST)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NOTICE BOARD TICKER */}
      <section className="px-4 mt-5">
        <div className="bg-[#e2e7ff] rounded-xl p-3.5 shadow-sm border border-[#bec9bf]/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] animate-pulse">campaign</span>
              <span className="text-sm font-bold text-[#131b2e]">জরুরি ক্লাব নোটিশবোর্ড</span>
            </div>
            <span className="text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded-full uppercase">
              লাইভ
            </span>
          </div>

          <div className="space-y-2">
            {(notices || NOTICES).slice(0, 3).map((notice) => (
              <div
                key={notice.id}
                onClick={() => onOpenNotice(notice)}
                className="bg-white rounded-lg p-2.5 flex items-start justify-between gap-2 shadow-sm hover:shadow transition-all cursor-pointer border border-[#bec9bf]/10 active:scale-[0.99]"
              >
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 text-[#3f4941] text-[10px]">
                    <span className="material-symbols-outlined text-[13px] text-[#855300]">calendar_today</span>
                    <span>{notice.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#bec9bf]" />
                    <span className="text-[#005b34] font-bold">{notice.category}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#131b2e] truncate mt-0.5">
                    {notice.title}
                  </p>
                </div>
                <button
                  aria-label="PDF ডাউনলোড"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenNotice(notice);
                  }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#005b34] hover:text-white flex items-center justify-center text-[#005b34] transition-colors"
                  title="PDF ডাউনলোড করুন"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONVENER & LEADERSHIP MESSAGE */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#005b34] text-[20px]">diversity_3</span>
            <h2 className="text-sm font-bold text-[#131b2e]">আহ্বায়ক ও কার্যনির্বাহী কমিটির বাণী</h2>
          </div>
          <span className="text-[10px] text-[#005b34] font-bold bg-[#9cf6bc]/30 px-2 py-0.5 rounded-full">
            ২০২৬ সেশন
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Convener Card: মোঃ আনিসুর রহমান */}
          <div className="bg-gradient-to-r from-white via-white to-[#f2f3ff] rounded-xl p-3 shadow-sm border border-[#fea619]/40 flex items-start gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#fea619]/10 rounded-full blur-xl pointer-events-none" />
            <img
              src={CONVENER_DATA.image}
              alt={CONVENER_DATA.name}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow ring-2 ring-[#fea619]/60"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-black text-[#131b2e] truncate">
                  {CONVENER_DATA.name}
                </h3>
                <span className="bg-[#fea619] text-[#684000] px-2 py-0.5 rounded-full text-[10px] font-black flex-shrink-0 uppercase tracking-wider">
                  আহ্বায়ক ২০২৬
                </span>
              </div>
              <p className="text-[11px] text-[#3f4941] line-clamp-2 mt-1 leading-relaxed italic">
                {CONVENER_DATA.message}
              </p>
              <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-[#fea619]/20">
                <span className="flex items-center gap-0.5 text-[10px] text-[#005b34] font-semibold">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  {CONVENER_DATA.committee}
                </span>
                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#005b34] hover:bg-[#137547] text-white text-[10px] font-bold shadow-sm active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[13px]">admin_panel_settings</span>
                    অ্যাডমিন প্যানেল
                  </button>
                )}
              </div>
            </div>
          </div>
          {COMMITTEE.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#bec9bf]/20 flex items-start gap-3"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow border border-[#bec9bf]/20"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">
                    {member.name}
                  </h3>
                  <span className="bg-[#005b34]/10 text-[#005b34] px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0">
                    {member.roleTag}
                  </span>
                </div>
                <p className="text-[11px] text-[#3f4941] line-clamp-2 mt-1 leading-relaxed italic">
                  {member.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLUB FACILITIES & ACTIVITIES */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#005b34] text-[20px]">stadium</span>
            <h2 className="text-sm font-bold text-[#131b2e]">ক্লাব সুবিধাসমূহ ও কার্যক্রম</h2>
          </div>
          <span className="text-xs text-[#005b34] font-bold">৫টি প্রধান বিভাগ</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {FACILITIES.map((facility) => (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className="relative overflow-hidden rounded-xl bg-white p-2.5 shadow-sm border border-[#bec9bf]/20 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer active:scale-[0.98]"
            >
              <div className="w-full h-24 rounded-lg overflow-hidden mb-2 relative bg-[#eaedff]">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-[#005b34] font-bold shadow-sm">
                  {facility.tag}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#131b2e] leading-tight">
                  {facility.title}
                </h4>
                <p className="text-[10px] text-[#3f4941] mt-0.5 line-clamp-1">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE MEMBERSHIP APPLICATION FORM */}
      <section className="px-4 mt-6">
        <div className="rounded-xl bg-white p-4 shadow-md border border-[#bec9bf]/20 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <span className="bg-[#9cf6bc] text-[#002110] text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider inline-block">
                সদস্যপদ রেজিস্ট্রেশন ২০২৫
              </span>
              <h2 className="text-base font-bold text-[#131b2e] mt-1">নতুন সদস্যপদ আবেদন</h2>
              <p className="text-[11px] text-[#3f4941]">আমাদের ক্রীড়া পরিবারের গর্বিত অংশীদার হোন</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#005b34]/10 flex items-center justify-center text-[#005b34] flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">card_membership</span>
            </div>
          </div>

          {submitted ? (
            <div className="rounded-xl bg-[#9cf6bc]/30 p-4 border border-[#9cf6bc] text-center space-y-2 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-[#005b34] text-white flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[24px]">check</span>
              </div>
              <h4 className="text-sm font-bold text-[#005b34]">আবেদন সফলভাবে গৃহীত হয়েছে!</h4>
              <p className="text-xs text-[#3f4941] leading-relaxed">
                ধন্যবাদ, <strong>{formData.name}</strong>। আপনার সদস্যপদ ক্যাটাগরি: <strong>{formData.membershipType === 'lifetime' ? 'আজীবন সদস্য' : 'সাধারণ সদস্য'}</strong>। ক্লাব সচিব আপনার সাথে শীঘ্রই যোগাযোগ করবেন।
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={handleResetForm}
                  className="px-4 py-1.5 rounded-lg bg-[#005b34] text-white text-xs font-bold"
                >
                  নতুন আবেদন করুন
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Applicant Name */}
              <div className="space-y-1">
                <label className="block text-xs text-[#131b2e] font-bold">
                  আবেদনকারীর পূর্ণ নাম <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="উদা: মো: সাব্বির আহমেদ"
                    className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-lg px-3 py-2 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#005b34]/20 transition-all border border-[#bec9bf]/20 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#3f4941] text-[18px]">
                    person
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <label className="block text-xs text-[#131b2e] font-bold">
                  মোবাইল নম্বর <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="০১৭১২-XXXXXX"
                    className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-lg px-3 py-2 text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#005b34]/20 transition-all border border-[#bec9bf]/20 outline-none"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#3f4941] text-[18px]">
                    call
                  </span>
                </div>
              </div>

              {/* Sport & Blood Group Row */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-xs text-[#131b2e] font-bold">
                    পছন্দের খেলা <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <select
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-lg px-2.5 py-2 text-xs sm:text-sm focus:bg-white border border-[#bec9bf]/20 outline-none"
                  >
                    <option value="cricket">ক্রিকেট</option>
                    <option value="football">ফুটবল</option>
                    <option value="badminton">ব্যাডমিন্টন</option>
                    <option value="kabaddi">কাবাডি</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs text-[#131b2e] font-bold">রক্তের গ্রুপ</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-lg px-2.5 py-2 text-xs sm:text-sm focus:bg-white border border-[#bec9bf]/20 outline-none"
                  >
                    <option value="A+">A (+ve)</option>
                    <option value="B+">B (+ve)</option>
                    <option value="O+">O (+ve)</option>
                    <option value="AB+">AB (+ve)</option>
                    <option value="A-">A (-ve)</option>
                    <option value="B-">B (-ve)</option>
                    <option value="O-">O (-ve)</option>
                    <option value="AB-">AB (-ve)</option>
                  </select>
                </div>
              </div>

              {/* Membership Category Segmented Select */}
              <div className="space-y-1 pt-1">
                <label className="block text-xs text-[#131b2e] font-bold">
                  সদস্য ক্যাটাগরি নির্বাচন করুন
                </label>
                <div className="grid grid-cols-2 gap-1.5 bg-[#f2f3ff] p-1 rounded-lg border border-[#bec9bf]/20">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, membershipType: 'general' })}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      formData.membershipType === 'general'
                        ? 'bg-[#005b34] text-white shadow-sm'
                        : 'text-[#3f4941] hover:text-[#005b34]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    <span>সাধারণ সদস্য</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, membershipType: 'lifetime' })}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      formData.membershipType === 'lifetime'
                        ? 'bg-[#fea619] text-[#684000] shadow-sm'
                        : 'text-[#3f4941] hover:text-[#855300]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>আজীবন সদস্য</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full min-h-[44px] bg-[#005b34] hover:bg-[#137547] text-white font-bold text-xs sm:text-sm uppercase rounded-lg shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>আবেদন জমা দিন</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 6. LOCATION MAP CARD */}
      <section className="px-4 mt-6">
        <div className="rounded-xl bg-white p-3.5 shadow-md border border-[#bec9bf]/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#005b34] text-[20px]">location_on</span>
              <h2 className="text-sm font-bold text-[#131b2e]">ক্লাব মাঠ ও কার্যালয়ের অবস্থান</h2>
            </div>
            <span className="text-[10px] font-bold bg-[#eaedff] text-[#3f4941] px-2 py-0.5 rounded">
              সিরাজগঞ্জ
            </span>
          </div>

          {/* Map Block */}
          <div
            className="w-full h-44 bg-cover bg-center rounded-lg shadow-inner relative flex items-end p-2.5 overflow-hidden"
            style={{ backgroundImage: `url(${MAP_IMAGE})` }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-2 flex items-center gap-2 shadow-md w-full border border-black/5">
              <div className="w-8 h-8 rounded-full bg-[#005b34] flex items-center justify-center text-white flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">sports_soccer</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#131b2e] leading-tight truncate">
                  শিয়ালকোল বাজার সংলগ্ন ক্রীড়া কমপ্লেক্স
                </p>
                <p className="text-[10px] text-[#3f4941] truncate">
                  সদর, সিরাজগঞ্জ • গুগল ম্যাপে রুট দেখুন
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Shialkol,Sirajganj,Bangladesh"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#eaedff] text-[#005b34] flex items-center justify-center flex-shrink-0 hover:bg-[#005b34] hover:text-white transition-colors"
                title="গুগল ম্যাপে খুলুন"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & SOCIAL HUB */}
      <section className="px-4 mt-6">
        <div className="rounded-xl bg-[#f2f3ff] p-3.5 shadow-sm border border-[#bec9bf]/20 space-y-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#855300] text-[20px]">contact_support</span>
            <h3 className="text-sm font-bold text-[#131b2e]">যোগাযোগের ঠিকানা</h3>
          </div>

          <div className="space-y-1.5 text-xs text-[#131b2e]">
            <a
              href="tel:+8801712345678"
              className="flex items-center gap-2.5 p-2 rounded-lg bg-white hover:bg-[#eaedff] transition-colors border border-[#bec9bf]/10 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#005b34]/10 text-[#005b34] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#3f4941]">সরাসরি কল করুন</span>
                <span className="text-xs font-bold text-[#131b2e] font-mono">+৮৮০১৭১২-৩৪৫৬৭৮</span>
              </div>
            </a>

            <a
              href="mailto:info@shialkolsports.org"
              className="flex items-center gap-2.5 p-2 rounded-lg bg-white hover:bg-[#eaedff] transition-colors border border-[#bec9bf]/10 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#fea619]/20 text-[#855300] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#3f4941]">অফিসিয়াল ইমেইল</span>
                <span className="text-xs font-semibold text-[#131b2e] truncate">info@shialkolsports.org</span>
              </div>
            </a>

            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-[#bec9bf]/10 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#1a5939]/10 text-[#1a5939] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-[#3f4941]">অফিসের ঠিকানা</span>
                <span className="text-xs text-[#131b2e]">শিয়ালকোল বাজার সংলগ্ন, সদর, সিরাজগঞ্জ-৬৭০০</span>
              </div>
            </div>
          </div>

          {/* Social Media Connect */}
          <div className="pt-1">
            <span className="text-[10px] text-[#3f4941] uppercase font-bold tracking-wider block mb-1.5">
              ক্লাব সোশ্যাল মিডিয়া কমিউনিটি
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white hover:bg-[#9cf6bc]/30 text-[#005b34] transition-colors text-center border border-[#bec9bf]/10 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">public</span>
                <span className="text-[10px] font-bold mt-0.5">ফেসবুক পেজ</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white hover:bg-[#ffdad6]/30 text-[#ba1a1a] transition-colors text-center border border-[#bec9bf]/10 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">smart_display</span>
                <span className="text-[10px] font-bold mt-0.5">ইউটিউব চ্যানেল</span>
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-lg bg-white hover:bg-[#9cf6bc]/40 text-[#1a5939] transition-colors text-center border border-[#bec9bf]/10 shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span className="text-[10px] font-bold mt-0.5">হোয়াটসঅ্যাপ</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#3f4941]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-[#eaedff]">
              <img src={selectedFacility.image} alt={selectedFacility.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">{selectedFacility.title}</h3>
            <p className="text-xs text-[#3f4941] mt-1">{selectedFacility.description}</p>
            {selectedFacility.features && (
              <ul className="mt-2.5 space-y-1 text-xs text-[#3f4941] list-disc pl-4">
                {selectedFacility.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setSelectedFacility(null)}
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
