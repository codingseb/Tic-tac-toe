function getBestMove() {
    if (aiDifficulty === 'easy') {
        return getRandomMove();
    } else if (aiDifficulty === 'medium') {
        return Math.random() < 0.5 ? getBestMoveHard() : getRandomMove();
    } else { 
        // First move random
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
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = aiSymbol;
            let score = minimax(gameBoard, 0, false, -Infinity, Infinity);
            gameBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing, alpha, beta) {
    if (depth === aiMaxDepth || checkWinForMinimax(board) !== null) {
        return evaluateBoard(board);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiSymbol;
                let score = minimax(board, depth + 1, false, alpha, beta);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break; // Élagage alpha-beta
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = playerSymbol;
                let score = minimax(board, depth + 1, true, alpha, beta);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break; // Élagage alpha-beta
            }
        }
        return bestScore;
    }
}

function checkWinForMinimax(board) {

    for (let condition of winConditions) {
        if (condition.every(index => board[index] === aiSymbol)) {
            return 1000000;
        }
        if (condition.every(index => board[index] === playerSymbol)) {
            return -1000000;
        }
    }

    if (board.every(cell => cell !== '')) {
        return 0;
    }

    return null;
}

// heuristics functions
function evaluateBoard(board) {
    const result = checkWinForMinimax(board);
    if (result !== null) {
        return result;
    }

    let score = 0;
    const lines = getLines(board);
    
    for (const line of lines) {
        const aiCount = line.filter(cell => cell === aiSymbol).length;
        const playerCount = line.filter(cell => cell === playerSymbol).length;

        if (aiCount === 0 && playerCount > 0) {
            score -= Math.pow(2, playerCount);
        } else if (playerCount === 0 && aiCount > 0) {
            score += Math.pow(2, aiCount);
        }
    }

    return score;
}

function getLines(board) {
    const size = Math.sqrt(board.length);
    const lines = [];

    // Lignes horizontales et verticales
    for (let i = 0; i < size; i++) {
        const row = [];
        const col = [];
        for (let j = 0; j < size; j++) {
            row.push(board[i * size + j]);
            col.push(board[j * size + i]);
        }
        lines.push(row, col);
    }

    // Diagonales
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
        diag1.push(board[i * size + i]);
        diag2.push(board[i * size + (size - 1 - i)]);
    }
    lines.push(diag1, diag2);

    return lines;
}