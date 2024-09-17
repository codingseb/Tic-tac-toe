const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const onePlayerBtn = document.getElementById('onePlayerBtn');
const twoPlayersBtn = document.getElementById('twoPlayersBtn');
const playerOptions = document.getElementById('playerOptions');
const keyboardIcon = document.getElementById('keyboardIcon');
const shortcutPopup = document.getElementById('shortcutPopup');
const closePopup = document.getElementById('closePopup');
const allWinConditions = (() => {
    const conditions = {};

    for (let size = 3; size <= 6; size++) {
        conditions[size.toString()] = []

        // Rows and columns
        for (let i = 0; i < size; i++) {
            const row = [];
            const col = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
                col.push(j * size + i);
            }
            conditions[size.toString()].push(row, col);
        }

        // Diagonals
        const diag1 = [];
        const diag2 = [];
        for (let i = 0; i < size; i++) {
            diag1.push(i * size + i);
            diag2.push(i * size + (size - 1 - i));
        }
        conditions[size.toString()].push(diag1, diag2);
    }

    return conditions;
})();

let aiMaxDepth = 4;
let boardSize = 3;
let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = '1player';
let aiDifficulty = 'easy';
let playerSymbol = 'O';
let aiSymbol = 'X';
let winConditions = allWinConditions["3"];
