import React, { useState, useEffect, useRef } from "react";
import { speakersUI as speakers } from "../data/speakers";
import { BackToTopButton } from "../components/speakers/BackToTopButton";
import { HeroSection } from "../components/speakers/HeroSection";
import { SpeakerFilters } from "../components/speakers/SpeakerFilters";
import { SpeakersList } from "../components/speakers/SpeakersList";
import { SpeakersCTA } from "../components/speakers/SpeakersCTA";
import { useScrollToHash } from "../hooks/useScrollToHash";

/* ─── Main Page ───────────────────────────────────────────────── */
const SpeakersPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("All Roles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const speakersSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (speakersSectionRef.current) {
        const rect = speakersSectionRef.current.getBoundingClientRect();
        // Hide overlay when the bottom of the section is visible
        if (rect.bottom <= window.innerHeight + 10) {
          setShowBottomFade(false);
        } else {
          setShowBottomFade(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const uniqueRoles = Array.from(
    new Set(speakers.map((s) => s.role).filter(Boolean)),
  ).sort();

  const filteredSpeakers = speakers.filter((s) => {
    // Role filter
    const matchesRole = selectedRole === "All Roles" || s.role === selectedRole;

    // Search query filter
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter
    const matchesDate =
      !selectedDate ||
      (s.sessions &&
        s.sessions.some((session) => {
          if (!session.starts_at) return false;
          const dateStr = new Date(session.starts_at).toLocaleDateString(
            "en-US",
            { month: "long", day: "numeric" },
          );
          return dateStr === selectedDate;
        }));

    return matchesRole && matchesSearch && matchesDate;
  });

  // `/speakers#speaker-<id>` scrolls to that one card once the grid is on screen.
  useScrollToHash(filteredSpeakers.length > 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <BackToTopButton />

      <HeroSection />

      <SpeakerFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        uniqueRoles={uniqueRoles}
      />

      <SpeakersList
        filteredSpeakers={filteredSpeakers}
        loading={false}
        error={null}
        speakersSectionRef={speakersSectionRef}
      />

      {/* Sticky Bottom fade overlay */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full h-[130px] z-9990 pointer-events-none md:hidden transition-opacity duration-300 ${
          showBottomFade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, var(--color-background-0) 0%, var(--color-background) 100%)",
        }}
      />

      <SpeakersCTA />
    </div>
  );
};

export default SpeakersPage;
