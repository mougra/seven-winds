import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IList } from './../../models/models'
import { IRows } from '../../models/models'

interface ListState {
  loading: boolean
  error: string
  lists: IList[]
  rows: IRows[]
}

const initialState: ListState = {
  loading: false,
  error: '',
  lists: [],
  rows: [],
}

export const entitySlice = createSlice({
  name: 'entity',
  initialState,
  reducers: {
    fetching(state: any) {
      state.loading = true
    },
    fetchSuccess(state: any, action: PayloadAction<IRows>) {
      state.loading = false
      state.lists = action.payload
      state.error = ''
    },
    rowsModified(state: any, action: PayloadAction<IRows[]>) {
      state.rows = action.payload
    },
    rowsAdd(state: any, action: PayloadAction<IRows[]>) {
      state.rows = action.payload
    },
    fetchError(state: any, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default entitySlice.reducer
export const { rowsAdd } = entitySlice.actions
