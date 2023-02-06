import '../styled/CMPPage.scss'
import { IList } from '../models/models'
import React, { ChangeEvent, useState, useEffect, SyntheticEvent } from 'react'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'
import { updateRow } from '../store/actions/characterActions'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { log } from 'console'

interface ModalProps {
  row: IList
  level: number
  isEditMode: boolean
  setIsEditMode(active: boolean): void
  rowIDToEdit: number | undefined
  setRowIDToEdit(active: any): void
  isOpenMode: boolean
  setIsOpenMode(active: any): void
  handleRemoveRow(active: any): void
  handleAddRow(active: any): void
}
function Row({
  row,
  level,
  isEditMode,
  setIsEditMode,
  rowIDToEdit,
  setRowIDToEdit,
  isOpenMode,
  setIsOpenMode,
  handleRemoveRow,
  handleAddRow,
}: ModalProps) {
  const dispatch = useAppDispatch()

  // const [isEditMode, setIsEditMode] = useState(false)
  // const [rowIDToEdit, setRowIDToEdit] = useState(undefined)
  const [rowsState, setRowsState] = useState(row)
  const [editedRow, setEditedRow] = useState<any | null>(null)
  const [deleteRow, setDeleteRow] = useState(false)

  const handleEdit = (rowID: any) => {
    setIsEditMode(true)
    setEditedRow(undefined)
    setRowIDToEdit(rowID)
  }

  const handleOnChangeField = (
    event: any,
    // ChangeEvent<HTMLInputElement>
    rowID: any
  ) => {
    event.preventDefault()
    let { name: fieldName, value } = event.target
    if (fieldName != 'rowName') {
      value = Number(value)
    }
    console.log('handleOnChangeField', fieldName, value, rowID)

    setEditedRow({
      id: rowID,
      [fieldName]: value,
    })
  }

  // const handleCancelEditing = () => {
  //   setIsEditMode(false)
  //   setEditedRow(undefined)
  // }

  const handleSaveRowChanges = (e: any) => {
    if (e.key === 'Enter') {
      setIsEditMode(false)

      if (editedRow === undefined) {
        return
      }
      let newData = () => {
        let objCopy = { ...rowsState } // 👈️ create copy
        objCopy = {
          id: editedRow.id,
          rowName: rowsState.rowName,
          salary: rowsState.salary,
          equipmentCosts: rowsState.equipmentCosts,
          overheads: rowsState.overheads,
          estimatedProfit: rowsState.estimatedProfit,
          machineOperatorSalary: rowsState.machineOperatorSalary,
          mainCosts: rowsState.mainCosts,
          materials: rowsState.materials,
          mimExploitation: rowsState.mimExploitation,
          supportCosts: rowsState.supportCosts,
          total: rowsState.total,
        }

        if (editedRow.rowName != undefined) {
          objCopy.rowName = editedRow.rowName
        }
        if (editedRow.salary != undefined) {
          objCopy.salary = editedRow.salary
        }
        if (editedRow.equipmentCosts != undefined)
          objCopy.equipmentCosts = editedRow.equipmentCosts
        if (editedRow.overheads) objCopy.overheads = editedRow.overheads
        if (editedRow.estimatedProfit)
          objCopy.estimatedProfit = editedRow.estimatedProfit

        dispatch(updateRow(objCopy))
        return objCopy
      }

      setRowsState(newData)
      setEditedRow(undefined)
    }
  }

  return (
    <>
      {!deleteRow && (
        <div
          className={
            rowIDToEdit !== rowsState.id
              ? 'table-info'
              : 'table-info table-info_active'
          }
          onDoubleClick={() => handleEdit(rowsState.id)}
        >
          {!isOpenMode && !isEditMode ? (
            <div className='table-level'>
              <div
                className={`table-level-container${level}`}
                onMouseLeave={() => setIsOpenMode(true)}
              >
                <img
                  src={levelDoc}
                  alt='Display card line'
                  className={`table-img0`}
                  onClick={() => handleAddRow(rowsState.id)}
                />

                <img
                  src={levelDeletesvg}
                  alt='Display card line'
                  className='table-img0'
                  onClick={() => handleRemoveRow(rowsState.id)}
                />
              </div>
            </div>
          ) : (
            <div className='table-level'>
              <img
                src={levelDoc}
                alt='Display card line'
                className={`table-img${level}`}
                onMouseEnter={() => setIsOpenMode(false)}
              />
            </div>
          )}
          {isEditMode && rowIDToEdit === rowsState.id ? (
            <input
              className='table-namework input'
              type='text'
              name='rowName'
              defaultValue={editedRow ? editedRow.rowName : rowsState.rowName}
              onChange={(e) => handleOnChangeField(e, rowsState.id)}
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-namework'>{rowsState.rowName}</div>
          )}
          {isEditMode && rowIDToEdit === rowsState.id ? (
            <input
              className='table-3 input'
              type='number'
              defaultValue={editedRow ? editedRow.salary : rowsState.salary}
              name='salary'
              onChange={(e) => handleOnChangeField(e, rowsState.id)}
            />
          ) : (
            <div className='table-3'>{rowsState.salary}</div>
          )}
          {isEditMode && rowIDToEdit === rowsState.id ? (
            <input
              className='table-4 input'
              type='number'
              defaultValue={
                editedRow ? editedRow.equipmentCosts : rowsState.equipmentCosts
              }
              name='equipmentCosts'
              onChange={(e) => handleOnChangeField(e, rowsState.id)}
            />
          ) : (
            <div className='table-4'>{rowsState.equipmentCosts}</div>
          )}
          {isEditMode && rowIDToEdit === rowsState.id ? (
            <input
              className='table-5 input'
              type='number'
              defaultValue={
                editedRow ? editedRow.overheads : rowsState.overheads
              }
              name='overheads'
              onChange={(e) => handleOnChangeField(e, rowsState.id)}
            />
          ) : (
            <div className='table-5'>{rowsState.overheads}</div>
          )}
          {isEditMode && rowIDToEdit === rowsState.id ? (
            <input
              className='table-6 input'
              type='number'
              defaultValue={
                editedRow
                  ? editedRow.estimatedProfit
                  : rowsState.estimatedProfit
              }
              name='estimatedProfit'
              onChange={(e) => handleOnChangeField(e, rowsState.id)}
            />
          ) : (
            <div className='table-6'>{rowsState.estimatedProfit}</div>
          )}
        </div>
      )}
    </>
  )
}

export default Row
