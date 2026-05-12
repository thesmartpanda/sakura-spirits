import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

interface BlossomItem {
  id: number
  left: number
  size: number
  duration: number
  delay: number
}

export function Hero() {
  const [blossoms, setBlossoms] = useState<BlossomItem[]>([])

  useEffect(() => {
    const add = () => {
      const id = Date.now() + Math.random()
      const item: BlossomItem = {
        id,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 4,
      }
      setBlossoms((prev) => [...prev, item])
      // 16 000 ms > max animation time (duration 14 s + delay 4 s) so the DOM
      // node is only removed after the CSS animation has fully completed.
      setTimeout(
        () => setBlossoms((prev) => prev.filter((b) => b.id !== id)),
        16000,
      )
    }
    const interval = setInterval(add, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />

      <svg
        className={styles.toriiHero}
        viewBox="0 0 300 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="40" y="120" width="28" height="480" fill="#c8922a" />
        <rect x="232" y="120" width="28" height="480" fill="#c8922a" />
        <rect x="10" y="60" width="280" height="30" fill="#c8922a" />
        <path d="M10 60 Q0 40 10 30 L20 60Z" fill="#c8922a" />
        <path d="M290 60 Q300 40 290 30 L280 60Z" fill="#c8922a" />
        <rect x="30" y="105" width="240" height="18" fill="#c8922a" />
        <rect x="58" y="82" width="12" height="40" fill="#c8922a" />
        <rect x="230" y="82" width="12" height="40" fill="#c8922a" />
      </svg>

      <div>
        {blossoms.map((b) => (
          <div
            key={b.id}
            className={styles.blossom}
            style={{
              left: `${b.left}%`,
              top: '-20px',
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <svg viewBox="0 0 30 30" width={b.size} height={b.size}>
              <g transform="translate(15,15)">
                {[0, 72, 144, 216, 288].map((rot) => (
                  <ellipse
                    key={rot}
                    cx="0"
                    cy="-7"
                    rx="4"
                    ry="6"
                    fill="#f5c5c5"
                    opacity="0.7"
                    transform={`rotate(${rot})`}
                  />
                ))}
                <circle cx="0" cy="0" r="3" fill="#ffd700" opacity="0.8" />
              </g>
            </svg>
          </div>
        ))}
      </div>

      <div className={styles.heroInner}>
        <p className={styles.heroKicker}>日本ウイスキーの世界へようこそ</p>
        <h1 className={styles.heroTitle}>
          The Art of
          <br />
          <em>Japanese</em>
          <br />
          Whisky
        </h1>
        <p className={styles.heroTitleJp}>日本ウイスキー</p>
        <p className={styles.heroDesc}>
          Curated expressions from Japan's most celebrated distilleries — from
          the misty valleys of Yoichi to the highland waters of Hakushu. Every
          bottle tells a story of patience, craft, and the pursuit of harmony.
        </p>
        <div className={styles.heroActions}>
          <Link to="/shop" className="btn-primary">
            <span>Explore the Collection</span>
          </Link>
          <Link to="/reviews" className="btn-outline btn-outline--light">
            Read Reviews
          </Link>
        </div>
      </div>

      <div className={styles.heroScrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  )
}
