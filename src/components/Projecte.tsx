import { NavLink } from 'react-router-dom'
import projectList from '../assets/projectList.svg'

interface ProjecteProps {
  text: string
  link: string
}

function Projecte({ text, link }: ProjecteProps) {
  return (
    <div className='nav-container'>
      <img src={projectList} alt='Display card line' className='main-app-svg' />
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? 'active-link' : 'noactive-link'
        }
      >
        {text}
      </NavLink>
    </div>
  )
}

export default Projecte
