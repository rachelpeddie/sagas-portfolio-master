const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(`in project get request`);
    const sqlText =  `SELECT * FROM "projects";`
    pool.query (sqlText)
    .then( result => {
        console.log(`woot, project result sent from db`, result);
        res.send(result.rows)
    }).catch( error => {
        console.log(`error getting project result from tb`, error);
        res.sendStatus(500);
    })
    
})

router.get('/tags', (req, res) => {
    console.log(`in tags get request`);
    const sqlText = `SELECT * FROM "tags";`
    pool.query(sqlText)
        .then(result => {
            console.log(`woot, tags result sent from db`, result);
            res.send(result.rows)
        }).catch(error => {
            console.log(`error getting tags result from tb`, error);
            res.sendStatus(500);
        })

})


module.exports = router;