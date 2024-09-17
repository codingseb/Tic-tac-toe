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

    document.getElementById('size3Btn').addEventListener('click', () => setBoardSize(3));
    document.getElementById('size4Btn').addEventListener('click', () => setBoardSize(4));
    document.getElementById('size5Btn').addEventListener('click', () => setBoardSize(5));
    document.getElementById('size6Btn').addEventListener('click', () => setBoardSize(6));

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

    createBoard();
    resetBtn.addEventListener('click', resetGame);
    setAIDifficulty('easy');
    setPlayerSymbol('O');
    setGameMode('1player');
    resetGame();
    updateInterface();
});
