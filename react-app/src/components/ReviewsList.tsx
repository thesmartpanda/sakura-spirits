import type { Review } from '../lib/directus'
import { ReviewCard } from './ReviewCard'
import styles from './ReviewsList.module.css'

interface ReviewsListProps {
  reviews: Review[]
  distillery: string
  minScore: number
}

export function ReviewsList({ reviews, distillery, minScore }: ReviewsListProps) {
  const filtered = reviews
    .filter((r) => distillery === '' || r.distillery.includes(distillery))
    .filter((r) => r.score >= minScore)

  if (!filtered.length) {
    return (
      <div className={styles.reviewsList}>
        <p
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-display)',
            padding: '2rem 0',
          }}
        >
          No reviews match this filter.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.reviewsList}>
      {filtered.map((r, i) => (
        <ReviewCard key={r.id} review={r} index={i} />
      ))}
    </div>
  )
}
