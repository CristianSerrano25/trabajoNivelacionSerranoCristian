from flask import Flask, render_template  # type: ignore

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

# Crear estructura de archivos
import os

os.makedirs("templates", exist_ok=True)
os.makedirs("static", exist_ok=True)

# index.html
template_html = '''
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interacción con Popup</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
    <input type="text" id="textBox" placeholder="Escribe algo y presiona Enter">
    <div id="popup" class="hidden">
        <p id="popupText"></p>
        <button id="popupButton">Cambiar Colores</button>
    </div>
    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>
</html>
'''

with open("templates/index.html", "w", encoding="utf-8") as f:
    f.write(template_html)

# style.css
style_css = '''
body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
}

input {
    padding: 15px;
    font-size: 20px;
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
}
'''

with open("static/style.css", "w", encoding="utf-8") as f:
    f.write(style_css)

# script.js
script_js = '''
document.addEventListener("DOMContentLoaded", () => {
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
});
'''

with open("static/script.js", "w", encoding="utf-8") as f:
    f.write(script_js)
