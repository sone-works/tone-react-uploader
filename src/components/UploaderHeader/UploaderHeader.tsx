import React from 'react'
import styles from '../../Uploader.module.scss'
import { IReleaseData } from '../../types/ReleaseData'
import ReleaseArtInput from './ReleaseArtInput/ReleaseArtInput'
import ReleaseColors from './ReleaseColors'
import ReleaseMetadata from './ReleaseMetadata/ReleaseMetadata'

export interface IUploaderHeaderProps {
  releaseData: IReleaseData
  setReleaseData: Function
}

const UploaderHeader: React.FC<IUploaderHeaderProps> = ({
  releaseData,
  setReleaseData,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftHeader}>
        <ReleaseArtInput releaseData={releaseData} />
        <ReleaseColors />
      </div>
      <ReleaseMetadata
        releaseData={releaseData}
        setReleaseData={setReleaseData}
      />
    </div>
  )
}

export default UploaderHeader
