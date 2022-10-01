const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.config')

const connection = mysql.createConnection(db.database)
connection.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        var customerTable = "CREATE TABLE IF NOT EXISTS user(user_id INT AUTO_INCREMENT,name VARCHAR (20),password VARCHAR(100),email VARCHAR (100),CONSTRAINT PRIMARY KEY (user_id))"

        connection.query(customerTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("User Table Created")
            }
        })
    }
})
const router = express.Router()

router.post("/", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    var addUser = "INSERT INTO user (name,password,email) VALUES (?,?,?)"
    connection.query(addUser, [name, password, email], (err) => {
        if (err) {
            console.log(err)
            res.send({"message": "User Already Added"})
        } else {
            res.send({"message": "User Added Successfully"})
        }
    })
})

router.post("/verify", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    var loginVerify = "SELECT * FROM user WHERE name=? AND password=?"
    connection.query(loginVerify, [name, password], (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            if (rows.length === 0) {
                res.send({"message": "No Any Vehicles"});
            } else {
                var getVehicles = "SELECT * FROM vehicle WHERE user_id=?"
                connection.query(getVehicles, [rows[0].user_id], (err, rows) => {
                    if (err) {
                        console.log(err)
                    }else {
                        res.send({"data": rows})
                    }
                })
            }
        }
    })

})

module.exports = router
