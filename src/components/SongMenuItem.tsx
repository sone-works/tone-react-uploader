import React, { useState } from 'react'

export interface ISongMenuItemProps {
  children: React.ReactNode
  songIndex: number | null
  selectedSong: number | null
  setSelectedSong: Function
  deleteSong: Function
}

const SongMenuItem: React.FC<ISongMenuItemProps> = ({
  children,
  songIndex,
  selectedSong,
  setSelectedSong,
  deleteSong,
}) => {
  const [isTrashHover, setTrashHover] = useState<boolean>(false)

  const isSelected = songIndex == selectedSong

  const style = {
    backgroundColor: isSelected ? 'gray' : 'inherit',
    color: isSelected ? 'black' : 'inherit',
    justifyContent: songIndex !== null ? 'space-between' : 'center',
  }

  return (
    <li
      style={style}
      onClick={() => !isTrashHover && setSelectedSong(songIndex)}
    >
      {songIndex !== null && (
        <button
          onMouseEnter={() => setTrashHover(true)}
          onMouseLeave={() => setTrashHover(false)}
          onClick={() => deleteSong(songIndex)}
        >
          🗑️
        </button>
      )}
      {children}
    </li>
  )
}

export default SongMenuItem
