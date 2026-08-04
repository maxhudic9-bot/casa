"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PickupForm } from "@/components/checkout/pickup-form"
import { PayPalPayment } from "@/components/checkout/paypal-payment"
import { StripeElementsProvider } from "@/components/checkout/stripe-elements-provider"
import { CardPaymentForm } from "@/components/checkout/card-payment-form"
import { ApplePayButton } from "@/components/checkout/apple-pay-button"
import { formatPrice, useCart } from "@/lib/cart-context"
import { usePaymentConfig } from "@/lib/use-payment-config"
import type { PaymentMethod, PickupDetails } from "@/lib/types"

const EMPTY_PICKUP: PickupDetails = {
  name: "",
  phone: "",
  email: "",
  pickupTime: "So schnell wie möglich (ca. 20–30 Min.)",
  notes: "",
}

export default function CheckoutPage() {
  const router = useRouter()
  const { lines, subtotal, clear } = useCart()
  const { config, loading: configLoading } = usePaymentConfig()
  const [pickup, setPickup] = React.useState<PickupDetails>(EMPTY_PICKUP)
  const [method, setMethod] = React.useState<PaymentMethod>("paypal")
  const [error, setError] = React.useState<string | null>(null)

  const pickupComplete = Boolean(pickup.name && pickup.phone && pickup.email)

  function handleSuccess() {
    clear()
    router.push("/bestellung-erfolgreich")
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold">Dein Warenkorb ist leer</h1>
        <p className="text-muted-foreground">
          Füge zuerst etwas aus der Speisekarte hinzu, bevor du zur Kasse gehst.
        </p>
        <Button asChild>
          <Link href="/#speisekarte">Zur Speisekarte</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Kasse</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nur Abholung – Rotteckring 2, 79098 Freiburg im Breisgau.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-lg font-medium">Deine Kontaktdaten</h2>
          <PickupForm value={pickup} onChange={setPickup} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium">Zahlungsart</h2>

          {!pickupComplete ? (
            <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              Bitte zuerst Name, Telefon und E-Mail oben ausfüllen, um eine
              Zahlungsart auszuwählen.
            </p>
          ) : configLoading || !config ? (
            <div className="h-32 animate-pulse rounded-md bg-muted" />
          ) : (
            <Tabs value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="card">
                  <CreditCard className="size-4" />
                  Kreditkarte
                </TabsTrigger>
                <TabsTrigger value="apple_pay">
                  <Wallet className="size-4" />
                  Apple Pay
                </TabsTrigger>
              </TabsList>

              <TabsContent value="paypal" className="pt-4">
                <PayPalPayment
                  configured={config.configured.paypal}
                  clientId={config.paypalClientId}
                  lines={lines}
                  pickup={pickup}
                  onSuccess={handleSuccess}
                  onError={setError}
                />
              </TabsContent>

              <TabsContent value="card" className="pt-4">
                <StripeElementsProvider
                  configured={config.configured.card}
                  publishableKey={config.stripePublishableKey}
                  lines={lines}
                  pickup={pickup}
                >
                  <CardPaymentForm onSuccess={handleSuccess} onError={setError} />
                </StripeElementsProvider>
              </TabsContent>

              <TabsContent value="apple_pay" className="pt-4">
                <StripeElementsProvider
                  configured={config.configured.apple_pay}
                  publishableKey={config.stripePublishableKey}
                  lines={lines}
                  pickup={pickup}
                >
                  <ApplePayButton
                    merchantName="Casa Ribelle"
                    amount={subtotal}
                    onSuccess={handleSuccess}
                    onError={setError}
                  />
                </StripeElementsProvider>
              </TabsContent>
            </Tabs>
          )}

          {error && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="font-medium">Bestellübersicht</h2>
            <ul className="space-y-2 text-sm">
              {lines.map(({ item, quantity }) => (
                <li key={item.id} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">
                    {quantity}× {item.name}
                  </span>
                  <span>{formatPrice(item.price * quantity)}</span>
                </li>
              ))}
            </ul>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Gesamt</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
