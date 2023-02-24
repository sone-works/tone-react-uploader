import React from 'react'
import styles from '../Uploader.module.scss'

export interface IUploaderSectionProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

const UploaderSection: React.FC<IUploaderSectionProps> = ({
  children,
  style = {},
}) => {
  return (
    <div className={styles.section} style={style}>
      {children}
    </div>
  )
}

export default UploaderSection
