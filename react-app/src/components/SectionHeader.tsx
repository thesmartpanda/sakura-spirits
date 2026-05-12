import type { ReactNode } from 'react'

interface SectionHeaderProps {
  label: string
  title: ReactNode
  action?: ReactNode
}

export function SectionHeader({ label, title, action }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        <p className="section-label">{label}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {action}
    </div>
  )
}
