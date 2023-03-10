import localforage from 'localforage'
import React, { useRef, useState } from 'react'
import { IArtData } from '../../types/ReleaseArt'
import { generateSizes } from '../../utils/art'
import { setArtData } from '../../utils/db'
import { getDataURLFromFile } from '../../utils/file'
import styles from './ReleaseArtInput.module.scss'
import AttachButton from './subcomponents/AttachButton'

export interface IReleaseArtInputProps {}

interface IPreviews {
  cover?: string
  back?: string
  insert?: string
  gatefoldLeft?: string
  gatefoldRight?: string
}

const previewsDefaults: IPreviews = {
  cover: '',
  back: '',
  insert: '',
  gatefoldLeft: '',
  gatefoldRight: '',
}

const ReleaseArtInput: React.FC<IReleaseArtInputProps> = ({}) => {
  const displays = ['cover', 'back']

  const [display, setDisplay] = useState<string>(displays[0])
  const [previews, setPreviews] = useState<IPreviews>(previewsDefaults)

  const fileElement = useRef<HTMLInputElement>(null)

  const previewImage = previews[display as keyof IPreviews]

  return (
    <div className={styles.component}>
      <div className={styles.display}>
        {previewImage ? (
          <img src={previewImage} />
        ) : (
          <AttachButton onClick={handleAttach} />
        )}
      </div>
      <input
        type="file"
        ref={fileElement}
        onChange={(e) => handleFileChange(e)}
      />
      <select onChange={(e) => setDisplay(e.target.value)}>
        {displays.map((type, i) => (
          <option key={i} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  )

  async function loadArtFromDb() {
    console.log('Loading art from DB...')
    const art: any = await localforage.getItem('tone-uploader-art')

    setPreviews({ ...previews, cover: art.cover.medium })
    return console.log('Art loaded from DB.', { art })
  }

  async function handleAttach() {
    return fileElement.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = e.target.files
    const file = files && files[0]

    if (!file) return console.log('Empty file.')

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      return console.log('Invalid file type.')

    const dataURL = await getDataURLFromFile(file)

    const images = await generateSizes(dataURL)

    await setArtData(display, images)

    const art: any = await localforage.getItem('tone-uploader-art')

    const preview = art[display as keyof IArtData]

    setPreviews({ ...previews, [display]: preview.medium })

    console.log('Art data set.', { type: display })
  }
}

export default ReleaseArtInput
