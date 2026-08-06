import { Star } from "lucide-react"

const RATING = 4.8
const REVIEW_COUNT = 317

interface CustomerReview {
  text: string
  accent: "green" | "red" | "gold"
}

// Echte 5-Sterne-Zitate von Google Maps, vom Kunden bereitgestellt.
// Reihenfolge und Farben folgen den Logo-Streifen: Grün, Dunkelrot, Gold.
const REVIEWS: CustomerReview[] = [
  {
    text: "Wir sind begeistert von dieser tollen Location mitten in Freiburg. Die Pizza köstlich und der Service sehr freundlich und aufmerksam. Ein echtes Highlight für den großen schnellen Hunger, wohlfühlen und genießen.",
    accent: "green",
  },
  {
    text: "Spontan besucht. Freundlich empfangen und toller Service. Essen war super lecker. Wir hatten Salat und die empfohlene Pizza Ribelle. Mega lecker.",
    accent: "red",
  },
  {
    text: "Wir waren sehr positiv überrascht. Das Personal ist total freundlich, die Pizza wirklich lecker mit einem entspannten, gemütlichen Ambiente. Gerne wieder 🙂",
    accent: "gold",
  },
]

const ACCENT_CLASSES: Record<CustomerReview["accent"], string> = {
  green: "bg-ribelle-green",
  red: "bg-ribelle-red",
  gold: "bg-ribelle-gold",
}

function StarRow({ size = "size-6 sm:size-7" }: { size?: string }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, RATING - i))
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <Star className="absolute inset-0 size-full text-ribelle-gold/25" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={`${size} fill-ribelle-gold text-ribelle-gold`} />
            </span>
          </span>
        )
      })}
    </div>
  )
}

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`h-1.5 ${ACCENT_CLASSES[review.accent]}`} />
      <div className="flex flex-col gap-3 p-5 text-left">
        <div className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-ribelle-gold text-ribelle-gold" />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
        <p className="text-xs text-muted-foreground/70">Google-Bewertung</p>
      </div>
    </div>
  )
}

export function GoogleReviews() {
  return (
    <section className="border-y border-border bg-muted">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 pt-10 pb-14 text-center">
        <StarRow />
        <p className="text-2xl font-semibold">
          {RATING.toString().replace(".", ",")} von 5
        </p>
        <p className="text-muted-foreground">
          Basierend auf {REVIEW_COUNT} Google-Bewertungen
        </p>

        <div className="mt-6 grid w-full gap-4 sm:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
