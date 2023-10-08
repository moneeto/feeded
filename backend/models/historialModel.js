const { comioLaGataDB } = require("../mysql");

async function traerHistorial(tiempoHistorial) {
  return new Promise(async (resolve, reject) => {
    let params;
    let sql = `
    SELECT APU.idAccionUsuario,
U.usuario,
U.nombreApellido,
A.accion,
APU.fechaAccion
FROM acciones_por_usuario APU
inner join usuarios U on U.idUsuario = APU.idUsuario
inner join acciones A on A.idAccion = APU.idAccion
WHERE 1 = 1
    `
    
    if(tiempoHistorial === 1) {
      sql += `
        AND DATE(APU.fechaAccion) = CURDATE() order by APU.fechaAccion desc
      `
    } else if (tiempoHistorial === 2) {
      sql += `
        AND APU.fechaAccion BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() order by APU.fechaAccion desc
      `
    } else if (tiempoHistorial === 3) {
      sql += `
        AND APU.fechaAccion BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() order by APU.fechaAccion desc
      `
    }

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