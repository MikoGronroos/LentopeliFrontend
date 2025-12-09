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

async function addCorrectGame(value){
  document.getElementById("link-container").href = value;
}

async function getLink(){

  try {
    const response = await fetch('http://127.0.0.1:3000/getCurrentContinent'); 
    const values = await response.json();
    let continent = values['status'];
    let value;
    if(continent === "AF"){
      value = "games/blackJack/blackJack_gambleScreen.html";
    }else if(continent === "AS"){
      value = "games/russianRoulette/russianRoulette_gambleScreen.html"
    }else if(continent === "EU"){
      value = "games/pokerLite/pokerLite_gambleScreen.html"
    }else if(continent === "NA"){
      value = "games/roulette/roulette_gambleScreen.html"
    }else if(continent === "SA"){
      value = "games/diceGame/diceGame_gambleScreen.html"
    }else if(continent === "AF"){
      value = "games/highCardLowCard/highCardLowCard_gambleScreen.html"
    }
    return value;
  } catch (e) {
    console.log('error', e);
  }
  
}

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
  button.innerHTML = "Fly here!";

  el.append(h3, p, button);
  return el;
}

let currentCard = null;

async function getAirports(){
  try {
    const response = await fetch('http://127.0.0.1:3000/getAirports'); 
    const values = await response.json(); 
    return values["airports"]; 
  } catch (e) {
    console.log('error', e);
  }}

let airportCircles = [];

getAirports().then(function(value) {
  showAirports(value).then(function() {
    getCards().then(async function(values) {
      createPostcards(values).then(showMoney().then(()=>{
        getLink().then((link)=>{
          addCorrectGame(link);
        });
      }));
    });
  });
});

async function showMoney(){
  try {
    const response = await fetch('http://127.0.0.1:3000/getMoney'); 
    const values = await response.json();

    
      document.getElementById("money-box").innerHTML = "$" + values["money"];

    
  } catch (e) {
    console.log('error', e);
  }  
}


setInterval(showMoney, 3000);

async function showAirports(items) {
  for (var i = airportCircles.length - 1; i >= 0; i--){

     airportCircles[i].remove();

  }
  for (var i = 0; i < items.length; i++) {
    let currentAirport;
  try {
    const response = await fetch('http://127.0.0.1:3000/getIsCurrentAirport'); 
    const values = await response.json(); 
    currentAirport = values["airport"][0];
  } catch (e) {
    console.log('error', e);
  }    
    let circleColor = 'red';

    if(items[i][1] === currentAirport[0]){
      circleColor = 'green';
    }    
    var circle = L.circle([items[i][4], items[i][5]], {
      color: circleColor,
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 275000
    }).addTo(map);
    airportCircles.push(circle);
    let latlng = circle.getLatLng();
    let point = map.latLngToContainerPoint(latlng);
    let value = i;
    circle.on('click', async function (e) {
      if(currentCard != null){
        currentCard.remove();
      }
      let playerAirport;
      try {
        const response = await fetch('http://127.0.0.1:3000/getIsCurrentAirport'); 
        const values = await response.json(); 
        playerAirport = values["airport"][0];
      } catch (e) {
        console.log('error', e);
      }    
      if(items[value][1] === playerAirport[0]){
        return;
      }
      currentCard = createCard(items[value][3], "100 coins", point, async function(){
        
        const obj = {icao: items[value][1]};
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
          let link = await getLink();
          await addCorrectGame(link);
          console.log('result', json);      
        } catch (e) {
          console.log('error', e);
        }

        getAirports().then(
          async function(value){
            showAirports(value).then(()=>{

            });
          }
        );
      });
      document.getElementById("map").appendChild(currentCard);
    });
  }
}

async function getCards(){

try {
    const response = await fetch('http://127.0.0.1:3000/getAllPostcards');
    const values = await response.json(); 
    return values["cards"]; 
  } catch (e) {
    console.log('error', e);
  }

}

async function createPostcards(values){

for(let i = 0; i < values.length; i++){
        let json;
        const obj = {postcard: values[i]};
        const data = {
            body: JSON.stringify(obj),
            method: 'POST',
            headers: {
                  'Content-type': 'application/json',
            }
        }

        try {
          const response = await fetch('http://127.0.0.1:3000/hasPostcard', data); 
          
          json = await response.json();   
        } catch (e) {
          console.log('error', e);
        }
  
      const card = document.createElement("div");
    card.classList.add("postcard-box");

      const image =document.createElement("img");
    path = values[i][3];
    image.src = path;
      if(json['has'] === 'false'){
        image.classList.add('blackAndWhitePicture');
    }

      card.append(image);

      document.getElementById("postcard-grid").appendChild(card);
  }  
}
