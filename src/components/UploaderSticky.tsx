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
    color: 'rgba(var(--uploader-preview-darker), 0.2)',
  }

  return (
    <div className={styles.sticky}>
      <ul>
        <li>
          {artistDisplays.length ? (
            artistDisplays
          ) : (
            <span style={unsetStyle}>(no artists)</span>
          )}
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
