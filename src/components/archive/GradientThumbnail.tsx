import React from "react";

interface GradientThumbnailProps {
  hover: boolean;
  thumbnail?: string;
  showGradients?: boolean;
}

const GradientThumbnail: React.FC<GradientThumbnailProps> = ({ 
  hover, 
  thumbnail,
  showGradients = true 
}) => {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-t-[12px] bg-background">
      {/* Thumbnail Image */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt="Session Thumbnail"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            hover ? "scale-105" : "scale-100"
          }`}
        />
      )}

      {showGradients && (
        <>
          {/* Base Gradient (Non-Hover) - Acts as a subtle glow overlay when thumbnail exists */}
          <div
            className={`absolute transition-all duration-1000 ease-out w-[771.84px] h-[697.32px] left-[-173.92px]  pointer-events-none 
              bg-[radial-gradient(37%_49%_at_43%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              sm:bg-[radial-gradient(44%_50%_at_50%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              md:bg-[radial-gradient(44%_50%_at_46%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              xl:bg-[radial-gradient(44%_50%_at_50%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              ${hover ? "top-[-52px] opacity-0 scale-110" : "top-[-57.56px] opacity-100 scale-100"}
              ${thumbnail ? "mix-blend-overlay opacity-40" : ""}`}
          />

          {/* Active Gradient (Hover) */}
          <div
            className={`absolute transition-all duration-1000 ease-out w-[771.84px] h-[697.32px] left-[-173.92px] pointer-events-none 
              bg-[radial-gradient(44%_48%_at_50%_48%,var(--color-primary)_45%,var(--color-background-0)_100%)] 
              ${hover ? "top-[-52px] opacity-100 scale-100" : "top-[-57.56px] opacity-0 scale-90"}
              ${thumbnail ? "mix-blend-multiply opacity-50" : ""}`}
          />
        </>
      )}

      {/* Play Button Overlay */}
      {thumbnail && (
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-10 ${hover ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
           <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <svg width="32" height="32" viewBox="0 0 24 24" className="fill-primary">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
        </div>
      )}
    </div>
  );
};

export default GradientThumbnail;
