'use strict'

//Some variables and queryselectors

const results = document.querySelector('#results');
const diceInput = document.querySelector('#dice_input')
const sendButton = document.querySelector('#sendButton')
let guessTracker = 0
let revealedDice = 0
let diceSum = 0
let highLow = ""




//------------------------------------------------------------------------------
//getNumbers zone
async function getNumbers() {

  try {


    const response = await fetch('http://127.0.0.1:3000/games/dicegame/getnumbers')
    const jsonText = await response.json();
    console.log(jsonText);
    diceSum = jsonText.diceSumjson
    revealedDice = jsonText.revealedDicejson
    results.innerHTML = `Revealed dice is ${revealedDice}.`


    return {revealedDice, diceSum}


   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getNumbers();

//------------------------------------------------------------------------------
//sendData zone

async function sendData(guess,diceSum,guessTracker,revealedDice) {
  const data = {
    body: JSON.stringify({
      guess: guess,
      diceSum: diceSum,
      guessTracker: guessTracker,
      revealedDice: revealedDice

    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    }
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/games/dicegame/highlow', data);
    const jsonText = await response.json();
    console.log('result', jsonText);

    highLow = jsonText.highLowjson;
    guessTracker = parseInt(jsonText.guessTrackerjson);

    if (highLow === 'win') {
        alert("You won!")
        document.location='diceGame_wouldYouLikeToContinue.html'
     }
     else if (highLow === 'lose') {
       alert("You lost!")
       document.location='diceGame_wouldYouLikeToContinue.html'
     }

   results.innerHTML = `Your guess was too ${highLow}! You have ${3-guessTracker} guess(es) left`
  }
  catch (error) {
    console.log('error', error);
  }
}
//------------------------------------------------------------------------------


//Tracks the send button and sends on click information to backend
sendButton.addEventListener('click', async () => {
  guessTracker +=1
  sendData(diceInput.value, diceSum,guessTracker,revealedDice);

}
)