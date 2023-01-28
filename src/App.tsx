import './App.scss'

import { Route, Routes } from 'react-router-dom'

import Header from './components/Navigation'
// import Main from './components/Main'
import NotFound from './pages/NotFound'
import CMPPage from './pages/CMPPage'

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* <Route
            path='/'
            element={
              <HomePage countries={countries} setCountries={setCountries} />
            }
          ></Route> */}
        <Route path='/' element={<CMPPage />} />
        <Route path='*' element={<NotFound />} />

        {/* <Route path='/country/:name' element={<Detail />} /> */}
      </Routes>
    </>
  )
}

export default App
