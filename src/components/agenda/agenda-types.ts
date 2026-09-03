import {
  type AgendaSession,
  type AgendaSessionSpeaker,
} from "../../lib/agenda-client";

// ─── Re-export speaker type for component use ─────────────────────────────────
export type { AgendaSessionSpeaker };

// ─── Domain Types ─────────────────────────────────────────────────────────────

export type AgendaDaySession = {
  id: string;
  title: string;
  time: string;
  endTime: string;
  venue: string;
  type?: string;
  track?: string;
  description?: string;
  dayNumber: number;
  speakers: AgendaSessionSpeaker[];
};

export type AgendaDay = {
  key: string;
  label: string;
  sessions: AgendaDaySession[];
};

// ─── Pure Helpers ─────────────────────────────────────────────────────────────

export function formatSessionTime(d: Date | undefined): string {
  if (!d) return "—";
  try {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "—";
  }
}

export function toAgendaDate(d: Date): string {
  const mon = d.toLocaleString("en-US", { month: "long" });
  return `${mon} ${d.getDate()}`;
}

export function toDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Groups sessions by tag. A session with multiple tags appears in each tag's group.
 * Sessions without tags are skipped.
 */
export function buildAgendaTagGroups(sessions: AgendaSession[]): AgendaDay[] {
  if (!sessions?.length) return [];

  const byTag = new Map<string, { name: string; sessions: AgendaSession[] }>();
  const firstSeen = new Map<string, number>();

  sessions.forEach((s, idx) => {
    for (const tag of s.tags || []) {
      const key = tag.id || tag.name;
      if (!key) continue;
      if (!byTag.has(key)) {
        byTag.set(key, { name: tag.name, sessions: [] });
        firstSeen.set(key, idx);
      }
      byTag.get(key)!.sessions.push(s);
    }
  });

  const sortedKeys = Array.from(byTag.keys()).sort(
    (a, b) => (firstSeen.get(a) ?? 0) - (firstSeen.get(b) ?? 0),
  );

  return sortedKeys.map((key, index) => {
    const group = byTag.get(key)!;
    const sorted = [...group.sessions].sort(
      (a, b) => (a.start_at?.getTime() ?? 0) - (b.start_at?.getTime() ?? 0),
    );
    return {
      key,
      label: group.name,
      sessions: sorted.map((s) => ({
        id: s.id,
        title: s.title || "Session",
        time: formatSessionTime(s.start_at),
        endTime: formatSessionTime(s.end_at),
        venue: s.location || "New York",
        type: s.type || undefined,
        track: s.track || undefined,
        description: s.description || undefined,
        dayNumber: index + 1,
        speakers: s.speakers || [],
      })),
    };
  });
}

export function buildAgendaDays(sessions: AgendaSession[]): AgendaDay[] {
  if (!sessions?.length) return [];

  const byDay = new Map<string, AgendaSession[]>();
  for (const s of sessions) {
    const key = s.dayKey || toDayKey(s.start_at || new Date());
    if (!key) continue;
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(s);
  }

  const sortedDays = Array.from(byDay.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  return sortedDays.map(([key, daySessions], index) => {
    const first = daySessions[0];
    const start = first.start_at || new Date();
    const label = toAgendaDate(start);
    const sorted = [...daySessions].sort(
      (a, b) => (a.start_at?.getTime() ?? 0) - (b.start_at?.getTime() ?? 0),
    );
    return {
      key,
      label,
      sessions: sorted.map((s) => ({
        id: s.id,
        title: s.title || "Session",
        time: formatSessionTime(s.start_at),
        endTime: formatSessionTime(s.end_at),
        venue: s.location || "JW Marriott - Cannes",
        type: s.type || undefined,
        track: s.track || undefined,
        dayNumber: index + 1,
        speakers: s.speakers || [],
      })),
    };
  });
}
