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
interface deletePayload {
  i: number
  count: number
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
        }
      }
    },
    rowUpdate(state: any, action: PayloadAction<IRow>) {
      for (let i = 0; i < state.rows.length; i++) {
        if (state.rows[i].row.id === action.payload.id) {
          state.rows[i].row = action.payload
        }
      }
    },
    fetchError(state: any, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
    deleteRow(state: any, action: PayloadAction<deletePayload>) {
      state.rows.splice(action.payload.i, action.payload.count)
    },
  },
})

export default entitySlice.reducer
export const { rowsAdd, deleteRow } = entitySlice.actions
