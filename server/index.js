var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var db = require('../database');
require('dotenv').config();

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/airport/name/:airport_name', function(req, res) {
  var searchTerm = req.params.airport_name;
  console.log('searchTerm: ', searchTerm);
  db.selectName(searchTerm, function(err, results) {
    if (err) {
      console.error('err from db.selectName', err);
    } else if (results) {
      console.log('Got results from db.selectName');
      // TODO:

      // call dark sky api
      res.json(results);
    }
  });
});

// create application/json parser
var jsonParser = bodyParser.json();

app.post('/weather/forecast/', jsonParser, function(req, res) {
  var dsUrl = 'https://api.darksky.net/forecast/' + process.env.DARKSKY + '/' + req.body.lat + ',' + req.body.long;
  var options = {
    uri: dsUrl,
    json: true
  };
  rp.get(options)
    .then(function(forecast) {
      res.json(forecast);
    })
    .catch(function(err) {
      console.log('Dark Sky api call failed: ', err);
    });
});





// aiport by IATA code
// /v1/airport/iata/{airport_iata}
// app.post('/airport/iata/:airport_iata', function (req, res) {
//   // req.params: { "airport_iata": "ATL" }
//   options.uri = baseUrl + 'iata/' + req.params.airport_iata;
//   // make api call by iata code
//   rp(options)
//     .then(apiRes => {
//       console.log('iata apiRes: ', apiRes);
//     })
//     .catch(err => {
//       console.error('iata api call failed: ', err);
//     });
// });

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
