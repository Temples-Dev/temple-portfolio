import { Link } from 'react-router-dom'
import SEO from '@/components/common/SEO/SEO'
import Button from '@/components/common/Button/Button'

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" noIndex />
      <main className="min-h-screen pt-16 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-8xl text-accent font-bold">404</p>
        <h1 className="mt-4 font-display text-3xl text-text-primary">Page not found</h1>
        <p className="mt-3 text-text-secondary max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-8">
          <Button size="lg">← Back to Home</Button>
        </Link>
      </main>
    </>
  )
}
