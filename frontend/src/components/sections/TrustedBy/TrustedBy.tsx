import SectionLabel from '@/components/common/SectionLabel/SectionLabel'

const logos = [
  {
    name: 'Loom',
    svg: (
      <svg viewBox="0 0 80 24" fill="currentColor" height="20">
        <text x="0" y="18" fontFamily="system-ui" fontWeight="700" fontSize="18">Loom</text>
      </svg>
    ),
  },
  {
    name: 'Trello',
    svg: (
      <svg viewBox="0 0 80 24" fill="currentColor" height="20">
        <text x="0" y="18" fontFamily="system-ui" fontWeight="700" fontSize="18">Trello</text>
      </svg>
    ),
  },
  {
    name: 'Notion',
    svg: (
      <svg viewBox="0 0 80 24" fill="currentColor" height="20">
        <text x="0" y="18" fontFamily="system-ui" fontWeight="700" fontSize="18">Notion</text>
      </svg>
    ),
  },
  {
    name: 'Slack',
    svg: (
      <svg viewBox="0 0 80 24" fill="currentColor" height="20">
        <text x="0" y="18" fontFamily="system-ui" fontWeight="700" fontSize="18">Slack</text>
      </svg>
    ),
  },
  {
    name: 'Webflow',
    svg: (
      <svg viewBox="0 0 90 24" fill="currentColor" height="20">
        <text x="0" y="18" fontFamily="system-ui" fontWeight="700" fontSize="18">Webflow</text>
      </svg>
    ),
  },
  {
    name: 'Figma',
    svg: (
      <svg viewBox="0 0 80 24" fill="currentColor" height="20">
        <text x="0" y="18" fontFamily="system-ui" fontWeight="700" fontSize="18">Figma</text>
      </svg>
    ),
  },
]

export default function TrustedBy() {
  return (
    <section className="py-12 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-12">
          <SectionLabel className="shrink-0">Trusted by</SectionLabel>

          {/* Desktop: static row */}
          <div className="hidden md:flex items-center gap-10 flex-wrap">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="text-text-secondary opacity-60 hover:opacity-100 transition-opacity cursor-default"
                aria-label={logo.name}
              >
                {logo.svg}
              </div>
            ))}
          </div>

          {/* Mobile: marquee */}
          <div className="md:hidden w-full overflow-hidden">
            <div className="flex gap-10 w-max" style={{ animation: 'marquee 20s linear infinite' }}>
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={`${logo.name}-${i}`}
                  className="text-text-secondary opacity-60"
                  aria-hidden={i >= logos.length}
                >
                  {logo.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
