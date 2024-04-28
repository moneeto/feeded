import './App.css'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { Menu } from './containers/MenuPrincipal/Menu'
import { Alimentar } from './containers/Alimentar/Alimentar'
import { Historial } from './containers/Historial/Historial'
import { Mascotas } from './containers/Mascotas/Mascotas'
import { AltaMascota } from './containers/Mascotas/AltaMascota'
import { Login } from './containers/Usuarios/Login'
import { useEffect, useState } from 'react'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  

  useEffect(() => {
    if(localStorage.getItem("userId") && localStorage.getItem("userId") !== undefined && localStorage.getItem("userId") !== "") {
      setIsLoggedIn(true)
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div className='app'>
      <Navbar />
      <Routes>
        {!isLoggedIn ? <Route path='/login' element={<Login />} /> : 
        <>
        <Route path='/home' element={<Menu />} />
        <Route path='/alimentar' element={<Alimentar />} />
        <Route path='/historial' element={<Historial />} />
        <Route path='/mascotas' element={<Mascotas />} />
        <Route path='/mascotas/alta-mascota' element={<AltaMascota />}/>
        <Route path='/mascotas/editar-mascota' element={<AltaMascota />}/>

        <Route path='*' element={<Navigate to="/home" />} />
        </>}
        
        
      </Routes>
    </div>
  )
}

export default App
