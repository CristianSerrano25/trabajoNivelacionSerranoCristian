const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Archivos públicos
const fs = require('fs');
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// index.html
fs.writeFileSync(
    path.join(publicDir, 'index.html'),
    `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interacción con Popup</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <input type="text" id="textBox" placeholder="Escribir texto y presionar Enter">
    <div id="popup" class="hidden">
        <p id="popupText"></p>
        <button id="popupButton">Cambiar Color</button>
    </div>
    <script src="script.js"></script>
</body>
</html>`
);

// style.css
fs.writeFileSync(
    path.join(publicDir, 'style.css'),
    `body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
}

input {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    width: 300px;
}

button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

#popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 2px solid black;
    text-align: center;
    display: none;
}

.hidden {
    display: none;
}`
);

// script.js
fs.writeFileSync(
    path.join(publicDir, 'script.js'),
    `document.addEventListener("DOMContentLoaded", () => {
    const textBox = document.getElementById("textBox");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");
    const popupButton = document.getElementById("popupButton");
    let colorIndex = 0;
    const colors = [
        { bg: "white", text: "black" },
        { bg: "black", text: "white" },
        { bg: "lightblue", text: "red" }
    ];

    textBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            popupText.textContent = textBox.value;
            popup.style.display = "block";
        }
    });

    popupButton.addEventListener("click", () => {
        colorIndex = (colorIndex + 1) % colors.length;
        popup.style.backgroundColor = colors[colorIndex].bg;
        popupText.style.color = colors[colorIndex].text;
    });
});`
);
