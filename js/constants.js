let currentPlayer = 'O';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = '1player';
let aiDifficulty = 'easy';
let playerSymbol = 'O';
let aiSymbol = 'X';

const board = document.getElementById('board');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const onePlayerBtn = document.getElementById('onePlayerBtn');
const twoPlayersBtn = document.getElementById('twoPlayersBtn');
const playerOptions = document.getElementById('playerOptions');
const keyboardIcon = document.getElementById('keyboardIcon');
const shortcutPopup = document.getElementById('shortcutPopup');
const closePopup = document.getElementById('closePopup');