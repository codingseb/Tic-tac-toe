function getBestMove() {
    if (aiDifficulty === 'easy') {
        return getRandomMove();
    } else if (aiDifficulty === 'medium') {
        return Math.random() < 0.5 ? getBestMoveHard() : getRandomMove();
    } else { // Hard difficulty
        // Check if it's the first move (empty board)
        if (gameBoard.every(cell => cell === '')) {
            return getRandomMove();
        } else {
            return getBestMoveHard();
        }
    }
}

function getRandomMove() {
    const availableMoves = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getBestMoveHard() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = aiSymbol;
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const result = checkWinForMinimax();
    if (result !== null) {
        return result;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = aiSymbol;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = playerSymbol;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinForMinimax() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        if (condition.every(index => gameBoard[index] === aiSymbol)) {
            return 10;
        }
        if (condition.every(index => gameBoard[index] === playerSymbol)) {
            return -10;
        }
    }

    if (gameBoard.every(cell => cell !== '')) {
        return 0;
    }

    return null;
}