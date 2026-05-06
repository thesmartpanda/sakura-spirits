import { useEffect, useState } from 'react'
import styles from './TastingDrawer.module.css'

interface FlavorBarRowProps {
  name: string
  val: number
}

export function FlavorBarRow({ name, val }: FlavorBarRowProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(val), 80)
    return () => clearTimeout(t)
  }, [val])

  return (
    <div className={styles.flavorBarRow}>
      <span className={styles.flavorBarLabel}>{name}</span>
      <div className={styles.flavorBarTrack}>
        <div className={styles.flavorBarFill} style={{ width: `${width}%` }} />
      </div>
      <span className={styles.flavorBarVal}>{val}</span>
    </div>
  )
}
