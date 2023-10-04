let express = require("express");
let app = express()
let router = express.Router()
let historialModel = require("../models/historialModel.js")

// DEFINIR RUTAS ruta: http://localhost:9000/alimentar => / | /guardarAccion | /etc
router.post("/", traerHistorial)

// FUNCIONES
async function traerHistorial(req, res) {
  try {
    let tiempoHistorial = req.body.tiempoHistorial;

    const response = await historialModel.traerHistorial(tiempoHistorial)
    
    console.log(response)

    res.status(200).send({mensaje:"Se obtuvo correctamente el historial", data: response})
  } catch (error) {
    res.status(409).send(error)
    console.log({ mensaje: "Ocurrió un error obteniendo el historial: " + error })
  }
}

module.exports = router