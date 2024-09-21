const board = document.getElementById('board');
const message = document.getElementById('message');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const onePlayerBtn = document.getElementById('onePlayerBtn');
const twoPlayersBtn = document.getElementById('twoPlayersBtn');
const playerOptions = document.getElementById('playerOptions');
const keyboardIcon = document.getElementById('keyboardIcon');
const shortcutPopup = document.getElementById('shortcutPopup');
const closePopup = document.getElementById('closePopup');
const toWinLabel = document.getElementById('toWin');
const allWinConditions = (() => {
    const conditions = {};

    for (let size = 3; size <= 6; size++) {
        conditions[size.toString()] = {};

        for (let winLength = 3; winLength <= size; winLength++) {
            conditions[size.toString()][winLength.toString()] = [];

            // Rows and columns
            for (let i = 0; i < size; i++) {
                for (let j = 0; j <= size - winLength; j++) {
                    const row = [];
                    const col = [];
                    for (let k = 0; k < winLength; k++) {
                        row.push(i * size + (j + k));
                        col.push((j + k) * size + i);
                    }
                    conditions[size.toString()][winLength.toString()].push(row, col);
                }
            }

            // Diagonals
            for (let i = 0; i <= size - winLength; i++) {
                for (let j = 0; j <= size - winLength; j++) {
                    const diag1 = [];
                    const diag2 = [];
                    for (let k = 0; k < winLength; k++) {
                        diag1.push((i + k) * size + (j + k));
                        diag2.push((i + k) * size + (j + winLength - 1 - k));
                    }
                    conditions[size.toString()][winLength.toString()].push(diag1, diag2);
                }
            }
        }
    }

    return conditions;
})();

let aiMaxDepth = 5;
let boardSize = 3;
let winLength = 3;
let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = '1player';
let aiDifficulty = 'easy';
let playerSymbol = 'O';
let aiSymbol = 'X';
let winConditions = allWinConditions["3"];
let keyboardPlayEnabled = false;
let selectedCellIndex = 0;
let animationInProgress = false;
let moveHistory = [];
