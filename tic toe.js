const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const gameInfo = document.getElementById('gameInfo');
const restartBtn = document.getElementById('restartBtn');
const humanVsHumanBtn = document.getElementById('humanVsHuman');
const humanVsAIBtn = document.getElementById('humanVsAI');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let humanVsAI = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', () => handleCellClick(cell));
});
// Restart game
restartBtn.addEventListener('click', restartGame);


humanVsHumanBtn.addEventListener('click', () => setGameMode(false));
humanVsAIBtn.addEventListener('click', () => setGameMode(true));

function setGameMode(isAI) {
    humanVsAI = isAI;
    restartGame();
}

function handleCellClick(cell) {
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !isGameActive) {
        return;
    }
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
        gameInfo.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (isDraw()) {
        gameInfo.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        switchPlayer();
        if (humanVsAI && currentPlayer === 'O') {
            makeAIMove();
        }
    }
}
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameInfo.textContent = `Player ${currentPlayer}'s turn`;
}
function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}
function isDraw() {
    return gameState.every(cell => cell !== '');
}
function makeAIMove() {
    let emptyIndices = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    gameState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;

    if (checkWin()) {
        gameInfo.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
    } else if (isDraw()) {
        gameInfo.textContent = `It's a draw!`;
        isGameActive = false;
    } else {
        switchPlayer();
    }
}
function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    gameInfo.textContent = `Player X's turn`;
    cells.forEach(cell => cell.textContent = '');
}
