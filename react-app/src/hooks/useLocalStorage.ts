import { useCallback, useEffect, useRef, useState } from 'react'

type SetValue<T> = (value: T | ((prev: T) => T)) => void

function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/**
 * Persists React state in `localStorage` with automatic cross-tab sync.
 *
 * Non-trivial choices:
 * - `initialRef` captures `initialValue` once at mount so the `storage` event
 *   handler always has a stable fallback without being re-registered on every render.
 * - The handler reads `e.newValue` directly instead of re-calling `getItem` to
 *   avoid a race where a third tab writes again between the event and our read.
 * - The native `storage` event only fires in tabs *other* than the one that wrote,
 *   so there is no risk of a loop between `setValue` and the handler.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const initialRef = useRef(initialValue)

  const [value, setRawValue] = useState<T>(() =>
    readFromStorage(key, initialValue),
  )

  const setValue: SetValue<T> = useCallback(
    (action) => {
      setRawValue((prev) => {
        const next =
          typeof action === 'function' ? (action as (p: T) => T)(prev) : action
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          // Quota exceeded or storage unavailable — React state still updates
        }
        return next
      })
    },
    [key],
  )

  // Cross-tab sync — see JSDoc above for why e.newValue is read directly.
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.storageArea !== localStorage || e.key !== key) return
      if (e.newValue === null) {
        setRawValue(initialRef.current)
      } else {
        try {
          setRawValue(JSON.parse(e.newValue) as T)
        } catch {
          setRawValue(initialRef.current)
        }
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [value, setValue]
}

export default useLocalStorage
