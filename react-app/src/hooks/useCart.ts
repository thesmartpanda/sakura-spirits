import useLocalStorage from './useLocalStorage'

// Mirrors the shape written by addToCart() in shop.html:
// { id, name, price: w.priceSub.split('·')[0].trim(), qty }
// e.g. price = '£85'
export interface CartItem {
  id: number
  name: string
  price: string  // formatted GBP string, e.g. '£85'
  qty: number
}

export interface UseCartReturn {
  items: CartItem[]
  totalQty: number
  totalPrice: number  // sum of parsed GBP price × qty
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
}

export const CART_KEY = 'sakura_cart'

function parsePrice(formatted: string): number {
  return parseFloat(formatted.replace(/[^0-9.]/g, '')) || 0
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useLocalStorage<CartItem[]>(CART_KEY, [])

  const totalQty = items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0,
  )

  const addItem = (newItem: Omit<CartItem, 'qty'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id)
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i,
        )
      }
      return [...prev, { ...newItem, qty: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setItems([])

  return { items, totalQty, totalPrice, addItem, removeItem, updateQty, clearCart }
}
