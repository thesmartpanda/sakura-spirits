import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CART_KEY, useCart } from './useCart'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

// ─── Initial state ────────────────────────────────────────────────

describe('initial state', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.items).toEqual([])
  })

  it('starts with totalQty 0', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.totalQty).toBe(0)
  })

  it('starts with totalPrice 0', () => {
    const { result } = renderHook(() => useCart())
    expect(result.current.totalPrice).toBe(0)
  })

  it('reads a pre-existing cart from localStorage', () => {
    const stored = [{ id: 1, name: 'Yamazaki 12', price: '£85', qty: 2 }]
    localStorage.setItem(CART_KEY, JSON.stringify(stored))
    const { result } = renderHook(() => useCart())
    expect(result.current.items).toEqual(stored)
  })
})

// ─── addItem ──────────────────────────────────────────────────────

describe('addItem', () => {
  it('adds a new item with qty 1', () => {
    const { result } = renderHook(() => useCart())

    act(() => result.current.addItem({ id: 1, name: 'Hakushu', price: '£95' }))

    expect(result.current.items).toEqual([
      { id: 1, name: 'Hakushu', price: '£95', qty: 1 },
    ])
  })

  it('increments qty when the same item is added again', () => {
    const { result } = renderHook(() => useCart())

    act(() => result.current.addItem({ id: 1, name: 'Hakushu', price: '£95' }))
    act(() => result.current.addItem({ id: 1, name: 'Hakushu', price: '£95' }))

    expect(result.current.items[0].qty).toBe(2)
    expect(result.current.items).toHaveLength(1)
  })

  it('adds multiple distinct items', () => {
    const { result } = renderHook(() => useCart())

    act(() => result.current.addItem({ id: 1, name: 'Yamazaki', price: '£85' }))
    act(() => result.current.addItem({ id: 2, name: 'Hibiki', price: '£120' }))

    expect(result.current.items).toHaveLength(2)
  })

  it('persists the new item to localStorage', () => {
    const { result } = renderHook(() => useCart())

    act(() => result.current.addItem({ id: 1, name: 'Yamazaki', price: '£85' }))

    const stored = JSON.parse(localStorage.getItem(CART_KEY)!)
    expect(stored).toEqual([{ id: 1, name: 'Yamazaki', price: '£85', qty: 1 }])
  })
})

// ─── Derived values ───────────────────────────────────────────────

describe('totalQty', () => {
  it('sums qty across all items', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem({ id: 1, name: 'Yamazaki', price: '£85' }))
    act(() => result.current.addItem({ id: 1, name: 'Yamazaki', price: '£85' }))
    act(() => result.current.addItem({ id: 2, name: 'Hibiki', price: '£120' }))

    expect(result.current.totalQty).toBe(3)
  })
})

describe('totalPrice', () => {
  it('sums price × qty for all items', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem({ id: 1, name: 'Yamazaki', price: '£85' }))
    act(() => result.current.addItem({ id: 1, name: 'Yamazaki', price: '£85' }))
    act(() => result.current.addItem({ id: 2, name: 'Hibiki', price: '£120' }))

    // 2 × 85 + 1 × 120 = 290
    expect(result.current.totalPrice).toBe(290)
  })

  it('strips currency symbols when parsing price', () => {
    const { result } = renderHook(() => useCart())
    act(() => result.current.addItem({ id: 1, name: 'Test', price: '£42.50' }))

    expect(result.current.totalPrice).toBe(42.5)
  })

  it('returns 0 for unrecognised price formats', () => {
    const { result } = renderHook(() => useCart())
    act(() =>
      result.current.addItem({ id: 1, name: 'Test', price: 'N/A' }),
    )

    expect(result.current.totalPrice).toBe(0)
  })
})
