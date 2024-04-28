
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css';
import './Alimentar.scss'
import patita from '../../media/patitaCorreccion.png'
import Modal from 'react-modal';
import { Link } from "react-router-dom"

export const Alimentar = () => {

  const [acciones, setAcciones] = useState([])
  const [form, setForm] = useState({
    accion: null,
    check: null
  })
  const [idAccion, setIdAccion] = useState(null)
  const [ultimaAccion, setUltimaAccion] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [mascotas, setMascotas] = useState([])
  const [mascotasSeleccionadas, setMascotasSeleccionadas] = useState([])
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(false)


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

  useEffect(() => {
    getAcciones()
    getMascotasByFamilia()
  }, [])


  const getAcciones = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:9000/alimentar', {
        method: "POST",
        body: JSON.stringify({ idAccion: idAccion }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()

      setAcciones(data.data.acciones)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getUltimaAccion = async (idAccion) => {
    try {
      const response = await fetch('http://localhost:9000/alimentar/getAccion', {
        method: "POST",
        body: JSON.stringify({ idAccion: idAccion }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
      setUltimaAccion(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMascotasByFamilia = async () => {
    try {
      const response = await fetch('http://localhost:9000/mascotas/getMascotasByFamilia', {
        method: "POST",
        body: JSON.stringify({ idFamilia: parseInt(localStorage.getItem("idFamilia")) }),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
      setMascotas(data.mascotas)
      console.log(mascotas)
    } catch (error) {
      
    }
  }

  const guardarAccion = async () => {
    try {
      const response = await fetch('http://localhost:9000/alimentar/guardarAccion', {
        method: "POST",
        body: JSON.stringify(form),  // Convierte el objeto form a JSON
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = response.json()
      setIsOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    let value;
    switch (e.target.name) {
      case 'accion':
        value = e.target.value
        setForm({
          ...form,
          accion: value
        });
        getUltimaAccion(value)
        break;
      case 'checkboxAccion':
        value = e.target.checked
        setForm({
          ...form,
          check: value
        });
        break;
      default:
        break;
    }
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleSeleccionarMascota = (idMascota) => {
    let aux = [...mascotasSeleccionadas]
    
    const existe = aux.some(mascota => mascota === idMascota);
    
    if(existe) {
      return;
    } else {
      aux.push(idMascota)
      setMascotasSeleccionadas(aux)
    }
  }
  const handleDeseleccionarMascota = (idMascota) => {
    let aux = [...mascotasSeleccionadas]

    let nuevaLista = aux.filter(mascota => mascota !== idMascota)
    setMascotasSeleccionadas(nuevaLista)
  }
  console.log(mascotasSeleccionadas)

  if (loading) {
    return <div className="spinner-border m-5" role="status" style={{ position: "absolute", top: "45%", left: "45%" }}></div>
  } else {
    return (
      <section className="seccionAlimentar">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
          contentLabel="Example Modal"
        >
          <h2><b>Alimentar</b></h2>
          <p>Se registró correctamente el formulario.</p>
          <button onClick={() => {
            getUltimaAccion(ultimaAccion)
            closeModal()
          }} className="btn btn-primary">Aceptar</button>
        </Modal>

        <div class="volverDiv">
        <Link to={"/home"}>
              <div className="card">
                <img src={patita} className="patita" style={{maxWidth: "150px",height: "auto"}}/>
                <button className="btn">Volver</button>
              </div>
            </Link>
        </div>

        <div className="menuAlimentar">
          <div className="descripcionAlimentar">
            <h1>Alimentar</h1>
            <hr />
            <p>Seleccionar una acción que desee registrar sobre su mascota. A continuación, confirmar y envíar el formulario.</p>
          </div>
          {/* pensar */}
          {/* <div className="ultimoRegistro">
            {ultimaAccion.idAccion && <span>ÚLTIMO REGISTRO: {ultimaAccion.nombreApellido} le hizo {ultimaAccion.accion} por última vez el día <b>{moment(ultimaAccion.fechaAccion).format("DD/MM/YYYY h:mm:ss A")}</b></span>}
          </div> */}

          <div className="row form-div">
            <form className="menuAlimentar-form" onSubmit={guardarAccion}>
              <label htmlFor="accion">Acción
                <select className="form-select form-select-lg mb-3" name="accion" id="selectAccion" onChange={handleChange}>
                  <option value={0}></option>
                  {acciones.map((a) => {
                    return (
                      <option key={a.idAccion} value={a.idAccion} >{a.accion}</option>
                    )
                  })}
                </select>
              </label>
              <label htmlFor="checkboxAccion" className="labelCheckbox">
                <input type="checkbox" name="checkboxAccion" className="menuAlimentar-check" onChange={handleChange}></input>
              </label>
            </form>
          </div>
          <button className="menuAlimentar-enviar btn btn-primary" type="submit" disabled={form.check !== true} onClick={guardarAccion}>Enviar</button>
        </div>

        <div className="inputMascotasDiv">
          <h2>Mascotas</h2>
          {mascotas && mascotas?.map((m, index) => {
            const isSelected = mascotasSeleccionadas.includes(m.id);
            return <button type="button" style={isSelected ? {boxShadow: "0px 0px 10px 1px #1952b5", background:"lightblue", opacity: "60%"} : {}} onClick={() => {!isSelected ? handleSeleccionarMascota(m.id) : handleDeseleccionarMascota(m.id)}} className="mascota-button">{m.nombre}</button>
          })}
          
        </div>




      </section>
    )
  }
}
