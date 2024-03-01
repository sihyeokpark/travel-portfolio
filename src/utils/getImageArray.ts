export function getImageArray(pixels: Uint8ClampedArray, width: number, height: number) {
  const RGBArray = []
  
  for (let i = 0; i < pixels.length; i += 4) {
    const a = pixels[i + 3]
    RGBArray.push(a)
  }

  const imageArray = []
  for (let i = 0; i < height; i++) {
    const row = []
    for (let j = 0; j < width; j++) {
      const index = i * width + j
      row.push(RGBArray[index])
    }
    imageArray.push(row)
  }

  return imageArray
}