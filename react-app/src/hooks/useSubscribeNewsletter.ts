import { directusPost, type NewsletterPayload } from '../lib/directus'
import { useMutation } from './useMutation'

interface SubscriberCreated {
  id: number
}

export function useSubscribeNewsletter(): {
  subscribe: (email: string) => Promise<void>
  submitting: boolean
  error: Error | null
  success: boolean
} {
  const { submit, data, submitting, error } = useMutation(
    (payload: NewsletterPayload, signal: AbortSignal) =>
      directusPost<SubscriberCreated, NewsletterPayload>(
        'newsletter_subscribers',
        payload,
        signal,
      ),
  )

  const subscribe = (email: string) =>
    submit({ email, status: 'active' })

  return { subscribe, submitting, error, success: data !== null }
}
