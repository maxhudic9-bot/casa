import { MenuSection } from "@/components/sections/menu-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ribelle-black px-4 text-center text-white">
        <p className="text-sm tracking-[0.3em] text-ribelle-gold uppercase">
          Freiburg im Breisgau
        </p>
        <h1 className="font-display mt-4 text-5xl font-semibold sm:text-6xl">
          Casa Ribelle
        </h1>
        <p className="mt-4 max-w-xl text-white/70">
          [PLATZHALTER] Hero mit 3D-Scroll-Animation folgt in einem
          separaten Schritt. Diese Seite dient aktuell dem Test des
          Bestell- und Checkout-Flows.
        </p>
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
