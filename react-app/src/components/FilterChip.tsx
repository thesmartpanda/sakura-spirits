import clsx from 'clsx'
import styles from './FilterBar.module.css'

interface FilterChipProps {
  label: string
  active?: boolean
  onClick: () => void
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      className={clsx(styles.filterChip, { [styles.active]: active })}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
