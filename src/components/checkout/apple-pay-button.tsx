"use client"

import * as React from "react"
import {
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { PaymentRequest } from "@stripe/stripe-js"

import { formatPrice } from "@/lib/cart-context"

interface ApplePayButtonProps {
  merchantName: string
  amount: number
  onSuccess: (paymentIntentId: string) => void
  onError: (message: string) => void
}

export function ApplePayButton({
  merchantName,
  amount,
  onSuccess,
  onError,
}: ApplePayButtonProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentRequest, setPaymentRequest] = React.useState<PaymentRequest | null>(null)
  const [available, setAvailable] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    if (!stripe) return

    const pr = stripe.paymentRequest({
      country: "DE",
      currency: "eur",
      total: {
        label: merchantName,
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    })

    pr.canMakePayment().then((result) => {
      setAvailable(Boolean(result))
      if (result) setPaymentRequest(pr)
    })

    pr.on("paymentmethod", async (ev) => {
      if (!elements) return
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      })

      if (error) {
        ev.complete("fail")
        onError(error.message ?? "Apple-Pay-Zahlung fehlgeschlagen.")
        return
      }

      ev.complete("success")
      if (paymentIntent?.status === "succeeded") {
        onSuccess(paymentIntent.id)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe, amount])

  if (available === null) {
    return <div className="h-11 animate-pulse rounded-md bg-muted" />
  }

  if (!available || !paymentRequest) {
    return (
      <p className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
        Apple Pay ist auf diesem Gerät/Browser nicht verfügbar. Apple Pay
        funktioniert nur in Safari auf Geräten mit eingerichtetem Apple Pay.
      </p>
    )
  }

  return (
    <PaymentRequestButtonElement
      options={{ paymentRequest, style: { paymentRequestButton: { theme: "dark", height: "44px" } } }}
    />
  )
}

export function formatApplePayAmount(amount: number) {
  return formatPrice(amount)
}
