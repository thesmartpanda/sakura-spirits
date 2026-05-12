import styles from './ValuesSection.module.css'

interface ValueItemProps {
  num: string
  name: string
  jp: string
  desc: string
}

export function ValueItem({ num, name, jp, desc }: ValueItemProps) {
  return (
    <div className={styles.valueItem}>
      <div className={styles.valueNum}>{num}</div>
      <div className={styles.valueName}>{name}</div>
      <div className={styles.valueJp}>{jp}</div>
      <p className={styles.valueDesc}>{desc}</p>
    </div>
  )
}
