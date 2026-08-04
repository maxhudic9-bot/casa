// PLATZHALTER-KONFIGURATION für Zahlungsanbieter.
//
// Diese Datei liest ausschliesslich Environment-Variablen und enthaelt
// selbst KEINE echten Zugangsdaten. Solange die *_ENV Variablen unten nicht
// in .env.local gesetzt sind, bleibt die jeweilige Zahlart in der UI sichtbar,
// aber im "nicht konfiguriert"-Zustand (siehe isConfigured) — es kann nicht
// live bezahlt werden. Sobald echte Werte in .env.local eingetragen sind,
// schaltet sich die Zahlart automatisch scharf. Siehe .env.example.

export const paypalConfig = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
  // Server-seitig, nie an den Client ausliefern:
  clientSecret: process.env.PAYPAL_CLIENT_SECRET ?? "",
  environment: process.env.PAYPAL_ENVIRONMENT ?? "sandbox", // "sandbox" | "live"
  get isConfigured() {
    return Boolean(this.clientId && this.clientSecret)
  },
}

export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  // Server-seitig, nie an den Client ausliefern:
  secretKey: process.env.STRIPE_SECRET_KEY ?? "",
  get isConfigured() {
    return Boolean(this.publishableKey && this.secretKey)
  },
}

// Apple Pay laeuft technisch ueber Stripes Payment Request Button (siehe
// ApplePayButton-Komponente) - es ist also KEIN separates Apple-Developer-
// Merchant-Zertifikat noetig. Voraussetzung ist lediglich, dass Stripe
// konfiguriert ist UND Apple Pay + die Domain im Stripe-Dashboard unter
// Settings -> Payment methods -> Apple Pay verifiziert wurden (dafuer legt
// Stripe automatisch die noetige Verifizierungsdatei unter
// /.well-known/apple-developer-merchantid-domain-association ab).
export const applePayConfig = {
  merchantDisplayName: process.env.NEXT_PUBLIC_APPLE_PAY_MERCHANT_NAME ?? "Casa Ribelle",
  get isConfigured() {
    return stripeConfig.isConfigured
  },
}

export function getConfiguredPaymentMethods() {
  return {
    paypal: paypalConfig.isConfigured,
    card: stripeConfig.isConfigured,
    apple_pay: applePayConfig.isConfigured,
  } as const
}
