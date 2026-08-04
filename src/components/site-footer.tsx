import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

// lucide-react fuehrt seit v1 keine Marken-/Social-Icons mehr - eigenes,
// minimales Instagram-Glyph statt Abhaengigkeit auf ein Icon-Set dafuer.
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ribelle-black text-white">
      <div className="h-1 bg-gradient-to-r from-ribelle-gold via-ribelle-red to-ribelle-yellow" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
        <div>
          <Image
            src="/images/logo.png"
            alt="Casa Ribelle – Café · Pizza · Bar"
            width={904}
            height={226}
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Dein neuer Rhythmus in Freiburg – Espresso · Pizza · Bier.
          </p>
          <Link
            href="https://www.instagram.com/casa_ribelle/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-ribelle-gold"
          >
            <InstagramIcon className="size-4" />
            @casa_ribelle
          </Link>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.2em] text-ribelle-gold uppercase">Kontakt</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-white/40" />
              Rotteckring 2, 79098 Freiburg im Breisgau
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-white/40" />
              0761 21495620
            </li>
          </ul>
          <div className="mt-4 space-y-1 text-sm text-white/50">
            <p>Mo–Do 11–23 Uhr</p>
            <p>Fr–Sa 11–24 Uhr</p>
            <p>So 11–22 Uhr</p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm tracking-[0.2em] text-ribelle-gold uppercase">Rechtliches</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/impressum" className="transition-colors hover:text-ribelle-gold">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="transition-colors hover:text-ribelle-gold">
                Datenschutzerklärung
              </Link>
            </li>
            <li>
              <Link href="/speisekarte" className="transition-colors hover:text-ribelle-gold">
                Speisekarte
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Casa Ribelle
      </div>
    </footer>
  )
}
