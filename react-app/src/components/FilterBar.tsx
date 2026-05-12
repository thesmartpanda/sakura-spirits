import type { SortOption } from '../hooks'
import { FilterChip } from './FilterChip'
import styles from './FilterBar.module.css'

const DISTILLERIES = [
  { label: 'All', value: '' },
  { label: 'Yamazaki', value: 'yamazaki' },
  { label: 'Hakushu', value: 'hakushu' },
  { label: 'Yoichi', value: 'yoichi' },
  { label: 'Nikka', value: 'nikka' },
  { label: 'Hibiki', value: 'hibiki' },
]

interface FilterBarProps {
  filter: string
  sort: SortOption
  onFilterChange: (value: string) => void
  onSortChange: (sort: SortOption) => void
}

export function FilterBar({
  filter,
  sort,
  onFilterChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterBarInner}>
        <span className={styles.filterLabel}>Filter:</span>
        {DISTILLERIES.map((d) => (
          <FilterChip
            key={d.value}
            label={d.label}
            active={filter === d.value}
            onClick={() => onFilterChange(d.value)}
          />
        ))}
        <div className={styles.filterSort}>
          <span>Sort:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>
    </div>
  )
}
