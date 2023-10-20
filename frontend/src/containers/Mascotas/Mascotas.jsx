import React, { useState } from 'react'
import './Mascotas.scss'
import { Mascota } from './Mascota/Mascota'
import {Link} from 'react-router-dom'
export const Mascotas = () => {

  const [mascotas, setMascotas] = useState()




  return (
    <section className='container'>

      {/* Mis mascotas */}
      <div className="mascotasDiv">
        <h1>Mis mascotas</h1>
        <hr />
        <div className="mascotas">
          {/* Mapear sobre las mascotas que tiene el usuario y retornar un componente de mascota por cada registro */}
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={2}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={3}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={2}/>
        </div>

        <div className='altaMascota'>
          <Link to="/mascotas/alta-mascota">
            <button className='botonAltaMascota'>Nueva mascota</button>
          </Link>
        </div>
        
      </div>
    </section>
  )
}
