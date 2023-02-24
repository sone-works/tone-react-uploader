import localforage from 'localforage'
import { IArtData, IReleaseArt, releaseArtDefaults } from '../types/ReleaseArt'
import { IReleaseData } from '../types/ReleaseData'
import { IReleaseSong, releaseSongDefaults } from '../types/ReleaseSong'

export async function initializeReleaseDb() {
  await localforage
    .setItem('tone-uploader-songs', [])
    .catch((error) => console.log(error))

  await localforage
    .setItem('tone-uploader-art', releaseArtDefaults)
    .catch((error) => console.log(error))
}

export async function getSongFileData(file: File) {
  const data: string = await new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('loadend', () => {
      if (!reader.result) reject()

      const result = reader.result as string
      resolve(result)
    })

    reader.readAsDataURL(file)
  })

  return data || ''
}

export async function setSongData(
  index: number,
  fileType: string,
  dataURL: string
) {
  const songs: IReleaseSong[] =
    (await localforage.getItem('tone-uploader-songs')) || []

  let updated = songs

  if (!updated[index]) updated[index] = releaseSongDefaults

  updated[index] = { data: dataURL, type: fileType }

  await localforage
    .setItem('tone-uploader-songs', updated)
    .catch((error) => console.log(error))
}

export async function setReleaseArt(releaseArt: IReleaseArt) {
  return await localforage
    .setItem('tone-uploader-art', releaseArt)
    .then(() => console.log('Loaded release art from save.'))
    .catch(() => console.log('Failed to load art data from save.'))
}

export async function setArtData(type: string, data: IArtData) {
  const art: IReleaseArt =
    (await localforage.getItem('tone-uploader-art')) || releaseArtDefaults

  const updated = { ...art, [type]: data }

  await localforage.setItem('tone-uploader-art', updated)

  console.log('Art updated.', { type })
}

export async function setReleaseSongs(releaseSongs: IReleaseSong[]) {
  return await localforage
    .setItem('tone-uploader-songs', releaseSongs)
    .then(() => console.log('Loaded release art from save.'))
    .catch(() => console.log('Failed to load art data from save.'))
}

export async function getSongFromDb(index: number) {
  const songs: IReleaseSong[] =
    (await localforage.getItem('tone-uploader-songs')) || []

  if (!songs.length) return console.log('No songs in DB')

  return songs[index]
}

export async function getSongCountFromDb() {
  const songs: any = (await localforage.getItem('tone-uploader-songs')) || []

  return songs.length ? songs.length : 0
}

export async function addToTemp(data: string) {
  return await localforage.setItem('tone-uploader-temp', data)
}

export async function tempToReleaseDb() {
  const temp = (await localforage.getItem('tone-uploader-temp')) as string
  let updated = (await localforage.getItem('tone-uploader-songs')) as string[]

  updated.push(temp)

  await localforage.setItem('tone-uploader-songs', updated)
  return await localforage.setItem('tone-uploader-temp', '')
}

export async function saveReleaseToDb(releaseData: IReleaseData) {
  const releaseArt: any = await localforage.getItem('tone-uploader-art')
  const releaseSongs: any = await localforage.getItem('tone-uploader-songs')

  return await localforage
    .setItem('tone-uploader-save', {
      saved: true,
      releaseData,
      releaseArt,
      releaseSongs,
    })
    .then(() => console.log('Saved release successfully.'))
    .catch((error) => console.log('Error saving release', error))
}

export async function getSavedRelease() {
  const save: any = (await localforage.getItem('tone-uploader-save')) || {
    saved: false,
  }

  return save
}

export async function clearSavedRelease() {
  return await localforage
    .setItem('tone-uploader-save', null)
    .then(() => console.log('Saved release cleared.'))
    .catch((error) => console.log('Error clearing save.', { error }))
}
