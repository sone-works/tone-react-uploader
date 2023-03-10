import React, { useEffect, useState } from 'react'
import styles from '../Uploader.module.scss'
import { hexToRgb } from '../utils/color'

export interface IReleaseColorsProps {}

const ReleaseColors: React.FC<IReleaseColorsProps> = ({}) => {
  const [primary, setPrimary] = useState<string>('#FFFFFF')
  const [secondary, setSecondary] = useState<string>('#000000')

  const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  }

  useEffect(() => {
    const hex = {
      primary: hexToRgb(primary),
      secondary: hexToRgb(secondary),
    }

    const rgbString = {
      primary: hex.primary?.r + ',' + hex.primary?.g + ',' + hex.primary?.b,
      secondary:
        hex.secondary?.r + ',' + hex.secondary?.g + ',' + hex.secondary?.b,
    }

    document
      .querySelector('html')
      ?.style.setProperty('--global-primary', rgbString.primary)
    document
      .querySelector('html')
      ?.style.setProperty('--global-secondary', rgbString.secondary)
  }, [primary, secondary])

  return (
    <div className={styles.colors}>
      <h4>Color Scheme</h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={containerStyle}>
          <h5>Primary</h5>
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          />
        </div>
        <div style={containerStyle}>
          <h5>Secondary</h5>
          <input
            type="color"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default ReleaseColors
