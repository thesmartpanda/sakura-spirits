import type { TeamMemberApiItem } from '../lib/directus'
import styles from './TeamSection.module.css'

const BG_GRADIENTS = [
  'linear-gradient(160deg, #3d2b1a 0%, #1a1208 100%)',
  'linear-gradient(160deg, #1e3a5f 0%, #0d1a2e 100%)',
  'linear-gradient(160deg, #5a2a0a 0%, #2d1408 100%)',
]

interface TeamCardProps {
  member: TeamMemberApiItem
  index: number
}

export function TeamCard({ member: m, index }: TeamCardProps) {
  return (
    <div className={styles.teamCard}>
      <div className={styles.teamCardImg}>
        <div
          className={styles.teamCardImgBg}
          style={{ background: BG_GRADIENTS[index % BG_GRADIENTS.length] }}
        />
        <div className={styles.teamCardInitials}>{m.initials}</div>
      </div>
      <div className={styles.teamCardBody}>
        <h3 className={styles.teamCardName}>{m.name}</h3>
        <p className={styles.teamCardRole}>{m.role}</p>
        <p className={styles.teamCardBio}>{m.bio}</p>
      </div>
    </div>
  )
}
