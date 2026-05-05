import { directusPost, type ContactPayload } from '../lib/directus'
import { useMutation } from './useMutation'

interface ContactCreated {
  id: number
}

export function useSubmitContact(): {
  submitContact: (payload: ContactPayload) => Promise<void>
  submitting: boolean
  error: Error | null
  success: boolean
} {
  const { submit, data, submitting, error } = useMutation(
    (payload: ContactPayload, signal: AbortSignal) =>
      directusPost<ContactCreated, ContactPayload>(
        'contact_submissions',
        payload,
        signal,
      ),
  )
  return { submitContact: submit, submitting, error, success: data !== null }
}
