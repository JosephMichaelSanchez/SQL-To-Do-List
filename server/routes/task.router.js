const express = require('express');
const taskRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool.js')

// GET
taskRouter.get('/', (req, res) => {
    console.log('in GET');
    let queryText = `
        SELECT * FROM "tasks"
    `;

    pool.query(queryText).then(tasks => {
        res.send(tasks.rows);
    }).catch(error => {
        console.log('Error getting tasks', error);
        res.sendStatus(500);
    })

})

// POST
taskRouter.post('/', (req, res) => {
    let newTask = req.body
    console.log('Adding', newTask);

    if(newTask.status.toLowerCase() === 'complete'){
        newTask.status = true;
    } else if(newTask.status.toLowerCase() === 'incomplete') {
        newTask.status = false;
    } else {
        alert('Tasks must be marked either incomplete or complete')
    }

    let queryText = `
    INSERT INTO "tasks"
    ("task", "description", "status")
    VALUES ($1, $2, $3);
    `;

    let values = [newTask.task, newTask.description, newTask.status]
    
    pool.query(queryText, values)
    .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
})


//PUT

taskRouter.put('/:id', (req, res) => {
    console.log(req.params.id);
    let queryText = `
    UPDATE "tasks"
    SET "status" = TRUE
    WHERE "id" = $1;
    
    `;

    const values = [req.params.id];
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

//DELETE

taskRouter.delete('/:id', (req, res) => {
    console.log('delete a task', req.params.id);
    let id = req.params.id;
    const queryText = `
    DELETE FROM "tasks"
    WHERE "id" = $1;
    `;

    const values = [id];

    pool.query(queryText,values)
    .then(result => {
        res.sendStatus(204);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
});




module.exports = taskRouter;