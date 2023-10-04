let express = require("express");
let app = express()
let router = express.Router()
let menuModel = require("../models/menuModel")


// DEFINIR RUTAS
router.get("/", menuPrincipal)

// FUNCIONES
async function menuPrincipal(req, res) {
  try {
    let data = []
    await menuModel.getMenus()
    .then((response) => {
      data = response
    })

      .catch((error) => {
        throw error
      })
      
    let response = data// respuesta al front
    
    res.status(200)
    res.send(response)
  }
  catch (error) {
    console.log({ mensaje: "Ocurrió un error obteniendo el menú principal: " + error })
  }
}

module.exports = router