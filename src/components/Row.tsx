import '../styled/CMPPage.scss'
import { IList } from '../models/models'
import React, { useState, useEffect } from 'react'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'

// interface Row {
//   list: IList
// }

function Row(row: any, level: any) {
  console.log('row', row)

  const [isEditMode, setIsEditMode] = useState(false)
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined)
  const [rowsState, setRowsState] = useState(row)
  const [editedRow, setEditedRow] = useState<any | null>(null)

  const handleEdit = (rowID: any) => {
    setIsEditMode(true)
    setEditedRow(undefined)
    setRowIDToEdit(rowID)
  }

  const handleRemoveRow = (rowID: any) => {
    const newData = rowsState.filter((row: any) => {
      return row.id !== rowID ? row : null
    })

    setRowsState(newData)
  }

  const handleOnChangeField = (e: any, rowID: any) => {
    e.preventDefault()
    console.log('e', e)

    let { name: fieldName, value } = e.target
    if (fieldName != 'rowName') {
      value = Number(value)
    }
    console.log('handleOnChangeField', fieldName, value, rowID)
    console.log(typeof value)

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
      // console.log('rowsState', rowsState, 'editedRow', editedRow)

      // const newData = rowsState.map((row: any) => {
      let newData = () => {
        const objCopy = { ...rowsState } // 👈️ create copy
        console.log('rowsState', rowsState)
        objCopy.row = {
          id: editedRow.id,
          rowName: rowsState.row.rowName,
          salary: rowsState.row.salary,
          equipmentCosts: rowsState.row.equipmentCosts,
          overheads: rowsState.row.overheads,
          estimatedProfit: rowsState.row.estimatedProfit,
        }

        console.log('objCopy', objCopy)
        // console.log(Object.isFrozen(objCopy))

        if (editedRow.rowName != undefined) {
          objCopy.row.rowName = editedRow.rowName
        }
        if (editedRow.salary != undefined) {
          objCopy.row.salary = editedRow.salary
        }
        if (editedRow.equipmentCosts != undefined)
          objCopy.row.equipmentCosts = editedRow.equipmentCosts
        if (editedRow.overheads) objCopy.row.overheads = editedRow.overheads
        if (editedRow.estimatedProfit)
          objCopy.row.estimatedProfit = editedRow.estimatedProfit

        // console.log('row.rowName', row.rowName)
        console.log('row posle', objCopy)

        return objCopy
      }

      setRowsState(newData)
      setEditedRow(undefined)
    }, 1000)
  }

  // console.log('level', level)

  return (
    <div className='table-info'>
      {/* <div className={`table-level${row.level}`}>
        {' '}
        <img
          src={levelDoc}
          alt='Display card line'
          className={`table-img${row.level}`}
          // onClick={submitmainApp}
        />
      </div> */}
      {isEditMode && rowIDToEdit === rowsState.row.id ? (
        <div className='table-level'>
          <img
            src={levelDoc}
            alt='Display card line'
            className={`table-img${rowsState.level}`}
            onClick={() => handleSaveRowChanges()}
          />

          <img
            src={levelDeletesvg}
            alt='Display card line'
            className='table-img'
            onClick={() => handleRemoveRow(rowsState.row.id)}
          />
        </div>
      ) : (
        <div
          className='table-level'
          onClick={() => handleEdit(rowsState.row.id)}
        >
          <img
            src={levelDoc}
            alt='Display card line'
            className={`table-img${rowsState.level}`}
          />
        </div>
      )}
      {/* <div className='table-level'>{row.row.id}</div> */}
      {isEditMode && rowIDToEdit === rowsState.row.id ? (
        <input
          className='table-namework'
          type='text'
          id={rowsState.row.id}
          name='rowName'
          defaultValue={editedRow ? editedRow.rowName : rowsState.row.rowName}
          onChange={(e) => handleOnChangeField(e, rowsState.row.id)}

          // onKeyDown={(ev) => ev.key === 'Enter'}
        />
      ) : (
        <div className='table-namework'>{rowsState.row.rowName}</div>
      )}
      {/* <div className='table-namework'>{row.row.rowName}</div> */}
      {isEditMode && rowIDToEdit === rowsState.row.id ? (
        <input
          className='table-3'
          type='number'
          defaultValue={editedRow ? editedRow.salary : rowsState.row.salary}
          id={rowsState.row.id}
          name='salary'
          onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
        />
      ) : (
        <div className='table-3'>{rowsState.row.salary}</div>
      )}
      {/* <div className='table-3'>{row.row.salary}</div> */}
      {isEditMode && rowIDToEdit === rowsState.row.id ? (
        <input
          className='table-4'
          type='text'
          defaultValue={
            editedRow ? editedRow.equipmentCosts : rowsState.row.equipmentCosts
          }
          id={rowsState.row.id}
          name='equipmentCosts'
          onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
        />
      ) : (
        <div className='table-4'>{rowsState.row.equipmentCosts}</div>
      )}
      {/* <div className='table-4'>{rowsState.row.equipmentCosts}</div> */}
      <div className='table-5'>{rowsState.row.overheads}</div>
      <div className='table-6'>{rowsState.row.estimatedProfit}</div>
    </div>
  )
}

export default Row
