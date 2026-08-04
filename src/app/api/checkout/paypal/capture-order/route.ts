import { NextResponse } from "next/server"

import { paypalConfig } from "@/lib/payment-config"

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
      { error: "PayPal ist noch nicht konfiguriert." },
      { status: 503 }
    )
  }

  const { orderId } = (await request.json()) as { orderId: string }
  if (!orderId) {
    return NextResponse.json({ error: "orderId fehlt." }, { status: 400 })
  }

  try {
    const accessToken = await getAccessToken()

    const captureRes = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )

    if (!captureRes.ok) {
      const detail = await captureRes.text()
      throw new Error(`PayPal Capture fehlgeschlagen: ${detail}`)
    }

    const capture = await captureRes.json()
    return NextResponse.json({ status: "ok", capture })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "PayPal-Zahlung konnte nicht abgeschlossen werden." },
      { status: 502 }
    )
  }
}
