import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useFeaturedWhiskies, useWhiskies, useWhiskyOptions } from './useWhiskies'

// Minimal valid WhiskyApiItem shape
const RAW_WHISKY = {
  id: 1,
  name: 'Yamazaki 12',
  tagline: 'Delicate & fruity',
  age_statement: '12 Years',
  abv: '43%',
  price_gbp: 85,
  price_jpy: 15000,
  rating: 88,
  badge: 'Best Seller',
  kanji: '山崎',
  nose: 'Peach, vanilla',
  palate: 'Coconut, mizunara oak',
  finish: 'Long, spicy',
  background_css: null,
  filter_key: 'yamazaki',
  distillery: 'Yamazaki',
  flavor_profile: [{ flavor_name: 'Sweet', value: 80 }],
}

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

function mockError(status = 500) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValueOnce({
      ok: false,
      status,
      json: async () => ({}),
    } as Response),
  )
}

beforeEach(() => vi.unstubAllGlobals())
afterEach(() => vi.unstubAllGlobals())

// ─── useWhiskies ──────────────────────────────────────────────────

describe('useWhiskies', () => {
  it('returns empty array and loading:true initially', () => {
    mockOk([])
    const { result } = renderHook(() => useWhiskies())
    expect(result.current.whiskies).toEqual([])
    expect(result.current.loading).toBe(true)
  })

  it('maps raw API items to Whisky domain objects', async () => {
    mockOk([RAW_WHISKY])
    const { result } = renderHook(() => useWhiskies())
    await waitFor(() => expect(result.current.whiskies).toHaveLength(1))

    const w = result.current.whiskies[0]
    expect(w.id).toBe(1)
    expect(w.name).toBe('Yamazaki 12')
    expect(w.filter).toBe('yamazaki')
    expect(w.region).toBe('Yamazaki')
    expect(w.priceNum).toBe(85)
    expect(w.priceSub).toBe('£85 · Free UK delivery')
    expect(w.flavors).toEqual([{ name: 'Sweet', val: 80 }])
  })

  it('uses the fallback background when background_css is null', async () => {
    mockOk([{ ...RAW_WHISKY, background_css: null }])
    const { result } = renderHook(() => useWhiskies())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.whiskies[0].bg).toContain('linear-gradient')
  })

  it('returns empty flavors array when flavor_profile is null', async () => {
    mockOk([{ ...RAW_WHISKY, flavor_profile: null }])
    const { result } = renderHook(() => useWhiskies())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.whiskies[0].flavors).toEqual([])
  })

  it('sets error on API failure', async () => {
    mockError(503)
    const { result } = renderHook(() => useWhiskies())
    await waitFor(() => expect(result.current.error).not.toBeNull())
    expect(result.current.error?.message).toMatch('503')
  })

  it('sets loading false after an error', async () => {
    mockError()
    const { result } = renderHook(() => useWhiskies())
    await waitFor(() => expect(result.current.loading).toBe(false))
  })
})

// ─── useFeaturedWhiskies ──────────────────────────────────────────

describe('useFeaturedWhiskies', () => {
  it('fetches from the featured URL (includes featured=true filter)', async () => {
    const fetchSpy = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: [] }),
    } as Response)
    vi.stubGlobal('fetch', fetchSpy)

    renderHook(() => useFeaturedWhiskies())
    await waitFor(() => expect(fetchSpy).toHaveBeenCalled())

    const url: string = fetchSpy.mock.calls[0][0] as string
    expect(url).toContain('featured')
    expect(url).toContain('limit=3')
  })
})

// ─── useWhiskyOptions ─────────────────────────────────────────────

describe('useWhiskyOptions', () => {
  it('returns id+name pairs', async () => {
    const options = [
      { id: 1, name: 'Yamazaki 12' },
      { id: 2, name: 'Hibiki 17' },
    ]
    mockOk(options)
    const { result } = renderHook(() => useWhiskyOptions())
    await waitFor(() => expect(result.current.options).toHaveLength(2))
    expect(result.current.options[0]).toEqual({ id: 1, name: 'Yamazaki 12' })
  })

  it('fetches from the options URL (fields=id,name only)', async () => {
    const fetchSpy = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ data: [] }),
    } as Response)
    vi.stubGlobal('fetch', fetchSpy)

    renderHook(() => useWhiskyOptions())
    await waitFor(() => expect(fetchSpy).toHaveBeenCalled())

    const url: string = fetchSpy.mock.calls[0][0] as string
    expect(url).toContain('fields[]=id,name')
  })
})
