export interface IList {
  child: any
  id: number
  equipmentCosts: number
  estimatedProfit: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  overheads: number
  parentId?: null | number
  rowName: string
  salary: number
  supportCosts: number
  total: number
  level: number
}

// export interface ServerResponse<T> {
//   info: {
//     count: number
//     pages: number
//     next: string
//     prev: string
//   }
//   results: T[]
// }

// export interface ServerResponseEntity<T> {

//   config: any
//   data: T[]
//   headers: any
//   status: number
//   statusText: string
// }
