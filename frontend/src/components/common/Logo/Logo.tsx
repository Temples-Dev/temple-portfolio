import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      className={`font-display text-2xl font-bold text-accent tracking-tight ${className}`}
      aria-label="Temple — Home"
    >
      T.
    </Link>
  )
}
