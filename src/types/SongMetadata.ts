export interface ISongMetadata {
  title: string
  duration: number
  artists: string
  description?: string
  lyrics?: ILyrics
  bpm?: number
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
  lyrics: {
    string: '',
    lines: [],
    language: '',
    timestamps: [],
  },
  bpm: 0,
  key: '',
  isrc: '',
  iswc: '',
  tags: '',
  recordedAt: '',
  locationCreated: '',
  credits: {},
}

export interface ILyrics {
  string: string
  lines: string[]
  language?: string
  timestamps?: ITimestamps[]
}

export const lyricsDefaults: ILyrics = {
  string: '',
  lines: [],
  language: '',
  timestamps: [],
}

interface ITimestamps {
  line: number
  start: number
  stop: number
}
