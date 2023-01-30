import { AppDispatch } from '..'
import axios from '../../axios'
import { IList } from './../../models/models'
import { entitySlice } from '../slices/entitySlice'

export const fetchEntity = () => {
  // const DATA: IList = {
  //   equipmentCosts: 124123,
  //   estimatedProfit: 34523452345,
  //   machineOperatorSalary: 0,
  //   mainCosts: 0,
  //   materials: 0,
  //   mimExploitation: 0,
  //   overheads: 0,
  //   parentId: 25595,
  //   rowName: 'asdasdasdasad',
  //   salary: 0,
  //   supportCosts: 0,
  // }
  // let DATAJSON = JSON.stringify(DATA)

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
      console.log(responseEntityList.data)
      dispatch(entitySlice.actions.fetchSuccess(responseEntityList.data))
    } catch (e) {
      dispatch(entitySlice.actions.fetchError(e as Error))
    }
  }
}

// export const fetchEntityList = () => {
//   return async (dispatch: AppDispatch) => {
//     try {

//       dispatch(entitySlice.actions.fetchSuccess(responseEntity.data))
//     } catch (e) {
//       dispatch(entitySlice.actions.fetchError(e as Error))
//     }
//   }
// }
