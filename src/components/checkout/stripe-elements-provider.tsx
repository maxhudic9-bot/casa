"use client"

import * as React from "react"
// "/pure" entry point: the default "@stripe/stripe-js" import eagerly fetches
// js.stripe.com as a module side-effect on import, even if loadStripe() is
// never called. "/pure" only fetches when loadStripe() actually runs, which
// matters here since Stripe may be unconfigured (configured === false).
import { loadStripe } from "@stripe/stripe-js/pure"
import type { Stripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import { PaymentUnavailableNotice } from "@/components/checkout/payment-unavailable-notice"
import type { CartLine, PickupDetails } from "@/lib/types"

interface StripeElementsProviderProps {
  configured: boolean
  publishableKey: string
  lines: CartLine[]
  pickup: PickupDetails
  children: React.ReactNode
}

export function StripeElementsProvider({
  configured,
  publishableKey,
  lines,
  pickup,
  children,
}: StripeElementsProviderProps) {
  const [stripePromise] = React.useState<Promise<Stripe | null> | null>(() =>
    configured && publishableKey ? loadStripe(publishableKey) : null
  )
  const [clientSecret, setClientSecret] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!configured || lines.length === 0) return
    let cancelled = false

    fetch("/api/checkout/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines, pickup }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? "Unbekannter Fehler")
        if (!cancelled) setClientSecret(data.clientSecret)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configured, JSON.stringify(lines)])

  if (!configured) {
    return (
      <div className="space-y-3">
        <PaymentUnavailableNotice label="Kartenzahlung / Apple Pay (Stripe)" />
        <div aria-disabled className="pointer-events-none h-11 rounded-md bg-muted opacity-60" />
      </div>
    )
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>
  }

  if (!clientSecret || !stripePromise) {
    return (
      <div className="h-11 animate-pulse rounded-md bg-muted" aria-label="Zahlung wird vorbereitet…" />
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: { theme: "stripe" } }}
    >
      {children}
    </Elements>
  )
}
