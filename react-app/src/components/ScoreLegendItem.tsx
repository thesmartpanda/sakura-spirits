import styles from './ScoreBand.module.css'

interface ScoreLegendItemProps {
  color: string
  label: string
}

export function ScoreLegendItem({ color, label }: ScoreLegendItemProps) {
  return (
    <div className={styles.scoreLegendItem}>
      <div className={styles.scoreDot} style={{ background: color }} />
      <span>{label}</span>
    </div>
  )
}
