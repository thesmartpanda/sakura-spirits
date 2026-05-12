import { useRegions } from '../hooks'
import { RegionCard } from './RegionCard'
import { SectionHeader } from './SectionHeader'
import { Reveal } from './Reveal'
import styles from './RegionsSection.module.css'

export function RegionsSection() {
  const { regions } = useRegions()

  return (
    <section className={styles.regions}>
      <Reveal>
        <SectionHeader
          label="産地別"
          title={
            <>
              Explore by <em>Region</em>
            </>
          }
        />
      </Reveal>
      <Reveal style={{ transitionDelay: '0.15s' }}>
        <div className={styles.regionsGrid}>
          {regions.map((r) => (
            <RegionCard key={r.id} region={r} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
