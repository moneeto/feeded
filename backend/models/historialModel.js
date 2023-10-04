const { comioLaGataDB } = require("../mysql");

async function traerHistorial(request) {
  return new Promise(async (resolve, reject) => {
    let tiempoHistorial = request.tiempoHistorial
    let sql = `
    SELECT APU.idAccionUsuario,
U.usuario,
U.nombreApellido,
A.accion,
APU.fechaAccion
FROM acciones_por_usuario APU
inner join usuarios U on U.idUsuario = APU.idUsuario
inner join acciones A on A.idAccion = APU.idAccion
order by APU.fechaAccion desc
    `
    let params = []

    try {
      const res = await comioLaGataDB.query(sql, params);
      resolve(res[0]);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

module.exports = {
  traerHistorial
}