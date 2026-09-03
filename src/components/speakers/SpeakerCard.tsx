import React from "react";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../utils/slugify";
import { type SpeakerUI } from "../../lib/speakers-client";
// No icon imports needed as we use the public folder directly

interface SpeakerCardProps {
  speaker: SpeakerUI;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/speakers/${slugify(speaker.name)}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col w-full shrink-0 relative overflow-visible cursor-pointer"
      id={`speaker-${speaker.id}`}
    >
      {/* Faded vertical line on right side - full opacity at top, fades to transparent at bottom */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-border to-transparent z-1000"></div>

      {/* Image Container */}
      <div className="bg-background speaker-img relative mb-3.5 md:mb-5.5 overflow-hidden w-full aspect-square mx-auto md:mx-0 group/speaker">
        {/* Decorative dot - now visible on all screens and pinned to image corner */}
        <div className="absolute top-0 left-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-dark-gray group-hover/speaker:bg-primary rounded-[1px] z-50 transition-colors duration-300"></div>
        <div className="bg-gradient-speaker"></div>
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover grayscale transition-all duration-700"
        />
      </div>

      {/* Metadata Area */}
      <div className="text-left">
        <h3 className="font-headline text-[20px] lg:text-[28px] mb-0 md:mb-1 text-text-medium leading-[1.1] tracking-tight font-light">
          {speaker.name}
        </h3>
        <div className="lg:space-y-0">
          <p className="font-sans text-[12px] md:text-base font-normal text-text-medium leading-tight uppercase tracking-[0em] mt-1 lg:mt-0">
            {speaker.role}
          </p>
          <p className="font-sans text-[12px] md:text-sm lg:text-[16px] font-bold md:mb-[11px] text-text-medium md:-mt-0.5">
            {speaker.company}
          </p>
        </div>

        {/* Social Icons — always visible */}
        <div className="flex items-center gap-7 md:gap-4 mt-3 md:mt-4">
          <a
            href={speaker.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-3 h-3 md:w-4 md:h-4 group"
          >
            <img
              src="/linkdin.svg"
              alt="LinkedIn"
              className="absolute inset-0 w-full h-full  group-hover:opacity-0 transition-opacity duration-200"
            />
            <img
              src="/linkdinhover.svg"
              alt="LinkedIn Hover"
              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </a>

          <a
            href={speaker.twitter_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-3 h-3 md:w-4 md:h-4 group"
          >
            <img
              src="/twitter.svg"
              alt="X / Twitter"
              className="absolute inset-0 w-full h-full  group-hover:opacity-0 transition-opacity duration-200"
            />
            <img
              src="/twitter-hover.svg"
              alt="X / Twitter Hover"
              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export const RevealCard: React.FC<{ speaker: SpeakerUI }> = ({ speaker }) => {
  return (
    <div
      className="speaker-card-reveal opacity-0 translate-y-8"
      style={{
        transition: "none", // Let GSAP handle transitions
      }}
    >
      <SpeakerCard speaker={speaker} />
    </div>
  );
};
