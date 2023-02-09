import { AppDispatch } from '..'
import axios from '../../axios'
import { IList } from './../../models/models'
import { entitySlice } from '../slices/entitySlice'
import { IRows, IRow } from '../../models/models'
import { useAppSelector } from '../../hook/redux'

const eID = 33245

export const fetchEntity = () => {
  console.log('Запрос на серв, получение данных')
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

      // const qwe = await axios.post<any>(
      //   `/v1/outlay-rows/entity/${eID}/row/create`,
      //   DATA
      // )
      console.log(responseEntityList.data)
      dispatch(entitySlice.actions.fetchSuccess(responseEntityList.data))
      const rows = Wrap(responseEntityList.data)
      dispatch(entitySlice.actions.rowsModified(rows))
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchUpdateRow = (DATA: any) => {
  console.log('Запрос на серв, обновление данных')

  return async (dispatch: AppDispatch) => {
    try {
      const qwe = await axios.post<any>(
        `/v1/outlay-rows/entity/${eID}/row/${DATA.id}/update`,
        DATA
      )
      console.log(qwe.data)
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

export const fetchAddRow = (DATA: any) => {
  console.log('Запрос на серв, создание строки')

  return async (dispatch: AppDispatch) => {
    try {
      const qwe = await axios.post<any>(
        `/v1/outlay-rows/entity/${eID}/row/create`,
        DATA
      )
      console.log(qwe.data)
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}
