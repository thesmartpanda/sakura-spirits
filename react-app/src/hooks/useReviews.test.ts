import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useReviews } from './useReviews'

const RAW_REVIEW = {
  id: 7,
  score: 92,
  stars: 5,
  badge: 'Editor\'s Pick',
  nose: 'Peach, apricot',
  palate: 'Honey, spice',
  finish: 'Long, warming',
  verdict: 'Exceptional balance.',
  author_name: 'Kenji Tanaka',
  author_initials: 'KT',
  review_date: '2024-03-15',
  whisky_id: {
    id: 1,
    name: 'Yamazaki 18',
    distillery: 'Yamazaki',
    age_statement: '18 Years',
    abv: '43%',
  },
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

describe('useReviews', () => {
  it('returns empty array and loading:true initially', () => {
    mockOk([])
    const { result } = renderHook(() => useReviews())
    expect(result.current.reviews).toEqual([])
    expect(result.current.loading).toBe(true)
  })

  it('maps raw API items to Review domain objects', async () => {
    mockOk([RAW_REVIEW])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.reviews).toHaveLength(1))

    const r = result.current.reviews[0]
    expect(r.id).toBe(7)
    expect(r.score).toBe(92)
    expect(r.author).toBe('Kenji Tanaka')
    expect(r.initials).toBe('KT')
    expect(r.distillery).toBe('Yamazaki')
    expect(r.name).toBe('Yamazaki 18')
    expect(r.shopId).toBe(1)
    expect(r.verdict).toBe('Exceptional balance.')
  })

  it('formats the review date as Month Year', async () => {
    mockOk([RAW_REVIEW])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    // toLocaleDateString with 'en-GB' → 'March 2024'
    expect(result.current.reviews[0].date).toMatch(/March 2024/)
  })

  it('returns empty date string when review_date is null', async () => {
    mockOk([{ ...RAW_REVIEW, review_date: null }])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reviews[0].date).toBe('')
  })

  it('assigns correct scoreColor for score >= 95 (gold)', async () => {
    mockOk([{ ...RAW_REVIEW, score: 95 }])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reviews[0].scoreColor).toBe('#c8922a')
  })

  it('assigns correct scoreColor for score 90–94 (light gold)', async () => {
    mockOk([{ ...RAW_REVIEW, score: 92 }])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reviews[0].scoreColor).toBe('#e0b86a')
  })

  it('assigns correct scoreColor for score 85–89 (blue)', async () => {
    mockOk([{ ...RAW_REVIEW, score: 85 }])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reviews[0].scoreColor).toBe('#6b8cba')
  })

  it('assigns correct scoreColor for score < 85 (muted green)', async () => {
    mockOk([{ ...RAW_REVIEW, score: 70 }])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.reviews[0].scoreColor).toBe('#8aaa78')
  })

  it('handles null whisky_id gracefully', async () => {
    mockOk([{ ...RAW_REVIEW, whisky_id: null }])
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.loading).toBe(false))
    const r = result.current.reviews[0]
    expect(r.distillery).toBe('')
    expect(r.name).toBe('')
    expect(r.shopId).toBeUndefined()
  })

  it('sets error on API failure', async () => {
    mockError(404)
    const { result } = renderHook(() => useReviews())
    await waitFor(() => expect(result.current.error?.message).toMatch('404'))
  })
})
