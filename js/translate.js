let currentLanguage = localStorage.getItem('language') || 'en';

function initializeLanguageSelect() {
    const languageSelect = document.getElementById('languageSelect');
    
    // Définir la langue initiale
    languageSelect.value = currentLanguage;

    // Ajouter un écouteur d'événements pour le changement de langue
    languageSelect.addEventListener('change', function() {
        setLanguage(this.value);
    });
}

function translate(key, ...args) {
    let text = translations[currentLanguage][key];
    for (let i = 0; i < args.length; i++) {
        text = text.replace(`{${i}}`, args[i]);
    }
    return text;
}

function updateInterface() {
    document.querySelector('h1').textContent = translate('title');
    onePlayerBtn.textContent = translate('onePlayer');
    twoPlayersBtn.textContent = translate('twoPlayers');
    document.querySelector('#playerOptions h3:first-of-type').textContent = translate('chooseSymbol');
    document.querySelector('#playerOptions h3:last-of-type').textContent = translate('chooseDifficulty');
    document.getElementById('easyAIBtn').textContent = translate('easy');
    document.getElementById('mediumAIBtn').textContent = translate('medium');
    document.getElementById('hardAIBtn').textContent = translate('hard');
    resetBtn.textContent = translate('reset');
    message.textContent = translate('playerTurn', currentPlayer);
    toWinLabel.textContent = translate('toWin'),

    // Mise à jour de la popup des raccourcis
    document.querySelector('.popup-content h2').textContent = translate('shortcuts');
    const shortcutsList = document.querySelector('.popup-content ul');
    shortcutsList.innerHTML = `
        <li>${translate('onePlayerShortcut')}</li>
        <li>${translate('twoPlayersShortcut')}</li>
        <li>${translate('chooseXShortcut')}</li>
        <li>${translate('chooseOShortcut')}</li>
        <li>${translate('easyDifficultyShortcut')}</li>
        <li>${translate('mediumDifficultyShortcut')}</li>
        <li>${translate('hardDifficultyShortcut')}</li>
        <li>${translate('resetShortcut')}</li>
        <li>${translate('languageShortcut')}</li>
        <li>${translate('themeToggleShortcut')}</li>
    `;
    document.querySelector('.popup-content h3').textContent = translate('numpadPlay');
    closePopup.textContent = translate('close');
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateInterface();
}

function cycleLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    const languages = Array.from(languageSelect.options).map(option => option.value);
    const currentIndex = languages.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
    languageSelect.value = languages[nextIndex];
}