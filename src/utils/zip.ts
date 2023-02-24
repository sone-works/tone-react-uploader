import JSZip from 'jszip'

export async function getFileNamesFromZip(file: File) {
  const files: string[] = await JSZip.loadAsync(file).then((zip) => {
    let names: string[] = []

    zip.forEach((path) => {
      names.push(path)
    })

    return names
  })

  return files
}

export async function getBase64FromZip(zipFile: File, fileName: string) {
  const base64: string = await new Promise(async (resolve, reject) => {
    await JSZip.loadAsync(zipFile).then((zip) => {
      zip
        .file(fileName)
        ?.async('base64')
        .then((data) => resolve(data))
    })
  })

  return base64
}

export async function getBlobFromZip(zipFile: File, fileName: string) {
  const blob: Blob = await new Promise(async (resolve, reject) => {
    await JSZip.loadAsync(zipFile).then((zip) => {
      zip
        .file(fileName)
        ?.async('blob')
        .then((data) => resolve(data))
    })
  })

  return blob
}
