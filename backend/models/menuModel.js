const { comioLaGataDB } = require("../mysql");

async function getMenus() {
  return new Promise(async (resolve, reject) => {
    let sql = `
    select idMenu, nombreMenu 
    from menus
    `;
    let params = [];
    try {
      const res = await comioLaGataDB.query(sql, params);
      resolve(res[0]);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  });
}

module.exports = {
  getMenus
}