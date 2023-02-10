import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from '../store/actions/characterActions'
import '../styled/CMPPage.scss'
import { IList } from '../models/models'
import Row from '../components/Row'
import { modifiedEntity } from '../store/slices/modifiedRowsSlice'
import { IRows, IRow } from '../models/models'

function CMP() {
  const dispatch = useAppDispatch()

  const { error, loading, lists, rows } = useAppSelector(
    (state) => state.entity
  )
  const [isEditMode, setIsEditMode] = useState(false)
  const [isOpenMode, setIsOpenMode] = useState(true)
  const [rowIDToEdit, setRowIDToEdit] = useState<number>(0)
  // const [state, setState] = useState<IRows[]>(rows)

  // function Wrap(props: IList[]) {
  //   let level = 0
  //   let rowsQ: IRows[] = []
  //   for (let i = 0; i < props.length; i++) {
  //     getProp(props[i])
  //     level--
  //   }
  //   function getProp(rowsW: IRow) {
  //     rowsQ.push({ row: rowsW, level: level, isNew: false })
  //     level++
  //     if (rowsW.child.length > 0) {
  //       for (let i = 0; i < rowsW.child.length; i++) {
  //         getProp(rowsW.child[i])
  //         level--
  //       }
  //     }
  //     return rowsQ
  //   }
  //   return rowsQ
  // }

  // useEffect(() => {
  //   dispatch(fetchEntity())
  // }, [])

  // console.log('State', State)
  // console.log(Array.isArray(State))

  const handleRemoveRow = (rowID: any) => {
    console.log(rowID)
    // const newData = rowsState.filter((row: any) => {
    //   return row.id !== rowID ? row : null
    // })
    // setRowsState(newData)
  }

  // const handleAddRow = (rowID: number) => {
  //   let newData: any = {}
  //   for (let i = 0; i < state.length; i++) {
  //     if (state[i].row.id === rowID) {
  //       newData = () => {
  //         let objCopy = state // 👈️ create copy

  //         objCopy.splice(i + 1, 0, {
  //           row: {
  //             id: 0,
  //             rowName: '',
  //             salary: 0,
  //             equipmentCosts: 0,
  //             overheads: 0,
  //             estimatedProfit: 0,
  //             machineOperatorSalary: 0,
  //             mainCosts: 0,
  //             materials: 0,
  //             mimExploitation: 0,
  //             supportCosts: 0,
  //             total: 0,
  //             parentId: rowID,
  //           },
  //           level: state[i].level + 1,
  //           isNew: true,
  //         })

  //         return objCopy
  //       }
  //     }
  //   }
  //   // console.log(state, 'state posle')
  //   setRowIDToEdit(0)
  //   setIsEditMode(true)
  //   setState(newData)

  //   // console.log(state, 'state posle')
  //   // console.log(newData, 'newData')
  //   // console.log(State, 'State')
  // }

  // console.log('states', state)

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
              rows.map((row: any, index) => (
                <Row
                  key={row.id}
                  row={row}
                  // level={row.level}
                  // isNew={row.new}
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  rowIDToEdit={rowIDToEdit}
                  setRowIDToEdit={setRowIDToEdit}
                  isOpenMode={isOpenMode}
                  setIsOpenMode={setIsOpenMode}
                  handleRemoveRow={handleRemoveRow}
                  // handleAddRow={handleAddRow}
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

export default CMP
