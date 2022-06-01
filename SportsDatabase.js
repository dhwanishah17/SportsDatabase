const express = require('express');
const mysql = require('mysql');
const parser = require('body-parser');
const { json } = require('express/lib/response');
const validator = require('validator');
const { reverseMultiplyAndSum } = require('validator/lib/util/algorithms');
const app = express();
app.use(parser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Sports",
    multipleStatements: true
})
connection.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("Connected")
    }
})


const port = process.env.PORT || 5000;
app.listen(port);
console.log("App is listening to port 5000");

app.get('/player', (req, res) => {
    connection.query('SELECT * FROM Player', (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log(err);
        }
    })
})

app.get('/player/:id', (req, res) => {
    connection.query('SELECT * FROM Player WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log(err);
        }
    })
})

app.delete('/player/:id', (req, res) => {
    connection.query('DELETE FROM Player WHERE id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send("Deleted Successfully")
        } else {
            console.log(err);
        }
    })
})

app.post('/player', (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let captain = req.body.captain;
    let dob = req.body.dob;

    let sql = 'INSERT INTO Player(name, age, captain , dob) VALUES(?,?,?,?)'
    connection.query(sql, [name, age, captain, dob], (err, rows, fields) => {
        if (!err) {
            //    console.log(rows);
            return res.status(200).json({ message: "Added" });
        } else {
            return res.status(500).json(err);
        }
    })
})


app.put('/player/:id', (req, res) => {
    const id = req.params.id;
    let name = req.body.name;
    let age = req.body.age;
    let captain = req.body.captain;
    let dob = req.body.dob;
    let sql = 'UPDATE Player SET name = ?, age = ?,  captain = ?, dob = ? WHERE id =?'
    connection.query(sql, [name, age, captain, dob,id], (err, result, fields) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "id doesn't exixts" });
            }
            return res.status(200).json({ message: "Updated Successfully" });
        } else {
            res.status(500).json(err);
        }
    });
});


//Team


app.get('/team', (req, res) => {
    connection.query('SELECT * FROM Team', (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log(err);
        }
    })
})

app.get('/team/:id', (req, res) => {
    connection.query('SELECT * FROM Team WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows)
        } else {
            console.log(err);
        }
    })
})

app.delete('/team/:id', (req, res) => {
    connection.query('DELETE FROM Team WHERE id = ? ', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send("Deleted Successfully")
        } else {
            console.log(err);
        }
    })
})

app.post('/team', (req, res) => {
    let name = req.body.name;

    let sql = 'INSERT INTO Team(name) VALUES(?)'
    connection.query(sql, [name], (err, rows, fields) => {
        if (!err) {
            //    console.log(rows);
            return res.status(200).json({ message: "Added" });
        } else {
            return res.status(500).json(err);
        }
    })
})


app.put('/team/:id', (req, res) => {
    const id = req.params.id;
    let name = req.body.name;
    
    let sql = 'UPDATE Team SET name = ? WHERE id =?'
    connection.query(sql, [name,id], (err, result, fields) => {
        if (!err) {
            if (result.affectedRows == 0) {
                return res.status(404).json({ message: "id doesn't exixts" });
            }
            return res.status(200).json({ message: "Updated Successfully" });
        } else {
            res.status(500).json(err);
        }
    });
});
