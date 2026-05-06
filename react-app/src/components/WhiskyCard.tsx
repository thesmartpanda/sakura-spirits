import { useState } from 'react'
import clsx from 'clsx'
import type { Whisky } from '../lib/directus'
import { BottleSvg } from './BottleSvg'
import { useCartContext } from '../contexts/CartContext'
import styles from './ShopGrid.module.css'

interface WhiskyCardProps {
  whisky: Whisky
  onOpenDrawer: (whisky: Whisky) => void
}

export function WhiskyCard({ whisky: w, onOpenDrawer }: WhiskyCardProps) {
  const { addItem } = useCartContext()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({ id: w.id, name: w.name, price: w.priceSub.split('·')[0].trim() })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className={styles.whiskyCard} onClick={() => onOpenDrawer(w)}>
      <div className={styles.whiskyCardImg}>
        <div className={styles.whiskyCardImgInner} style={{ background: w.bg }} />
        {w.badge && <span className={styles.whiskyCardBadge}>{w.badge}</span>}
        <BottleSvg kanji={w.kanji} />
      </div>
      <div className={styles.whiskyCardBody}>
        <p className={styles.whiskyCardRegion}>{w.region}</p>
        <h3 className={styles.whiskyCardName}>{w.name}</h3>
        <p className={styles.whiskyCardSub}>{w.sub}</p>
      </div>
      <div className={styles.whiskyCardFooter}>
        <div>
          <div className={styles.whiskyPrice}>{w.price}</div>
          <div className={styles.whiskyPriceSub}>{w.priceSub.split('·')[0].trim()}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            className={styles.addCartBtn}
            style={{
              background: 'none',
              border: '1px solid var(--cream-deeper)',
              color: 'var(--text-muted)',
            }}
            onClick={(e) => {
              e.stopPropagation()
              onOpenDrawer(w)
            }}
            title="Tasting Notes"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
          <button
            type="button"
            className={clsx(styles.addCartBtn, { [styles.added]: added })}
            onClick={handleAdd}
          >
            {added ? '✓' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
