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

    switch (event.key.toLowerCase()) {
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