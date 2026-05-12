import { useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useWhiskies, useShopPrefs } from '../hooks'
import type { SortOption } from '../hooks'
import type { Whisky } from '../lib/directus'
import { PageHero } from '../components/PageHero'
import { FilterBar } from '../components/FilterBar'
import { ShopGrid } from '../components/ShopGrid'
import { TastingDrawer } from '../components/TastingDrawer'
import { CartToast } from '../components/CartToast'

export function ShopPage() {
  const { whiskies } = useWhiskies()
  const { prefs, setFilter: savePrefFilter, setSort: savePrefSort } = useShopPrefs()
  const [searchParams] = useSearchParams()

  const urlFilter = searchParams.get('filter') ?? ''
  const [filter, setFilter] = useState<string>(() => urlFilter || prefs.filter)
  const [sort, setSort] = useState<SortOption>(prefs.sort)
  const [drawerWhisky, setDrawerWhisky] = useState<Whisky | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const handleFilterChange = (f: string) => {
    setFilter(f)
    savePrefFilter(f)
  }

  const handleSortChange = (s: SortOption) => {
    setSort(s)
    savePrefSort(s)
  }

  const filtered = useMemo(() => {
    let items = filter ? whiskies.filter((w) => w.filter === filter) : [...whiskies]
    if (sort === 'price-asc') items = [...items].sort((a, b) => a.priceNum - b.priceNum)
    else if (sort === 'price-desc') items = [...items].sort((a, b) => b.priceNum - a.priceNum)
    else if (sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating)
    return items
  }, [whiskies, filter, sort])

  const handleAddToCart = useCallback(() => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2000)
  }, [])

  return (
    <>
      <PageHero
        kicker="コレクション"
        title={
          <>
            The <em>Collection</em>
          </>
        }
        toriiStyle={{ right: '2%', bottom: '-20px', width: '220px', height: '300px' }}
      />
      <FilterBar
        filter={filter}
        sort={sort}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <ShopGrid whiskies={filtered} onOpenDrawer={setDrawerWhisky} />
      <TastingDrawer
        whisky={drawerWhisky}
        onClose={() => setDrawerWhisky(null)}
        onAddToCart={handleAddToCart}
      />
      <CartToast visible={toastVisible} />
    </>
  )
}
