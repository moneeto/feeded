const { comioLaGataDB } = require("../mysql");

async function getUserByLogin(request) {
  return new Promise(async (resolve, reject) => {
    try {
      let username = request.username
      let password = request.password
  
      let sql = `SELECT u.*, f.familia 
      from usuarios u
      INNER JOIN familias f ON u.idFamilia = f.idFamilia
      WHERE usuario = ? AND password = ?`
      let params = [username, password]
  
      const res = await comioLaGataDB.query(sql, params)
      resolve(res[0])

    } catch (error) {

      console.log(error)
      reject(error)

    }
  })
}

module.exports = {
  getUserByLogin
}