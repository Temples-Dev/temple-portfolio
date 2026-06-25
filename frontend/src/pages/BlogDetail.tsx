import DOMPurify from 'dompurify'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePost } from '@/hooks/useBlog'
import Spinner from '@/components/common/Spinner/Spinner'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading, isError } = usePost(slug ?? '')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={40} className="text-accent" />
      </div>
    )
  }

  if (isError || !post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <main className="min-h-screen bg-bg">
      {/* Cover image */}
      {post.cover_image && (
        <div className="w-full h-64 md:h-96 overflow-hidden bg-surface">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={`max-w-3xl mx-auto px-6 ${post.cover_image ? 'pt-12' : 'pt-32'} pb-24`}>
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors mb-10"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-text-secondary">{formatDate(post.published_at)}</span>
            <span className="text-text-secondary">·</span>
            <span className="text-sm text-text-secondary">{post.read_time_minutes} min read</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-secondary border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-text-primary leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-text-secondary leading-normal mb-10 pb-10 border-b border-border">
            {post.excerpt}
          </p>

          {/* Content — sanitized to prevent XSS */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content ?? '', {
                USE_PROFILES: { html: true },
              }),
            }}
          />
        </motion.article>
      </div>
    </main>
  )
}
