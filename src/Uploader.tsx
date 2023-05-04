import React, { useState } from 'react'
import styles from './Uploader.module.scss'

interface IUploaderProps {
  releaseId: string
}

const Uploader: React.FC<IUploaderProps> = ({}) => {
  const [releaseData, setReleaseData] = useState<string>('')

  return (
    <div className={styles.component}>
      <h1>Uploader</h1>
      {/*<UploaderHeader
        releaseData={releaseData}
        setReleaseData={setReleaseData}
  />*/}
    </div>
  )
}

export default Uploader
