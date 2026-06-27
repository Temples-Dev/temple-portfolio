import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'
import Badge from '@/components/common/Badge/Badge'
import tbssImg from '@/assets/tbss_so.png'
import gatherEaseImg from '@/assets/gatherease_so.png'
import lifemacImg from '@/assets/lifemac_so.png'

const staticProjects = [
  {
    id: '1',
    title: 'TBSS Ghana',
    role: 'Backend Development',
    category: 'Web Application',
    description:
      'Built the backend infrastructure for Ghana\'s school bus tracking and student safety platform — APIs, data models, and service integrations.',
    href: 'https://www.tbssgh.com/',
    image: tbssImg,
  },
  {
    id: '2',
    title: 'GatherEase',
    role: 'Full-Stack Development',
    category: 'Web Application',
    description:
      'Designed and built GatherEase end-to-end — an event management and ticketing platform for organisers and attendees.',
    href: 'https://gatherease.cloud/',
    image: gatherEaseImg,
  },
  {
    id: '3',
    title: 'LIFE-MAC Africa',
    role: 'Frontend Development',
    category: 'Web Development',
    description:
      'Contributed frontend development as part of the team building LIFE-MAC Africa\'s digital presence and platform.',
    href: 'https://lifemac.org/',
    image: lifemacImg,
  },
]

export default function FeaturedWork() {
  return (
    <section id="work" className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left label column */}
          <div className="lg:w-[280px] shrink-0">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="mt-3 font-display text-3xl text-text-primary">
              Selected projects that drive results
            </h2>
            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>

          {/* Right project grid — always static */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticProjects.map((project, i) => (
                <StaticProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StaticProjectCard(
  { project, index }: { project: typeof staticProjects[number]; index: number },
) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block group rounded-xl overflow-hidden border border-border bg-card shadow-card hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
      >
        <div className="aspect-[4/3] overflow-hidden bg-surface">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge>{project.category}</Badge>
            <span className="text-xs font-medium text-accent">{project.role}</span>
          </div>
          <h3 className="mt-2 font-display text-xl text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary line-clamp-2">{project.description}</p>
        </div>
      </a>
    </motion.div>
  )
}

