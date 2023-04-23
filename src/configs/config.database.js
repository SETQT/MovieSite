const initOptions = {/* initialization options */ };
const pgp = require('pg-promise')(initOptions);
const connection = require('./connectStr.js')

// connection = 
// connection = {
//     host: 'localhost',
//     port: 5432,
//     database: 'QLBH',
//     user: 'postgres',
//     password: 'root',
//     max: 30
// }

const db = pgp(connection)


module.exports = db
