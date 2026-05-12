import type { ReactNode } from 'react'
import styles from './ContactInfo.module.css'

interface InfoBlockProps {
  label: string
  children: ReactNode
}

export function InfoBlock({ label, children }: InfoBlockProps) {
  return (
    <div className={styles.infoBlock}>
      <p className={styles.infoLabel}>{label}</p>
      {children}
    </div>
  )
}
