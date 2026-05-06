import { useRef, useState } from 'react'
import clsx from 'clsx'
import { useSubmitReview, useWhiskyOptions } from '../hooks'
import { StarPicker } from './StarPicker'
import styles from './WriteReviewForm.module.css'

export function WriteReviewForm() {
  const { submitReview, submitting } = useSubmitReview()
  const { options } = useWhiskyOptions()
  const nameRef = useRef<HTMLInputElement>(null)
  const whiskyRef = useRef<HTMLSelectElement>(null)
  const notesRef = useRef<HTMLTextAreaElement>(null)
  const [stars, setStars] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({
    name: false,
    whisky: false,
    stars: false,
    notes: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value.trim() ?? ''
    const whiskyId = whiskyRef.current?.value ?? ''
    const notes = notesRef.current?.value.trim() ?? ''

    const errs = { name: !name, whisky: !whiskyId, stars: stars < 1, notes: !notes }
    setErrors(errs)
    if (Object.values(errs).some(Boolean)) return

    const initials = name
      .split(/\s+/)
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    await submitReview({
      author_name: name,
      author_initials: initials,
      whisky_id: parseInt(whiskyId),
      stars,
      score: Math.round((stars / 5) * 100),
      verdict: notes,
      review_date: new Date().toISOString().split('T')[0],
      status: 'draft',
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p
        style={{
          color: 'var(--amber)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '0.9rem',
        }}
      >
        Arigatou — your review has been received.
      </p>
    )
  }

  return (
    <form className={styles.reviewForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Your Name</label>
          <input
            className={clsx(styles.formInput, { [styles.fieldInvalid]: errors.name })}
            type="text"
            placeholder="Tanaka Hiroshi"
            ref={nameRef}
            onChange={() => setErrors((e) => ({ ...e, name: false }))}
          />
          {errors.name && (
            <span className={clsx(styles.fieldError, styles.show)}>Please enter your name.</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Whisky</label>
          <select
            className={clsx(styles.formSelect, { [styles.fieldInvalid]: errors.whisky })}
            ref={whiskyRef}
            onChange={() => setErrors((e) => ({ ...e, whisky: false }))}
            defaultValue=""
          >
            <option value="" disabled>
              Select a whisky…
            </option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
          {errors.whisky && (
            <span className={clsx(styles.fieldError, styles.show)}>Please select a whisky.</span>
          )}
        </div>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Your Rating</label>
        <StarPicker
          value={stars}
          onChange={(v) => {
            setStars(v)
            setErrors((e) => ({ ...e, stars: false }))
          }}
        />
        {errors.stars && (
          <span className={clsx(styles.fieldError, styles.show)}>Please select a rating.</span>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Tasting Notes</label>
        <textarea
          className={clsx(styles.formTextarea, { [styles.fieldInvalid]: errors.notes })}
          placeholder="Describe what you smell, taste, and feel…"
          ref={notesRef}
          onChange={() => setErrors((e) => ({ ...e, notes: false }))}
        />
        {errors.notes && (
          <span className={clsx(styles.fieldError, styles.show)}>Please add your tasting notes.</span>
        )}
      </div>
      <button
        type="submit"
        className="btn-primary"
        style={{ alignSelf: 'flex-start' }}
        disabled={submitting}
      >
        <span>{submitting ? '…' : 'Submit Review'}</span>
      </button>
    </form>
  )
}
