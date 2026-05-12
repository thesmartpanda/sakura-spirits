import { useState } from 'react'
import { useSubscribeNewsletter, useNewsletterStatus } from '../hooks'
import { Reveal } from './Reveal'
import styles from './NewsletterSection.module.css'

const BlossomPetals = ({ centerR = 10 }: { centerR?: number }) => (
  <g>
    <ellipse cx="100" cy="55" rx="26" ry="42" fill="#f5c5c5" />
    <ellipse cx="100" cy="55" rx="26" ry="42" fill="#f5c5c5" transform="rotate(72 100 100)" />
    <ellipse cx="100" cy="55" rx="26" ry="42" fill="#f5c5c5" transform="rotate(144 100 100)" />
    <ellipse cx="100" cy="55" rx="26" ry="42" fill="#f5c5c5" transform="rotate(216 100 100)" />
    <ellipse cx="100" cy="55" rx="26" ry="42" fill="#f5c5c5" transform="rotate(288 100 100)" />
    <circle cx="100" cy="100" r={centerR} fill="#ffd700" />
  </g>
)

/**
 * Two separate hooks are used intentionally:
 * - `useSubscribeNewsletter` handles the API call (fire-and-forget POST).
 * - `useNewsletterStatus` persists the subscribed state in localStorage so the
 *   form stays hidden across page reloads without querying the API again.
 */
export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const { subscribe: apiSubscribe, submitting } = useSubscribeNewsletter()
  const { status, subscribe: markSubscribed } = useNewsletterStatus()
  const success = status === 'subscribed'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    try {
      await apiSubscribe(email.trim())
    } catch {
      // API errors (including duplicate email) are swallowed — the UX goal is
      // to hide the form after any attempt, not to surface backend details.
    }
    markSubscribed()
    setEmail('')
  }

  return (
    <section className={styles.newsletter}>
      <div className={styles.nlBranch} />

      <svg className={`${styles.nlBlossom} ${styles.nlBlossom1}`} viewBox="0 0 200 200">
        <BlossomPetals />
      </svg>
      <svg className={`${styles.nlBlossom} ${styles.nlBlossom2}`} viewBox="0 0 200 200">
        <BlossomPetals />
      </svg>
      <svg className={`${styles.nlBlossom} ${styles.nlBlossom3}`} viewBox="0 0 200 200">
        <BlossomPetals centerR={11} />
      </svg>
      <svg className={`${styles.nlBlossom} ${styles.nlBlossom4}`} viewBox="0 0 200 200">
        <BlossomPetals centerR={11} />
      </svg>
      <svg className={`${styles.nlBlossom} ${styles.nlBlossom5}`} viewBox="0 0 200 200">
        <BlossomPetals centerR={11} />
      </svg>

      <Reveal className={styles.newsletterInner}>
        <p
          className="section-label"
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          ニュースレター
        </p>
        <h2>
          Stay in the <em>Know</em>
        </h2>
        <p className={styles.nlDesc}>
          New arrivals, tasting notes, and rare finds — delivered to your inbox.
        </p>
        {success ? (
          <p
            style={{
              color: 'var(--amber)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
            }}
          >
            Arigatou gozaimasu — you're on the list.
          </p>
        ) : (
          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? '…' : 'Subscribe'}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  )
}
