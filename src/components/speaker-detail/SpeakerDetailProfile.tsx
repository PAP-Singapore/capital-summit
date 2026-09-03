import React from "react";
import { type SpeakerUI } from "../../lib/speakers-client";

interface SpeakerDetailProfileProps {
  speaker: SpeakerUI;
}

const SpeakerDetailProfile: React.FC<SpeakerDetailProfileProps> = ({
  speaker,
}) => {
  return (
    <div className="w-full lg:w-[487px] flex flex-col shrink-0">
      {/* Name */}
      <h1 className="font-headline text-[32px] md:text-[56px] lg:text-[80px] lg:-tracking-[1.6px] font-normal lg:leading-[88px] text-text-medium mb-1.5 md:mb-3 lg:mb-5 mt-3 md:mt-6">
        {speaker.name}
      </h1>

      {/* Role & Company */}
      <p className="font-headline text-xl md:text-2xl lg:text-[32px] lg:leading-[39px] font-light text-text-medium mb-5.5 md:mb-8.5">
        {speaker.role} @ {speaker.company}
      </p>

      {/* Social links */}
      <div className="flex items-center md:gap-5 gap-3 mb-7 md:mb-12">
        <a
          href={speaker.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="LinkedIn"
        >
          <img
            src="/linkdin.svg"
            alt="LinkedIn"
            className="w-[18px] h-[18px] grayscale brightness-0"
          />
        </a>

        <a
          href={speaker.twitter_url}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-70 hover:opacity-100 transition-opacity flex items-center justify-center"
          aria-label="X"
        >
          <img
            src="/xlogo.svg"
            alt="X"
            className="w-[24px] h-[24px] grayscale brightness-0"
          />
        </a>
      </div>

      {/* Photo with decorative borders */}
      <div className="relative w-full max-w-[335px] md:max-w-[350px] lg:max-w-full aspect-3/4 lg:mx-0 mx-auto max-h-[400px] md:max-h-[573px]">
        {/* Main image */}
        <div className="relative w-full h-full overflow-hidden z-10">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Corner dot */}
        <div className="absolute hidden md:block bottom-[-4px] right-[-4px] z-30 w-2 h-2 bg-dark-gray" />
        {/* Bottom faded line */}
        <div className="absolute bottom-0 right-0 h-[1.5px] w-full z-20 bg-[linear-gradient(90deg,var(--color-dark-gray-0)_0%,var(--color-dark-gray)_100%)]" />
        {/* Right faded line */}
        <div className="absolute top-0 right-0 w-[1.5px] h-full z-20 bg-[linear-gradient(180deg,var(--color-dark-gray-0)_0%,var(--color-dark-gray)_100%)]" />
      </div>
    </div>
  );
};

export default SpeakerDetailProfile;
