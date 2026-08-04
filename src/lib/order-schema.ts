import type { CartLine, PickupDetails } from "@/lib/types"

export interface CheckoutPayload {
  lines: CartLine[]
  pickup: PickupDetails
}

export function calculateTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => {
    const addOnsTotal = l.selectedAddOns.reduce((s, a) => s + a.price, 0)
    return sum + (l.item.price + addOnsTotal) * l.quantity
  }, 0)
}

/** Formatiert einen Euro-Betrag als String mit Punkt-Dezimaltrennzeichen (fuer PayPal/Stripe APIs). */
export function toApiAmount(amount: number): string {
  return amount.toFixed(2)
}
