import React, { useRef, useState } from 'react'
import styles from './SongPod.module.scss'

export interface ISongPodAudioProps {
  index: number
  isLoadingFile: boolean
  isFileLoaded: boolean
  isPlaying: boolean
  audioElement: React.RefObject<HTMLAudioElement>
  onFileButtonClick: Function
}

const SongPodAudio: React.FC<ISongPodAudioProps> = ({
  index,
  isLoadingFile,
  isFileLoaded,
  isPlaying,
  audioElement,
  onFileButtonClick,
}) => {
  audioElement.current?.addEventListener('timeupdate', updateTime)

  const progressElement = useRef<HTMLDivElement>(null)

  const [time, setTime] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [seekProgress, setSeekProgress] = useState<number>(0)
  const [isProgressHovered, setProgressHovered] = useState<boolean>(false)

  if (isFileLoaded)
    return (
      <div className={styles.audio}>
        <div className={styles.audioControls}>
          <span onClick={() => step(false)}>
            <i className="fa-sharp fa-solid fa-backward-step fa-fw" />
          </span>
          <span
            className={styles.audioToggle}
            onClick={() => toggleSongPodAudio()}
          >
            {isPlaying ? (
              <i className="fa-sharp fa-solid fa-pause fa-fw" />
            ) : (
              <i className="fa-sharp fa-solid fa-play fa-fw" />
            )}
          </span>
          <span onClick={() => step(true)}>
            <i className="fa-sharp fa-solid fa-forward-step fa-fw" />
          </span>
        </div>
        <div
          className={styles.audioProgress}
          onMouseEnter={() => setProgressHovered(true)}
          onMouseLeave={() => setProgressHovered(false)}
          onMouseMove={(e) => updateBar(e)}
          onClick={() => seekTo(seekProgress)}
          ref={progressElement}
        >
          <span
            style={{
              width: isProgressHovered ? `${seekProgress}%` : `${progress}%`,
            }}
          />
        </div>
      </div>
    )

  return (
    <button
      className={styles.file}
      style={{ width: '50%' }}
      onClick={() => onFileButtonClick()}
    >
      <i className="fa-sharp fa-regular fa-cloud-arrow-up" />
      <span>Upload a .flac or .wav</span>
      <span>500mb max</span>
    </button>
  )

  function updateTime() {
    const currentTime = Math.trunc(audioElement.current?.currentTime || 0)
    const maxTime = Math.trunc(audioElement.current?.duration || 0)

    const updatedProgress = Math.trunc((currentTime * 100) / maxTime)
    updatedProgress > progress && setProgress(updatedProgress)
  }

  function updateBar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const padding = 10
    const mouseX = e.pageX
    const progressX = progressElement.current?.getBoundingClientRect().x || 0
    const progressWidth = progressElement.current?.offsetWidth || 0
    const baselineMouse = mouseX - progressX + padding
    const percentage = Math.trunc((baselineMouse * 100) / progressWidth)

    setSeekProgress(percentage)
  }

  function seekTo(percentage: number) {
    const audio = audioElement.current || new Audio()
    const maxTime = Math.trunc(audio.duration || 0)
    const time = Math.trunc((percentage / 100) * maxTime)

    audio.currentTime = time
  }

  function toggleSongPodAudio() {
    isPlaying ? audioElement.current?.pause() : audioElement.current?.play()
  }

  function step(forward: boolean) {
    const audio = audioElement.current || new Audio()
    audio.pause()

    forward ? (audio.currentTime = audio.duration) : (audio.currentTime = 0)
  }
}

export default SongPodAudio
