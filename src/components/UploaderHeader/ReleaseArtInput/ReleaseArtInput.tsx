import localforage from 'localforage'
import React, { useRef, useState } from 'react'
import { IArtData } from '../../../types/ReleaseArt'
import { IReleaseData } from '../../../types/ReleaseData'
import { generateFormData, generateSizes } from '../../../utils/art'
import { getColorsFromArt } from '../../../utils/color'
import { setArtData } from '../../../utils/db'
import { getDataURLFromFile } from '../../../utils/file'
import styles from './ReleaseArtInput.module.scss'
import AttachButton from './subcomponents/AttachButton'

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

export interface IReleaseArtInputProps {
  releaseData: IReleaseData
}

const ReleaseArtInput: React.FC<IReleaseArtInputProps> = ({ releaseData }) => {
  const displays = ['cover*', 'back']

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

    const fileType = file.type

    const dataURL = await getDataURLFromFile(file)

    const colors = await getColorsFromArt(dataURL)

    const images = await generateSizes(dataURL)

    const formData = await generateFormData(images)

    formData.append('releaseId', releaseData.id)

    await fetch('https://api.tone.audio/release/upload/art', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))

    await setArtData(display, images)

    const art: any = await localforage.getItem('tone-uploader-art')

    const preview = art[display as keyof IArtData]

    setPreviews({ ...preview, [display]: preview.medium })

    console.log('Art data set.', { type: display })
  }
}

export default ReleaseArtInput
