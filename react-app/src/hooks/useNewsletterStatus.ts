import useLocalStorage from './useLocalStorage'

export type NewsletterStatus = 'idle' | 'subscribed'

export const NEWSLETTER_KEY = 'sakura_newsletter'

export interface UseNewsletterStatusReturn {
  status: NewsletterStatus
  subscribe: () => void
  reset: () => void
}

export function useNewsletterStatus(): UseNewsletterStatusReturn {
  const [status, setStatus] = useLocalStorage<NewsletterStatus>(NEWSLETTER_KEY, 'idle')

  const subscribe = () => setStatus('subscribed')
  const reset = () => setStatus('idle')

  return { status, subscribe, reset }
}
