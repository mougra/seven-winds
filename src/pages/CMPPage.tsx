import React from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hook/redux'
import { fetchEntity } from './../store/actions/characterActions'
import axios from 'axios'

function CMP() {
  const dispatch = useAppDispatch()

  // const { eID } = useAppSelector((state) => state.entity)

  // console.log(eID)

  const DATA = {
    equipmentCosts: 124123,
    estimatedProfit: 34523452345,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    parentId: null,
    rowName: 'asdasdasdasad',
    salary: 0,
    supportCosts: 0,
  }

  useEffect(() => {
    dispatch(fetchEntity())
    //   console.log('dispatch')
    //   axios
    //     .post(
    //       'http://185.244.172.108:8081/v1/outlay-rows/entity/33245/row/create',
    //       DATA
    //     )
    //     .then((response) => console.log(response))
  }, [])

  return <div>СМП</div>
}

export default CMP
