import Image from "next/image"
import Link from "next/link"

import { BackButton } from "@/components/back-button"
import { CartSheet } from "@/components/cart-sheet"

const NAV_LINKS = [
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/speisekarte", label: "Speisekarte" },
  { href: "/#kontakt", label: "Kontakt" },
  { href: "/impressum", label: "Impressum" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ribelle-black/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <BackButton />
          <Link href="/" aria-label="Casa Ribelle – Startseite" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Casa Ribelle – Café · Pizza · Bar"
              width={904}
              height={226}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ribelle-gold">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartSheet />
        </div>
      </div>
    </header>
  )
}
