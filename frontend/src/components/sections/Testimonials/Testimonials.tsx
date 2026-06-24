import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchTestimonials } from '@/api/testimonials'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'
import type { Testimonial } from '@/types'

const placeholderTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Sarah Chen',
    client_role: 'Founder',
    client_company: 'MindSpace',
    content:
      "Temple delivered a product that exceeded every brief. The attention to detail and speed of execution was unlike anything I've seen from a solo freelancer.",
    rating: 5,
    is_featured: true,
    order: 1,
  },
  {
    id: '2',
    client_name: 'James Okafor',
    client_role: 'Marketing Director',
    client_company: 'Meridian Studio',
    content:
      'Our bounce rate dropped 40% after the redesign. Temple understands both design and conversion — rare combination.',
    rating: 5,
    is_featured: true,
    order: 2,
  },
  {
    id: '3',
    client_name: 'Priya Nair',
    client_role: 'CEO',
    client_company: 'Leafwell',
    content:
      'Working with Temple felt like having a full agency — strategy, design, and development in one person. Highly recommend.',
    rating: 5,
    is_featured: true,
    order: 3,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" fill="currentColor" className="text-accent" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
      className="p-6 rounded-xl bg-bg border border-border shadow-card"
    >
      <Stars count={testimonial.rating} />
      <blockquote className="mt-4 text-sm text-text-secondary leading-relaxed">
        "{testimonial.content}"
      </blockquote>
      <div className="mt-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-display font-bold text-sm">
          {testimonial.client_name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">{testimonial.client_name}</p>
          <p className="text-xs text-text-secondary">
            {testimonial.client_role}, {testimonial.client_company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const { data } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
    staleTime: 5 * 60 * 1000,
  })
  const testimonials = data?.results?.length ? data.results : placeholderTestimonials

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="mt-3 font-display text-3xl text-text-primary">
            What clients say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
