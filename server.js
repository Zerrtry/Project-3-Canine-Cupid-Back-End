const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
// const config = require("./config")

app.use(cors())

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin",  "http://canine-cupid.s3-website.us-east-2.amazonaws.com");
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// Add routes, both API and view
app.use(routes);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/caninecupidDB");

app.get("/status", function(req, res) {
  res.send("Welcome to Canine Cupid!");
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
