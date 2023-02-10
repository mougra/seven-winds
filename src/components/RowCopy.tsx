import '../styled/CMPPage.scss'
import { IRows } from '../models/models'
import { useState } from 'react'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'
import { fetchUpdateRow } from '../store/actions/characterActions'
import { useAppDispatch } from '../hook/redux'

interface ModalProps {
  row: IRows
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

  const [rowsState, setRowsState] = useState(row)
  let editedRow: IRows | undefined = rowsState

  console.log(row)

  const handleEdit = (rowID: any) => {
    if (isEditMode !== true) {
      setIsEditMode(true)
      editedRow = rowsState
      setRowIDToEdit(rowID)
    }
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

    let rowCopy: IRows = structuredClone(editedRow)

    if (fieldName == 'rowName') rowCopy.row.rowName = value
    if (fieldName == 'salary') rowCopy.row.salary = value
    if (fieldName == 'equipmentCosts') rowCopy.row.equipmentCosts = value
    if (fieldName == 'overheads') rowCopy.row.overheads = value
    if (fieldName == 'estimatedProfit') rowCopy.row.estimatedProfit = value

    editedRow = rowCopy
  }

  // const handleCancelEditing = () => {
  //   setIsEditMode(false)
  //   setEditedRow(undefined)
  // }

  const handleSaveRowChanges = (e: any) => {
    if (e.key === 'Enter') {
      setIsEditMode(false)

      if (editedRow === undefined) {
        return rowsState
      }
      editedRow.isNew = false
      dispatch(fetchUpdateRow(editedRow.row))

      setRowsState(editedRow)

      editedRow = undefined
      setRowIDToEdit(undefined)
      setIsOpenMode(true)
    }
  }

  return (
    <>
      <div
        className={
          rowIDToEdit !== rowsState.row.id
            ? 'table-info'
            : 'table-info table-info_active'
        }
        onDoubleClick={() => handleEdit(rowsState.row.id)}
      >
        {!isOpenMode && !isEditMode && !rowsState.isNew ? (
          <div className='table-level'>
            <div
              className={`table-level-container${row.level}`}
              onMouseLeave={() => setIsOpenMode(true)}
            >
              <img
                src={levelDoc}
                alt='Display card line'
                className={`table-img0`}
                onClick={() => handleAddRow(rowsState.row.id)}
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
        {(isEditMode && rowIDToEdit === rowsState.row.id) || rowsState.isNew ? (
          <input
            className='table-namework input'
            type='text'
            name='rowName'
            defaultValue={
              editedRow ? editedRow.row.rowName : rowsState.row.rowName
            }
            onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-namework'>{rowsState.row.rowName}</div>
        )}
        {(isEditMode && rowIDToEdit === rowsState.row.id) || rowsState.isNew ? (
          <input
            className='table-3 input'
            type='number'
            defaultValue={
              editedRow ? editedRow.row.salary : rowsState.row.salary
            }
            name='salary'
            onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-3'>{rowsState.row.salary}</div>
        )}
        {(isEditMode && rowIDToEdit === rowsState.row.id) || rowsState.isNew ? (
          <input
            className='table-4 input'
            type='number'
            defaultValue={
              editedRow
                ? editedRow.row.equipmentCosts
                : rowsState.row.equipmentCosts
            }
            name='equipmentCosts'
            onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-4'>{rowsState.row.equipmentCosts}</div>
        )}
        {(isEditMode && rowIDToEdit === rowsState.row.id) || rowsState.isNew ? (
          <input
            className='table-5 input'
            type='number'
            defaultValue={
              editedRow ? editedRow.row.overheads : rowsState.row.overheads
            }
            name='overheads'
            onChange={(e) => handleOnChangeField(e, rowsState.row.id)}
            onKeyDown={(e) => handleSaveRowChanges(e)}
          />
        ) : (
          <div className='table-5'>{rowsState.row.overheads}</div>
        )}
        {(isEditMode && rowIDToEdit === rowsState.row.id) || rowsState.isNew ? (
          <input
            className='table-6 input'
            type='number'
            defaultValue={
              editedRow
                ? editedRow.row.estimatedProfit
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
    </>
  )
}

export default Row
