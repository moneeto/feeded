const { comioLaGataDB } = require("../mysql");

async function getAcciones() {
  return new Promise(async (resolve, reject) => {
    let sql = `
    SELECT * FROM acciones
    `

    let params = []

    let response = []
    try {
      const res = await comioLaGataDB.query(sql, params);
      response.push(res[0])

      resolve(response);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

async function traerAccion(idAccion) {
  return new Promise(async (resolve, reject) => {
    let sql = `
    select U.nombreApellido,
APU.fechaAccion,
APU.idAccion,
A.accion
from acciones_por_usuario APU
inner join usuarios U on U.idUsuario = APU.idUsuario
inner join acciones A on A.idAccion = APU.idAccion
where APU.idAccion = ?
order by fechaAccion desc
limit 1
    `

    let params = [idAccion]

    try {
      const res = await comioLaGataDB.query(sql, params);
      resolve(res[0]);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

async function guardarFormulario(request) {
  return new Promise(async (resolve, reject) => {
    let accion = request.accion
    let check = request.check
    let sql = `
    insert into acciones_por_usuario (idAccionUsuario, idUsuario, idAccion, fechaAccion) values (idAccionUsuario, 1, ?, now())
    `
    let params = [accion]

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
  getAcciones,
  guardarFormulario,
  traerAccion
}