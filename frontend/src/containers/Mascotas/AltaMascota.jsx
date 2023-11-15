import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const AltaMascota = () => {

  let initForm = {
    nombre: '',
    tipo_mascota: null,
    max_comidas_permitidas: 2,
    idDueno: null,
    foto: ''
  }
  const [agregarForm, setAgregarForm] = useState(initForm)
  const [editarForm, setEditarForm] = useState(initForm)
  const [tiposMascotas, setTiposMascotas] = useState([])
  const location = useLocation()
  const idMascota = location.state?.idMascota

  const getTiposMascotas = async () => {
    try {
      const response = await fetch("http://localhost:9000/mascotas/getTiposMascotas")
      const data = await response.json()
      setTiposMascotas(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMascota = async () => {
    try {
      const response = await fetch("http://localhost:9000/mascotas/getMascota", {
        method: "POST",
        body: JSON.stringify({ idMascota: idMascota }),  // Convierte el objeto form a JSON
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
      console.log("A continuación, la mascota que queres editar.")
      setEditarForm({ ...editarForm, nombre: data[0].nombre, tipo_mascota: data[0].id, max_comidas_permitidas: data[0].max_comidas_permitidas, idDueno: data[0].idUsuario })
    } catch (error) {

    }
  }

  const handleChange = (e) => {
    let value;
    switch (e.target.name) {
      case "nombre":
        if (!e.target.validity.valid) {
          break;
        } else {
          value = e.target.value
          if (idMascota) {
            setEditarForm({ ...editarForm, nombre: value })
          }
          setAgregarForm({ ...agregarForm, nombre: value })
        }
        break;
      case "tipo_mascota":
        if (!e.target.validity.valid) {
          break
        } else {
          value = e.target.value
          if (idMascota) {
            setEditarForm({ ...editarForm, tipo_mascota: value })
          }
          setAgregarForm({ ...agregarForm, tipo_mascota: value })
        }
        break;
      case "max_comidas_permitidas":
        if (!e.target.validity.valid) {
          break
        } else {
          value = e.target.value
          if (idMascota) {
            setEditarForm({ ...editarForm, max_comidas_permitidas: value })
          }
          setAgregarForm({ ...agregarForm, max_comidas_permitidas: value })
        }
        break;
      default:
        break;
    }
  }

  const handleSubmit = async() => {
    try {
      if(idMascota) {
        setEditarForm({...editarForm, idMascota: idMascota})
        const response = await fetch(`http://localhost:9000/mascotas/editarMascota`, {
          method: "PUT",
          body: JSON.stringify(agregarForm),
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        console.log(data)
      } else {
        const response = await fetch(`http://localhost:9000/mascotas/agregarMascota`, {
          method: "POST",
          body: JSON.stringify(agregarForm),
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        console.log(data)
      }

    } catch (error) {
      
    }
  }

  useEffect(() => {
    getTiposMascotas()
    if (idMascota) {
      getMascota()
    }
  }, [])


  return (
    <div className='container' style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h1>{!idMascota ? "Nueva Mascota" : "Editar Mascota"}</h1>
      <hr />
      {!idMascota ?
      // AGREGAR
        <>
          <div className='row'>
            <label>Nombre de la mascota
              <input type='text' className='form-control' pattern="[A-Za-z ]+" value={agregarForm.nombre} name="nombre" onChange={handleChange} placeholder='Toto...' />
            </label>
          </div>
          <div className='row'>
            <label>Tipo de mascota
              <select name="tipo_mascota" className='form-select' value={agregarForm.tipo_mascota} onChange={handleChange}>
                <option value={0} disabled selected>Elegí un tipo de mascota</option>
                {tiposMascotas?.map(t => {
                  return <option value={t.id}>{t.animal}</option>
                })}
              </select>
            </label>
            <div className='col-md-8'>
              <label>Foto de tu mascota!
                <input type="file" src='#' className='form-control' accept=".jpg, .jpeg, .png" onChange={handleChange} />
              </label>
              <label>
                <button className='btn btn-outline-secondary' style={{ marginLeft: "20px" }}>Cargar</button>
              </label>
            </div>
          </div>
          <div className='row'>
            <label>Máximas comidas permitidas
              <input name="max_comidas_permitidas" value={agregarForm.max_comidas_permitidas} onChange={handleChange} type='range' min={1} max={5} />
              <span style={{marginLeft:"5px"}}>{agregarForm.max_comidas_permitidas}</span>
            </label>
          </div>

        </> 
        
        : 
        //EDITAR
        <>
          <div className='row'>
            <label>Nombre de la mascota
              <input type='text' className='form-control' pattern="[A-Za-z ]+" value={editarForm.nombre} name="nombre" onChange={handleChange} placeholder='Toto...' />
            </label>
          </div>

          <div className='row'>
            <label>Tipo de mascota
              <select name="tipo_mascota" className='form-select' value={editarForm.tipo_mascota} onChange={handleChange}>
                <option value={0} disabled selected>Elegí un tipo de mascota</option>
                {tiposMascotas?.map(t => {
                  return <option value={t.id}>{t.animal}</option>
                })}
              </select>
            </label>
            <div className='col-md-8'>
              <label>Foto de tu mascota!
                <input type="file" src='#' className='form-control' accept=".jpg, .jpeg, .png" onChange={handleChange} />
              </label>
              <label>
                <button className='btn btn-outline-secondary' style={{ marginLeft: "20px" }}>Cargar</button>
              </label>
            </div>
          </div>


          <div className='row'>
            <label>Máximas comidas permitidas
              <input style={{margin: "10px 5px"}} name="max_comidas_permitidas" value={editarForm.max_comidas_permitidas} onChange={handleChange} type='range' min={1} max={5} />
              <span style={{marginLeft:"5px"}}>{editarForm.max_comidas_permitidas}</span>
            </label>
          </div>
        </>}

      <button className='btn btn-primary' onClick={handleSubmit}>{!idMascota ? "Agregar" : "Editar"}</button>

    </div>
  )
}
