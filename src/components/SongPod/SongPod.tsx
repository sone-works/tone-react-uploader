import { IAudioMetadata } from 'music-metadata-browser'
import React, { useEffect, useRef, useState } from 'react'
import {
  IReleaseArtist,
  IReleaseData,
  IReleaseTag,
} from '../../types/ReleaseData'
import { ISongMetadata, songMetadataDefaults } from '../../types/SongMetadata'
import { addToTemp, getSongFileData } from '../../utils/db'
import { getMetadataFromFile } from '../../utils/metadata'
import AutoPillInput from '../AutoPillInput/AutoPillInput'
import Pill from '../AutoPillInput/Pill'
import SongLyrics from '../SongLyrics/SongLyrics'
import styles from './SongPod.module.scss'
import SongPodAudio from './SongPodAudio'
import SongPodControls from './SongPodControls'
import SongPodOptionals from './SongPodOptionals'

export interface ISongPodProps {
  index: number
  releaseData: IReleaseData
  setReleaseData: Function
  setSelectedSong: Function
}

const SongPod: React.FC<ISongPodProps> = ({
  index,
  releaseData,
  setReleaseData,
  setSelectedSong,
}) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio())
  audioElement.current?.addEventListener('play', () => setPlaying(true))
  audioElement.current?.addEventListener('pause', () => setPlaying(false))

  const fileElement = useRef<HTMLInputElement>(null)

  const [metadata, setMetadata] = useState<ISongMetadata>(songMetadataDefaults)
  const [isExpanded, setExpanded] = useState<boolean>(true)
  const [isHovering, setHovering] = useState<boolean>(false)
  const [isLoadingFile, setLoadingFile] = useState<boolean>(false)
  const [isFileLoaded, setFileLoaded] = useState<boolean>(false)
  const [isPlaying, setPlaying] = useState<boolean>(false)

  useEffect(() => {
    let songs = [...releaseData.songs]
    songs[index].meta = metadata

    setReleaseData({ ...releaseData, songs })
  }, [metadata])

  return (
    <li
      className={styles.component}
      onClick={() => setSelectedSong(index)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={styles.main}>
        <SongPodControls
          index={index}
          isHovering={isHovering}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          removePod={removePod}
        />
        <div
          className={styles.group}
          style={{ width: '50%', marginRight: '2em' }}
        >
          <h5>Song Title*</h5>
          <input
            className={styles.textInput}
            value={metadata.title}
            onChange={(e) =>
              setMetadata({ ...metadata, title: e.target.value })
            }
          />
        </div>
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileElement}
          onChange={(e) => handleFileChange(e.target.files!)}
        />
        <SongPodAudio
          index={index}
          isLoadingFile={isLoadingFile}
          isFileLoaded={isFileLoaded}
          isPlaying={isPlaying}
          audioElement={audioElement}
          onFileButtonClick={onFileButtonClick}
        />
        <div style={{ width: '5%' }} />
      </div>
      {isExpanded && (
        <div className={styles.form}>
          <div className={styles.keystones}>
            <div className={styles.row}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '30%',
                }}
              >
                <div className={styles.group} style={{ flexGrow: 1 }}>
                  <h5>Artists</h5>
                  <AutoPillInput
                    endpoint="/api/tone/artists"
                    grab="artists"
                    resultsDisplayGrab="display"
                    onRemovePill={() => {}}
                    onResultClick={(artistResult: any) => {}}
                  >
                    {releaseData.artists.length
                      ? releaseData.artists.map(
                          (artist: IReleaseArtist, i: number) => (
                            <Pill
                              key={i}
                              display={artist.display}
                              colors={{
                                primary: artist.colors.primary,
                                secondary: artist.colors.secondary,
                              }}
                              permanent={true}
                            />
                          )
                        )
                      : []}
                    <Pill
                      colors={{
                        primary: 'var(--uploader-preview-darker)',
                        secondary: 'var(--global-secondary)',
                      }}
                    />
                  </AutoPillInput>
                </div>
                <div className={styles.group} style={{ flexGrow: 1 }}>
                  <h5>Tags</h5>
                  <AutoPillInput
                    endpoint="/api/tone/tags"
                    grab="tags"
                    resultsDisplayGrab="tag"
                    onResultClick={(tagResult: any) => {}}
                    onRemovePill={() => {}}
                    addUserInput={() => {}}
                  >
                    {releaseData.tags.length
                      ? releaseData.tags.map((tag: IReleaseTag, i) => (
                          <Pill
                            key={i}
                            index={i}
                            display={tag.display}
                            permanent={true}
                            colors={{
                              primary: 'var(--uploader-preview-darker)',
                              secondary: 'var(--global-secondary)',
                            }}
                          />
                        ))
                      : []}
                    <Pill
                      colors={{
                        primary: 'var(--uploader-preview-darker)',
                        secondary: 'var(--global-secondary)',
                      }}
                    />
                  </AutoPillInput>
                </div>
              </div>
              <div className={styles.group} style={{ width: '70%' }}>
                <h5>Lyrics</h5>
                <SongLyrics
                  metadata={metadata}
                  setMetadata={setMetadata}
                  audioElement={audioElement}
                  isPlaying={isPlaying}
                />
              </div>
            </div>
          </div>
          <SongPodOptionals metadata={metadata} setMetadata={setMetadata} />
        </div>
      )}
    </li>
  )

  async function handleFileChange(files: FileList) {
    setLoadingFile(true)
    if (!files) {
      setLoadingFile(false)
      console.log('Invalid files')
    }

    if (!files.length) {
      setLoadingFile(false)
      return console.log('No files.')
    }

    const file = files[0]

    if (file.type !== 'audio/flac' && file.type !== 'audio/wav') {
      setLoadingFile(false)
      return console.log('Invalid file type.')
    }

    if (file.type == 'audio/flac') {
      const meta: IAudioMetadata = (await getMetadataFromFile(
        file
      )) as IAudioMetadata

      const title = meta.common.title || ''
      const isrc = meta.common.isrc![0] || ''
      const lyricsString =
        (await meta.native['vorbis'].find((x: any) => x.id === 'UNSYNCEDLYRICS')
          ?.value) || ''

      const lyrics = lyricsString
        .split('\n')
        .map((lyric: string) => ({ line: lyric, start: 0 }))

      setMetadata({ ...metadata, title, lyrics, isrc })
    }

    const data = await getSongFileData(file)

    audioElement.current.src = data

    await addToTemp(data)

    setLoadingFile(false)
    setFileLoaded(true)

    return console.log('File loaded and validated.')
  }

  function onFileButtonClick() {
    return fileElement.current?.click()
      ? fileElement.current?.click()
      : () => {}
  }

  function removePod(podIndex: number) {
    let updatedSongs = [...releaseData.songs]
    updatedSongs.splice(podIndex, 1)

    setReleaseData({ ...releaseData, songs: updatedSongs })
  }
}

export default SongPod
