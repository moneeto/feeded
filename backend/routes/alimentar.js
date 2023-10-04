let express = require("express");
let app = express()
let router = express.Router()
let alimentarModel = require("../models/alimentarModel.js")

// DEFINIR RUTAS ruta: http://localhost:9000/alimentar => / | /guardarAccion | /etc
router.post("/", getAcciones)
router.post("/guardarAccion", guardarFormulario)
router.post("/getAccion", traerAccion)

// FUNCIONES
async function getAcciones(req, res) {
  try {
    let idAccion = req.body.idAccion
    let data = {}

      await alimentarModel.getAcciones(idAccion)
        .then((response) => {
          data.acciones = response[0]
        })
        .catch((err) => {
          throw err
        })


    let response = { mensaje: "Se obtuvieron los siguientes datos: ", data }
    res.status(200).send(response)
  } catch (error) {
    res.status(409).send(error)
    console.log({ mensaje: "Ocurrió un error obteniendo el menú ALIMENTAR: " + error })
  }
}

async function guardarFormulario(req, res) {
  try {
    let request = {}
    request.accion = req.body.accion
    request.check = req.body.check

    await alimentarModel.guardarFormulario(request)
      .then((response) => {
        data = response
      })
      .catch((err) => {
        throw err
      })

    let response = { mensaje: "Se guardó correctamente el formulario.", data }
    res.status(200).send(response)
  } catch (error) {
    res.status(409).send(error)
  }
}

async function traerAccion(req, res) {
  try {
    let idAccion = req.body.idAccion
    const response = await alimentarModel.traerAccion(idAccion)
    
    res.status(200).send(response[0])
  } catch (error) {
    res.status(409).send(error)
  }
}

module.exports = router