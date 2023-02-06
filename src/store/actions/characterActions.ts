import { AppDispatch } from '..'
import axios from '../../axios'
import { IList } from './../../models/models'
import { entitySlice } from '../slices/entitySlice'

const eID = 33245

export const fetchEntity = () => {
  console.log('Запрос на серв, получение данных')

  const eID = 33245
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(entitySlice.actions.fetching())

      //////////////////       это только ради eID
      // const responseEntity = await axios.post<ServerEntity>(
      //   '/v1/outlay-rows/entity/create'
      // )
      // /////////////////////////////
      // dispatch(entitySlice.actions.fetchSuccess(responseEntity.data))
      const responseEntityList = await axios.get<any>(
        `/v1/outlay-rows/entity/${eID}/row/list`
      )

      // const qwe = await axios.post<any>(
      //   `/v1/outlay-rows/entity/${eID}/row/create`,
      //   DATA
      // )
      // console.log(responseEntityList.data)
      dispatch(entitySlice.actions.fetchSuccess(responseEntityList.data))
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

export const updateRow = (DATA: any) => {
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
