import { motion } from 'framer-motion'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'
import templePhoto from '@/assets/temple.jpeg'

const features = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: 'Design',
    description: 'UI/UX that converts visitors into customers.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: 'Development',
    description: 'Fast, accessible, production-ready code.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
      </svg>
    ),
    title: 'Strategy',
    description: 'SEO and CMS to grow organic reach.',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
      </svg>
    ),
    title: 'Results',
    description: 'Measurable impact on your brand and business.',
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
              Designing digital experiences that create{' '}
              <span className="text-accent">real impact.</span>
            </h2>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              I'm Temple — a full-stack designer and developer who bridges the gap
              between beautiful interfaces and solid engineering. With a focus on
              clarity, performance, and business outcomes, I build products that
              look great and actually work.
            </p>
            <p className="mt-3 text-base text-text-secondary leading-relaxed">
              Whether you need a landing page, a complex web application, or a
              complete brand identity, I bring the same care and craft to every
              project.
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
