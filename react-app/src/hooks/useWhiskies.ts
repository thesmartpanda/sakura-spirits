import { useMemo } from 'react'
import { mapWhisky, type Whisky, type WhiskyApiItem } from '../lib/directus'
import { useFetch } from './useFetch'

const SHOP_QUERY =
  '/items/whiskies?filter[status][_eq]=published&sort[]=sort&fields[]=*,flavor_profile.*,image'

const FEATURED_QUERY =
  '/items/whiskies?filter[status][_eq]=published&filter[featured][_eq]=true&sort[]=sort&limit=3&fields[]=*,image'

const OPTIONS_QUERY =
  '/items/whiskies?filter[status][_eq]=published&sort[]=sort&fields[]=id,name'

export interface WhiskyOption {
  id: number
  name: string
}

/**
 * `useMemo` prevents `mapWhisky` from running on every render — only when the
 * raw API response reference changes (i.e. a fresh fetch completed).
 */
export function useWhiskies(query = SHOP_QUERY): {
  whiskies: Whisky[]
  loading: boolean
  error: Error | null
} {
  const { data, loading, error } = useFetch<WhiskyApiItem[]>(query)
  const whiskies = useMemo(() => (data ?? []).map(mapWhisky), [data])
  return { whiskies, loading, error }
}

/** Subset for the homepage featured grid (limit 3, featured flag). */
export function useFeaturedWhiskies() {
  return useWhiskies(FEATURED_QUERY)
}

/** Minimal id+name list for select dropdowns (e.g. review form). */
export function useWhiskyOptions(): {
  options: WhiskyOption[]
  loading: boolean
  error: Error | null
} {
  const { data, loading, error } = useFetch<WhiskyOption[]>(OPTIONS_QUERY)
  return { options: data ?? [], loading, error }
}
