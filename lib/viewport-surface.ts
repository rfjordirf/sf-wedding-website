/** Whether a viewport point lies inside a `.terracotta-band` section (client coordinates). */
export function isPointOverTerracottaBand(clientX: number, clientY: number): boolean {
  for (const band of document.querySelectorAll(".terracotta-band")) {
    const r = band.getBoundingClientRect();
    if (
      clientX >= r.left &&
      clientX <= r.right &&
      clientY >= r.top &&
      clientY <= r.bottom
    ) {
      return true;
    }
  }
  return false;
}

/** Probe near top center (scroll-to-top control). */
export function probeViewportTopCenterTerracotta(): boolean {
  const cx = window.innerWidth / 2;
  const cy = Math.min(88, Math.max(52, window.innerHeight * 0.08));
  return isPointOverTerracottaBand(cx, cy);
}

/** Probe near bottom-left (fixed brand logo). */
export function probeViewportBottomLeftTerracotta(): boolean {
  const cx = Math.max(36, Math.min(72, window.innerWidth * 0.12));
  const cy = window.innerHeight - Math.max(36, 48);
  return isPointOverTerracottaBand(cx, cy);
}
