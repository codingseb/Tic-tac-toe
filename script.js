document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const onePlayerBtn = document.getElementById('onePlayerBtn');
    const twoPlayersBtn = document.getElementById('twoPlayersBtn');
    const playerOptions = document.getElementById('playerOptions');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let gameMode = '1player';
    let aiDifficulty = 'easy';
    let playerSymbol = 'X';
    let aiSymbol = 'O';

    // Initialisation du thème
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeToggle.checked = true;
    } else {
        body.classList.add('light');
        themeToggle.checked = false;
    }

    // Afficher les options du joueur 1 par défaut
    playerOptions.style.display = 'block';

    // Sélectionner le mode 1 joueur par défaut
    onePlayerBtn.classList.add('selected');
    twoPlayersBtn.classList.remove('selected');

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');
        if (gameBoard[index] === '' && gameActive) {
            makeMove(index);
            if (gameMode === '1player' && gameActive && currentPlayer === aiSymbol) {
                setTimeout(() => {
                    const aiMove = getBestMove();
                    makeMove(aiMove);
                }, 500);
            }
        }
    }

    function makeMove(index) {
        gameBoard[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;
        if (checkWin()) {
            message.textContent = `Le joueur ${currentPlayer} a gagné !`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            message.textContent = 'Match nul !';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `C'est au tour du joueur ${currentPlayer}`;
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winConditions.some(condition => {
            return condition.every(index => {
                return gameBoard[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = playerSymbol;
        message.textContent = `C'est au tour du joueur ${currentPlayer}`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
        if (gameMode === '1player' && playerSymbol === 'O') {
            setTimeout(() => {
                const aiMove = getBestMove();
                makeMove(aiMove);
            }, 500);
        }
    }

    function getBestMove() {
        if (aiDifficulty === 'easy') {
            return getRandomMove();
        } else if (aiDifficulty === 'medium') {
            return Math.random() < 0.5 ? getBestMoveHard() : getRandomMove();
        } else {
            return getBestMoveHard();
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
        if (checkWinForMinimax(aiSymbol)) return 10 - depth;
        if (checkWinForMinimax(playerSymbol)) return depth - 10;
        if (board.every(cell => cell !== '')) return 0;

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

    function checkWinForMinimax(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winConditions.some(condition => {
            return condition.every(index => {
                return gameBoard[index] === player;
            });
        });
    }

    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.remove('light');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });

    function setGameMode(mode) {
        gameMode = mode;
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

    onePlayerBtn.addEventListener('click', () => setGameMode('1player'));
    twoPlayersBtn.addEventListener('click', () => setGameMode('2players'));

    function setAIDifficulty(difficulty) {
        aiDifficulty = difficulty;
        document.querySelectorAll('#playerOptions button').forEach(btn => btn.classList.remove('selected'));
        document.getElementById(`${difficulty}AIBtn`).classList.add('selected');
        resetGame();
    }

    document.getElementById('easyAIBtn').addEventListener('click', () => setAIDifficulty('easy'));
    document.getElementById('mediumAIBtn').addEventListener('click', () => setAIDifficulty('medium'));
    document.getElementById('hardAIBtn').addEventListener('click', () => setAIDifficulty('hard'));

    function setPlayerSymbol(symbol) {
        playerSymbol = symbol;
        aiSymbol = symbol === 'X' ? 'O' : 'X';
        document.getElementById('chooseX').classList.toggle('selected', symbol === 'X');
        document.getElementById('chooseO').classList.toggle('selected', symbol === 'O');
        resetGame();
    }

    document.getElementById('chooseX').addEventListener('click', () => setPlayerSymbol('X'));
    document.getElementById('chooseO').addEventListener('click', () => setPlayerSymbol('O'));

    createBoard();
    resetBtn.addEventListener('click', resetGame);
    setAIDifficulty('easy');
    setPlayerSymbol('X');
    setGameMode('1player');
    resetGame();
});