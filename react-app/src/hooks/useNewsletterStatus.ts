import useLocalStorage from './useLocalStorage'

export type NewsletterStatus = 'idle' | 'subscribed'

export const NEWSLETTER_KEY = 'sakura_newsletter'

export interface UseNewsletterStatusReturn {
  status: NewsletterStatus
  subscribe: () => void
}

export function useNewsletterStatus(): UseNewsletterStatusReturn {
  const [status, setStatus] = useLocalStorage<NewsletterStatus>(NEWSLETTER_KEY, 'idle')

  const subscribe = () => setStatus('subscribed')

  return { status, subscribe }
}
