const storeItems = [
    {id: 1, name: "Postcard from Africa", price: 200, type: "postcard", continent: "AF"},
    {id: 2, name: "Postcard from Asia", price: 200, type: "postcard", continent: "AS"},
    {id: 6, name: "Postcard from Australia", price: 200, type: "postcard", continent: "OC"},
    {id: 3, name: "Postcard from Europe", price: 200, type: "postcard", continent: "EU"},
    {id: 4, name: "Postcard from North America", price: 200, type: "postcard", continent: "NA"},
    {id: 5, name: "Postcard from South America", price: 200, type: "postcard", continent: "SA"},
];

async function buyItem(itemId) {
    const item = storeItems.find(i => i.id === itemId);

    if (!item) {
        console.log("Item does not exist");
        return;
    }

    const body = {
        type: item.type,
        price: item.price,
        continent: item.continent
    };

    try {
        const res = await fetch("http://localhost:3000/buy", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });

        const data = await res.json();
        console.log("Server:", data.message);
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

        const formattedName = item.name.replace("Postcard from ", "Postcard from<br>");

        box.innerHTML = `${formattedName}<br>${item.price} coins`;
        box.onclick = () => buyItem(item.id);

        if (index < 4) {
            row1.appendChild(box);
        } else {
            row2.appendChild(box);
        }
    });
}

window.onload = loadShop;
