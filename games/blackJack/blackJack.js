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
const cardshere = document.querySelector('#cardshere')
const dealercardshere = document.querySelector('#dealercardshere')
const dealercardtext1 = document.querySelector('#dealercardtext1')
const cardtext1 = document.querySelector('#cardtext1')
const cardtext2 = document.querySelector('#cardtext2')
let howManyCards = 2
let howManyDealerCards = 1
let playercardlist = ''
let dealerCardlist = ''


//------------------------------------------------------------------------------
//getCards zone
async function getCards() {

  try {
    const response = await fetch(`http://127.0.0.1:3000/games/blackJack/setup`);
    const jsonText = await response.json();
    playerCards = jsonText.playerCardsjson
    dealerCards = jsonText.dealerCardsjson
    cards = jsonText.cardsjson
    state = jsonText.statejson
    playerValue = jsonText.playerValuejson
    dealerValue = jsonText.dealerValuejson
    moneyToGamble = jsonText.moneyToGamblejson
    moneyWon = jsonText.moneyWonjson

    playerCardsHtml.innerHTML = `The sum of your cards is ${playerValue}.`

    cardtext1.innerHTML = playerCards[0]
    cardtext2.innerHTML =  playerCards[1]
    dealercardtext1.innerHTML = dealerCards[0]




    return {playerCards, dealerCards, cards, state, playerValue, dealerValue};


   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getCards().then(() => {
  defineCards();
});
function defineCards(){
  playercardlist = `
<article class="card">

            <p>
                ${playerCards[0]}
            </p>

        </article>
                <article class="card">

            <p>
                ${playerCards[1]}
            </p>

        </article>
`
  dealerCardlist = `
   <article class="card">

            <p>
                ${dealerCards[0]}
            </p>
                 </article>
                 `
  return {playercardlist, dealerCardlist}
}

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
      howManyDealerCards = jsonText.howManyDealerCardsjson


      for (let i=1; i<=howManyDealerCards; i++) {
        dealerCardlist += `
   <article class="card">

            <p>
                ${dealerCards[i]}
            </p>
                 </article>
                 `
      }

      dealercardshere.innerHTML = dealerCardlist
 
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

      playerCardsHtml.innerHTML = `The sum of your new hand is ${playerValue}`

      playercardlist += `<article class="card">

            <p>
            ${playerCards[howManyCards]}
            </p>

        </article>`

      howManyCards += 1

      cardshere.innerHTML = playercardlist
      setTimeout(() => winCheck(state,playerValue,dealerValue,moneyWon),1500)

    }
    catch (error) {
      console.log('error', error);
    }}
}
//------------------------------------------------------------------------------
//winCheck zone

function winCheck(state,playerValue,dealerValue,moneyWon){


  if (parseInt(state) === 3) {
    alert(`You won! You got a blackjack! You won ${moneyWon} coins!`)
    document.location='blackJack_wouldYouLikeToContinue.html'
  }
  else if (parseInt(state) === 1) {
        alert(`You won! Your hand's value was ${playerValue} and the dealer's ${dealerValue}. You won ${moneyWon} coins!`)
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
hit.addEventListener('click', async() => {
  sendData(hit.value)
  ;
}
)
