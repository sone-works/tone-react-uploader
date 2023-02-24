import React, { useState } from 'react'
import { IReleaseData } from '../types/ReleaseData'
import styles from '../Uploader.module.scss'
import SongMenuItem from './SongMenuItem'
import SongMetadataForm from './SongMetadataForm'

export interface ISongManagerProps {
  releaseData: IReleaseData
  setReleaseData: Function
}

const SongManager: React.FC<ISongManagerProps> = ({
  releaseData,
  setReleaseData,
}) => {
  const [selectedSong, setSelectedSong] = useState<number | null>(null)

  return (
    <div className={styles.manager}>
      <ul>
        <SongMenuItem
          songIndex={null}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          deleteSong={deleteSong}
        >
          ➕
        </SongMenuItem>
        {releaseData.songs.map((song, i) => (
          <SongMenuItem
            key={i}
            songIndex={i}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            deleteSong={deleteSong}
          >
            {song.meta.title}
          </SongMenuItem>
        ))}
      </ul>
      <SongMetadataForm
        selectedSong={selectedSong}
        releaseData={releaseData}
        setReleaseData={setReleaseData}
      />
    </div>
  )

  async function deleteSong(index: number) {
    const songs = releaseData.songs
      .map((song, i) => (i == index ? null : song))
      .filter(Boolean)

    setReleaseData({ ...releaseData, songs })
    setSelectedSong(null)
  }
}

export default SongManager
