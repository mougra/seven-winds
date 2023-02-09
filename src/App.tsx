import './App.scss'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import NotFound from './pages/NotFound'
import MTOPage from './pages/MTOPage'
import CMPPage from './pages/CMPPage'
import Aside from './components/Aside'
import Other from './pages/Other'
import Graph from './pages/Graph'

function App() {
  return (
    <>
      <Header />
      <div className='app'>
        <Aside />
        <Routes>
          <Route path='/' element={<Graph />} />
          <Route path='/qwert' element={<MTOPage />} />
          <Route path='/123' element={<CMPPage />} />
          <Route path='/other' element={<Other />} />
          <Route path='/control' element={<Other />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
