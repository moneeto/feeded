let express = require("express");
let app = express()
let router = express.Router()
let mascotasModel = require("../models/mascotasModel.js")

router.get("/getTiposMascotas", traerTiposMascotas)

async function traerTiposMascotas(req, res) {
  try {
    
    let results = await mascotasModel.traerTiposMascotas()
    res.status(200).send(results)

  } catch (error) {
    res.status(409).send(error)
  }
}


module.exports = router