const mysql = require('mysql'); // load the MySQL connection code which will communicate with the database.

// create a configuration to access our database.
const dbUserConn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

// make the above code accessible for other code modules
module.exports = dbUserConn;