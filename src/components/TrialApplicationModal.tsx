import React, { useState } from 'react';

interface TrialApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (candidateName: string) => void;
}

export const TrialApplicationModal: React.FC<TrialApplicationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [candidateName, setCandidateName] = useState('');
  const [ageGroup, setAgeGroup] = useState('U-16');
  const [sport, setSport] = useState('football');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(candidateName);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005b34] text-[24px]">workspace_premium</span>
            <h3 className="text-base font-bold text-[#131b2e]">যুব ট্রায়াল আবেদন ২০২৫</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#3f4941]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#3f4941] mt-2 mb-4">
          অনূর্ধ্ব-১৬ ও অনূর্ধ্ব-১৯ বয়সভিত্তিক ফুটবল ও ক্রিকেট একাডেমিতে বিনামূল্যে অংশ নিতে আবেদন ফরম পূরণ করুন।
        </p>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#9cf6bc]/40 text-[#005b34] flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="text-sm font-bold text-[#005b34]">ট্রায়াল আবেদন গৃহীত হয়েছে!</h4>
            <p className="text-xs text-[#3f4941]">কোচিং প্যানেল ট্রায়ালের তারিখ ও সময় জানিয়ে এসএমএস পাঠাবে।</p>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-[#3f4941] mb-1">
                খেলোয়াড়ের পূর্ণ নাম <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="উদা: সাজিদ করিম"
                className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#3f4941] mb-1">বয়স গ্রুপ</label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none"
                >
                  <option value="U-14">অনূর্ধ্ব-১৪</option>
                  <option value="U-16">অনূর্ধ্ব-১৬</option>
                  <option value="U-19">অনূর্ধ্ব-১৯</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3f4941] mb-1">খেলা নির্বাচন</label>
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none"
                >
                  <option value="football">ফুটবল একাডেমি</option>
                  <option value="cricket">ক্রিকেট একাডেমি</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3f4941] mb-1">
                অভিভাবক / প্রার্থীর মোবাইল নম্বর <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="০১৭১২-XXXXXX"
                className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-[#005b34] hover:bg-[#137547] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md active:scale-95 transition-all"
            >
              ট্রায়ালের জন্য আবেদন জমা দিন
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
