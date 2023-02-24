import * as mm from 'music-metadata-browser'
import { getSongFileData } from './db'

export async function getMetadataFromFile(file: File) {
  const url = await getSongFileData(file)

  return new Promise(async (resolve, reject) => {
    const blob: Blob = (await fetch(url)
      .then((response) => response.blob())
      .catch((error) => reject(error))) as Blob //lol

    const meta = await mm.parseBlob(blob)
    resolve(meta)
  })
}
