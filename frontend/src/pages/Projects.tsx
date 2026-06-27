import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '@/components/common/SEO/SEO'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'
import Badge from '@/components/common/Badge/Badge'
import Spinner from '@/components/common/Spinner/Spinner'
import { useAllProjects } from '@/hooks/useProjects'
import type { Project } from '@/types'

const CATEGORIES = [
  { label: 'All',             value: undefined    },
  { label: 'UI/UX Design',    value: 'ui_ux'      },
  { label: 'Web Development', value: 'web_dev'    },
  { label: 'Branding',        value: 'branding'   },
  { label: 'CMS & SEO',       value: 'cms_seo'    },
]

const GRADIENTS = [
  'linear-gradient(135deg, #1F6B61 0%, #0D2B36 100%)',
  'linear-gradient(135deg, #C97C3D 0%, #0D2B36 100%)',
  'linear-gradient(135deg, #0D2B36 0%, #4A6570 100%)',
]

export default function Projects() {
  const [category, setCategory] = useState<string | undefined>(undefined)
  const { data, isLoading, isError } = useAllProjects(category)
  const projects = data?.results ?? []
  const featured = projects.filter((p) => p.is_featured)
  const rest = projects.filter((p) => !p.is_featured)

  return (
    <>
      <SEO
        title="Projects"
        description="A collection of web development, UI/UX design, branding, and CMS projects by Temple Shelemiah Lomotey."
        path="/projects"
      />

      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12">
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="mt-3 font-display text-4xl lg:text-5xl text-text-primary">
              All Projects
            </h1>
            <p className="mt-3 text-text-secondary max-w-xl">
              A running archive of work — web apps, designs, and digital products built for real clients.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors cursor-pointer ${
                  category === cat.value
                    ? 'bg-accent text-white border-accent'
                    : 'border-border text-text-secondary hover:text-text-primary hover:border-text-secondary'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* States */}
          {isLoading ? (
            <div className="flex justify-center py-24">
              <Spinner size={40} className="text-accent" />
            </div>
          ) : isError ? (
            <EmptyState message="Couldn't load projects right now. Try again later." />
          ) : projects.length === 0 ? (
            <EmptyState message="More case studies coming soon — check the featured work on the home page for now." />
          ) : (
            <>
              {/* Featured row */}
              {featured.length > 0 && (
                <div className="mb-12">
                  <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-5">
                    Featured
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featured.map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} large />
                    ))}
                  </div>
                </div>
              )}

              {/* Rest */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  )
}

function ProjectCard({
  project,
  index,
  large = false,
}: {
  project: Project
  index: number
  large?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block group rounded-xl overflow-hidden border border-border bg-card shadow-card hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
      >
        <div className={`overflow-hidden bg-surface ${large ? 'aspect-video' : 'aspect-[4/3]'}`}>
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-end p-4"
              style={{ background: GRADIENTS[index % GRADIENTS.length] }}
            >
              <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
                Case Study
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <Badge>{project.category_display}</Badge>
          <h3
            className={`mt-2 font-display text-text-primary group-hover:text-accent transition-colors ${
              large ? 'text-2xl' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary line-clamp-2">
            {project.short_description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-24 text-center">
      <p className="text-text-secondary max-w-sm mx-auto">{message}</p>
      <Link
        to="/#work"
        className="mt-5 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
      >
        ← View featured work
      </Link>
    </div>
  )
}
