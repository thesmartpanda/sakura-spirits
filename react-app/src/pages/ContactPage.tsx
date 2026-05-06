import { Reveal } from '../components/Reveal'
import { ToriiAccent } from '../components/ToriiAccent'
import { ContactInfo } from '../components/ContactInfo'
import { ContactForm } from '../components/ContactForm'
import { FaqSection } from '../components/FaqSection'
import styles from './ContactPage.module.css'

export function ContactPage() {
  return (
    <>
      <div className={styles.contactHero}>
        <div className={styles.contactHeroInner}>
          <p className={styles.contactHeroKicker}>お問い合わせ</p>
          <h1>
            Get in <em>Touch</em>
          </h1>
          <p>
            Whether you have a question about a whisky, need help with an order, or simply want
            to talk about Japanese spirits — we're here.
          </p>
        </div>
        <ToriiAccent
          style={{
            right: '3%',
            bottom: '-10px',
            width: '200px',
            height: '280px',
            opacity: 0.06,
          }}
        />
      </div>
      <div className={styles.contactLayout}>
        <ContactInfo />
        <Reveal style={{ transitionDelay: '0.15s' }}>
          <ContactForm />
        </Reveal>
      </div>
      <FaqSection />
    </>
  )
}
