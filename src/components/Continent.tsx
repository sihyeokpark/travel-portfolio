import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Sphere } from '@react-three/drei'

type ContinentProps = { startAngle: number, earthRadius: number, size: number, y: number, speed: number }

function Continent({ startAngle, earthRadius, size, y, speed }: ContinentProps) {
  const sphereRef = useRef<THREE.Mesh>(null)

  const truncatedCircleArea = (Math.pow(earthRadius, 2) - Math.pow(y, 2)) * Math.PI
  const truncatedCircleRadius = Math.sqrt(truncatedCircleArea / Math.PI)
  console.log(truncatedCircleRadius)


  let angle = startAngle
  useFrame(() => {
    sphereRef.current!.position.x = Math.sin(angle) * truncatedCircleRadius;
    sphereRef.current!.position.z = Math.cos(angle) * truncatedCircleRadius;
    angle += speed;
  })

  return (
    <Sphere ref={sphereRef} args={[size, 16, 16]} position={[0, y, 0]}>
      <meshStandardMaterial color="white" />
    </Sphere>
  )
}

export function Continents({ earthRadius }: { earthRadius: number }) {

  return (
    <>
      {
        [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => {
          return <Continent startAngle={Math.random()*2*Math.PI} earthRadius={earthRadius} size={0.08} y={y} speed={0.01}/>
        })
      }
      
    </>

  )
}

