import { useState, useRef, useCallback } from 'react'
import { shortenUrl, isValidUrl } from '../utils/shortener'

interface ShortenResult {
  original: string
  short: string
}

const UrlShortenerBox = () => {
  const [inputUrl, setInputUrl] = useState('')
  const [result, setResult] = useState<ShortenResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleShorten = useCallback(() => {
    const trimmed = inputUrl.trim()
    if (!trimmed) {
      setError('Drop a URL here first.')
      triggerShake()
      return
    }
    try {
      const short = shortenUrl(trimmed)
      setResult({ original: trimmed, short })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setResult(null)
      triggerShake()
    }
  }, [inputUrl])

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 400)
  }

  const handleCopy = useCallback(async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.short)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = result.short
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [result])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleShorten()
  }

  const handleReset = () => {
    setInputUrl('')
    setResult(null)
    setError(null)
    setCopied(false)
    inputRef.current?.focus()
  }

  const urlIsValid = inputUrl.trim() !== '' && isValidUrl(inputUrl.trim())

  return (
    /* Constrain the card width and keep it floating with clear side space */
    <div className="fade-in w-full" style={{ maxWidth: '680px' }}>

      {/* Main card */}
      <div className="neo-card" style={{ padding: '28px 32px' }}>

        {/* BETA / FREE tag row */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="neo-tag"
            style={{ backgroundColor: 'var(--clay)', color: 'var(--charcoal)', padding: '4px 12px' }}
          >
            BETA
          </span>
          <div className="flex-1 h-[2px]" style={{ backgroundColor: 'var(--charcoal)' }} />
          <span
            className="neo-tag"
            style={{ backgroundColor: 'var(--sand)', border: '2px solid var(--charcoal)', padding: '4px 12px' }}
          >
            FREE
          </span>
        </div>

        {/* Label */}
        <label
          htmlFor="url-input"
          className="block text-xs font-bold tracking-widest uppercase mb-3"
          style={{ fontFamily: "'Syne', sans-serif", color: 'var(--olive)' }}
        >
          Long URL
        </label>

        {/* Input + Button row — always horizontal */}
        <div
          className={`flex items-stretch gap-4 ${isShaking ? 'error-shake' : ''}`}
        >
          <input
            id="url-input"
            ref={inputRef}
            type="url"
            placeholder="https://yourverylong.link/with/a/path?that=never&ends=true"
            value={inputUrl}
            onChange={e => {
              setInputUrl(e.target.value)
              if (error) setError(null)
            }}
            onKeyDown={handleKeyDown}
            className="neo-input flex-1 min-w-0"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.85rem',
              padding: '14px 18px',
            }}
            autoComplete="off"
            spellCheck={false}
            aria-describedby="url-error"
            aria-invalid={!!error}
          />
          <button
            onClick={handleShorten}
            className="neo-btn flex-shrink-0"
            style={{
              backgroundColor: urlIsValid ? 'var(--charcoal)' : 'var(--clay)',
              color: 'var(--cream)',
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.8rem',
              padding: '14px 28px',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
            aria-label="Shorten URL"
          >
            {/* Scissors icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="6" cy="6" r="3"/>
              <circle cx="6" cy="18" r="3"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12"/>
            </svg>
            SNIP IT
          </button>
        </div>

        {/* Error */}
        {error && (
          <p
            id="url-error"
            role="alert"
            className="mt-4 text-xs font-bold tracking-wide"
            style={{ fontFamily: "'DM Mono', monospace", color: 'var(--rust)' }}
          >
            ✗ {error}
          </p>
        )}

        {/* Result */}
        {result && (
          <div
            className="result-enter neo-border"
            style={{ backgroundColor: 'var(--sand)', marginTop: '32px', padding: '28px 32px' }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Syne', sans-serif", color: 'var(--olive)' }}
            >
              Your Short Link
            </p>

            <div className="flex items-center gap-4">
              <span
                className="flex-1 font-medium truncate"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '1rem',
                  color: 'var(--charcoal)',
                }}
              >
                {result.short}
              </span>

              <button
                onClick={handleCopy}
                className="neo-btn flex-shrink-0"
                style={{
                  backgroundColor: copied ? 'var(--olive)' : 'var(--white)',
                  color: copied ? 'var(--cream)' : 'var(--charcoal)',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.72rem',
                  padding: '9px 18px',
                  letterSpacing: '0.08em',
                  transition: 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.1s ease, transform 0.1s ease',
                }}
                aria-label={copied ? 'Copied!' : 'Copy short URL'}
              >
                {copied ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    COPIED
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    COPY
                  </>
                )}
              </button>
            </div>

            <p
              className="mt-3 text-xs truncate"
              style={{ fontFamily: "'DM Mono', monospace", opacity: 0.5 }}
              title={result.original}
            >
              from: {result.original}
            </p>

            <button
              onClick={handleReset}
              className="mt-5 text-xs underline underline-offset-4 cursor-pointer"
              style={{
                fontFamily: "'DM Mono', monospace",
                background: 'none',
                border: 'none',
                opacity: 0.55,
              }}
            >
              ↩ shorten another
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default UrlShortenerBox
