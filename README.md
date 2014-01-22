# WKT2Array

A node module for helping to convert between WKT and other formats, such as GeoJSON. Most conversion tools require geographic data to be an array of coordinates, but MySQL and other databases do not natively export to that format. This module helps bridge the gap.

Currently only supports polygons. 

## Usage

### .parse(type, data, callback)
````
wkt2array.parse("Polygon", "POLYGON((-100.010825374597 77.1031454933236,-100.397722432806 77.1480074214425,-100.010825374597 77.1031454933236))", function(output) {
    console.log(output);
});
    
````
Will return:

````
[ [ [ -100.010825374597, 77.1031454933236 ],
    [ -100.397722432806, 77.1480074214425 ],
    [ -100.010825374597, 77.1031454933236 ] ] ]
````

## License
CC0