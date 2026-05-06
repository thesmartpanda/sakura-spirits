interface StarRatingProps {
  rating: number
  showValue?: boolean
  className?: string
}

export function StarRating({ rating, showValue = false, className = 'feat-card-rating' }: StarRatingProps) {
  const full = Math.round(rating)
  return (
    <div className={className}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="star"
          style={i > full ? { color: 'var(--cream-deeper)' } : undefined}
        >
          ★
        </span>
      ))}
      {showValue && (
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
          {rating}
        </span>
      )}
    </div>
  )
}
