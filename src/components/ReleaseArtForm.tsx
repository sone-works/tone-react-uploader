import localforage from 'localforage'
import React, { useEffect, useRef, useState } from 'react'
import { IArtData } from '../types/ReleaseArt'
import styles from '../Uploader.module.scss'
import { generateSizes } from '../utils/art'
import { setArtData } from '../utils/db'
import { getDataURLFromFile } from '../utils/file'

export interface IReleaseArtFormProps {
  importFinished: boolean
  checkedForSave: boolean
}

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

const ReleaseArtForm: React.FC<IReleaseArtFormProps> = ({
  importFinished,
  checkedForSave,
}) => {
  const [previews, setPreviews] = useState<IPreviews>(previewsDefaults)

  const coverInputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (importFinished || checkedForSave) handleImport()
  }, [importFinished, checkedForSave])

  return (
    <div className={styles.releaseArt}>
      {previews.cover && <img src={previews.cover} alt="Release Cover" />}
      {/* Would be cool to have a 3d/fake 3d render of the release thing here
    ie. adding cover just displays a cover, adding a back cover adds a little rotating CD case, 
    adding gatefold art had a 3d modled gatefold with the appropriate art, insert art can maybe
     pop out of a vinyl as a little paper, can even go as detailed as the vinyl circle sticker
     things in the middle lol jesus
     
     Cassette model, cassette jcard, pick your tape color, put your tape art???
     */}
      <div className={styles.group}>
        <h5>Cover*</h5>
        <input
          type="file"
          onChange={(e) => handleArt('cover', e.target.files)}
          ref={coverInputElement}
        />
      </div>
      <div className={styles.group}>
        <h5>Back</h5>
        <input
          type="file"
          onChange={(e) => handleArt('back', e.target.files)}
        />
      </div>
      <div className={styles.group}>
        <h5>Insert</h5>
        <input
          type="file"
          onChange={(e) => handleArt('insert', e.target.files)}
        />
      </div>
      <div className={styles.group}>
        <h5>Gatefold Left</h5>
        <input
          type="file"
          onChange={(e) => handleArt('gatefold-left', e.target.files)}
        />
      </div>
      <div className={styles.group}>
        <h5>Gatefold Right</h5>
        <input
          type="file"
          onChange={(e) => handleArt('gatefold-right', e.target.files)}
        />
      </div>
    </div>
  )

  async function handleArt(type: string, files: FileList | null) {
    const file = files && files[0]

    if (!file) return console.log('Invalid file.')

    if (file.type !== 'image/jpeg' && file.type !== 'image/png')
      return console.log('Invalid file type.')

    const dataURL = await getDataURLFromFile(file)

    const images = await generateSizes(dataURL)

    await setArtData(type, images)

    const art: any = await localforage.getItem('tone-uploader-art')

    const preview = art[type as keyof IArtData]

    setPreviews({ ...previews, [type]: preview.medium })

    console.log('Art data set.', { type })
  }

  async function handleImport() {
    console.log('Loading art from DB...')
    const art: any = await localforage.getItem('tone-uploader-art')

    setPreviews({ ...previews, cover: art.cover.medium })
    return console.log('Art loaded from DB.', { art })

    /*if (coverDataURL) {
      const fileName = 'importedCover.png'
      const blob = await fetch(coverDataURL).then((response) => response.blob())
      const file = new File([blob], fileName)

      const container = new DataTransfer()
      container.items.add(file)

      coverInputElement.current!.files = container.files
      setCoverPreview(coverDataURL)
      console.log('Cover imported successfully.')*/
  }
}

export default ReleaseArtForm
