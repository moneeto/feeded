import React, { useState } from 'react'
import './Login.scss'

export const Login = () => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    e.preventDefault()

    switch(e.target.name) {
      case 'name':
        setUser({...user, username: e.target.value})
      break;

      case 'password':
        setUser({...user, password: e.target.value})
      break;
    }
  }

  const handleSubmit = async () => {
    try {
    const response = await fetch(`http://localhost:9000/usuarios/login`, {
      method:"POST",
      body: JSON.stringify(user),
      headers: {
            "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    
    } catch (error) {
      
    }
  }

  return (
    <div className='login'>
      <div className='informacion-login'>
        <div className='imagen-div'>
          <img src='https://st4.depositphotos.com/1049680/20108/i/450/depositphotos_201087534-stock-photo-beautiful-feline-cat-eating-on.jpg' className='imagen-login' alt='Un gato comiendo su alimento' />
          <p style={{textAlign:"justify"}}><b>Feeded!</b> es una aplicación para gestionar la dieta de tus mascotas. Este sistema está pensado para llevar un control general en la alimentación de los animales y sobre quienes estan a cargo de cada mascota.</p>
        </div>
        
      </div>

      <div className='inputs'>
        <h2>¡Bienvenido!</h2>
        <label htmlFor="">Usuario
          <input name="name"type="text" className='form-control' onChange={(e) => handleChange(e)} />
        </label>

        <label htmlFor="">Contraseña
          <input name="password"type="password" className='form-control' onChange={(e) => handleChange(e)} />
        </label>

        <button type='button' className='btn btn-primary' onClick={handleSubmit}>Ingresar</button>
      </div>
    </div>
  )
}
