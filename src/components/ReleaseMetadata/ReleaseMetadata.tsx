import React from 'react'
import {
  IReleaseArtist,
  IReleaseData,
  IReleaseTag,
} from '../../types/ReleaseData'
import AutoPillInput from '../AutoPillInput/AutoPillInput'
import Pill from '../AutoPillInput/Pill'
import styles from './ReleaseMetadata.module.scss'

export interface IReleaseMetadataProps {
  releaseData: IReleaseData
  setReleaseData: Function
}

const ReleaseMetadata: React.FC<IReleaseMetadataProps> = ({
  releaseData,
  setReleaseData,
}) => {
  return (
    <div className={styles.component}>
      <div className={styles.row}>
        <div className={styles.group}>
          <h5>Title</h5>
          <input
            className={styles.textInput}
            value={releaseData.meta.title}
            onChange={(e) =>
              setReleaseData({
                ...releaseData,
                meta: { ...releaseData.meta, title: e.target.value },
              })
            }
            placeholder="Release Title"
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}>
          <h5>Artists</h5>
          <AutoPillInput
            endpoint="/api/tone/artists"
            grab="artists"
            resultsDisplayGrab="display"
            onRemovePill={handleRemoveArtist}
            onResultClick={(artistResult: any) => handleAddArtist(artistResult)}
          >
            {releaseData.artists.length ? (
              releaseData.artists.map((artist: IReleaseArtist, i: number) => (
                <Pill
                  key={i}
                  display={artist.display}
                  colors={{
                    primary: artist.colors.primary,
                    secondary: artist.colors.secondary,
                  }}
                />
              ))
            ) : (
              <Pill />
            )}
          </AutoPillInput>
        </div>
      </div>
      <div className={styles.row} style={{ height: '10em' }}>
        <div className={styles.group} style={{ width: '50%' }}>
          <h5>About This Release</h5>
          <textarea className={styles.textarea} />
        </div>
        <div className={styles.group} style={{ width: '50%' }}>
          <h5>Credits</h5>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}>
          <h5>Tags</h5>
          <AutoPillInput
            endpoint="/api/tone/tags"
            grab="tags"
            resultsDisplayGrab="tag"
            onResultClick={(tagResult: any) => handleAddTag(tagResult)}
            onRemovePill={handleRemoveTag}
            addUserInput={handleInsertTag}
          >
            {releaseData.tags.length ? (
              releaseData.tags.map((tag: IReleaseTag, i) => (
                <Pill key={i} index={i} display={tag.display} />
              ))
            ) : (
              <Pill />
            )}
          </AutoPillInput>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.group}>
          <h5>Release Date*</h5>
          <input className={styles.textInput} placeholder="mm/dd/yyyy" />
        </div>
        <div className={styles.group}>
          <h5>UPC/EAN*</h5>
          <input className={styles.textInput} />
        </div>
        <div className={styles.group}>
          <h5>Catalog #*</h5>
          <input className={styles.textInput} />
        </div>
      </div>
    </div>
  )

  function handleAddArtist(result: any) {
    const newArtist: IReleaseArtist = {
      id: result.id,
      display: result.display,
      colors: {
        primary: result.colorPrimary,
        secondary: result.colorSecondary,
      },
    }

    setReleaseData({
      ...releaseData,
      artists: [...releaseData.artists, newArtist],
    })
  }

  function handleRemoveArtist(index: number) {
    let updatedArtists = releaseData.artists
    updatedArtists.splice(index, 1)

    setReleaseData({ ...releaseData, artists: updatedArtists })
  }

  function handleAddTag(result: any) {
    const newTag: IReleaseTag = {
      id: result.id,
      display: result.tag,
    }

    setReleaseData({ ...releaseData, tags: [...releaseData.tags, newTag] })
  }

  function handleRemoveTag(index: number) {
    let updatedTags = releaseData.tags

    updatedTags.splice(index, 1)
    setReleaseData({ ...releaseData, tags: updatedTags })
  }

  function handleInsertTag(newTag: string) {
    console.log('tag insert')
  }
}

export default ReleaseMetadata
