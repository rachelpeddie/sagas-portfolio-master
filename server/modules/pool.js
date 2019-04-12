const pg = require('pg');

// setup pg to talk to our songs database
const Pool = pg.Pool; // Pool = class
const pool = new Pool({
    database: 'portfolio',
    host: 'localhost',
    port: 5432,
    max: 10, // max connections in pool, once 10 things are running, it will wait until one finishes and becomes available again
    idleTimeoutMillis: 30000 // 30 seconds before timeout on query
}); // end pool

// not required for functionality, required for debugging.
pool.on('connect', () => {
    console.log('postgres connected, woot!');
})

// not required for functionality, required for debugging.
pool.on('error', () => {
    console.log('Database error: ', error);
})

module.exports = pool;