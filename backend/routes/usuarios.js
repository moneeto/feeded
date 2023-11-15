let express = require("express");
let app = express()
let router = express.Router()
let usuariosModel = require("../models/usuariosModel.js")

router.post("/login", loginUser)

async function loginUser(req, res) {
  let request = {}
  let body = req.body

  request.username = body.username
  request.password = body.password



}




module.exports = router