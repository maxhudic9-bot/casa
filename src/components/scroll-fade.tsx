"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const BLUR_PX = 6

interface ScrollFadeProps {
  children: React.ReactNode
  className?: string
}

/**
 * Weicher Fade/Blur-Uebergang fuer Hauptabschnitte, live an die Scroll-
 * Position gekoppelt (scrub, kein Autoplay): der Abschnitt blendet beim
 * Eintreten unscharf ein, bleibt waehrend der Durchquerung scharf sichtbar
 * und blendet beim Verlassen wieder unscharf aus - kein harter Schnitt.
 * Blur bewusst niedrig gehalten, sonst wird der Inhalt beim Uebergang zu
 * einem nicht mehr erkennbaren Farbklecks statt sichtbar zu verblassen.
 */
export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const el = ref.current

      gsap.set(el, { willChange: "opacity, filter" })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
          },
        })
        .fromTo(
          el,
          { opacity: 0, filter: `blur(${BLUR_PX}px)` },
          { opacity: 1, filter: "blur(0px)", ease: "none", duration: 0.18 }
        )
        .to(el, { opacity: 1, filter: "blur(0px)", duration: 0.64 })
        .to(el, { opacity: 0, filter: `blur(${BLUR_PX}px)`, ease: "none", duration: 0.18 })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
