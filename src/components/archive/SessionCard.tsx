import React, { useState, useEffect, useRef } from "react";
import { Session } from "../../types/session";
import GradientThumbnail from "./GradientThumbnail";

interface SessionCardProps {
  session: Session;
  index: number;
  isHomePage?: boolean;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, index, isHomePage }) => {
  const [hover, setHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const timer = setTimeout(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  const CardContent = (
    <div
      ref={cardRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative flex flex-col cursor-pointer rounded-[12px] overflow-hidden transition-all duration-500 ease-out h-full ${isHomePage ? 'bg-background-soft' : ''}`}
    >
      {isHomePage ? (
        /* 
           MANUAL ADJUSTMENT AREA (HOME PAGE ONLY):
           Adjust gradients, image scaling, and overlays here.
        */
        <div className="relative w-full aspect-video overflow-hidden rounded-t-[12px] bg-background">
          {/* Thumbnail Image */}
          {session.thumbnail && (
            <img
              src={session.thumbnail}
              alt="Session Thumbnail"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                hover ? "scale-105" : "scale-100"
              }`}
            />
          )}

          {/* Base Gradient (Non-Hover) */}
          <div
            className={`absolute transition-all duration-1000 ease-out w-[1038.84px] h-[697.32px] left-[-173.92px] pointer-events-none 
              bg-[radial-gradient(37%_49%_at_43%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              sm:bg-[radial-gradient(44%_50%_at_50%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              md:bg-[radial-gradient(44%_50%_at_46%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              xl:bg-[radial-gradient(44%_50%_at_50%_55%,var(--color-primary)_-14%,var(--color-background-0)_94%)] 
              ${hover ? "top-[-52px] opacity-0 scale-110" : "top-[-57.56px] opacity-100 scale-100"}
              ${session.thumbnail ? "mix-blend-overlay opacity-40" : ""}`}
          />

          {/* Active Gradient (Hover) */}
          <div
            className={`absolute transition-all duration-1000 ease-out w-[1038.84px] h-[697.32px] left-[-173.92px] pointer-events-none 
              bg-[radial-gradient(44%_48%_at_50%_48%,var(--color-primary)_45%,var(--color-background-0)_100%)] 
              ${hover ? "top-[-52px] opacity-100 scale-100" : "top-[-57.56px] opacity-0 scale-90"}
              ${session.thumbnail ? "mix-blend-multiply opacity-50" : ""}`}
          />

          {/* Play Button Overlay */}
          {session.thumbnail && (
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 z-10 ${hover ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
               <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <svg width="32" height="32" viewBox="0 0 24 24" className="fill-primary">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
            </div>
          )}
        </div>
      ) : (
        /* STANDARD ARCHIVE THUMBNAIL */
        <GradientThumbnail 
          hover={hover} 
          thumbnail={session.thumbnail} 
        />
      )}

      {/* Card Content */}
      <div className={`md:pt-6 pt-3.5 pb-4 md:pb-6 flex flex-col grow px-4 md:px-0 relative z-30 ${!isHomePage ? 'bg-background-soft' : ''}`}>
        {/* Meta row */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-5">
            <span className="font-sans text-[14px] md:text-[16px] font-bold text-primary tracking-tight">
              {session.year}
            </span>
            <span className="font-sans text-[14px] md:text-[16px] font-bold text-text-medium tracking-wider uppercase">
              {session.city}
            </span>
          </div>
          <span className="font-sans text-[12px] md:text-[16px] font-normal md:font-medium text-text-medium  px-4.5 py-1 border h-[27px] md:h-[35px]  border-border-light rounded-full shadow-sm uppercase">
            {session.type}
          </span>
        </div>

        {/* Topic */}
        <p className="font-sans text-[14px] md:text-[16px] text-text-medium font-normal leading-none  mb-2">
          {session.topic}
        </p>

        {/* Title */}
        <h3 className="font-sans text-base md:text-[20px] font-medium text-text-medium leading-[1.3] tracking-tight mb-2">
          {session.title}
        </h3>

        {/* Speakers */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
          {session.speakers.map((speaker: string, i: number) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-[5px] h-[5px] md:w-1.5 md:h-1.5 bg-dark-gray rounded-none shrink-0" />
              <span className="font-sans text-[14px] md:text-[16px] md:-tracking-[0.16px] text-dark-gray font-normal leading-none whitespace-nowrap ">
                {speaker}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (session.youtubeId) {
    return (
      <a 
        href={`https://www.youtube.com/watch?v=${session.youtubeId}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full no-underline"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

export default SessionCard;
