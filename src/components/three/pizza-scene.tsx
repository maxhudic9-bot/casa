"use client"

import * as React from "react"
import * as THREE from "three"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTexture } from "@react-three/drei"

import { IngredientMesh, type IngredientType } from "./ingredient-mesh"
import { DustParticles } from "./dust-particles"

gsap.registerPlugin(ScrollTrigger)

interface IngredientDef {
  type: IngredientType
  startPos: [number, number, number]
  endPos: [number, number, number]
  endRotation: [number, number, number]
  delay: number
}

// Deterministisch (kein Math.random beim Render), damit Server/Client-Markup
// nicht auseinanderlaeuft und die Szene bei jedem Reload gleich aussieht.
function makeIngredients(): IngredientDef[] {
  const types: IngredientType[] = ["rucola", "tomato", "prosciutto", "burrata"]
  const defs: IngredientDef[] = []
  const count = 20

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length]
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.4
    const radius = 0.5 + ((i * 37) % 100) / 100 // 0.5 - 1.5, verteilt auf der Pizza
    const jitterX = (((i * 53) % 100) / 100 - 0.5) * 4.5
    const jitterZ = (((i * 71) % 100) / 100 - 0.5) * 3.5

    defs.push({
      type,
      startPos: [jitterX, 4 + (i % 5) * 0.6, jitterZ],
      endPos: [Math.cos(angle) * radius, 0.12 + (i % 4) * 0.02, Math.sin(angle) * radius * 0.55],
      endRotation: [
        ((i * 13) % 100) / 100 - 0.5,
        ((i * 29) % 100) / 100 * Math.PI * 2,
        ((i * 17) % 100) / 100 - 0.5,
      ],
      delay: (i / count) * 0.55,
    })
  }
  return defs
}

interface PizzaSceneProps {
  triggerRef: React.RefObject<HTMLElement | null>
  textRef: React.RefObject<HTMLElement | null>
}

export function PizzaScene({ triggerRef, textRef }: PizzaSceneProps) {
  const groupRef = React.useRef<THREE.Group>(null)
  const ingredientRefs = React.useRef<Array<THREE.Mesh | null>>([])
  const dustRef = React.useRef<THREE.Points>(null)
  const texture = useTexture("/images/pizza-burrata-square.jpg")
  const ingredients = React.useMemo(() => makeIngredients(), [])

  useGSAP(
    () => {
      if (!triggerRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      })

      if (textRef.current) {
        tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.22, ease: "power1.in" }, 0)
      }

      if (groupRef.current) {
        tl.fromTo(
          groupRef.current.rotation,
          { x: -0.6, y: -0.45, z: 0.08 },
          { x: -0.18, y: 0, z: 0, duration: 0.85, ease: "power2.out" },
          0
        )
        tl.fromTo(
          groupRef.current.position,
          { y: -0.6 },
          { y: 0, duration: 0.85, ease: "power2.out" },
          0
        )
      }

      ingredients.forEach((ing, i) => {
        const mesh = ingredientRefs.current[i]
        if (!mesh) return
        tl.fromTo(
          mesh.position,
          { x: ing.startPos[0], y: ing.startPos[1], z: ing.startPos[2] },
          { x: ing.endPos[0], y: ing.endPos[1], z: ing.endPos[2], duration: 0.5, ease: "power1.in" },
          ing.delay
        )
        tl.fromTo(
          mesh.rotation,
          { x: 0, y: 0, z: 0 },
          { x: ing.endRotation[0], y: ing.endRotation[1], z: ing.endRotation[2], duration: 0.5, ease: "power1.out" },
          ing.delay
        )
      })

      if (dustRef.current) {
        tl.fromTo(dustRef.current.position, { y: 2.2 }, { y: 0, duration: 0.9, ease: "power1.out" }, 0)
        const material = dustRef.current.material as THREE.PointsMaterial
        tl.fromTo(material, { opacity: 0.9 }, { opacity: 0.15, duration: 0.4, ease: "power1.in" }, 0.55)
      }
    },
    { scope: triggerRef, dependencies: [ingredients] }
  )

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 4]} intensity={1.7} color="#ffd9a0" />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#8fa5ff" />
      <fog attach="fog" args={["#0a0a0a", 6, 15]} />

      <group ref={groupRef}>
        <mesh rotation={[-Math.PI / 2.6, 0, 0]}>
          <circleGeometry args={[2.1, 64]} />
          <meshStandardMaterial map={texture} roughness={0.85} />
        </mesh>
      </group>

      {ingredients.map((ing, i) => (
        <IngredientMesh
          key={i}
          type={ing.type}
          position={ing.startPos}
          ref={(el) => {
            ingredientRefs.current[i] = el
          }}
        />
      ))}

      <DustParticles ref={dustRef} />
    </>
  )
}
