const mysql = require("mysql2")
require("dotenv").config()


let con = mysql.createConnection({
    host: process.env.HOST_URL,
    port: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
})

con.connect(async (err) => {
    if (err) {
        console.error(err.stack)
        return
    }
    console.log("SQL connected!")
})

module.exports = con