function handleKeyPress(event) {
    if (event.target.tagName === 'INPUT') return;
    
    switch(event.key) {
        case 'ArrowUp':
            selectedCellIndex = Math.max(0, selectedCellIndex - boardSize);
            updateSelectedCell();
            break;
        case 'ArrowDown':
            selectedCellIndex = Math.min(boardSize * boardSize - 1, selectedCellIndex + boardSize);
            updateSelectedCell();
            break;
        case 'ArrowLeft':
            if (selectedCellIndex % boardSize > 0) {
                selectedCellIndex--;
                updateSelectedCell();
            }
            break;
        case 'ArrowRight':
            if (selectedCellIndex % boardSize < boardSize - 1) {
                selectedCellIndex++;
                updateSelectedCell();
            }
            break;
        case ' ':
            makeMove(selectedCellIndex);
            break;
        // Autres raccourcis existants
        case '1':
            setGameMode('1player');
            break;
        case '2':
            setGameMode('2players');
            break;
        case 'x':
            setPlayerSymbol('X');
            break;
        case 'o':
            setPlayerSymbol('O');
            break;
        case 'e':
            setAIDifficulty('easy');
            break;
        case 'm':
            setAIDifficulty('medium');
            break;
        case 'h':
            setAIDifficulty('hard');
            break;
        case 'r':
            resetGame();
            break;
        case 'l':
            cycleLanguage();
            break;
        case 't':
            themeToggle.click();
            break;
    }
}