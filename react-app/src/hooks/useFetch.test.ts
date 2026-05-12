import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFetch } from './useFetch'

// ─── Helpers ──────────────────────────────────────────────────────

function mockOk(data: unknown) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data }),
    } as Response),
  )
}

function mockStatus(status: number) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValueOnce({
      ok: false,
      status,
      json: async () => ({}),
    } as Response),
  )
}

function mockNetworkError(message = 'Network error') {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error(message)))
}

function mockNeverResolves(onSignal?: (s: AbortSignal) => void) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
      if (onSignal && init?.signal) onSignal(init.signal as AbortSignal)
      return new Promise(() => {}) // intentionally never resolves
    }),
  )
}

beforeEach(() => vi.unstubAllGlobals())
afterEach(() => vi.unstubAllGlobals())

// ─── Initial loading state ────────────────────────────────────────

describe('loading — initial state', () => {
  it('is true immediately when a path is provided', () => {
    mockOk([])
    const { result } = renderHook(() => useFetch('/items/test'))
    expect(result.current.loading).toBe(true)
  })

  it('is false immediately when path is null', () => {
    const { result } = renderHook(() => useFetch<unknown>(null))
    expect(result.current.loading).toBe(false)
  })

  it('data and error are null initially', () => {
    mockOk([])
    const { result } = renderHook(() => useFetch('/items/test'))
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })
})

// ─── Successful fetch ─────────────────────────────────────────────

describe('successful fetch', () => {
  it('populates data after fetch resolves', async () => {
    const items = [{ id: 1, name: 'Yamazaki' }]
    mockOk(items)
    const { result } = renderHook(() => useFetch<typeof items>('/items/test'))
    await waitFor(() => expect(result.current.data).toEqual(items))
  })

  it('sets loading to false after fetch resolves', async () => {
    mockOk([])
    const { result } = renderHook(() => useFetch('/items/test'))
    await waitFor(() => expect(result.current.loading).toBe(false))
  })

  it('leaves error as null on success', async () => {
    mockOk([])
    const { result } = renderHook(() => useFetch('/items/test'))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBeNull()
  })
})

// ─── HTTP error ───────────────────────────────────────────────────

describe('HTTP error (non-ok status)', () => {
  it('sets error with status code when API returns 404', async () => {
    mockStatus(404)
    const { result } = renderHook(() => useFetch('/items/missing'))
    await waitFor(() => expect(result.current.error).not.toBeNull())
    expect(result.current.error?.message).toMatch('404')
  })

  it('sets error when API returns 500', async () => {
    mockStatus(500)
    const { result } = renderHook(() => useFetch('/items/broken'))
    await waitFor(() => expect(result.current.error).not.toBeNull())
    expect(result.current.error?.message).toMatch('500')
  })

  it('sets loading to false after an HTTP error', async () => {
    mockStatus(503)
    const { result } = renderHook(() => useFetch('/items/test'))
    await waitFor(() => expect(result.current.loading).toBe(false))
  })
})

// ─── Network error ────────────────────────────────────────────────

describe('network error', () => {
  it('sets error when fetch rejects', async () => {
    mockNetworkError('Connection refused')
    const { result } = renderHook(() => useFetch('/items/test'))
    await waitFor(() => expect(result.current.error?.message).toBe('Connection refused'))
  })

  it('sets loading to false after a network error', async () => {
    mockNetworkError()
    const { result } = renderHook(() => useFetch('/items/test'))
    await waitFor(() => expect(result.current.loading).toBe(false))
  })
})

// ─── Null path ────────────────────────────────────────────────────

describe('null path', () => {
  it('does not call fetch', () => {
    const spy = vi.fn()
    vi.stubGlobal('fetch', spy)
    renderHook(() => useFetch<unknown>(null))
    expect(spy).not.toHaveBeenCalled()
  })

  it('resets to idle state when path switches from a value to null', async () => {
    mockOk([1, 2, 3])
    const { result, rerender } = renderHook(({ path }) => useFetch<number[]>(path), {
      initialProps: { path: '/items/test' as string | null },
    })
    await waitFor(() => expect(result.current.data).toEqual([1, 2, 3]))

    rerender({ path: null })
    await waitFor(() => {
      expect(result.current.data).toBeNull()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })
})

// ─── Abort on unmount ─────────────────────────────────────────────

describe('abort on unmount', () => {
  it('aborts the in-flight request when the component unmounts', () => {
    let capturedSignal: AbortSignal | undefined
    mockNeverResolves((signal) => { capturedSignal = signal })

    const { unmount } = renderHook(() => useFetch('/items/test'))
    unmount()

    expect(capturedSignal?.aborted).toBe(true)
  })

  it('does not report AbortError as an error state', async () => {
    // Simulate the real scenario: fetch rejects with AbortError when the signal fires
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
        return new Promise((_resolve, reject) => {
          const signal = init?.signal as AbortSignal | undefined
          signal?.addEventListener('abort', () =>
            reject(Object.assign(new Error('Aborted'), { name: 'AbortError' })),
          )
        })
      }),
    )

    const { result, unmount } = renderHook(() => useFetch('/items/test'))
    expect(result.current.loading).toBe(true)

    unmount() // triggers controller.abort() → AbortError thrown in fetch

    // Give the microtask queue time to settle
    await new Promise((r) => setTimeout(r, 50))
    expect(result.current.error).toBeNull()
  })
})

// ─── Path changes ─────────────────────────────────────────────────

describe('path changes', () => {
  it('re-fetches when the path prop changes', async () => {
    mockOk([{ id: 1 }])
    const { result, rerender } = renderHook(
      ({ path }) => useFetch<{ id: number }[]>(path),
      { initialProps: { path: '/items/a' } },
    )
    await waitFor(() => expect(result.current.data).toEqual([{ id: 1 }]))

    mockOk([{ id: 2 }])
    rerender({ path: '/items/b' })
    await waitFor(() => expect(result.current.data).toEqual([{ id: 2 }]))
  })

  it('resets to loading when the path changes', async () => {
    mockOk([])
    const { result, rerender } = renderHook(
      ({ path }) => useFetch<unknown[]>(path),
      { initialProps: { path: '/items/a' } },
    )
    await waitFor(() => expect(result.current.loading).toBe(false))

    mockNeverResolves()
    rerender({ path: '/items/b' })
    expect(result.current.loading).toBe(true)
  })
})
