const express = require("express");
require('dotenv').config()
const menu = require("./routes/menu")
const alimentar = require("./routes/alimentar")
const historial = require("./routes/historial")
const app = express()
const port = process.env.PORT
const cors = require('cors');
  
app.listen(port, () => {
  console.log(`COMIO LA GATA: Escuchando en el puerto ${port}`)
})

app.use(cors());
app.use(express.json());
app.use("/menu", menu)
app.use("/alimentar", alimentar)
app.use("/historial", historial)

module.exports = app
