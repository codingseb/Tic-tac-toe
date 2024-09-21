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
    updateSelectedCell();
}

function setBoardSize(size) {

    if(size === 6){
        aiMaxDepth = 4;
    }
    else{
        aiMaxDepth = 5;
    }

    boardSize = size;
    localStorage.setItem('BoardSize', size);
    winLength = size;
    winConditions = allWinConditions[size.toString()][winLength.toString()];
    document.querySelectorAll('.board-size-buttons button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`size${size}Btn`).classList.add('selected');

    document.querySelectorAll('.win-condition-buttons button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`win${size}Btn`).classList.add('selected');

    document.getElementById('win4Btn').style.display = size >= 4 ? 'inline-block' : 'none';
    document.getElementById('win5Btn').style.display = size >= 5 ? 'inline-block' : 'none';
    document.getElementById('win6Btn').style.display = size >= 6 ? 'inline-block' : 'none';

    createBoard();
    resetGame();
}

function setWinLength(length) {
    winLength = length;
    winConditions = allWinConditions[boardSize.toString()][winLength.toString()];
    document.querySelectorAll('.win-condition-buttons button').forEach(btn => btn.classList.remove('selected'));
    document.getElementById(`win${length}Btn`).classList.add('selected');
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

    moveHistory.push({
        index: index,
        player: currentPlayer
    });

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
            createFirework(currentPlayer); 
        }, 50);
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
            }, 50);
        }
    }

    updateUndoButton();
}

function undoMove() {
    if (moveHistory.length === 0) return;

    document.querySelectorAll('.winning-cell').forEach(cell => {
        cell.classList.remove('winning-cell');
    });

    if (gameMode === '1player') {
        let lastMove = moveHistory.pop();
        gameBoard[lastMove.index] = '';
        const aiCell = document.querySelectorAll('.cell')[lastMove.index];
        aiCell.innerHTML = '';

        if (moveHistory.length > 0) {
            if(gameActive || lastMove.player !== playerSymbol)
            lastMove = moveHistory.pop();
            gameBoard[lastMove.index] = '';
            const playerCell = document.querySelectorAll('.cell')[lastMove.index];
            playerCell.innerHTML = '';
        }
        else if (playerSymbol === 'X' && gameActive) {
            setTimeout(() => {
                const aiMove = getBestMove();
                makeMove(aiMove, true);
            }, 50);
        }

        currentPlayer = lastMove.player;   
        
    } else {
        // Mode 2 joueurs : annuler simplement le dernier coup
        const lastMove = moveHistory.pop();
        gameBoard[lastMove.index] = '';
        const cell = document.querySelectorAll('.cell')[lastMove.index];
        cell.innerHTML = '';
        currentPlayer = lastMove.player;
    }

    gameActive = true;
    updateInterface();
    updateUndoButton();
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
    moveHistory = [];
    updateUndoButton();

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
        }, 50);
    }
}

function updateUndoButton() {
    undoBtn.disabled = moveHistory.length === 0;
}