// localStorage hooks
export { default as useLocalStorage } from './useLocalStorage'
export { useCart } from './useCart'
export { useShopPrefs } from './useShopPrefs'
export { useNewsletterStatus } from './useNewsletterStatus'

// Base fetch primitives
export { useFetch } from './useFetch'
export { useMutation } from './useMutation'

// Query hooks
export { useFeaturedWhiskies, useWhiskies, useWhiskyOptions } from './useWhiskies'
export { useRegions } from './useRegions'
export { useReviews } from './useReviews'
export { useTeamMembers } from './useTeamMembers'
export { useFaqs } from './useFaqs'

// Mutation hooks
export { useSubmitReview } from './useSubmitReview'
export { useSubscribeNewsletter } from './useSubscribeNewsletter'
export { useSubmitContact } from './useSubmitContact'

// Types
export type { CartItem, UseCartReturn } from './useCart'
export type { ShopPrefs, SortOption, UseShopPrefsReturn } from './useShopPrefs'
export type { NewsletterStatus, UseNewsletterStatusReturn } from './useNewsletterStatus'
export type { FetchState } from './useFetch'
export type { WhiskyOption } from './useWhiskies'
