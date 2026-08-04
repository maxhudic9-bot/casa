import { NextResponse } from "next/server"

import { paypalConfig } from "@/lib/payment-config"
import { calculateTotal, toApiAmount, type CheckoutPayload } from "@/lib/order-schema"

const PAYPAL_API_BASE =
  paypalConfig.environment === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com"

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${paypalConfig.clientId}:${paypalConfig.clientSecret}`
  ).toString("base64")

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  if (!res.ok) {
    throw new Error(`PayPal OAuth fehlgeschlagen: ${res.status}`)
  }

  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export async function POST(request: Request) {
  if (!paypalConfig.isConfigured) {
    return NextResponse.json(
      {
        error:
          "PayPal ist noch nicht konfiguriert. Bitte NEXT_PUBLIC_PAYPAL_CLIENT_ID und PAYPAL_CLIENT_SECRET in .env.local eintragen.",
      },
      { status: 503 }
    )
  }

  const payload = (await request.json()) as CheckoutPayload
  const total = calculateTotal(payload.lines)

  if (total <= 0) {
    return NextResponse.json({ error: "Warenkorb ist leer." }, { status: 400 })
  }

  try {
    const accessToken = await getAccessToken()

    const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: toApiAmount(total),
            },
            description: "Casa Ribelle – Bestellung zur Abholung",
          },
        ],
      }),
    })

    if (!orderRes.ok) {
      const detail = await orderRes.text()
      throw new Error(`PayPal Order-Erstellung fehlgeschlagen: ${detail}`)
    }

    const order = (await orderRes.json()) as { id: string }
    return NextResponse.json({ orderId: order.id })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "PayPal-Bestellung konnte nicht erstellt werden." },
      { status: 502 }
    )
  }
}
