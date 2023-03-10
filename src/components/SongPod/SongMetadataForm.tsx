import localforage from 'localforage'
import React, { useEffect, useRef, useState } from 'react'
import { IReleaseData } from '../../types/ReleaseData'
import { ISongMetadata, songMetadataDefaults } from '../../types/SongMetadata'
import {
  addToTemp,
  getSongCountFromDb,
  getSongFileData,
  tempToReleaseDb,
} from '../../utils/db'
import { getMetadataFromFile } from '../../utils/metadata'
import styles from '../Uploader.module.scss'

export interface ISongMetadataFormProps {
  selectedSong: number | null
  releaseData: IReleaseData
  setReleaseData: Function
}

const SongMetadataForm: React.FC<ISongMetadataFormProps> = ({
  selectedSong,
  releaseData,
  setReleaseData,
}) => {
  const [isFileEmpty, setFileEmpty] = useState<boolean>(false)
  const [isValidFiletype, setValidFiletype] = useState<boolean>(false)
  const [importMetadata, setImportMetadata] = useState<boolean>(false)
  const [metadata, setMetadata] = useState<ISongMetadata>(songMetadataDefaults)
  const [lyricsString, setLyricsString] = useState<string>('')
  const [lyricsLanguage, setLyricsLanguage] = useState<string>('')

  const audioElement = useRef<HTMLAudioElement>(null)
  const fileElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedSong) {
      let songs = releaseData.songs
      songs[selectedSong] = { ...songs[selectedSong], meta: metadata }
      setReleaseData({ ...releaseData, songs })
    }
  }, [metadata])

  useEffect(() => {
    const lines =
      lyricsString && lyricsString.length ? lyricsString.split(/\n/g) : []

    const updated = {
      ...metadata,
      lyrics: { ...metadata.lyrics, string: lyricsString, lines },
    }

    setMetadata(updated)
    !lines.length && setLyricsString('')
  }, [lyricsString])

  useEffect(() => {
    loadAudio()

    if (selectedSong == null) {
      setMetadata(songMetadataDefaults)
      setLyricsString('')
    } else {
      setMetadata(releaseData.songs[selectedSong].meta)
      setLyricsString(releaseData.songs[selectedSong].meta.lyrics!.string)
    }
  }, [selectedSong])

  return (
    <div className={styles.songMetadata}>
      <div className={styles.group}>
        <audio ref={audioElement} controls></audio>
      </div>
      <div className={styles.group}>
        <h5>File*</h5>
        <input type="file" ref={fileElement} onChange={(e) => handleFile(e)} />
        <div style={{ display: 'flex' }}>
          <input
            name="metadata"
            type="checkbox"
            onChange={(e) => setImportMetadata(e.target.checked)}
          />
          Import Metadata from file
        </div>
      </div>
      <div className={styles.group}>
        <h5>Title*</h5>
        <input
          type="text"
          onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
          value={metadata.title}
        />
      </div>
      <div className={styles.group}>
        <h5>Artist(s)*</h5>
        <input
          type="text"
          onChange={(e) =>
            setMetadata({ ...metadata, artists: e.target.value })
          }
          value={metadata.artists}
        />
      </div>
      <div className={styles.group}>
        <h5>Lyrics</h5>
        <textarea
          onChange={(e) => setLyricsString(e.target.value)}
          value={lyricsString}
        />
        <h5>Lyrics Language</h5>
        <input
          type="text"
          onChange={(e) => setLyricsLanguage(e.target.value)}
          value={lyricsLanguage}
        />
        <p>
          There will be a lyrics component in the final that will allow for line
          timestamping for synced lyrics.
        </p>
      </div>
      <div className={styles.group}>
        <h5>Tags</h5>
        <input
          type="text"
          onChange={(e) => setMetadata({ ...metadata, tags: e.target.value })}
          value={metadata.tags}
        />
      </div>
      <div className={styles.group}>
        <h5>ISRC</h5>
        <input
          type="text"
          onChange={(e) => setMetadata({ ...metadata, isrc: e.target.value })}
          value={metadata.isrc}
        />
      </div>
      <div className={styles.group}>
        <h5>ISWC</h5>
        <input
          type="text"
          onChange={(e) => setMetadata({ ...metadata, iswc: e.target.value })}
          value={metadata.iswc}
        />
      </div>
      <div className={styles.group}>
        <h5>BPM</h5>
        <input
          type="text"
          onChange={(e) =>
            setMetadata({ ...metadata, bpm: parseInt(e.target.value) })
          }
          value={metadata.bpm}
        />
      </div>
      <div className={styles.group}>
        <h5>Key</h5>
        <input
          type="text"
          onChange={(e) => setMetadata({ ...metadata, key: e.target.value })}
          value={metadata.key}
        />
      </div>
      <div className={styles.group}>
        <h5>Recorded At</h5>
        <input
          type="text"
          onChange={(e) =>
            setMetadata({ ...metadata, recordedAt: e.target.value })
          }
          value={metadata.recordedAt}
        />
      </div>
      <div className={styles.group}>
        <h5>Location Created</h5>
        <input
          type="text"
          onChange={(e) =>
            setMetadata({ ...metadata, locationCreated: e.target.value })
          }
          value={metadata.locationCreated}
        />
      </div>
      {!selectedSong && (
        <button onClick={() => addSongtoRelease()}>Add Song to Release</button>
      )}
    </div>
  )

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files || []
    const file = files[0]

    if (!file) return setFileEmpty(true)

    if (file.type !== 'audio/flac' && file.type !== 'audio/wav') {
      return setValidFiletype(false)
    }

    setFileEmpty(false)
    setValidFiletype(true)

    if (file.type == 'audio/flac') {
      if (importMetadata) {
        const meta: any = await getMetadataFromFile(file)
        const lyrics = await meta.native['vorbis'].find(
          (x: any) => x.id === 'UNSYNCEDLYRICS'
        )?.value

        setMetadata({ ...metadata, title: meta.common.title })
        setLyricsString(lyrics)
      }
    }

    const data = await getSongFileData(file)

    audioElement.current!.src = data

    await addToTemp(data)
    return console.log('File loaded and validated.')
  }

  async function addSongtoRelease() {
    console.log('Adding song to release...')
    if (selectedSong !== null) return console.log('Invalid song index')

    if (isFileEmpty || !isValidFiletype) return console.log('Invalid file')

    if (!metadata.title) return console.log('Invalid title')

    if (!metadata.artists) return console.log('Invalid artists')
    console.log('Checks passed.')

    console.log('Getting data position...')
    const dataPos = await getSongCountFromDb()
    console.log({ dataPos })

    console.log('Moving temporary release files to real release...')
    await tempToReleaseDb()
    console.log('Files moved successfully...')

    setReleaseData({
      ...releaseData,
      songs: [...releaseData.songs, { dataPos, meta: metadata }],
    })
    console.log('Updated releaseData.')

    clearForm()
    console.log('Cleared form.')

    return console.log('Song added successfully')
  }

  async function loadAudio() {
    if (selectedSong === null) {
      audioElement.current!.src = ''
      return console.log('Audio element emptied.')
    }

    const songs: any = (await localforage.getItem('tone-uploader-songs')) || []
    if (!songs.length) return console.log('No songs in database.')

    if (!songs[selectedSong] || !songs[selectedSong].data)
      return console.log('No data stored for selected song.')

    const dataURL = songs[selectedSong].data
    audioElement.current!.src = dataURL

    return console.log('Audio loaded for selected song.')
  }

  async function clearForm() {
    setMetadata(songMetadataDefaults)
    setLyricsString('')
    setLyricsLanguage('')
    audioElement.current!.src = ''
    fileElement.current!.value = ''
  }
}

export default SongMetadataForm
