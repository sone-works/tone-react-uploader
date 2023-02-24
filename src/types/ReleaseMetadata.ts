export interface ReleaseMetadata {
  name: string
  info: string
  isrc: string
  lyrics: string
}

export const releaseMetadataDefaults: ReleaseMetadata = {
  name: '',
  info: '',
  isrc: '',
  lyrics: '',
}
