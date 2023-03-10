import React from 'react'
import styles from '../Uploader.module.scss'

export interface IUploaderStickyProps {
  artistDisplays: string[]
  title: string
  songCount: number | null
}

const UploaderSticky: React.FC<IUploaderStickyProps> = ({
  artistDisplays,
  title,
  songCount,
}) => {
  const unsetStyle: React.CSSProperties = {
    color: 'rgba(var(--global-secondary), 0.2)',
  }

  return (
    <div className={styles.sticky}>
      <ul>
        <li>
          {artistDisplays || <span style={unsetStyle}>no artist(s)</span>}
        </li>
        <li>{title || <span style={unsetStyle}>(no title)</span>}</li>
        <li>{new Date().getFullYear()}</li>
        <li>{songCount || 0} tracks</li>
        <li>0h 00m</li>
      </ul>
      <button>Upload & continue</button>
    </div>
  )
}

export default UploaderSticky
