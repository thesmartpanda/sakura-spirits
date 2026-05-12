import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSubmitReview } from './useSubmitReview'

vi.mock('../lib/directus', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../lib/directus')>()
  return { ...actual, directusPost: vi.fn() }
})

const VALID_PAYLOAD = {
  author_name: 'Kenji Tanaka',
  author_initials: 'KT',
  whisky_id: 1,
  stars: 4,
  score: 80,
  verdict: 'Excellent.',
  review_date: '2024-03-15',
  status: 'draft' as const,
}

async function getDirectusPost() {
  const mod = await import('../lib/directus')
  return vi.mocked(mod.directusPost)
}

beforeEach(async () => {
  const dp = await getDirectusPost()
  dp.mockReset()
})

describe('initial state', () => {
  it('is not submitting', () => {
    const { result } = renderHook(() => useSubmitReview())
    expect(result.current.submitting).toBe(false)
  })

  it('success is false', () => {
    const { result } = renderHook(() => useSubmitReview())
    expect(result.current.success).toBe(false)
  })

  it('error is null', () => {
    const { result } = renderHook(() => useSubmitReview())
    expect(result.current.error).toBeNull()
  })
})

describe('successful submission', () => {
  it('sets success to true after submission', async () => {
    const dp = await getDirectusPost()
    dp.mockResolvedValueOnce({ id: 1 })

    const { result } = renderHook(() => useSubmitReview())
    await act(() => result.current.submitReview(VALID_PAYLOAD))

    expect(result.current.success).toBe(true)
  })

  it('sets submitting to false after success', async () => {
    const dp = await getDirectusPost()
    dp.mockResolvedValueOnce({ id: 1 })

    const { result } = renderHook(() => useSubmitReview())
    await act(() => result.current.submitReview(VALID_PAYLOAD))

    expect(result.current.submitting).toBe(false)
  })

  it('calls directusPost with the reviews collection', async () => {
    const dp = await getDirectusPost()
    dp.mockResolvedValueOnce({ id: 1 })

    const { result } = renderHook(() => useSubmitReview())
    await act(() => result.current.submitReview(VALID_PAYLOAD))

    expect(dp).toHaveBeenCalledWith('reviews', VALID_PAYLOAD, expect.any(AbortSignal))
  })
})

describe('failed submission', () => {
  it('sets error on API failure', async () => {
    const dp = await getDirectusPost()
    dp.mockRejectedValueOnce(new Error('Directus 400'))

    const { result } = renderHook(() => useSubmitReview())
    await act(() => result.current.submitReview(VALID_PAYLOAD))

    await waitFor(() => expect(result.current.error?.message).toBe('Directus 400'))
  })

  it('success remains false after failure', async () => {
    const dp = await getDirectusPost()
    dp.mockRejectedValueOnce(new Error('fail'))

    const { result } = renderHook(() => useSubmitReview())
    await act(() => result.current.submitReview(VALID_PAYLOAD))

    expect(result.current.success).toBe(false)
  })
})
