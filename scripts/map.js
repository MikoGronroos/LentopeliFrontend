var map = L.map('map', {
  center: [42, 11],
  zoom: 2.57,
  zoomSnap: 0,
  dragging: false,
  boxZoom: false,
  zoomControl: false,
  doubleClickZoom: false,
  zoomDelta: 0,
  scrollWheelZoom: false,
  touchZoom: false,
  trackResize: false,
  keyboard: false

});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 275000
}).addTo(map);


circle.on("click", (e) => { 
});

