import React from 'react'
import { IReleaseData } from '../types/ReleaseData'
import styles from '../Uploader.module.scss'

export interface IReleaseMetadataFormProps {
  releaseData: IReleaseData
  setReleaseData: Function
}

const ReleaseMetadataForm: React.FC<IReleaseMetadataFormProps> = ({
  releaseData,
  setReleaseData,
}) => (
  <div className={styles.releaseMetadata}>
    <div className={styles.group}>
      <h5>Title*</h5>
      <input
        type="text"
        onChange={(e) =>
          setReleaseData({
            ...releaseData,
            meta: { ...releaseData.meta, title: e.target.value },
          })
        }
        value={releaseData.meta.title}
      />
    </div>
    <div className={styles.group}>
      <h5>Artist(s)*</h5>
      <input
        type="text"
        onChange={(e) =>
          setReleaseData({ ...releaseData, artists: e.target.value })
        }
        value={releaseData.artists}
      />
      <p>
        CSV list for now, will be replaced by an autofill pill input thing in
        final.
      </p>
    </div>
    <div className={styles.group}>
      <h5>Description</h5>
      <textarea
        onChange={(e) =>
          setReleaseData({
            ...releaseData,
            meta: { ...releaseData.meta, info: e.target.value },
          })
        }
        value={releaseData.meta.info}
      />
    </div>
    <div className={styles.group}>
      <h5>Tags</h5>
      <input
        type="text"
        onChange={(e) =>
          setReleaseData({ ...releaseData, tags: e.target.value })
        }
        value={releaseData.tags}
      />
      <p>
        CSV list for now, will be replaced by an autofill pill input thing in
        final.
      </p>
    </div>
    <div className={styles.group}>
      <h5>ISRC</h5>
      <input
        type="text"
        onChange={(e) =>
          setReleaseData({
            ...releaseData,
            meta: { ...releaseData.meta, isrc: e.target.value },
          })
        }
        value={releaseData.meta.isrc}
      />
    </div>
  </div>
)

export default ReleaseMetadataForm
