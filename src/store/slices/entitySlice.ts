import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ServerEntity } from '../../models/models'

interface CharacterState {
  loading: boolean
  error: string
  // responseEntity: {
  // eID: number
  // rowName: string
  // }
  eID: number
  rowName: string
  // characters: ICharacter[]
}

const initialState: CharacterState = {
  loading: false,
  error: '',
  // responseEntity: {
  //   eID: 0,
  //   rowName: '',
  // },
  eID: 0,
  rowName: '',
  // characters: [],
}

export const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    fetching(state: any) {
      state.loading = true
    },
    fetchSuccess(state: any, action: PayloadAction<ServerEntity>) {
      state.loading = false
      state.eID = action.payload.id
      state.rowName = action.payload.rowName
      state.error = ''
    },
    fetchError(state: any, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default entitySlice.reducer
