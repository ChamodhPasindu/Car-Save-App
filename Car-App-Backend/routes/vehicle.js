const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.config')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})


const connection = mysql.createConnection(db.database)
connection.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        var vehicleTable = "CREATE TABLE IF NOT EXISTS vehicle(vehicle_no VARCHAR (50),user_id INT,brand VARCHAR (50),Model VARCHAR (20),fuel_Type VARCHAR (10),mileage INT,transmission VARCHAR (10),description VARCHAR(255),CONSTRAINT PRIMARY KEY (vehicle_no))"
        connection.query(vehicleTable, function (err, result) {
            if (result.warningCount === 0) {
                console.log("vehicle Table Created")

                var vehicleImgTable = "CREATE TABLE IF NOT EXISTS vehicle_img(id INT AUTO_INCREMENT,vehicle_no VARCHAR (20),img_one VARCHAR (255),img_two VARCHAR (255),img_three VARCHAR (255),img_four VARCHAR (255),CONSTRAINT PRIMARY KEY (id),CONSTRAINT FOREIGN KEY (vehicle_no) REFERENCES vehicle (vehicle_no) ON DELETE CASCADE ON UPDATE CASCADE)"
                connection.query(vehicleImgTable, function (err, result) {
                    if (result.warningCount === 0) {
                        console.log("vehicle Image Table Created")
                    }
                })
            }
        })
    }
})

const router = express.Router()

router.post("/photo", upload.array('file', 5), function (req, res, next) {
    let img1 = req.files[0].originalname;
    let img2 = req.files[1].originalname;
    let img3 = req.files[2].originalname;
    let img4 = req.files[3].originalname;


    let car = JSON.parse(req.body.car);

    let registrationNo = car.registration_no;
    let userId = car.user_id;
    let brand = car.brand;
    let model = car.model;
    let fuelType = car.fuel_type;
    let transmission = car.transmission;
    let mileage = car.mileage;
    let description = car.description;

    console.log(img1, img2, img3, img4)

    var addUser = "INSERT INTO vehicle VALUES (?,?,?,?,?,?,?,?)"
    connection.query(addUser, [registrationNo, userId, brand, model, fuelType, mileage, transmission, description], (err) => {
        if (err) {
            console.log(err)
            res.send({"message": "Vehicle Save Error"})
        } else {
            var addUser = "INSERT INTO vehicle_img  (vehicle_no,img_one,img_two,img_three,img_four) VALUES (?,?,?,?,?)"
            connection.query(addUser, [registrationNo, img1, img2, img3, img4], (err) => {
                if (err) {
                    console.log(err)
                    res.send({"message": "Vehicle Image Save Error"})
                } else {
                    res.send({"message": "Vehicle Save Successfully"})

                }
            })
        }
    })
})
module.exports = router
