import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  type AgendaSession,
  type AgendaSessionSpeaker,
} from "../lib/agenda-client";
import { useGetAgenda } from "../queries/agenda";
import { buildAgendaTagGroups } from "../components/agenda/agenda-types";
import AgendaFilters from "../components/agenda/AgendaFilters";
import AgendaSessionList from "../components/agenda/AgendaSessionList";
import { BackToTopButton } from "../components/speakers/BackToTopButton";
import { SpeakersCTA } from "../components/speakers/SpeakersCTA";
import { useScrollToHash } from "../hooks/useScrollToHash";

const AgendaPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedDayKey, setSelectedDayKey] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  // ── Data fetching ──────────────────────────────────────────────────────────
  const { data: sessions = [], isLoading: loading } = useGetAgenda();

  // ── Derived filter options ─────────────────────────────────────────────────
  const typeOptions = useMemo(() => {
    const types = new Set<string>();
    sessions.forEach((s: AgendaSession) => {
      if (s.type) types.add(s.type);
    });
    return Array.from(types).sort();
  }, [sessions]);

  const topicOptions = useMemo(() => {
    const topics = new Set<string>();
    sessions.forEach((s: AgendaSession) => {
      if (s.track) topics.add(s.track);
    });
    return Array.from(topics).sort();
  }, [sessions]);

  // ── Filtering pipeline ─────────────────────────────────────────────────────
  // Step 1: Filter all sessions by type, topic, and search
  const matchedSessions = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return sessions.filter((s: AgendaSession) => {
      const typeMatch = !selectedType || s.type === selectedType;
      const topicMatch = !selectedTopic || s.track === selectedTopic;
      const searchMatch =
        !q ||
        s.speakers.some(
          (sp: AgendaSessionSpeaker) =>
            sp.name.toLowerCase().includes(q) ||
            sp.company?.toLowerCase().includes(q),
        );
      return typeMatch && topicMatch && searchMatch;
    });
  }, [sessions, selectedType, selectedTopic, searchQuery]);

  // Step 2: Group matched sessions into days
  const agendaDays = useMemo(
    () => buildAgendaTagGroups(matchedSessions),
    [matchedSessions],
  );

  // ── Deep link from a Slack approval: /agenda#session-<id> ──────────────────
  // Unlike speakers and sponsors, this list shows ONE tab at a time, so the
  // session under review is usually not in the tab that opens by default — and
  // an un-rendered anchor is one that both the deep link and the approval
  // screenshot fail to find. Resolve which tab holds it.
  const hashSessionId = useMemo(() => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    return id.startsWith("session-") ? id.slice("session-".length) : null;
  }, [hash]);

  const hashDayKey = useMemo(() => {
    if (!hashSessionId) return null;
    return (
      agendaDays.find((d) => d.sessions.some((s) => s.id === hashSessionId))
        ?.key ?? null
    );
  }, [agendaDays, hashSessionId]);

  // Step 3: Keep selectedDayKey valid when results change
  useEffect(() => {
    if (selectedDayKey === "workshop") return;
    if (agendaDays.length > 0) {
      const exists = agendaDays.some((d) => d.key === selectedDayKey);
      if (!exists) setSelectedDayKey(agendaDays[0].key);
    } else {
      setSelectedDayKey("");
    }
  }, [agendaDays, selectedDayKey]);

  // Step 3b: open the tab holding the deep-linked session. Declared after Step 3
  // so it wins on the render where the data first arrives and Step 3 would
  // otherwise default to the first tab.
  //
  // Applied once per distinct hash: re-running it on every `agendaDays` change
  // would drag the reader back to this tab each time they switched tabs or
  // typed in the filters.
  const appliedHashRef = useRef<string | null>(null);
  useEffect(() => {
    if (!hashDayKey || appliedHashRef.current === hash) return;
    appliedHashRef.current = hash;
    setSelectedDayKey(hashDayKey);
  }, [hash, hashDayKey]);

  // Step 4: Sessions for the currently selected day
  const filteredSessions = useMemo(() => {
    const day = agendaDays.find((d) => d.key === selectedDayKey);
    return day ? day.sessions : [];
  }, [agendaDays, selectedDayKey]);

  // `ready` is true only once the target is in the RENDERED tab, so the hook's
  // poll window starts when the anchor can actually be found rather than
  // burning down while the wrong tab is open.
  useScrollToHash(
    !loading &&
      filteredSessions.length > 0 &&
      (!hashSessionId || filteredSessions.some((s) => s.id === hashSessionId)),
  );

  const isRoundtable = selectedDayKey === "roundtable";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col mt-[18px] md:mt-[24px] lg:mt-[30px]">
      <BackToTopButton />

      {/* Page heading */}
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11 pt-4 md:pt-7">
        <h1 className="font-headline text-[32px] md:text-[80px] font-normal leading-tight text-text-dark mb-2 md:mb-1.5">
          Agenda
        </h1>
        <p className="font-sans text-xs md:text-sm text-text-medium mb-5 md:mb-3">
          Please note that the agenda may still be subject to minor changes.
        </p>
      </div>

      {/* Sticky filter bar */}
      <AgendaFilters
        agendaDays={agendaDays}
        selectedDayKey={selectedDayKey}
        onDayChange={setSelectedDayKey}
        typeOptions={typeOptions}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        topicOptions={topicOptions}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isRoundtable={isRoundtable}
      />

      {/* Roundtable intro */}
      {isRoundtable && (
        <div className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11 pt-6 md:pt-8">
          <p className="font-sans italic text-sm md:text-base lg:text-lg leading-[1.5] text-text-medium mb-5">
            Roundtables at <span className="font-semibold">Stable NYC</span> are
            small, closed-door discussions designed for focused,
            practitioner-led exchange. Each session is limited to approximately
            20 participants and runs for 45–60 minutes, led by a moderator in an
            open discussion format with no stage, slides or prepared remarks.
            <br />
            <br />
            These sessions are intended to bring together people actively
            working on the issues being discussed, creating space for candid,
            high-signal conversation among peers. All roundtables operate under
            Chatham House Rule to encourage open and constructive discussion.
          </p>
        </div>
      )}

      {/* Session list */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-11 pb-16 md:pb-24">
        <AgendaSessionList
          sessions={filteredSessions}
          isWorkShop={selectedDayKey === "workshop"}
          loading={loading}
          showDescriptions={isRoundtable}
        />
        {/* <div className="py-24 text-center">
          <p className="font-sans text-base text-text-medium">
            Agenda will be updated soon
          </p>
        </div> */}
      </div>

      <SpeakersCTA isRoundTable={isRoundtable} />
    </div>
  );
};

export default AgendaPage;
