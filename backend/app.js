const express = require("express");
require('dotenv').config()
const menu = require("./routes/menu")
const app = express()
const port = process.env.PORT



app.listen(port, () => {
  console.log(`COMIO LA GATA: Escuchando en el puerto ${port}`)
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen (esto debe ser más restrictivo en producción)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/menu", menu)

module.exports = app
