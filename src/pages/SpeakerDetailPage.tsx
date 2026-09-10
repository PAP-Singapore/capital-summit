import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findSpeakerBySlug } from "../utils/slugify";
import { type SpeakerUI } from "../lib/speakers-client";
import { type AgendaSession } from "../lib/agenda-client";
import { useGetAgenda } from "../queries/agenda";
import { useGetSpeakers } from "../queries/speakers";
import { buildAgendaDays } from "../components/agenda/agenda-types";
import SpeakerDetailBackNav from "../components/speaker-detail/SpeakerDetailBackNav";
import SpeakerDetailProfile from "../components/speaker-detail/SpeakerDetailProfile";
import SpeakerDetailSessions from "../components/speaker-detail/SpeakerDetailSessions";
import { SpeakersCTA } from "../components/speakers/SpeakersCTA";

// ── Helper: filter sessions that include this speaker ──────────────────────────
function sessionsForSpeaker(
  all: AgendaSession[],
  speaker: SpeakerUI,
): AgendaSession[] {
  const q = speaker.name.toLowerCase();
  return all.filter((s) =>
    s.speakers?.some(
      (sp) =>
        sp.id === speaker.id ||
        sp.name?.toLowerCase() === q ||
        sp.name?.toLowerCase().includes(q),
    ),
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
const SpeakerDetailPage: React.FC = () => {
  const { speakerId } = useParams<{ speakerId: string }>();
  const navigate = useNavigate();

  // ── State ────────────────────────────────────────────────────────────────────
  const [selectedDayKey, setSelectedDayKey] = useState("");

  // ── Data fetching ────────────────────────────────────────────────────────────
  const { data: agendaSessions = [], isLoading: agendaLoading } = useGetAgenda();
  const { data: speakers = [], isLoading: speakersLoading } = useGetSpeakers();
  const loading = agendaLoading || speakersLoading;

  // ── Derived data ─────────────────────────────────────────────────────────────
  const speaker = useMemo(
    () => findSpeakerBySlug(speakers, speakerId || ""),
    [speakers, speakerId],
  );

  const speakerSessions = useMemo(
    () => (speaker ? sessionsForSpeaker(agendaSessions, speaker) : []),
    [agendaSessions, speaker],
  );

  const agendaDays = useMemo(
    () => buildAgendaDays(speakerSessions),
    [speakerSessions],
  );

  // Default to first day once data is available
  useEffect(() => {
    if (agendaDays.length > 0 && !selectedDayKey) {
      setSelectedDayKey(agendaDays[0].key);
    }
  }, [agendaDays, selectedDayKey]);

  // ── Guards ───────────────────────────────────────────────────────────────────
  // if (!loading && !speaker) {
  //   navigate("/speakers");
  //   return null;
  // }

  if (loading || !speaker) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-sans text-base text-text-medium">Loading…</p>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col mt-5 md:mt-[24px] lg:mt-[30px]">
      <SpeakerDetailBackNav />

      {/* Two-panel layout */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11 pb-9 md:pb-16 lg:pb-[100px] gap-10 lg:gap-0">
        <SpeakerDetailProfile speaker={speaker} />
        <SpeakerDetailSessions
          speaker={speaker}
          agendaDays={agendaDays}
          selectedDayKey={selectedDayKey}
          onDayChange={setSelectedDayKey}
        />
      </div>

      <SpeakersCTA />
    </div>
  );
};

export default SpeakerDetailPage;
