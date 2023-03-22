import React, { useEffect, useState } from 'react'
import styles from '../../Uploader.module.scss'
import { hexToRgb } from '../../utils/color'

export interface IReleaseColorsProps {}

const ReleaseColors: React.FC<IReleaseColorsProps> = ({}) => {
  const [primary, setPrimary] = useState<string>('#000000')
  const [secondary, setSecondary] = useState<string>('#FFFFFF')

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
      ?.style.setProperty('--uploader-preview-primary', rgbString.primary)

    document
      .querySelector('html')
      ?.style.setProperty('--uploader-preview-secondary', rgbString.secondary)

    const shades = getShades(primary, secondary)

    document
      .querySelector('html')
      ?.style.setProperty('--uploader-preview-darker', shades.darker)

    document
      .querySelector('html')
      ?.style.setProperty('--uploader-preview-lighter', shades.lighter)
  }, [primary, secondary])

  return (
    <div className={styles.colors}>
      <p>
        These colors will be this release's color identity on Tone. They will be
        used in searches, the player, and anywhere else your release is
        displayed.
      </p>
      <div className={styles.color}>
        <input
          type="color"
          value={primary}
          className={styles.colorPicker}
          onChange={(e) => setPrimary(e.target.value)}
        />
        <div className={styles.colorText}>
          <input value={primary} onChange={(e) => setPrimary(e.target.value)} />
        </div>
      </div>
      <div className={styles.color}>
        <input
          type="color"
          value={secondary}
          className={styles.colorPicker}
          onChange={(e) => setSecondary(e.target.value)}
        />
        <div className={styles.colorText}>
          <input
            value={secondary}
            onChange={(e) => setPrimary(e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  function getShades(primary: string, secondary: string) {
    const hex = {
      primary: hexToRgb(primary),
      secondary: hexToRgb(secondary),
    }

    const rgbString = {
      primary: hex.primary?.r + ',' + hex.primary?.g + ',' + hex.primary?.b,
      secondary:
        hex.secondary?.r + ',' + hex.secondary?.g + ',' + hex.secondary?.b,
    }

    const arrays = {
      primary: rgbString.primary.split(','),
      secondary: rgbString.secondary.split(','),
    }

    let primaryTotal = 0
    let secondaryTotal = 0

    arrays.primary.map((value) => (primaryTotal += parseInt(value)))
    arrays.secondary.map((value) => (secondaryTotal += parseInt(value)))

    return primaryTotal > secondaryTotal
      ? { lighter: rgbString.primary, darker: rgbString.secondary }
      : { lighter: rgbString.secondary, darker: rgbString.primary }
  }
}

export default ReleaseColors
