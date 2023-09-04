var mysql = require('mysql2/promise');
require('dotenv').config()

//create mysql connection pool
var comioLaGataDB = mysql.createPool(
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD, 
    connectionLimit: 10, //mysql connection pool length
    database: process.env.MYSQL_DATABASE
  }
);

// Attempt to catch disconnects 
comioLaGataDB.on('connection', function (connection) {
  console.log("Conexión establecida a COMIOLAGATA");

comioLaGataDB.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
comioLaGataDB.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});


module.exports = {
  comioLaGataDB: comioLaGataDB
};