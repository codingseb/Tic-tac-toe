document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const onePlayerBtn = document.getElementById('onePlayerBtn');
    const twoPlayersBtn = document.getElementById('twoPlayersBtn');
    const playerOptions = document.getElementById('playerOptions');
    const keyboardIcon = document.getElementById('keyboardIcon');
    const shortcutPopup = document.getElementById('shortcutPopup');
    const closePopup = document.getElementById('closePopup');

    let currentPlayer = 'O';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let gameMode = '1player';
    let aiDifficulty = 'easy';
    let playerSymbol = 'O';
    let aiSymbol = 'X';

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeToggle.checked = true;
    } else {
        body.classList.add('light');
        themeToggle.checked = false;
    }

    playerOptions.style.display = 'block';
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
        }
    }

    function createSVGSymbol(type) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        
        if (type === 'X') {
            const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line1.setAttribute("x1", "20");
            line1.setAttribute("y1", "20");
            line1.setAttribute("x2", "80");
            line1.setAttribute("y2", "80");
            line1.classList.add("x-symbol");
            
            const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line2.setAttribute("x1", "80");
            line2.setAttribute("y1", "20");
            line2.setAttribute("x2", "20");
            line2.setAttribute("y2", "80");
            line2.classList.add("x-symbol");
            
            svg.appendChild(line1);
            svg.appendChild(line2);
        } else {
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", "50");
            circle.setAttribute("cy", "50");
            circle.setAttribute("r", "30");
            circle.classList.add("o-symbol");
            
            svg.appendChild(circle);
        }
        
        return svg;
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
                message.textContent = `Le joueur ${currentPlayer} a gagné !`;
            }, 500);
        } else if (gameBoard.every(cell => cell !== '')) {
            message.textContent = 'Match nul !';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `C'est au tour du joueur ${currentPlayer}`;
            
            if (gameMode === '1player' && currentPlayer === aiSymbol && gameActive) {
                setTimeout(() => {
                    const aiMove = getBestMove();
                    makeMove(aiMove, true);
                }, 500);
            }
        }
    }
    

    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winConditions) {
            if (condition.every(index => gameBoard[index] === currentPlayer)) {
                return condition;
            }
        }
        return null;
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'O';
        message.textContent = `C'est au tour du joueur ${currentPlayer}`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('winning-cell');
        });

        document.getElementById('chooseX').classList.toggle('selected', playerSymbol === 'X');
        document.getElementById('chooseO').classList.toggle('selected', playerSymbol === 'O');

        if (gameMode === '1player' && playerSymbol === 'X') {
            setTimeout(() => {
                const aiMove = getBestMove();
                makeMove(aiMove, true);
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
        document.querySelectorAll('#playerOptions button[id$="AIBtn"]').forEach(btn => btn.classList.remove('selected'));
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

    function handleKeyPress(event) {
        if (event.code.startsWith('Numpad')) {
            const numpadMap = {
                'Numpad7': 0, 'Numpad8': 1, 'Numpad9': 2,
                'Numpad4': 3, 'Numpad5': 4, 'Numpad6': 5,
                'Numpad1': 6, 'Numpad2': 7, 'Numpad3': 8
            };
            const cellIndex = numpadMap[event.code];
            if (cellIndex !== undefined) {
                const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
                if (cell) cell.click();
            }
            return;
        }
    
        switch(event.key.toLowerCase()) {
            case '1':
                if (!event.code.startsWith('Numpad')) setGameMode('1player');
                break;
            case '2':
                if (!event.code.startsWith('Numpad')) setGameMode('2players');
                break;
            case 'x':
                setPlayerSymbol('X');
                break;
            case 'o':
                setPlayerSymbol('O');
                break;
            case 'f':
                setAIDifficulty('easy');
                break;
            case 'm':
                setAIDifficulty('medium');
                break;
            case 'd':
                setAIDifficulty('hard');
                break;
            case 'r':
                resetGame();
                break;
            case 'l':
                themeToggle.click();
                break;
        }
    }
    
    document.addEventListener('keydown', handleKeyPress);
    
    keyboardIcon.addEventListener('click', () => {
        shortcutPopup.style.display = 'block';
    });
    
    closePopup.addEventListener('click', () => {
        shortcutPopup.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === shortcutPopup) {
            shortcutPopup.style.display = 'none';
        }
    });
    
    createBoard();
    resetBtn.addEventListener('click', resetGame);
    setAIDifficulty('easy');
    setPlayerSymbol('O');
    setGameMode('1player');
    resetGame();
})    