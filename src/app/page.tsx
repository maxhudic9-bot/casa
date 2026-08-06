import Image from "next/image";
import Link from "next/link";

import { PizzaFrameSequence } from "@/components/hero/pizza-frame-sequence";
import { GallerySection } from "@/components/sections/gallery-section";
import { GoogleReviews } from "@/components/sections/google-reviews";
import { MenuTeaserCard } from "@/components/sections/menu-teaser-card";
import { ScrollFade } from "@/components/scroll-fade";
import { Button } from "@/components/ui/button";

const REBELLION_FACTS = [
  { label: "Holzofen", detail: "485°C · 90 Sekunden", accent: "bg-ribelle-green" },
  { label: "Burrata", detail: "Frisch auf der Pizza", accent: "bg-ribelle-red" },
  { label: "Vegan", detail: "Auf Nachfrage", accent: "bg-ribelle-gold" },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col">
      <PizzaFrameSequence>
        <p className="text-sm tracking-[0.3em] text-ribelle-gold uppercase">
          Freiburg im Breisgau
        </p>
        <h1 className="font-display mt-4 text-5xl font-semibold sm:text-6xl">
          Casa Ribelle
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Dein neuer Rhythmus in Freiburg – Espresso · Pizza · Bier
        </p>
        <p className="mt-6 text-xs tracking-[0.2em] text-white/40 uppercase">
          ↓ Scroll für mehr
        </p>
      </PizzaFrameSequence>

      <ScrollFade>
        <section id="ueber-uns" className="relative flex min-h-[60vh] items-end overflow-hidden">
          <Image
            src="/images/graffiti-wand-tag.jpg"
            alt="Graffiti-Wand im Innenraum von Casa Ribelle mit Bud-Spencer-Portrait und Schriftzug AMORE"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ribelle-black via-ribelle-black/40 to-transparent" />

          <div className="relative mx-auto max-w-3xl px-4 pb-14 text-white">
            <h2 className="font-sans text-4xl leading-[0.95] font-black tracking-tight uppercase sm:text-6xl md:text-7xl">
              <span className="block -rotate-2 text-white [text-shadow:3px_3px_0_rgba(0,0,0,0.6)]">
                Mach dir
              </span>
              <span className="mt-1 block rotate-1 text-ribelle-gold [text-shadow:3px_3px_0_rgba(0,0,0,0.6)] sm:mt-2">
                keine Sorgen,
              </span>
              <span className="mt-1 block -rotate-1 text-white [text-shadow:3px_3px_0_rgba(0,0,0,0.6)] sm:mt-2">
                iss erst mal
              </span>
              <span className="mt-1 block rotate-2 text-ribelle-red [text-shadow:3px_3px_0_rgba(0,0,0,0.6)] sm:mt-2">
                eine Pizza!
              </span>
            </h2>
          </div>
        </section>
      </ScrollFade>

      <ScrollFade>
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 py-20 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h2 className="font-display text-3xl font-semibold">Speisekarte</h2>
            <p className="max-w-md text-muted-foreground">
              Pizza, Salate, Antipasti, Dolce und Getränke – alles zur Abholung
              bestellbar.
            </p>
            <Button asChild size="lg">
              <Link href="/speisekarte">Zur vollständigen Speisekarte</Link>
            </Button>
          </div>

          <MenuTeaserCard />
        </section>
      </ScrollFade>

      <ScrollFade>
        <GallerySection />
      </ScrollFade>

      <ScrollFade>
        <GoogleReviews />
      </ScrollFade>

      <ScrollFade>
        <section className="relative overflow-hidden">
          <div className="relative min-h-[50vh]">
            <Image
              src="/images/aussenfassade.jpg"
              alt="Casa Ribelle Café · Pizza · Bar, Außenansicht am Abend"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ribelle-black/75" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-start justify-center gap-4 px-4 py-20 text-white">
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Die Rebellion
              </h2>
              <p className="text-lg text-ribelle-gold">
                Straßenkultur trifft neapolitanische Handwerkskunst.
              </p>
              <p className="max-w-xl text-white/80">
                Hinter der Graffiti-Wand am Rotteckring brennt der Holzofen. Wir
                backen neapolitanische Pizza nach alter Tradition – weich,
                hochgegangen, mit leopardiertem Rand. Darauf: San Marzano, Fior
                di Latte und die Königin selbst – die Burrata.
              </p>

              <div className="mt-2 flex flex-wrap gap-3">
                {REBELLION_FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm"
                  >
                    <span className={`size-2 shrink-0 rounded-full ${fact.accent}`} />
                    <span className="font-medium">{fact.label}</span>
                    <span className="text-white/60">— {fact.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollFade>
    </div>
  );
}
