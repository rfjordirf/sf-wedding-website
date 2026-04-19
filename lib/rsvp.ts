export type RsvpPayload = {
  name: string;
  attending: "yes" | "no";
  guestCount: number;
  bringingChildren: boolean;
  childrenCount: number;
  message: string;
};

export type RsvpFormInput = {
  name: string;
  attending: string;
  guestCount: string;
  bringingChildren: string;
  childrenCount: string;
  message: string;
};

export type RsvpErrorCode =
  | "name_short"
  | "name_long"
  | "attending_required"
  | "guests_invalid"
  | "children_required"
  | "children_count_invalid"
  | "message_long";

export const RSVP_MESSAGE_MAX_LENGTH = 1500;

export function validateRsvp(
  data: RsvpFormInput,
):
  | { ok: true; value: RsvpPayload }
  | { ok: false; errors: RsvpErrorCode[] } {
  const errors: RsvpErrorCode[] = [];
  const name = data.name.trim();
  if (name.length < 2) errors.push("name_short");
  if (name.length > 120) errors.push("name_long");

  if (data.attending !== "yes" && data.attending !== "no") {
    errors.push("attending_required");
  }

  const guestCount = Number.parseInt(data.guestCount, 10);
  if (!Number.isFinite(guestCount) || guestCount < 0 || guestCount > 20) {
    errors.push("guests_invalid");
  }

  const message = data.message.trim();
  if (message.length > RSVP_MESSAGE_MAX_LENGTH) {
    errors.push("message_long");
  }

  const attending = data.attending as "yes" | "no";

  let bringingChildren = false;
  let childrenCount = 0;

  if (attending === "yes") {
    if (data.bringingChildren !== "yes" && data.bringingChildren !== "no") {
      errors.push("children_required");
    }
    bringingChildren = data.bringingChildren === "yes";
    if (bringingChildren) {
      childrenCount = Number.parseInt(data.childrenCount, 10);
      if (
        !Number.isFinite(childrenCount) ||
        childrenCount < 1 ||
        childrenCount > 15
      ) {
        errors.push("children_count_invalid");
      }
    }
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      attending,
      guestCount,
      bringingChildren,
      childrenCount: attending === "yes" ? childrenCount : 0,
      message,
    },
  };
}
