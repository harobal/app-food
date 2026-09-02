const windowMs = 15 * 60 * 1000;
const recentByIp = new Map<string, number[]>();
const duplicateUntil = new Map<string, number>();

function prune(now: number) {
  for (const [ip, entries] of recentByIp) {
    const active = entries.filter((time) => now - time < windowMs);
    if (active.length) recentByIp.set(ip, active);
    else recentByIp.delete(ip);
  }
  for (const [key, until] of duplicateUntil) if (until <= now) duplicateUntil.delete(key);
}

export function checkInquiryGuard(ip: string, fingerprint: string, now = Date.now()) {
  prune(now);
  const attempts = recentByIp.get(ip) ?? [];
  if (attempts.length >= 5) return { ok: false as const, reason: "rate_limited" as const };
  if (duplicateUntil.has(fingerprint)) return { ok: false as const, reason: "duplicate" as const };
  attempts.push(now);
  recentByIp.set(ip, attempts);
  duplicateUntil.set(fingerprint, now + 10 * 60 * 1000);
  return { ok: true as const };
}

export function releaseInquiryFingerprint(fingerprint: string) {
  duplicateUntil.delete(fingerprint);
}
