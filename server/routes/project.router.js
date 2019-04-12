const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(`in project get request`);
    const sqlText =  `SELECT * FROM "projects";`
    pool.query (sqlText)
    .then( result => {
        console.log(`woot, result sent from db`, result);
        res.send(result.rows)
    }).catch( error => {
        console.log(`error getting result from tb`, error);
        res.sendStatus(500);
    })
    
})

module.exports = router;