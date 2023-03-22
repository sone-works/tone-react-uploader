import React, { useState } from 'react'
import { IReleaseCredit } from '../../types/ReleaseData'
import AutoPillInput from '../AutoPillInput/AutoPillInput'
import Pill from '../AutoPillInput/Pill'
import AutoTextInput from '../AutoTextInput/AutoTextInput'
import styles from './CreditsInput.module.scss'

interface IPerson {
  id: string
  display: string
}

interface ICreditType {
  id: string
  display: string
}

interface ICreditResult {
  id: string
  display: string
  unique: string
}

export interface ICreditProps {
  index: number
  credits: IReleaseCredit[]
  colors: {
    primary: string
    secondary: string
  }
  setCredits: Function
}

const Credit: React.FC<ICreditProps> = ({
  index,
  credits,
  colors,
  setCredits,
}) => {
  const [person, setPerson] = useState<IPerson>({ id: '', display: '' })
  const [creditTypes, setCreditTypes] = useState<ICreditType[]>([])
  const [isHovering, setHovering] = useState<boolean>(false)

  const creditStyle: React.CSSProperties = {
    borderBottom: `1px solid rgba(${colors.primary}, 0.5)`,
  }

  const fieldsStyle: React.CSSProperties = {
    borderLeft: `1px solid rgba(${colors.primary}, 0.5)`,
  }

  const pillStyle: React.CSSProperties = {
    fontSize: '12px',
    padding: '0.25em',
  }

  const removeStyle: React.CSSProperties = {
    opacity: isHovering ? 1 : 0,
  }

  return (
    <div
      className={styles.credit}
      style={creditStyle}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className={styles.person}>
        <i
          className="fa-sharp fa-regular fa-xmark"
          style={removeStyle}
          onClick={() => handleRemoveCredit(index)}
        />
        <AutoTextInput
          value={person.display}
          setValue={handlePersonDisplay}
          className={styles.textInput}
          endpoint="/api/tone/people"
          grab="people"
          renderResult={(i: number, person: any, setVisible: Function) => (
            <li
              key={i}
              className={styles.result}
              onClick={() => {
                setVisible(false)
                handleSelectPerson(person)
              }}
            >
              {person.display}
            </li>
          )}
        />
      </div>
      <div className={styles.fields} style={fieldsStyle}>
        <AutoPillInput
          endpoint="/api/tone/credits/types"
          grab="credits"
          resultsDisplayGrab="display"
          onResultClick={handleAddCreditType}
          onRemovePill={handleRemoveCreditType}
        >
          {creditTypes.length
            ? creditTypes.map((credit, i) => (
                <Pill
                  key={i}
                  index={i}
                  display={credit.display}
                  colors={{
                    primary: 'var(--uploader-preview-primary)',
                    secondary: 'var(--uploader-preview-secondary)',
                  }}
                  style={pillStyle}
                />
              ))
            : []}
          <Pill
            colors={{
              primary: 'var(--uploader-preview-primary)',
              secondary: 'var(--uploader-preview-secondary)',
            }}
            style={pillStyle}
          />
        </AutoPillInput>
      </div>
    </div>
  )

  function handleRemoveCredit(index: number) {
    let updatedCredits = [...credits]
    updatedCredits.splice(index, 1)

    setCredits(updatedCredits)
  }

  function handleSelectPerson(person: any) {
    setPerson({ id: person.id, display: person.display })
  }

  function handleAddCreditType(result: ICreditResult) {
    let updatedCreditTypes = [...creditTypes]

    updatedCreditTypes = [
      ...updatedCreditTypes,
      { id: result.id, display: result.display },
    ]

    setCreditTypes(updatedCreditTypes)
  }

  function handleRemoveCreditType(index: number) {
    let updatedCredits = [...creditTypes]
    updatedCredits.splice(index, 1)

    setCredits(updatedCredits)
  }

  function handlePersonDisplay(display: string) {
    setPerson({ ...person, display })
  }
}

export default Credit
