const cells = document.querySelectorAll("[data-cell]");
const gameStatus = document.getElementById("game-status");
const restartBtn = document.getElementById("restart-btn");

let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Game state
const gameState = Array(9).fill(null);

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

// Cell click handler
function handleCellClick(cell, index) {
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWin(currentPlayer)) {
    gameStatus.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
  } else if (gameState.every((cell) => cell)) {
    gameStatus.textContent = "It's a Draw! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

// Check win function
function checkWin(player) {
  return winningCombinations.some((combination) =>
    combination.every((index) => gameState[index] === player)
  );
}

// Restart game
restartBtn.addEventListener("click", () => {
  gameState.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
  gameStatus.textContent = "Player X's Turn";
  gameActive = true;
});

