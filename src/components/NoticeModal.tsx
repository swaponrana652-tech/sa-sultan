import React, { useState } from 'react';
import { ClubNotice } from '../types';
import { CLUB_LOGO } from '../data/mockData';

interface NoticeModalProps {
  notice: ClubNotice | null;
  onClose: () => void;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({ notice, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);

  if (!notice) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 2500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with official letterhead */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <img src={CLUB_LOGO} alt="Club Crest" className="w-10 h-10 object-cover rounded-full ring-1 ring-[#005b34]/20" />
            <div>
              <h3 className="text-sm font-bold text-[#005b34]">শিয়ালকোল ক্রীড়া সংঘ</h3>
              <p className="text-[10px] text-[#3f4941]">সিরাজগঞ্জ সদর • প্রাতিষ্ঠানিক নোটিশবোর্ড</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#3f4941]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Notice Meta */}
        <div className="mt-3 flex items-center justify-between text-xs text-[#3f4941]">
          <span className="flex items-center gap-1 font-semibold text-[#855300]">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            {notice.date}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#137547]/10 text-[#005b34] font-bold text-[11px]">
            {notice.category}
          </span>
        </div>

        {/* Notice Title */}
        <h2 className="text-base font-bold text-[#131b2e] mt-2 mb-3 leading-snug">
          {notice.title}
        </h2>

        {/* Notice Official Body */}
        <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#bec9bf]/30 text-xs sm:text-sm text-[#3f4941] space-y-2 leading-relaxed">
          <p>{notice.description}</p>

          {/* Attached Document / Form Image if available */}
          {notice.image && (
            <div className="my-3 rounded-xl overflow-hidden border border-red-200 bg-white p-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-1.5 px-0.5">
                <span className="text-[11px] font-black text-red-700 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">description</span>
                  সংযুক্ত অফিসিয়াল ফরম ও নথি
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  SUFL-26
                </span>
              </div>
              <div className="relative rounded-lg overflow-hidden bg-slate-50 max-h-56 flex items-center justify-center border border-slate-200">
                <img
                  src={notice.image}
                  alt={notice.title}
                  className="w-full object-contain max-h-56"
                />
              </div>
            </div>
          )}

          <p className="pt-2">
            ক্লাবের সম্মানিত সভাপতি ও সাধারণ সম্পাদকের অনুমোদনে এই বিজ্ঞপ্তি প্রকাশ করা হলো। বিস্তারিত তথ্যের জন্য ক্লাব সেক্রেটারিয়েটে সরাসরি যোগাযোগের অনুরোধ করা যাচ্ছে।
          </p>

          <div className="pt-4 flex justify-between items-end border-t border-[#bec9bf]/30 text-[11px] text-[#3f4941]">
            <div>
              <span className="font-bold text-[#005b34] block">স্মারক নং: SSC/NOTICE/2026/02</span>
              <span>তারিখ: {notice.date}</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#131b2e] block">কাজী তারেক রহমান</span>
              <span className="text-[10px]">সাধারণ সম্পাদক, শিয়ালকোল ক্রীড়া সংঘ</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {notice.image ? (
            <a
              href={notice.image}
              download="SUFL2026_Player_Registration_Form.jpg"
              className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>অফিসিয়াল ফরম ডাউনলোড করুন</span>
            </a>
          ) : (
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 py-2.5 rounded-lg bg-[#005b34] hover:bg-[#137547] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                {downloadDone ? 'check' : 'download'}
              </span>
              <span>
                {downloading ? 'ডাউনলোড হচ্ছে...' : downloadDone ? 'PDF ডাউনলোড সম্পন্ন!' : 'অফিসিয়াল PDF ডাউনলোড করুন'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
