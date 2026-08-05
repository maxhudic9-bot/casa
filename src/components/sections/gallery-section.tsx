import Image from "next/image"

const GALLERY_IMAGES = [
  {
    src: "/images/graffiti-wand-nacht.jpg",
    alt: "Graffiti-Wand von Casa Ribelle bei Nacht, stimmungsvoll beleuchtet",
  },
  {
    src: "/images/pizza-burrata.jpg",
    alt: "Frisch gebackene Pizza mit Burrata aus dem Holzofen",
  },
  {
    src: "/images/aussenfassade.jpg",
    alt: "Außenfassade von Casa Ribelle am Rotteckring in Freiburg",
  },
] as const

export function GallerySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl font-semibold">Impressionen</h2>
        <p className="mt-3 text-muted-foreground">
          Ein Blick in unser Casa Ribelle – bei Tag und bei Nacht.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {GALLERY_IMAGES.map((image) => (
          <div
            key={image.src}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-md ring-1 ring-ribelle-gold/20"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  )
}
