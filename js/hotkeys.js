function handleKeyPress(event) {
    if (event.target.tagName === 'INPUT') return;
    
    switch(event.key.toLowerCase()) {
        case 'k':
            toggleKeyboardPlay();
            break;
        case 'arrowup':
        case 'arrowdown':
        case 'arrowleft':
        case 'arrowright':
        case ' ':
            if (keyboardPlayEnabled) {
                handleKeyboardNavigation(event.key);
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

function handleKeyboardNavigation(key) {
    switch(key) {
        case 'ArrowUp':
            selectedCellIndex = Math.max(0, selectedCellIndex - boardSize);
            break;
        case 'ArrowDown':
            selectedCellIndex = Math.min(boardSize * boardSize - 1, selectedCellIndex + boardSize);
            break;
        case 'ArrowLeft':
            if (selectedCellIndex % boardSize > 0) selectedCellIndex--;
            break;
        case 'ArrowRight':
            if (selectedCellIndex % boardSize < boardSize - 1) selectedCellIndex++;
            break;
        case ' ':
            playCell(selectedCellIndex);
            break;
    }
    updateSelectedCell();
}

function toggleKeyboardPlay() {
    keyboardPlayEnabled = !keyboardPlayEnabled;
    if (keyboardPlayEnabled) {
        updateSelectedCell();
    } else {
        clearSelectedCell();
    }
    updateKeyboardPlayIndicator();
}

function updateSelectedCell() {
    if (keyboardPlayEnabled) {
        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.classList.toggle('selected', index === selectedCellIndex);
        });
    }
}

function clearSelectedCell() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('selected');
    });
}

function updateKeyboardPlayIndicator() {
    document.getElementById('keyboardPlayIndicator').textContent = translate(keyboardPlayEnabled ? 'keyboardPlayEnabled' : 'keyboardPlayDisabled');
}

