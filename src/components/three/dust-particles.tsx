import * as React from "react"
import * as THREE from "three"

const PARTICLE_COUNT = 220

export const DustParticles = React.forwardRef<THREE.Points>(function DustParticles(_props, ref) {
  const positions = React.useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4.5
      arr[i * 3 + 1] = Math.random() * 3 + 0.2
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    return arr
  }, [])

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#f5efe0" size={0.02} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
})
