import { Link } from 'react-router-dom'
import { useFeaturedWhiskies } from '../hooks'
import { FeaturedCard } from './FeaturedCard'
import { SectionHeader } from './SectionHeader'
import { Reveal } from './Reveal'
import styles from './FeaturedSection.module.css'

export function FeaturedSection() {
  const { whiskies, loading } = useFeaturedWhiskies()

  return (
    <section className={styles.featured}>
      <Reveal>
        <SectionHeader
          label="厳選された表現"
          title={
            <>
              Featured
              <br />
              <em>Expressions</em>
            </>
          }
          action={
            <Link
              to="/shop"
              className="btn-outline"
              style={{ whiteSpace: 'nowrap', alignSelf: 'flex-end' }}
            >
              View All
            </Link>
          }
        />
      </Reveal>

      <Reveal style={{ transitionDelay: '0.15s' }}>
        <div className={styles.featuredGrid}>
          {!loading && whiskies.map((w) => <FeaturedCard key={w.id} whisky={w} />)}
        </div>
      </Reveal>
    </section>
  )
}
