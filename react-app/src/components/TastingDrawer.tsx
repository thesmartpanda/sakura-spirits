import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import clsx from 'clsx'
import type { Whisky } from '../lib/directus'
import { FlavorBarRow } from './FlavorBarRow'
import { useCartContext } from '../contexts/CartContext'
import styles from './TastingDrawer.module.css'

interface TastingDrawerProps {
  whisky: Whisky | null
  onClose: () => void
  onAddToCart: () => void
}

/**
 * Rendered via `createPortal` into `document.body` to escape any ancestor
 * stacking context that would otherwise clip the overlay z-index.
 */
export function TastingDrawer({ whisky, onClose }: TastingDrawerProps) {
  useCartContext()
  const open = whisky !== null

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])


  return createPortal(
    <div
      className={clsx(styles.overlay, { [styles.open]: open })}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.drawer}>
        <div className={styles.drawerHeader} style={{ background: whisky?.bg }}>
          <button type="button" className={styles.drawerClose} onClick={onClose}>
            ✕
          </button>
          {whisky?.imageUrl && (
            <img
              src={whisky.imageUrl}
              alt={whisky.name}
              className={styles.drawerHeaderImg}
            />
          )}
          <p className={styles.drawerRegion}>{whisky?.region}</p>
          <h2 className={styles.drawerName}>{whisky?.name}</h2>
          <p className={styles.drawerMeta}>
            {whisky &&
              `${whisky.age} · ${whisky.abv} · ${whisky.sub.split('·').slice(-1)[0].trim()}`}
          </p>
        </div>
        <div className={styles.drawerBody}>
          <p className={styles.drawerSectionTitle}>Nose</p>
          <p className={styles.tastingNoteText}>{whisky?.nose}</p>
          <p className={styles.drawerSectionTitle}>Palate</p>
          <p className={styles.tastingNoteText}>{whisky?.palate}</p>
          <p className={styles.drawerSectionTitle}>Finish</p>
          <p className={styles.tastingNoteText}>{whisky?.finish}</p>
          {whisky && whisky.flavors.length > 0 && (
            <>
              <p className={styles.drawerSectionTitle}>Flavour Profile</p>
              <div className={styles.flavorProfile}>
                {whisky.flavors.map((f) => (
                  <FlavorBarRow key={`${whisky.id}-${f.name}`} name={f.name} val={f.val} />
                ))}
              </div>
            </>
          )}
          {/* <div className={styles.drawerPriceRow}>
            <div>
              <div className={styles.drawerPrice}>{whisky?.price}</div>
              <div className={styles.drawerPriceSub}>{whisky?.priceSub}</div>
            </div>
            <button type="button" className={styles.drawerAddBtn} onClick={handleAdd}>
              Add to Cart
            </button>
          </div> */}
        </div>
      </div>
    </div>,
    document.body,
  )
}
