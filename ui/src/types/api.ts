/**
 * API types mirroring the Go backend structs exactly.
 *
 * Go request: reqBody  { url string }
 * Go response: resBody { LongUrl, ShortUrl, Key }
 */

/** Request body sent to POST /shorten */
export interface ShortenRequest {
  url: string
}

/** Response body from POST /shorten */
export interface ShortenResponse {
  LongUrl: string
  ShortUrl: string
  Key: string
}

/** Generic API error shape used by the service layer */
export interface ApiError {
  message: string
  status?: number
}
