const Pool = require('pg').Pool;
const config = require('config');

// get config of database depend on NODE_ENV
const { user, host, port, database, password} = config.get('db_config');
const connectionString = process.env.DATABASE_URL ||`postgre://${user}:${password}@${host}:${port}/${database}`


// connect to database
const pool = new Pool({
    connectionString: connectionString
});

module.exports =  pool;