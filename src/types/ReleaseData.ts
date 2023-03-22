import { ISongData } from './SongData'

export interface IReleaseData {
  id: string
  meta: {
    title: string
    info: string
    upc: string
  }
  credits: IReleaseCredit[]
  artists: IReleaseArtist[]
  owners: string[]
  tags: IReleaseTag[]
  songs: ISongData[]
}

export const releaseDataDefaults: IReleaseData = {
  id: '',
  meta: {
    title: '',
    info: '',
    upc: '',
  },
  credits: [],
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

export interface IReleaseCredit {
  person: { id: string; display: string }[]
  credits: { id: string; display: string }[]
}

export const releaseCreditDefaults = {
  person: [],
  credits: [],
}
