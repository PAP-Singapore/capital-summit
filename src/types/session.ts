type SessionType = "KEYNOTE" | "TALK" | "PANEL" | "WORKSHOP" | "FIRESIDE";

export interface Session {
  id: string;
  year: number;
  city: string;
  type: SessionType;
  topic: string;
  title: string;
  speakers: string[];
  thumbnail?: string;
  youtubeId?: string;
}
