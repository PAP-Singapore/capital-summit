import React from "react";
import { Link } from "react-router-dom";
import SessionCard from "../archive/SessionCard";
import { MOCK_SESSIONS } from "../../data/sessions";

const Recordings: React.FC = () => {
  // Take first two sessions for the homepage preview
  const featuredSessions = MOCK_SESSIONS.slice(0, 2);

  return (
    <section className="w-full pt-10 pb-[29px] md:py-16 md:pt-16 md:pb-10 lg:py-24 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-10">
        {/* Heading */}
        <div className="mb-10 md:mb-14 lg:mb-20">
          <h2 className="font-headline text-[16px] md:text-[28px] lg:text-[40px] xl:text-[40px] text-text-dark font-light max-w-2xs leading-tight md:max-w-[460px] lg:max-w-[650px]">
            Past Editions
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12 mb-10 md:mb-16">
          {featuredSessions.map((session, index) => (
            <div key={session.id}>
              <SessionCard session={session} index={index} isHomePage={true} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            to="/archive"
            id="watch-past-talks-button"
            className="group inline-flex items-center justify-center rounded-full bg-primary text-white font-sans font-normal transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary px-6 py-2 md:px-6 md:py-2.5 lg:px-10 lg:py-3 text-base md:text-xl lg:text-2xl leading-none btn-hover md:mb-px md:mt-px"
          >
            <span className="mb-[2px]">Watch Past Talks</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Recordings;
