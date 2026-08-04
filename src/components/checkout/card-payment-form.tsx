"use client"

import * as React from "react"
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

import { Button } from "@/components/ui/button"

interface CardPaymentFormProps {
  onSuccess: (paymentIntentId: string) => void
  onError: (message: string) => void
}

export function CardPaymentForm({ onSuccess, onError }: CardPaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = React.useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setSubmitting(true)
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })

    setSubmitting(false)

    if (error) {
      onError(error.message ?? "Zahlung fehlgeschlagen.")
      return
    }
    if (paymentIntent?.status === "succeeded") {
      onSuccess(paymentIntent.id)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" size="lg" className="w-full" disabled={!stripe || submitting}>
        {submitting ? "Wird verarbeitet…" : "Jetzt bezahlen"}
      </Button>
    </form>
  )
}
