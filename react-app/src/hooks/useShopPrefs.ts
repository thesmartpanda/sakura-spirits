import useLocalStorage from './useLocalStorage'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

export interface ShopPrefs {
  sort: SortOption
  filter: string
}

export const SHOP_PREFS_KEY = 'sakura_shop_prefs'

export const DEFAULT_PREFS: ShopPrefs = {
  sort: 'featured',
  filter: '',
}

export interface UseShopPrefsReturn {
  prefs: ShopPrefs
  setSort: (sort: SortOption) => void
  setFilter: (filter: string) => void
  resetPrefs: () => void
}

export function useShopPrefs(): UseShopPrefsReturn {
  const [prefs, setPrefs] = useLocalStorage<ShopPrefs>(SHOP_PREFS_KEY, DEFAULT_PREFS)

  const setSort = (sort: SortOption) => setPrefs((prev) => ({ ...prev, sort }))
  const setFilter = (filter: string) => setPrefs((prev) => ({ ...prev, filter }))
  const resetPrefs = () => setPrefs(DEFAULT_PREFS)

  return { prefs, setSort, setFilter, resetPrefs }
}
