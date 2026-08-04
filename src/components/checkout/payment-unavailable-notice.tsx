import { AlertTriangle } from "lucide-react"

export function PaymentUnavailableNotice({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2 rounded-md border border-dashed border-ribelle-gold/60 bg-ribelle-gold/10 p-3 text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-ribelle-gold" />
      <p>
        <strong>{label} ist noch nicht konfiguriert.</strong> Die Zugangsdaten
        fehlen aktuell in <code className="rounded bg-black/10 px-1 py-0.5 text-xs dark:bg-white/10">.env.local</code>
        {" "}(siehe <code className="rounded bg-black/10 px-1 py-0.5 text-xs dark:bg-white/10">.env.example</code>).
        Sobald die echten Zugangsdaten eingetragen sind, funktioniert diese
        Zahlart automatisch.
      </p>
    </div>
  )
}
