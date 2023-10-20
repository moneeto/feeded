import React, { useEffect, useState } from 'react'

export const AltaMascota = () => {

  let initForm = {
    nombre: '',
    tipo_mascota: null,
    max_comidas_permitidas: null,
    idDueno: null,
    foto: ''
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
        if (!e.target.validity.valid) {
          break;
        } else {
          value = e.target.value
          setAgregarForm({ ...agregarForm, nombre: value })
        }
        break;
      case "tipo_mascota":
        if (!e.target.validity.valid) {
          break
        } else {
          value = e.target.value
          setAgregarForm({ ...agregarForm, tipo_mascota: value })
        }
        break;
      case "max_comidas_permitidas":
        if (!e.target.validity.valid) {
          break
        } else {
          value = e.target.value
          setAgregarForm({ ...agregarForm, max_comidas_permitidas: value })
        }
        break;
      default:
        break;
    }
  }

  const convertirABlob = (e) => {
    let value;
    if (e.target.type === 'file') {
      // Si el evento proviene de un input de tipo archivo, convierte el archivo a BLOB
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        const blob = new Blob([arrayBuffer], { type: file.type });
        setAgregarForm({ ...agregarForm, foto: blob }); // Agrega el BLOB al estado
      };

      reader.readAsArrayBuffer(file);
    }
  }

  useEffect(() => {
    getTiposMascotas()
  }, [])
  console.log(agregarForm)
  return (
    <div className='container' style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h1>{!idMascota ? "Nueva Mascota" : "Editar Mascota"}</h1>
      <hr />
      {!idMascota ?
        <>
          <div className='row'>
            <label>Nombre de la mascota
              <input type='text' className='form-control' pattern="[A-Za-z ]+" value={agregarForm.nombre} name="nombre" onChange={handleChange} placeholder='Toto...' />
            </label>
          </div>

          <div className='row'>
            <label>Tipo de mascota
              <select name="tipo_mascota" className='form-control' value={agregarForm.tipo_mascota} onChange={handleChange}>
                <option value={0} disabled selected>Elegí un tipo de mascota</option>
                {tiposMascotas?.map(t => {
                  return <option value={t.id}>{t.animal}</option>
                })}
              </select>
            </label>

            <div className='row'>
              <label>Foto de tu mascota!
                <input type="file" src='#' className='form-control' accept=".jpg, .jpeg, .png" onChange={handleChange} />
              </label>
              <button className='btn btn-outline-secondary' onClick={convertirABlob}>Cargar</button>
            </div>

          </div>
          <div className='row'>
            <label>Máximas comidas permitidas
              <input name="max_comidas_permitidas" value={agregarForm.max_comidas_permitidas} onChange={handleChange} type='range' min={1} max={5} />
            </label>
          </div>

        </> : <>
          <div className='row'>
            <label>
              <input type='text' pattern="[A-Za-z ]+" value={editarForm.nombre} name="nombre" onChange={handleChange} placeholder='Nombre de la mascota' />
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

          <label>
            <input type="file" name='foto' value={editarForm.foto} onChange={handleChange} />
          </label>
        </>}
      <div>
        <button className='btn btn-primary'>{!idMascota ? "Agregar" : "Editar"}</button>
      </div>
    </div>
  )
}
