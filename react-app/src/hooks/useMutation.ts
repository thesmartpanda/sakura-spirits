import { useCallback, useEffect, useRef, useState } from 'react'

export interface MutationState<TData> {
  data: TData | null
  submitting: boolean
  error: Error | null
}

type MutationFn<TData, TPayload> = (
  payload: TPayload,
  signal: AbortSignal,
) => Promise<TData>

/**
 * Generic mutation hook for POST/PATCH/DELETE operations.
 * - Errors are captured in `error` state (not thrown) so callers don't need try/catch.
 * - Aborts the in-flight request on unmount to prevent state updates after teardown.
 */
export function useMutation<TData, TPayload>(
  mutationFn: MutationFn<TData, TPayload>,
): {
  submit: (payload: TPayload) => Promise<void>
  data: TData | null
  submitting: boolean
  error: Error | null
} {
  const [data, setData] = useState<TData | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Always call the latest version of the function without re-creating submit
  const fnRef = useRef(mutationFn)
  fnRef.current = mutationFn

  // Holds the controller for the current in-flight request
  const controllerRef = useRef<AbortController | null>(null)

  // Abort on unmount
  useEffect(() => {
    return () => controllerRef.current?.abort()
  }, [])

  const submit = useCallback(async (payload: TPayload) => {
    // Cancel any previous in-flight request before starting a new one
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setSubmitting(true)
    setError(null)

    try {
      const result = await fnRef.current(payload, controller.signal)
      if (!controller.signal.aborted) {
        setData(result)
        setSubmitting(false)
      }
    } catch (err: unknown) {
      if (controller.signal.aborted) return
      setError(err instanceof Error ? err : new Error(String(err)))
      setSubmitting(false)
    }
  }, [])

  return { submit, data, submitting, error }
}
