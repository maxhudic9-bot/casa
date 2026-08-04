"use client"

import * as React from "react"

import type { CartLine, MenuItem } from "@/lib/types"

interface CartState {
  lines: CartLine[]
}

type CartAction =
  | { type: "add"; item: MenuItem }
  | { type: "remove"; id: string }
  | { type: "setQuantity"; id: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => l.item.id === action.item.id)
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.item.id === action.item.id
              ? { ...l, quantity: l.quantity + 1 }
              : l
          ),
        }
      }
      return { lines: [...state.lines, { item: action.item, quantity: 1 }] }
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.item.id !== action.id) }
    case "setQuantity": {
      if (action.quantity <= 0) {
        return { lines: state.lines.filter((l) => l.item.id !== action.id) }
      }
      return {
        lines: state.lines.map((l) =>
          l.item.id === action.id ? { ...l, quantity: action.quantity } : l
        ),
      }
    }
    case "clear":
      return { lines: [] }
    case "hydrate":
      return { lines: action.lines }
    default:
      return state
  }
}

interface CartContextValue {
  lines: CartLine[]
  addItem: (item: MenuItem) => void
  removeItem: (id: string) => void
  setQuantity: (id: string, quantity: number) => void
  clear: () => void
  subtotal: number
  itemCount: number
}

const CartContext = React.createContext<CartContextValue | null>(null)

const STORAGE_KEY = "casa-ribelle-cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, { lines: [] })
  const hydrated = React.useRef(false)

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const lines = JSON.parse(raw) as CartLine[]
        dispatch({ type: "hydrate", lines })
      }
    } catch {
      // Ungueltiger/leerer Storage-Inhalt: mit leerem Warenkorb starten
    } finally {
      hydrated.current = true
    }
  }, [])

  React.useEffect(() => {
    if (!hydrated.current) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines))
  }, [state.lines])

  const subtotal = state.lines.reduce(
    (sum, l) => sum + l.item.price * l.quantity,
    0
  )
  const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0)

  const value: CartContextValue = {
    lines: state.lines,
    addItem: (item) => dispatch({ type: "add", item }),
    removeItem: (id) => dispatch({ type: "remove", id }),
    setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
    clear: () => dispatch({ type: "clear" }),
    subtotal,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart muss innerhalb von CartProvider verwendet werden")
  return ctx
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}
