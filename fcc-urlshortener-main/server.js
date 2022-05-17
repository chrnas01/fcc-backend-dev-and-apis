require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// Post request 
app.post('/api/shorturl', function(req, res) { 
  const urlParsed = req.body.url; 

  if (urlParsed == 1) 
  {
    res.json({
      "error":"Invalid URL"
    })
  }
  if (urlParsed === 1)
  {
    res.json({
      "error":"Hostname"
    })
  }
  
  res.json({
    "original_url": req.body.url,
    "short_url": 1
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
