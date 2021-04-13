var mymap = L.map('mapid').setView([46.4296, -94.6859], 6);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidXRzMDA3IiwiYSI6ImNrbmUxeXQ3bzJjd2wybm4xbGphaWh4bXYifQ.RC2c1ZAAdwHBSgGyLRCcDg'
}).addTo(mymap);

var locations = [
    {"name": "Minneapolis", "Lat": 44.9778, "Long": -93.2650 , "note": "Minneapolis is the starting point of this path."},
    {"name": "Morris", "Lat": 45.5919, "Long": -95.9189, "note": "Morris has a university or something. Check out their windmills"},
    {"name": "Wadena", "Lat": 46.4425, "Long": -95.1361},
    {"name": "New Ulm", "Lat": 44.3144, "Long": -94.4593},
    {"name": "Duluth", "Lat": 46.7867, "Long": -92.1005, "note": "When in or near Duluth, take a minute to stop by Lake Superior"},
    {"name": "Thief River Falls", "Lat": 48.1191, "Long": -96.1811, 
        "note": "Thief River Falls' hotels provide annual one-night stay for Morris coding competitors."},
    {"name": "Rochester", "Lat": 44.0121, "Long": -92.4802},
    {"name": "St.Cloud", "Lat": 45.5579, "Long": -94.1632, "note": "St.Cloud' McDonald gets tons of Morris Students before/after every break."},
    {"name": "Mankato", "Lat": 44.1636, "Long": -93.9994},
    {"name": "Brooklyn Park", "Lat": 45.0941, "Long": -93.3563, "note": "Brooklyn park is the home/work-place of a various Morris Alumni"},
]

cities = [];

locations.forEach(location => {
    cities.push(createGeoJSON(location.name, [location.Long,location.Lat], location.note));
})

function createGeoJSON(name, coords, popupContent = name) {
    return {
        "type": "Feature",
        "properties": {
            name,
            "show_on_map": true,
            popupContent
        },
        "geometry": {
            "type": "Point",
            "coordinates": coords
        }
    }
}

function circleCovert(_feature, latlng) { 
    if (latlng.lat == 44.9778 && latlng.lng == -93.2650) {
        return new L.circleMarker(latlng, {radius: 10, color: '#05D3F7'})
    }
    return new L.circleMarker(latlng, {radius: 10, color: '#FF0000'}) 
}

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

var layerProcessing = { pointToLayer: circleCovert, onEachFeature }

var cityLayer = L.geoJSON(cities, layerProcessing).addTo(mymap);

// When L.geoJSON() is called, there is a coordsToLatLng function that turns GeoJSON coordinates into LatLng type coordinates.
// cityLayer is an object with a _layers field which contains a layer object for each feature. In our case 10 layer objects.
// Each of these layer objects has _latlng field which is an object of form {lat: value, lng: value}
// Mapping these LatLng objects into an array allows us to use it with L.polyline()
var latlngArray = Object.values(cityLayer._layers).map(layer => layer._latlng);

// Add the first latlang feature to the end of the array again
latlngArray.push(latlngArray[0]);

var lineStyle={ "dashArray": [10,20], "weight": 5, "color": "#0000FF" }
var fillStyle = { "weight": 5, "color": "#FFFFFF" }

L.polyline(latlngArray, fillStyle).addTo(mymap);
L.polyline(latlngArray, lineStyle).addTo(mymap);