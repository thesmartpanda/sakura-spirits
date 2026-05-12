import { useState } from 'react'
import clsx from 'clsx'
import type { Review } from '../lib/directus'
import styles from './ReviewCard.module.css'

interface ReviewCardProps {
  review: Review
  index: number
}

export function ReviewCard({ review: r, index }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false)
  const full = Math.round(r.stars)

  return (
    <article
      className={styles.reviewCard}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className={styles.reviewCardHeader}>
        <div className={styles.reviewScore} style={{ background: r.scoreColor }}>
          <span className={styles.reviewScoreNum}>{r.score}</span>
          <span className={styles.reviewScoreLabel}>/100</span>
        </div>
        <div>
          <p className={styles.reviewCardDistillery}>{r.distillery} Distillery</p>
          <h2 className={styles.reviewCardName}>{r.name}</h2>
          <div className={styles.reviewCardMeta}>
            <span className={styles.metaTag}>{r.age}</span>
            <span className={styles.metaTag}>{r.abv} ABV</span>
            {r.badge && <span className={styles.metaTag}>{r.badge}</span>}
          </div>
        </div>
        <div className={styles.reviewCardStars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`star${i > full ? ' empty' : ''}`}>
              ★
            </span>
          ))}
        </div>
      </div>

      <blockquote className={styles.reviewVerdict}>"{r.verdict}"</blockquote>

      <button
        type="button"
        className={clsx(styles.reviewExpandBtn, { [styles.open]: expanded })}
        onClick={() => setExpanded((e) => !e)}
      >
        <span className={styles.expandIcon}>▾</span> Full Tasting Notes
      </button>

      <div className={clsx(styles.reviewDetail, { [styles.open]: expanded })}>
        <div className={styles.reviewTastingGrid}>
          <div>
            <p className={styles.tastingColHead}>Nose</p>
            <p className={styles.tastingColText}>{r.nose}</p>
          </div>
          <div>
            <p className={styles.tastingColHead}>Palate</p>
            <p className={styles.tastingColText}>{r.palate}</p>
          </div>
          <div>
            <p className={styles.tastingColHead}>Finish</p>
            <p className={styles.tastingColText}>{r.finish}</p>
          </div>
        </div>
      </div>

      <div className={styles.reviewFooter}>
        <div className={styles.reviewAuthor}>
          <div className={styles.reviewAvatar}>{r.initials}</div>
          <div>
            <div className={styles.reviewAuthorName}>{r.author}</div>
            <div className={styles.reviewAuthorDate}>{r.date}</div>
          </div>
        </div>
      </div>
    </article>
  )
}
