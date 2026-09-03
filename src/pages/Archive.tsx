import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterDropdown from "../components/archive/FilterDropdown";
import SessionCard from "../components/archive/SessionCard";
import { MOCK_SESSIONS } from "../data/sessions";
import { cityToSlug, slugToCity } from "../utils/cities";

// ─── Main Archive Page ─────────────────────────────────────────────────────────
const Archive: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const cities = useMemo(
    () => Array.from(new Set(MOCK_SESSIONS.map((s) => s.city))).sort(),
    [],
  );

  const [selectedYear, setSelectedYear] = useState("All Years");
  const [selectedCity, setSelectedCity] = useState(() => {
    const slug = searchParams.get("city");
    return (slug && slugToCity(slug, cities)) || "All Cities";
  });
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [selectedSpeaker, setSelectedSpeaker] = useState("All Speakers");
  const [selectedOrg, setSelectedOrg] = useState("All Organisations");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Keep the city filter in sync with the ?city= URL param (deep links,
  // browser back/forward, and links from the venue carousel).
  useEffect(() => {
    const slug = searchParams.get("city");
    setSelectedCity((slug && slugToCity(slug, cities)) || "All Cities");
  }, [searchParams, cities]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (city === "All Cities") next.delete("city");
        else next.set("city", cityToSlug(city));
        return next;
      },
      { replace: false },
    );
  };

  const years = Array.from(new Set(MOCK_SESSIONS.map((s) => String(s.year))))
    .sort()
    .reverse();
  const topics = Array.from(
    new Set(MOCK_SESSIONS.map((s) => s.topic).filter(Boolean)),
  ).sort();
  const speakers = Array.from(
    new Set(
      MOCK_SESSIONS.filter((s) => s.year === 2026).flatMap((s) =>
        s.speakers.map((sp) => sp.split(" (")[0]),
      ),
    ),
  ).sort();
  const orgs = Array.from(
    new Set(
      MOCK_SESSIONS.flatMap(
        (s) =>
          s.speakers
            .map((sp) => {
              const match = sp.match(/\((.+)\)/);
              return match ? match[1] : null;
            })
            .filter(Boolean) as string[],
      ),
    ),
  ).sort();

  const filtered = MOCK_SESSIONS.filter((s) => {
    if (selectedYear !== "All Years" && String(s.year) !== selectedYear)
      return false;
    if (selectedCity !== "All Cities" && s.city !== selectedCity) return false;
    if (selectedTopic !== "All Topics" && s.topic !== selectedTopic)
      return false;
    if (
      selectedSpeaker !== "All Speakers" &&
      !s.speakers.some((sp) => sp.startsWith(selectedSpeaker))
    )
      return false;
    if (
      selectedOrg !== "All Organisations" &&
      !s.speakers.some((sp) => sp.includes(`(${selectedOrg})`))
    )
      return false;
    if (
      searchQuery &&
      !s.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.speakers.some((sp) =>
        sp.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    )
      return false;
    return true;
  });

  const [isAtBottom, setIsAtBottom] = useState(false);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (bottomSentinelRef.current) {
      observer.observe(bottomSentinelRef.current);
    }

    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background font-sans text-text-medium">
      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-5 md:px-7 lg:px-11 pt-10 md:pt-18 ">
        <h1 className="font-headline text-[32px] md:text-[64px] lg:text-[80px] font-normal leading-none tracking-tight mb-5 md:mb-9">
          Archive
        </h1>
      </div>

      {/* Sticky Filters Bar */}
      <div className="sticky top-[64px] md:top-[84px] z-40 bg-background/95 backdrop-blur-sm border-b border-border/5">
        <div className="max-w-[1440px] mx-auto px-5 md:px-7 lg:px-11 py-4 md:py-6">
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center md:gap-4 gap-2">
            <FilterDropdown
              label="All Years"
              options={years}
              value={selectedYear}
              onChange={setSelectedYear}
            />
            <FilterDropdown
              label="All Cities"
              options={cities}
              value={selectedCity}
              onChange={handleCityChange}
            />
            <FilterDropdown
              label="All Topics"
              options={topics}
              value={selectedTopic}
              onChange={setSelectedTopic}
            />
            <FilterDropdown
              label="All Speakers"
              options={speakers}
              value={selectedSpeaker}
              onChange={setSelectedSpeaker}
            />
            <FilterDropdown
              label="All Organisations"
              options={orgs}
              value={selectedOrg}
              onChange={setSelectedOrg}
            />

            {/* Search */}
            <div className="relative w-full md:w-auto lg:w-full laptop:w-auto col-span-2">
              <input
                type="text"
                placeholder="Search by name or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[339px] lg:w-full laptop:w-[339px] h-[36px] md:h-[42px] pl-5 pr-12 border border-dark-gray rounded-full font-sans text-lg placeholder:text-sm md:placeholder:text-base  lg:placeholder:text-xl placeholder:font-medium placeholder:text-dark-gray focus:outline-none focus:ring-1 focus:ring-primary/30 shadow-sm transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 hover:text-primary transition-colors focus:outline-none"
                    aria-label="Clear search"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                ) : (
                  <div className="text-text-medium pointer-events-none">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <section
        ref={sectionRef}
        className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-11 lg:py-12 py-8 min-h-[400px]"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-headline text-2xl text-text-medium">
              No results found
            </p>
            <p className="text-text-light mt-2">
              Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-9.5">
              {filtered.map((session, i) => (
                <SessionCard key={session.id} session={session} index={i} />
              ))}
            </div>

            {/* Sticky Bottom Fade Gradient */}
            <div
              className={`sticky bottom-0 left-0 w-full h-[200px] pointer-events-none z-10 -mt-[200px] transition-all duration-500 ${
                isAtBottom
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, var(--color-background-0) 0%, var(--color-background) 100%)",
              }}
            />

            {/* Sentinel to detect end of list */}
            <div ref={bottomSentinelRef} className="h-1 w-full" />
          </div>
        )}
      </section>

      {/* Back to top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-12 md:w-[72px] h-12 md:h-[72px] rounded-full bg-primary text-white flex items-center justify-center shadow-xl transition-all duration-500 z-[999] active:scale-90 hover:scale-105 ${
          showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <img
          src="/arrowup.svg"
          alt="Back to top"
          className="w-5 h-5 md:w-6 md:h-6"
        />
      </button>
    </div>
  );
};

export default Archive;
