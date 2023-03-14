import React, { useEffect, useState } from 'react'
import { ILyric, ISongMetadata, lyricDefaults } from '../../types/SongMetadata'
import SongLyric from './SongLyric'
import styles from './SongLyrics.module.scss'

export interface ISongLyricsProps {
  metadata: ISongMetadata
  isPlaying: boolean
  audioElement: React.RefObject<HTMLAudioElement>
  setMetadata: Function
}

const SongLyrics: React.FC<ISongLyricsProps> = ({
  metadata,
  setMetadata,
  audioElement,
  isPlaying,
}) => {
  const lyricsDefault = metadata.lyrics || []

  const [lyrics, setLyrics] = useState<ILyric[]>(lyricsDefault)
  const [currentLyric, setCurrentLyric] = useState<number>(0)

  audioElement.current?.addEventListener('timeupdate', () =>
    checkForNextLyric()
  )

  useEffect(() => {
    setLyrics(metadata.lyrics || [])
  }, [metadata.lyrics])

  useEffect(() => {
    !lyrics.length && addLyric()
    setMetadata({ ...metadata, lyrics })
  }, [lyrics])

  return (
    <div className={styles.component}>
      <div className={styles.header}>
        <span>Lyric</span>
        <span>Start Time</span>
      </div>
      <div className={styles.container}>
        {lyrics.length &&
          lyrics.map((lyric, i) => (
            <SongLyric
              key={i}
              index={i}
              line={lyric.line}
              start={lyric.start}
              isPlaying={isPlaying}
              currentLyric={currentLyric}
              setLine={setLine}
              setStart={setStart}
              jotTime={jotTime}
            />
          ))}
        <div className={styles.add} onClick={() => addLyric()}>
          <i className="fa-sharp fa-solid fa-plus-large" />
        </div>
      </div>
    </div>
  )

  function addLyric() {
    setLyrics([...lyrics, lyricDefaults])
  }

  function setLine(index: number, line: string) {
    const lines = line.split('\n')

    if (lines.length > 1) {
      if (index > 0) {
        const firstHalf = lyrics.slice(0, index)
        const secondHalf = lyrics.slice(index + 1)

        const newLines = lines.map((line) => ({ line, start: 0 }))
        const newLyrics = [...firstHalf, ...newLines, ...secondHalf]

        setLyrics(newLyrics)
      } else {
        const newLyrics = lines.map((line) => ({ line, start: 0 }))
        setLyrics(newLyrics)
      }
    } else {
      const newLine = { ...lyrics[index], line }
      let newLyrics = [...lyrics]

      newLyrics[index] = newLine
      setLyrics(newLyrics)
    }
  }

  function setStart(index: number, start: string) {
    const updatedLine = { ...lyrics[index], start: parseInt(start) }
    let updatedLyrics = [...lyrics]

    updatedLyrics[index] = updatedLine
    setLyrics(updatedLyrics)
  }

  function jotTime(
    index: number,
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    const start = Math.round(audioElement.current?.currentTime || 0)
    const updatedLyric = { ...lyrics[index], start }
    let updatedLyrics = [...lyrics]

    updatedLyrics[index] = updatedLyric
    setLyrics(updatedLyrics)
  }

  function checkForNextLyric() {
    const lyricInfo = lyrics[currentLyric] || lyricDefaults
    const nextLyricIndex = currentLyric + 1
    const nextLyric = lyrics[nextLyricIndex] || lyricDefaults
    const nextLyricStart = nextLyric.start || 0
    const currentTime = audioElement.current?.currentTime || 0

    if (currentTime >= nextLyricStart && nextLyricStart !== 0)
      return setCurrentLyric(nextLyricIndex)

    if (currentTime < lyricInfo.start) return setCurrentLyric(0)
  }
}

export default SongLyrics
