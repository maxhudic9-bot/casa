import { Star } from "lucide-react"

const RATING = 4.8
const REVIEW_COUNT = 317

interface CustomerReview {
  author: string
  text: string
}

// Echte 5-Sterne-Zitate von Google Maps folgen, sobald der Kunde sie liefert -
// bis dahin bleibt die Liste leer, statt erfundene Bewertungen zu zeigen.
const REVIEWS: CustomerReview[] = []

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
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <StarRow size="size-4" />
      <p className="text-sm text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
      <p className="text-sm font-medium">{review.author}</p>
    </div>
  )
}

export function GoogleReviews() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 py-16 text-center">
        <p className="text-xs font-medium tracking-[0.3em] text-ribelle-gold uppercase">
          Google Bewertungen
        </p>
        <StarRow size="size-9 sm:size-11" />
        <p className="text-5xl font-semibold sm:text-6xl">
          {RATING.toString().replace(".", ",")}{" "}
          <span className="text-2xl font-normal text-muted-foreground sm:text-3xl">
            von 5
          </span>
        </p>
        <p className="text-muted-foreground">
          Basierend auf {REVIEW_COUNT} Google-Bewertungen
        </p>

        {REVIEWS.length > 0 && (
          <div className="mt-6 grid w-full gap-4 sm:grid-cols-3">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.author} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
