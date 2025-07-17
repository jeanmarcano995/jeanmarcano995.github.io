const board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;

const gameBoard = document.getElementById('game-board');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const popupOverlay = document.getElementById('popup-overlay');
const popupTitle = document.getElementById('popup-title');
const popupMessage = document.getElementById('popup-message');
const popupClose = document.getElementById('popup-close');

function renderBoard() {
  gameBoard.innerHTML = '';
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => handleCellClick(idx));
    gameBoard.appendChild(cellDiv);
  });
}

function handleCellClick(idx) {
  if (!gameActive || board[idx]) return;
  board[idx] = currentPlayer;
  renderBoard();
  if (checkWinner(currentPlayer)) {
    showPopup('¡Tenemos un ganador!', `El jugador <strong>${currentPlayer}</strong> ha ganado 🎉`);
    statusDiv.textContent = `¡${currentPlayer} gana! 🎉`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    showPopup('¡Empate!', '¡No hay ganador esta vez!');
    statusDiv.textContent = '¡Empate!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `Turno de ${currentPlayer}`;
  }
}

function checkWinner(player) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // filas
    [0,3,6], [1,4,7], [2,5,8], // columnas
    [0,4,8], [2,4,6]           // diagonales
  ];
  return winCombos.some(combo =>
    combo.every(i => board[i] === player)
  );
}

function restartGame() {
  board.fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = `Turno de ${currentPlayer}`;
  renderBoard();
  closePopup();
}

function showPopup(title, message) {
  popupTitle.textContent = title;
  popupMessage.innerHTML = message;
  popupOverlay.style.display = 'flex';
}

function closePopup() {
  popupOverlay.style.display = 'none';
}

restartBtn.addEventListener('click', restartGame);
popupClose.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', function(e) {
  if (e.target === popupOverlay) closePopup();
});

window.addEventListener('DOMContentLoaded', () => {
  restartGame();
});
