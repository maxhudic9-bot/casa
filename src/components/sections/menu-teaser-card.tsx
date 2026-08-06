"use client"

import { CakeSlice, ChefHat, Pizza, Salad, UtensilsCrossed, Wine } from "lucide-react"

import { menu } from "@/data/menu"
import { drinks } from "@/data/drinks"
import { formatPrice } from "@/lib/cart-context"

const pizza = menu.find((item) => item.id === "pizza-margherita")!
const salat = menu.find((item) => item.id === "salat-ribelle")!
const antipasti = menu.find((item) => item.id === "antipastiplatte-2p")!
const dolce = menu.find((item) => item.id === "dolce-tiramisu")!
const aperol = drinks.find((drink) => drink.id === "spritz-aperol")!

const ROWS = [
  { icon: Pizza, name: pizza.name, price: pizza.price },
  { icon: Salad, name: salat.name, price: salat.price },
  { icon: UtensilsCrossed, name: antipasti.name.split(" (")[0], price: antipasti.price },
  { icon: CakeSlice, name: dolce.name, price: dolce.price },
  { icon: Wine, name: aperol.name, price: aperol.variants[0].price },
]

export function MenuTeaserCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm shrink-0 sm:mx-0">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-gradient-to-br from-ribelle-gold/20 via-ribelle-red/20 to-ribelle-yellow/20" />
      <div className="relative rotate-1 rounded-2xl border border-ribelle-gold/30 bg-ribelle-black p-6 text-white shadow-2xl transition-transform duration-500 hover:rotate-0">
        <div className="flex items-center justify-center gap-2">
          <ChefHat className="size-4 text-ribelle-gold" />
          <p className="text-xs font-medium tracking-[0.3em] text-ribelle-gold uppercase">
            Speisekarte
          </p>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-ribelle-gold via-ribelle-red to-ribelle-yellow" />

        <ul className="mt-5 space-y-4">
          {ROWS.map((row) => (
            <li key={row.name} className="flex items-baseline gap-2 text-sm">
              <row.icon className="size-4 shrink-0 translate-y-0.5 text-ribelle-gold" />
              <span className="whitespace-nowrap text-white/90">{row.name}</span>
              <span className="mb-1 flex-1 border-b border-dotted border-white/25" />
              <span className="whitespace-nowrap font-medium text-white/70">
                {formatPrice(row.price)}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-white/40">und vieles mehr …</p>
      </div>
    </div>
  )
}
