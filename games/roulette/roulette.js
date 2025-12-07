'use strict'

//Some variables and queryselectors

const results = document.querySelector('#results');
const input = document.querySelector('#input')
const sendButton = document.querySelector('#send')
let nmb = 0
let moneyToGamble = 0
let moneyWon = 1 //I put moneyWon as one because it causes errors sometimes when it's 0. The code replaces it later



//------------------------------------------------------------------------------
//getNumbers zone
async function getNumbers() {

  try {

    const money = localStorage.getItem("moneyToGamble")
    const response = await fetch(`http://127.0.0.1:3000/games/roulette/getnumbers/${money}`)
    const jsonText = await response.json();
    console.log(jsonText);
    nmb = jsonText.nmbjson
    moneyToGamble = jsonText.moneyToGamblejson
    moneyWon = jsonText.moneyWonjson
    results.innerHTML = `Make your guess! (1-12). The number you guess also counts for the number group! (odd/even)`

    return nmb

   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getNumbers();

//------------------------------------------------------------------------------
//sendData zone

async function sendData(guess) {
  const data = {
    body: JSON.stringify({
      guess: guess,
      nmb: nmb,
      moneyWon: moneyWon,
      moneyToGamble: moneyToGamble

    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    }
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/games/roulette/numbercheck', data);
    const jsonText = await response.json();
    console.log('result', jsonText);

    const winOrLose = jsonText.winOrLosejson
    moneyWon = jsonText.moneyWonjson

    if (winOrLose === 'exact') {
        alert(`Amazing! You got it exactly correct! You won ${moneyWon} coins!`)
        document.location='roulette_wouldYouLikeToContinue.html'
     }
     else if (winOrLose === 'odd') {
       alert(`You won! You guessed "odd" correctly! The correct number was ${nmb}. You won ${moneyWon} coins!`)
       document.location='roulette_wouldYouLikeToContinue.html'
     }
     else if (winOrLose === 'even') {
       alert(`You won! You guessed "even" correctly! The correct number was ${nmb}. You won ${moneyWon} coins!`)
       document.location='roulette_wouldYouLikeToContinue.html'
     }
     else {
       alert(`You lost! The correct number was ${nmb}`)
       document.location='roulette_wouldYouLikeToContinue.html'
    }

  }
  catch (error) {
    console.log('error', error);
  }
}
//------------------------------------------------------------------------------


//Tracks the send button and sends on click information to backend
sendButton.addEventListener('click', async () => {
  sendData(parseInt(input.value));

}
)