import { AppDispatch } from '..'
import axios from '../../axios'
import { ServerEntity } from './../../models/models'
import { entitySlice } from '../slices/entitySlice'

export const fetchEntity = () => {
  interface dataProps {
    equipmentCosts: number
    estimatedProfit: number
    machineOperatorSalary: number
    mainCosts: number
    materials: number
    mimExploitation: number
    overheads: number
    parentId: any
    rowName: string
    salary: number
    supportCosts: number
  }

  const DATA: dataProps = {
    equipmentCosts: 124123,
    estimatedProfit: 34523452345,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    parentId: 25595,
    rowName: 'asdasdasdasad',
    salary: 0,
    supportCosts: 0,
  }

  let DATAJSON = JSON.stringify(DATA)
  // console.log(DATAJSON)
  // console.log(JSON.parse(DATAJSON))

  const eID = 33245
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(entitySlice.actions.fetching())

      //////////////////
      const responseEntity = await axios.post<ServerEntity>(
        '/v1/outlay-rows/entity/create'
      )
      /////////////////////////////
      dispatch(entitySlice.actions.fetchSuccess(responseEntity.data))
      const qwe = await axios.get<any>(`/v1/outlay-rows/entity/${eID}/row/list`)

      // const qwe = await axios.post<any>(
      //   `/v1/outlay-rows/entity/${eID}/row/create`,
      //   DATA
      // )
      console.log(qwe)
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
