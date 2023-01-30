import './App.scss'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import NotFound from './pages/NotFound'
import CMPPage from './pages/CMPPage'
import Aside from './components/Aside'
import Other from './pages/Other'

function App() {
  return (
    <>
      <Header />
      <div className='app'>
        <Aside />
        <Routes>
          <Route path='/' element={<CMPPage />} />
          <Route path='/other' element={<Other />} />
          <Route path='/control' element={<Other />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
