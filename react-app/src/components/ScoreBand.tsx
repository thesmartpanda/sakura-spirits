import { ScoreLegendItem } from './ScoreLegendItem'
import styles from './ScoreBand.module.css'

const LEGEND = [
  { color: '#c8922a', label: '95–100 Legendary' },
  { color: '#e0b86a', label: '90–94 Outstanding' },
  { color: '#6b8cba', label: '85–89 Highly Recommended' },
  { color: '#8aaa78', label: '80–84 Recommended' },
]

export function ScoreBand() {
  return (
    <div className={styles.scoreBand}>
      <div className={styles.scoreBandInner}>
        <span className={styles.scoreLegendLabel}>Our Scale:</span>
        {LEGEND.map((l) => (
          <ScoreLegendItem key={l.color} color={l.color} label={l.label} />
        ))}
      </div>
    </div>
  )
}
