import styles from './TimelineSection.module.css'

interface TimelineItemProps {
  year: string
  event: string
  desc: string
}

export function TimelineItem({ year, event, desc }: TimelineItemProps) {
  return (
    <div className={styles.timelineItem}>
      <p className={styles.timelineYear}>{year}</p>
      <p className={styles.timelineEvent}>{event}</p>
      <p className={styles.timelineDesc}>{desc}</p>
    </div>
  )
}
