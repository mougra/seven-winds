import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from '../store/actions/characterActions'
import '../styled/CMPPage.scss'
import { IList } from '../models/models'
import Row from '../components/Row'
import { modifiedEntity } from '../store/slices/modifiedRowsSlice'
import { IRows, IRow } from '../models/models'
import RowCopy from '../components/RowCopy'
import { rowsAdd } from '../store/slices/entitySlice'
import { fetchUpdateRow, fetchAddRow } from '../store/actions/characterActions'

function Graph() {
  const dispatch = useAppDispatch()

  const { error, loading, lists, rows } = useAppSelector(
    (state) => state.entity
  )
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenMode, setIsOpenMode] = useState(true)
  const [rowIDToEdit, setRowIDToEdit] = useState<number>(0)

  useEffect(() => {
    dispatch(fetchEntity())
  }, [])

  const handleRemoveRow = (rowID: any) => {
    console.log(rowID)
    // const newData = rowsState.filter((row: any) => {
    //   return row.id !== rowID ? row : null
    // })
    // setRowsState(newData)
  }

  const handleAddRow = (rowID: number) => {
    setIsOpenMode(true)
    setIsEditMode(true)
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].row.id === rowID) {
        const objCopy: IRows[] = structuredClone(rows)
        objCopy.splice(i + 1, 0, {
          row: {
            id: 0,
            rowName: '',
            salary: 0,
            equipmentCosts: 0,
            overheads: 0,
            parentId: rowID,
            estimatedProfit: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            supportCosts: 0,
            total: 0,
          },
          level: objCopy[i].level + 1,
          isNew: true,
        })
        dispatch(fetchAddRow(objCopy[i + 1].row))

        dispatch(rowsAdd(objCopy))
      }
    }
  }

  return (
    <>
      <div className='table-main'>
        <h1 className='h1-title'>Строительно-монтажные работы</h1>
        <div className='table-info-title'>
          <div className='table-level'>Уровень</div>
          <div className='table-namework'>Наименование работ</div>
          <div className='table-3'>Основная з/п</div>
          <div className='table-4'>Оборудование</div>
          <div className='table-5'>Накладные расходы</div>
          <div className='table-6'>Сметная прибыль</div>
        </div>
        {loading && <p className='loading'>Loading...</p>}
        {error && <p className='error'>Error</p>}
        {!error && !loading && (
          <div>
            {rows.length > 0 &&
              rows.map((row: IRows) => (
                <RowCopy
                  key={row.row.id}
                  row={row}
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

            {/* {!Array.isArray(State) && (
              <Row
                row={State}
                level={0}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                rowIDToEdit={rowIDToEdit}
                setRowIDToEdit={setRowIDToEdit}
                isOpenMode={isOpenMode}
                setIsOpenMode={setIsOpenMode}
                handleRemoveRow={handleRemoveRow}
                handleAddRow={handleAddRow}
              />
            )} */}
          </div>
        )}
      </div>
    </>
  )
}

export default Graph
