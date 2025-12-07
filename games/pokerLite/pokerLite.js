'use strict'

//Some variables and queryselectors
const results = document.querySelector('#results');
const continuebutton = document.querySelector('#continue')
const one = document.querySelector('#one')
const two = document.querySelector('#two')
const three = document.querySelector('#three')
const four = document.querySelector('#four')
const five = document.querySelector('#five')
let pList = []
let reRollCheck = [0,0,0,0,0]

const cardtext1 = document.querySelector('#cardtext1')
const cardtext2 = document.querySelector('#cardtext2')
const cardtext3 = document.querySelector('#cardtext3')
const cardtext4 = document.querySelector('#cardtext4')
const cardtext5 = document.querySelector('#cardtext5')

let moneyToGamble = 0
let moneyWon = 1 //I put moneyWon as one because it causes errors sometimes when it's 0.


//------------------------------------------------------------------------------
//getCards zone
async function getCards() {

  try {

    const money = localStorage.getItem("moneyToGamble")
    const response = await fetch(`http://127.0.0.1:3000/games/pokerLite/getcards/${money}`);
    const jsonText = await response.json();
    console.log(jsonText);
    pList = jsonText.pListjson
    moneyToGamble = jsonText.moneyToGamblejson
    moneyWon = jsonText.moneyWonjson
    results.innerHTML = `Choose which cards to swap, and then press "continue".`

    cardtext1.innerHTML = pList[0]
    cardtext2.innerHTML = pList[1]
    cardtext3.innerHTML = pList[2]
    cardtext4.innerHTML = pList[3]
    cardtext5.innerHTML = pList[4]

    return {pList};


   }
   catch (error) {
    console.log(error.message)
   }
}

//Gets the game running when the page is loaded
getCards();



//------------------------------------------------------------------------------
//sendData zone

async function sendData() {
  const data = {
    body: JSON.stringify({
      pList: pList,
      reRollCheck: reRollCheck,
      moneyWon: moneyWon,
      moneyToGamble: moneyToGamble
    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    }
  }

  try {
    const response = await fetch('http://127.0.0.1:3000/games/pokerLite/checksum', data);
    const jsonText = await response.json();
    console.log('result', jsonText);

    pList = jsonText.pListjson
    moneyToGamble = jsonText.moneyToGamblejson
    moneyWon = jsonText.moneyWonjson
    const sumPList = jsonText.sumPListjson
    const sumCList = jsonText.sumCListjson
    const winOrLose = jsonText.winOrLosejson

    cardtext1.innerHTML = pList[0]
    cardtext2.innerHTML = pList[1]
    cardtext3.innerHTML = pList[2]
    cardtext4.innerHTML = pList[3]
    cardtext5.innerHTML = pList[4]

    setTimeout(() => winCheck(sumPList,sumCList,winOrLose,moneyWon),3000)

  }
  catch (error) {
    console.log('error', error);
  }
}
//------------------------------------------------------------------------------
//reRollChecker

function reRollChecker(index) {
  reRollCheck[index] = 1
  return reRollCheck
}

//------------------------------------------------------------------------------
//winCheck zone

function winCheck(sumPList,sumCList,winOrLose,moneyWon){

  if (winOrLose === 'win') {
        alert(`You won! Your score was ${sumPList} and the dealer's ${sumCList}. You won ${moneyWon} coins!`)
        document.location='pokerLite_wouldYouLikeToContinue.html'
     }
     else if (winOrLose === 'draw') {
       alert(`It's a draw! Your score was ${sumPList} and the dealer's ${sumCList}`)
       document.location='pokerLite_wouldYouLikeToContinue.html'
     }
     else {
       alert(`You lost! Your score was ${sumPList} and the dealer's ${sumCList}`)
       document.location='pokerLite_wouldYouLikeToContinue.html'
    }

}

//------------------------------------------------------------------------------
//Tracks the buttons and sends on click information to backend
continuebutton.addEventListener('click', async () => {
  sendData();
}
)
one.addEventListener('click', () => {
  reRollChecker(parseInt(one.value));
}
)

two.addEventListener('click', () => {
  reRollChecker(parseInt(two.value));
}
)

three.addEventListener('click', () => {
  reRollChecker(parseInt(three.value));
}
)

four.addEventListener('click', () => {
  reRollChecker(parseInt(four.value));
}
)

five.addEventListener('click', () => {
  reRollChecker(parseInt(five.value));
}
)