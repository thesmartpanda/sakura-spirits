import { act, render, renderHook, screen } from '@testing-library/react'
import { type ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { CART_KEY } from '../hooks/useCart'
import { CartProvider, useCartContext } from './CartContext'

beforeEach(() => localStorage.clear())
afterEach(() => localStorage.clear())

// ─── Wrapper helpers ──────────────────────────────────────────────

function wrapper({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}

function renderCart() {
  return renderHook(() => useCartContext(), { wrapper })
}

// ─── useCartContext throws outside provider ────────────────────────

describe('useCartContext guard', () => {
  it('throws when used outside CartProvider', () => {
    // Suppress the React error boundary console noise
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useCartContext())).toThrow(
      'useCartContext must be used within CartProvider',
    )
    spy.mockRestore()
  })
})

// ─── Initial state ────────────────────────────────────────────────

describe('initial state', () => {
  it('provides an empty cart by default', () => {
    const { result } = renderCart()
    expect(result.current.items).toEqual([])
    expect(result.current.totalQty).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('reads a pre-existing cart from localStorage', () => {
    const stored = [{ id: 1, name: 'Yamazaki', price: '£85', qty: 3 }]
    localStorage.setItem(CART_KEY, JSON.stringify(stored))
    const { result } = renderCart()
    expect(result.current.items).toEqual(stored)
    expect(result.current.totalQty).toBe(3)
  })
})

// ─── Cart operations through context ─────────────────────────────

describe('addItem', () => {
  it('adds an item via context', () => {
    const { result } = renderCart()
    act(() => result.current.addItem({ id: 1, name: 'Hibiki', price: '£120' }))
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].qty).toBe(1)
  })
})

describe('removeItem', () => {
  it('removes an item via context', () => {
    const { result } = renderCart()
    act(() => result.current.addItem({ id: 1, name: 'Hibiki', price: '£120' }))
    act(() => result.current.removeItem(1))
    expect(result.current.items).toEqual([])
  })
})

describe('updateQty', () => {
  it('updates quantity via context', () => {
    const { result } = renderCart()
    act(() => result.current.addItem({ id: 1, name: 'Hibiki', price: '£120' }))
    act(() => result.current.updateQty(1, 4))
    expect(result.current.items[0].qty).toBe(4)
  })
})

describe('clearCart', () => {
  it('empties the cart via context', () => {
    const { result } = renderCart()
    act(() => result.current.addItem({ id: 1, name: 'Hibiki', price: '£120' }))
    act(() => result.current.clearCart())
    expect(result.current.items).toEqual([])
  })
})

// ─── Shared state across consumers ───────────────────────────────

describe('shared state', () => {
  it('two consumers in the same tree see the same cart', () => {
    function Consumer({ label }: { label: string }) {
      const { totalQty } = useCartContext()
      return <span data-testid={label}>{totalQty}</span>
    }

    function Adder() {
      const { addItem } = useCartContext()
      return (
        <button onClick={() => addItem({ id: 1, name: 'X', price: '£10' })}>
          add
        </button>
      )
    }

    render(
      <CartProvider>
        <Consumer label="a" />
        <Consumer label="b" />
        <Adder />
      </CartProvider>,
    )

    expect(screen.getByTestId('a').textContent).toBe('0')
    expect(screen.getByTestId('b').textContent).toBe('0')

    act(() => screen.getByRole('button').click())

    expect(screen.getByTestId('a').textContent).toBe('1')
    expect(screen.getByTestId('b').textContent).toBe('1')
  })
})
