'use strict'

//Some variables and queryselectors

const results = document.querySelector('#results');
const shoot = document.querySelector('#shoot')
const stand = document.querySelector('#stand')
let bullet = 0
let winOrLost = ""
let player = 0



//------------------------------------------------------------------------------
//getBullet zone
async function getBullet() {

  try {


    const response = await fetch('http://127.0.0.1:3000/games/russianRoulette/getbullet');
    const jsonText = await response.json();
    console.log(jsonText);
    bullet = parseInt(jsonText.bulletjson);
    player = parseInt(jsonText.playerjson)
    results.innerHTML = `Your chance to die is 1/6.`


    return {bullet, player};


   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getBullet();

//------------------------------------------------------------------------------
//sendData zone

async function sendData(shootOrStand) {
  const data = {
    body: JSON.stringify({
      shootOrStand: shootOrStand,
      bullet: bullet,
      player: player


    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    }
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/games/russianRoulette/shootorstand', data);
    const jsonText = await response.json();
    console.log('result', jsonText);

    winOrLost = jsonText.winOrLostjson;
    player = parseInt(jsonText.playerjson);

    if (winOrLost === 'stand') {
        alert("You decided to stand.")
        document.location='russianRoulette_wouldYouLikeToContinue.html'
     }
     else if (winOrLost === 'lose') {
       alert("You lost!")
       document.location='russianRoulette_wouldYouLikeToContinue.html'
     }

   results.innerHTML = `You survived! Your chance to die in the next shot is 1/${7-player}`
  }
  catch (error) {
    console.log('error', error);
  }
}
//------------------------------------------------------------------------------


//Tracks the buttons and sends on click information to backend
shoot.addEventListener('click', async () => {
  sendData(shoot.value, bullet, player);

}
)
stand.addEventListener('click', async () => {
  sendData(stand.value, bullet, player);

}
)