import '../styled/CMPPage.scss'
import { IList } from './../models/models'

interface LineProps {
  list: IList
}

function Line({ list }: LineProps) {
  return (
    <div className='table-info'>
      <div className='table-level'>{list.id}</div>
      <div className='table-namework'>{list.rowName}</div>
      <div className='table-3'>{list.salary}</div>
      <div className='table-4'>{list.equipmentCosts}</div>
      <div className='table-5'>{list.overheads}</div>
      <div className='table-6'>{list.estimatedProfit}</div>
    </div>
  )
}

export default Line
