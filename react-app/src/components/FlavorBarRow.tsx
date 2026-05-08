import { useEffect, useState } from 'react'
import styles from './TastingDrawer.module.css'

interface FlavorBarRowProps {
  name: string
  val: number
}

/**
 * The 80 ms timeout before setting `width` is intentional: the component first
 * renders with `width = 0`, then the timeout fires after the browser has painted
 * that frame, triggering the CSS `transition` from 0 → val. Without the delay
 * React would batch both state changes and the bar would appear at full width
 * with no animation.
 */
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
