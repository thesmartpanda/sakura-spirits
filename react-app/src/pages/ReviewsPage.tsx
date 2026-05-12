import { useState } from 'react'
import { useReviews } from '../hooks'
import { PageHero } from '../components/PageHero'
import { ScoreBand } from '../components/ScoreBand'
import { ReviewsSidebar } from '../components/ReviewsSidebar'
import { ReviewsList } from '../components/ReviewsList'
import { WriteReviewForm } from '../components/WriteReviewForm'
import styles from './ReviewsPage.module.css'

export function ReviewsPage() {
  const { reviews } = useReviews()
  const [distillery, setDistillery] = useState('')
  const [minScore, setMinScore] = useState(0)

  return (
    <>
      <PageHero
        kicker="テイスティングノート"
        title={
          <>
            Tasting <em>Reviews</em>
          </>
        }
        subtitle="Honest, considered notes from our team of dedicated tasters — every score earned through careful, repeated assessment."
        toriiStyle={{
          right: '3%',
          bottom: '-10px',
          width: '180px',
          height: '260px',
          opacity: 0.07,
        }}
      />
      <ScoreBand />
      <div className={styles.reviewsLayout}>
        <ReviewsSidebar
          reviews={reviews}
          distillery={distillery}
          minScore={minScore}
          onDistilleryChange={setDistillery}
          onMinScoreChange={setMinScore}
        />
        <ReviewsList reviews={reviews} distillery={distillery} minScore={minScore} />
      </div>
      <div className={styles.writeReviewBand}>
        <div className={styles.writeReviewInner}>
          <div className={styles.writeReviewLeft}>
            <h2>
              Share Your <em>Impressions</em>
            </h2>
            <p>
              Have you tasted one of our expressions? We'd love to hear your thoughts. Every
              review helps our community discover their next favourite dram.
            </p>
          </div>
          <WriteReviewForm />
        </div>
      </div>
    </>
  )
}
