const express = require("express");
const mysql = require("mysql");
const db = require("../configs/db.config");
const multer = require("multer");

const app=express();
app.use('/uploads', express.static(process.cwd() + '/uploads'));

const upload = multer({ dest: "uploads/" });

const connection = mysql.createConnection(db.database);
connection.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    var vehicleTable =
      "CREATE TABLE IF NOT EXISTS vehicle(vehicle_no VARCHAR (50),user_id INT,brand VARCHAR (50),model VARCHAR (20),fuel_Type VARCHAR (10),mileage INT,transmission VARCHAR (10),description VARCHAR(255),location VARCHAR (50),mobile VARCHAR(10),date VARCHAR(10),img_one VARCHAR(255),img_two VARCHAR(255),img_three VARCHAR(255),img_four VARCHAR(255) ,CONSTRAINT PRIMARY KEY (vehicle_no),CONSTRAINT FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE)";
    connection.query(vehicleTable, function (err, result) {
      if (result.warningCount === 0) {
        console.log("vehicle Table Created");
      }
    });
  }
});

const router = express.Router();

router.post("/save", upload.array("file", 4), function (req, res, next) {
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
  let location = car.location;
  let mobile = car.mobile;
  let date = car.date;

  var vehicleTable = "INSERT INTO vehicle VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  connection.query(
    vehicleTable,
    [
      registrationNo,
      userId,
      brand,
      model,
      fuelType,
      mileage,
      transmission,
      description,
      location,
      mobile,
      date,
      img1,
      img2,img3,img4
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send({ message: "Vehicle Save Error" });
      } else {
        res.send({ message: "Vehicle Save Successfully" });
      }
    }
  );
});

router.get("/allVehicle/:id", (req, res) => {
  let id = req.params.id;
  var getVehicles = "SELECT * FROM vehicle WHERE user_id=?";
  connection.query(getVehicles, [id], (err, rows) => {
    if (err) {
      console.log(err);
      res.send({ message: "Error" });
    } else {
      res.send({ data: rows });
    }
  });
});

router.get("/", (req, res) => {
  let location = req.query.location; 
  let date = req.query.date;

  var getVehicleImg = "SELECT * FROM vehicle WHERE location=? AND date=?";
  connection.query(getVehicleImg, [location, date], (err, rows) => {
    if (err) {
      console.log(err);
      res.send({ message: "Cant Filter Vehicles Right Now" });
    } else {
      res.send({ data: rows });
    }
  });
});

router.put("/", (req, res) => {

  let registration_no = req.body.registration_no;
  let brand = req.body.brand;
  let model = req.body.model;
  let fuelType = req.body.fuel_type;
  let transmission = req.body.transmission;
  let mileage = req.body.mileage;
  let description = req.body.description;
  let location = req.body.location;
  let mobile = req.body.mobile;

  var updateVehicle =
    "UPDATE vehicle SET brand=?,model=?,fuel_type=?,transmission=?,mileage=?,description=?,location=?,mobile=? WHERE vehicle_no=?";
  connection.query(
    updateVehicle,
    [
      brand,
      model,
      fuelType,
      transmission,
      mileage,
      description,
      location,
      mobile,
      registration_no,
    ],
    (err) => {
      if (err) {
        console.log(err);
        res.send({ message: "Vehicle Update Failed" });
      } else {
        res.send({ message: "Vehicle Updated Successfully" });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  var deleteVehicle = "DELETE FROM vehicle WHERE vehicle_no=?";
  connection.query(deleteVehicle, [id], (err) => {
    if (err) {
      console.log(err);
      res.send({ message: "Cant Delete This Vehicle" });
    } else {
      res.send({ message: "Vehicle Deleted Successfully" });
    }
  });
});
module.exports = router;
