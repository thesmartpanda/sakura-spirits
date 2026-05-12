import { Link } from 'react-router-dom'
import { ToriiAccent } from './ToriiAccent'
import { Reveal } from './Reveal'
import styles from './PhilosophyBand.module.css'

export function PhilosophyBand() {
  return (
    <section className={styles.philosophy}>
      <ToriiAccent
        style={{ right: '-60px', top: '-40px', width: '400px', height: '500px' }}
      />

      <div className={styles.philosophyInner}>
        <Reveal>
          <blockquote className={styles.philosophyQuote}>
            "In every drop, a season. In every sip,{' '}
            <span>a lifetime of craft.</span>"
          </blockquote>
          <p className={styles.philosophyAttr}>— The Sakura Spirits Philosophy</p>
        </Reveal>

        <Reveal className={styles.philosophyText} style={{ transitionDelay: '0.2s' }}>
          <p>
            Japanese whisky is not merely a spirit — it is the embodiment of{' '}
            <em>monozukuri</em>, the art of making things with care, devotion,
            and an unrelenting pursuit of excellence.
          </p>
          <p>
            From the soft mountain waters of the Japanese Alps to the
            sea-salted air of Hokkaido, each distillery imparts its unique
            character into every cask.
          </p>
          <Link to="/about" className="btn-primary" style={{ marginTop: '1.5rem' }}>
            <span>Our Philosophy</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
