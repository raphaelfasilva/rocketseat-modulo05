const { Pool } = require("pg")

module.exports = new Pool({
    user: 'gymmanager',
    password: "gym123@",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})