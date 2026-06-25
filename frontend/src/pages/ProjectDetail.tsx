import { useParams, Link } from 'react-router-dom'
import SEO from '@/components/common/SEO/SEO'
import { useProject } from '@/hooks/useProjects'
import Spinner from '@/components/common/Spinner/Spinner'
import Badge from '@/components/common/Badge/Badge'
import Button from '@/components/common/Button/Button'
import { useUIStore } from '@/store/uiStore'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project, isLoading, isError } = useProject(slug ?? '')
  const openContactModal = useUIStore((s) => s.openContactModal)

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Spinner size={40} className="text-accent" />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-3xl text-text-primary">Project not found</h1>
        <p className="text-text-secondary">This project may have moved or doesn't exist.</p>
        <Link to="/" className="text-accent hover:text-accent-hover transition-colors text-sm">
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.short_description}
        path={`/projects/${project.slug}`}
        image={project.thumbnail}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.short_description,
          url: `https://templelomotey.work/projects/${project.slug}`,
          image: project.thumbnail,
          author: { '@type': 'Person', name: 'Temple Lomotey', url: 'https://templelomotey.work' },
        }}
      />

      <main className="min-h-screen pt-16">
        {/* Hero */}
        <div className="bg-surface py-20 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-6"
            >
              ← All projects
            </Link>
            <Badge>{project.category_display}</Badge>
            <h1 className="mt-3 font-display text-4xl lg:text-5xl text-text-primary">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl">
              {project.short_description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.tags?.map((tag) => (
                <span key={tag} className="text-xs text-text-secondary bg-card px-3 py-1 rounded-full border border-border">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button size="md">View Live Site ↗</Button>
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="md">View Code ↗</Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        {project.thumbnail && (
          <div className="max-w-4xl mx-auto px-6 -mt-6">
            <img
              src={project.thumbnail}
              alt={project.title}
              width={900}
              height={500}
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          {project.full_description && (
            <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed">
              {project.full_description.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          )}

          {/* Image gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mt-12 space-y-6">
              {project.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={img.alt_text || project.title}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-dark-bg py-16 px-6 text-center">
          <h2 className="font-display text-2xl text-white">Like what you see?</h2>
          <p className="mt-2 text-text-secondary">Let's build something great together.</p>
          <Button size="lg" className="mt-6" onClick={openContactModal}>
            START A PROJECT →
          </Button>
        </div>
      </main>
    </>
  )
}
