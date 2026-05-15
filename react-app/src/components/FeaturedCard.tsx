import { Link } from 'react-router-dom'
import type { Whisky } from '../lib/directus'
import { BottleSvg } from './BottleSvg'
import { StarRating } from './StarRating'
import styles from './FeaturedSection.module.css'

interface FeaturedCardProps {
  whisky: Whisky
}

export function FeaturedCard({ whisky: w }: FeaturedCardProps) {
  return (
    <Link to={`/regions/${w.filter}`} className={styles.featCard}>
      <div className={styles.featCardImg}>
        <div className={styles.featCardImgInner} style={{ background: w.bg }} />
        {w.imageUrl ? (
          <img
            src={w.imageUrl}
            alt={w.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
            }}
          />
        ) : (
          <BottleSvg kanji={w.kanji} />
        )}
      </div>
      <div className={styles.featCardBody}>
        <p className={styles.featCardRegion}>{w.region}</p>
        <h3 className={styles.featCardName}>{w.name}</h3>
        <p className={styles.featCardAge}>
          {w.age} · {w.abv} ABV
        </p>
        {/* <p className={styles.featCardPrice}>
          {w.price} · {w.priceSub.split('·')[0].trim()}
        </p> */}
        <StarRating rating={w.rating} className={styles.featCardRating} showValue />
      </div>
    </Link>
  )
}
