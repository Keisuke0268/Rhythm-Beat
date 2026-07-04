const lanes = document.querySelectorAll(".lane");
const scoreText = document.getElementById("score");
const comboText = document.getElementById("combo");

let score = 0;
let combo = 0;

function spawnNote() {
    const laneIndex = Math.floor(Math.random() * 4);
    const note = document.createElement("div");

    note.className = "note";
    note.style.top = "0px";

    lanes[laneIndex].appendChild(note);

    let y = 0;

    const fall = setInterval(() => {
        y += 5;
        note.style.top = y + "px";

        if (y > 580) {
            clearInterval(fall);
            note.remove();
            combo = 0;
            comboText.textContent = combo;
        }
    }, 16);

    note.addEventListener("click", () => {
        clearInterval(fall);
        note.remove();

        score += 100;
        combo++;

        scoreText.textContent = score;
        comboText.textContent = combo;
    });
}

setInterval(spawnNote, 1000);
