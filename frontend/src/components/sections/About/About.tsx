import { motion } from 'framer-motion'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'
import templePhoto from '@/assets/temple.jpeg'

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: 'Software Engineering & Systems',
    description: 'Production architecture, low-level work in Zig, and systems that behave at scale.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'AI & Data Science',
    description: 'Applying machine learning and data science to real engineering problems.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Cybersecurity',
    description: 'Security-conscious design and understanding how systems break before they do.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Full-stack Django and React, from the API down to the interface.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 bg-surface">
              <img
                src={templePhoto}
                alt="Temple — designer and developer"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
            {/* Accent blob */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-accent/10 -z-10" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <SectionLabel>About Me</SectionLabel>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl text-text-primary">
              Software engineer with a bit of a{' '}
              <span className="text-accent">systems obsession.</span>
            </h2>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              I'm Temple, a software engineer based in Ghana. Most of what I
              build is full-stack web work: Django APIs, React frontends, things
              that run in production. But I keep getting pulled toward the layer
              underneath: the protocols, the binary formats, the parts most
              frameworks quietly handle for you.
            </p>
            <p className="mt-3 text-base text-text-secondary leading-relaxed">
              Zit is the clearest example of that. It's a Git implementation I'm
              building in Zig, from the object store up. I started it to
              understand how Git actually works at the storage level. Still in
              progress, but that's sort of the point.
            </p>
            <p className="mt-3 text-base text-text-secondary leading-relaxed">
              I'm preparing for the MSc in Intelligent Computing Systems at
              Ashesi University. The program runs across three tracks: software
              engineering and systems, AI and data science, and cybersecurity.
              My focus is the SE and Systems track, but the three are designed
              to connect. Learning towards all of it every day.
            </p>

            {/* Feature pills */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{feature.title}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
