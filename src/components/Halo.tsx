import React from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Halo() {
  const meshRef = React.useRef<THREE.Mesh>(null)

  useFrame(() => {
    const scale = 1 + 0.03 * Math.sin(Date.now() * 0.001)
    meshRef.current?.scale.set(scale, scale, scale)
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial color={0xf4f3f9} transparent opacity={0.05} side={THREE.BackSide} />
    </mesh>
  )
}