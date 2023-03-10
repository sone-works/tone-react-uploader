import React from 'react'
import { IReleaseData } from '../types/ReleaseData'
import styles from '../Uploader.module.scss'
import ReleaseArtInput from './ReleaseArtInput/ReleaseArtInput'
import ReleaseColors from './ReleaseColors'
import ReleaseMetadata from './ReleaseMetadata/ReleaseMetadata'
import UploaderSection from './UploaderSection'

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
      <div className={styles.leftHeader}>
        <ReleaseArtInput />
        <ReleaseColors />
      </div>
      <ReleaseMetadata
        releaseData={releaseData}
        setReleaseData={setReleaseData}
      />
    </UploaderSection>
  )
}

export default UploaderHeader
