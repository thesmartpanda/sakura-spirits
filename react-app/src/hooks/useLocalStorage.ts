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

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Stable ref so the storage event handler never closes over a stale initialValue
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

  // Cross-tab sync: the native 'storage' event only fires in tabs OTHER than
  // the one that called setItem, which is exactly what we need here.
  // We use e.newValue directly rather than re-reading localStorage to avoid
  // races when another tab writes rapidly.
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
