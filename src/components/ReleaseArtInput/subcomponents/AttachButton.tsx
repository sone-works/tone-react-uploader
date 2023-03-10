import React from 'react'
import styles from '../ReleaseArtInput.module.scss'

export interface IAttachButtonProps {
  onClick: Function
}

const AttachButton: React.FC<IAttachButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.attach} onClick={() => onClick()}>
      <i className="fa-sharp fa-regular fa-cloud-arrow-up" />
      <span>Upload a .jpg or .png</span>
      <span>1400px x 1400px minimum.</span>
      <span>10mb max</span>
    </button>
  )
}

export default AttachButton
