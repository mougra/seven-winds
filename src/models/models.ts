export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ServerResponse<T> {
  info: {
    count: number
    pages: number
    next: string
    prev: string
  }
  results: T[]
}

export interface ServerEntity {
  id: number
  rowName: string
}
