import '../styled/CMPPage.scss'
import { IRows, IList } from '../models/models'
import { useState } from 'react'
import levelDoc from '../assets/levelDoc.svg'
import levelDeletesvg from '../assets/levelDeletesvg.svg'
import { fetchUpdateRow } from '../store/actions/characterActions'
import { useAppDispatch } from '../hook/redux'

interface ModalProps {
  row: IList
  isEditMode: boolean
  setIsEditMode(active: boolean): void
  rowIDToEdit: number | undefined
  setRowIDToEdit(active: any): void
  isOpenMode: boolean
  setIsOpenMode(active: any): void
  handleRemoveRow(active: any): void
  handleAddRow(active: any): void
}

function Lines({
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
  let editedRow: IList | undefined = rowsState

  const handleEdit = (rowID: number, editedRow: IList) => {
    console.log('handleEdit   -   rowID', rowID)
    console.log('handleEdit   -   editedRow', editedRow)

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

    let rowCopy: IList = structuredClone(editedRow)

    if (fieldName == 'rowName') rowCopy.rowName = value
    if (fieldName == 'salary') rowCopy.salary = value
    if (fieldName == 'equipmentCosts') rowCopy.equipmentCosts = value
    if (fieldName == 'overheads') rowCopy.overheads = value
    if (fieldName == 'estimatedProfit') rowCopy.estimatedProfit = value

    editedRow = rowCopy
  }

  const handleSaveRowChanges = (e: any) => {
    if (e.key === 'Enter') {
      setIsEditMode(false)

      if (editedRow === undefined) {
        return rowsState
      }
      // editedRow.isNew = false
      dispatch(fetchUpdateRow(editedRow))

      setRowsState(editedRow)

      editedRow = undefined
      setRowIDToEdit(undefined)
      setIsOpenMode(true)
    }
  }

  function Wrap(props: IList[]) {
    for (let i = 0; i < props.length; i++) {
      getProp(props[i])
    }
    function getProp(rowsW: IList) {
      console.log('rowsW', rowsW)

      if (rowsW.child.length > 0) {
        for (let i = 0; i < rowsW.child.length; i++) {
          getProp(rowsW.child[i])
        }
      }
      // return rowsQ
    }
    // return rowsQ
  }

  // const handleRemoveRow = (rowID: any) => {
  //   console.log('rowID', rowID)
  //   // Wrap(row)
  //   // let count: number = 1
  //   // for (let i = 0; i < lists.length; i++) {
  //   //   if (lists[i].id === rowID) {
  //   //     for (let j = i + 1; j < lists.length; j++) {
  //   //       if (lists[i].level < lists[j].level) {
  //   //         count++
  //   //       } else break
  //   //     }
  //   //     dispatch(deleteRow({ i, count }))
  //   //     break
  //   //   }
  //   // }
  //   // dispatch(fetchDeleteRow(rowID))
  //   // if (lists.length - count === 0) {
  //   // if (lists.length === 0) {
  //   //   dispatch(fetchEntity(true))
  //   // }
  // }

  // console.log(row)
  // row.child.map((ro: any) => console.log(ro))

  return (
    <>
      <div
        className={
          'table__info-container'
          // rowIDToEdit !== rowsState.id
          //   ? `table-info level-${rowsState.level}`
          //   : 'table-info '
        }
        onDoubleClick={() => handleEdit(rowsState.id, rowsState)}
      >
        <div className='table-info'>
          {/* && !rowsState.isNew */}
          {!isOpenMode && !isEditMode ? (
            <div className='table-level'>
              <div
                className={`table-level-container`}
                onMouseLeave={() => setIsOpenMode(true)}
              >
                <img
                  src={levelDoc}
                  alt='Display card line'
                  className={`table-img0`}
                  // onClick={() => handleAddRow(rowsState.id)}
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
                className={`table-img`}
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
              onKeyDown={(e) => handleSaveRowChanges(e)}
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
              onKeyDown={(e) => handleSaveRowChanges(e)}
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
              onKeyDown={(e) => handleSaveRowChanges(e)}
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
              onKeyDown={(e) => handleSaveRowChanges(e)}
            />
          ) : (
            <div className='table-6'>{rowsState.estimatedProfit}</div>
          )}
        </div>
        {row.child.length > 0 &&
          row.child.map((ro: any) => (
            <Lines
              key={ro.id}
              row={ro}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              rowIDToEdit={rowIDToEdit}
              setRowIDToEdit={setRowIDToEdit}
              isOpenMode={isOpenMode}
              setIsOpenMode={setIsOpenMode}
              handleRemoveRow={handleRemoveRow}
              handleAddRow={handleAddRow}
            />
          ))}
      </div>
    </>
  )
}

export default Lines
