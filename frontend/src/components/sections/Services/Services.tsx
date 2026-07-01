import { motion } from 'framer-motion'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'

const services = [
  {
    title: 'UI/UX Design',
    description:
      'User-centred interfaces that balance aesthetics with usability — from wireframes to polished Figma handoffs.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    description:
      'Fast, accessible, production-ready React and Django applications built to scale with your business.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Branding',
    description:
      'Visual identity systems — logo, colour, typography, and guidelines — that make your brand unforgettable.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
      </svg>
    ),
  },
  {
    title: 'CMS & SEO',
    description:
      'Content-managed websites optimised for search — so you own your traffic and can update without a developer.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left heading */}
          <div className="lg:w-[280px] shrink-0">
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="mt-3 font-display text-3xl text-text-primary">
              What I work on
            </h2>
          </div>

          {/* Right 2x2 grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.45, ease: 'easeOut' }}
                className="group p-6 rounded-xl bg-card border border-border hover:bg-bg hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {service.icon}
                </div>
                <h3 className="font-display text-xl text-text-primary">{service.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {service.description}
                </p>
                <button className="mt-4 text-xs text-accent hover:text-accent-hover font-medium transition-colors">
                  LEARN MORE →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
