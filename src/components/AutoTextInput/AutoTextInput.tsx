import React, { useEffect, useState } from 'react'
import styles from './AutoTextInput.module.scss'

export interface IAutoTextInputProps {
  value: string
  endpoint: string
  grab: string
  className?: string
  style?: React.CSSProperties
  setValue: Function
  renderResult: Function
}

const AutoTextInput: React.FC<IAutoTextInputProps> = ({
  value,
  endpoint,
  grab,
  className,
  style,
  setValue,
  renderResult,
}) => {
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setSearching] = useState<boolean>(false)
  const [isVisible, setVisible] = useState<boolean>(false)
  const [isHovering, setHovering] = useState<boolean>(false)
  const [isFocused, setFocused] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value !== '') {
        getResults(value)
        isFocused && setVisible(true)
      } else {
        setVisible(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={styles.component}>
      <input
        className={className}
        style={style}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          setFocused(false)
          !isHovering && setVisible(false)
        }}
        onFocus={() => setFocused(true)}
      />
      <div className={styles.autocomplete}>
        <ul
          style={{ display: isVisible ? 'flex' : 'none' }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {results.length ? (
            results.map((result, i) => renderResult(i, result, setVisible))
          ) : (
            <li style={{ fontSize: '0.75em', padding: '0.5em' }}>
              No results found.
            </li>
          )}
        </ul>
      </div>
    </div>
  )

  async function getResults(term: string) {
    setSearching(true)
    const url = endpoint + (term && `?q=${term}`)
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setSearching(false)
        if (!data[grab]) return console.log('Invalid grab.')
        setResults(data[grab])
      })
      .catch((error) => console.log(error))
  }
}

export default AutoTextInput
