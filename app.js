//import express package
var express = require("express");

//import mongodb package
var mongodb = require("mongodb");

//MongoDB connection URL - mongodb://host:port/dbName
var dbHost = "mongodb://localhost:27017/fusion_candlestick";

//DB Object
var dbObject;

//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});

function getData(responseObj){
  //use the find() API and pass an empty query object to retrieve all records
  dbObject.collection("candlestick").find({}).toArray(function(err, docs){
    if ( err ) throw err;
    var openArray = [];
    var highArray = [];
    var lowArray = [];
    var closeArray = [];
    var xArray = [];
    var volumenArray = [];

    for ( index in docs){
      var doc = docs[index];
      //category array
      var openn = doc['open'];
      //series 1 values array
      var high = doc['high'];
      //series 2 values array
      var low = doc['low'];
      var close = doc['close'];
      var x = doc['x'];
      var volume = doc['volume'];
      openArray.push({"open": openn});
      highArray.push({"high" : high});
      lowArray.push({"low" : low});
      closeArray.push({"close" : close});
      xArray.push({"x" : x});
      volumenArray.push({"volume" : volume})
    }

    var dataset = [
      {
        "seriesname" : "Petrol Price",
        "data" : petrolPrices
      },
      {
        "seriesname" : "Diesel Price",
        "data": dieselPrices
      }
    ];

    var response = {
      "dataset" : dataset,
      "categories" : monthArray
    };
    responseObj.json(response);
  });
}

//create express app
var app = express();

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining middleware to serve static files
app.use('/public', express.static('public'));
app.get("/fuelPrices", function(req, res){
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});

app.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});
