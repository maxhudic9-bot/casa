import * as React from "react"
import type { Mesh } from "three"

export type IngredientType = "rucola" | "tomato" | "prosciutto" | "burrata"

interface IngredientMeshProps {
  type: IngredientType
  position: [number, number, number]
}

// Stilisierte, prozedural gebaute Formen (keine echten 3D-Modelle/Fotos) -
// bewusst einfach gehalten, damit die Szene performant bleibt.
export const IngredientMesh = React.forwardRef<Mesh, IngredientMeshProps>(
  function IngredientMesh({ type, position }, ref) {
    switch (type) {
      case "rucola":
        return (
          <mesh ref={ref} position={position} scale={[1, 1, 0.15]}>
            <icosahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color="#3f6b2f" roughness={0.7} />
          </mesh>
        )
      case "tomato":
        return (
          <mesh ref={ref} position={position} scale={[1, 1, 0.6]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#c0392b" roughness={0.35} />
          </mesh>
        )
      case "prosciutto":
        return (
          <mesh ref={ref} position={position} scale={[1, 0.7, 0.08]}>
            <boxGeometry args={[0.42, 0.32, 1]} />
            <meshStandardMaterial color="#e2a893" roughness={0.6} />
          </mesh>
        )
      case "burrata":
        return (
          <mesh ref={ref} position={position}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#f7f2e7" roughness={0.4} />
          </mesh>
        )
      default:
        return null
    }
  }
)
