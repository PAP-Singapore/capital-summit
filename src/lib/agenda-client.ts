/**
 * Client-side agenda API. Fetches sessions with full speaker lists for the speaker detail page.
 */
import axios from "axios";
import { API_BASE, apiHeaders } from "./api-config";

const AGENDA_URL = `${API_BASE}/agenda`;

export interface AgendaSessionSpeaker {
  id: string;
  name: string;
  company?: string;
  avatarSrc?: string;
  isModerator?: boolean;
}

interface RawSpeaker {
  id?: string | number;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  photo?: string;
  avatarSrc?: string;
  company?: string;
  company_name?: string;
  organization?: string;
  isModerator?: boolean;
  role?: string;
}

interface RawTag {
  id?: string | number;
  name?: string;
}

interface RawSession {
  id?: string | number;
  title?: string;
  starts_at?: string;
  ends_at?: string;
  format?: string;
  track?: string;
  location?: string;
  description?: string;
  speakers?: RawSpeaker[];
  tags?: RawTag[];
}

export interface AgendaSessionTag {
  id: string;
  name: string;
}

export interface AgendaSession {
  id: string;
  title: string;
  start_at: Date;
  end_at?: Date;
  dayKey: string;
  type?: string;
  track?: string;
  location?: string;
  description?: string;
  speakers: AgendaSessionSpeaker[];
  tags: AgendaSessionTag[];
}

const CET_TZ = "Europe/Berlin";

function toCET(date: Date): Date {
  const cetStr = date.toLocaleString("en-US", { timeZone: CET_TZ });
  return new Date(cetStr);
}

function toDayKey(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const d = toCET(new Date(iso));
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  } catch {
    return "";
  }
}

function mapSpeaker(sp: RawSpeaker): AgendaSessionSpeaker {
  const name =
    sp.full_name?.trim() ||
    [sp.first_name, sp.last_name].filter(Boolean).join(" ") ||
    "Speaker";
  return {
    id: String(sp.id || ""),
    name,
    company:
      sp.company || sp.company_name || sp.organization || undefined,
    avatarSrc: sp.photo || sp.avatarSrc || undefined,
    isModerator:
      sp.isModerator === true || sp.role?.toLowerCase() === "moderator",
  };
}

function mapTags(tags: RawTag[] | undefined): AgendaSessionTag[] {
  return (tags || [])
    .map((t) => ({ id: String(t.id ?? ""), name: t.name?.trim() || "" }))
    .filter((t) => t.id || t.name);
}

function mapSession(s: RawSession): AgendaSession {
  const start = s.starts_at ? toCET(new Date(s.starts_at)) : undefined;
  const end = s.ends_at ? toCET(new Date(s.ends_at)) : undefined;
  const speakers: AgendaSessionSpeaker[] = (s.speakers || []).map(mapSpeaker);

  return {
    id: String(s.id ?? ""),
    title: s.title || "Session",
    start_at: start || new Date(0),
    end_at: end,
    dayKey: toDayKey(s.starts_at),
    type: s.format || undefined,
    track: s.track || undefined,
    location: s.location || undefined,
    description: s.description || undefined,
    speakers,
    tags: mapTags(s.tags),
  };
}

async function fetchFeed(url: string): Promise<AgendaSession[]> {
  try {
    const res = await axios.get(url, { headers: apiHeaders });
    const data = res.data;
    const raw = Array.isArray(data) ? data : (data?.sessions ?? []);
    if (!Array.isArray(raw)) return [];
    return (raw as RawSession[])
      .map(mapSession)
      .filter((s) => {
        const yr = s.start_at.getFullYear();
        const isJan1 = s.start_at.getMonth() === 0 && s.start_at.getDate() === 1;
        return yr > 2020 && !isJan1;
      });
  } catch {
    return [];
  }
}

/**
 * Fetches all sessions from the event backend's agenda endpoint — the same API
 * the speakers and sponsors come from. Tags ("Main Stage", "Roundtable") arrive
 * on each session from the backend's track field, and the tag-pill UI turns
 * them into tabs; they used to come from *which* Sessionboard feed a session
 * was fetched from, which is why there were two URLs here.
 */
export async function fetchAgendaSessions(): Promise<AgendaSession[]> {
  return fetchFeed(AGENDA_URL);
}
