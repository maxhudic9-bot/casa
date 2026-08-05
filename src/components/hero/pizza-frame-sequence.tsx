"use client"

import * as React from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const FRAME_COUNT = 130
const FRAME_PATH = (i: number) => `/images/pizza-sequence/frame-${String(i).padStart(3, "0")}.webp`

interface PizzaFrameSequenceProps {
  children: React.ReactNode
}

export function PizzaFrameSequence({ children }: PizzaFrameSequenceProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const imagesRef = React.useRef<Array<HTMLImageElement | null>>(new Array(FRAME_COUNT).fill(null))
  const currentFrameRef = React.useRef(0)
  const [firstFrameReady, setFirstFrameReady] = React.useState(false)

  const drawFrame = React.useCallback((index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Naechstgelegenes bereits geladenes Bild verwenden, damit beim Scrubben
    // nichts schwarz aufblitzt, falls ein Frame noch nicht geladen ist.
    let img: HTMLImageElement | null = null
    for (let i = index; i >= 0; i--) {
      if (imagesRef.current[i]?.complete) {
        img = imagesRef.current[i]
        break
      }
    }
    if (!img) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr
      canvas.height = ch * dpr
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const scale = Math.max(cw / img.width, ch / img.height)
    const drawW = img.width * scale
    const drawH = img.height * scale
    const offsetX = (cw - drawW) / 2
    const offsetY = (ch - drawH) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  }, [])

  React.useEffect(() => {
    let cancelled = false

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image()
      img.src = FRAME_PATH(i)
      img.onload = () => {
        if (cancelled) return
        imagesRef.current[i - 1] = img
        if (i === 1) {
          setFirstFrameReady(true)
          drawFrame(0)
        } else if (currentFrameRef.current >= i - 1) {
          drawFrame(currentFrameRef.current)
        }
      }
    }

    return () => {
      cancelled = true
    }
  }, [drawFrame])

  React.useEffect(() => {
    function handleResize() {
      drawFrame(currentFrameRef.current)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [drawFrame])

  useGSAP(
    () => {
      if (!wrapperRef.current) return

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          const frame = Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1)))
          currentFrameRef.current = frame
          drawFrame(frame)
        },
      })

      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          y: -50,
          ease: "power1.in",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "25% top",
            scrub: 0.35,
          },
        })
      }
    },
    { scope: wrapperRef }
  )

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-ribelle-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-300"
          style={{ opacity: firstFrameReady ? 1 : 0 }}
        />

        <div
          ref={textRef}
          className="pointer-events-none relative z-10 flex flex-col items-center px-4 text-center text-white"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
