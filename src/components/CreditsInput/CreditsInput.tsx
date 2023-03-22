import React, { useEffect, useState } from 'react'
import {
  IReleaseCredit,
  IReleaseData,
  releaseCreditDefaults,
} from '../../types/ReleaseData'
import Credit from './Credit'
import styles from './CreditsInput.module.scss'

export interface ICreditsInputProps {
  releaseData: IReleaseData
  colors?: {
    primary: string
    secondary: string
  }
  setReleaseData: Function
}

const CreditsInput: React.FC<ICreditsInputProps> = ({
  releaseData,
  colors = { primary: '0,0,0', secondary: '255,255,255' },
  setReleaseData,
}) => {
  const [credits, setCredits] = useState<IReleaseCredit[]>([])

  useEffect(() => {
    console.log({ credits })
    !credits.length && handleAddCredit()
  }, [credits])

  const creditsStyle: React.CSSProperties = {
    border: `1px solid rgba(${colors.primary}, 0.1)`,
  }

  const addStyles: React.CSSProperties = {
    border: `1px solid rgba(${colors.primary}, 0.1)`,
    color: `rgba(${colors.primary}, 0.5)`,
  }

  return (
    <div className={styles.credits} style={creditsStyle}>
      {credits.length &&
        credits.map((credit: IReleaseCredit, i) => (
          <Credit
            key={i}
            index={i}
            credits={credits}
            colors={colors}
            setCredits={setCredits}
          />
        ))}
      <div
        className={styles.add}
        style={addStyles}
        onClick={() => handleAddCredit()}
      >
        <i className="fa-sharp fa-solid fa-plus" />
      </div>
    </div>
  )

  function handleAddCredit() {
    setCredits([...credits, releaseCreditDefaults])
  }
}

export default CreditsInput
