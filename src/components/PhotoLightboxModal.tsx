import React from 'react';

interface PhotoLightboxModalProps {
  photo: {
    title: string;
    sub?: string;
    image: string;
    caption?: string;
  } | null;
  onClose: () => void;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-lg w-full bg-[#131b2e] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="w-full max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[60vh]"
          />
        </div>

        <div className="p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#fea619] text-[#684000] text-[10px] font-bold uppercase">
              স্মরণীয় মুহূর্ত
            </span>
            {photo.sub && <span className="text-white/60 text-xs">{photo.sub}</span>}
          </div>
          <h3 className="text-base font-bold text-white leading-snug">{photo.title}</h3>
          {photo.caption && (
            <p className="text-xs text-white/80 mt-1 leading-relaxed">{photo.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
};
