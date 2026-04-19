"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { RsvpErrorCode } from "@/lib/rsvp";
import { RSVP_MESSAGE_MAX_LENGTH, validateRsvp } from "@/lib/rsvp";
import { useT } from "@/lib/i18n";
import { submitRsvp } from "@/lib/submit-rsvp";

export function Rsvp() {
  const t = useT();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [guestCount, setGuestCount] = useState("1");
  const [bringingChildren, setBringingChildren] = useState<"" | "yes" | "no">(
    "",
  );
  const [childrenCount, setChildrenCount] = useState("1");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<RsvpErrorCode[]>([]);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    const result = validateRsvp({
      name,
      attending,
      guestCount,
      bringingChildren,
      childrenCount,
      message,
    });
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors([]);
    await submitRsvp(result.value);
    setStatus("success");
  };

  const showChildrenBlock = attending === "yes";

  return (
    <Section
      id="rsvp"
      title={t.rsvp.title}
      eyebrow={t.rsvp.eyebrow}
      className="!pb-24 sm:!pb-28"
    >
      <Container>
        <div className="mx-auto max-w-md">
          <p
            data-reveal
            className="font-body mb-10 text-center text-[0.8125rem] font-light leading-[1.9] text-[var(--color-ink)]"
          >
            {t.rsvp.lead}
          </p>
          <form
            data-reveal
            onSubmit={onSubmit}
            className="border border-[var(--color-rule)] bg-[var(--color-linen)] p-8"
            noValidate
          >
            <label className="block">
              <span className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {t.rsvp.fullName}
              </span>
              <input
                className="input-line"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <fieldset className="mt-8">
              <legend className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {t.rsvp.attendingLegend}
              </legend>
              <div className="mt-3 flex flex-wrap gap-6">
                <label className="flex cursor-pointer items-center gap-2 font-body text-[0.875rem] font-light text-[var(--color-ink)]">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === "yes"}
                    onChange={() => {
                      setAttending("yes");
                      setStatus("idle");
                    }}
                    className="accent-[var(--color-ink)]"
                  />
                  {t.rsvp.yes}
                </label>
                <label className="flex cursor-pointer items-center gap-2 font-body text-[0.875rem] font-light text-[var(--color-ink)]">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === "no"}
                    onChange={() => {
                      setAttending("no");
                      setBringingChildren("");
                      setChildrenCount("1");
                      setStatus("idle");
                    }}
                    className="accent-[var(--color-ink)]"
                  />
                  {t.rsvp.no}
                </label>
              </div>
            </fieldset>

            <label className="mt-8 block">
              <span className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {t.rsvp.guests}
              </span>
              <input
                className="input-line"
                inputMode="numeric"
                name="guestCount"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value.replace(/\D/g, ""))}
              />
            </label>

            {showChildrenBlock ? (
              <>
                <fieldset className="mt-8">
                  <legend className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    {t.rsvp.childrenLegend}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-6">
                    <label className="flex cursor-pointer items-center gap-2 font-body text-[0.875rem] font-light text-[var(--color-ink)]">
                      <input
                        type="radio"
                        name="bringingChildren"
                        value="yes"
                        checked={bringingChildren === "yes"}
                        onChange={() => {
                          setBringingChildren("yes");
                          setStatus("idle");
                        }}
                        className="accent-[var(--color-ink)]"
                      />
                      {t.rsvp.yes}
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 font-body text-[0.875rem] font-light text-[var(--color-ink)]">
                      <input
                        type="radio"
                        name="bringingChildren"
                        value="no"
                        checked={bringingChildren === "no"}
                        onChange={() => {
                          setBringingChildren("no");
                          setStatus("idle");
                        }}
                        className="accent-[var(--color-ink)]"
                      />
                      {t.rsvp.no}
                    </label>
                  </div>
                </fieldset>

                {bringingChildren === "yes" ? (
                  <label className="mt-8 block">
                    <span className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      {t.rsvp.childrenCount}
                    </span>
                    <input
                      className="input-line"
                      inputMode="numeric"
                      name="childrenCount"
                      value={childrenCount}
                      onChange={(e) =>
                        setChildrenCount(e.target.value.replace(/\D/g, ""))
                      }
                    />
                  </label>
                ) : null}
              </>
            ) : null}

            <label className="mt-8 block">
              <span className="font-ui text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {t.rsvp.message}{" "}
                <span className="normal-case tracking-normal text-[var(--color-muted)]/85">
                  ({t.rsvp.optional})
                </span>
              </span>
              <textarea
                className="textarea-box"
                name="message"
                rows={4}
                maxLength={RSVP_MESSAGE_MAX_LENGTH}
                placeholder={t.rsvp.placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <span className="mt-1 block text-right font-ui text-[10px] text-[var(--color-muted)]">
                {message.length} / {RSVP_MESSAGE_MAX_LENGTH}
              </span>
            </label>

            {errors.length > 0 ? (
              <ul
                className="mt-6 list-inside list-disc font-ui text-sm text-red-900/90"
                role="alert"
              >
                {errors.map((code) => (
                  <li key={code}>{t.rsvp.errors[code]}</li>
                ))}
              </ul>
            ) : null}

            {status === "success" ? (
              <p
                className="mt-6 font-body text-[0.875rem] font-light leading-relaxed text-[var(--color-ink)]"
                role="status"
              >
                {t.rsvp.success}
              </p>
            ) : null}

            <button type="submit" className="btn-primary mt-8 w-full">
              {t.rsvp.submit}
            </button>
          </form>
        </div>
      </Container>
    </Section>
  );
}
