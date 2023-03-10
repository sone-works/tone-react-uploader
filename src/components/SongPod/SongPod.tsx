import React, { useRef, useState } from 'react'
import {
  IReleaseArtist,
  IReleaseData,
  IReleaseTag,
} from '../../types/ReleaseData'
import { ISongMetadata, songMetadataDefaults } from '../../types/SongMetadata'
import AutoPillInput from '../AutoPillInput/AutoPillInput'
import Pill from '../AutoPillInput/Pill'
import styles from './SongPod.module.scss'

export interface ISongPodProps {
  index: number
  selectedSong: number | null
  releaseData: IReleaseData
  setReleaseData: Function
  setSelectedSong: Function
}

const SongPod: React.FC<ISongPodProps> = ({
  index,
  selectedSong,
  releaseData,
  setReleaseData,
  setSelectedSong,
}) => {
  const audioElement = useRef<HTMLAudioElement>(null)
  const fileElement = useRef<HTMLInputElement>(null)

  const [metadata, setMetadata] = useState<ISongMetadata>(songMetadataDefaults)
  const [isExpanded, setExpanded] = useState<boolean>(true)

  return (
    <li className={styles.component} onClick={() => setSelectedSong(index)}>
      <div className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.position}>
            <button>
              <i className="fa-sharp fa-regular fa-circle-chevron-up fa-fw" />
            </button>
            <span className={styles.trackName}>{index + 1}</span>
            <button>
              <i className="fa-sharp fa-regular fa-circle-chevron-up fa-rotate-180 fa-fw" />
            </button>
          </div>
          <button
            className={styles.resize}
            onClick={() => setExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <i className="fa-sharp fa-solid fa-down-left-and-up-right-to-center" />
            ) : (
              <i className="fa-sharp fa-solid fa-up-right-and-down-left-from-center"></i>
            )}
          </button>
          <button className={styles.delete}>
            <i className="fa-sharp fa-regular fa-trash-can" />
          </button>
        </div>
        <div className={styles.group} style={{ width: '50%' }}>
          <h5>Title</h5>
          <input
            className={styles.textInput}
            value={metadata.title}
            onChange={(e) =>
              setMetadata({ ...metadata, title: e.target.value })
            }
          />
        </div>
        <button className={styles.file} style={{ width: '50%' }}>
          <i className="fa-sharp fa-regular fa-cloud-arrow-up" />
          <span>Upload a .flac or .wav</span>
          <span>500mb max</span>
        </button>
      </div>
      {isExpanded && (
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.group} style={{ width: '30%' }}>
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
                <Pill />
              </AutoPillInput>
            </div>
            <div className={styles.group} style={{ width: '70%' }}>
              <h5>Lyrics*</h5>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.group} style={{ width: '50%' }}>
              <h5>Tags*</h5>
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
                      />
                    ))
                  : []}
                <Pill />
              </AutoPillInput>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.group} style={{ width: '50%' }}>
              <h5>About This Song*</h5>
              <textarea className={styles.textarea} />
            </div>
            <div className={styles.group} style={{ width: '25%' }}>
              <h5>BPM*</h5>
              <input
                className={styles.textInput}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
            <div className={styles.group} style={{ width: '25%' }}>
              <h5>Key*</h5>
              <input
                className={styles.textInput}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.group} style={{ flexGrow: 1 }}>
              <h5>ISRC*</h5>
              <input
                className={styles.textInput}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
            <div className={styles.group} style={{ flexGrow: 1 }}>
              <h5>ISWC*</h5>
              <input
                className={styles.textInput}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.group} style={{ flexGrow: 1 }}>
              <h5>Recorded At*</h5>
              <input
                className={styles.textInput}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
            <div className={styles.group} style={{ flexGrow: 1 }}>
              <h5>Location Created*</h5>
              <input
                className={styles.textInput}
                value={metadata.title}
                onChange={(e) =>
                  setMetadata({ ...metadata, title: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}
    </li>
  )
}

export default SongPod
