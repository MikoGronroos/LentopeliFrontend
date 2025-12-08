const storeItems = [
    {id: 1, name: "Voucher", price: 100, type: "voucher"},
    {id: 2, name: "Postcard from Africa", price: 200, type: "postcard", continent: "Africa"},
    {id: 3, name: "Postcard from Asia", price: 200, type: "postcard", continent: "Asia"},
    {id: 4, name: "Postcard from Australia", price: 200, type: "postcard", continent: "Australia"},
    {id: 5, name: "Postcard from Europe", price: 200, type: "postcard", continent: "Europe"},
    {id: 6, name: "Postcard from North America", price: 200, type: "postcard", continent: "North America"},
    {id: 7, name: "Postcard from South America", price: 200, type: "postcard", continent: "South America"},
];

let player = {
    coins: 200,
    inventory: []
};


async function buyItem(itemId) {
    const item = storeItems.find(i => i.id === itemId);

    if (!item) {
        console.log("Item does not exist");
        return;
    }

    const body = {
        type: item.type,
        price: item.price,
        continent: item.continent || null
    };

    try {
        const res = await fetch("http://localhost:3000/buy", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        const data = await res.json();
        console.log("Server:", data.message);

        if (data.success) {
            player.coins -= item.price;
            player.inventory.push(item.name);
            console.log("Purchase successful!");
            console.log("Coins:", player.coins);
            console.log("Inventory:", player.inventory);
        }

        if (data.win) {
            console.log("YOU WIN!:)");
        }

    } catch (err) {
        console.log("Error connecting to server:", err);
    }
}

function loadShop() {
    const row1 = document.getElementById("shop-row-1");
    const row2 = document.getElementById("shop-row-2");

    storeItems.forEach((item, index) => {
        const box = document.createElement("div");
        box.className = "item-box";
        box.innerHTML = `${item.name}<br>${item.price} coins`;
        box.onclick = () => buyItem(item.id);

        if (index < 4) {
            row1.appendChild(box);
        } else {
            row2.appendChild(box);
        }
    });
}

window.onload = loadShop;
