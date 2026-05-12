import clsx from 'clsx'
import type { Review } from '../lib/directus'
import styles from './ReviewsSidebar.module.css'

const DISTILLERIES = ['Yamazaki', 'Hakushu', 'Yoichi', 'Nikka', 'Hibiki']

interface ReviewsSidebarProps {
  reviews: Review[]
  distillery: string
  minScore: number
  onDistilleryChange: (d: string) => void
  onMinScoreChange: (min: number) => void
}

export function ReviewsSidebar({
  reviews,
  distillery,
  minScore,
  onDistilleryChange,
  onMinScoreChange,
}: ReviewsSidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <p className={styles.sidebarTitle}>Distillery</p>
        <ul className={styles.sidebarFilterList}>
          <li
            className={clsx(styles.sidebarFilterItem, { [styles.active]: distillery === '' })}
            onClick={() => onDistilleryChange('')}
          >
            All <span className={styles.sidebarCount}>{reviews.length}</span>
          </li>
          {DISTILLERIES.map((d) => (
            <li
              key={d}
              className={clsx(styles.sidebarFilterItem, { [styles.active]: distillery === d })}
              onClick={() => onDistilleryChange(d)}
            >
              {d}{' '}
              <span className={styles.sidebarCount}>
                {reviews.filter((r) => r.distillery.includes(d)).length}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sidebarSection}>
        <p className={styles.sidebarTitle}>Minimum Score</p>
        <div
          className={clsx(styles.starFilterRow, { [styles.active]: minScore === 0 })}
          onClick={() => onMinScoreChange(0)}
        >
          <span className={styles.sfStars}>★★★★★</span>
          <span
            style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', marginLeft: '4px' }}
          >
            All
          </span>
        </div>
        <div
          className={clsx(styles.starFilterRow, { [styles.active]: minScore === 90 })}
          onClick={() => onMinScoreChange(90)}
        >
          <span className={styles.sfStars} style={{ color: 'var(--amber)' }}>
            ★★★★★
          </span>
          <span
            style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', marginLeft: '4px' }}
          >
            90+
          </span>
        </div>
        <div
          className={clsx(styles.starFilterRow, { [styles.active]: minScore === 85 })}
          onClick={() => onMinScoreChange(85)}
        >
          <span className={styles.sfStars} style={{ color: 'var(--amber)' }}>
            ★★★★
          </span>
          <span className={styles.sfStars}>★</span>
          <span
            style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', marginLeft: '4px' }}
          >
            85+
          </span>
        </div>
      </div>
    </aside>
  )
}
