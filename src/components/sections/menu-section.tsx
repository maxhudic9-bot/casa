"use client"

import { Leaf, Sprout } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { categoryLabels, menu } from "@/data/menu"
import { formatPrice, useCart } from "@/lib/cart-context"
import type { MenuCategory } from "@/lib/types"

const CATEGORY_ORDER: MenuCategory[] = ["pizza", "salate", "antipasti", "dolce"]

export function MenuSection() {
  const { addItem } = useCart()

  return (
    <section id="speisekarte" className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="font-display text-3xl font-semibold">Speisekarte</h2>
      <p className="mt-2 text-muted-foreground">
        [PLATZHALTER] Gerichte, Beschreibungen und Preise werden ersetzt,
        sobald die echte Speisekarte vorliegt.
      </p>

      {CATEGORY_ORDER.map((category) => (
        <div key={category} id={category} className="mt-12">
          <h3 className="mb-4 text-xl font-medium">{categoryLabels[category]}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {menu
              .filter((item) => item.category === category)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border p-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{item.name}</p>
                      {item.vegan ? (
                        <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
                          <Sprout /> Vegan
                        </Badge>
                      ) : item.vegetarian ? (
                        <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
                          <Leaf /> Vegetarisch
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-2 font-medium">{formatPrice(item.price)}</p>
                  </div>
                  <Button size="sm" onClick={() => addItem(item)}>
                    In den Warenkorb
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  )
}
