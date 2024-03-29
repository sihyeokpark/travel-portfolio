import { useRef } from 'react'
import * as THREE from 'three'

import { Continents } from './Continent'

export function Globe({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial 
          visible={true}
          transparent={false}
          opacity={1}
          side={THREE.FrontSide}

          color={0x4e4cda}
          metalness={0} 
          emissiveIntensity={0.1}
          emissive="blue"
        />
      </mesh>
      <Continents earthRadius={radius}/>
    </>
  )
}