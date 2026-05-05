import { useEffect, useState } from 'react'
import { directusFetch } from '../lib/directus'

export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Generic Directus GET hook. Pass null to skip fetching (conditional fetching).
 * Cancels the in-flight request via AbortController on unmount or path change.
 */
export function useFetch<T>(path: string | null): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(path !== null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (path === null) {
      setLoading(false)
      setData(null)
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    directusFetch<T>(path, controller.signal)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      })

    return () => controller.abort()
  }, [path])

  return { data, loading, error }
}
