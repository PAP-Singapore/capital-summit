import React from "react";
import { type AgendaDaySession } from "./agenda-types";
import PitchHourGrid from "./PitchHourGrid";

interface AgendaSessionCardProps {
  session: AgendaDaySession;
  showDescription?: boolean;
}

const isPitchHour = (title: string) =>
  title.toLowerCase().includes("pitch hour");

const AgendaSessionCard: React.FC<AgendaSessionCardProps> = ({
  session,
  showDescription = false,
}) => {
  return (
    // `session-<id>` is the anchor an approval request crops its screenshot to
    // and the "Open preview" link jumps to. The id comes straight off the API
    // response, so it always matches the record under review.
    <div id={`session-${session.id}`} className="relative w-full last:mb-0">
      {/* Divider line */}
      <div className="relative flex items-center -mx-5 md:mx-0 w-[calc(100%+40px)] md:w-full">
        <div className="w-full h-px md:h-[1.5px] bg-[linear-gradient(90deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />
      </div>

      {/* Card body */}
      <div className="w-full px-0 md:px-4 py-3 md:pt-5 md:pb-6 bg-[radial-gradient(45.94%_87.38%_at_50.06%_-63.5%,var(--color-primary)_-36%,var(--color-background-0)_125%)] md:bg-[radial-gradient(40.94%_96.38%_at_50.06%_-63.5%,var(--color-primary)_-57%,var(--color-background-0)_125%)]">
        {/* Top row: DAY + time | badges */}
        <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          {/* Left: DAY label + time range */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-sans text-sm md:text-base lg:text-xl font-bold md:font-medium text-primary tracking-wide uppercase">
              {session.track}
            </span>
            <span className="font-sans text-base md:text-lg lg:text-xl font-normal text-text-medium">
              {session.time} - {session.endTime}
            </span>
          </div>

          {/* Right: type + venue badges */}
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            {session.type && (
              <span className="font-sans text-[12px] h-[24px] md:h-[28px] lg:h-[35px] md:text-sm lg:text-base -tracking-[0.24px] md:-tracking-[0.28px] lg:-tracking-[0.32px]  font-medium items-center flex text-text-medium uppercase px-4 py-0 rounded-full border border-border-light bg-background">
                {session.type}
              </span>
            )}
            <span className="font-sans text-[12px] h-[24px] md:h-[28px] lg:h-[35px] md:text-sm lg:text-base -tracking-[0.24px] md:-tracking-[0.28px] lg:-tracking-[0.32px] font-medium items-center flex text-text-medium capitalize px-4 py-0 rounded-full border border-border-light bg-background">
              {session.venue}
            </span>
          </div>
        </div>

        {/* Session title */}
        <h3 className="font-headline text-xl md:text-2xl lg:text-[28px] font-light leading-[1.1] text-text-dark mb-4 md:max-w-[1000px]">
          {session.title}
        </h3>

        {/* Optional session description (HTML from API) */}
        {showDescription && session.description && (
          <div
            className="font-sans text-sm md:text-base lg:text-lg leading-[1.4] text-text-medium mb-4 md:max-w-[1000px] [&_p]:mb-2 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: session.description }}
          />
        )}

        {/* Pitch Hour: show participating companies */}
        {isPitchHour(session.title) ? (
          <PitchHourGrid />
        ) : (
          /* Speaker list */
          session.speakers?.length > 0 && (
            <div className="flex flex-wrap items-center md:gap-x-5 gap-x-3 gap-y-2 mt-4">
              {session.speakers.map((sp) => (
                <div
                  key={sp.id}
                  className="flex items-center gap-2 md:gap-2.5 "
                >
                  <span className="h-1 w-1 md:w-2 md:h-2 shrink-0 bg-dark-gray" />
                  <span className="font-sans text-sm md:text-base lg:text-xl font-medium leading-[1.2] text-dark-gray">
                    {sp.name} - {sp.company}
                    {sp.isModerator && (
                      <span className="ml-1.5">(Moderator)</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AgendaSessionCard;
