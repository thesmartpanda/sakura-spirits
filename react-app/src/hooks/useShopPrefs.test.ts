import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_PREFS, SHOP_PREFS_KEY, useShopPrefs } from './useShopPrefs'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

describe('initial state', () => {
  it('returns default prefs when nothing is stored', () => {
    const { result } = renderHook(() => useShopPrefs())
    expect(result.current.prefs).toEqual({ sort: 'featured', filter: '' })
  })

  it('reads persisted prefs from localStorage', () => {
    const stored = { sort: 'price-asc', filter: 'single-malt' }
    localStorage.setItem(SHOP_PREFS_KEY, JSON.stringify(stored))
    const { result } = renderHook(() => useShopPrefs())
    expect(result.current.prefs).toEqual(stored)
  })
})

describe('setSort', () => {
  it('updates the sort option', () => {
    const { result } = renderHook(() => useShopPrefs())

    act(() => result.current.setSort('price-desc'))

    expect(result.current.prefs.sort).toBe('price-desc')
  })

  it('preserves the existing filter when changing sort', () => {
    const { result } = renderHook(() => useShopPrefs())
    act(() => result.current.setFilter('blended'))

    act(() => result.current.setSort('rating'))

    expect(result.current.prefs.filter).toBe('blended')
  })

  it('persists the new sort to localStorage', () => {
    const { result } = renderHook(() => useShopPrefs())

    act(() => result.current.setSort('price-asc'))

    const stored = JSON.parse(localStorage.getItem(SHOP_PREFS_KEY)!)
    expect(stored.sort).toBe('price-asc')
  })
})

describe('setFilter', () => {
  it('updates the filter string', () => {
    const { result } = renderHook(() => useShopPrefs())

    act(() => result.current.setFilter('single-malt'))

    expect(result.current.prefs.filter).toBe('single-malt')
  })

  it('preserves the existing sort when changing filter', () => {
    const { result } = renderHook(() => useShopPrefs())
    act(() => result.current.setSort('rating'))

    act(() => result.current.setFilter('blended'))

    expect(result.current.prefs.sort).toBe('rating')
  })

  it('accepts an empty string to clear the filter', () => {
    const { result } = renderHook(() => useShopPrefs())
    act(() => result.current.setFilter('blended'))

    act(() => result.current.setFilter(''))

    expect(result.current.prefs.filter).toBe('')
  })
})

describe('resetPrefs', () => {
  it('resets all prefs to defaults', () => {
    const { result } = renderHook(() => useShopPrefs())
    act(() => result.current.setSort('price-asc'))
    act(() => result.current.setFilter('blended'))

    act(() => result.current.resetPrefs())

    expect(result.current.prefs).toEqual(DEFAULT_PREFS)
  })

  it('persists the reset to localStorage', () => {
    const { result } = renderHook(() => useShopPrefs())
    act(() => result.current.setSort('rating'))

    act(() => result.current.resetPrefs())

    const stored = JSON.parse(localStorage.getItem(SHOP_PREFS_KEY)!)
    expect(stored).toEqual(DEFAULT_PREFS)
  })
})
