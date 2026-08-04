import { NextResponse } from "next/server"

import { getConfiguredPaymentMethods, paypalConfig, stripeConfig } from "@/lib/payment-config"

export async function GET() {
  return NextResponse.json({
    configured: getConfiguredPaymentMethods(),
    // Oeffentliche (nicht-geheime) Client-Keys, die das Frontend zum
    // Initialisieren der jeweiligen SDKs braucht:
    paypalClientId: paypalConfig.clientId,
    stripePublishableKey: stripeConfig.publishableKey,
  })
}
