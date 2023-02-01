import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from './../store/actions/characterActions'
import '../styled/CMPPage.scss'
import Line from '../components/Line'
import { IList } from './../models/models'

function CMP() {
  const dispatch = useAppDispatch()
  const { error, loading, lists } = useAppSelector((state) => state.entity)

  useEffect(() => {
    dispatch(fetchEntity())
  }, [])

  interface LineProps {
    props: IList
  }

  // const Test = (props: LineProps) => {

  // }

  // let linetest = [
  //   <div className='table-info'>{1}</div>,
  //   [
  //     <div className='table-info'>{2}</div>,
  //     [
  //       <div className='table-info'>{3}</div>,
  //       <div className='table-info'>{3}</div>,
  //     ],
  //     <div className='table-info'>{2}</div>,
  //     [
  //       <div className='table-info'>{3}</div>,
  //       <div className='table-info'>{3}</div>,
  //     ],
  //   ],
  //   <div className='table-info'>{1}</div>,
  //   <div className='table-info'>{1}</div>,
  // ]

  // const Wrap = (props: LineProps) => {
  //   let line = [<div className='table-info'>{props.props.rowName}</div>]
  //   function wraps1(props: IList) {
  //     console.log('props', props)

  //     for (let i = 0; i < props.total; i++) {
  //       line.push(<div className='table-info'>{props.child[i].rowName}</div>)
  //     }
  //   }
  //   function wraps(props: LineProps) {
  //     for (let i = 0; i < props.props.total; i++) {
  //       line.push(
  //         <div className='table-info'>{props.props.child[i].rowName}</div>
  //       )
  //       // {`table-info${i}`}

  //       if (props.props.child[i].total > 0) {
  //         // wraps(props.props.child[i])
  //         console.log(props.props.child[i])
  //         wraps1(props.props.child[i])
  //       }
  //     }
  //     return line
  //   }
  //   wraps(props)
  //   return <>{line}</>
  // }

  //////////////////////////

  const Wrap = (props: LineProps) => {
    let level = 0
    let line = [
      <div key={props.props.id} className='table-info'>
        <div className='table-level'>{props.props.id}</div>
        <div className='table-namework'>{props.props.rowName}</div>
        <div className='table-3'>{props.props.salary}</div>
        <div className='table-4'>{props.props.equipmentCosts}</div>
        <div className='table-5'>{props.props.overheads}</div>
        <div className='table-6'>{props.props.estimatedProfit}</div>
      </div>,
    ]
    for (let i = 0; i < props.props.total; i++) {
      getProp(props.props.child[i])
      level--
    }

    function getProp(o: any) {
      level++

      line.push(
        <div key={o.id} className='table-info'>
          <div className='table-level'>{o.id}</div>
          <div className='table-namework'>{o.rowName}</div>
          <div className='table-3'>{o.salary}</div>
          <div className='table-4'>{o.equipmentCosts}</div>
          <div className='table-5'>{o.overheads}</div>
          <div className='table-6'>{o.estimatedProfit}</div>
        </div>
      )
      if (o.child.length > 0) {
        for (let i = 0; i < o.child.length; i++) {
          getProp(o.child[i])
          level--
        }
      }

      return line
    }
    return <>{line}</>
  }

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

            {lists.map((list) => (
              <Wrap key={list.id} props={list} />
            ))}
            {/* {linetest} */}
          </div>
        )}
      </div>
    </>
  )
}

export default CMP
