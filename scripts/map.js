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

var circle = L.circle([14, 51], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 275000
}).addTo(map);



let latlng = circle.getLatLng();
let point = map.latLngToContainerPoint(latlng);

const el = document.createElement("div");
el.id = "my-html";
el.style.position = "absolute";
el.style.left = point.x + "px";
el.style.top = point.y + "px";
el.style.zIndex = 9999;
document.getElementById("map").appendChild(el);
