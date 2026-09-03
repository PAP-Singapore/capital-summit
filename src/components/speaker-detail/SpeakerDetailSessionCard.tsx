import React from "react";
import { type AgendaSessionSpeaker } from "../../lib/agenda-client";

// ── Local type (mirrors AgendaDaySession from agenda-types but without track) ──
export type DetailSession = {
  id: string;
  title: string;
  time: string;
  endTime: string;
  venue: string;
  type?: string;
  dayNumber: number;
  track: string;
  speakers: AgendaSessionSpeaker[];
};

interface SpeakerDetailSessionCardProps {
  session: DetailSession;
}

const SpeakerDetailSessionCard: React.FC<SpeakerDetailSessionCardProps> = ({
  session,
}) => {
  console.log(session, "session");

  return (
    <div className="relative w-full mb-3.5 md:mb-8.5 last:mb-0">
      <div className="relative flex items-center -mx-5 md:mx-0 w-[calc(100%+40px)] md:w-full">
        <div className="absolute left-[-4px] z-30 w-2 h-2 bg-dark-gray hidden md:block" />
        <div className="w-full h-px md:h-[1.5px] bg-[linear-gradient(90deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />
      </div>

      <div className="w-full px-0 md:px-5 py-4 md:py-5 bg-[radial-gradient(45.94%_87.38%_at_50.06%_-63.5%,var(--color-primary)_-36%,var(--color-background-0)_125%)] md:bg-[radial-gradient(40.94%_96.38%_at_50.06%_-63.5%,var(--color-primary)_-57%,var(--color-background-0)_125%)]">
        <div className="flex flex-col md:flex-row flex-wrap md:items-center justify-between gap-2 mb-4 md:mb-3">
          <div className="flex items-center gap-5 flex-wrap">
            <span className="font-sans text-sm md:text-base lg:text-xl font-bold md:font-medium text-primary tracking-wide uppercase">
              {session.track}
            </span>
            <span className="font-sans text-sm md:text-lg lg:text-xl font-normal text-text-medium">
              {session.time} - {session.endTime}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            {session.type && (
              <span className="font-sans text-[12px] h-[24px] md:h-[28px] lg:h-[35px] md:text-sm lg:text-base -tracking-[0.24px] md:-tracking-[0.28px] lg:-tracking-[0.32px] font-medium items-center flex text-text-medium uppercase tracking-wider px-4 py-0 rounded-full border border-border-light bg-background">
                {session.type}
              </span>
            )}
            <span className="font-sans text-[12px] h-[24px] md:h-[28px] lg:h-[35px] md:text-sm lg:text-base lg:-tracking-[0.32px] font-medium items-center flex text-text-medium capitalize tracking-wider px-4 py-0 rounded-full border border-border-light bg-background">
              {session.venue}
            </span>
          </div>
        </div>

        <h3 className="font-headline text-xl md:text-2xl lg:text-[28px] font-light leading-[1.1] text-text-medium mb-3 md:max-w-[415px]">
          {session.title}
        </h3>

        {session.speakers?.length > 0 && (
          <div className="flex flex-wrap items-center md:gap-x-5 gap-x-3 gap-y-2 mt-3">
            {session.speakers.map((sp) => {
              return (
                <div
                  key={sp.id}
                  className="flex items-center gap-2 md:gap-2.5 "
                >
                  <span className="h-1 w-1 md:w-2 md:h-2 shrink-0 bg-dark-gray" />
                  <span
                    className={`font-sans text-sm md:text-base lg:text-xl font-medium leading-[1.2] text-dark-gray `}
                  >
                    {sp.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakerDetailSessionCard;
