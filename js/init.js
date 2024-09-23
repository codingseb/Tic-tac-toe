document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeLanguageSelect();

    playerOptions.style.display = 'block';
    onePlayerBtn.classList.add('selected');
    twoPlayersBtn.classList.remove('selected');

    onePlayerBtn.addEventListener('click', () => setGameMode('1player'));
    twoPlayersBtn.addEventListener('click', () => setGameMode('2players'));

    document.getElementById('easyAIBtn').addEventListener('click', () => setAIDifficulty('easy'));
    document.getElementById('mediumAIBtn').addEventListener('click', () => setAIDifficulty('medium'));
    document.getElementById('hardAIBtn').addEventListener('click', () => setAIDifficulty('hard'));

    document.getElementById('size3Btn').addEventListener('click', () => { setBoardSize(3); setWinLength(3) ;});
    document.getElementById('size4Btn').addEventListener('click', () => { setBoardSize(4); setWinLength(4) ;});
    document.getElementById('size5Btn').addEventListener('click', () => { setBoardSize(5); setWinLength(5) ;});
    document.getElementById('size6Btn').addEventListener('click', () => { setBoardSize(6); setWinLength(6) ;});

    document.getElementById('win3Btn').addEventListener('click', () => setWinLength(3));
    document.getElementById('win4Btn').addEventListener('click', () => setWinLength(4));
    document.getElementById('win5Btn').addEventListener('click', () => setWinLength(5));
    document.getElementById('win6Btn').addEventListener('click', () => setWinLength(6));

    document.getElementById('chooseX').addEventListener('click', () => setPlayerSymbol('X'));
    document.getElementById('chooseO').addEventListener('click', () => setPlayerSymbol('O'));

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
    
    undoBtn.addEventListener('click', undoMove);
    resetBtn.addEventListener('click', resetGame);
    
    setBoardSize(localStorage.getItem('BoardSize') ? parseInt(localStorage.getItem('BoardSize')) : 3);
    setWinLength(localStorage.getItem('WinLength') ? parseInt(localStorage.getItem('WinLength')) : boardSize);
    setAIDifficulty(localStorage.getItem('AIDifficulty') || 'easy');
    setGameMode(localStorage.getItem('GameMode') ||'1player');
    setPlayerSymbol(localStorage.getItem('PlayerSymbol') ||'O');
    updateInterface();
});
