import type { ShortenRequest, ShortenResponse } from '../types/api'

/**
 * Base URL of the Go backend, injected at build time via Vite's env system.
 * Set VITE_API_BASE_URL in your .env file.
 * Falls back to localhost:8080 for local development.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

/**
 * POST /shorten
 * Sends a long URL to the Go backend and returns the shortened result.
 *
 * @throws Error with a human-readable message on failure
 */
export async function shortenUrl(request: ShortenRequest): Promise<ShortenResponse> {
  const response = await fetch(`${API_BASE_URL}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    let message = `Server error: ${response.status} ${response.statusText}`
    try {
      const errorBody = await response.text()
      if (errorBody) message = errorBody
    } catch {
      // ignore parse errors — use the default message
    }
    throw new Error(message)
  }

  const data: ShortenResponse = await response.json()
  return data
}

/**
 * Validate that a string is a plausible URL before sending to the backend.
 * Quick client-side guard — the backend is the source of truth.
 */
export function isValidUrl(raw: string): boolean {
  try {
    const url = new URL(raw)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
