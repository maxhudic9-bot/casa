"use client"

import * as React from "react"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatPrice, useCart } from "@/lib/cart-context"

export function CartSheet() {
  const { lines, itemCount, subtotal, setQuantity, removeItem } = useCart()
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Warenkorb öffnen"
          className="relative border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
        >
          <ShoppingBag className="size-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-ribelle-gold text-[11px] font-semibold text-ribelle-black">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Dein Warenkorb</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-muted-foreground">
            <ShoppingBag className="size-8" />
            <p>Dein Warenkorb ist noch leer.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-4">
            <ul className="flex flex-col gap-4">
              {lines.map(({ item, quantity }) => (
                <li key={item.id} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium leading-tight">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => setQuantity(item.id, quantity - 1)}
                        aria-label={`${item.name}: Menge verringern`}
                      >
                        <Minus />
                      </Button>
                      <span className="min-w-4 text-center text-sm">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        onClick={() => setQuantity(item.id, quantity + 1)}
                        aria-label={`${item.name}: Menge erhöhen`}
                      >
                        <Plus />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeItem(item.id)}
                        aria-label={`${item.name} entfernen`}
                        className="ml-1 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                  <p className="font-medium whitespace-nowrap">
                    {formatPrice(item.price * quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <SheetFooter>
          <Separator className="mb-2" />
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Zwischensumme</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Nur Abholung. Bezahlung erfolgt im nächsten Schritt.
          </p>
          <Button asChild size="lg" disabled={lines.length === 0} className="mt-2">
            <Link href="/checkout" onClick={() => setOpen(false)}>
              Zur Kasse
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
