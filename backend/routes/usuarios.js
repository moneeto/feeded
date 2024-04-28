let express = require("express");
let app = express()
let router = express.Router()
let usuariosModel = require("../models/usuariosModel.js")

router.post("/login", loginUser)
router.post("/checkCaptcha", captchaController)

async function captchaController(req, res, next) {

  const captchaToken = req.body.captchaToken

  try {
    // Call Google's API to get score
    const resp = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_CAPTCHA}&response=${captchaToken}`
    );

    res.status(200).send(resp.data);

  }
  catch {
    res.status(500).send('ERROR - SOS ROBOT PA');
  }

}


async function loginUser(req, res) {
  try {
    let request = {}
    request.username = req.body?.username
    request.password = req.body?.password



    if(request.username === null || request.username === "") { throw new Error("El campo 'usuario' está vacío.")}
    if(request.password === null || request.password === "") { throw new Error("El campo 'contraseña' está vacío.")}
    console.log(request)
    let [log] = await usuariosModel.getUserByLogin(request)
    console.log(log)
    if (!log) {throw new Error("Usuario o contraseña incorrectos, verifique nuevamente sus credenciales.")}

    if (!log.usuario || !log.password) {
      res.status(409).send({mensaje: "Usuario o contraseña incorrectos, verifique nuevamente sus credenciales.", exito: false})
    } else {
      let respuesta = {}
      respuesta.nombreApellido = log.nombreApellido
      respuesta.usuario = log.usuario
      respuesta.idUsuario = log.idUsuario
      respuesta.idFamilia = log.idFamilia
      respuesta.familia = log.familia

      res.status(200).send({mensaje: "Ingreso a la plataforma exitoso.", exito: true, respuesta})
    }

  } catch (error) {
    res.status(409).send({mensaje: "Error al ingresar a la plataforma.", exito: false, respuesta: String(error)})
  }
}




module.exports = router