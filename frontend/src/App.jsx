import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Menu } from './containers/MenuPrincipal/Menu'
import { Alimentar } from './containers/Alimentar/Alimentar'
import { Historial } from './containers/Historial/Historial'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/alimentar' element={<Alimentar />} />
        <Route path='/historial' element={<Historial />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
