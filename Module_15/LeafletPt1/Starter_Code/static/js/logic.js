
// Load the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var map = L.map('map').setView([30, -30], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


d3.json(link).then(function (data) {
    console.log(data.features[100]);  

    L.geoJSON(data, {
      pointToLayer: function(data, latlng) {
        return L.circleMarker(latlng);
      },
      style: function ({properties,geometry:{coordinates:coord}}) {
          return {
            fillColor: 
              coord[2] < 10 ? 
              'green' : 
              coord[2] < 30 ? 
              'lime' :
              coord[2] < 50 ? 
              'yellow' :
              coord[2] < 70 ? 
              'lightorange' :
              coord[2] < 90 ? 
               'orange' : 
               'red',
            fillOpacity: .8,
            color: 'black',
            radius:properties.mag*4,
            weight: 1,
          };
      }
  }).bindPopup(function ({feature:{properties:{place, mag}}}) {
      return `<h3> ${place} <br> Maginitude: ${mag}</h3>`
  }).addTo(map);
});

const legend = L.control({position:'bottomright'});
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  

  div.innerHTML = `
    <div><div style="background:green;width:20px;height:10px"> </div> -10-10</div>
  
  `;

  return div


}

legend.addTo(map);




// Perform a GET request to the query URL/
// d3.json(link).then(function (data) {
//     // Once we get a response, send the data.features object to the createFeatures function.
//     createFeatures(data.features);
//   });

//   function createFeatures(earthquakeData) {

//     // Define a function that we want to run once for each feature in the features array.
//     // Give each feature a popup that describes the place and time of the earthquake.
//     function onEachFeature(feature, layer) {
//       layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//     }
  
//     // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//     // Run the onEachFeature function once for each piece of data in the array.
//     let earthquakes = L.geoJSON(earthquakeData, {
//       onEachFeature: onEachFeature
//     });
  
//     // Send our earthquakes layer to the createMap function/
//     createMap(earthquakes);
//   }

//   function createMap(earthquakes) {

//     // Create the base layers.
//     let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     })
  
//     let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//       attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//     });
  
//     // Create a baseMaps object.
//     let baseMaps = {
//       "Street Map": street,
//       "Topographic Map": topo
//     };

//       // Create an overlay object to hold our overlay.
//   let overlayMaps = {
//     Earthquakes: earthquakes
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   let myMap = L.map("map", {
//     center: [
//       37.09, -95.71
//     ],
//     zoom: 5,
//     layers: [street, earthquakes]
//   });

  
//     // Add our marker cluster layer to the map.
//     myMap.addLayer(markers);
  
//   ;

//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
//   // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

// }