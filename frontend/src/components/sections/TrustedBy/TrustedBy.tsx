import SectionLabel from '@/components/common/SectionLabel/SectionLabel'

const orgs = [
  'SHELLLABSHQ',
  'LIFE-MAC AFRICA',
  'GATHEREASE',
  'TBSS',
  'BALLOTBASE',
  'COREPEAK',
  'TECHLOFT',
]

function OrgName({ name }: { name: string }) {
  return (
    <span className="text-sm font-bold tracking-widest text-text-secondary opacity-60 hover:opacity-100 transition-opacity cursor-default whitespace-nowrap">
      {name}
    </span>
  )
}

export default function TrustedBy() {
  return (
    <section className="py-12 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-12">
          <SectionLabel className="shrink-0">Trusted by</SectionLabel>

          {/* Desktop: static row */}
          <div className="hidden md:flex items-center gap-10 flex-wrap">
            {orgs.map((name) => (
              <OrgName key={name} name={name} />
            ))}
          </div>

          {/* Mobile: marquee */}
          <div className="md:hidden w-full overflow-hidden">
            <div className="flex gap-10 w-max" style={{ animation: 'marquee 20s linear infinite' }}>
              {[...orgs, ...orgs].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-sm font-bold tracking-widest text-text-secondary opacity-60 whitespace-nowrap"
                  aria-hidden={i >= orgs.length}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
