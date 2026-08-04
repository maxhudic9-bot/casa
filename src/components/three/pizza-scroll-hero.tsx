"use client"

import * as React from "react"
import { Canvas } from "@react-three/fiber"

import { PizzaScene } from "./pizza-scene"

export function PizzaScrollHero({ children }: { children: React.ReactNode }) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const textRef = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-ribelle-black">
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 2.5, 5.6], fov: 38 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true }}
          >
            <React.Suspense fallback={null}>
              <PizzaScene triggerRef={wrapperRef} textRef={textRef} />
            </React.Suspense>
          </Canvas>
        </div>

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
