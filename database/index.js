require('dotenv').config();
var mongoose = require('mongoose');

var dbUri = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds159651.mlab.com:59651/airports';
mongoose.connect(dbUri, { useNewUrlParser: true, autoIndex: false });

var db = mongoose.connection;

db.on('error', function () {
  console.log('mongoose connection error');
});

db.once('open', function () {
  console.log('db open: mongoose connected!');
  var airportSchema = mongoose.Schema({
    _id: {
      $oid: String
    },
    id: {
      type: Number,
      index: true,
      unique: true
    },
    ident: String,
    type: String,
    name: String,
    latitude_deg: Number,
    longitude_deg: Number,
    elevation_ft: Number,
    continent: String,
    iso_country: String,
    iso_region: String,
    municipality: String,
    scheduled_service: String,
    gps_code: String,
    iata_code: String,
    local_code: String,
    home_link: String,
    wikipedia_link: String,
    keywords: String
  });

  var Airport = mongoose.model('Airport', airportSchema);

  var selectName = function (search, callback) {
    // don't need an exact match w this
    //  constructs /whatever/i
    let nameLike = new RegExp(search, 'i');
    // https://mongoosejs.com/docs/api.html#model_Model.find
    Airport.find({
      // find names like the search string, case insensitive
      name: nameLike
    }, function (err, docs) {
      if (err) {
        console.error('db.selectName query error: ', err);
        callback(err, null);
      } else {
        console.log('db.selectName docs query!');
        callback(null, docs);
      }
    });
  };
  module.exports.selectName = selectName;
});

var selectAll = function (callback) {
  Airport.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;