import React, { useState } from 'react';

interface PhotoLightboxModalProps {
  photo: {
    title: string;
    sub?: string;
    image: string;
    caption?: string;
    tag?: string;
    category?: string;
  } | null;
  onClose: () => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({ photo, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!photo) return null;

  const isOfficeDoc = photo.category === 'office' || photo.tag?.includes('অফিস') || photo.title?.includes('নিবন্ধন');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo.image;
    link.download = `${photo.title.replace(/\s+/g, '_')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-[#131b2e] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
              isOfficeDoc ? 'bg-red-600 text-white' : 'bg-[#fea619] text-[#684000]'
            }`}>
              {isOfficeDoc ? 'অফিস গ্যালারি • ডকুমেন্ট' : 'স্মরণীয় মুহূর্ত'}
            </span>
            {isOfficeDoc && (
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                SUFL-26
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsZoomed(!isZoomed)}
              title={isZoomed ? "স্বাভাবিক আকার" : "বড় করে জুম করুন"}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isZoomed ? 'zoom_out' : 'zoom_in'}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div 
          onClick={() => setIsZoomed(!isZoomed)}
          className={`w-full bg-black/95 flex items-center justify-center overflow-auto cursor-pointer relative p-2 ${
            isZoomed ? 'max-h-[68vh]' : 'max-h-[55vh]'
          }`}
        >
          <img
            src={photo.image}
            alt={photo.title}
            className={`w-full object-contain transition-transform duration-300 ${
              isZoomed ? 'scale-125 my-8 cursor-zoom-out' : 'max-h-[50vh] cursor-zoom-in'
            }`}
          />
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white/70 text-[9px] pointer-events-none">
            {isZoomed ? 'জুম আউট করতে ক্লিক করুন' : 'জুম করতে ক্লিক করুন'}
          </span>
        </div>

        {/* Footer Meta & Download */}
        <div className="p-4 text-white bg-[#131b2e] border-t border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {photo.title}
              </h3>
              {photo.sub && (
                <span className="text-white/60 text-xs block mt-0.5">{photo.sub}</span>
              )}
              {photo.caption && (
                <p className="text-xs text-white/80 mt-1.5 leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">
                  {photo.caption}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="text-[10px] text-white/60">
              {isOfficeDoc ? 'অফিস নথি • শিয়ালকোল ক্রীড়া সংঘ' : 'শিয়ালকোল ক্রীড়া সংঘ অফিসিয়াল অ্যালবাম'}
            </span>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">
                {downloadSuccess ? 'check_circle' : 'download'}
              </span>
              <span>{downloadSuccess ? 'ডাউনলোড হয়েছে!' : isOfficeDoc ? 'ফরম ডাউনলোড' : 'ডাউনলোড'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
