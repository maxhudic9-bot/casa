"use client"

import * as React from "react"

import type { CartLine, MenuAddOn, MenuItem } from "@/lib/types"

interface CartState {
  lines: CartLine[]
}

type CartAction =
  | { type: "add"; item: MenuItem; selectedAddOns: MenuAddOn[] }
  | { type: "remove"; key: string }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] }

/** Eindeutiger Schluessel pro Warenkorb-Zeile: Gericht + gewaehlte Extras. */
export function lineKey(itemId: string, addOns: MenuAddOn[]): string {
  const addOnIds = addOns.map((a) => a.id).sort().join(",")
  return `${itemId}::${addOnIds}`
}

export function lineUnitPrice(line: CartLine): number {
  return (
    line.item.price + line.selectedAddOns.reduce((sum, a) => sum + a.price, 0)
  )
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.item.id, action.selectedAddOns)
      const existing = state.lines.find(
        (l) => lineKey(l.item.id, l.selectedAddOns) === key
      )
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            lineKey(l.item.id, l.selectedAddOns) === key
              ? { ...l, quantity: l.quantity + 1 }
              : l
          ),
        }
      }
      return {
        lines: [
          ...state.lines,
          { item: action.item, quantity: 1, selectedAddOns: action.selectedAddOns },
        ],
      }
    }
    case "remove":
      return {
        lines: state.lines.filter(
          (l) => lineKey(l.item.id, l.selectedAddOns) !== action.key
        ),
      }
    case "setQuantity": {
      if (action.quantity <= 0) {
        return {
          lines: state.lines.filter(
            (l) => lineKey(l.item.id, l.selectedAddOns) !== action.key
          ),
        }
      }
      return {
        lines: state.lines.map((l) =>
          lineKey(l.item.id, l.selectedAddOns) === action.key
            ? { ...l, quantity: action.quantity }
            : l
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
  addItem: (item: MenuItem, selectedAddOns?: MenuAddOn[]) => void
  removeItem: (key: string) => void
  setQuantity: (key: string, quantity: number) => void
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
        const lines = (JSON.parse(raw) as CartLine[]).map((l) => ({
          ...l,
          selectedAddOns: l.selectedAddOns ?? [],
        }))
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
    (sum, l) => sum + lineUnitPrice(l) * l.quantity,
    0
  )
  const itemCount = state.lines.reduce((sum, l) => sum + l.quantity, 0)

  const value: CartContextValue = {
    lines: state.lines,
    addItem: (item, selectedAddOns = []) =>
      dispatch({ type: "add", item, selectedAddOns }),
    removeItem: (key) => dispatch({ type: "remove", key }),
    setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
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
