import React from 'react'
import styles from '../ReleaseArtInput.module.scss'

export interface IReleaseArtDisplayProps {
  type: string
}

interface IPreviews {
  cover?: string
  back?: string
  insert?: string
  gatefoldLeft?: string
  gatefoldRight?: string
}

const previewsDefaults: IPreviews = {
  cover: '',
  back: '',
  insert: '',
  gatefoldLeft: '',
  gatefoldRight: '',
}

const ReleaseArtDisplay: React.FC<IReleaseArtDisplayProps> = ({ type }) => {
  return <div className={styles.display}></div>
}

export default ReleaseArtDisplay
