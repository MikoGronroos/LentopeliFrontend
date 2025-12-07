'use strict'

//Some variables and queryselectors
const results = document.querySelector('#results');
const cardtext = document.querySelector('#cardtext')
const higher = document.querySelector('#higher')
const lower = document.querySelector('#lower')
const same = document.querySelector('#same')
let dealerCard = []
let playerCard = []
let moneyToGamble = 0
let moneyWon = 1 //I put moneyWon as one because it causes errors sometimes when it's 0. The code replaces it later


//------------------------------------------------------------------------------
//getCards zone
async function getCards() {

  try {

    const money = localStorage.getItem("moneyToGamble")
    const response = await fetch(`http://127.0.0.1:3000/games/highCardLowCard/getcards/${money}`);
    const jsonText = await response.json();
    console.log(jsonText);
    dealerCard = jsonText.dealerCardjson
    playerCard = jsonText.playerCardjson
    moneyToGamble = jsonText.moneyToGamblejson
    moneyWon = jsonText.moneyWonjson
    cardtext.innerHTML = `${playerCard}`



    return {dealerCard, playerCard};


   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getCards();

//------------------------------------------------------------------------------
//sendData zone

async function sendData(guess) {
  const data = {
    body: JSON.stringify({
      guess: guess,
      playerCard: playerCard,
      dealerCard: dealerCard,
      moneyWon: moneyWon,
      moneyToGamble: moneyToGamble


    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    }
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/games/highCardLowCard/highlow', data);
    const jsonText = await response.json();
    console.log('result', jsonText);

    const highLow = jsonText.highLowjson;
    moneyWon = jsonText.moneyWonjson

    if (highLow === 'win') {
        alert(`Correct! You won ${moneyWon} coins!`)
        document.location='highCardLowCard_wouldYouLikeToContinue.html'
     }
     else if (highLow === 'same') {
       alert(`Amazing! You got it exactly correct! You won ${moneyWon} coins!`)
       document.location='highCardLowCard_wouldYouLikeToContinue.html'
     }
     else {
       alert("You lost!")
       document.location='highCardLowCard_wouldYouLikeToContinue.html'
    }

  }
  catch (error) {
    console.log('error', error);
  }
}
//------------------------------------------------------------------------------


//Tracks the buttons and sends on click information to backend
higher.addEventListener('click', async () => {
  sendData(higher.value);

}
)
same.addEventListener('click', async () => {
  sendData(same.value);

}
)
lower.addEventListener('click', async () => {
  sendData(lower.value);

}
)