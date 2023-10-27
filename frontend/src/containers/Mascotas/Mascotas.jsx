import React, { useEffect, useState } from 'react'
import './Mascotas.scss'
import { Mascota } from './Mascota/Mascota'
import { Link } from 'react-router-dom'

export const Mascotas = () => {

  const [mascotas, setMascotas] = useState([])

  const getMascotas = async () => {
    try {
      const response = await fetch(`http://localhost:9000/mascotas`)
      const data = await response.json()
      setMascotas(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getMascotas()
  }, [])

  return (
    <section className='container'>

      {/* Mis mascotas */}
      <div className="mascotasDiv">
        <h1>Mis mascotas</h1>
        <hr />
        <div className="mascotas">
          {/* Mapear sobre las mascotas que tiene el usuario y retornar un componente de mascota por cada registro */}
          {mascotas?.map(m => {
            return <Mascota nombre={m.nombre} tipo={m.animal} maxComidas={m.max_comidas_permitidas} idMascota={m.id} />
          })}
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
