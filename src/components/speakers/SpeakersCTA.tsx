import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonNew from "../ui/ButtonNew";
import { APPLY_FOR_SPEAKERS_URL } from "../../data/constants";

export const SpeakersCTA: React.FC<{ isRoundTable?: boolean }> = ({
  isRoundTable,
}) => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-background border-b border-border relative overflow-hidden">
      {/* Faded top border from right to left */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] z-20 pointer-events-none bg-[linear-gradient(90deg,var(--color-background-0)_3%,var(--color-dark-gray)_122.18%)]" />
      <div className="max-w-[1440px] mx-auto flex flex-row items-stretch min-h-[160px] md:min-h-[200px] lg:min-h-[220px] px-0 pl-5 lg:px-10">
        {/* Left: Text + Button */}
        <div className="flex flex-col justify-center gap-6 md:gap-8 py-10 md:py-10 w-full md:w-1/2 lg:w-[38%] shrink-0 relative z-10 overflow-hidden">
          {/* Bottom-right corner gradient glow  */}
          <div className="absolute bottom-0 right-0 w-[400px] h-[250px] pointer-events-none -z-10 opacity-70 lg:opacity-100 bg-[linear-gradient(141.11deg,var(--color-background-0)_57%,var(--color-primary)_164.53%)]" />
          <h2 className="font-headline text-[24px] md:text-[36px] lg:text-[40px] font-normal md:font-light leading-[1.15] text-text-medium">
            {isRoundTable ? "Want to share your thoughts" : "Want to speak"}
            <br />
            {isRoundTable ? "on these topics?" : "at Capital Summit?"}
          </h2>
          <div>
            <a
              href={
                isRoundTable
                  ? "https://partyactionpeople.typeform.com/roundtabless26"
                  : APPLY_FOR_SPEAKERS_URL
              }
              target="_blank"
            >
              <ButtonNew variant="outline">
                {isRoundTable ? "Apply to Participate" : "Apply to Speak"}
              </ButtonNew>
            </a>
          </div>
        </div>

        {/* Right: Decorative arcs */}
        <div className="hidden md:flex flex-1 relative items-center justify-end overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[1.5px] z-20 pointer-events-none bg-[linear-gradient(180deg,var(--color-dark-gray-0)_0%,var(--color-dark-gray)_100%)]" />
          <img
            src="/spakersdecorative.svg"
            alt=""
            aria-hidden="true"
            className="opacity-100 w-full h-full  object-cover "
          />
        </div>
      </div>
    </section>
  );
};
