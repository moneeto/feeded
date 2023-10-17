import React, { useEffect, useState } from 'react'

export const AltaMascota = () => {

  let initForm = {
    nombre: '',
    tipo_mascota: null,
    max_comidas_permitidas: null,
    idDueno: null
  }
  const [agregarForm, setAgregarForm] = useState(initForm)
  const [editarForm, setEditarForm] = useState(initForm) /* falta implementar */
  const [tiposMascotas, setTiposMascotas] = useState([])

  let idMascota; /* falta implementar */
  
  const getTiposMascotas = async () => {
    try {
      const response = await fetch("http://localhost:9000/mascotas/getTiposMascotas")
      const data = await response.json()
      setTiposMascotas(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    let value;
    switch (e.target.name) {
      case "nombre":
        if(!e.target.validity.valid) {
          break;
        } else {
          value = e.target.value
          setAgregarForm({...agregarForm, nombre: value})
        }
      break;
      case "tipo_mascota":
        if(!e.target.validity.valid) {
          break
        } else {
          value = e.target.value
          setAgregarForm({...agregarForm, tipo_mascota: value})
        }
      break;
      case "max_comidas_permitidas":
        if(!e.target.validity.valid) {
          break
        } else {
          value = e.target.value
          setAgregarForm({...agregarForm, max_comidas_permitidas: value})
        }
      break;
      default:
        break;
    }
  }

  useEffect(() => {
    getTiposMascotas()
  },[])
  console.log(agregarForm)
  return (
    <div>
      <h1>{!idMascota ? "Nueva Mascota": "Editar Mascota"}</h1>
      {!idMascota ? <form>
        <div className='row'>
          <label htmlFor="">
            <input type='text' pattern="[A-Za-z ]+" value={agregarForm.nombre} name="nombre" onChange={handleChange} placeholder='Nombre de la mascota'/>
          </label>
        </div>
        
        <select name="tipo_mascota" value={agregarForm.tipo_mascota} onChange={handleChange}>
          <option value={0} selected></option>
          {tiposMascotas?.map(t => {
            return <option value={t.id}>{t.animal}</option>
          })}
        </select>

        <label htmlFor="">
          <input name="max_comidas_permitidas" value={agregarForm.max_comidas_permitidas} onChange={handleChange} type='range' min={1} max={5} />
        </label>
      </form> : <form>
        <div className='row'>
          <label htmlFor="">
            <input type='text' pattern="[A-Za-z ]+" value={editarForm.nombre} name="nombre" onChange={handleChange} placeholder='Nombre de la mascota'/>
          </label>
        </div>
        
        <select name="tipo_mascota" value={editarForm.tipo_mascota} onChange={handleChange}>
          <option value={0} selected></option>
          {tiposMascotas?.map(t => {
            return <option value={t.id}>{t.animal}</option>
          })}
        </select>

        <label htmlFor="">
          <input name="max_comidas_permitidas" value={editarForm.max_comidas_permitidas} onChange={handleChange} type='range' min={1} max={5} />
        </label>
      </form>}
      <div>
        <button className='btn btn-primary'>{!idMascota ? "Agregar" : "Editar"}</button>
      </div>
    </div>
  )
}
