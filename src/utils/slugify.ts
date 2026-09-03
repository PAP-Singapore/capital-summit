// Utility function to convert speaker name to URL-friendly slug
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
};

// Utility function to find speaker by slug
export const findSpeakerBySlug = <T extends { name: string }>(
  speakers: T[],
  slug: string
): T | undefined => {
  return speakers.find((speaker) => slugify(speaker.name) === slug);
};
