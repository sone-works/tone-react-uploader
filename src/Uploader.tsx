import { Page } from '@sone-dao/tone-react-containers'
import React, { useEffect, useState } from 'react'
import ReleaseArtForm from './components/ReleaseArtForm'
import ReleaseMetadataForm from './components/ReleaseMetadataForm'
import SongManager from './components/SongManager'
import UploaderSection from './components/UploaderSection'
import ZipImporter from './components/ZipImporter'
import { IReleaseData, releaseDataDefaults } from './types/ReleaseData'
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
    <Page className={styles.page}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <UploaderSection style={{ borderBottom: '1px solid rgba(0,0,0,0.2' }}>
          <ZipImporter
            releaseData={releaseData}
            isImportFinished={importFinished}
            setReleaseData={setReleaseData}
            setImportFinished={setImportFinished}
          />
        </UploaderSection>
        <UploaderSection style={{ borderBottom: '1px solid rgba(0,0,0,0.2' }}>
          <div className={styles.column}>
            <ReleaseArtForm
              importFinished={importFinished}
              checkedForSave={checkedForSave}
            />
            {/* Release color scheme stuff here */}
          </div>
          <div className={styles.column}>
            <ReleaseMetadataForm
              releaseData={releaseData}
              setReleaseData={setReleaseData}
            />
          </div>
        </UploaderSection>
        <UploaderSection>
          <SongManager
            releaseData={releaseData}
            setReleaseData={setReleaseData}
          />
        </UploaderSection>
      </form>
    </Page>
  )

  async function initializeUploader() {
    const savedData = await getSavedRelease()

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
