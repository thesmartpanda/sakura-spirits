import { type FaqApiItem } from '../lib/directus'
import { useFetch } from './useFetch'

const FAQS_QUERY = '/items/faqs?filter[status][_eq]=published&sort[]=sort'

export function useFaqs(): {
  faqs: FaqApiItem[]
  loading: boolean
  error: Error | null
} {
  const { data, loading, error } = useFetch<FaqApiItem[]>(FAQS_QUERY)
  return { faqs: data ?? [], loading, error }
}
