import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from './../store/actions/characterActions'
import '../styled/CMPPage.scss'
import Line from '../components/Line'

function CMP() {
  const dispatch = useAppDispatch()
  const { error, loading, lists } = useAppSelector((state) => state.entity)

  console.log('list', lists)

  useEffect(() => {
    dispatch(fetchEntity())
  }, [])

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
        {loading && <p className='text-center text-lg'>Loading...</p>}
        {error && (
          <p className='text-center text-lg text-red-600'>
            Усп. Кажется такого персонажа не сущесвтует. Только без паники!
          </p>
        )}

        {!error && !loading && (
          <div>
            {lists.map((list) => (
              <Line key={list.id} list={list} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CMP
