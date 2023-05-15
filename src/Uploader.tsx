import React, { useState } from 'react'
import styles from './Uploader.module.scss'
import UploaderHeader from './components/UploaderHeader/UploaderHeader'
import { IReleaseData, releaseDataDefaults } from './types/ReleaseData'

interface IUploaderProps {
  releaseId: string
}

const Uploader: React.FC<IUploaderProps> = ({ releaseId }) => {
  const [releaseData, setReleaseData] =
    useState<IReleaseData>(releaseDataDefaults)

  return (
    <div className={styles.component}>
      <h1>Uploader</h1>
      <UploaderHeader
        releaseData={releaseData}
        setReleaseData={setReleaseData}
      />
    </div>
  )
}

export default Uploader
