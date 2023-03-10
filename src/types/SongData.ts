import { ISongMetadata, songMetadataDefaults } from './SongMetadata'

export interface ISongData {
  meta: ISongMetadata
  dataPos: number | null
}

export const songDataDefaults: ISongData = {
  meta: songMetadataDefaults,
  dataPos: null,
}
