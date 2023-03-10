import { Page } from '@sone-dao/tone-react-containers'
import React, { useEffect, useState } from 'react'
import SongManager from './components/SongManager'
import UploaderHeader from './components/UploaderHeader'
import UploaderSticky from './components/UploaderSticky'
import {
  IReleaseArtist,
  IReleaseData,
  releaseDataDefaults,
} from './types/ReleaseData'
import styles from './Uploader.module.scss'
import {
  getSavedRelease,
  initializeReleaseDb,
  saveReleaseToDb,
  setReleaseArt,
  setReleaseSongs,
} from './utils/db'

export interface IUploaderProps {}

const Uploader: React.FC<IUploaderProps> = () => {
  const [checkedForSave, setCheckedForSave] = useState<boolean>(false)
  const [importFinished, setImportFinished] = useState<boolean>(false)
  const [releaseData, setReleaseData] =
    useState<IReleaseData>(releaseDataDefaults)

  const artistDisplays = releaseData.artists.map(
    (artist: IReleaseArtist) => artist.display
  )
  const songCount = releaseData.songs.length

  useEffect(() => {
    initializeUploader()
  }, [])

  useEffect(() => {
    if (checkedForSave) {
      const timer = setInterval(async () => {
        console.log('Autosaving...')
        await saveReleaseToDb(releaseData)
      }, 30000)
      return () => clearInterval(timer)
    }
  }, [checkedForSave, releaseData])

  //useEffect(() => console.log(releaseData), [releaseData])

  return (
    <div className={styles.component}>
      <Page className={styles.page}>
        <h1>Upload your release</h1>
        <UploaderHeader
          releaseData={releaseData}
          setReleaseData={setReleaseData}
        />
        <SongManager
          releaseData={releaseData}
          setReleaseData={setReleaseData}
        />
      </Page>
      <UploaderSticky
        artistDisplays={artistDisplays}
        title={releaseData.meta.title}
        songCount={songCount}
      />
    </div>
  )

  async function initializeUploader() {
    console.log('Checking for save...')
    const savedData = await getSavedRelease()
    console.log({ savedData })

    if (savedData.saved) {
      console.log('Release found, loading release...')

      setReleaseData(savedData.releaseData)
      await setReleaseArt(savedData.releaseArt)
      await setReleaseSongs(savedData.releaseSongs)

      console.log('Saved release loaded.')

      return setCheckedForSave(true)
    }

    console.log('No release found, initializing new release...')
    await initializeReleaseDb()

    console.log('New release initialized.')
    return setCheckedForSave(true)
  }
}

export default Uploader
