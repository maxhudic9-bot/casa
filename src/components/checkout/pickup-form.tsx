"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { PickupDetails } from "@/lib/types"

interface PickupFormProps {
  value: PickupDetails
  onChange: (value: PickupDetails) => void
}

const PICKUP_SLOTS = [
  "So schnell wie möglich (ca. 20–30 Min.)",
  "In 45 Minuten",
  "In 1 Stunde",
  "In 1,5 Stunden",
]

export function PickupForm({ value, onChange }: PickupFormProps) {
  function update<K extends keyof PickupDetails>(key: K, val: PickupDetails[K]) {
    onChange({ ...value, [key]: val })
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={value.name}
            onChange={(e) => update("name", e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            type="tel"
            required
            value={value.phone}
            onChange={(e) => update("phone", e.target.value)}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">E-Mail</Label>
        <Input
          id="email"
          type="email"
          required
          value={value.email}
          onChange={(e) => update("email", e.target.value)}
          autoComplete="email"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pickupTime">Abholzeit</Label>
        <Select
          value={value.pickupTime}
          onValueChange={(val) => update("pickupTime", val)}
        >
          <SelectTrigger id="pickupTime" className="w-full">
            <SelectValue placeholder="Abholzeit wählen" />
          </SelectTrigger>
          <SelectContent>
            {PICKUP_SLOTS.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Anmerkungen (optional)</Label>
        <Input
          id="notes"
          value={value.notes ?? ""}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="z. B. Allergien, Wünsche"
        />
      </div>
    </div>
  )
}
