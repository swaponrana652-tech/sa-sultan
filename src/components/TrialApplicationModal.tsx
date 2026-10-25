import React, { useState } from 'react';

interface TrialApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (candidateName: string, feeAmount?: string, trxId?: string) => void;
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
  const [regFeeType, setRegFeeType] = useState<'trial' | 'league' | 'academy'>('trial');
  const [senderBkash, setSenderBkash] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const feeAmounts = {
    trial: { label: 'যুব ট্রায়াল ফি', amount: '১০০', num: 100 },
    league: { label: 'আন্তঃ ফুটবল লীগ ২০২৬ নিবন্ধন', amount: '২০০', num: 200 },
    academy: { label: 'একাডেমি ভর্তি ফরম ফি', amount: '১৫০', num: 150 },
  };

  const currentFee = feeAmounts[regFeeType];

  const handleCopyBkash = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('01712317671');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(candidateName, `৳${currentFee.amount}`, trxId);
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#005b34] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">যুব ট্রায়াল ও খেলোয়াড় নিবন্ধন ২০২৬</h3>
              <p className="text-[10px] text-[#3f4941]">শিয়ালকোল ক্রীড়া সংঘ • সিরাজগঞ্জ সদর</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#3f4941] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#3f4941] mt-2 mb-3 leading-relaxed">
          অনূর্ধ্ব-১৬, অনূর্ধ্ব-১৯ ও লীগ টুর্নামেন্টে অংশ নিতে নিবন্ধন ফরম পূরণ করে নির্ধারিত ফি প্রদান করুন।
        </p>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#9cf6bc]/40 text-[#005b34] flex items-center justify-center animate-bounce shadow-md">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h4 className="text-base font-bold text-[#005b34]">আবেদন ও ফি তথ্য সফলভাবে জমা হয়েছে!</h4>
            <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#bec9bf]/20 text-xs text-[#3f4941] space-y-1 max-w-sm w-full text-left">
              <p><span className="font-bold text-[#131b2e]">খেলোয়াড়ের নাম:</span> {candidateName}</p>
              <p><span className="font-bold text-[#131b2e]">রেজিস্ট্রেশন ফি:</span> ৳{currentFee.amount} ({currentFee.label})</p>
              <p><span className="font-bold text-[#131b2e]">বিকাশ TrxID:</span> {trxId || 'যাচাই প্রক্রিয়াধীন'}</p>
              <p><span className="font-bold text-[#131b2e]">বিকাশ নম্বর:</span> 01712317671 (কমিটি অ্যাকাউন্ট)</p>
            </div>
            <p className="text-xs text-[#3f4941]">কোচিং প্যানেল ও টুর্নামেন্ট কমিটি যাচাই শেষে এসএমএস পাঠিয়ে ট্রায়ালের সময় জানাবে।</p>
          </div>
        ) : (
          <form className="space-y-3.5" onSubmit={handleSubmit}>
            {/* 1. Candidate Name */}
            <div>
              <label className="block text-xs font-bold text-[#3f4941] mb-1">
                খেলোয়াড়ের পূর্ণ নাম <span className="text-[#ba1a1a]">*</span>
              </label>
              <input
                required
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="উদা: সাজিদ করিম / তানভীর আহমেদ"
                className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/20 transition-all"
              />
            </div>

            {/* 2. Age Group & Sport Selection */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#3f4941] mb-1">বয়স গ্রুপ</label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none focus:bg-white"
                >
                  <option value="U-14">অনূর্ধ্ব-১৪</option>
                  <option value="U-16">অনূর্ধ্ব-১৬</option>
                  <option value="U-19">অনূর্ধ্ব-১৯</option>
                  <option value="Senior">সিনিয়র (উন্মুক্ত)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3f4941] mb-1">খেলা নির্বাচন</label>
                <select
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none focus:bg-white"
                >
                  <option value="football">ফুটবল একাডেমি</option>
                  <option value="cricket">ক্রিকেট একাডেমি</option>
                  <option value="league-football">আন্তঃ ফুটবল লীগ ২০২৬</option>
                  <option value="badminton">ব্যাডমিন্টন স্কোয়াড</option>
                </select>
              </div>
            </div>

            {/* 3. Contact Phone */}
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
                className="w-full px-3 py-2 rounded-lg bg-[#f2f3ff] text-xs sm:text-sm border border-[#bec9bf]/20 outline-none focus:bg-white focus:ring-2 focus:ring-[#005b34]/20 transition-all"
              />
            </div>

            {/* 4. REGISTRATION FEE TYPE OPTION */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#131b2e] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#005b34]">payments</span>
                  রেজিস্ট্রেশন ফি ক্যাটাগরি (Fee Option)
                </label>
                <span className="text-[11px] font-black text-[#005b34] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  নির্ধারিত ফি: ৳{currentFee.amount}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['trial', 'league', 'academy'] as const).map((key) => {
                  const item = feeAmounts[key];
                  const isSelected = regFeeType === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRegFeeType(key)}
                      className={`p-2 rounded-xl text-left border flex flex-col justify-between transition-all active:scale-95 ${
                        isSelected
                          ? 'border-[#005b34] bg-emerald-50/70 shadow-sm ring-1 ring-[#005b34]'
                          : 'border-slate-200 bg-[#f8f9ff] hover:bg-slate-100 text-[#3f4941]'
                      }`}
                    >
                      <span className="text-[10px] font-semibold line-clamp-1">{item.label}</span>
                      <span className={`text-xs font-black mt-1 ${isSelected ? 'text-[#005b34]' : 'text-[#131b2e]'}`}>
                        ৳{item.amount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. BKASH PAYMENT INFORMATION BOX */}
            <div className="rounded-xl border border-pink-300 bg-gradient-to-br from-pink-50 via-rose-50/50 to-white p-3.5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#e2136e] text-white flex items-center justify-center font-black text-xs shadow-sm">
                    bK
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-[#e2136e]">বিকাশ পেমেন্ট (bKash Send Money)</h5>
                    <p className="text-[10px] text-slate-500">পার্সোনাল অ্যাকাউন্ট</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#e2136e]/10 text-[#e2136e] px-2 py-0.5 rounded-full border border-pink-200">
                  ফি: ৳{currentFee.amount}
                </span>
              </div>

              {/* bKash Number & Copy Button */}
              <div className="bg-white p-2.5 rounded-lg border border-pink-200 flex items-center justify-between gap-2 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-medium">বিকাশ পার্সোনাল নম্বর:</span>
                  <span className="text-sm font-black text-[#e2136e] tracking-wider select-all font-mono">
                    01712317671
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBkash}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95 ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#e2136e] hover:bg-[#c90d5f] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                  <span>{copied ? 'কপি হয়েছে!' : 'কপি করুন'}</span>
                </button>
              </div>

              {/* Step instructions */}
              <p className="text-[10px] text-slate-600 leading-tight">
                💡 <span className="font-semibold text-slate-700">নিয়ম:</span> বিকাশ অ্যাপ বা *247# থেকে <strong>Send Money</strong> করে <strong>01712317671</strong> নম্বরে <strong>৳{currentFee.amount}</strong> পাঠিয়ে নিচের তথ্য পূরণ করুন।
              </p>

              {/* bKash Sender Number & TrxID Input */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                    প্রেরকের বিকাশ নম্বর <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={senderBkash}
                    onChange={(e) => setSenderBkash(e.target.value)}
                    placeholder="০১৭১২-XXXXXX"
                    className="w-full px-2.5 py-1.5 rounded bg-white text-xs border border-pink-200 outline-none focus:ring-1 focus:ring-[#e2136e]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                    বিকাশ TrxID (Transaction ID) <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="উদা: B7K9X2P4M"
                    className="w-full px-2.5 py-1.5 rounded bg-white text-xs border border-pink-200 outline-none uppercase font-mono focus:ring-1 focus:ring-[#e2136e]"
                  />
                </div>
              </div>
            </div>

            {/* 6. Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#005b34] hover:bg-[#137547] text-white text-xs sm:text-sm font-bold rounded-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>৳{currentFee.amount} ফি সহ ট্রায়াল আবেদন জমা দিন</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
