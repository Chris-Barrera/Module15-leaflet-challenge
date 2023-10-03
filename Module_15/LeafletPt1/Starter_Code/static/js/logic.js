
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
              'orange' :
              coord[2] < 90 ? 
               'red' : 
               'darkred',
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
    <div><div style="background:lime;width:20px;height:10px"> </div> -10-30</div>
    <div><div style="background:yellow;width:20px;height:10px"> </div> -30-50</div>
    <div><div style="background:orange;width:20px;height:10px"> </div> -50-70</div>
    <div><div style="background:red;width:20px;height:10px"> </div> -70-90</div>
    <div><div style="background:darkred;width:20px;height:10px"> </div> -90+</div>




    

    
  
  `;

  return div


}

legend.addTo(map);




