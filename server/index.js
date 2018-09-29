var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// app.use(express.static(__dirname + '/../react-client/dist'));
app.get('/', function(req, res) {
  res.send('GET request to home page');
});

// url:  https://api.aviationdata.systems

// airport(s) by name: /v1/airport/name/{airport_name}
app.post('/airport/name/:airport_name', function(req, res) {
  // req.params: { "airport_name": "Hartsfield" }
  let airportName = 'https://api.aviationdata.systems/v1/airport/name/' + req.params.airport_name;
  // make the api call by name
  request.get(airportName, {
    'auth': {
      'user': '91785a66-3eef-4600-ad69-07d32352bd27',
      'pass': 'd758e5fd-6f21-499e-b121-79736978bc83',
      'sendImmediately': false
    }
  });
});

// aiport by IATA code
// /v1/airport/iata/{airport_iata}
app.post('/airport/iata/:airport_iata', function(req, res) {
  // req.params: { "airport_iata": "ATL" }
  let airportIata = 'https://api.aviationdata.systems/v1/airport/iata/' + req.params.airport_iata;
  // make api call by iata code
  request.get(airportIata, {
    'auth': {
      'user': '91785a66-3eef-4600-ad69-07d32352bd27',
      'pass': 'd758e5fd-6f21-499e-b121-79736978bc83',
      'sendImmediately': false
    }
  });
});

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

