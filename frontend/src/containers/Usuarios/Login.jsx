import React, { useState, useEffect } from 'react'
import './Login.scss'
import { FaRegTimesCircle } from "react-icons/fa";
import { Navigate, redirect, useNavigate } from 'react-router-dom'

export const Login = () => {

  const [user, setUser] = useState({
    username: '',
    password: '',
    captchaToken: ''
  })

  const [data, setData] = useState({
    mensaje: '',
    exito: false,
    respuesta: {}
  })

  const [captchaFlag, setCaptchaFlag] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault()

    switch (e.target.name) {
      case 'username':
        setUser({ ...user, username: e.target.value })
        break;

      case 'password':
        setUser({ ...user, password: e.target.value })
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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

      if (d.exito) {
        //login ok 
        localStorage.setItem("userId", d.respuesta.idUsuario)
        localStorage.setItem("usuario", d.respuesta.usuario)
        localStorage.setItem("nombreCompleto", d.respuesta.nombreApellido)
        localStorage.setItem("idFamilia", d.respuesta.idFamilia)
        localStorage.setItem("familia", d.respuesta.familia)
        navigate("/home", {replace: true})
        window.location.reload()
      }

    } catch (error) {
      console.log(error)
    }
  }
  
  // useEffect(() => {
  //   if (!chequeoCaptcha()) { return }
  //   // El reCaptcha v3 crea el token cuando se carga el script.
  //   // Verifico que no haya un script de captcha ya cargado:
  //   let scripts = document.getElementsByTagName('script');
  //   scripts = [...scripts].filter(script => script.src === `https://www.google.com/recaptcha/api.js?render=${import.meta.env.VITE_REACT_APP_SITE_CAPTCHA}`)
    
  //   if (scripts.length === 0) {
  //     // Creo el script:
  //     const script = document.createElement('script');
  //     script.src = "https://www.google.com/recaptcha/api.js?render=" + import.meta.env.VITE_REACT_APP_SITE_CAPTCHA;
  //     script.id = "g-recaptcha"

  //     // Agrego el script del reCaptcha al body:
  //     document.body.appendChild(script)
  //   }
  //   else {
  //     const badges = document.getElementsByClassName('grecaptcha-badge')
  //     for (const badge of badges) { badge.style.visibility = 'visible' }
  //   }

  // }, [])

  // async function chequeoCaptcha(token) {
  //   const { data: chequeo } = await fetch('http://localhost:9000/usuarios/checkCaptcha', {
  //     method:"POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({captchaToken: localStorage.getItem("token")})
  //   })
  //   setCaptchaFlag(chequeo);
  //   return chequeo;
  // }

  // async function getCaptchaToken() {
  //   return new Promise((resolve, reject) => {
  //     window.grecaptcha.ready(_ => {
  //       window.grecaptcha
  //         .execute(import.meta.env.VITE_REACT_APP_SITE_CAPTCHA, { action: "LOGIN" })
  //         .then(token => { 
  //           chequeoCaptcha(token); 
  //           resolve(token);
  //         })
  //         .catch(error => reject(error))
  //     })
  //   })
  // }

  return (
    <div className='login'>
      <div className='informacion-login'>
        <div className='imagen-div'>
          <img src='https://st4.depositphotos.com/1049680/20108/i/450/depositphotos_201087534-stock-photo-beautiful-feline-cat-eating-on.jpg' className='imagen-login' alt='Un gato comiendo su alimento' />
          <p style={{ textAlign: "justify", marginTop: "50px" }}><b>Feeded!</b> es una aplicación para gestionar la dieta de tus mascotas. Este sistema está diseñado para llevar un control general en la alimentación de los animales y sobre quienes están a cargo de las mascotas.</p>
        </div>

      </div>

      <form className='inputs' onSubmit={(e) => handleSubmit(e)}>
        <h2>¡Bienvenido!</h2>
        <label htmlFor="user">Usuario
          <input name="username" type="text" className='form-control' onChange={(e) => handleChange(e)} />
        </label>

        <label htmlFor="password">Contraseña
          <input name="password" type="password" className='form-control' onChange={(e) => handleChange(e)} />
        </label>

        <button type='submit' className='btn btn-primary'>Ingresar</button>

        {!data.exito && data.mensaje &&
          <div class="alert alert-danger" role="alert" style={{ margin: "20px", maxWidth:"300px" }}>
            <span><FaRegTimesCircle /> {data.respuesta && data.respuesta !== null && data.respuesta || data.mensaje}</span>
          </div>
        }
      </form>
    </div>
  )
}
