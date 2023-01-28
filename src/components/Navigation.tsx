import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function Navigation() {
  // let navigate = useNavigate()

  // const [registrationActive, setRegistrationActive] = useState(false)
  // const [loginActive, setloginActive] = useState(false)

  // const submitHandler = (event: React.FormEvent) => {
  //   event.preventDefault()
  //   navigate('/')
  // }

  return (
    <>
      <nav className=''>
        <div className=''>
          <div className=''>
            {/* <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? 'text-[#ff0000] border-b-[1px] border-[#ff0000] transition duration-200 ease-in-out'
                  : 'hover:text-[#ff0000] transition duration-200 ease-in-out'
              }
            >
              Главная
            </NavLink> */}

            {/* <NavLink
              to='/aboutus'
              className={({ isActive }) =>
                isActive
                  ? 'text-[#ff0000] border-b-[1px] border-[#ff0000] transition duration-200 ease-in-out'
                  : 'hover:text-[#ff0000] transition duration-200 ease-in-out'
              }
            >
              О проекте
            </NavLink> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
