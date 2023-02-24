export interface IReleaseSong {
  type: string
  data: string
}

export const releaseSongDefaults: IReleaseSong = {
  type: '',
  data: '',
}

/*export interface ReleaseSong {
  name: string
  owners: string[]
  file: {
    type: string
    name: string
  }
  data: {
    flac: string
    wav: string
    'mp3-320': string
    'mp3-128': string
  }
}

export const releaseSongDefaults: ReleaseSong = {
  name: '',
  owners: [],
  file: {
    type: '',
    name: '',
  },
  data: {
    flac: '',
    wav: '',
    'mp3-320': '',
    'mp3-128': '',
  },
}*/
