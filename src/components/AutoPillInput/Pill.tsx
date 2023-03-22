import React, { useEffect, useRef, useState } from 'react'
import { useAutoPillContext } from './AutoPillInput'
import styles from './AutoPillInput.module.scss'

export interface IPillProps {
  index?: number
  display?: string
  colors?: {
    primary: string
    secondary: string
  }
  permanent?: boolean
  style?: React.CSSProperties
}

const Pill: React.FC<IPillProps> = ({
  index = null,
  display = '',
  colors = {},
  permanent = false,
  style = {},
}) => {
  const canEdit = !display ? true : false

  const [inputValue, setInputValue] = useState<string>('')
  const [isTyping, setTyping] = useState<boolean>(false)

  const textInput = useRef<HTMLInputElement>(null)

  const { isAutoHovering, setSearchTerm, setVisible, onRemovePill } =
    useAutoPillContext()

  const pillStyle: React.CSSProperties = canEdit
    ? {
        backgroundColor: `rgb(${colors.secondary})`,
        border: `1px dashed rgba(${colors.primary}, 0.5)`,
        color: `rgb(${colors.primary})`,
        ...style,
      }
    : {
        backgroundColor: `rgb(${colors.secondary})`,
        border: `1px solid rgb(${colors.primary})`,
        color: `rgb(${colors.primary})`,
        ...style,
      }

  useEffect(() => {
    setTyping(true)
    const timer = setTimeout(async () => {
      setTyping(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    !isTyping && setSearchTerm(inputValue)
  }, [isTyping])

  return (
    <li className={styles.pill} style={pillStyle}>
      {canEdit ? (
        <input
          minLength={1}
          size={inputValue.length || 1}
          ref={textInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => !isAutoHovering && setVisible(false)}
        />
      ) : (
        display
      )}
      {!permanent && !canEdit && (
        <i
          onClick={() => onRemovePill(index)}
          className="fa-sharp fa-regular fa-xmark"
        />
      )}
    </li>
  )
}

export default Pill
