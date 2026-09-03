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
