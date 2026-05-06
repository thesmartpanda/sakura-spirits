import { Reveal } from './Reveal'
import { TimelineItem } from './TimelineItem'
import styles from './TimelineSection.module.css'

const TIMELINE = [
  {
    year: '1923',
    event: 'Yamazaki Distillery Founded',
    desc: "Shinjiro Torii establishes Japan's first malt whisky distillery at the confluence of three rivers south of Kyoto.",
  },
  {
    year: '1934',
    event: 'Masataka Taketsuru Opens Yoichi',
    desc: 'Having trained in Scotland, Taketsuru founds Nikka in Hokkaido — choosing a climate reminiscent of his beloved Highlands.',
  },
  {
    year: '2001',
    event: 'Japanese Whisky Goes Global',
    desc: "Nikka's single cask wins at the Whisky Magazine World Whiskies Awards, marking the moment the world sat up and took notice.",
  },
  {
    year: '2018',
    event: 'The Glass in Kyoto',
    desc: 'Our founder Emma Thornton has a life-changing encounter with Yamazaki 18 Year in a Kyoto bar. Sakura Spirits is conceived that evening.',
  },
  {
    year: '2019',
    event: 'Sakura Spirits Founded',
    desc: 'We open our doors — first as an online retailer, then expanding to a curated selection of the finest Japanese expressions available outside Japan.',
  },
  {
    year: '2026',
    event: 'Seven Expressions, One Philosophy',
    desc: "Today we carry seven carefully chosen whiskies, each one a conversation with Japan's extraordinary distilling heritage.",
  },
]

export function TimelineSection() {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.timelineInner}>
        <Reveal>
          <h2>
            A Brief <em>History</em>
          </h2>
        </Reveal>
        <Reveal style={{ transitionDelay: '0.1s' }}>
          <div className={styles.timeline}>
            {TIMELINE.map((t) => (
              <TimelineItem key={t.year} year={t.year} event={t.event} desc={t.desc} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
