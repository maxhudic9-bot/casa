import type { Metadata } from "next"
import Link from "next/link"

import { MenuSection } from "@/components/sections/menu-section"
import { DrinksSection } from "@/components/sections/drinks-section"

export const metadata: Metadata = {
  title: "Speisekarte – Casa Ribelle",
  description:
    "Pizza, Salate, Antipasti, Dolce und Getränke von Casa Ribelle in Freiburg im Breisgau – zur Abholung bestellbar.",
}

const QUICK_NAV = [
  { href: "#pizza", label: "Pizza" },
  { href: "#salate", label: "Salate" },
  { href: "#antipasti", label: "Antipasti" },
  { href: "#dolce", label: "Dolce" },
  { href: "#getraenke", label: "Getränke" },
]

export default function SpeisekartePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold">Speisekarte</h1>
      <p className="mt-2 text-muted-foreground">
        Alles zur Abholung bestellbar. Öffnungszeiten und Kontakt findest du{" "}
        <Link href="/#kontakt" className="underline underline-offset-2 hover:text-ribelle-gold">
          hier
        </Link>
        .
      </p>

      <nav
        aria-label="Kategorien"
        className="mt-6 flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {QUICK_NAV.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-ribelle-gold hover:text-ribelle-gold"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <MenuSection />
      <DrinksSection />
    </div>
  )
}
