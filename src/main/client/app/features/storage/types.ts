export type PresignURLRequestDTO = {
  objectKey: string
  file: File
}

export type PresignURLResponseDTO = {
  objectKey: string
  url: string
}

export type DeleteObjectDTO = {
  objectKey: string
}
