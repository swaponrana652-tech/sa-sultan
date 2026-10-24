import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: 'home' | 'tournaments' | 'players' | 'club-contact') => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'লাইভ গোল এলার্ট!',
      desc: 'শিয়ালকোল ১ - ০ সলঙ্গা রাইডার্স (৩৪\' রাকিবুল হাসান - হেডার)',
      time: '১৫ মিনিট আগে',
      icon: 'sports_soccer',
      type: 'match',
      tab: 'tournaments' as const,
      isUnread: true,
    },
    {
      id: 'notif-2',
      title: 'মেম্বারশিপ নবায়ন ২০২৫',
      desc: 'নতুন সিজনের সাধারণ ও আজীবন সদস্যপদ নবায়ন ফরম বিতরণ চলছে।',
      time: '২ ঘণ্টা আগে',
      icon: 'card_membership',
      type: 'notice',
      tab: 'club-contact' as const,
      isUnread: true,
    },
    {
      id: 'notif-3',
      title: 'বিজয় দিবস ব্যাডমিন্টন টুর্নামেন্ট',
      desc: 'টিম রেজিস্ট্রেশনের শেষ সময় আগামী ১৫ ডিসেম্বর। দ্রুত নিবন্ধন করুন।',
      time: 'গতকাল',
      icon: 'emoji_events',
      type: 'tournament',
      tab: 'tournaments' as const,
      isUnread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-2xl max-h-[80vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005b34] text-[22px]">notifications_active</span>
            <h3 className="text-base font-bold text-[#131b2e]">ক্লাব নোটিফিকেশন</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#3f4941]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="divide-y divide-[#eaedff] mt-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectTab(item.tab);
                onClose();
              }}
              className="py-3 px-2 flex items-start gap-3 hover:bg-[#faf8ff] rounded-lg cursor-pointer transition-colors"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.type === 'match' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#9cf6bc]/40 text-[#005b34]'
              }`}>
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#131b2e] truncate">{item.title}</h4>
                  <span className="text-[10px] text-[#3f4941]">{item.time}</span>
                </div>
                <p className="text-xs text-[#3f4941] mt-0.5 line-clamp-2">{item.desc}</p>
              </div>
              {item.isUnread && (
                <span className="w-2 h-2 rounded-full bg-[#fea619] flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#eaedff] mt-2 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#005b34] hover:underline"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
