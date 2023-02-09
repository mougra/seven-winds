import { createSlice } from '@reduxjs/toolkit'
import { IRows } from '../../models/models'
import { localStore } from '../localStore'

const initialState: RowsState = {
  rows: [],
  // localStore.get('ROWS') ? localStore.get('ROWS').rows :
  isEditMode: false,
  isOpenMode: false,
  rowIDToEdit: 0,
}

interface RowsState {
  rows: IRows[]
  isEditMode: boolean
  isOpenMode: boolean
  rowIDToEdit: number
}

export const modifiedRowsSlice = createSlice({
  name: 'modifiedRows',
  initialState,
  reducers: {
    modifiedEntity(state, action) {
      state.rows = action.payload.state
      // localStore.set('ROWS', {
      //   rows: state.rows,
      // })
      // state.isEditMode = false
      // state.isOpenMode = false
      // state.rowIDToEdit = 0
      // state.authLoginOrEmail = action.payload.authLoginOrEmail
      // state.authPassword = action.payload.authPassword
      // state.isAuth = Boolean(action.payload.authLoginOrEmail)
      // state.userId = action.payload.userId
      // if (action.payload.save) {
      // }
    },
    createRow(state, action) {
      // state.authLoginOrEmail = ''
      // state.authPassword = ''
      // state.isAuth = false
      // state.userId = 0
    },
  },
})

export default modifiedRowsSlice.reducer
export const { modifiedEntity, createRow } = modifiedRowsSlice.actions
