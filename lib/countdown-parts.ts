export type CountdownLabels = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export type CountdownPart = { label: string; value: number };

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

/** Display value: days unpadded, other units two digits. */
export function formatCountdownValue(
  label: string,
  value: number,
  daysLabel: string,
): string {
  return label === daysLabel ? String(value) : pad2(value);
}

export function getCountdownParts(
  target: Date,
  now: Date,
  labels: CountdownLabels,
): CountdownPart[] {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) {
    return [
      { label: labels.days, value: 0 },
      { label: labels.hours, value: 0 },
      { label: labels.minutes, value: 0 },
      { label: labels.seconds, value: 0 },
    ];
  }
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  return [
    { label: labels.days, value: days },
    { label: labels.hours, value: hours },
    { label: labels.minutes, value: minutes },
    { label: labels.seconds, value: seconds },
  ];
}
