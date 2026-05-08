import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { NEWSLETTER_KEY, useNewsletterStatus } from './useNewsletterStatus'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  localStorage.clear()
})

describe('initial state', () => {
  it('starts as idle when nothing is stored', () => {
    const { result } = renderHook(() => useNewsletterStatus())
    expect(result.current.status).toBe('idle')
  })

  it('reads a persisted subscribed status', () => {
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify('subscribed'))
    const { result } = renderHook(() => useNewsletterStatus())
    expect(result.current.status).toBe('subscribed')
  })
})

describe('subscribe', () => {
  it('sets status to subscribed', () => {
    const { result } = renderHook(() => useNewsletterStatus())

    act(() => result.current.subscribe())

    expect(result.current.status).toBe('subscribed')
  })

  it('persists subscribed to localStorage', () => {
    const { result } = renderHook(() => useNewsletterStatus())

    act(() => result.current.subscribe())

    expect(localStorage.getItem(NEWSLETTER_KEY)).toBe('"subscribed"')
  })

  it('is idempotent when called twice', () => {
    const { result } = renderHook(() => useNewsletterStatus())

    act(() => result.current.subscribe())
    act(() => result.current.subscribe())

    expect(result.current.status).toBe('subscribed')
  })
})
