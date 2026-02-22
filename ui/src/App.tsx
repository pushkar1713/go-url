import UrlShortenerBox from './components/UrlShortenerBox'

function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--cream)' }}>

      {/* ── Top accent stripe ── */}
      <div className="h-2.5 w-full stripe-accent" aria-hidden="true" />

      {/* ── Header ── */}
      <header className="neo-border border-l-0 border-r-0 border-t-0" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="w-full px-8 md:px-16 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 flex items-center justify-center neo-border text-lg font-black"
              style={{ backgroundColor: 'var(--charcoal)', color: 'var(--cream)', fontFamily: "'Syne', sans-serif" }}
              aria-hidden="true"
            >
              ✂
            </div>
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", color: 'var(--charcoal)' }}
            >
              SNIP
            </h1>
          </div>
          <nav aria-label="Site navigation">
            <a
              href="#"
              className="neo-btn text-xs"
              style={{ backgroundColor: 'var(--sand)', color: 'var(--charcoal)', textDecoration: 'none', padding: '6px 14px' }}
              aria-label="View GitHub repository"
            >
              GitHub ↗
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center justify-center" id="main-content">

        <div className="w-full max-w-2xl mx-auto px-8 py-12 flex flex-col items-center">

          {/* Headline */}
          <div className="text-center mb-10 fade-in w-full">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-16" style={{ backgroundColor: 'var(--clay)' }} />
              <span className="neo-tag" style={{ backgroundColor: 'var(--clay)', color: 'var(--charcoal)' }}>
                URL Shortener
              </span>
              <div className="h-[2px] w-16" style={{ backgroundColor: 'var(--clay)' }} />
            </div>

            <h2
              className="font-black leading-[0.95] mb-6 text-center w-full"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: 'var(--charcoal)',
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                letterSpacing: '-0.025em',
              }}
            >
              Less Link.{' '}
              <span style={{ color: 'var(--rust)' }}>More Power.</span>
            </h2>

            <p
              className="text-center text-sm leading-relaxed opacity-60"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Paste your endless URL below and get a clean, short link in one click. No sign-up. No nonsense.
            </p>
          </div>

          {/* Shortener widget */}
          <UrlShortenerBox />

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-14 fade-in">
            {['⚡ Instant', '🔒 No tracking', '∞ Unlimited', '📋 One-click copy'].map(feat => (
              <span
                key={feat}
                className="neo-tag"
                style={{ backgroundColor: 'var(--sand)', color: 'var(--charcoal)', padding: '5px 14px' }}
              >
                {feat}
              </span>
            ))}
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="neo-border border-l-0 border-r-0 border-b-0" style={{ backgroundColor: 'var(--sand)' }}>
        <div className="w-full px-8 md:px-16 py-5 flex items-center justify-between">
          <p className="text-xs opacity-60" style={{ fontFamily: "'DM Mono', monospace" }}>
            © 2026 SNIP — made with ✂ &amp; ☕
          </p>
          <p className="text-xs opacity-60" style={{ fontFamily: "'DM Mono', monospace" }}>
            no data stored · open source
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App
