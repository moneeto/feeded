let express = require("express");
let app = express()
let router = express.Router()
let mascotasModel = require("../models/mascotasModel.js")

router.get("/", getMascotas)
router.post("/getMascota", getMascotaById)
router.get("/getTiposMascotas", traerTiposMascotas)
router.post("/agregarMascota", agregarMascota)
router.put("/editarMascota", editarMascota)

async function eliminarMascota(req, res) {
  try {
    //SEGUIR CON EL ABM DE LAS MACSOTAS //Seguir con el model
  } catch (error) {
    
  }
}

async function editarMascota(req, res) {
  try {
    let request = {}
    let validoForm = true

    request.nombre = req.body?.nombre
    request.tipo_mascota = req.body?.tipo_mascota
    request.max_comidas_permitidas = req.body?.max_comidas_permitidas
    request.idDueno = req.body?.idDueno
    request.foto = req.body?.foto
    request.idMascota = req.body?.idMascota

    await mascotasModel.editarMascota(request) //Seguir con el model
    res.status(200).send({mensaje: "Mascota editada exitosamente."})

  } catch (error) {
    res.status(409).send({mensaje: "No se pudo editar la mascota", error})
  }
}

async function agregarMascota(req, res) {
  try {
    let request = {}
    let validoForm = true
    
    request.nombre = req.body.nombre
    request.tipo_mascota = req.body.tipo_mascota
    request.max_comidas_permitidas = req.body.max_comidas_permitidas
    request.idDueno = req.body.idDueno
    request.foto = req.body.foto
    request.idMascota = req.body?.idMascota

    await mascotasModel.agregarMascota(request) //Seguir con el model

  } catch (error) {
    res.status(409).send({mensaje: "No se pudo agregar la mascota", error})
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