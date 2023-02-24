import * as mm from 'music-metadata-browser'
import React, { useEffect } from 'react'
import { IReleaseData } from '../types/ReleaseData'
import { songMetadataDefaults } from '../types/SongMetadata'
import styles from '../Uploader.module.scss'
import { generateSizes } from '../utils/art'
import { saveReleaseToDb, setArtData, setSongData } from '../utils/db'
import {
  getBase64FromZip,
  getBlobFromZip,
  getFileNamesFromZip,
} from '../utils/zip'

export interface IZipImporterProps {
  releaseData: IReleaseData
  isImportFinished: boolean
  setReleaseData: Function
  setImportFinished: Function
}

const ZipImporter: React.FC<IZipImporterProps> = ({
  releaseData,
  isImportFinished,
  setReleaseData,
  setImportFinished,
}) => {
  useEffect(() => {
    if (isImportFinished) {
      console.log('Finished importing release from zip.')
      saveReleaseToDb(releaseData)
    }
  }, [isImportFinished])

  return (
    <div className={styles.importer}>
      <div className={styles.group}>
        <h5>Zip Importer</h5>
        <input type="file" onChange={(e) => handleZip(e)} />
      </div>
    </div>
  )

  async function handleZip(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files || []

    if (!files.length) return console.log('No file loaded.')

    const file = files[0]

    if (file.type !== 'application/x-zip-compressed')
      return console.log('Invalid file type.')

    const names = await getFileNamesFromZip(file)

    await getReleaseFromZip(file, names)
  }

  async function getReleaseFromZip(zipFile: File, fileNames: string[]) {
    let dataPos: number = 0
    let releaseMetaSet: boolean = false

    for await (const fileName of fileNames) {
      const last = fileName.split('.').length - 1
      const fileExtension = fileName.split('.')[last]

      if (
        fileExtension == 'jpg' ||
        fileExtension == 'jpeg' ||
        fileExtension == 'png'
      ) {
        const base64 = await getBase64FromZip(zipFile, fileName)
        const dataURL = `data:image/${fileExtension};base64,` + base64

        const artType = fileName.split('.')[0]

        const data = await generateSizes(dataURL)

        await setArtData(artType, data)
        console.log('Successfully imported art.')
      }

      if (fileExtension == 'flac') {
        const blob = await getBlobFromZip(zipFile, fileName)
        const meta = await mm.parseBlob(blob)

        const album = meta.common.album
        const index = meta.common.track.no! - 1
        const title = meta.common.title || ''
        const lyrics = await meta.native['vorbis'].find(
          (x: any) => x.id === 'UNSYNCEDLYRICS'
        )?.value

        let updated = releaseData.songs

        updated[index] = {
          ...updated[index],
          dataPos,
          meta: {
            ...songMetadataDefaults,
            title,
            lyrics: {
              string: lyrics,
              lines: [],
            },
          },
        }

        const base64 = await getBase64FromZip(zipFile, fileName)
        const dataURL = 'data:audio/flac;base64,' + base64

        await setSongData(dataPos, 'flac', dataURL)
        console.log(`Data set in data position ${dataPos}.`)

        if (!releaseMetaSet) {
          setReleaseData({
            ...releaseData,
            meta: { ...releaseData.meta, title: album },
            songs: updated,
          })
        } else {
          setReleaseData({ ...releaseData, songs: updated })
        }

        dataPos++
      }
    }

    setImportFinished(true)
  }
}

export default ZipImporter
