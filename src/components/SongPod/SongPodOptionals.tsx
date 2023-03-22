import React from 'react'
import { ISongMetadata } from '../../types/SongMetadata'
import styles from './SongPod.module.scss'

export interface ISongPodOptionalsProps {
  metadata: ISongMetadata
  setMetadata: Function
}

const SongPodOptionals: React.FC<ISongPodOptionalsProps> = ({
  metadata,
  setMetadata,
}) => {
  return (
    <div className={styles.optionals}>
      <div className={styles.row}>
        <div className={styles.group} style={{ width: '50%' }}>
          <h5>About This Song</h5>
          <textarea
            className={styles.textarea}
            value={metadata.description}
            onChange={(e) =>
              setMetadata({ ...metadata, description: e.target.value })
            }
          />
        </div>
        <div className={styles.group} style={{ width: '25%' }}>
          <h5>BPM</h5>
          <input
            className={styles.textInput}
            value={metadata.bpm}
            onChange={(e) => setMetadata({ ...metadata, bpm: e.target.value })}
          />
        </div>
        <div className={styles.group} style={{ width: '25%' }}>
          <h5>Key</h5>
          <input
            className={styles.textInput}
            value={metadata.key}
            onChange={(e) => setMetadata({ ...metadata, key: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group} style={{ flexGrow: 1 }}>
          <h5>ISRC</h5>
          <input
            className={styles.textInput}
            value={metadata.isrc}
            onChange={(e) => setMetadata({ ...metadata, isrc: e.target.value })}
          />
        </div>
        <div className={styles.group} style={{ flexGrow: 1 }}>
          <h5>ISWC</h5>
          <input
            className={styles.textInput}
            value={metadata.iswc}
            onChange={(e) => setMetadata({ ...metadata, iswc: e.target.value })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group} style={{ flexGrow: 1 }}>
          <h5>Recorded At</h5>
          <input
            className={styles.textInput}
            value={metadata.recordedAt}
            onChange={(e) =>
              setMetadata({ ...metadata, recordedAt: e.target.value })
            }
          />
        </div>
        <div className={styles.group} style={{ flexGrow: 1 }}>
          <h5>Location Created</h5>
          <input
            className={styles.textInput}
            value={metadata.locationCreated}
            onChange={(e) =>
              setMetadata({ ...metadata, locationCreated: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default SongPodOptionals
