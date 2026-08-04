"use client"

import * as React from "react"
import { Leaf, Sprout } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { categoryLabels, menu } from "@/data/menu"
import { formatPrice, useCart } from "@/lib/cart-context"
import type { MenuAddOn, MenuCategory, MenuItem } from "@/lib/types"

const CATEGORY_ORDER: MenuCategory[] = ["pizza", "salate", "antipasti", "dolce"]

type PizzaFilter = "all" | "vegetarian" | "vegan"

function DietBadges({ item }: { item: MenuItem }) {
  if (item.vegan) {
    return (
      <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
        <Sprout /> Vegan
      </Badge>
    )
  }
  if (item.vegetarian) {
    return (
      <Badge variant="outline" className="gap-1 border-green-600 text-green-700 dark:text-green-400">
        <Leaf /> Vegetarisch
      </Badge>
    )
  }
  return null
}

function MenuItemCard({
  item,
  dimmed,
  highlighted,
  onAdd,
}: {
  item: MenuItem
  dimmed?: boolean
  highlighted?: boolean
  onAdd: (selectedAddOns: MenuAddOn[]) => void
}) {
  const [selectedAddOnIds, setSelectedAddOnIds] = React.useState<string[]>([])

  const selectedAddOns = (item.addOns ?? []).filter((a) =>
    selectedAddOnIds.includes(a.id)
  )
  const totalPrice =
    item.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0)

  function toggleAddOn(addOnId: string, checked: boolean) {
    setSelectedAddOnIds((prev) =>
      checked ? [...prev, addOnId] : prev.filter((id) => id !== addOnId)
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-3 rounded-lg border p-4 transition-all sm:flex-row sm:items-start",
        highlighted ? "border-green-600 ring-1 ring-green-600" : "border-border",
        dimmed && "opacity-40"
      )}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{item.name}</p>
          <DietBadges item={item} />
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        )}
        <p className="mt-2 font-medium">{formatPrice(item.price)}</p>

        {item.addOns && item.addOns.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {item.addOns.map((addOn) => {
              const checkboxId = `${item.id}-${addOn.id}`
              return (
                <div key={addOn.id} className="flex items-center gap-2">
                  <Checkbox
                    id={checkboxId}
                    checked={selectedAddOnIds.includes(addOn.id)}
                    onCheckedChange={(checked) => toggleAddOn(addOn.id, checked === true)}
                  />
                  <Label htmlFor={checkboxId} className="text-sm font-normal text-muted-foreground">
                    + {addOn.name} ({formatPrice(addOn.price)})
                  </Label>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-1.5">
        {selectedAddOns.length > 0 && (
          <p className="text-sm font-medium">= {formatPrice(totalPrice)}</p>
        )}
        <Button size="sm" onClick={() => onAdd(selectedAddOns)}>
          In den Warenkorb
        </Button>
      </div>
    </div>
  )
}

export function MenuSection() {
  const { addItem } = useCart()
  const [pizzaFilter, setPizzaFilter] = React.useState<PizzaFilter>("all")

  function matchesPizzaFilter(item: MenuItem) {
    if (pizzaFilter === "all") return true
    if (pizzaFilter === "vegan") return item.vegan
    return item.vegetarian
  }

  return (
    <section id="speisekarte" className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="font-display text-3xl font-semibold">Speisekarte</h2>
      <p className="mt-2 text-muted-foreground">
        [PLATZHALTER] Getränkekarte (Weine, Spritz, Softdrinks, Biere) folgt in
        einem separaten Schritt.
      </p>

      {CATEGORY_ORDER.map((category) => {
        const items = menu.filter((item) => item.category === category)

        return (
          <div key={category} id={category} className="mt-12">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-medium">{categoryLabels[category]}</h3>

              {category === "pizza" && (
                <div className="flex gap-2" role="group" aria-label="Pizzen nach Ernährungsform hervorheben">
                  {(
                    [
                      { value: "all", label: "Alle" },
                      { value: "vegetarian", label: "Vegetarisch" },
                      { value: "vegan", label: "Vegan" },
                    ] as const
                  ).map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      size="sm"
                      variant={pizzaFilter === option.value ? "default" : "outline"}
                      onClick={() => setPizzaFilter(option.value)}
                      aria-pressed={pizzaFilter === option.value}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAdd={(selectedAddOns) => addItem(item, selectedAddOns)}
                  dimmed={category === "pizza" && !matchesPizzaFilter(item)}
                  highlighted={category === "pizza" && pizzaFilter !== "all" && matchesPizzaFilter(item)}
                />
              ))}
            </div>

            {category === "pizza" && (
              <p className="mt-4 text-sm text-muted-foreground">
                Auf Wunsch bei jeder Pizza vegane Käse-Variante möglich.
              </p>
            )}
          </div>
        )
      })}
    </section>
  )
}
