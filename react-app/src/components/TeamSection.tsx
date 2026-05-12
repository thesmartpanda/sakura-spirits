import { useTeamMembers } from '../hooks'
import { TeamCard } from './TeamCard'
import { Reveal } from './Reveal'
import styles from './TeamSection.module.css'

export function TeamSection() {
  const { members } = useTeamMembers()

  return (
    <section className={styles.teamSection}>
      <Reveal>
        <h2>
          The <em>Team</em>
        </h2>
      </Reveal>
      <Reveal style={{ transitionDelay: '0.1s' }}>
        <div className={styles.teamGrid}>
          {members.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
