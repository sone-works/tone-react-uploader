export async function generateSizes(dataURL: string) {
  // large: 1000 x 1000
  // medium: 350 x 350
  // small: 120 x 120
  // thumb: 28 x 28

  return {
    full: dataURL,
    large: await resizeImage(dataURL, 1000, 1000),
    medium: await resizeImage(dataURL, 350, 350),
    small: await resizeImage(dataURL, 120, 120),
    thumb: await resizeImage(dataURL, 28, 28),
  }
}

export async function resizeImage(
  dataURL: string,
  height: number,
  width: number
) {
  const resized: string = await new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const image = new Image()

    image.addEventListener('load', () => {
      canvas.width = width
      canvas.height = height

      ctx?.drawImage(image, 0, 0, width, height)
      resolve(canvas.toDataURL())
    })

    image.src = dataURL
  })

  return resized
}
