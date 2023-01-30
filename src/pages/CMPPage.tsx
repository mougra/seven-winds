import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from './../store/actions/characterActions'
import '../styled/CMPPage.scss'

function CMP() {
  const dispatch = useAppDispatch()

  // const { eID } = useAppSelector((state) => state.entity)

  // console.log(eID)

  useEffect(() => {
    dispatch(fetchEntity())
  }, [])

  return (
    <>
      <h1 className='h1-title'>Строительно-монтажные работы</h1>
    </>
  )
}

export default CMP
