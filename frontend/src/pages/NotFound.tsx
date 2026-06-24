import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Button from '@/components/common/Button/Button'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Temple</title>
      </Helmet>
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
