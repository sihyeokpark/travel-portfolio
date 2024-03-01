import * as THREE from 'three'
import { useRecoilState } from 'recoil'
import { Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

import { ContinentsTypeState, TravelState } from '../utils/recoil'

import { CONTINENT } from '../utils/enum/continent'
import { getImageArray } from '../utils/getImageArray'

const N = 8
const MIN_CONTINENT_SIZE = N*N / 3
const CONTINET_SLICE = 0

type ContinentProps = { startAngle: number, earthRadius: number, size: number, y: number, speed: number, color: number }

export function Continents({ earthRadius }: { earthRadius: number }) {
  const [continentsTypeState, setContinentsTypeState] = useRecoilState(ContinentsTypeState)

  const [continents, setContinents] = useState<number[][]>([])

  const START_ANGLE = Math.PI*1/3

  useEffect(() => {
    console.log(continentsTypeState)

    const unitY = earthRadius*2 / continentsTypeState.length

    const continentSpheres = []

    for (let i = 0; i < continentsTypeState.length; i++) {
      const y = earthRadius - i * unitY
      for (let j = 0; j < continentsTypeState[i].length; j++) {
        if (continentsTypeState[i][j] !== 0) {
          const startAngle = j * 2 * Math.PI / continentsTypeState[i].length + START_ANGLE
          continentSpheres.push([startAngle, y, continentsTypeState[i][j]])
        }
      }
    }
    setContinents(continentSpheres)
  }, [continentsTypeState])

  return (
    <>
      {
        continents.map((continent, i) => {
          return <Continent key={i} startAngle={continent[0]} earthRadius={earthRadius} size={continent[2] === 2 ? 0.07 : 0.03} y={continent[1]} color={continent[2] === 2 ? 0xffffff: 0xffffff} speed={0.005}/>
        })
      }
    </>
  )
}

export function MakeWorldMap() {
  const [continentsTypeState, setContinentsTypeState] = useRecoilState(ContinentsTypeState)
  const [travelState, setTravelState] = useRecoilState(TravelState)

  function loadImage(url: string, callback: (image: HTMLImageElement) => void) {
    const image = new Image()
    image.onload = () => callback(image)
    image.src = url
  }

  function readPixels(image: HTMLImageElement) {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context!.drawImage(image, 0, 0)

    const imageData = context!.getImageData(0, 0, canvas.width, canvas.height)
    return imageData.data
  }

  useEffect(() => {
    loadImage('/world.png', (image) => {
      const pixels = readPixels(image)
      const imageArray = getImageArray(pixels, image.width, image.height)
      console.log(imageArray)
  
      const continents: number[][] = []
      for (let i = 0; i < image.height; i += N) {
        continents.push([])
        for (let j = 0; j < image.width; j += N) {
          let count = 0
          let isTraveled = false
          for (let y = 0; y < N; y++) {
            for (let x = 0; x < N; x++) {
              if (imageArray[i + y][j + x] > 0) count++
              for (let k = 0; k < travelState.length; k++) {
                if (i + y === travelState[k][1] && j + x === travelState[k][0]) {
                  isTraveled = true
                  // travelState.splice(1, k)
                }
              }
            }
          }
          if (isTraveled) continents[i/N].push(CONTINENT.TRAVELED_LAND)
          else if (count > MIN_CONTINENT_SIZE) continents[i/N].push(CONTINENT.UNTRAVELED_LAND)
          else continents[i/N].push(CONTINENT.SEE)
        }
      }
      
      setContinentsTypeState(continents.slice(CONTINET_SLICE, -CONTINET_SLICE))
    })
  }, [])

  return (
    <></>
  )
}

function Continent({ startAngle, earthRadius, size, y, speed, color }: ContinentProps) {
  const sphereRef = useRef<THREE.Mesh>(null)

  const truncatedCircleArea = (Math.pow(earthRadius, 2) - Math.pow(y, 2)) * Math.PI
  const truncatedCircleRadius = Math.sqrt(truncatedCircleArea / Math.PI)

  let angle = startAngle
  useFrame(() => {
    if (sphereRef.current!.position.z < 0) sphereRef.current!.visible = false // Hide the sphere if it's behind the earth.. it will be replace with smart optimize about a camera view
    else sphereRef.current!.visible = true
    sphereRef.current!.position.x = Math.sin(angle) * truncatedCircleRadius
    sphereRef.current!.position.z = Math.cos(angle) * truncatedCircleRadius
    angle += speed
  })

  // const handleOnMouse = (event: ThreeEvent<PointerEvent>) => {
  //   // event.object.scale.set(2, 2, 2)
  // }

  return (
    <Sphere ref={sphereRef} args={[size, 16, 16]} position={[0, y, 0]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  )
}