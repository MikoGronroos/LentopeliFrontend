var map = L.map('map', {
    center: [42, 11],
    zoom: 2.57,
    zoomSnap: 0,
    dragging: false,
    boxZoom: false,
    zoomControl: false,
    doubleClickZoom: false,
    zoomDelta: 0

});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
