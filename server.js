const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
// const User = require("./model/userdata.js");
//bodyparser
const bodyParser = require("body-parser");
const logger = require("morgan");
const Device = require("./data");
const app = express();

//socket.io stuff
const server = http.createServer(app);
const io = socketIo(server);

const router = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser());
app.use("/api", router);

//mongodb connection
const dbRoute =
  "mongodb+srv://admin:aZBczoCXXr1juAw1@rpi-8pqp7.mongodb.net/test"; //replace ur mongo route
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.set("useCreateIndex", true);

app.get("/", function(req, res) {
  res.send("Rohan").status(200);
});

// function fillArray() {
//   var spawn = require("child_process").spawn;
//   var process = spawn("python3", ["./predict.py", 1, 5]);
//   process.stdout.on("data", function(data) {
//     return (data.toString());
//   })
// }
// const getApiAndEmit = socket => {
//   fillArray();
//   socket.emit("FromAPI_x", { stock_x: stockX_info }, { stock_y: stockY_info }); //emit socket to client
// };

// var interval;
// io.on("connection", socket => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
router.get("/predict", function(req, res) {
  var time = req.param("time");
  var intensity = req.param("intensity");
  var spawn = require("child_process").spawn;
  var process = spawn("python3", ["./predict.py", 2, time, intensity]);
  console.log(process);
  process.stdout.on("data", function(data) {
    return res.status(200).send(data.toString());
  });
});
getDevice = (req, res) => {
  Device.find({}, (err, Amperage) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!Amperage) {
      return res
        .status(404)
        .json({ success: false, error: `Amperage not found` });
    }
    //return res.status(200).json({ success: true, data: Amperage })
    return res.json({ data: Amperage }).status(200);
  }).catch(err => console.log(err));
};

EmitAPI = socket => {
  Device.find({}, (err, Amperage) => {
    //return res.status(200).json({ success: true, data: Amperage })
    socket.emit("FromAPI", { data: Amperage });
    console.log(Amperage);
  }).catch(err => console.log(err));
};
var interval;
io.on("connection", socket => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => EmitAPI(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

router.get("/getDB", getDevice);

router.get("/putDB", function(req, res) {
  const device_new = new Device({
    voltage: 10,
    ampere: 40,
    time: 300,
    uuid: "tty"
  });
  device_new.save(function() {
    res.status(200).send("Thank You for Registering in our MongoDB database");
  });
});
app.listen(8080, () => {
  console.log("Server port is on 8080!");
});

server.listen(4001, () => {
  console.log("Http server port is on 4001!");
})