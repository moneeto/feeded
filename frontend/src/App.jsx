import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Menu } from './containers/MenuPrincipal/Menu'
import { Alimentar } from './containers/Alimentar/Alimentar'
import { Historial } from './containers/Historial/Historial'
import { Mascotas } from './containers/Mascotas/Mascotas'
import { AltaMascota } from './containers/Mascotas/AltaMascota'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/alimentar' element={<Alimentar />} />
        <Route path='/historial' element={<Historial />} />
        <Route path='/mascotas' element={<Mascotas />} />
        <Route path='/mascotas/alta-mascota' element={<AltaMascota />}/>
        <Route path='/mascotas/editar-mascota' element={<AltaMascota />}/>
      </Routes>
    </div>
  )
}

export default App
