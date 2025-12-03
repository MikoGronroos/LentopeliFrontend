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

async function getAirports(){
  try {
    const response = await fetch('http://127.0.0.1:3000/getNewAirports');  
    const airports = await response.json();         
    return airports;
  } catch (error) {
    console.log(error.message);
  }
}
let decidedAirports;
getAirports().then(
  function(value) {
    decidedAirports = value;
    showAirports(value);
  }
);

function createCard(title, text, point, callback) {
  const el = document.createElement("div");
  el.id = "cityTag";
  el.style.position = "absolute";

  el.style.left = point.x + "px";
  el.style.top = point.y + "px";
  el.style.transform = "translate(-50%, -130%)";
  el.style.zIndex = 9999;
  const h3 = document.createElement("h3");
  h3.textContent = title;
  h3.id = "cityName";

  const p = document.createElement("p");
  p.textContent = text;
  p.id = "cityPrice";

  const button = document.createElement("button");
  button.id = "cityTravelButton";
  button.onclick = async function(){
    callback(); 
  };

  el.append(h3, p, button);
  return el;
}

let currentCard = null;

function showAirports(items) {
  for (var i = 0; i < items.length; i++) {
    var circle = L.circle([items[i][1], items[i][2]], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 275000
    }).addTo(map);

    let latlng = circle.getLatLng();
    let point = map.latLngToContainerPoint(latlng);
    let value = i;
    circle.on('click', function (e) {
      if(currentCard != null){
        currentCard.remove();
      }     
      currentCard = createCard(items[value][0], "100 coins", point, async function(){
        
        const obj = {airportIndex: value};
        const data = {
            body: JSON.stringify(obj),
            method: 'POST',
            headers: {
                  'Content-type': 'application/json',
            }
        }

        try {
          const response = await fetch('http://127.0.0.1:3000/move', data); 
          const json = await response.json();          
          console.log('result', json);      
        } catch (e) {
          console.log('error', e);
        }

      });
      document.getElementById("map").appendChild(currentCard);
    });
  }
}


