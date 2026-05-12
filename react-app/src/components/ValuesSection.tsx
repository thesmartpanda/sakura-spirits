import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { ValueItem } from './ValueItem'
import styles from './ValuesSection.module.css'

const VALUES = [
  {
    num: '01',
    name: 'Monozukuri',
    jp: '物作り',
    desc: 'The art of making things — with care, precision, and devotion. Every bottle we carry embodies this principle.',
  },
  {
    num: '02',
    name: 'Ma',
    jp: '間',
    desc: 'The Japanese concept of negative space and pause. We believe great whisky, like great design, requires knowing what to leave out.',
  },
  {
    num: '03',
    name: 'Shokunin',
    jp: '職人',
    desc: 'The spirit of the artisan — someone who gives their whole life to mastering a single skill. We honour this in every distillery we partner with.',
  },
]

export function ValuesSection() {
  return (
    <section className={styles.values}>
      <Reveal className={styles.valuesIntro}>
        <div className={styles.valuesIntroText}>
          <h2>
            Rooted in <em>Respect</em>
            <br />
            for the Craft
          </h2>
          <p>
            It started with a single glass in a tiny Kyoto bar in 2018. The bartender — a woman
            who had spent thirty years studying whisky — poured a measure of Yamazaki 18 Year
            without a word and slid it across the counter.
          </p>
          <p>
            That moment changed everything. We returned from Japan knowing that the world deserved
            better access to these extraordinary spirits. Sakura Spirits was founded the following
            year.
          </p>
          <p>
            Today we work directly with distilleries, importers, and collectors to source
            expressions that are genuinely worth your time — and your money.
          </p>
          <Link to="/shop" className="btn-primary" style={{ marginTop: '1.5rem' }}>
            <span>Explore the Collection</span>
          </Link>
        </div>
        <div className={styles.valuesQuote}>
          <blockquote>
            "The Japanese do not make whisky. They cultivate it — with the same devotion a
            gardener gives to cherry trees."
          </blockquote>
          <cite>— Emma Thornton, Founder</cite>
        </div>
      </Reveal>

      <Reveal style={{ transitionDelay: '0.15s' }}>
        <div className={styles.valuesGrid}>
          {VALUES.map((v) => (
            <ValueItem key={v.num} num={v.num} name={v.name} jp={v.jp} desc={v.desc} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
