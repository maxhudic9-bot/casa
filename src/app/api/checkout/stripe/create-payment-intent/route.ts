import { NextResponse } from "next/server"
import Stripe from "stripe"

import { stripeConfig } from "@/lib/payment-config"
import { calculateTotal, type CheckoutPayload } from "@/lib/order-schema"

export async function POST(request: Request) {
  if (!stripeConfig.isConfigured) {
    return NextResponse.json(
      {
        error:
          "Kartenzahlung ist noch nicht konfiguriert. Bitte NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY und STRIPE_SECRET_KEY in .env.local eintragen.",
      },
      { status: 503 }
    )
  }

  const payload = (await request.json()) as CheckoutPayload
  const total = calculateTotal(payload.lines)

  if (total <= 0) {
    return NextResponse.json({ error: "Warenkorb ist leer." }, { status: 400 })
  }

  const stripe = new Stripe(stripeConfig.secretKey)

  try {
    // Stripe erwartet den Betrag in Cent (kleinste Waehrungseinheit).
    const amountInCents = Math.round(total * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "eur",
      // Aktiviert automatisch Kreditkarte UND Apple Pay (Apple Pay laeuft ueber
      // das Stripe Payment Request Button Element, kein separates Apple
      // Merchant-Zertifikat noetig, solange die Domain bei Stripe verifiziert ist).
      automatic_payment_methods: { enabled: true },
      description: "Casa Ribelle – Bestellung zur Abholung",
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Zahlung konnte nicht vorbereitet werden." },
      { status: 502 }
    )
  }
}
