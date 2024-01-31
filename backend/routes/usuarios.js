let express = require("express");
let app = express()
let router = express.Router()
let usuariosModel = require("../models/usuariosModel.js")

router.post("/login", loginUser)

async function loginUser(req, res) {
  try {
    let request = {}
    request.username = req.body?.username
    request.password = req.body?.password

    let [log] = await usuariosModel.logUser(request)
// String(request.username) !== String(log.usuario) || String(request.password) !== String(log.password)
    if (!log.usuario || !log.password) {
      res.status(409).send({mensaje: "Usuario o contraseña incorrectos, verifique nuevamente sus credenciales.", exito: false})
    } else {
      let respuesta = {}
      respuesta.nombreApellido = log.nombreApellido
      respuesta.usuario = log.usuario
      respuesta.idUsuario = log.idUsuario

      res.status(200).send({mensaje: "Ingreso a la plataforma exitoso.", exito: true, respuesta})
    }


  } catch (error) {
    res.status(409).send({mensaje: "Error al ingresar a la plataforma.", exito: false, respuesta: error})
  }


}




module.exports = router