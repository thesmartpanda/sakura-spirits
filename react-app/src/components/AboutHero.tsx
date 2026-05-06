import styles from './AboutHero.module.css'

export function AboutHero() {
  return (
    <section className={styles.aboutHero}>
      <div className={styles.aboutHeroBg} />
      <div className={styles.decoKanji}>物語</div>
      <div className={styles.aboutHeroInner}>
        <p className={styles.aboutHeroKicker}>私たちについて</p>
        <h1 className={styles.aboutHeroTitle}>
          Our <em>Story</em>
        </h1>
        <p className={styles.aboutHeroSub}>
          Born from a journey to Japan and a life-changing dram of Yamazaki 18 — Sakura Spirits
          exists to share the wonder of Japanese whisky with the world.
        </p>
      </div>
    </section>
  )
}
