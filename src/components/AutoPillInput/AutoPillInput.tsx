import React, { createContext, useContext, useEffect, useState } from 'react'
import styles from './AutoPillInput.module.scss'

interface IAutoPillContextType {
  isAutoHovering: boolean
  setSearchTerm: Function
  onRemovePill: Function
  setVisible: Function
}

const F = () => {}

const autoPillContextDefaults: IAutoPillContextType = {
  isAutoHovering: false,
  setSearchTerm: F,
  onRemovePill: F,
  setVisible: F,
}

const AutoPillContext = createContext<IAutoPillContextType>(
  autoPillContextDefaults
)

export const useAutoPillContext = () => useContext(AutoPillContext)

export interface IAutoPillInputProps {
  endpoint: string
  grab: string
  resultsDisplayGrab: string
  onResults?: Function
  onResultClick?: Function
  addUserInput?: Function
  onRemovePill?: Function
  children?: React.ReactNode
}

const AutoPillInput: React.FC<IAutoPillInputProps> = ({
  endpoint,
  grab,
  resultsDisplayGrab,
  onResults,
  onResultClick,
  addUserInput,
  onRemovePill,
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isVisible, setVisible] = useState<boolean>(false)
  const [isAutoHovering, setAutoHovering] = useState<boolean>(false)
  const [isSearching, setSearching] = useState<boolean>(false)
  const [results, setResults] = useState<any[]>([])
  const [hasTerm, setHasTerm] = useState<boolean>(false)

  const autocompleteStyle = { display: isVisible ? 'flex' : 'none' }

  useEffect(() => {
    console.log(results)

    const resultsTerms = results.map((result: any) =>
      result[resultsDisplayGrab].trim().toLowerCase()
    )

    setHasTerm(resultsTerms.includes(searchTerm.trim().toLowerCase()))
  }, [results])

  useEffect(() => {
    if (searchTerm !== '') {
      getResults(searchTerm)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [searchTerm])

  return (
    <AutoPillContext.Provider
      value={{
        isAutoHovering,
        setSearchTerm,
        setVisible,
        onRemovePill: onRemovePill || F,
      }}
    >
      <div className={styles.component}>
        <ul className={styles.container}>{children}</ul>
        <div className={styles.autocomplete}>
          <ul
            style={autocompleteStyle}
            onMouseEnter={() => setAutoHovering(true)}
            onMouseLeave={() => setAutoHovering(false)}
          >
            {results.length ? (
              results.map((result: any, i) => (
                <li key={i} onClick={() => handleResultClick(result)}>
                  {result[resultsDisplayGrab]}
                </li>
              ))
            ) : (
              <li>No results found.</li>
            )}
            {addUserInput && !hasTerm && (
              <li
                className={styles.addInput}
                onClick={() => handleAddInputClick()}
              >
                <i className="fa-sharp fa-solid fa-plus-large" />
              </li>
            )}
          </ul>
        </div>
      </div>
    </AutoPillContext.Provider>
  )

  async function getResults(term?: string) {
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

  function handleResultClick(result: any) {
    setVisible(false)
    onResultClick && onResultClick(result)
  }

  function handleAddInputClick() {
    setVisible(false)
    addUserInput && addUserInput(searchTerm)
  }
}

export default AutoPillInput
