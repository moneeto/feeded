import React, { useState } from 'react'
import './Login.scss'
import { FaRegTimesCircle } from "react-icons/fa";
import {Navigate, useNavigate} from 'react-router-dom'

export const Login = () => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const [data, setData] = useState({
    mensaje: '',
    exito: false,
    respuesta: {}
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault()

    switch (e.target.name) {
      case 'name':
        setUser({ ...user, username: e.target.value })
        break;

      case 'password':
        setUser({ ...user, password: e.target.value })
        break;
    }
  }

  const handleSubmit = async () => {
    try {
      const r = await fetch(`http://localhost:9000/usuarios/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        }
      })
      const d = await r.json()
      setData({
        ...data,
        mensaje: d.mensaje,
        exito: d.exito,
        respuesta: d.respuesta
      })

      localStorage.setItem("userId", d.respuesta.idUsuario)
      localStorage.setItem("usuario", d.respuesta.usuario)

      if(d.exito) {
        navigate("/")
        window.location.reload()
      }
      
    } catch (error) {

    }
  }

  return (
    <div className='login'>
      <div className='informacion-login'>
        <div className='imagen-div'>
          <img src='https://st4.depositphotos.com/1049680/20108/i/450/depositphotos_201087534-stock-photo-beautiful-feline-cat-eating-on.jpg' className='imagen-login' alt='Un gato comiendo su alimento' />
          <p style={{ textAlign: "justify", marginTop:"50px" }}><b>Feeded!</b> es una aplicación para gestionar la dieta de tus mascotas. Este sistema está diseñado para llevar un control general en la alimentación de los animales y sobre quienes están a cargo de las mascotas.</p>
        </div>

      </div>

      <div className='inputs'>
        <h2>¡Bienvenido!</h2>
        <label htmlFor="">Usuario
          <input name="name" type="text" className='form-control' onChange={(e) => handleChange(e)} />
        </label>

        <label htmlFor="">Contraseña
          <input name="password" type="password" className='form-control' onChange={(e) => handleChange(e)} />
        </label>

        <button type='button' className='btn btn-primary' onClick={handleSubmit}>Ingresar</button>

        {!data.exito && data.mensaje &&
          <div class="alert alert-danger" role="alert" style={{margin:"20px"}}>
          <span><FaRegTimesCircle /> {data?.mensaje}</span>
        </div>
        }
      </div>
    </div>
  )
}
