import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls, useTexture } from '@react-three/drei'
import { FrontSide } from 'three'

export function Globe() {
  // const mapcap = useTexture('../assets/afe.png')
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    meshRef.current!.rotation.y += 0.01
  })

  return (
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 45*Math.PI/180, 0]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial 
          visible={true}
          transparent={false}
          opacity={1}
          depthTest={true}
          depthWrite={true}
          side={FrontSide}

          color={0x4e4cda}
          metalness={0} 

        />
      </mesh>
  )
}