import React, { useEffect, useRef, useState } from "react";
import { type AgendaDaySession } from "./agenda-types";
import AgendaSessionCard from "./AgendaSessionCard";
import { workshops } from "../../data/constants";

interface AgendaSessionListProps {
  sessions: AgendaDaySession[];
  isWorkShop: boolean;
  loading: boolean;
  showDescriptions?: boolean;
}

const AgendaSessionList: React.FC<AgendaSessionListProps> = ({
  sessions,
  isWorkShop,
  loading,
  showDescriptions = false,
}) => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsAtBottom(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (bottomSentinelRef.current) observer.observe(bottomSentinelRef.current);
    return () => observer.disconnect();
  }, [sessions]);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <p className="font-sans text-base text-text-medium">Loading agenda…</p>
      </div>
    );
  }
  if (!isWorkShop && sessions.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-sans text-base text-text-medium">
          No sessions added.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Session cards */}
      <div className="flex flex-col">
        {isWorkShop
          ? workshops.map((workshop) => (
              <a
                key={workshop.id}
                href={workshop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full last:mb-0"
              >
                <div className="relative flex items-center -mx-5 md:mx-0 w-[calc(100%+40px)] md:w-full">
                  <div className="w-full h-px md:h-[1.5px] bg-[linear-gradient(90deg,var(--color-dark-gray)_0%,var(--color-dark-gray-0)_100%)]" />
                </div>
                <div className="w-full px-0 md:px-4 py-3 md:pt-5 md:pb-6 bg-[radial-gradient(45.94%_87.38%_at_50.06%_-63.5%,var(--color-primary)_-36%,var(--color-background-0)_125%)] md:bg-[radial-gradient(40.94%_96.38%_at_50.06%_-63.5%,var(--color-primary)_-57%,var(--color-background-0)_125%)]">
                  <div className="flex flex-wrap flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    {workshop.date && (
                      <span className="font-sans text-base md:text-lg lg:text-xl font-normal text-text-medium">
                        {workshop.date}
                      </span>
                    )}
                    {workshop.location && (
                      <span className="font-sans text-[12px] h-[24px] md:h-[28px] lg:h-[35px] md:text-sm lg:text-base -tracking-[0.24px] md:-tracking-[0.28px] lg:-tracking-[0.32px] font-medium items-center flex text-text-medium capitalize px-4 py-0 rounded-full border border-border-light bg-background w-fit">
                        {workshop.location}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl lg:text-[28px] font-light leading-[1.1] text-text-dark md:max-w-[1000px]">
                    {workshop.title}
                  </h3>
                  {workshop.description && (
                    <div className="flex items-center gap-2 md:gap-2.5 mt-3 ">
                      <span className="h-1 w-1 md:w-2 md:h-2 shrink-0 bg-dark-gray" />
                      <span className="font-sans text-sm md:text-base lg:text-xl font-medium leading-[1.2] text-dark-gray">
                        {workshop.description}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ))
          : sessions.map((session) => (
              <AgendaSessionCard
                key={session.id}
                session={session}
                showDescription={showDescriptions}
              />
            ))}
      </div>

      {/* Sticky bottom fade gradient */}
      <div
        className={`sticky bottom-0 left-0 w-screen -ml-5 md:-ml-10 lg:-ml-11 h-[200px] pointer-events-none z-10 -mt-[200px] transition-all duration-500 ${
          isAtBottom ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, var(--color-background-0) 0%, var(--color-background) 100%)",
        }}
      />

      {/* Sentinel div to detect reaching bottom */}
      <div ref={bottomSentinelRef} className="h-1 w-full" />
    </div>
  );
};

export default AgendaSessionList;
