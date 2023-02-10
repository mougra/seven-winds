import '../styled/CMPPage.scss'
import { IList, IRows } from '../models/models'
import React, { ChangeEvent, useState, useEffect, SyntheticEvent } from 'react'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'
import { fetchUpdateRow } from '../store/actions/characterActions'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { log } from 'console'

interface ModalProps {
  row: IRows
  // level: number
  // isNew: boolean
  isEditMode: boolean
  setIsEditMode(active: boolean): void
  rowIDToEdit: number | undefined
  setRowIDToEdit(active: any): void
  isOpenMode: boolean
  setIsOpenMode(active: any): void
  handleRemoveRow(active: any): void
  // handleAddRow(active: any): void
}
function Row({
  row,
  // level,
  // isNew,
  isEditMode,
  setIsEditMode,
  rowIDToEdit,
  setRowIDToEdit,
  isOpenMode,
  setIsOpenMode,
  handleRemoveRow,
}: // handleAddRow,
ModalProps) {
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
          row: {
            id: editedRow.id,
            rowName: rowsState.row.rowName,
            salary: rowsState.row.salary,
            equipmentCosts: rowsState.row.equipmentCosts,
            overheads: rowsState.row.overheads,
            estimatedProfit: rowsState.row.estimatedProfit,
            machineOperatorSalary: rowsState.row.machineOperatorSalary,
            mainCosts: rowsState.row.mainCosts,
            materials: rowsState.row.materials,
            mimExploitation: rowsState.row.mimExploitation,
            supportCosts: rowsState.row.supportCosts,
            total: rowsState.row.total,
          },
          level: rowsState.level,
          isNew: rowsState.isNew,
        }

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
        console.log('objCopy', objCopy)

        if (objCopy.isNew) {
          console.log('addRow', objCopy.row)
          // dispatch(AddRow(objCopy.row))
          objCopy.isNew = false
        } else {
          console.log('updateRow', objCopy.row)
          dispatch(fetchUpdateRow(objCopy.row))
        }
        return objCopy
      }

      setRowsState(newData)
      setEditedRow(undefined)
      setRowIDToEdit(undefined)
    }
  }

  return (
    <>
      {!deleteRow && (
        <div
          className={
            rowIDToEdit !== rowsState.row.id
              ? 'table-info'
              : 'table-info table-info_active'
          }
          onDoubleClick={() => handleEdit(rowsState.row.id)}
        >
          {!isOpenMode && !isEditMode ? (
            <div className='table-level'>
              <div
                className={`table-level-container${row.level}`}
                onMouseLeave={() => setIsOpenMode(true)}
              >
                <img
                  src={levelDoc}
                  alt='Display card line'
                  className={`table-img0`}
                  // onClick={() => handleAddRow(rowsState.row.id)}
                />

                <img
                  src={levelDeletesvg}
                  alt='Display card line'
                  className='table-img0'
                  onClick={() => handleRemoveRow(rowsState.row.id)}
                />
              </div>
            </div>
          ) : (
            <div className='table-level'>
              <img
                src={levelDoc}
                alt='Display card line'
                className={`table-img${row.level}`}
                onMouseEnter={() => setIsOpenMode(false)}
              />
            </div>
          )}
          {(isEditMode && rowIDToEdit === rowsState.row.id) || row.isNew ? (
            <input
              className='table-namework input'
              type='text'
              name='rowName'
              defaultValue={
                editedRow ? editedRow.rowName : rowsState.row.rowName
              }
              onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-namework'>{rowsState.row.rowName}</div>
          )}
          {(isEditMode && rowIDToEdit === rowsState.row.id) || row.isNew ? (
            <input
              className='table-3 input'
              type='number'
              defaultValue={editedRow ? editedRow.salary : rowsState.row.salary}
              name='salary'
              onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-3'>{rowsState.row.salary}</div>
          )}
          {(isEditMode && rowIDToEdit === rowsState.row.id) || row.isNew ? (
            <input
              className='table-4 input'
              type='number'
              defaultValue={
                editedRow
                  ? editedRow.equipmentCosts
                  : rowsState.row.equipmentCosts
              }
              name='equipmentCosts'
              onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-4'>{rowsState.row.equipmentCosts}</div>
          )}
          {(isEditMode && rowIDToEdit === rowsState.row.id) || row.isNew ? (
            <input
              className='table-5 input'
              type='number'
              defaultValue={
                editedRow ? editedRow.overheads : rowsState.row.overheads
              }
              name='overheads'
              onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-5'>{rowsState.row.overheads}</div>
          )}
          {(isEditMode && rowIDToEdit === rowsState.row.id) || row.isNew ? (
            <input
              className='table-6 input'
              type='number'
              defaultValue={
                editedRow
                  ? editedRow.estimatedProfit
                  : rowsState.row.estimatedProfit
              }
              name='estimatedProfit'
              onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-6'>{rowsState.row.estimatedProfit}</div>
          )}
        </div>
      )}
    </>
  )
}

export default Row
