/** Ceremony date/time in Cincinnati — offset required so SSR and browsers share one instant. */
export const WEDDING_ISO = "2026-05-09T16:00:00-04:00";

export const VENUE = {
  name: "Restaurant Three Brothers",
  addressLine: "9980 Kings Automall Dr",
  cityStateZip: "Cincinnati, OH 45249",
  fullAddress: "9980 Kings Automall Dr, Cincinnati, OH 45249",
  /** Google Maps embed query (no API key; standard embed). */
  embedQuery: "9980+Kings+Automall+Dr,+Cincinnati,+OH+45249",
} as const;

/** Opens Google Maps search for the venue (same target as embed). */
export function venueGoogleMapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE.fullAddress)}`;
}

export const COUPLE_NAMES = {
  short: "Sadriddin & Feruzabonu",
  monogram: "S & F",
} as const;
