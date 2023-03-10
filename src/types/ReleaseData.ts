import { ISongData } from './SongData'

export interface IReleaseData {
  meta: {
    title: string
    info: string
    upc: string
  }
  artists: IReleaseArtist[]
  owners: string[]
  tags: IReleaseTag[]
  songs: ISongData[]
}

export const releaseDataDefaults: IReleaseData = {
  meta: {
    title: '',
    info: '',
    upc: '',
  },
  artists: [],
  owners: [],
  tags: [],
  songs: [],
}

export interface IReleaseMeta {
  title: string
  info: string
  upc: string
}

export const releaseMetaDefaults = {
  title: '',
  info: '',
  upc: '',
}

export interface IReleaseArtist {
  id: string
  display: string
  colors: {
    primary: string
    secondary: string
  }
}

export const releaseArtistDefaults = {
  id: '',
  display: '',
  colors: {
    primary: '',
    secondary: '',
  },
}

export interface IReleaseTag {
  id: number
  display: string
}

export const releaseTagDefaults = {
  id: 0,
  display: '',
}
