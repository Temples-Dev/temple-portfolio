import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePosts } from '@/hooks/useBlog'
import type { BlogPost } from '@/types'
import SectionLabel from '@/components/common/SectionLabel/SectionLabel'

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-bg rounded-xl overflow-hidden border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-video bg-surface overflow-hidden">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-20">✍</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-text-secondary">{formatDate(post.published_at)}</span>
            <span className="text-xs text-text-secondary">·</span>
            <span className="text-xs text-text-secondary">{post.read_time_minutes} min read</span>
          </div>

          <h2 className="font-display text-xl text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors">
            {post.title}
          </h2>

          <p className="text-sm text-text-secondary leading-normal line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-secondary border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

function BlogSkeleton() {
  return (
    <div className="bg-bg rounded-xl overflow-hidden border border-border animate-pulse">
      <div className="aspect-video bg-surface" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-surface rounded w-1/3" />
        <div className="h-5 bg-surface rounded w-3/4" />
        <div className="h-3 bg-surface rounded w-full" />
        <div className="h-3 bg-surface rounded w-2/3" />
      </div>
    </div>
  )
}

export default function Blog() {
  const { data, isLoading, isError } = usePosts()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-dark-bg pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionLabel className="text-white/60 mb-4">MY THOUGHTS</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl text-white leading-tight max-w-2xl"
          >
            Insights on design,{' '}
            <span className="text-accent">development</span> & craft
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-text-secondary text-lg max-w-xl"
          >
            Thoughts on building products, design systems, and everything in between.
          </motion.p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-surface py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <BlogSkeleton key={i} />)}
            </div>
          )}

          {isError && (
            <div className="text-center py-16">
              <p className="text-text-secondary">Failed to load posts. Try refreshing.</p>
            </div>
          )}

          {!isLoading && !isError && data?.results.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-text-primary mb-3">Coming soon</p>
              <p className="text-text-secondary">
                The first post is on its way. Check back shortly.
              </p>
            </div>
          )}

          {!isLoading && !isError && data && data.results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.results.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
