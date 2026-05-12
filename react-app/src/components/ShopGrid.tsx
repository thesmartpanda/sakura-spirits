import type { Whisky } from '../lib/directus'
import { WhiskyCard } from './WhiskyCard'
import styles from './ShopGrid.module.css'

interface ShopGridProps {
  whiskies: Whisky[]
  onOpenDrawer: (w: Whisky) => void
}

export function ShopGrid({ whiskies, onOpenDrawer }: ShopGridProps) {
  return (
    <div className={styles.shopSection}>
      <div className={styles.shopGrid}>
        {whiskies.map((w) => (
          <WhiskyCard key={w.id} whisky={w} onOpenDrawer={onOpenDrawer} />
        ))}
      </div>
    </div>
  )
}
