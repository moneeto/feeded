let express = require("express");
let app = express()
let router = express.Router()
let menuModel = require("../models/menuModel")


// DEFINIR RUTAS
router.get("/", menuPrincipal)
router.post("/alimentar", getAlimentar)

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
    console.log(response)


    res.status(200)
    res.send(response)
  }
  catch (error) {
    console.log({ mensaje: "Ocurrió un error obteniendo el menú principal: " + error })
  }
}

async function getAlimentar(req, res) {
  try {
    let data = []
    await menuModel.getAlimentar()
    .then((response) => {
      data = response
    })
    .catch((err) => {
      throw err
    })

    let response = {data: data}
    res.status(200).send(response)
  } catch (error) {
    console.log({ mensaje: "Ocurrió un error obteniendo el menú ALIMENTAR: " + error })
  }
}

module.exports = router