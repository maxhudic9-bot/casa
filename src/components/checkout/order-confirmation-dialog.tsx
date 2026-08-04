"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getEstimatedPickupMinutes } from "@/lib/pickup-estimate"

interface OrderConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderConfirmationDialog({
  open,
  onOpenChange,
}: OrderConfirmationDialogProps) {
  // Nur beim Oeffnen neu berechnen, nicht bei jedem Re-Render.
  const minutes = React.useMemo(
    () => (open ? getEstimatedPickupMinutes() : null),
    [open]
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-ribelle-gold/30 bg-ribelle-black text-white sm:max-w-md"
      >
        <DialogHeader className="items-center text-center">
          <CheckCircle2 className="size-12 text-ribelle-gold" />
          <DialogTitle className="font-display mt-2 text-2xl font-semibold text-white">
            Danke für deine Bestellung!
          </DialogTitle>
          {minutes !== null && (
            <DialogDescription className="text-base text-white/70">
              Deine Bestellung ist in ca. {minutes} Minuten abholbereit.
            </DialogDescription>
          )}
        </DialogHeader>

        <p className="text-center text-sm text-white/50">
          Bei Fragen erreichst du uns telefonisch unter 0761 21495620.
        </p>

        <Button
          size="lg"
          className="mt-2 w-full bg-ribelle-gold text-ribelle-black hover:bg-ribelle-gold/90"
          onClick={() => onOpenChange(false)}
        >
          Zurück zur Startseite
        </Button>
      </DialogContent>
    </Dialog>
  )
}
