import { type SpeakerUI } from "../lib/speakers-client";
import { slugify } from "../utils/slugify";

export interface StaticSpeaker {
  full_name: string;
  title: string;
  company_name: string;
  /** Path under /public, e.g. "/images/speakers/Jane Doe.svg" */
  photo: string;
  linkedin_url?: string;
  twitter_url?: string;
  website?: string;
}

export const speakers: StaticSpeaker[] = [
  {
    full_name: "Peter Grosskopf",
    title: "CTO / COO",
    company_name: "AllUnity",
    photo: "/images/speakers/Peter Grosskopf.svg",
  },
  {
    full_name: "Tony McLaughlin",
    title: "CEO",
    company_name: "Ubyx",
    photo: "/images/speakers/Tony McLaughlin photo.svg",
  },
  {
    full_name: "Colin Banvile",
    title: "AI Solution Architect",
    company_name: "Stripe",
    photo: "/images/speakers/Colin Banvile.svg",
  },
  {
    full_name: "Seraphim Czecker",
    title: "Special Situations",
    company_name: "Solana Foundation",
    photo: "/images/speakers/Seraphim Czecker.jpg",
  },
  {
    full_name: "Jon Egilsson",
    title: "Co-founder",
    company_name: "Monerium",
    photo: "/images/speakers/Jon Egilsson.svg",
  },
  {
    full_name: "David Vatchev",
    title: "Head of Tokenization",
    company_name: "Fasanara Capital",
    photo: "/images/speakers/David Vatchev.svg",
  },
  {
    full_name: "Bernhard Schweizer",
    title: "Head of SAP Digital Currency Hub",
    company_name: "SAP",
    photo: "/images/speakers/Bernhard Schweizer.jpeg",
  },
  {
    full_name: "Immo Garlichs",
    title: "Product Manager",
    company_name: "Deutsche Bank",
    photo: "/images/speakers/Immo Garlichs.svg",
  },
];

/**
 * The same list in the shape the speaker cards and pages render.
 * `id` is the name slug, which is also the `/speakers/:speakerId` route param.
 */
export const speakersUI: SpeakerUI[] = speakers.map((s) => ({
  id: slugify(s.full_name),
  name: s.full_name,
  role: s.title,
  company: s.company_name,
  image: s.photo,
  linkedin_url: s.linkedin_url,
  twitter_url: s.twitter_url,
  website: s.website,
}));
