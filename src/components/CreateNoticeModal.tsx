import React, { useState } from 'react';
import { ClubNotice } from '../types';
import { CLUB_LOGO } from '../data/mockData';

interface CreateNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNotice: (notice: ClubNotice) => void;
  onShowToast: (msg: string) => void;
}

export const CreateNoticeModal: React.FC<CreateNoticeModalProps> = ({
  isOpen,
  onClose,
  onAddNotice,
  onShowToast,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('টুর্নামেন্ট');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const enToBnDigits = (n: number | string) =>
      String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
    return `${enToBnDigits(today.getDate())} ${months[today.getMonth()]}, ২০২৬`;
  });
  const [signatory, setSignatory] = useState('এস এ সুলতান (আহ্বায়ক)');
  const [fileSize, setFileSize] = useState('১.২ মেগাবাইট (PDF)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onShowToast('অনুগ্রহ করে নোটিশের শিরোনাম প্রদান করুন!');
      return;
    }

    setIsSubmitting(true);
    const newNotice: ClubNotice = {
      id: `notice-${Date.now()}`,
      title: title.trim(),
      category: category.trim(),
      date: date.trim() || '২০২৬',
      description: description.trim() || `${signatory}-এর অনুমোদনক্রমে এই নোটিশটি প্রকাশিত হলো।`,
      fileSize: fileSize.trim() || '১.০ মেগাবাইট (PDF)',
    };

    try {
      onAddNotice(newNotice);
      onShowToast('নতুন নোটিশ সফলভাবে পোস্ট করা হয়েছে! 📢');
      setTitle('');
      setDescription('');
      onClose();
    } catch {
      onShowToast('নোটিশ পোস্ট করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar border border-emerald-900/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 p-1 ring-2 ring-[#005b34]/20 flex items-center justify-center overflow-hidden">
              <img src={CLUB_LOGO} alt="Club Crest" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">campaign</span>
                <h3 className="text-sm font-bold text-[#131b2e]">নতুন ক্লাব নোটিশ পোস্ট করুন</h3>
              </div>
              <p className="text-[10px] text-[#3f4941]">শিয়ালকোল ক্রীড়া সংঘ • সরাসরি লাইভ নোটিশবোর্ডে যুক্ত হবে</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#3f4941] active:scale-95 transition-all"
            title="বন্ধ করুন"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1">
              নোটিশ শিরোনাম <span className="text-[#ba1a1a]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="উদা: বিজয় দিবস ক্রিকেট টুর্নামেন্টের রেজিস্ট্রেশন সংক্রান্ত বিজ্ঞপ্তি"
              className="w-full px-3 py-2.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] outline-none border border-[#bec9bf]/30 focus:border-[#005b34] focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Category & Date Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                ক্যাটাগরি
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 rounded-xl bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] outline-none border border-[#bec9bf]/30 focus:border-[#005b34] focus:bg-white transition-all"
              >
                <option value="টুর্নামেন্ট">টুর্নামেন্ট</option>
                <option value="ক্রিকেট">ক্রিকেট</option>
                <option value="ফুটবল">ফুটবল</option>
                <option value="মেম্বারশিপ">মেম্বারশিপ</option>
                <option value="সাধারণ সভা">সাধারণ সভা</option>
                <option value="আহ্বায়ক বিজ্ঞপ্তি">আহ্বায়ক বিজ্ঞপ্তি</option>
                <option value="জরুরি সার্কুলার">জরুরি সার্কুলার</option>
                <option value="বার্ষিক উৎসব">বার্ষিক উৎসব</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                প্রকাশের তারিখ
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="উদা: ৩০ অক্টোবর, ২০২৬"
                className="w-full px-2.5 py-2 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#bec9bf]/30 focus:border-[#005b34] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Signatory / Issuer */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                স্বাক্ষরকারী / নোটিশ প্রদানকারী
              </label>
              <input
                type="text"
                value={signatory}
                onChange={(e) => setSignatory(e.target.value)}
                placeholder="এস এ সুলতান (আহ্বায়ক)"
                className="w-full px-2.5 py-2 rounded-xl bg-[#f2f3ff] text-xs text-[#005b34] font-bold outline-none border border-[#bec9bf]/30 focus:border-[#005b34] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                সংযুক্তি / ফাইল সাইজ
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="১.২ মেগাবাইট (PDF)"
                className="w-full px-2.5 py-2 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] outline-none border border-[#bec9bf]/30 focus:border-[#005b34] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1">
              নোটিশের বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="নোটিশের বিস্তারিত বক্তব্য ও নির্দেশনা এখানে লিখুন..."
              className="w-full px-3 py-2.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] outline-none border border-[#bec9bf]/30 focus:border-[#005b34] focus:bg-white transition-all resize-none shadow-inner"
            />
          </div>

          {/* Info hint */}
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-[#005b34] flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-700 flex-shrink-0 mt-0.5">verified</span>
            <span>
              এই নোটিশটি প্রকাশ করার সাথে সাথে ক্লাবের ডাটাবেসে স্থায়ীভাবে সংরক্ষিত হবে এবং সকল দর্শকের নোটিশবোর্ডে লাইভ দেখতে পাওয়া যাবে।
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#bec9bf]/40 text-[#3f4941] font-bold text-xs hover:bg-[#f2f3ff] active:scale-95 transition-all"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-2 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#005b34] hover:bg-[#137547] text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">post_add</span>
              <span>{isSubmitting ? 'পোস্ট হচ্ছে...' : 'নোটিশবোর্ডে পোস্ট করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
