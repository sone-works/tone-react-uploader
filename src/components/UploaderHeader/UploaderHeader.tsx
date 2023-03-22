import React from 'react'
import { IReleaseData } from '../../types/ReleaseData'
import styles from '../../Uploader.module.scss'
import UploaderSection from '../UploaderSection'
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
    <UploaderSection style={{ alignItems: 'flex-start' }}>
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
    </UploaderSection>
  )
}

export default UploaderHeader
