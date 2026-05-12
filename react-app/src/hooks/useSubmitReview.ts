import { directusPost, type ReviewPayload } from '../lib/directus'
import { useMutation } from './useMutation'

interface ReviewCreated {
  id: number
}

export function useSubmitReview(): {
  submitReview: (payload: ReviewPayload) => Promise<void>
  submitting: boolean
  error: Error | null
  success: boolean
} {
  const { submit, data, submitting, error } = useMutation(
    (payload: ReviewPayload, signal: AbortSignal) =>
      directusPost<ReviewCreated, ReviewPayload>('reviews', payload, signal),
  )
  return { submitReview: submit, submitting, error, success: data !== null }
}
