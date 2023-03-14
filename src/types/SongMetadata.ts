export interface ISongMetadata {
  title: string
  duration: number
  artists: string
  description?: string
  lyrics?: ILyric[]
  bpm?: string
  key?: string
  isrc?: string
  iswc?: string
  tags?: string
  recordedAt?: string
  locationCreated?: string
  credits?: object
}

export const songMetadataDefaults: ISongMetadata = {
  title: '',
  duration: 0,
  artists: '',
  description: '',
  lyrics: [],
  bpm: '',
  key: '',
  isrc: '',
  iswc: '',
  tags: '',
  recordedAt: '',
  locationCreated: '',
  credits: {},
}

export interface ILyric {
  line: string
  start: number
}

export const lyricDefaults: ILyric = {
  line: '',
  start: 0,
}
