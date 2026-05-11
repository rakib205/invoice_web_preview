const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkSpam(body: {
  honeypot?: string;
  formLoadedAt?: number;
  ip: string;
}): { blocked: boolean; reason?: string } {
  // Honeypot: bots fill hidden fields, humans don't
  if (body.honeypot) {
    return { blocked: true, reason: "bot" };
  }

  // Timing: reject submissions faster than 2 seconds (bots are instant)
  const elapsed = Date.now() - (body.formLoadedAt ?? 0);
  if (elapsed < 2000) {
    return { blocked: true, reason: "too_fast" };
  }

  // Rate limit: 3 submissions per IP per 10 minutes
  const now = Date.now();
  const window = 10 * 60 * 1000;
  const entry = rateLimitMap.get(body.ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= 3) {
      return { blocked: true, reason: "rate_limit" };
    }
    entry.count++;
  } else {
    rateLimitMap.set(body.ip, { count: 1, resetAt: now + window });
  }

  return { blocked: false };
}
