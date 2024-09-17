function createBoard() {
    board.innerHTML = ''; 
    board.style.gridTemplateColumns = `repeat(${boardSize}, ${300 / boardSize}px)`;

    document.documentElement.style.setProperty('--board-size', boardSize);

    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    updateBoardStyles(boardSize)

    gameBoard = Array(boardSize * boardSize).fill('');
}

function setBoardSize(size) {
    boardSize = size;
    winConditions = allWinConditions[size.toString()];
    document.querySelectorAll('.board-size-buttons button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`size${size}Btn`).classList.add('selected');
    createBoard();
    resetGame();
}

function updateBoardStyles(size) {
    const styleElement = document.getElementById('dynamic-board-styles') || document.createElement('style');
    styleElement.id = 'dynamic-board-styles';
    
    const styles = `
        .cell:nth-child(n+${size+1}) {
            margin-top: -2px;
        }
    `;
    
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

function makeMove(index, isAIMove = false) {
    if (gameBoard[index] !== '' || !gameActive) return;
    if (gameMode === '1player' && !isAIMove && currentPlayer !== playerSymbol) return;

    gameBoard[index] = currentPlayer;
    const cell = document.querySelectorAll('.cell')[index];
    cell.innerHTML = '';
    cell.appendChild(createSVGSymbol(currentPlayer));

    const winningLine = checkWin();
    if (winningLine) {
        gameActive = false;
        setTimeout(() => {
            winningLine.forEach(index => {
                document.querySelectorAll('.cell')[index].classList.add('winning-cell');
            });
            message.textContent = translate('playerWin', currentPlayer);
            createFirework(currentPlayer); // Ajoutez cette ligne
        }, 200);
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = translate('draw');
        gameActive = false;
        createDrawAnimation(); // Ajoutez cette ligne
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = translate('playerTurn', currentPlayer);

        if (gameMode === '1player' && currentPlayer === aiSymbol && gameActive) {
            setTimeout(() => {
                const aiMove = getBestMove();
                makeMove(aiMove, true);
            }, 200);
        }
    }
}

function checkWin() {
    
    for (let condition of winConditions) {
        if (condition.every(index => gameBoard[index] === currentPlayer)) {
            return condition;
        }
    }

    return null;
}

function resetGame() {
    gameBoard = Array(boardSize * boardSize).fill('');
    gameActive = true;
    currentPlayer = 'O';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winning-cell');
    });

    document.getElementById('chooseX').classList.toggle('selected', playerSymbol === 'X');
    document.getElementById('chooseO').classList.toggle('selected', playerSymbol === 'O');

    updateInterface();

    if (gameMode === '1player' && playerSymbol === 'X') {
        setTimeout(() => {
            const aiMove = getBestMove();
            makeMove(aiMove, true);
        }, 500);
    }
}