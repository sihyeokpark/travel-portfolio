import { ContinentsState } from './utils/recoil'
import { useRecoilState } from 'recoil'

import { Earth } from './components/Earth'

import { getImageArray } from './utils/getImageArray'
import { useEffect } from 'react'

const N = 5
const MIN_CONTINENT_SIZE = N*N / 3

function App() {
  const [continentsState, setContinentsState] = useRecoilState(ContinentsState)

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
    loadImage('/public/world.png', (image) => {
      const pixels = readPixels(image)
      const imageArray = getImageArray(pixels, image.width, image.height)
      console.log(imageArray)
  
      const continents: number[][] = []
      for (let i = 0; i < image.height; i += N) {
        continents.push([])
        for (let j = 0; j < image.width; j += N) {
          let count = 0
          for (let y = 0; y < N; y++) {
            for (let x = 0; x < N; x++) {
              if (imageArray[i + y][j + x] > 0) count++
            }
          }
          if (count > MIN_CONTINENT_SIZE) continents[i/N].push(1)
          else continents[i/N].push(0)
        }
      }
  
      setContinentsState({ continents })
    })
  }, [])
  

  return (
    <>
      <Earth></Earth>
    </>
  )
}

export default App
