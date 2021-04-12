var mymap = L.map('mapid').setView([46.4296, -94.6859], 6);

// Put token without URL restriction here for local development.
// But remember to replace it with null before pushing to Github.
var localToken = null; 

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: localToken ?? 'pk.eyJ1IjoidXRzMDA3IiwiYSI6ImNrbmUxeXQ3bzJjd2wybm4xbGphaWh4bXYifQ.RC2c1ZAAdwHBSgGyLRCcDg'
}).addTo(mymap);

var Minneapolis = L.marker([44.9778, -93.2650]).addTo(mymap);
var StPaul = L.marker([44.9537, -93.0900]).addTo(mymap);
var Duluth = L.marker([46.7867, -92.1005]).addTo(mymap);
var StCloud = L.marker([45.5579, -94.1632]).addTo(mymap);
var Mankato = L.marker([44.1636, -93.9994]).addTo(mymap);
var Minnetonka = L.marker([44.9212, -93.4687]).addTo(mymap);
var CoonRapids = L.marker([45.1732, -93.3030]).addTo(mymap);
var NewUlm = L.marker([44.3144, -94.4593]).addTo(mymap);
var BrooklynPark = L.marker([45.0941, -93.3563]).addTo(mymap);
var Morris = L.marker([45.5919, -95.9189]).addTo(mymap);

Morris.bindPopup("Morris").openPopup();
