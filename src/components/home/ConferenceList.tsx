export interface Conference {
  city: string;
  date: string;
  active: boolean;
  location?: string;
  audienceSize?: string;
  format?: string;
}

export const conferences: Conference[] = [
  {
    city: "New York City",
    date: "June 2026",
    active: false,
    location: "New York City, USA",
    audienceSize: "500–700 Senior Attendees",
    format: "Talks, panels, workshops, office hours",
  },
  {
    city: "Singapore",
    date: "October 2026",
    active: false,
    location: "Singapore",
    audienceSize: "350–550 Senior Attendees",
    format: "Talks, panels, workshops, office hours",
  },
  {
    city: "London",
    date: "November 2026",
    active: false,
    location: "London",
    audienceSize: "400–600 Senior Attendees",
    format: "Talks, panels, workshops, office hours",
  },
  {
    city: "Cannes",
    date: " 27-28 March 2026 ",
    active: false,
    location: "Cannes, France",
    audienceSize: "400–600 Senior Attendees",
    format: "Talks, panels, workshops, office hours",
  },
];
