
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        <Link to={"/"}>
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

          <div className="ultimoRegistro">
            {ultimaAccion.idAccion && <span>ÚLTIMO REGISTRO: {ultimaAccion.nombreApellido} le hizo {ultimaAccion.accion} por última vez el día <b>{moment(ultimaAccion.fechaAccion).format("DD/MM/YYYY h:mm:ss A")}</b></span>}
          </div>

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

        <div class="inputMascotasDiv">
          <h2>Mascotas</h2>
          {/* Por cada mascota registrada en el abm, retornar un boton */}
        </div>




      </section>
    )
  }
}
