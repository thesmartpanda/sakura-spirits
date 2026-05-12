import { useState } from 'react'
import clsx from 'clsx'
import styles from './WriteReviewForm.module.css'

interface StarPickerProps {
  value: number
  onChange: (val: number) => void
}

export function StarPicker({ value, onChange }: StarPickerProps) {
  const [hover, setHover] = useState(0)
  const active = hover || value

  return (
    <div className={styles.starPicker} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={clsx(styles.starPick, { [styles.lit]: active >= i })}
          onMouseEnter={() => setHover(i)}
          onClick={() => onChange(i)}
        >
          ★
        </span>
      ))}
    </div>
  )
}
