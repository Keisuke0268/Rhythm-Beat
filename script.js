const lanes = document.querySelectorAll(".lane");
const scoreText = document.getElementById("score");
const comboText = document.getElementById("combo");
const startButton = document.getElementById("start");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

let score = 0;
let combo = 0;
let running = false;
let spawnTimer = null;

function updateHUD() {
  scoreText.textContent = score;
  comboText.textContent = combo;
}

function spawnNote() {
  if (!running) return;

  const laneIndex = Math.floor(Math.random() * 4);
  const lane = lanes[laneIndex];
  const note = document.createElement("div");
  note.className = "note";
  lane.appendChild(note);

  let y = 0;
  const fall = setInterval(() => {
    if (!running) {
      clearInterval(fall);
      note.remove();
      return;
    }

    y += 4;
    note.style.top = y + "px";

    if (y > 560) {
      clearInterval(fall);
      note.remove();
      combo = 0;
      updateHUD();
    }
  }, 16);

  note.addEventListener("click", () => {
    if (!running) return;
    clearInterval(fall);
    note.remove();
    score += 100;
    combo += 1;
    updateHUD();
  });
}

startButton.addEventListener("click", () => {
  if (running) return;

  running = true;
  score = 0;
  combo = 0;
  updateHUD();

  menu.style.display = "none";
  game.style.display = "flex";

  spawnTimer = setInterval(spawnNote, 900);
});
