import type { RsvpPayload } from "@/lib/rsvp";

/** Replace with `fetch("/api/rsvp", …)` when a backend is available. */
export async function submitRsvp(payload: RsvpPayload): Promise<void> {
  void payload;
  await new Promise((r) => setTimeout(r, 420));
}
