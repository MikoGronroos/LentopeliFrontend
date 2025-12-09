'use strict';

const send = document.querySelector('#send')
const input = document.querySelector('#input')

async function getValue() {
  const moneyToGamble = input.value
  const obj = {money: moneyToGamble};
        const data = {
            body: JSON.stringify(obj),
            method: 'POST',
            headers: {
                  'Content-type': 'application/json',
            }
        }

        try {
          const response = await fetch('http://127.0.0.1:3000/addMoney', data); 
          const json = await response.json();  
  }catch(e){

  }
}

async function startSendingValues(){
  getValue().then(()=>{
    window.location.replace('blackJack.html');
  });

}

send.addEventListener('click', startSendingValues)
