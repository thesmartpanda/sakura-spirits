import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useLocalStorage from './useLocalStorage'

// jsdom does not populate storageArea via the StorageEvent constructor and
// the property is non-configurable on StorageEvent.prototype, so
// Object.defineProperty on the instance is also blocked. We use a plain Event
// with the StorageEvent shape assigned on top — the hook reads duck-typed
// properties, so this works at runtime.
function fireStorageEvent(
  key: string,
  newValue: string | null,
  storageArea: Storage = localStorage,
) {
  const event = Object.assign(new Event('storage'), {
    key,
    newValue,
    oldValue: null,
    storageArea,
    url: '',
  })
  window.dispatchEvent(event)
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ─── Initialization ───────────────────────────────────────────────

describe('initialization', () => {
  it('returns initialValue when key is absent from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('missing', 42))
    expect(result.current[0]).toBe(42)
  })

  it('works with any initialValue type (array)', () => {
    const { result } = renderHook(() => useLocalStorage('list', [] as number[]))
    expect(result.current[0]).toEqual([])
  })

  it('reads a previously persisted value', () => {
    localStorage.setItem('name', JSON.stringify('Yamazaki'))
    const { result } = renderHook(() => useLocalStorage('name', ''))
    expect(result.current[0]).toBe('Yamazaki')
  })

  it('reads a persisted object', () => {
    const cart = [{ id: 1, qty: 2 }]
    localStorage.setItem('cart', JSON.stringify(cart))
    const { result } = renderHook(() =>
      useLocalStorage('cart', [] as { id: number; qty: number }[]),
    )
    expect(result.current[0]).toEqual(cart)
  })

  it('falls back to initialValue when stored JSON is malformed', () => {
    localStorage.setItem('bad', 'not-valid-json{{{')
    const { result } = renderHook(() => useLocalStorage('bad', 99))
    expect(result.current[0]).toBe(99)
  })

  it('falls back to initialValue when localStorage.getItem throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    const { result } = renderHook(() => useLocalStorage('key', 'default'))
    expect(result.current[0]).toBe('default')
  })
})

// ─── setValue ─────────────────────────────────────────────────────

describe('setValue', () => {
  it('updates React state', () => {
    const { result } = renderHook(() => useLocalStorage('score', 0))

    act(() => result.current[1](100))

    expect(result.current[0]).toBe(100)
  })

  it('persists the new value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('score', 0))

    act(() => result.current[1](100))

    expect(localStorage.getItem('score')).toBe('100')
  })

  it('serialises objects to JSON', () => {
    const { result } = renderHook(() =>
      useLocalStorage('user', { name: '' }),
    )

    act(() => result.current[1]({ name: 'Hiroshi' }))

    expect(localStorage.getItem('user')).toBe(JSON.stringify({ name: 'Hiroshi' }))
  })

  it('accepts a functional updater', () => {
    localStorage.setItem('count', '3')
    const { result } = renderHook(() => useLocalStorage('count', 0))

    act(() => result.current[1]((prev) => prev + 1))

    expect(result.current[0]).toBe(4)
    expect(localStorage.getItem('count')).toBe('4')
  })

  it('functional updater receives current state as argument', () => {
    const { result } = renderHook(() =>
      useLocalStorage('items', [] as string[]),
    )

    act(() => result.current[1]((prev) => [...prev, 'a']))
    act(() => result.current[1]((prev) => [...prev, 'b']))

    expect(result.current[0]).toEqual(['a', 'b'])
  })

  it('still updates React state when localStorage.setItem throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('QuotaExceededError')
    })
    const { result } = renderHook(() => useLocalStorage('key', 0))

    act(() => result.current[1](42))

    // State must update even though persistence failed
    expect(result.current[0]).toBe(42)
  })
})

// ─── Cross-tab sync via storage event ────────────────────────────

describe('cross-tab sync (storage event)', () => {
  it('updates state when another tab writes the same key', () => {
    const { result } = renderHook(() => useLocalStorage('theme', 'light'))

    act(() => fireStorageEvent('theme', JSON.stringify('dark')))

    expect(result.current[0]).toBe('dark')
  })

  it('updates to initialValue when item is removed (newValue: null)', () => {
    localStorage.setItem('theme', JSON.stringify('dark'))
    const { result } = renderHook(() => useLocalStorage('theme', 'light'))

    act(() => fireStorageEvent('theme', null))

    expect(result.current[0]).toBe('light')
  })

  it('falls back to initialValue when the incoming value is malformed JSON', () => {
    const { result } = renderHook(() => useLocalStorage('x', 0))

    act(() => fireStorageEvent('x', '{bad json'))

    expect(result.current[0]).toBe(0)
  })

  it('ignores storage events for other keys', () => {
    const { result } = renderHook(() => useLocalStorage('a', 'original'))

    act(() => fireStorageEvent('b', JSON.stringify('changed')))

    expect(result.current[0]).toBe('original')
  })

  it('ignores storage events from sessionStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'original'))

    act(() => fireStorageEvent('key', JSON.stringify('changed'), sessionStorage))

    expect(result.current[0]).toBe('original')
  })

  it('two hook instances with the same key both sync from a cross-tab event', () => {
    const a = renderHook(() => useLocalStorage('shared', 0))
    const b = renderHook(() => useLocalStorage('shared', 0))

    act(() => fireStorageEvent('shared', JSON.stringify(99)))

    expect(a.result.current[0]).toBe(99)
    expect(b.result.current[0]).toBe(99)
  })
})

// ─── Cleanup ──────────────────────────────────────────────────────

describe('cleanup', () => {
  it('removes the storage event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useLocalStorage('key', 0))

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('storage', expect.any(Function))
  })

  it('does not update state after unmount', () => {
    const { result, unmount } = renderHook(() => useLocalStorage('key', 'old'))

    unmount()

    // Should not throw or warn
    act(() => fireStorageEvent('key', JSON.stringify('new')))

    // Value stays at whatever it was — no setState on unmounted component
    expect(result.current[0]).toBe('old')
  })
})
