import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IList } from './../../models/models'
import { IRows, IRow } from '../../models/models'

interface ListState {
  loading: boolean
  error: string
  lists: IList[]
  rows: IRows[]
  newRow: IRow
}

const initialState: ListState = {
  loading: false,
  error: '',
  lists: [],
  rows: [],
  newRow: {
    id: 0,
    rowName: '',
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    parentId: null,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
    total: 0,
  },
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
    rowsNew(state: any, action: PayloadAction<IRow>) {
      for (let i = 0; i < state.rows.length; i++) {
        if (state.rows[i].row.id === 0) {
          state.rows[i].row = action.payload
          console.log('action.payload.id', action.payload.id)
        }
      }

      // state.newRow = action.payload
    },
    rowUpdate(state: any, action: PayloadAction<IRow>) {
      for (let i = 0; i < state.rows.length; i++) {
        if (state.rows[i].row.id === action.payload.id) {
          state.rows[i].row = action.payload
          console.log('action.payload.id', action.payload.id)
        }
      }
    },
    fetchError(state: any, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default entitySlice.reducer
export const { rowsAdd } = entitySlice.actions
