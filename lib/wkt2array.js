(function () {
  var async = require('async');

  var wkt2array = {};

  wkt2array.parse = function(type, data, callback) {
    if (type === 'Polygon') {
      var output = [];

      data = data.replace('POLYGON((', '');
      data = data.replace('))', '');

      // Split inner/outer rings
      var rings = data.split('),(');

      // Parse each ring
      async.eachSeries(rings, function(ring, callback) {
        var ringObject = [],
            coordinates = ring.split(',');

        // Parse each pair of coordinates in the ring
        async.eachSeries(coordinates, function(coordinate, callback) {
          var coord = coordinate.split(' '),
              newCoord = [];

          // Convert each latitude and longitude to a float. They come in as strings.
          async.eachSeries(coord, function(latlng, callback) {

            // Add the lat or lng to the new coordinate pair
            newCoord.push(parseFloat(latlng));
            callback(null);
          }, function(err) {

            // Add the new coordinate to the ring
            ringObject.push(newCoord);
            callback(null);
          });
        }, function(err) {

          // Add the ring to the output
          output.push(ringObject);
          callback(null);
        });

      }, function(err) {

        // Pass the output array to the callback function
        callback(output);
      });
    }
  }

  module.exports = wkt2array;
})();