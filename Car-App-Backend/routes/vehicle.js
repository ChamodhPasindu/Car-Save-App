const express=require('express')
const mysql=require('mysql')
const db=require('../configs/db.config')


const connection=mysql.createConnection(db.database)
connection.connect(function (err) {
    if (err){
        console.log(err)
    }else {
        var vehicleImgTable="CREATE TABLE IF NOT EXISTS vehicle_img(id INT AUTO_INCREMENT,img_one VARCHAR (255),img_two VARCHAR (255),img_three VARCHAR (255),img_four VARCHAR (255),CONSTRAINT PRIMARY KEY (id))"
        connection.query(vehicleImgTable,function (err,result){
            if (result.warningCount===0){

                console.log("vehicle Image Table Created")
                var vehicleTable="CREATE TABLE IF NOT EXISTS vehicle(vehicle_no VARCHAR (50),user_id INT,brand VARCHAR (50),Model VARCHAR (20),fuel_Type VARCHAR (10),mileage INT,transmission VARCHAR (10),description VARCHAR(255),img_id VARCHAR(255),CONSTRAINT PRIMARY KEY (vehicle_no),CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE)"
                connection.query(vehicleTable,function (err,result){
                    if (result.warningCount===0){
                        console.log("vehicle Table Created")
                    }
                })
            }
        })
    }
})
const router=express.Router()
module.exports=router
