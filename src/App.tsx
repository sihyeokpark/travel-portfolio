import { ContinentsState, TravelState } from './utils/recoil'
import { useRecoilState } from 'recoil'

import { Earth } from './components/Earth'

import { getImageArray } from './utils/getImageArray'
import { useEffect } from 'react'

const N = 8
const MIN_CONTINENT_SIZE = N*N / 3

function App() {
  const [continentsState, setContinentsState] = useRecoilState(ContinentsState)
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
              for (let k = 0; k < travelState.continents.length; k++) {
                if (i + y === travelState.continents[k][1] && j + x === travelState.continents[k][0]) {
                  isTraveled = true
                  // travelState.continents.splice(1, k)
                }
              }
            }
          }
          if (isTraveled) continents[i/N].push(2)
          else if (count > MIN_CONTINENT_SIZE) continents[i/N].push(1)
          else continents[i/N].push(0)
        }
      }
  
      setContinentsState({ continents })
    })
  }, [])
  

  return (
    <>
      <h1 className='title'>EXON</h1>
      <Earth></Earth>
    </>
  )
}

export default App
