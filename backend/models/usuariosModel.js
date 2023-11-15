const { comioLaGataDB } = require("../mysql");

async function logUser(request) {
  return new Promise(async (resolve, reject) => {

    let username = request.username
    let password = request.password


  })
}

module.exports = {
  logUser
}