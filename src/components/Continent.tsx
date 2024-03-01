import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Sphere } from '@react-three/drei'
import { ContinentsState } from '../utils/recoil'
import { useRecoilState } from 'recoil'

type ContinentProps = { startAngle: number, earthRadius: number, size: number, y: number, speed: number, color: number }

function Continent({ startAngle, earthRadius, size, y, speed, color }: ContinentProps) {
  const sphereRef = useRef<THREE.Mesh>(null)

  const truncatedCircleArea = (Math.pow(earthRadius, 2) - Math.pow(y, 2)) * Math.PI
  const truncatedCircleRadius = Math.sqrt(truncatedCircleArea / Math.PI)

  let angle = startAngle
  useFrame(() => {
    sphereRef.current!.position.x = Math.sin(angle) * truncatedCircleRadius;
    sphereRef.current!.position.z = Math.cos(angle) * truncatedCircleRadius;
    angle += speed;
  })

  return (
    <Sphere ref={sphereRef} args={[size, 16, 16]} position={[0, y, 0]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}

export function Continents({ earthRadius }: { earthRadius: number }) {
  const [continentsState, setContinentsState] = useRecoilState(ContinentsState)

  const [continents, setContinents] = useState<number[][]>([])

  const START_ANGLE = Math.PI*1/3

  useEffect(() => {
    console.log(continentsState)

    const continents: number[][] = continentsState.continents
    const unitY = earthRadius*2 / continents.length

    const newContinents = []

    for (let i = 0; i < continents.length; i++) {
      const y = earthRadius - i * unitY
      for (let j = 0; j < continents[i].length; j++) {
        if (continents[i][j] !== 0) {
          const startAngle = j * 2 * Math.PI / continents[i].length + START_ANGLE
          newContinents.push([startAngle, y, continents[i][j]])
        }
      }
    }

    setContinents(newContinents)

  }, [continentsState])

  return (
    <>
      {
        continents.map((list, i) => {
          return <Continent key={i} startAngle={list[0]} earthRadius={earthRadius} size={list[2] === 2 ? 0.07 : 0.03} y={list[1]} color={list[2] === 2 ? 0xffffff: 0xffffff} speed={0.005}/>
        })
      }
    </>
  )
}
