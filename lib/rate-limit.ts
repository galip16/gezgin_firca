const ipRequests = new Map<string, { count: number; time: number }>()

export function rateLimit(ip: string, limit = 10, windowMs = 60000) {

  const now = Date.now()
  const entry = ipRequests.get(ip)

  if (!entry) {
    ipRequests.set(ip, { count: 1, time: now })
    return true
  }

  if (now - entry.time > windowMs) {
    ipRequests.set(ip, { count: 1, time: now })
    return true
  }

  if (entry.count >= limit) {
    return false
  }

  entry.count++
  return true
}