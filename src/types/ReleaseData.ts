import { ISongData } from './SongData'

export interface IReleaseData {
  meta: {
    title: string
    info: string
    isrc: string
  }
  artists: string[]
  owners: string[]
  tags: string[]
  songs: ISongData[]
}

export const releaseDataDefaults: IReleaseData = {
  meta: {
    title: '',
    info: '',
    isrc: '',
  },
  artists: [],
  owners: [],
  tags: [],
  songs: [],
}

export interface IReleaseMeta {
  title: string
  info: string
  isrc: string
}

export const releaseMetaDefaults = {
  title: '',
  info: '',
  isrc: '',
}
