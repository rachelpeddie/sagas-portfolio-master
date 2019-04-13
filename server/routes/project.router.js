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

router.post('/', (req, res) => {
    let project = req.body;
    console.log(`in post request`, project);
    const sqlText = `INSERT INTO "projects" ("name", "description", "thumbnail", "website", "github", "date_completed", "tag_id") VALUES ( $1, $2, $3, $4, $5, $6, $7);`
    pool.query( sqlText, [project.name, project.description, project.thumbnail, project.website, project.github, project.date_completed, project.tag_id])
    .then( response => {
        console.log(`woot, successfully added project to db!`);
        res.sendStatus(201);
    }).catch (error => {
        console.log(`error adding project to db`, error);
        res.sendStatus(500);
    })
})


module.exports = router;