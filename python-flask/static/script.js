
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
