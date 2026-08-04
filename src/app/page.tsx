import Image from "next/image";

import { MenuSection } from "@/components/sections/menu-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center text-white">
        <Image
          src="/images/aussenfassade.jpg"
          alt="Casa Ribelle Café · Pizza · Bar, Außenansicht am Abend"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ribelle-black/70" />

        <div className="relative">
          <p className="text-sm tracking-[0.3em] text-ribelle-gold uppercase">
            Freiburg im Breisgau
          </p>
          <h1 className="font-display mt-4 text-5xl font-semibold sm:text-6xl">
            Casa Ribelle
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Dein neuer Rhythmus in Freiburg – Espresso · Pizza · Bier
          </p>
          <p className="mt-3 max-w-xl text-sm text-white/50">
            [PLATZHALTER] 3D-Scroll-Animation (Zutaten fallen auf die Pizza)
            folgt in einem separaten Schritt.
          </p>
        </div>
      </section>

      <section id="ueber-uns" className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src="/images/graffiti-wand-tag.jpg"
          alt="Graffiti-Wand im Innenraum von Casa Ribelle mit Bud-Spencer-Portrait und Schriftzug AMORE"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ribelle-black via-ribelle-black/40 to-transparent" />

        <div className="relative mx-auto max-w-3xl px-4 pb-14 text-white">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Mehr als nur Pizza
          </h2>
          <p className="mt-3 max-w-xl text-white/80">
            Handbemalte Graffiti-Kunst, warmes Licht und echter Holzofen-Charme
            – bei uns triffst du dich, isst gut und bleibst länger als geplant.
            [PLATZHALTER] Weitere Stimmungs-/Instagram-Highlights folgen.
          </p>
        </div>
      </section>

      <MenuSection />

      <section id="kontakt" className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="font-display text-3xl font-semibold">Kontakt</h2>
        <div className="mt-4 space-y-1 text-muted-foreground">
          <p>Casa Ribelle</p>
          <p>Rotteckring 2, 79098 Freiburg im Breisgau</p>
          <p>Telefon: 0761 21495620</p>
          <p>Mo–Do 11–23 Uhr, Fr–Sa 11–24 Uhr, So 11–22 Uhr</p>
        </div>
      </section>
    </div>
  );
}
