import { type RegionApiItem } from '../lib/directus'
import { useFetch } from './useFetch'

const REGIONS_QUERY = '/items/regions?filter[status][_eq]=published&sort[]=sort'

export function useRegions(): {
  regions: RegionApiItem[]
  loading: boolean
  error: Error | null
} {
  const { data, loading, error } = useFetch<RegionApiItem[]>(REGIONS_QUERY)
  return { regions: data ?? [], loading, error }
}
