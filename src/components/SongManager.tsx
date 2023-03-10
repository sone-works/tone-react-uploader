import React, { useEffect, useState } from 'react'
import { IReleaseData } from '../types/ReleaseData'
import { songDataDefaults } from '../types/SongData'
import styles from '../Uploader.module.scss'
import SongPod from './SongPod/SongPod'
import UploaderSection from './UploaderSection'

export interface ISongManagerProps {
  releaseData: IReleaseData
  setReleaseData: Function
}

const SongManager: React.FC<ISongManagerProps> = ({
  releaseData,
  setReleaseData,
}) => {
  const [selectedSong, setSelectedSong] = useState<number>(0)

  useEffect(() => console.log(releaseData), [releaseData])

  return (
    <UploaderSection style={{ marginTop: '1em' }}>
      <ul className={styles.manager}>
        <li className={styles.addSong}>
          <button onClick={() => addNewSong()}>
            <i className="fa-sharp fa-solid fa-plus-large" />
          </button>
        </li>
        {releaseData.songs.length ? (
          releaseData.songs.map((song, i) => (
            <SongPod
              key={i}
              index={i}
              selectedSong={selectedSong}
              releaseData={releaseData}
              setReleaseData={setReleaseData}
              setSelectedSong={setSelectedSong}
            />
          ))
        ) : (
          <li className={styles.noSongs}>No songs added to release.</li>
        )}
      </ul>
    </UploaderSection>
  )

  async function addNewSong() {
    console.log('yup, you clicked it!')
    return setReleaseData({
      ...releaseData,
      songs: [...releaseData.songs, songDataDefaults],
    })
  }

  async function deleteSong(index: number) {
    const songs = releaseData.songs
      .map((song, i) => (i == index ? null : song))
      .filter(Boolean)

    setReleaseData({ ...releaseData, songs })
  }
}

export default SongManager
