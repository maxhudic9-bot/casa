"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"
import { DRINK_CATEGORY_ORDER, drinkCategoryLabels, drinks, WINE_NOTE } from "@/data/drinks"
import { formatPrice, useCart } from "@/lib/cart-context"
import type { DrinkItem } from "@/lib/types"

function DrinkCard({ drink }: { drink: DrinkItem }) {
  const { addItem } = useCart()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [justAdded, setJustAdded] = React.useState(false)
  const variant = drink.variants[selectedIndex]

  function handleAdd() {
    addItem({
      id: `${drink.id}--${variant.size}`,
      category: "getraenke",
      name: variant.size === "pur" ? `${drink.name} (pur)` : drink.name,
      description: drink.variants.length > 1 ? variant.size : "",
      price: variant.price,
      vegetarian: true,
      vegan: true,
      image: "",
    })
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 1200)
  }

  return (
    <div className="flex flex-col justify-between gap-2 rounded-lg border border-border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-ribelle-gold/50 hover:shadow-md sm:flex-row sm:items-center">
      <div>
        <p className="font-medium">{drink.name}</p>
        {drink.variants.length > 1 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {drink.variants.map((v, i) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-xs transition-colors",
                  i === selectedIndex
                    ? "border-ribelle-gold bg-ribelle-gold/15 text-ribelle-black dark:text-ribelle-gold"
                    : "border-border text-muted-foreground hover:border-ribelle-gold/50"
                )}
              >
                {v.size} · {formatPrice(v.price)}
              </button>
            ))}
          </div>
        )}
        {drink.variants.length === 1 && (
          <p className="text-sm text-muted-foreground">
            {variant.size} · {formatPrice(variant.price)}
          </p>
        )}
      </div>
      <Button size="sm" variant={justAdded ? "secondary" : "default"} onClick={handleAdd} className="self-start sm:self-auto">
        {justAdded ? "Hinzugefügt ✓" : "In den Warenkorb"}
      </Button>
    </div>
  )
}

export function DrinksSection() {
  return (
    <div id="getraenke" className="mt-20 scroll-mt-20">
      <h2 className="font-display text-3xl font-semibold">Getränkekarte</h2>

      {DRINK_CATEGORY_ORDER.map((category) => (
        <ScrollReveal key={category} className="mt-12">
        <div id={`getraenke-${category}`} className="scroll-mt-20">
          <h3 className="mb-4 text-xl font-medium">{drinkCategoryLabels[category]}</h3>
          {(category === "wein-weiss" || category === "wein-rot") && (
            <p className="mb-4 text-sm text-muted-foreground">{WINE_NOTE}</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {drinks
              .filter((drink) => drink.category === category)
              .map((drink) => (
                <DrinkCard key={drink.id} drink={drink} />
              ))}
          </div>
        </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
