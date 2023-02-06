// import React, { useState } from 'react'
// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '../hook/redux'
// import { fetchEntity } from './../store/actions/characterActions'
// import '../styled/CMPPage.scss'
// // import Line from '../components/Line'
// import { IList } from './../models/models'
// import levelDoc from '../assets/levelDoc.svg'
// import levelDeletesvg from '../assets/levelDeletesvg.svg'

import { findConfigFile } from 'typescript'

// function CMP() {
//   const dispatch = useAppDispatch()
//   const { error, loading, lists } = useAppSelector((state) => state.entity)
//   const [isEditMode, setIsEditMode] = useState(false)
//   const [rowIDToEdit, setRowIDToEdit] = useState(undefined)
//   const [rowsState, setRowsState] = useState(lists)
//   const [editedRow, setEditedRow] = useState<any | null>(null)

//   const handleEdit = (rowID: any) => {
//     setIsEditMode(true)
//     setEditedRow(undefined)
//     setRowIDToEdit(rowID)
//   }

//   const handleRemoveRow = (rowID: any) => {
//     const newData = rowsState.filter((row) => {
//       return row.id !== rowID ? row : null
//     })

//     setRowsState(newData)
//   }

//   const handleOnChangeField = (e: any, rowID: any) => {
//     e.preventDefault()
//     const { name: fieldName, value } = e.target
//     console.log('handleOnChangeField', fieldName, value, rowID)
//     setEditedRow({
//       id: rowID,
//       [fieldName]: value,
//     })
//     console.log('editedRow', editedRow)
//   }

//   const handleCancelEditing = () => {
//     setIsEditMode(false)
//     setEditedRow(undefined)
//   }

//   // const handleSaveRowChanges = () => {
//   //   setTimeout(() => {
//   //     setIsEditMode(false)

//   //     const newData = rowsState.map((row) => {
//   //       // console.log('row.id', row.id, '=? editedRow.id', editedRow.id)
//   //       // console.log('editedRow.rowName', editedRow.rowName)
//   //       console.log('row do', row)
//   //       if (row.id === editedRow.id) {
//   //         if (editedRow.rowName) row.rowName = editedRow.rowName
//   //         if (editedRow.salary) row.salary = editedRow.salary
//   //         if (editedRow.equipmentCosts)
//   //           row.equipmentCosts = editedRow.equipmentCosts
//   //         if (editedRow.overheads) row.overheads = editedRow.overheads
//   //         if (editedRow.estimatedProfit)
//   //           row.estimatedProfit = editedRow.estimatedProfit
//   //       }
//   //       // console.log('row.rowName', row.rowName)
//   //       console.log('row posle', row)
//   //       return row
//   //     })

//   //     setRowsState(newData)
//   //     setEditedRow(undefined)
//   //   }, 1000)
//   // }

//   useEffect(() => {
//     dispatch(fetchEntity())
//     setRowsState(lists)
//     console.log('rowsState', rowsState)
//   }, [])

//   interface LineProps {
//     props: IList
//   }

//   const submitmainApp = (event: React.FormEvent) => {
//     event.preventDefault()
//   }

//   const Wrap = (props: LineProps) => {
//     let level = 0
//     let line = [
//       <div key={props.props.id} className='table-info'>
//         {/* <div className='table-level'>
//           {' '}
//           <img
//             src={levelDoc}
//             alt='Display card line'
//             className='table-img'
//             onClick={submitmainApp}
//           />
//         </div>
//          */}
//         {isEditMode && rowIDToEdit === props.props.id ? (
//           <button className='table-level' disabled={!editedRow}>
//             <img
//               src={levelDeletesvg}
//               alt='Display card line'
//               className='table-img'
//               // onClick={() => handleSaveRowChanges()}
//             />

//             <img
//               src={levelDeletesvg}
//               alt='Display card line'
//               className='table-img'
//               onClick={() => handleRemoveRow(props.props.id)}
//             />
//           </button>
//         ) : (
//           <button onClick={() => handleEdit(props.props.id)}>
//             <img src={levelDoc} alt='Display card line' className='table-img' />
//           </button>
//         )}

//         {isEditMode && rowIDToEdit === props.props.id ? (
//           <input
//             className='table-namework'
//             type='text'
//             id={props.props.id}
//             name='rowName'
//             defaultValue={editedRow ? editedRow.rowName : props.props.rowName}
//             onChange={(e) => handleOnChangeField(e, props.props.id)}

//             // onKeyDown={(ev) => ev.key === 'Enter'}
//           />
//         ) : (
//           <div className='table-namework'>{props.props.rowName}</div>
//         )}
//         {/* <div className='table-namework'>{props.props.rowName}</div> */}
//         {isEditMode && rowIDToEdit === props.props.id ? (
//           <input
//             className='table-3'
//             type='text'
//             defaultValue={editedRow ? editedRow.salary : props.props.salary}
//             id={props.props.id}
//             name='salary'
//             onChange={(e) => handleOnChangeField(e, props.props.id)}
//           />
//         ) : (
//           <div className='table-3'>{props.props.salary}</div>
//         )}
//         {/* <div className='table-3'>{props.props.salary}</div> */}
//         {/* {isEditMode && rowIDToEdit === props.props.id ? (
//           <form>
//             <input
//               className='table-4'
//               type='text'
//               defaultValue={
//                 editedRow
//                   ? editedRow.equipmentCosts
//                   : props.props.equipmentCosts
//               }
//               id={props.props.id}
//               name='equipmentCosts'
//               onChange={(e) => handleOnChangeField(e, props.props.id)}
//             />
//           </form>
//         ) : (
//           <div className='table-4'>{props.props.equipmentCosts}</div>
//         )} */}
//         <div className='table-4'>{props.props.equipmentCosts}</div>
//         {/* {isEditMode && rowIDToEdit === props.props.id ? (
//           <form>
//             <input
//               className='table-5'
//               type='text'
//               defaultValue={
//                 editedRow ? editedRow.overheads : props.props.overheads
//               }
//               id={props.props.id}
//               name='overheads'
//               onChange={(e) => handleOnChangeField(e, props.props.id)}
//             />
//           </form>
//         ) : (
//           <div className='table-5'>{props.props.overheads}</div>
//         )} */}
//         <div className='table-5'>{props.props.overheads}</div>
//         {/* {isEditMode && rowIDToEdit === props.props.id ? (
//           <form>
//             <input
//               className='table-6'
//               type='text'
//               defaultValue={
//                 editedRow
//                   ? editedRow.estimatedProfit
//                   : props.props.estimatedProfit
//               }
//               id={props.props.id}
//               name='estimatedProfit'
//               onChange={(e) => handleOnChangeField(e, props.props.id)}
//             />
//           </form>
//         ) : (
//           <div className='table-6'>{props.props.estimatedProfit}</div>
//         )} */}
//         <div className='table-6'>{props.props.estimatedProfit}</div>
//       </div>,
//     ]
//     // for (let i = 0; i < props.props.total; i++) {
//     //   getProp(props.props.child[i])
//     //   level--
//     // }

//     // function getProp(o: any) {
//     //   level++

//     //   line.push(
//     //     <div key={o.id} className='table-info'>
//     //       <div className={`table-level${level}`}>
//     //         {' '}
//     //         <img
//     //           src={levelDoc}
//     //           alt='Display card line'
//     //           className={`table-img${level}`}
//     //           // onClick={submitmainApp}
//     //         />
//     //       </div>
//     //       <div className='table-namework'>{o.rowName}</div>
//     //       <div className='table-3'>{o.salary}</div>
//     //       <div className='table-4'>{o.equipmentCosts}</div>
//     //       <div className='table-5'>{o.overheads}</div>
//     //       <div className='table-6'>{o.estimatedProfit}</div>
//     //     </div>
//     //   )
//     //   if (o.child.length > 0) {
//     //     for (let i = 0; i < o.child.length; i++) {
//     //       getProp(o.child[i])
//     //       level--
//     //     }
//     //   }

//     //   return line
//     // }
//     return <>{line}</>
//   }

//   return (
//     <>
//       <div className='table-main'>
//         <h1 className='h1-title'>Строительно-монтажные работы</h1>
//         <div className='table-info'>
//           <div className='table-level'>Уровень</div>
//           <div className='table-namework'>Наименование работ</div>
//           <div className='table-3'>Основная з/п</div>
//           <div className='table-4'>Оборудование</div>
//           <div className='table-5'>Накладные расходы</div>
//           <div className='table-6'>Сметная прибыль</div>
//         </div>
//         {loading && <p>Loading...</p>}
//         {error && <p>Усп</p>}

//         {!error && !loading && (
//           <div>
//             {/* {lists.map((list) => (
//               <Line key={list.id} list={list} />
//             ))} */}

//             {rowsState.map((row) => (
//               <Wrap key={row.id} props={row} />
//             ))}
//             {/* {linetest} */}
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default CMP

import React from 'react'
import { Link } from 'react-router-dom'
import '../styled/Other.scss'

function CMP() {
  return <div className='other'>This page doesn't exist</div>
}

export default CMP
