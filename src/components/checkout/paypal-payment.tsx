"use client"

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

import { PaymentUnavailableNotice } from "@/components/checkout/payment-unavailable-notice"
import type { CartLine, PickupDetails } from "@/lib/types"

interface PayPalPaymentProps {
  configured: boolean
  clientId: string
  lines: CartLine[]
  pickup: PickupDetails
  onSuccess: (orderId: string) => void
  onError: (message: string) => void
}

export function PayPalPayment({
  configured,
  clientId,
  lines,
  pickup,
  onSuccess,
  onError,
}: PayPalPaymentProps) {
  if (!configured) {
    return (
      <div className="space-y-3">
        <PaymentUnavailableNotice label="PayPal" />
        <div aria-disabled className="pointer-events-none h-11 rounded-md bg-muted opacity-60" />
      </div>
    )
  }

  return (
    <PayPalScriptProvider
      options={{ clientId, currency: "EUR", intent: "capture" }}
    >
      <PayPalButtons
        style={{ layout: "vertical", label: "pay" }}
        createOrder={async () => {
          const res = await fetch("/api/checkout/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lines, pickup }),
          })
          if (!res.ok) {
            const data = await res.json().catch(() => null)
            throw new Error(data?.error ?? "PayPal-Bestellung fehlgeschlagen")
          }
          const data = (await res.json()) as { orderId: string }
          return data.orderId
        }}
        onApprove={async (data) => {
          const res = await fetch("/api/checkout/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          })
          if (!res.ok) {
            onError("Zahlung konnte nicht abgeschlossen werden.")
            return
          }
          onSuccess(data.orderID)
        }}
        onError={() => onError("PayPal-Zahlung ist fehlgeschlagen.")}
      />
    </PayPalScriptProvider>
  )
}
