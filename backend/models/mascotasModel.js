const { comioLaGataDB } = require("../mysql");

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
  traerTiposMascotas
}