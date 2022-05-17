// server.js
// where your node app starts

// project requirements 
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//------------------------------------------------------------------------------

// Application cover page 
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to timestamp microservice page 
app.get("/timestamp", function (req, res) {
  res.sendFile(__dirname + '/views/timestamp.html');
});

// Route to header parser microservice page 
app.get("/headerparser", function (req, res) {
  res.sendFile(__dirname + '/views/headerparser.html');
});

// Route to url shortener microservice page 
app.get("/urlshortener", function (req, res) {
  res.sendFile(__dirname + '/views/urlshortener.html');
});

//------------------------------------------------------------------------------

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Redirect to required pages
app.post("/redirect", function (req, res) {
  let timeStamp = req.body.microservice;
  let headerParser = req.body.microservice;
  let urlShortener = req.body.microservice;
  
  if (timeStamp == "timestamp")
    res.redirect("/timestamp")
  if (headerParser == "headerparser")
    res.redirect("/headerparser")
  if (urlShortener == "urlshortener")
    res.redirect("/urlshortener")
});

// Allows user to input via HTML interface rather than the browser
app.post("/timestamp/redirect", function (req, res) {
  let redirectRoute = "/timestamp/api/" + req.body.date
  res.redirect(redirectRoute);
});

// Gets a json object containing unix time and utc time. 
app.get("/timestamp/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let dateNow = new Date();

  // If no argument passed return current time 
  if (dateString === undefined)
  res.json({
    "unix": dateNow.getTime(),
    "utc": dateNow.toUTCString()
  });
  
  // Handles if unix time is input 
  else if (parseInt(dateString) > 10000)
  {
    let unixTime = new Date(parseInt(dateString));
    res.json({
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    });
  }
  
  let datePassed = new Date(dateString)

  // Handles if utc time is input 
  if (datePassed == "Invalid Date")
    res.json({ error : "Invalid Date" });
  else 
    res.json({
      "unix": datePassed.getTime(),
      "utc": datePassed.toUTCString()
    });
});

// Gets a json object containing requestors IP Address, language & software
app.get("/headerparser/api/whoami", function (req, res) {
  res.json({
    "ipaddress": req.connection.remoteAddress,
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"]
  });
});


// Posts users inputted URL and saves it to DB  
app.post('/api/shorturl', function(req, res) { 
  const urlParsed = req.body.url;

  if (urlParsed == 1) 
  {
    res.json({
      "error": "Invalid URL"
    })
  }
  if (urlParsed === 1)
  {
    res.json({
      "error": "Hostname"
    })
  }
  
  res.json({
    "original_url": req.body.url,
    "short_url": Date.now() 
  });
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
