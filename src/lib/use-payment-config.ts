"use client"

import * as React from "react"

interface PaymentConfigResponse {
  configured: {
    paypal: boolean
    card: boolean
    apple_pay: boolean
  }
  paypalClientId: string
  stripePublishableKey: string
}

export function usePaymentConfig() {
  const [config, setConfig] = React.useState<PaymentConfigResponse | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    fetch("/api/checkout/config")
      .then((res) => res.json())
      .then((data: PaymentConfigResponse) => {
        if (!cancelled) setConfig(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { config, loading }
}
