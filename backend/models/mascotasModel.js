const { comioLaGataDB } = require("../mysql");

async function getMascota(idMascota) {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `
      SELECT M.id,
      M.nombre,
      TM.id,
      TM.animal,
      M.max_comidas_permitidas,
      M.foto,
      U.idUsuario,
      U.nombreApellido,
      U.usuario
      FROM mascotas M
      inner join tipos_mascotas TM on TM.id = M.tipo_mascota
      inner join usuarios U on U.idUsuario = M.idDueno
      where M.id = ?
    `
    // podría implementarse cambiar de dueño.

    let params = [idMascota]

    let results = await comioLaGataDB.query(sql, params)
    resolve(results[0])
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

async function getMascotas(request) {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `
      SELECT M.id,
      M.nombre,
      TM.animal,
      M.max_comidas_permitidas,
      M.foto,
      U.nombreApellido,
      U.usuario
      FROM mascotas M
      inner join tipos_mascotas TM on TM.id = M.tipo_mascota
      inner join usuarios U on U.idUsuario = M.idDueno
    `

    let params = []

    let results = await comioLaGataDB.query(sql, params)
    resolve(results[0])
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

async function traerTiposMascotas(request) {
  return new Promise(async (resolve, reject) => {
    try {
      let sql = `
    SELECT * FROM tipos_mascotas
    `

    let params = []

    let results = await comioLaGataDB.query(sql, params)
    resolve(results[0])
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

module.exports = {
  traerTiposMascotas,
  getMascotas,
  getMascota
}