import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import { PizzaFrameSequence } from "@/components/hero/pizza-frame-sequence";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";

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

      <ScrollReveal>
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
            </p>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center">
          <h2 className="font-display text-3xl font-semibold">Speisekarte</h2>
          <p className="max-w-md text-muted-foreground">
            Pizza, Salate, Antipasti, Dolce und Getränke – alles zur Abholung
            bestellbar.
          </p>
          <Button asChild size="lg">
            <Link href="/speisekarte">Zur vollständigen Speisekarte</Link>
          </Button>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="kontakt" className="relative overflow-hidden">
          <div className="relative min-h-[50vh]">
            <Image
              src="/images/aussenfassade.jpg"
              alt="Casa Ribelle Café · Pizza · Bar, Außenansicht am Abend"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ribelle-black/75" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-start justify-center gap-4 px-4 py-20 text-white">
              <h2 className="font-display text-3xl font-semibold">Kontakt</h2>
              <div className="space-y-2 text-white/80">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-ribelle-gold" />
                  Rotteckring 2, 79098 Freiburg im Breisgau
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-ribelle-gold" />
                  0761 21495620
                </p>
              </div>
              <div className="text-sm text-white/60">
                <p>Mo–Do 11–23 Uhr · Fr–Sa 11–24 Uhr · So 11–22 Uhr</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
