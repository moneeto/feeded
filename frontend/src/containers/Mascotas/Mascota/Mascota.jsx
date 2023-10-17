import React from 'react'
import gatito from '../../../media/gatito.png'
import './Mascota.scss'
import {BsPencilSquare} from 'react-icons/bs'
import {FaTrash} from 'react-icons/fa'

export const Mascota = (props) => {

  //Quiero retornar una card dinamica
  return (
    <div className='mascotaCard'>
      <img src={gatito} alt={props.nombre} style={{height:"auto", maxWidth:"220px", borderTopLeftRadius:"14px",borderTopRightRadius:"14px"}} />
      <h2 style={{textAlign:"center", borderTop:"1px solid gray"}}>{props.nombre}</h2>
      <p style={{textAlign:"center", fontSize:"14px"}}>Es un {props.tipo} y solo puede comer {props.maxComidas} veces al día</p>
      <div className='accionesDiv'>
        <button style={{borderRadius:"50px", margin:"5px"}}className='btn btn-secondary'><BsPencilSquare /> Editar</button>
        <button style={{borderRadius:"50px", margin:"5px"}}className='btn btn-danger'><FaTrash /></button>
      </div>
    </div>
  )
}
