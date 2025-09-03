type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 60, refillMs = 60_000) {
  const now = Date.now();
  const b = buckets.get(key) ?? { tokens: limit, last: now };
  const elapsed = now - b.last;

  if (elapsed > refillMs) {
    b.tokens = limit;
    b.last = now;
  }

  if (b.tokens <= 0) return false;
  b.tokens--;
  buckets.set(key, b);
  return true;
}
