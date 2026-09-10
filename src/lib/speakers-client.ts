/**
 * Client-side speakers API. Fetches the event's speaker roster from the same
 * backend the agenda and sponsors come from, so the site never ships a
 * hand-maintained copy of the line-up.
 */
import axios from "axios";
import { API_BASE, apiHeaders } from "./api-config";

const SPEAKERS_URL = `${API_BASE}/speakers`;

/** Shown while a speaker has no photo uploaded on the backend yet. */
export const SPEAKER_PLACEHOLDER_IMAGE = "/images/speakers/placeholder.svg";

/** Session nested under a speaker in the API */
export interface ApiSpeakerSession {
  id: string;
  title: string;
  description?: string;
  format?: string | null;
  track?: string | null;
  track_color?: string | null;
  location?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  role?: string;
}

/** UI shape used by SpeakersPage, SpeakerDetailPage, and home Speakers */
export interface SpeakerUI {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  about?: string;
  website?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  country?: string;
  /** Sessions from API for detail page agenda */
  sessions?: ApiSpeakerSession[];
}

/** Raw speaker record as the backend returns it. */
interface RawSpeaker {
  id?: string | number;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  company_name?: string;
  photo?: string;
  bio?: string;
  about?: string;
  country?: string;
  website_url?: string;
  website?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  isModerator?: boolean;
  /** Only the preview feed carries this; the public feed is pre-filtered. */
  approval_status?: string;
  sessions?: ApiSpeakerSession[];
}

function fullName(s: RawSpeaker): string {
  const joined = [s.first_name, s.last_name].filter(Boolean).join(" ").trim();
  return s.full_name?.trim() || joined;
}

function mapSpeaker(s: RawSpeaker): SpeakerUI {
  return {
    id: String(s.id ?? ""),
    name: fullName(s),
    role: s.title?.trim() || "",
    company: s.company_name?.trim() || "",
    image: s.photo?.trim() || SPEAKER_PLACEHOLDER_IMAGE,
    about: s.bio?.trim() || s.about?.trim() || undefined,
    website: s.website_url?.trim() || s.website?.trim() || undefined,
    linkedin_url: s.linkedin_url?.trim() || undefined,
    twitter_url: s.twitter_url?.trim() || undefined,
    facebook_url: s.facebook_url?.trim() || undefined,
    country: s.country?.trim() || undefined,
    sessions: s.sessions,
  };
}

/**
 * Fetches the approved speaker roster. The preview feed also carries speakers
 * that are still pending, so anything not explicitly approved is dropped —
 * the public feed omits the field entirely and is kept as-is.
 */
export async function fetchSpeakers(): Promise<SpeakerUI[]> {
  const res = await axios.get(SPEAKERS_URL, { headers: apiHeaders });
  const data = res.data;
  const raw = Array.isArray(data) ? data : (data?.speakers ?? []);
  if (!Array.isArray(raw)) return [];

  return (raw as RawSpeaker[])
    .filter((s) => !s.approval_status || s.approval_status === "approved")
    .map(mapSpeaker)
    .filter((s) => s.name);
}
