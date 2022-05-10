const express = require("express");
const app = express();

var bodyParser = require("body-parser");
var cors = require("cors");
var fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50000mb",
    parameterLimit: 50000,
  })
);
//To parse json data
app.use(express.json());
app.use(cors());

var whitelist = ["http://localhost", "http://www.abc.com"]; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
};
app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations

app.get("/", (req, res) => {
  res.json("Welcome to Express JS");
});

const productsRouter = require("./routes/products");

app.use("/api/products", productsRouter);

app.listen(process.env.port || 2000);
console.log("Web Server is listening at port " + (process.env.port || 2000));
