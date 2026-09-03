export interface Speaker {
  name: string;
  role: string;
  company: string;
  image: string;
}

export interface SpeakerSession {
  id: string;
  subsessions: string[];
  tagIds: string[];
  ceu_credits: string | null;
  role: string;
}

export interface SpeakersType {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  sessions: SpeakerSession[];
  title: string;
  company_name: string;
  photo: string;
  website: string;
  linkedin_url: string;
  twitter_url: string;
  profile_picture: string;
  facebook_url: string;
}
