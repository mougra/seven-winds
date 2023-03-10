import { AppDispatch } from '..'
import axios from '../../axios'
import { IList } from './../../models/models'
import { entitySlice } from '../slices/entitySlice'
import { IRows, IRow } from '../../models/models'

const eID = 33245

export const fetchEntity = (isEmpty: boolean) => {
  function Wrap(props: IList[]) {
    let level = 0
    let rowsQ: IRows[] = []
    for (let i = 0; i < props.length; i++) {
      getProp(props[i])
      level--
    }
    function getProp(rowsW: IRow) {
      rowsQ.push({ row: rowsW, level: level, isNew: false })
      level++
      if (rowsW.child.length > 0) {
        for (let i = 0; i < rowsW.child.length; i++) {
          getProp(rowsW.child[i])
          level--
        }
      }
      return rowsQ
    }
    return rowsQ
  }

  const eID = 33245

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(entitySlice.actions.fetching())
      const responseEntityList = await axios.get<any>(
        `/v1/outlay-rows/entity/${eID}/row/list`
      )
      dispatch(entitySlice.actions.fetchSuccess(responseEntityList.data))
      const rows = Wrap(responseEntityList.data)
      if (responseEntityList.data.length == 0 || isEmpty === true) {
        const responseCreate = await axios.post<any>(
          `/v1/outlay-rows/entity/${eID}/row/create`,
          {
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
          }
        )
        dispatch(
          entitySlice.actions.rowsAdd([
            { row: responseCreate.data.current, level: 0, isNew: true },
          ])
        )
      } else {
        dispatch(entitySlice.actions.rowsModified(rows))
      }
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchUpdateRow = (DATA: IRow) => {
  return async (dispatch: AppDispatch) => {
    try {
      const qwe = await axios.post<any>(
        `/v1/outlay-rows/entity/${eID}/row/${DATA.id}/update`,
        DATA
      )
      dispatch(entitySlice.actions.rowUpdate(qwe.data.current))
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchAddRow = (DATA: IRow) => {
  return async (dispatch: AppDispatch) => {
    try {
      const qwe = await axios.post<any>(
        `/v1/outlay-rows/entity/${eID}/row/create`,
        DATA
      )
      dispatch(entitySlice.actions.rowsNew(qwe.data.current))
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchDeleteRow = (ID: IRow) => {
  return async (dispatch: AppDispatch) => {
    try {
      const qwe = await axios.delete<any>(
        `/v1/outlay-rows/entity/${eID}/row/${ID}/delete`
      )
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}
