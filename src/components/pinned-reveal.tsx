"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

interface PinnedRevealProps {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Pinnt den Abschnitt, waehrend der nachfolgende Abschnitt sichtbar von
 * unten darueber schiebt. Nutzt GSAP ScrollTrigger.pin statt CSS
 * position:sticky - sticky loest in der Praxis auf manchen Geraeten/
 * Browsern unzuverlaessig aus, waehrend GSAPs Pin transform-basiert und
 * fuer genau diesen Anwendungsfall gebaut ist.
 *
 * pinSpacing ist bewusst false: mit pinSpacing:true wuerde das Freigeben
 * des Pins exakt mit dem natuerlichen Eintreten des naechsten Abschnitts
 * zusammenfallen (kein Ueberlapp moeglich - das Bild waere nie gleichzeitig
 * "noch angepinnt" UND "wird sichtbar zugedeckt"). Mit pinSpacing:false
 * bleibt die natuerliche Position des naechsten Geschwister-Elements
 * unveraendert, wodurch es waehrend der GESAMTEN Pin-Dauer von unten
 * hereinschiebt und das gepinnte Bild sichtbar zudeckt.
 */
export function PinnedReveal({ children, className, id }: PinnedRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}
