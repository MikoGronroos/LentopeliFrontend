const textElement = document.getElementById("type-text");
const fullText = textElement.textContent;

textElement.textContent = "";
let index = 0;

function typeLetter() {
    if (index < fullText.length) {
        textElement.textContent += fullText[index];
        index++;
        setTimeout(typeLetter, 50);
    }
}

typeLetter();

document.getElementById("next-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});