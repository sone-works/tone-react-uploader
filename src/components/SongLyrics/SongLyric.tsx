import React, { useEffect, useState } from 'react'
import { formatMSS } from '../../utils/time'
import styles from './SongLyrics.module.scss'

export interface ISongLyricProps {
  index: number
  line: string
  start: number
  isPlaying: boolean
  currentLyric: number
  setLine: Function
  setStart: Function
  jotTime: Function
}

const SongLyric: React.FC<ISongLyricProps> = ({
  index,
  line,
  start,
  isPlaying,
  currentLyric,
  setLine,
  setStart,
  jotTime,
}) => {
  const [startInput, setStartInput] = useState<string>('')
  const [isValidTimecode, setValidTimecode] = useState<boolean>(false)

  useEffect(() => {
    setStartInput(formatMSS(start))
  }, [start])

  useEffect(() => {
    handleStartChange(index, startInput)
  }, [startInput])

  const lyricStyle: React.CSSProperties = {
    color: isPlaying
      ? index == currentLyric
        ? 'rgba(var(--uploader-preview-darker))'
        : 'rgba(var(--uploader-preview-darker), 0.5)'
      : 'rgba(var(--uploader-preview-darker))',
  }

  const timecodeStyle: React.CSSProperties = {
    color: isValidTimecode
      ? 'rgb(var(--uploader-preview-darker))'
      : 'rgba(var(--uploader-preview-darker), 0.3)',
  }

  return (
    <div className={styles.lyric} style={lyricStyle}>
      <span>{index + 1}</span>
      <textarea
        rows={1}
        value={line}
        onChange={(e) => setLine(index, e.target.value)}
      />
      <input
        value={startInput}
        placeholder="0:00"
        style={{ ...timecodeStyle, cursor: isPlaying ? 'pointer' : '' }}
        onChange={(e) => setStartInput(e.target.value)}
        onClick={(e) => isPlaying && jotTime(index, e)}
      />
    </div>
  )

  function handleStartChange(index: number, start: string) {
    const sides = start.split(':')
    if (sides.length) {
      if (
        (sides[0] && sides[0].length > 2) ||
        (sides[1] && sides[1].length > 2)
      )
        return console.log('Sides too long.')
    }

    setStartInput(start)
    const isTimecode = start.search(/\d{1,2}:\d{2}/g) == 0 ? true : false

    if (isTimecode) {
      const seconds = parseInt(sides[0]) * 60 + parseInt(sides[1])
      setValidTimecode(true)
      setStart(index, seconds)

      return console.log({ index, start, isTimecode, seconds })
    }

    setValidTimecode(false)
    return console.log({ index, start, isTimecode })
  }
}

export default SongLyric
