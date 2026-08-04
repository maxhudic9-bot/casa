import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
      <CheckCircle2 className="size-12 text-ribelle-gold" />
      <h1 className="text-2xl font-semibold">Danke für deine Bestellung!</h1>
      <p className="text-muted-foreground">
        Wir bereiten deine Bestellung zur Abholung vor. Bei Fragen erreichst du
        uns telefonisch unter 0761 21495620.
      </p>
      <Button asChild>
        <Link href="/">Zurück zur Startseite</Link>
      </Button>
    </div>
  )
}
