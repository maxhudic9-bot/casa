"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const BLUR_PX = 14

interface ScrollFadeProps {
  children: React.ReactNode
  className?: string
}

/**
 * Weicher Cross-Fade/Blur-Uebergang fuer Hauptabschnitte: der Abschnitt
 * blendet unscharf ein, bleibt waehrend der Durchquerung scharf/sichtbar
 * und blendet beim Verlassen wieder unscharf aus - kein harter Schnitt.
 */
export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const el = ref.current

      gsap.timeline({
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
          { opacity: 1, filter: "blur(0px)", ease: "none", duration: 0.25 }
        )
        .to(el, { opacity: 1, filter: "blur(0px)", duration: 0.5 })
        .to(el, { opacity: 0, filter: `blur(${BLUR_PX}px)`, ease: "none", duration: 0.25 })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
