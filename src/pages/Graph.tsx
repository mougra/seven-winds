import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from '../store/actions/characterActions'
import '../styled/CMPPage.scss'
import { IRows } from '../models/models'
import RowCopy from '../components/RowCopy'
import { rowsAdd, deleteRow } from '../store/slices/entitySlice'
import { fetchDeleteRow, fetchAddRow } from '../store/actions/characterActions'

function Graph() {
  const dispatch = useAppDispatch()

  const { error, loading, rows } = useAppSelector((state) => state.entity)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenMode, setIsOpenMode] = useState(true)
  const [rowIDToEdit, setRowIDToEdit] = useState<number>(0)

  useEffect(() => {
    dispatch(fetchEntity(true))
  }, [])

  const handleRemoveRow = (rowID: any) => {
    let count: number = 1
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].row.id === rowID) {
        for (let j = i + 1; j < rows.length; j++) {
          if (rows[i].level < rows[j].level) {
            count++
          } else break
        }
        dispatch(deleteRow({ i, count }))
        break
      }
    }
    dispatch(fetchDeleteRow(rowID))

    if (rows.length - count === 0) {
      dispatch(fetchEntity(true))
    }
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
            {rows.map((row: IRows) => (
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
          </div>
        )}
      </div>
    </>
  )
}

export default Graph
