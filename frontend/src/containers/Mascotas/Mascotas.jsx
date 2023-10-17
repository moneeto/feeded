import React, { useState } from 'react'
import './Mascotas.scss'
import { Mascota } from './Mascota/Mascota'

export const Mascotas = () => {

  const [mascotas, setMascotas] = useState()

  return (
    <section className='mascotasSection'>

      {/* Mis mascotas */}
      <div className="mascotasDiv">
        <h1>Mis mascotas</h1>
        <div className="mascotas">
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={2}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={3}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={2}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={2}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={3}/>
          <Mascota alt={"Vini"} nombre="Vini" tipo="Gato" maxComidas={2}/>
        </div>

        <div className='altaMascota'>
          <button className='botonAltaMascota'>Nueva mascota</button>
        </div>
        
      </div>
    </section>
  )
}
