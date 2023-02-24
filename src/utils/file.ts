export async function getDataURLFromFile(file: File) {
  const dataURL: string = await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('loadend', () => {
      if (!reader.result) reject()
      resolve(reader.result as string)
    })

    reader.readAsDataURL(file)
  })

  return dataURL
}
