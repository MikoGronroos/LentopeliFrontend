hasMoney();

async function hasMoney(){

  try {
    const response = await fetch('http://127.0.0.1:3000/hasMoney'); 
    const values = await response.json();
    const value = values['HasMoney'];
    if(value === "noMoney"){ 
      window.location.replace('endScreen.html');
    }
  } catch (e) {
    console.log('error', e);
  }
  
}

