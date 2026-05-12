import { useRef, useState } from 'react'
import clsx from 'clsx'
import { useSubmitContact } from '../hooks'
import styles from './ContactForm.module.css'

const SUBJECTS = ['Order Enquiry', 'Tasting Question', 'Trade / Wholesale', 'Other']

export function ContactForm() {
  const { submitContact, submitting } = useSubmitContact()
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [subject, setSubject] = useState('Order Enquiry')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitContact({
      first_name: firstNameRef.current?.value ?? '',
      last_name: lastNameRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      subject,
      message: messageRef.current?.value ?? '',
      status: 'new',
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.contactFormWrap}>
        <div className={styles.formSuccess}>
          <div className={styles.formSuccessJp}>ありがとうございます</div>
          <div className={styles.formSuccessEn}>Thank you for your message.</div>
          <p className={styles.formSuccessSub}>We'll be in touch within one working day.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.contactFormWrap}>
      <h2 className={styles.formTitle}>Send a Message</h2>
      <p className={styles.formSubtitle}>Fill in the form and we'll get back to you promptly.</p>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.cfRow}>
          <div className={styles.cfGroup}>
            <label className={styles.cfLabel}>First Name</label>
            <input
              className={styles.cfInput}
              type="text"
              placeholder="Emma"
              required
              ref={firstNameRef}
            />
          </div>
          <div className={styles.cfGroup}>
            <label className={styles.cfLabel}>Last Name</label>
            <input
              className={styles.cfInput}
              type="text"
              placeholder="Thornton"
              required
              ref={lastNameRef}
            />
          </div>
        </div>
        <div className={styles.cfGroup}>
          <label className={styles.cfLabel}>Email</label>
          <input
            className={styles.cfInput}
            type="email"
            placeholder="emma@example.com"
            required
            ref={emailRef}
          />
        </div>
        <div className={styles.cfGroup}>
          <label className={styles.cfLabel}>Subject</label>
          <div className={styles.subjectTabs}>
            {SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                className={clsx(styles.subjectTab, { [styles.active]: subject === s })}
                onClick={() => setSubject(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.cfGroup}>
          <label className={styles.cfLabel}>Your Message</label>
          <textarea
            className={styles.cfTextarea}
            placeholder="Tell us how we can help…"
            required
            ref={messageRef}
          />
        </div>
        <div className={styles.cfSubmit}>
          <button type="submit" className="btn-primary" disabled={submitting}>
            <span>{submitting ? '…' : 'Send Message'}</span>
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            We typically reply within 24h.
          </span>
        </div>
      </form>
    </div>
  )
}
