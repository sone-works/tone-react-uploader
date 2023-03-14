import React from 'react'
import styles from './SongPod.module.scss'

export interface ISongPodControlsProps {
  index: number
  isHovering: boolean
  isExpanded: boolean
  setExpanded: Function
  removePod: Function
}

const SongPodControls: React.FC<ISongPodControlsProps> = ({
  index,
  isHovering,
  isExpanded,
  setExpanded,
  removePod,
}) => {
  const controlButtonStyles: React.CSSProperties = {
    display: isHovering ? 'inline' : 'none',
  }

  return (
    <>
      <div className={styles.controls}>
        <button
          className={styles.resize}
          style={controlButtonStyles}
          onClick={() => setExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <i className="fa-sharp fa-solid fa-down-left-and-up-right-to-center" />
          ) : (
            <i className="fa-sharp fa-solid fa-up-right-and-down-left-from-center" />
          )}
        </button>
        <button
          style={controlButtonStyles}
          className={styles.delete}
          onClick={() => removePod(index)}
        >
          <i className="fa-sharp fa-regular fa-trash-can" />
        </button>
      </div>
      <div className={styles.position}>
        <button>
          <i className="fa-sharp fa-regular fa-circle-chevron-up fa-fw" />
        </button>
        <span className={styles.trackName}>{index + 1}</span>
        <button>
          <i className="fa-sharp fa-regular fa-circle-chevron-up fa-rotate-180 fa-fw" />
        </button>
      </div>
    </>
  )
}

export default SongPodControls
