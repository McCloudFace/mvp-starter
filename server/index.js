var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');
// var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));
// app.get('/', function (req, res) {
//   res.send('GET req to /');
// });

let baseUrl = 'https://api.aviationdata.systems/v1/airport/';
let options = {
  headers: {
    'auth': {
      'user': '91785a66-3eef-4600-ad69-07d32352bd27',
      'pass': 'd758e5fd-6f21-499e-b121-79736978bc83',
      'sendImmediately': false
    }
  },
  json: true
};

// airport(s) by name: /v1/airport/name/{airport_name}
app.post('/airport/name/:airport_name', function (req, res) {
  // make the api call by name https://github.com/request/request-promise#get-something-from-a-json-rest-api
  options.uri = baseUrl + 'name/' + req.params.airport_name;
  rp(options)
    .then(apiRes => {
      console.log('Name apiRes: ', apiRes);
    })
    .catch(err => {
      console.error('Name api call failed: ', err);
    });
});

// aiport by IATA code
// /v1/airport/iata/{airport_iata}
app.post('/airport/iata/:airport_iata', function (req, res) {
  // req.params: { "airport_iata": "ATL" }
  options.uri = baseUrl + 'iata/' + req.params.airport_iata;
  // make api call by iata code
  rp(options)
    .then(apiRes => {
      console.log('iata apiRes: ', apiRes);
    })
    .catch(err => {
      console.error('iata api call failed: ', err);
    });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
