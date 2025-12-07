'use strict';

const send = document.querySelector('#send')
const input = document.querySelector('#input')

function getValue() {
  const moneyToGamble = input.value
  localStorage.setItem("moneyToGamble", moneyToGamble)
}

send.addEventListener('click', getValue)