let express = require("express");
let app = express()
let router = express.Router()
let mascotasModel = require("../models/mascotasModel.js")

router.get("/", getMascotas)
router.post("/getMascota", getMascotaById)
router.get("/getTiposMascotas", traerTiposMascotas)
router.post("/agregarMascota", agregarMascota)

async function agregarMascota(req, res) {
  try {
    //SEGUIR CON EL ABM DE LAS MACSOTAS
  } catch (error) {
    
  }
}

async function getMascotaById(req, res) {
  try {
    let idMascota = req.body.idMascota

    let results = await mascotasModel.getMascota(idMascota)
    console.log(results)
    res.status(200).send(results)

  } catch (error) {
    res.status(409).send(error)
  }
}

async function getMascotas(req, res) {
  try {

    let results = await mascotasModel.getMascotas()
    console.log(results)
    res.status(200).send(results)

  } catch (error) {
    res.status(409).send(error)
  }
}

async function traerTiposMascotas(req, res) {
  try {
    
    let results = await mascotasModel.traerTiposMascotas()
    res.status(200).send(results)

  } catch (error) {
    res.status(409).send(error)
  }
}


module.exports = router