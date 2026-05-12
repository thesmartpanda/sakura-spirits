import type { ReactNode, CSSProperties } from 'react'
import { ToriiAccent } from './ToriiAccent'
import styles from './PageHero.module.css'

interface PageHeroProps {
  kicker: string
  title: ReactNode
  subtitle?: ReactNode
  toriiStyle?: CSSProperties
}

export function PageHero({ kicker, title, subtitle, toriiStyle }: PageHeroProps) {
  return (
    <div className={styles.pageHero}>
      <div className={styles.pageHeroInner}>
        <p className={styles.pageHeroKicker}>{kicker}</p>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <ToriiAccent
        style={
          toriiStyle ?? {
            right: '2%',
            bottom: '-20px',
            width: '220px',
            height: '300px',
          }
        }
      />
    </div>
  )
}
