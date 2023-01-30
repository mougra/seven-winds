import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IList } from './../../models/models'

interface ListState {
  loading: boolean
  error: string
  lists: IList[]
}

const initialState: ListState = {
  loading: false,
  error: '',
  lists: [],
}

export const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    fetching(state: any) {
      state.loading = true
    },
    fetchSuccess(state: any, action: PayloadAction<IList>) {
      state.loading = false
      state.lists = action.payload
      state.error = ''
    },
    fetchError(state: any, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default entitySlice.reducer
