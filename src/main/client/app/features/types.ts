export type Page<T> = {
  content: T[];
  page: {
    number: number,
    size: number,
    totalElements: number,
    totalPages: number
  }
};

export type WebSocketMessage<T> = {
  type: string,
  payload: T
}
