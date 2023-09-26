// Creating the map object
let myMap = L.map("map", {
    center: [57.96044, -82.30695],
    zoom: 7
  });

  // Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

console.log(link)

d3.json(link).then(function(data){
    L.geoJson(data).addTo(myMap);
}) 


