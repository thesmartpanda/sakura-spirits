import { Link } from 'react-router-dom'
import type { RegionApiItem } from '../lib/directus'
import styles from './RegionsSection.module.css'

interface RegionCardProps {
  region: RegionApiItem
}

export function RegionCard({ region: r }: RegionCardProps) {
  return (
    <Link to={`/shop?filter=${r.filter_key}`} className={styles.regionCard}>
      <div className={styles.regionKanji}>{r.kanji}</div>
      <div className={styles.regionName}>{r.name}</div>
      <p className={styles.regionDesc}>{r.description}</p>
    </Link>
  )
}
