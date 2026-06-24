interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`text-xs font-medium tracking-[0.12em] uppercase text-text-secondary ${className}`}
    >
      {children}
    </span>
  )
}
