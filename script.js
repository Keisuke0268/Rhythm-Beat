const lanes = document.querySelectorAll(".lane");
const scoreText = document.getElementById("score");
const comboText = document.getElementById("combo");
const judgeText = document.getElementById("judge");
const startButton = document.getElementById("start");

let score = 0;
let combo = 0;
let gameRunning = false;
let noteTimer = null;

function updateHUD() {
    scoreText.textContent = score;
    comboText.textContent = combo;
}

function spawnNote() {
    if (!gameRunning) return;

    const laneIndex = Math.floor(Math.random() * lanes.length);
    const lane = lanes[laneIndex];

    const note = document.createElement("div");
    note.className = "note";
    note.style.top = "0px";

    lane.appendChild(note);

    let y = 0;

    const fall = setInterval(() => {
        y += 4;
        note.style.top = y + "px";

        if (y > 520) {
            clearInterval(fall);

            if (note.parentNode) {
                note.remove();
                combo = 0;
                judgeText.textContent = "MISS";
                updateHUD();
            }
        }
    }, 16);

    note.addEventListener("click", () => {

        clearInterval(fall);

        if (y >= 410 && y <= 450) {
            judgeText.textContent = "PERFECT";
            score += 1000;
        } else if (y >= 370 && y < 410) {
            judgeText.textContent = "GREAT";
            score += 700;
        } else {
            judgeText.textContent = "GOOD";
            score += 400;
        }

        combo++;
        updateHUD();

        note.remove();
    });
}

startButton.addEventListener("click", () => {

    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    combo = 0;
    updateHUD();

    noteTimer = setInterval(spawnNote, 800);
});
