import './App.scss'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import NotFound from './pages/NotFound'
import Aside from './components/Aside'
import Other from './pages/Other'
import Graph from './pages/Graph'
import CMPpage from './pages/CMPPage'

function App() {
  return (
    <>
      <Header />
      <div className='app'>
        <Aside />
        <Routes>
          <Route path='/seven-winds' element={<Graph />} />
          <Route path='/' element={<CMPpage />} />
          <Route path='/other' element={<Other />} />
          <Route path='/control' element={<Other />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
