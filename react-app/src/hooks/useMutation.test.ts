import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useMutation } from './useMutation'

afterEach(() => vi.restoreAllMocks())

// ─── Helpers ──────────────────────────────────────────────────────

type Payload = { value: string }
type Response = { id: number }

function makeHook(fn = vi.fn<(payload: Payload, signal: AbortSignal) => Promise<Response>>()) {
  return { fn, hook: renderHook(() => useMutation<Response, Payload>(fn)) }
}

// ─── Initial state ────────────────────────────────────────────────

describe('initial state', () => {
  it('is not submitting initially', () => {
    const { hook } = makeHook()
    expect(hook.result.current.submitting).toBe(false)
  })

  it('data is null initially', () => {
    const { hook } = makeHook()
    expect(hook.result.current.data).toBeNull()
  })

  it('error is null initially', () => {
    const { hook } = makeHook()
    expect(hook.result.current.error).toBeNull()
  })
})

// ─── Successful mutation ──────────────────────────────────────────

describe('successful mutation', () => {
  it('calls the mutation function with the payload', async () => {
    const fn = vi.fn().mockResolvedValueOnce({ id: 1 })
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'hello' }))

    expect(fn).toHaveBeenCalledWith({ value: 'hello' }, expect.any(AbortSignal))
  })

  it('sets data after success', async () => {
    const fn = vi.fn().mockResolvedValueOnce({ id: 42 })
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))

    expect(hook.result.current.data).toEqual({ id: 42 })
  })

  it('sets submitting to false after success', async () => {
    const fn = vi.fn().mockResolvedValueOnce({ id: 1 })
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))

    expect(hook.result.current.submitting).toBe(false)
  })

  it('leaves error as null on success', async () => {
    const fn = vi.fn().mockResolvedValueOnce({ id: 1 })
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))

    expect(hook.result.current.error).toBeNull()
  })
})

// ─── Failed mutation ──────────────────────────────────────────────

describe('failed mutation', () => {
  it('sets error on rejection', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('Server error'))
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))

    expect(hook.result.current.error?.message).toBe('Server error')
  })

  it('sets submitting to false after failure', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('fail'))
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))

    expect(hook.result.current.submitting).toBe(false)
  })

  it('clears previous error when a new submission starts', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('first error'))
      .mockResolvedValueOnce({ id: 1 })
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))
    expect(hook.result.current.error).not.toBeNull()

    await act(() => hook.result.current.submit({ value: 'y' }))
    expect(hook.result.current.error).toBeNull()
  })
})

// ─── Submitting state ─────────────────────────────────────────────

describe('submitting state', () => {
  it('is true while the request is in-flight', async () => {
    let resolveRequest!: (v: Response) => void
    const fn = vi.fn().mockReturnValueOnce(
      new Promise<Response>((res) => { resolveRequest = res }),
    )
    const { hook } = makeHook(fn)

    act(() => void hook.result.current.submit({ value: 'x' }))
    expect(hook.result.current.submitting).toBe(true)

    await act(async () => resolveRequest({ id: 1 }))
    expect(hook.result.current.submitting).toBe(false)
  })
})

// ─── Abort on unmount ─────────────────────────────────────────────

describe('abort on unmount', () => {
  it('passes an AbortSignal to the mutation function', async () => {
    const fn = vi.fn().mockResolvedValueOnce({ id: 1 })
    const { hook } = makeHook(fn)

    await act(() => hook.result.current.submit({ value: 'x' }))

    const [, signal] = fn.mock.calls[0]
    expect(signal).toBeInstanceOf(AbortSignal)
  })

  it('aborts the signal when the component unmounts mid-request', () => {
    let capturedSignal: AbortSignal | undefined
    const fn = vi.fn().mockImplementation((_p: Payload, signal: AbortSignal) => {
      capturedSignal = signal
      return new Promise<Response>(() => {}) // never resolves
    })
    const { hook } = makeHook(fn)

    act(() => void hook.result.current.submit({ value: 'x' }))
    hook.unmount()

    expect(capturedSignal?.aborted).toBe(true)
  })

  it('does not set error state when aborted by unmount', async () => {
    const fn = vi.fn().mockImplementation((_p: Payload, signal: AbortSignal) => {
      return new Promise<Response>((_resolve, reject) => {
        signal.addEventListener('abort', () =>
          reject(Object.assign(new Error('AbortError'), { name: 'AbortError' })),
        )
      })
    })
    const { hook } = makeHook(fn)

    act(() => void hook.result.current.submit({ value: 'x' }))
    hook.unmount()

    // After unmount, error should not have been set
    await waitFor(() => expect(hook.result.current.error).toBeNull())
  })
})
