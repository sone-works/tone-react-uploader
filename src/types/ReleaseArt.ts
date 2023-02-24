export interface IReleaseArt {
  cover: IArtData
  back?: IArtData
  insert?: IArtData
  gatefold?: {
    left?: IArtData
    right?: IArtData
  }
}

export const releaseArtDefaults = {
  cover: {
    full: '',
    large: '',
    medium: '',
    small: '',
    thumb: '',
  },
}

export interface IArtData {
  full: string
  large: string
  medium: string
  small: string
  thumb: string
}
