import { Star } from "lucide-react"

const RATING = 4.8
const REVIEW_COUNT = 317

function StarRow() {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, RATING - i))
        return (
          <span key={i} className="relative inline-block size-6 sm:size-7">
            <Star className="absolute inset-0 size-full text-ribelle-gold/25" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-6 fill-ribelle-gold text-ribelle-gold sm:size-7" />
            </span>
          </span>
        )
      })}
    </div>
  )
}

export function GoogleReviews() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-14 text-center">
        <StarRow />
        <p className="text-2xl font-semibold">
          {RATING.toString().replace(".", ",")} von 5
        </p>
        <p className="text-muted-foreground">
          Basierend auf {REVIEW_COUNT} Google-Bewertungen
        </p>
      </div>
    </section>
  )
}
