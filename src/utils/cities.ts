// Maps between city display names (as stored in session data) and URL slugs.
// e.g. "CANNES" <-> "cannes", "New York City" <-> "nyc"

// Short, friendly slugs that win over the auto-generated slug.
const SLUG_OVERRIDES: Record<string, string> = {
  "new-york-city": "nyc",
};

const slugify = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

/** Convert a city display name to its URL slug. */
export const cityToSlug = (city: string): string => {
  const base = slugify(city);
  return SLUG_OVERRIDES[base] ?? base;
};

/**
 * Resolve a URL slug back to the matching city in `cities`.
 * Returns null when no city matches.
 */
export const slugToCity = (slug: string, cities: string[]): string | null => {
  const normalized = slug.trim().toLowerCase();
  return cities.find((city) => cityToSlug(city) === normalized) ?? null;
};
