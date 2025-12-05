'use strict'
//Some variables and queryselectors
const playerCardsHtml = document.querySelector('#playerCards');
const dealerCardsHtml = document.querySelector('#dealerCards');
const stand = document.querySelector('#stand')
const hit = document.querySelector('#hit')
let playerCards = []
let dealerCards = []
let cards = []
let state = 5
let playerValue = 0
let dealerValue = 0

let moneyToGamble = 0
let moneyWon = 1 //I put moneyWon as one because it causes errors sometimes when it's 0.
                          // The code replaeces

//------------------------------------------------------------------------------
//getCards zone
async function getCards() {

  try {

    const money = localStorage.getItem("moneyToGamble")
    const response = await fetch(`http://127.0.0.1:3000/games/blackJack/setup/${money}`);
    const jsonText = await response.json();
    console.log(jsonText);
    playerCards = jsonText.playerCardsjson
    dealerCards = jsonText.dealerCardsjson
    cards = jsonText.cardsjson
    state = jsonText.statejson
    playerValue = jsonText.playerValuejson
    dealerValue = jsonText.dealerValuejson
    moneyToGamble = jsonText.moneyToGamblejson
    moneyWon = jsonText.moneyWonjson

    playerCardsHtml.innerHTML = `Your hand is ${playerCards}. The sum of your cards is ${playerValue}`
    dealerCardsHtml.innerHTML = `The dealer's hand is ${dealerCards[0]}`


    return {playerCards, dealerCards, cards, state, playerValue, dealerValue};


   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getCards();




//------------------------------------------------------------------------------
//sendData zone

async function sendData(decision) {
  const data = {
    body: JSON.stringify({
      decision: decision,
      playerCards: playerCards,
      dealerCards: dealerCards,
      cards: cards,
      state: state,
      dealerValue: dealerValue,
      playerValue: playerValue,
      moneyWon: moneyWon,
      moneyToGamble: moneyToGamble

    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    }
  }
//------------------------------------------------------------------------------
  //stand zone
  if (decision === 'stand') {
    try {
      const response = await fetch(
          'http://127.0.0.1:3000/games/blackJack/stand', data);
      const jsonText = await response.json();
      console.log('result', jsonText);

      playerCards = jsonText.playerCardsjson
      dealerCards = jsonText.dealerCardsjson
      cards = jsonText.cardsjson
      state = jsonText.statejson
      playerValue = jsonText.playerValuejson
      dealerValue = jsonText.dealerValuejson
      moneyToGamble = jsonText.moneyToGamblejson
      moneyWon = jsonText.moneyWonjson

      dealerCardsHtml.innerHTML = `The dealers hand is: ${dealerCards}`

      setTimeout(() => winCheck(state,playerValue,dealerValue,moneyWon), 3000)

    } catch (error) {
      console.log('error', error);
    }
  }
  //------------------------------------------------------------------------------
  //hit zone
  else {
    try {
      const response = await fetch('http://127.0.0.1:3000/games/blackJack/hit', data);
      const jsonText = await response.json();
      console.log('result', jsonText);

      playerCards = jsonText.playerCardsjson
      dealerCards = jsonText.dealerCardsjson
      cards = jsonText.cardsjson
      state = jsonText.statejson
      playerValue = jsonText.playerValuejson
      dealerValue = jsonText.dealerValuejson
      moneyToGamble = jsonText.moneyToGamblejson
      moneyWon = jsonText.moneyWonjson

      playerCardsHtml.innerHTML = `Your new hand is ${playerCards}. The sum of your cards is ${playerValue}`

      setTimeout(() => winCheck(state,playerValue,dealerValue),1000)

    }
    catch (error) {
      console.log('error', error);
    }}
}
//------------------------------------------------------------------------------
//winCheck zone

function winCheck(state,playerValue,dealerValue,moneyWon){


  if (parseInt(state) === 3) {
    alert(`You won! You got a blackjack! You won ${moneyWon}coins!`)
    document.location='blackJack_wouldYouLikeToContinue.html'
  }
  else if (parseInt(state) === 1) {
        alert(`You won! Your hand's value was ${playerValue} and the dealer's ${dealerValue}. You won ${moneyWon}coins!`)
        document.location='blackJack_wouldYouLikeToContinue.html'
     }
     else if (parseInt(state) === 2) {
       alert(`It's a draw! Your hands' values were ${playerValue}`)
       document.location='blackJack_wouldYouLikeToContinue.html'
     }
     else if (parseInt(state) === -1) {
       alert(`You lost! Your hand's value was ${playerValue} and the dealer's ${dealerValue}`)
       document.location='blackJack_wouldYouLikeToContinue.html'
    }

}

//------------------------------------------------------------------------------
//Tracks the buttons and sends on click information to backend
stand.addEventListener('click', async () => {
  sendData(stand.value);
}
)
hit.addEventListener('click', () => {
  sendData(hit.value);
}
)