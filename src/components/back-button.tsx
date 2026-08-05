"use client"

import { ArrowLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export function BackButton() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === "/") return null

  function handleClick() {
    if (window.history.length > 2) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Zurück"
      onClick={handleClick}
      className="shrink-0 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
    >
      <ArrowLeft className="size-5" />
    </Button>
  )
}
