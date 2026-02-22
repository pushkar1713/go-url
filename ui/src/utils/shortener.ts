/**
 * URL Shortener utility (client-side mock)
 * Generates a deterministic short code from any URL string.
 * In production, replace `shortenUrl` with a real API call.
 */

const BASE_URL = 'https://snip.ly'

/** Simple djb2-style hash returning a positive 32-bit integer */
function hashString(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
  }
  return Math.abs(hash >>> 0)
}

/** Encode a number into a base-62 string */
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function toBase62(num: number): string {
  if (num === 0) return ALPHABET[0]
  let result = ''
  let n = num
  while (n > 0) {
    result = ALPHABET[n % 62] + result
    n = Math.floor(n / 62)
  }
  return result
}

/** Validate that a string is a plausible URL */
export function isValidUrl(raw: string): boolean {
  try {
    const url = new URL(raw)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/** Shorten a URL — returns the short URL or throws on validation failure */
export function shortenUrl(originalUrl: string): string {
  if (!isValidUrl(originalUrl)) {
    throw new Error('Please enter a valid URL starting with http:// or https://')
  }
  const hash = hashString(originalUrl.trim())
  const code = toBase62(hash).slice(0, 7)
  return `${BASE_URL}/${code}`
}
