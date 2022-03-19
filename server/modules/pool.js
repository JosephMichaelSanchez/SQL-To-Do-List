const pg = require('pg');

//do PG Setup...this should eventually be in a separate module
const Pool = pg.Pool;
const pool = new Pool({
    //config to talk to Postgres!
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10, //max number of connections
    idleTimeoutMillis: 30000 //30 seconds to give up
});

pool.on('connect', () => {
    console.log('PG CONNECTED!');
})

pool.on('error', (err) => {
    console.log('PG Error!', err);
})

module.exports = pool;