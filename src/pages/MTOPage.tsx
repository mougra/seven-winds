import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from '../store/actions/characterActions'
import '../styled/CMPPage.scss'
// import Line from '../components/Line'
import { IList } from '../models/models'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'
import Row from '../components/Row'

function CMP() {
  const dispatch = useAppDispatch()
  const { error, loading, lists } = useAppSelector((state) => state.entity)
  const [isEditMode, setIsEditMode] = useState(false)
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined)
  const [rowsState, setRowsState] = useState(lists)
  const [editedRow, setEditedRow] = useState<any | null>(null)

  const handleEdit = (rowID: any) => {
    setIsEditMode(true)
    setEditedRow(undefined)
    setRowIDToEdit(rowID)
  }

  const handleRemoveRow = (rowID: any) => {
    const newData = rowsState.filter((row) => {
      return row.id !== rowID ? row : null
    })

    setRowsState(newData)
  }

  const handleOnChangeField = (e: any, rowID: any) => {
    e.preventDefault()
    const { name: fieldName, value } = e.target
    console.log('handleOnChangeField', fieldName, value, rowID)
    setEditedRow({
      id: rowID,
      [fieldName]: value,
    })
    console.log('editedRow', editedRow)
  }

  const handleCancelEditing = () => {
    setIsEditMode(false)
    setEditedRow(undefined)
  }

  const handleSaveRowChanges = () => {
    setTimeout(() => {
      setIsEditMode(false)

      const newData = rowsState.map((row) => {
        // console.log('row.id', row.id, '=? editedRow.id', editedRow.id)
        // console.log('editedRow.rowName', editedRow.rowName)
        console.log('row do', row)
        if (row.id === editedRow.id) {
          if (editedRow.rowName) row.rowName = editedRow.rowName
          if (editedRow.salary) row.salary = editedRow.salary
          if (editedRow.equipmentCosts)
            row.equipmentCosts = editedRow.equipmentCosts
          if (editedRow.overheads) row.overheads = editedRow.overheads
          if (editedRow.estimatedProfit)
            row.estimatedProfit = editedRow.estimatedProfit
        }
        // console.log('row.rowName', row.rowName)
        console.log('row posle', row)
        return row
      })

      setRowsState(newData)
      setEditedRow(undefined)
    }, 1000)
  }

  useEffect(() => {
    dispatch(fetchEntity())
    setRowsState(lists)
    // console.log('rowsState', rowsState)
  }, [])

  const submitmainApp = (event: React.FormEvent) => {
    event.preventDefault()
  }

  // interface rowProps {
  //   props: IList
  // }

  function Wrap(props: IList[]) {
    let level = 0
    let rowsQ: any[] = []
    for (let i = 0; i < props.length; i++) {
      // rowsQ.push(props[i], level)
      // console.log(rowsQ)
      getProp(props[i])
      level--
    }

    // for (let i = 0; i < props.props.total; i++) {

    // }

    function getProp(rowsW: any) {
      rowsQ.push({ row: rowsW, level: level })
      level++
      // <div key={o.id} className='table-info'>
      //   <div className={`table-level${level}`}>
      //     {' '}
      //     <img
      //       src={levelDoc}
      //       alt='Display card line'
      //       className={`table-img${level}`}
      //       // onClick={submitmainApp}
      //     />
      //   </div>
      //   <div className='table-namework'>{o.rowName}</div>
      //   <div className='table-3'>{o.salary}</div>
      //   <div className='table-4'>{o.equipmentCosts}</div>
      //   <div className='table-5'>{o.overheads}</div>
      //   <div className='table-6'>{o.estimatedProfit}</div>
      // </div>

      if (rowsW.child.length > 0) {
        for (let i = 0; i < rowsW.child.length; i++) {
          getProp(rowsW.child[i])
          level--
        }
      }

      return rowsQ
    }
    // console.log('rowsQ', rowsQ)

    return rowsQ
  }

  let State: any = Wrap(rowsState)

  console.log(State)

  return (
    <>
      <div className='table-main'>
        <h1 className='h1-title'>Строительно-монтажные работы</h1>
        <div className='table-info'>
          <div className='table-level'>Уровень</div>
          <div className='table-namework'>Наименование работ</div>
          <div className='table-3'>Основная з/п</div>
          <div className='table-4'>Оборудование</div>
          <div className='table-5'>Накладные расходы</div>
          <div className='table-6'>Сметная прибыль</div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Усп</p>}

        {!error && !loading && (
          <div>
            {/* {lists.map((list) => (
              <Line key={list.id} list={list} />
            ))} */}
            {State.map((row: any) => (
              <Row key={row.row.id} row={row.row} level={row.level} />
            ))}
            {/* {rowsState.map((row) => (
              <Wrap key={row.id} props={row} />
            ))} */}
            {/* {linetest} */}
          </div>
        )}
      </div>
    </>
  )
}

export default CMP
