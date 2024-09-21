function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    playCell(index);
}

function playCell(index){

    if(animationInProgress) return;

    if (gameActive) {
        if (gameBoard[index] === '') {
            makeMove(index);
        }
    } else {
        resetGame();
    }
}

function setGameMode(mode) {
    gameMode = mode;
    localStorage.setItem('GameMode', mode);
    if (mode === '1player') {
        onePlayerBtn.classList.add('selected');
        twoPlayersBtn.classList.remove('selected');
        playerOptions.style.display = 'block';
    } else {
        twoPlayersBtn.classList.add('selected');
        onePlayerBtn.classList.remove('selected');
        playerOptions.style.display = 'none';
    }
    resetGame();
}

function setAIDifficulty(difficulty) {
    aiDifficulty = difficulty;
    localStorage.setItem('AIDifficulty', difficulty);
    document.querySelectorAll('#playerOptions button[id$="AIBtn"]').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`${difficulty}AIBtn`).classList.add('selected');
    resetGame();
}

function setPlayerSymbol(symbol) {
    playerSymbol = symbol;
    localStorage.setItem('PlayerSymbol', symbol);
    aiSymbol = symbol === 'X' ? 'O' : 'X';
    document.getElementById('chooseX').classList.toggle('selected', symbol === 'X');
    document.getElementById('chooseO').classList.toggle('selected', symbol === 'O');
    resetGame();
}