import {useState, useEffect} from 'react'
import gatito from '../../../media/gatito.png'
import './Mascota.scss'
import { BsPencilSquare } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

export const Mascota = (props) => {

  //Quiero retornar una card dinamica
  const [modalConfirmation, setModalConfirmation] = useState({show: false, mascotaABorrar: null})

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal = () => {
    setModalConfirmation({...modalConfirmation, show: true, mascotaABorrar: props.idMascota})
  }

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:9000/mascotas/borrarMascota", {
        method: PUT,
        body: JSON.stringify({idMascota: modalConfirmation.mascotaABorrar}),  // Convierte el objeto form a JSON
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='mascotaCard'>
      <Modal
      isOpen={modalConfirmation.show}
      style={customStyles}
      contentLabel="Example Modal">
        <div>
          <h1>Mascotas</h1>
          <p>Estás seguro que deseas borrar esta mascota?</p>
          <button onClick={handleDelete}>Confirmar</button>
        </div>
      </Modal>
      <img src={gatito} alt={props.nombre} style={{ height: "auto", maxWidth: "220px", borderTopLeftRadius: "14px", borderTopRightRadius: "14px" }} />
      <h2 style={{ textAlign: "center", borderTop: "1px solid gray" }}>{props.nombre}</h2>
      <p style={{ textAlign: "center", fontSize: "14px" }}>Es un {props.tipo} y solo puede comer {props.maxComidas} veces al día</p>
      <div className='accionesDiv'>
        <Link to={"/mascotas/editar-mascota"} state={{idMascota: props.idMascota}}>
          <button style={{ borderRadius: "50px", margin: "5px" }} className='btn btn-secondary'><BsPencilSquare /> Editar</button>
        </Link>

        <button style={{ borderRadius: "50px", margin: "5px" }} className='btn btn-danger' onClick={() => openModal()}><FaTrash /></button>
      </div>
    </div>
  )
}
