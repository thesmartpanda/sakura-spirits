import { useMemo } from 'react'
import { mapReview, type Review, type ReviewApiItem } from '../lib/directus'
import { useFetch } from './useFetch'

const REVIEWS_QUERY =
  '/items/reviews?filter[status][_eq]=published&sort[]=-score&fields[]=*,whisky_id.*'

export function useReviews(): {
  reviews: Review[]
  loading: boolean
  error: Error | null
} {
  const { data, loading, error } = useFetch<ReviewApiItem[]>(REVIEWS_QUERY)
  const reviews = useMemo(() => (data ?? []).map(mapReview), [data])
  return { reviews, loading, error }
}
