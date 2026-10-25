import React, { useState } from 'react';

interface TeamRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (teamName: string, tournament: string) => void;
  preselectedTournament?: string;
}

export const TeamRegistrationModal: React.FC<TeamRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  preselectedTournament = 'বিজয় দিবস ব্যাডমিন্টন ২০২৫',
}) => {
  const [teamName, setTeamName] = useState('');
  const [tournament, setTournament] = useState(preselectedTournament);
  const [managerName, setManagerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [playerCount, setPlayerCount] = useState('২');
  const [senderBkash, setSenderBkash] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(teamName, tournament);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005b34] text-[24px]">assignment_turned_in</span>
            <h3 className="text-lg font-bold text-[#131b2e]">দল রেজিস্ট্রেশন ফরম</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#3f4941]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#3f4941] mt-2 mb-4">
          দয়া করে দলের সঠিক তথ্য ও অধিনায়ক/ম্যানেজারের যোগাযোগ নম্বর প্রদান করুন। আমাদের টুর্নামেন্ট কমিটি ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।
        </p>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#9cf6bc]/40 text-[#005b34] flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h4 className="text-base font-bold text-[#005b34]">রেজিস্ট্রেশন সফল হয়েছে!</h4>
            <p className="text-xs text-[#3f4941]">"{teamName}" দলের তথ্য টুর্নামেন্ট ডাটাবেজে সংরক্ষণ করা হয়েছে।</p>
          </div>
        ) : (
          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-[#3f4941] mb-1">
                দলের নাম (Team Name) <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="উদা: শিয়ালকোল টাইগার্স / রতনকান্দি রাইডার্স"
                className="w-full px-3 py-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/30 transition-all border border-[#bec9bf]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3f4941] mb-1">
                টুর্নামেন্ট নির্বাচন করুন <span className="text-[#ba1a1a]">*</span>
              </label>
              <select
                value={tournament}
                onChange={(e) => setTournament(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/30 transition-all border border-[#bec9bf]/20"
              >
                <option value="বিজয় দিবস ব্যাডমিন্টন ২০২৫">বিজয় দিবস ব্যাডমিন্টন ২০২৫</option>
                <option value="শিয়ালকোল ভলিবল চ্যালেঞ্জ কাপ">শিয়ালকোল ভলিবল চ্যালেঞ্জ কাপ</option>
                <option value="শীতকালীন ক্রিকেট সুপার লিগ ২০২৬">শীতকালীন ক্রিকেট সুপার লিগ ২০২৬</option>
                <option value="শিয়ালকোল গোল্ডকাপ ফুটবল ২০২৬">শিয়ালকোল গোল্ডকাপ ফুটবল ২০২৬</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#3f4941] mb-1">
                  ম্যানেজার / অধিনায়ক নাম
                </label>
                <input
                  type="text"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="উদা: কাজী মামুন"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/30 transition-all border border-[#bec9bf]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#3f4941] mb-1">
                  খেলোয়াড় সংখ্যা
                </label>
                <select
                  value={playerCount}
                  onChange={(e) => setPlayerCount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/30 transition-all border border-[#bec9bf]/20"
                >
                  <option value="২">২ জন (দ্বৈত ব্যাডমিন্টন)</option>
                  <option value="৬">৬ জন (ভলিবল)</option>
                  <option value="১১">১১ জন (ক্রিকেট/ফুটবল)</option>
                  <option value="১৫">১৫ জন (সম্পূর্ণ স্কোয়াড)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3f4941] mb-1">
                যোগাযোগের মোবাইল নম্বর <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="০১৭১২-XXXXXX"
                className="w-full px-3 py-2.5 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/30 transition-all border border-[#bec9bf]/20"
              />
            </div>

            {/* Registration Fee & bKash Box */}
            <div className="rounded-xl border border-pink-300 bg-gradient-to-br from-pink-50 via-rose-50/50 to-white p-3 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#e2136e] text-white flex items-center justify-center font-bold text-[10px]">
                    bK
                  </div>
                  <span className="text-xs font-bold text-[#e2136e]">দল এন্ট্রি / রেজিস্ট্রেশন ফি (bKash)</span>
                </div>
                <span className="text-[10px] font-bold text-[#005b34] bg-emerald-100 px-2 py-0.5 rounded">
                  নির্ধারিত ফি: ৳৫০০
                </span>
              </div>

              <div className="bg-white p-2 rounded-lg border border-pink-200 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500">বিকাশ পার্সোনাল নম্বর (Send Money):</span>
                  <span className="text-sm font-black text-[#e2136e] font-mono select-all">01712317671</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('01712317671');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 text-white transition-all ${
                    copied ? 'bg-emerald-600' : 'bg-[#e2136e] hover:bg-[#c90d5f]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">{copied ? 'check' : 'content_copy'}</span>
                  <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-0.5">প্রেরকের বিকাশ নম্বর</label>
                  <input
                    type="tel"
                    value={senderBkash}
                    onChange={(e) => setSenderBkash(e.target.value)}
                    placeholder="০১৭১২-XXXXXX"
                    className="w-full px-2 py-1.5 rounded bg-white text-xs border border-pink-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-0.5">বিকাশ TrxID</label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="উদা: B7K9X2P4M"
                    className="w-full px-2 py-1.5 rounded bg-white text-xs border border-pink-200 outline-none uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#005b34] hover:bg-[#137547] text-white font-bold text-sm rounded-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>রেজিস্ট্রেশন জমা দিন</span>
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
