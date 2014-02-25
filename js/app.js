var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
    .setView([38, -102.0], 2);


var url='http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';


$.getJSON(url, {
    format: "json"
}).done(function(data) {
    console.log(data);
});


// As with any other AJAX request, this technique is subject to the Same Origin Policy:
// http://en.wikipedia.org/wiki/Same_origin_policy
var featureLayer = L.mapbox.featureLayer()
    .loadURL('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
// Once this layer loads, we set a timer to load it again in a few seconds
.on('ready', run)
    .addTo(map);

function run() {
    featureLayer.eachLayer(function(l) {
        map.panTo(l.getLatLng());
    });
    window.setTimeout(function() {
        featureLayer.loadURL('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
    }, 2000);
}