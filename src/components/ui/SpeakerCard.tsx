import React from "react";
import { useNavigate } from "react-router-dom";
import { type SpeakerUI } from "../../lib/speakers-client";
import { slugify } from "../../utils/slugify";

const SpeakerCard: React.FC<{ speaker: SpeakerUI }> = ({ speaker }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/speakers/${slugify(speaker.name)}`);
  };

  return (
    <div
      // onClick={handleClick}
      className="flex flex-col group/speaker w-[190px] md:w-[260px] lg:w-[332px] shrink-0 relative overflow-visible cursor-pointer"
    >
      {/* Decorative dot at top-left of image */}
      <div className="absolute hidden md:block top-0 left-1 w-2.5 h-2.5 bg-dark-gray group-hover/speaker:bg-primary rounded-[1px] z-[100] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"></div>

      {/* Faded vertical line on right side - full opacity at top, fades to transparent at bottom */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-border to-transparent z-1000"></div>

      {/* Image Container */}
      <div className="bg-background speaker-img relative mb-4 md:mb-6 overflow-hidden">
        <div className="bg-gradient-speaker"></div>
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full aspect-square object-cover grayscale transition-all duration-700"
        />
      </div>

      {/* Metadata Area */}
      <div className="text-left md:-mt-0.5 lg:mt-2">
        <h3 className="font-headline text-[16px] md:text-[24px] lg:text-[28px] mb-1 md:mb-2 text-text-medium lg:leading-[1.1] lg:tracking-tight font-light capitalize">
          {speaker.name}
        </h3>
        <div className=" md:-mt-[6px] lg:mt-0 lg:space-y-0">
          <p className="font-sans text-[12px] lg:text-base font-normal text-text-medium  leading-tight uppercase tracking-[0em] mt-2 lg:mt-0">
            {speaker.role}
          </p>
          <p className="font-sans text-[13px] md:text-xs  lg:text-[16px] font-bold text-text-dark capitalize">
            {speaker.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;
